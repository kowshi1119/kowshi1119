import { motion } from 'framer-motion'

const USER = 'kowshi1119'

const statsCards = [
  {
    label: 'GitHub Stats',
    src: `https://github-readme-stats.vercel.app/api?username=${USER}&theme=transparent&hide_border=true&include_all_commits=false&count_private=false&title_color=60a5fa&text_color=c9d1d9&icon_color=a78bfa&bg_color=00000000`,
    alt: 'GitHub Stats',
    border: 'border-blue-500/20', bg: 'bg-blue-500/5', glow: 'hover:shadow-blue-500/10', delay: 0,
  },
  {
    label: 'GitHub Streak',
    src: `https://nirzak-streak-stats.vercel.app/?user=${USER}&theme=transparent&hide_border=true&ring=60a5fa&fire=f97316&currStreakLabel=60a5fa&background=00000000&sideNums=c9d1d9&dates=8b949e&currStreakNum=e6edf3`,
    alt: 'GitHub Streak',
    border: 'border-purple-500/20', bg: 'bg-purple-500/5', glow: 'hover:shadow-purple-500/10', delay: 0.12,
  },
]

export default function GitHubStats() {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto" id="stats">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65 }}
        className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-5">
          <span>📊</span> GitHub Stats
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
          <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">My GitHub Activity</span>
        </h2>
        <p className="text-gray-400 text-lg">Open source contribution snapshot</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {statsCards.map(card => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }} transition={{ delay: card.delay, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className={`rounded-2xl border ${card.border} ${card.bg} backdrop-blur-sm p-5 flex flex-col items-center gap-3 hover:shadow-xl ${card.glow} transition-all duration-300`}>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">{card.label}</span>
            <img src={card.src} alt={card.alt} className="w-full max-w-sm" loading="lazy" />
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }} transition={{ delay: 0.24, duration: 0.6 }}
        whileHover={{ scale: 1.015 }}
        className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm p-5 flex flex-col items-center gap-3 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Top Languages</span>
        <img src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${USER}&theme=transparent&hide_border=true&layout=compact&title_color=60a5fa&text_color=c9d1d9&bg_color=00000000`}
          alt="Top Languages" className="w-full max-w-md" loading="lazy" />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }} className="mt-8 flex justify-center">
        <a href="https://visitcount.itsvg.in" target="_blank" rel="noopener noreferrer">
          <img src={`https://visitcount.itsvg.in/api?id=${USER}&icon=6&color=1`}
            alt="Profile Visit Count" className="opacity-60 hover:opacity-90 transition-opacity" />
        </a>
      </motion.div>
    </section>
  )
}
