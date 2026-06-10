import { Database, Fingerprint, KeyRound, Network, Radar } from 'lucide-react';
import { ModuleCard } from '../components/ModuleCard';
import { useLearningLevel } from '../learningLevel';

type HomeProps = {
  navigate: (path: string) => void;
};

const homeContent = {
  kids: {
    eyebrow: 'Internet safety for kids',
    subtitle:
      'Learn simple ways to stay safer online. Pause before you click, keep secret codes private, and ask a trusted adult when something feels odd.',
    moduleIntro: 'Pick a card and try one simple safety habit.',
    whyTitle: 'Small choices help.',
    why:
      'A strange link, a shared password, or unknown Wi-Fi can cause problems. You can slow down, check first, and ask for help.',
    process: [
      ['Learn', 'Read a short idea.'],
      ['Try', 'Practice with a quick activity.'],
      ['Use it', 'Take one safe step online.'],
    ],
  },
  entry: {
    eyebrow: 'Cybersecurity for normal people',
    subtitle:
      'Threat Labs teaches practical cybersecurity through short lessons and interactive labs. It is designed for everyday internet users, students, and beginners who want calm explanations without scare tactics.',
    moduleIntro: 'Each card opens a focused topic with one practical interaction.',
    whyTitle: 'Most security problems begin with ordinary moments.',
    why:
      'A reused password, a convincing link, a public network, an old app, or a missing second factor can create openings. Threat Labs focuses on habits you can actually use: slow down, verify context, protect accounts, and understand where your data goes.',
    process: [
      ['Learn the concept', 'Read a short explanation in plain language with concrete examples.'],
      ['Test yourself', 'Use a client-side activity to practice recognizing the idea.'],
      ['Apply the habit', 'Leave with one action you can use on your real accounts and devices.'],
    ],
  },
  enthusiast: {
    eyebrow: 'Defensive security fundamentals',
    subtitle:
      'Threat Labs adds deeper diagnostics, harder scenarios, and technical notes for people who want to understand why common defenses work.',
    moduleIntro: 'Each card adds practical recognition patterns, technical context, and a defensive exercise.',
    whyTitle: 'Risk comes from systems, habits, and assumptions.',
    why:
      'Credential reuse, social engineering, endpoint exposure, metadata leakage, and weak recovery flows often overlap. Threat Labs frames each topic as a defensive decision: identify the signal, reduce the blast radius, and verify before trust.',
    process: [
      ['Model the concept', 'Connect the user-facing habit to the technical mechanism behind it.'],
      ['Analyze the scenario', 'Work through subtler examples and higher-friction decisions.'],
      ['Harden the workflow', 'Apply a defense that reduces likelihood, impact, or recovery time.'],
    ],
  },
};

const moduleDescriptions = {
  kids: [
    'Learn what can feel unsafe online.',
    'Find clues in strange messages.',
    'See where a website message goes.',
    'Try a password lock test.',
    'Learn why accounts ask for one more check.',
  ],
  entry: [
    'Learn the difference between malware, scams, stolen credentials, and everyday risk.',
    'Practice finding suspicious sender details, links, pressure, and requests.',
    'See how your device, Wi-Fi, ISP, and websites handle a normal visit.',
    'Try a local-only password estimate and learn what improves account defense.',
    'Compare SMS, authenticator apps, hardware keys, and passkeys.',
  ],
  enthusiast: [
    'Map threat categories to attack surface, common vectors, and risk reduction.',
    'Inspect sender domains, link mismatch, attachment risk, and social pressure.',
    'Trace DNS, TLS, IP metadata, cookies, and what each party may observe.',
    'Review entropy, pattern penalties, passphrases, and password manager strategy.',
    'Compare TOTP, SMS, push prompts, passkeys, and phishing-resistant MFA.',
  ],
};

const moduleTitles = {
  kids: ['Online Tricks', 'Tricky Messages', 'Website Paths', 'Passwords', 'Extra Sign-In Check'],
  entry: ['Understand Threats', 'Spot Phishing', 'Follow Your Data', 'Practice Passwords', 'Protect Accounts with 2FA'],
  enthusiast: ['Understand Threats', 'Spot Phishing', 'Follow Your Data', 'Practice Passwords', 'Protect Accounts with 2FA'],
};

const moduleBase = [
  { icon: Radar, title: 'Understand Threats', href: '/threats' },
  { icon: Fingerprint, title: 'Spot Phishing', href: '/phishing' },
  { icon: Network, title: 'Follow Your Data', href: '/networks-data' },
  { icon: KeyRound, title: 'Practice Passwords', href: '/password-lab' },
  { icon: Database, title: 'Protect Accounts with 2FA', href: '/two-factor' },
];

export function Home({ navigate }: HomeProps) {
  const { level } = useLearningLevel();
  const content = homeContent[level];
  const modules = moduleBase.map((module, index) => ({
    ...module,
    title: moduleTitles[level][index],
    description: moduleDescriptions[level][index],
  }));

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>Understand your risks. Build safer habits.</h1>
          <p>{content.subtitle}</p>
          <div className="hero-actions">
            <button type="button" className="button-primary" onClick={() => navigate('/threats')}>
              Start Learning
            </button>
            <button type="button" className="button-secondary" onClick={() => navigate('/password-lab')}>
              Practice Passwords
            </button>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Threat Labs learning focus">
          <div className="signal-row">
            <span>01</span>
            <strong>Learn the concept</strong>
          </div>
          <div className="signal-row">
            <span>02</span>
            <strong>Test yourself</strong>
          </div>
          <div className="signal-row">
            <span>03</span>
            <strong>Apply the habit</strong>
          </div>
        </aside>
      </section>

      <section className="section-block" aria-labelledby="modules-title">
        <div className="section-heading">
          <p className="eyebrow">Modules</p>
          <h2 id="modules-title">Small lessons for common decisions.</h2>
          <p>{content.moduleIntro}</p>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <ModuleCard key={module.title} {...module} onNavigate={navigate} />
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">Why this matters</p>
          <h2>{content.whyTitle}</h2>
        </div>
        <p>{content.why}</p>
      </section>

      <section className="process-section" aria-labelledby="lab-works-title">
        <div className="section-heading">
          <p className="eyebrow">How the lab works</p>
          <h2 id="lab-works-title">Learn, test, apply.</h2>
        </div>
        <div className="process-grid">
          {content.process.map(([title, copy], index) => (
            <article key={title}>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
