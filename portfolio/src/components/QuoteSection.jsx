import { motion } from 'framer-motion'

export default function QuoteSection() {
  return (
    <section className="py-24 px-4 max-w-4xl mx-auto" id="quote">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65 }}
        className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-sm font-medium mb-5">
          <span>✍️</span> Dev Quote
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Words to Code By</span>
        </h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.75 }}
        className="relative rounded-2xl p-[2px] overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-2xl opacity-80"
          style={{ background: 'conic-gradient(from 0deg, #3b82f6 0%, #8b5cf6 25%, #ec4899 50%, #06b6d4 75%, #3b82f6 100%)' }} />
        <div className="relative rounded-2xl bg-[#0d1117] p-8 text-center">
          <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical"
            alt="Random Dev Quote" className="mx-auto max-w-full" loading="lazy" />
        </div>
      </motion.div>

      <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }} className="mt-20 text-center space-y-2">
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6" />
        <p className="text-gray-500 text-sm">
          Built with ❤️ by{' '}
          <a href="https://www.linkedin.com/in/kowshikan-mathivarnan-b3a1ab314"
            target="_blank" rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
            Kowshigan Mathivarnan
          </a>
        </p>
        <p className="text-gray-600 text-xs">React · Tailwind CSS · Framer Motion · Vite</p>
        <p className="text-gray-700 text-xs mt-1">
          © {new Date().getFullYear()} ·{' '}
          <a href="https://github.com/kowshi1119" target="_blank" rel="noopener noreferrer"
            className="hover:text-gray-500 transition-colors">@kowshi1119</a>
        </p>
      </motion.footer>
    </section>
  )
}
