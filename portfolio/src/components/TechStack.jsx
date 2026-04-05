import { motion } from 'framer-motion'

const categories = [
  { label: 'Languages', icon: '⌨️', techs: [
    { name: 'Python',      emoji: '🐍', cls: 'border-blue-500/40 bg-blue-500/10 text-blue-300 hover:shadow-blue-500/20' },
    { name: 'Java',        emoji: '☕', cls: 'border-orange-500/40 bg-orange-500/10 text-orange-300 hover:shadow-orange-500/20' },
    { name: 'JavaScript',  emoji: '⚡', cls: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300 hover:shadow-yellow-500/20' },
    { name: 'TypeScript',  emoji: '📘', cls: 'border-blue-600/40 bg-blue-600/10 text-blue-300 hover:shadow-blue-500/20' },
    { name: 'Kotlin',      emoji: '🎯', cls: 'border-purple-500/40 bg-purple-500/10 text-purple-300 hover:shadow-purple-500/20' },
    { name: 'C++',         emoji: '⚙️', cls: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:shadow-cyan-500/20' },
    { name: 'PHP',         emoji: '🐘', cls: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300 hover:shadow-indigo-500/20' },
    { name: 'HTML5',       emoji: '🌐', cls: 'border-orange-600/40 bg-orange-600/10 text-orange-300 hover:shadow-orange-500/20' },
    { name: 'CSS3',        emoji: '🎨', cls: 'border-sky-500/40 bg-sky-500/10 text-sky-300 hover:shadow-sky-500/20' },
    { name: 'PowerShell',  emoji: '💻', cls: 'border-sky-600/40 bg-sky-600/10 text-sky-300 hover:shadow-sky-500/20' },
  ]},
  { label: 'Frontend', icon: '🎨', techs: [
    { name: 'React',       emoji: '⚛️', cls: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:shadow-cyan-400/20' },
    { name: 'Tailwind CSS',emoji: '💨', cls: 'border-teal-500/40 bg-teal-500/10 text-teal-300 hover:shadow-teal-500/20' },
    { name: 'jQuery',      emoji: '🔵', cls: 'border-blue-500/40 bg-blue-500/10 text-blue-300 hover:shadow-blue-500/20' },
  ]},
  { label: 'Backend', icon: '⚙️', techs: [
    { name: 'Node.js',     emoji: '🟢', cls: 'border-green-500/40 bg-green-500/10 text-green-300 hover:shadow-green-500/20' },
    { name: 'Django',      emoji: '🎸', cls: 'border-green-700/40 bg-green-700/10 text-green-300 hover:shadow-green-500/20' },
    { name: '.NET',        emoji: '🔷', cls: 'border-purple-600/40 bg-purple-600/10 text-purple-300 hover:shadow-purple-500/20' },
    { name: 'Apache',      emoji: '🪶', cls: 'border-red-600/40 bg-red-600/10 text-red-300 hover:shadow-red-500/20' },
  ]},
  { label: 'Mobile', icon: '📱', techs: [
    { name: 'Flutter',      emoji: '🦋', cls: 'border-blue-400/40 bg-blue-400/10 text-blue-300 hover:shadow-blue-400/20' },
    { name: 'React Native', emoji: '⚛️', cls: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:shadow-cyan-500/20' },
  ]},
  { label: 'Databases', icon: '🗄️', techs: [
    { name: 'MySQL',   emoji: '🐬', cls: 'border-blue-600/40 bg-blue-600/10 text-blue-300 hover:shadow-blue-500/20' },
    { name: 'MongoDB', emoji: '🍃', cls: 'border-green-500/40 bg-green-500/10 text-green-300 hover:shadow-green-500/20' },
    { name: 'Oracle',  emoji: '🔴', cls: 'border-red-500/40 bg-red-500/10 text-red-300 hover:shadow-red-500/20' },
  ]},
  { label: 'Cloud & Tools', icon: '☁️', techs: [
    { name: 'AWS',  emoji: '☁️', cls: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300 hover:shadow-yellow-500/20' },
    { name: 'Jira', emoji: '📋', cls: 'border-blue-600/40 bg-blue-600/10 text-blue-300 hover:shadow-blue-500/20' },
  ]},
  { label: 'Design', icon: '✏️', techs: [
    { name: 'Figma', emoji: '🎨', cls: 'border-pink-500/40 bg-pink-500/10 text-pink-300 hover:shadow-pink-500/20' },
    { name: 'Canva', emoji: '🖼️', cls: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:shadow-cyan-400/20' },
  ]},
]

function TechBadge({ name, emoji, cls }) {
  return (
    <motion.div whileHover={{ scale: 1.12, translateY: -4 }} whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border ${cls} text-sm font-medium cursor-default backdrop-blur-sm hover:shadow-lg transition-all duration-200`}>
      <span className="text-base leading-none">{emoji}</span>
      <span>{name}</span>
    </motion.div>
  )
}

export default function TechStack() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto" id="tech">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65 }}
        className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-5">
          <span>💻</span> Tech Stack
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Technologies I Use</span>
        </h2>
        <p className="text-gray-400 text-lg">Tools and frameworks I build with</p>
      </motion.div>

      <div className="space-y-10">
        {categories.map((cat, i) => (
          <motion.div key={cat.label} initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.07, duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl">{cat.icon}</span>
              <h3 className="text-base font-semibold text-gray-200 tracking-wide">{cat.label}</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-1" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {cat.techs.map(tech => <TechBadge key={tech.name} {...tech} />)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
