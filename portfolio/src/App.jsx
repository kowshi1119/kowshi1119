import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SocialSection from './components/SocialSection'
import TechStack from './components/TechStack'
import GitHubStats from './components/GitHubStats'
import QuoteSection from './components/QuoteSection'

function App() {
  return (
    <div className="relative min-h-screen bg-[#0d1117] text-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SocialSection />
        <TechStack />
        <GitHubStats />
        <QuoteSection />
      </main>
    </div>
  )
}

export default App
