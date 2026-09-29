#!/usr/bin/env python3
"""Build self-hosted GitHub stats, language and streak cards for the profile.

Usage:
    GITHUB_TOKEN=... python3 scripts/build_github_stats.py [username] [out_dir]
    python3 scripts/build_github_stats.py --fixture data.json [out_dir]

The cards are script-free SVGs in the profile palette. Only public data
visible to the token is used; nothing is estimated or invented.
"""
import datetime as dt
import json
import os
import sys
import urllib.request
from html import escape
from pathlib import Path

API = 'https://api.github.com/graphql'
FONT = 'Segoe UI, Inter, Arial, sans-serif'
MINT, MINT_DEEP, GOLD = '#83f4d2', '#4ccbaa', '#e5c78d'
TEXT, MUTED, BORDER = '#eaf4f1', '#a7b8cb', '#263c4e'

PROFILE_QUERY = '''
query($login: String!, $cursor: String) {
  user(login: $login) {
    name login createdAt
    followers { totalCount }
    contributionsCollection {
      totalCommitContributions totalPullRequestContributions
      totalIssueContributions totalPullRequestReviewContributions
      restrictedContributionsCount
    }
    repositories(first: 100, after: $cursor, ownerAffiliations: OWNER,
                 isFork: false, privacy: PUBLIC) {
      totalCount
      pageInfo { hasNextPage endCursor }
      nodes {
        stargazerCount
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          edges { size node { name color } }
        }
      }
    }
  }
}'''

CALENDAR_QUERY = '''
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar { weeks { contributionDays { date contributionCount } } }
    }
  }
}'''


