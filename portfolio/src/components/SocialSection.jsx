import { motion } from 'framer-motion'

const socials = [
  {
    name: 'LinkedIn', label: 'Connect professionally', sublabel: 'Open to opportunities & networking',
    href: 'https://www.linkedin.com/in/kowshikan-mathivarnan-b3a1ab314',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    iconBg: 'bg-[#0077b5]', cardBg: 'from-[#0077b5]/15 to-[#00a0dc]/5',
    border: 'border-[#0077b5]/35', glow: 'hover:shadow-[#0077b5]/25', textAccent: 'text-[#60a5fa]', featured: true,
  },
  {
    name: 'Facebook', label: 'Follow my updates', sublabel: 'Stay up to date with my journey',
    href: 'https://www.facebook.com/share/1GvDMgwKiv/?mibextid=wwXIfr',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    iconBg: 'bg-[#1877f2]', cardBg: 'from-[#1877f2]/15 to-[#0099ff]/5',
    border: 'border-[#1877f2]/30', glow: 'hover:shadow-[#1877f2]/20', textAccent: 'text-[#93c5fd]', featured: false,
  },
  {
    name: 'Email', label: 'Send me a message', sublabel: 'Kowshigankowshi39@gmail.com',
    href: 'mailto:Kowshigankowshi39@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    iconBg: 'bg-[#ea4335]', cardBg: 'from-[#ea4335]/15 to-[#ff6d59]/5',
    border: 'border-[#ea4335]/30', glow: 'hover:shadow-[#ea4335]/20', textAccent: 'text-[#fca5a5]', featured: false,
  },
]

export default function SocialSection() {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto" id="social">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65 }}
        className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-5">
          <span>🌐</span> Connect
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Let's Connect</span>
        </h2>
        <p className="text-gray-400 text-lg">Open to collaborations, opportunities, and conversations</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {socials.map((s, i) => (
          <motion.a key={s.name} href={s.href}
            target={s.href.startsWith('mailto') ? undefined : '_blank'}
            rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.13, duration: 0.6, type: 'spring', stiffness: 80 }}
            whileHover={{ scale: 1.04, translateY: -8 }} whileTap={{ scale: 0.97 }}
            className={`relative block rounded-2xl border ${s.border} bg-gradient-to-br ${s.cardBg} backdrop-blur-sm p-7 text-left group overflow-hidden hover:shadow-2xl ${s.glow} transition-all duration-300 cursor-pointer ${s.featured ? 'ring-1 ring-blue-500/20' : ''}`}>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 pointer-events-none" />
            {s.featured && (
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium">
                ★ Primary
              </div>
            )}
            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{s.name}</h3>
              <p className={`text-sm font-medium ${s.textAccent} mb-2`}>{s.label}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{s.sublabel}</p>
              <div className={`mt-4 flex items-center gap-1.5 text-xs ${s.textAccent} font-medium`}>
                <span>Open link</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
