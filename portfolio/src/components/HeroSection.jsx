import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 pt-20 pb-10">
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, type: 'spring', stiffness: 90 }}
          className="mx-auto mb-10 relative w-36 h-36 flex items-center justify-center"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute w-44 h-44 rounded-full border border-blue-500/20" style={{ borderStyle: 'dashed' }} />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute w-52 h-52 rounded-full border border-purple-500/15" style={{ borderStyle: 'dotted' }} />
          <div className="relative w-36 h-36 rounded-full p-[2px]"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)' }}>
            <div className="w-full h-full rounded-full bg-[#0d1117] flex items-center justify-center">
              <span className="text-6xl select-none">👨‍💻</span>
            </div>
          </div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute w-44 h-44">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(96,165,250,0.7)]" />
          </motion.div>
        </motion.div>

        <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Kowshigan
          </span>
          <br />
          <span className="text-white/90">Mathivarnan</span>
        </motion.h1>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-blue-300 text-sm">@kowshi1119</span>
        </motion.div>

        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Aspiring Software Engineer&nbsp;&nbsp;·&nbsp;&nbsp;
          <span className="text-blue-400">AI</span>&nbsp;&nbsp;·&nbsp;&nbsp;
          <span className="text-cyan-400">Full-Stack</span>&nbsp;&nbsp;·&nbsp;&nbsp;
          <span className="text-purple-400">Android</span>&nbsp;&nbsp;·&nbsp;&nbsp;
          <span className="text-pink-400">Problem Solver</span>
        </motion.p>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-sm">
          <span>🏆</span>
          <span>Winner — Q4US Code Art Challenge (LKR 100,000 Prize)</span>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="https://www.linkedin.com/in/kowshikan-mathivarnan-b3a1ab314"
            target="_blank" rel="noopener noreferrer"
            className="group px-7 py-3 rounded-xl font-semibold text-white relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb, #0891b2)' }}>
            <span className="relative z-10">Connect on LinkedIn</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
          </a>
          <a href="mailto:Kowshigankowshi39@gmail.com"
            className="px-7 py-3 rounded-xl font-semibold border border-blue-500/40 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            Get In Touch
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.7 }}
          className="mt-16">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-blue-400/70" />
          </motion.div>
          <p className="text-gray-600 text-xs mt-2 tracking-widest uppercase">scroll</p>
        </motion.div>
      </div>
    </section>
  )
}