def graphql(token, query, variables):
    request = urllib.request.Request(
        API,
        data=json.dumps({'query': query, 'variables': variables}).encode(),
        headers={'Authorization': f'bearer {token}', 'Content-Type': 'application/json',
                 'User-Agent': 'profile-stats-builder'},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = json.load(response)
    if payload.get('errors'):
        raise SystemExit(f"GitHub API error: {payload['errors']}")
    return payload['data']


def fetch(token, login):
    """Collect profile data into the same shape the --fixture file uses."""
    repos, cursor, user = [], None, None
    while True:
        user = graphql(token, PROFILE_QUERY, {'login': login, 'cursor': cursor})['user']
        page = user['repositories']
        repos.extend(page['nodes'])
        if not page['pageInfo']['hasNextPage']:
            break
        cursor = page['pageInfo']['endCursor']

    days = {}
    start = dt.datetime.fromisoformat(user['createdAt'].replace('Z', '+00:00'))
    now = dt.datetime.now(dt.timezone.utc)
    while start < now:
        end = min(start + dt.timedelta(days=365), now)
        data = graphql(token, CALENDAR_QUERY, {
            'login': login, 'from': start.isoformat(), 'to': end.isoformat()})
        weeks = data['user']['contributionsCollection']['contributionCalendar']['weeks']
        for week in weeks:
            for day in week['contributionDays']:
                days[day['date']] = day['contributionCount']
        start = end

    return {
        'name': user['name'] or user['login'],
        'login': user['login'],
        'followers': user['followers']['totalCount'],
        'contributions': user['contributionsCollection'],
        'repo_count': user['repositories']['totalCount'],
        'repos': repos,
        'days': days,
        'today': now.date().isoformat(),
    }


# ---------------------------------------------------------------- calculations

def summarise_languages(repos, limit=8):
    totals, colors = {}, {}
    for repo in repos:
        for edge in repo['languages']['edges']:
            name = edge['node']['name']
            totals[name] = totals.get(name, 0) + edge['size']
            colors[name] = edge['node']['color'] or MUTED
    grand = sum(totals.values()) or 1
    top = sorted(totals.items(), key=lambda item: item[1], reverse=True)[:limit]
    return [(name, size / grand * 100, colors[name]) for name, size in top]


def summarise_streak(days, today):
    dates = sorted(days)
    total = sum(days.values())
    longest = (0, None, None)
    run, run_start = 0, None
    for date in dates:
        if days[date] > 0:
            run_start = run_start or date
            run += 1
            if run > longest[0]:
                longest = (run, run_start, date)
        else:
            run, run_start = 0, None

    # A day without contributions yet does not break the current streak.
    past = [d for d in dates if d <= today]
    if past and past[-1] == today and days[today] == 0:
        past.pop()
    current, end = 0, past[-1] if past else None
    for date in reversed(past):
        if days[date] == 0:
            break
        current += 1
    current_start = past[len(past) - current] if current else None
    return {
        'total': total,
        'first': dates[0] if dates else today,
        'current': (current, current_start, end if current else None),
        'longest': longest,
    }


# ---------------------------------------------------------------------- drawing

def text(x, y, value, size=14, color=MUTED, weight=400, anchor='start'):
    return (f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" '
            f'font-weight="{weight}" text-anchor="{anchor}">{escape(str(value))}</text>')


def card(width, height, title, desc, body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
<title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc>
<defs>
<linearGradient id="bg" x2="1" y2="1"><stop stop-color="#0b1220"/><stop offset="1" stop-color="#112c38"/></linearGradient>
<linearGradient id="mint" x2="1"><stop stop-color="{MINT}"/><stop offset="1" stop-color="#258c85"/></linearGradient>
<linearGradient id="gold" x2="1" y2="1"><stop stop-color="#f3d69c"/><stop offset="1" stop-color="#a77b3d"/></linearGradient>
<clipPath id="bar"><rect x="28" y="72" width="{width - 56}" height="10" rx="5"/></clipPath>
</defs>
<style>text{{font-family:{FONT}}}</style>
<rect x=".5" y=".5" width="{width - 1}" height="{height - 1}" rx="16" fill="url(#bg)" stroke="{BORDER}"/>
{body}</svg>
'''


def compact(number):
    if number >= 1000:
        return f'{number / 1000:.1f}k'.replace('.0k', 'k')
    return f'{number:,}'


def fmt_date(value):
    if not value:
        return '—'
    return dt.date.fromisoformat(value).strftime('%b %-d, %Y')


def stats_card(data):
    c = data['contributions']
    stars = sum(repo['stargazerCount'] for repo in data['repos'])
    rows = [
        ('Commits (past year)', c['totalCommitContributions'] + c['restrictedContributionsCount']),
        ('Pull requests (past year)', c['totalPullRequestContributions']),
        ('Issues (past year)', c['totalIssueContributions']),
        ('Code reviews (past year)', c['totalPullRequestReviewContributions']),
        ('Public repositories', data['repo_count']),
        ('Stars earned', stars),
        ('Followers', data['followers']),
    ]
    body = [text(28, 42, f"{data['name']}'s GitHub stats", 19, MINT, 700),
            f'<path d="M28 58H{467 - 28}" stroke="{BORDER}"/>']
    for i, (label, value) in enumerate(rows):
        y = 88 + i * 29
        dot = GOLD if i % 2 else MINT_DEEP
        body.append(f'<circle cx="34" cy="{y - 5}" r="4" fill="{dot}"/>')
        body.append(text(48, y, label, 14, MUTED))
        body.append(text(439, y, compact(value), 15, TEXT, 700, 'end'))
    desc = '; '.join(f'{label}: {value}' for label, value in rows)
    return card(467, 300, f"{data['name']}'s GitHub stats", desc, '\n'.join(body))


def languages_card(data):
    langs = summarise_languages(data['repos'])
    width = 467
    body = [text(28, 42, 'Most used languages', 19, MINT, 700),
            f'<rect x="28" y="72" width="{width - 56}" height="10" rx="5" fill="#132536"/>',
            '<g clip-path="url(#bar)">']
    x = 28.0
    for name, pct, color in langs:
        w = (width - 56) * pct / 100
        body.append(f'<rect x="{x:.2f}" y="72" width="{w:.2f}" height="10" fill="{color}"/>')
        x += w
    body.append('</g>')
    for i, (name, pct, color) in enumerate(langs):
        col, row = i % 2, i // 2
        cx, y = 34 + col * 212, 118 + row * 42
        body.append(f'<circle cx="{cx}" cy="{y - 5}" r="6" fill="{color}"/>')
        body.append(text(cx + 14, y, name, 14, TEXT, 600))
        body.append(text(cx + 190, y, f'{pct:.1f}%', 13, MUTED, 400, 'end'))
    if not langs:
        body.append(text(width / 2, 150, 'No public language data yet', 14, MUTED, 400, 'middle'))
    desc = ', '.join(f'{name} {pct:.1f}%' for name, pct, _ in langs) or 'No language data'
    return card(width, 300, 'Most used languages', desc, '\n'.join(body))


def streak_card(data):
    s = summarise_streak(data['days'], data['today'])
    current, c_start, c_end = s['current']
    longest, l_start, l_end = s['longest']
    width, height = 940, 200
    col = width / 3

    def column(index, value, label, detail, color):
        cx = col * index + col / 2
        return '\n'.join([
            text(cx, 96, value, 34, color, 700, 'middle'),
            text(cx, 150, label, 15, TEXT, 600, 'middle'),
            text(cx, 174, detail, 12, MUTED, 400, 'middle'),
        ])

    current_range = f'{fmt_date(c_start)} – {fmt_date(c_end)}' if current else 'Start one today'
    body = [
        f'<path d="M{col:.0f} 36V164M{col * 2:.0f} 36V164" stroke="{BORDER}"/>',
        column(0, compact(s['total']), 'Total contributions', f"{fmt_date(s['first'])} – Present", TEXT),
        f'<circle cx="{width / 2}" cy="84" r="40" fill="none" stroke="{BORDER}" stroke-width="6"/>',
        f'<circle cx="{width / 2}" cy="84" r="40" fill="none" stroke="url(#mint)" stroke-width="6"'
        f' stroke-dasharray="{min(current, 30) / 30 * 251.3:.1f} 251.3" transform="rotate(-90 {width / 2} 84)"'
        ' stroke-linecap="round"/>',
        f'<path d="M{width / 2} 30c6 8 11 12 11 19a11 11 0 0 1-22 0c0-4 2-7 5-10 0 4 2 6 4 6-1-6 0-10 2-15z" fill="url(#gold)"/>',
        # The current streak sits inside the ring, so its labels go lower.
        text(width / 2, 96, current, 30, MINT, 700, 'middle'),
        text(width / 2, 150, 'Current streak', 15, TEXT, 600, 'middle'),
        text(width / 2, 174, current_range, 12, MUTED, 400, 'middle'),
        column(2, longest, 'Longest streak', f'{fmt_date(l_start)} – {fmt_date(l_end)}' if longest else '—', GOLD),
    ]
    desc = (f"Total contributions {s['total']}; current streak {current} days; "
            f'longest streak {longest} days')
    return card(width, height, 'GitHub contribution streak', desc, '\n'.join(body))


def main(argv):
    out_dir = Path('dist')
    if argv[:1] == ['--fixture']:
        data = json.loads(Path(argv[1]).read_text())
        if len(argv) > 2:
            out_dir = Path(argv[2])
    else:
        token = os.environ.get('GITHUB_TOKEN')
        if not token:
            raise SystemExit('GITHUB_TOKEN is required')
        login = argv[0] if argv else os.environ.get('GITHUB_REPOSITORY_OWNER')
        if not login:
            raise SystemExit('Pass a username or set GITHUB_REPOSITORY_OWNER')
        if len(argv) > 1:
            out_dir = Path(argv[1])
        data = fetch(token, login)

    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / 'github-stats.svg').write_text(stats_card(data))
    (out_dir / 'github-languages.svg').write_text(languages_card(data))
    (out_dir / 'github-streak.svg').write_text(streak_card(data))
    print(f'Wrote stats, languages and streak cards to {out_dir}/')


if __name__ == '__main__':
    main(sys.argv[1:])
