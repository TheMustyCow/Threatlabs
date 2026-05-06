import { Shield, Lock, Target, Award } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-semibold">Threat Labs</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Modules</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Quiz</a>
            </nav>
            <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors">
              Start Training
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Train Your Cyber Instincts
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Learn essential cybersecurity habits through simple, interactive modules designed for everyday users.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors">
              Start Training
            </button>
            <button className="px-6 py-3 border border-gray-700 hover:border-cyan-500 rounded-lg transition-colors">
              Explore Modules
            </button>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>
            <Shield className="relative w-32 h-32 text-cyan-400" strokeWidth={1.5} />
          </div>
        </div>
      </section>

      {/* Learning Modules */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Learning Modules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            icon={<Lock className="w-8 h-8" />}
            title="Password Strength Arcade"
            description="Learn to create strong, memorable passwords through interactive challenges"
            tag="Beginner Friendly"
            tagColor="bg-green-500/10 text-green-400"
          />
          <ModuleCard
            icon={<Target className="w-8 h-8" />}
            title="Phishing Detector"
            description="Train your eye to spot suspicious emails and malicious links"
            tag="Interactive"
            tagColor="bg-cyan-500/10 text-cyan-400"
          />
          <ModuleCard
            icon={<Shield className="w-8 h-8" />}
            title="Two-Factor Authentication"
            description="Understand and set up 2FA for better account security"
            tag="Essential"
            tagColor="bg-blue-500/10 text-blue-400"
          />
          <ModuleCard
            icon={<Award className="w-8 h-8" />}
            title="Cyber Hygiene Quiz"
            description="Test your knowledge with real-world security scenarios"
            tag="Challenge"
            tagColor="bg-amber-500/10 text-amber-400"
          />
        </div>
      </section>

      {/* Cyber Basics */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Cyber Basics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <BasicCard
            title="Use Strong, Unique Passwords"
            description="Never reuse passwords across sites. Use a password manager to keep track."
          />
          <BasicCard
            title="Enable Two-Factor Authentication"
            description="Add an extra layer of security to your most important accounts."
          />
          <BasicCard
            title="Watch for Suspicious Links"
            description="Always verify URLs before clicking. Hover to preview destination."
          />
          <BasicCard
            title="Keep Devices Updated"
            description="Install security patches and updates as soon as they're available."
          />
        </div>
      </section>

      {/* Score Panel */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Cyber Readiness</h2>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Score</span>
              <span className="text-cyan-400 font-semibold">78/100</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full" style={{width: '78%'}}></div>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm">
            Complete more modules to improve your score
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-cyan-400" />
              <span className="font-semibold">Threat Labs</span>
            </div>
            <p className="text-gray-400 text-sm text-center">
              Building cyber awareness, one user at a time
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">About</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ModuleCard({ icon, title, description, tag, tagColor }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all group">
      <div className="mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <span className={`inline-block px-3 py-1 rounded-full text-xs ${tagColor}`}>
        {tag}
      </span>
    </div>
  );
}

function BasicCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h3 className="font-semibold mb-2 text-cyan-400">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
