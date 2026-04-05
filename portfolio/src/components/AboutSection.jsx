import { motion } from 'framer-motion'

const cards = [
  {
    icon: '🔭', title: 'Currently Working On',
    items: ['AI Powered Hospital Receptionist System','CSE Stock Insight Android App (Fundamental & Technical Analysis)','Full-Stack Portfolio Website'],
    gradient: 'from-blue-500/15 to-cyan-500/5', border: 'border-blue-500/25', glow: 'hover:shadow-blue-500/10', accent: 'text-blue-400',
  },
  {
    icon: '👯', title: 'Looking to Collaborate On',
    items: ['AI & Machine Learning Projects','Open Source Software Development','Innovative Hackathon Projects'],
    gradient: 'from-purple-500/15 to-pink-500/5', border: 'border-purple-500/25', glow: 'hover:shadow-purple-500/10', accent: 'text-purple-400',
  },
  {
    icon: '🤝', title: 'Looking for Help With',
    items: ['Advanced AI/ML Model Optimization','Scalable System Design','Cloud Deployment & DevOps'],
    gradient: 'from-cyan-500/15 to-teal-500/5', border: 'border-cyan-500/25', glow: 'hover:shadow-cyan-500/10', accent: 'text-cyan-400',
  },
  {
    icon: '🌱', title: 'Currently Learning',
    items: ['Artificial Intelligence & Machine Learning','Advanced Java & System Design','Data Structures and Algorithms'],
    gradient: 'from-emerald-500/15 to-green-500/5', border: 'border-emerald-500/25', glow: 'hover:shadow-emerald-500/10', accent: 'text-emerald-400',
  },
  {
    icon: '💬', title: 'Ask Me About',
    items: ['Java Development','Full Stack Web Development','Android Development','Stock Market Data Analysis'],
    gradient: 'from-orange-500/15 to-amber-500/5', border: 'border-orange-500/25', glow: 'hover:shadow-orange-500/10', accent: 'text-orange-400',
  },
  {
    icon: '⚡', title: 'Fun Facts',
    items: ['🏆 Winner of the Q4US Code Art Challenge (LKR 100,000 Prize)','🚀 Passionate about building AI solutions that solve real-world problems'],
    gradient: 'from-yellow-500/15 to-orange-500/5', border: 'border-yellow-500/25', glow: 'hover:shadow-yellow-500/10', accent: 'text-yellow-400',
  },
]

export default function AboutSection() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto" id="about">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65 }}
        className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-5">
          <span>👨‍💻</span> About Me
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">Who Am I?</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A passionate developer crafting intelligent solutions at the intersection of AI, Mobile, and Web.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, i) => (
          <motion.div key={card.title}
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.09, duration: 0.55, type: 'spring', stiffness: 80 }}
            whileHover={{ scale: 1.025, translateY: -6 }}
            className={`relative rounded-2xl border ${card.border} bg-gradient-to-br ${card.gradient} backdrop-blur-sm p-6 shadow-xl ${card.glow} hover:shadow-xl transition-all duration-300 cursor-default group overflow-hidden`}>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.03) 0%,rgba(255,255,255,0.06) 50%,rgba(255,255,255,0.03) 100%)' }} />
            <div className="relative z-10">
              <div className="text-3xl mb-3 leading-none">{card.icon}</div>
              <h3 className={`text-base font-semibold ${card.accent} mb-4 leading-snug`}>{card.title}</h3>
              <ul className="space-y-2.5">
                {card.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed">
                    <span className={`${card.accent} mt-0.5 shrink-0 text-xs`}>▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
