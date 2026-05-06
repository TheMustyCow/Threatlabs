import { Database, Fingerprint, KeyRound, Network, Radar } from 'lucide-react';
import { ModuleCard } from '../components/ModuleCard';

type HomeProps = {
  navigate: (path: string) => void;
};

const modules = [
  {
    icon: Radar,
    title: 'Understand Threats',
    description: 'Learn the difference between malware, scams, stolen credentials, and everyday risk.',
    href: '/threats',
  },
  {
    icon: Fingerprint,
    title: 'Spot Phishing',
    description: 'Practice finding suspicious sender details, links, pressure, and requests.',
    href: '/phishing',
  },
  {
    icon: Network,
    title: 'Follow Your Data',
    description: 'See how your device, Wi-Fi, ISP, and websites handle a normal visit.',
    href: '/networks-data',
  },
  {
    icon: KeyRound,
    title: 'Test Password Strength',
    description: 'Try a local-only password estimate and learn what improves account defense.',
    href: '/password-lab',
  },
  {
    icon: Database,
    title: 'Protect Accounts with 2FA',
    description: 'Compare SMS, authenticator apps, hardware keys, and passkeys.',
    href: '/two-factor',
  },
];

export function Home({ navigate }: HomeProps) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Cybersecurity for normal people</p>
          <h1>Understand your risks. Build safer habits.</h1>
          <p>
            Threat Labs teaches practical cybersecurity through short lessons and interactive labs. It is designed for
            everyday internet users, students, and beginners who want calm explanations without scare tactics.
          </p>
          <div className="hero-actions">
            <button type="button" className="button-primary" onClick={() => navigate('/threats')}>
              Start Learning
            </button>
            <button type="button" className="button-secondary" onClick={() => navigate('/password-lab')}>
              Try Password Lab
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
          <p>Each card opens a focused topic with one practical interaction.</p>
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
          <h2>Most security problems begin with ordinary moments.</h2>
        </div>
        <p>
          A reused password, a convincing link, a public network, an old app, or a missing second factor can create
          openings. Threat Labs focuses on habits you can actually use: slow down, verify context, protect accounts, and
          understand where your data goes.
        </p>
      </section>

      <section className="process-section" aria-labelledby="lab-works-title">
        <div className="section-heading">
          <p className="eyebrow">How the lab works</p>
          <h2 id="lab-works-title">Learn, test, apply.</h2>
        </div>
        <div className="process-grid">
          <article>
            <span>1</span>
            <h3>Learn the concept</h3>
            <p>Read a short explanation in plain language with concrete examples.</p>
          </article>
          <article>
            <span>2</span>
            <h3>Test yourself</h3>
            <p>Use a client-side activity to practice recognizing the idea.</p>
          </article>
          <article>
            <span>3</span>
            <h3>Apply the habit</h3>
            <p>Leave with one action you can use on your real accounts and devices.</p>
          </article>
        </div>
      </section>
    </>
  );
}
