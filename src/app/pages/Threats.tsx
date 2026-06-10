import { InfoCard } from '../components/InfoCard';
import { PageHeader } from '../components/PageHeader';
import { ThreatRevealGrid } from '../components/learning/ThreatRevealGrid';
import { useLearningLevel } from '../learningLevel';

const threatsContent = {
  kids: {
    title: 'Spot online tricks.',
    description: 'Learn what feels strange, then pause and ask for help.',
    cards: [
      ['Unsafe apps', 'Only install apps with help from a trusted adult.'],
      ['Tricky messages', 'Some messages try to make you click fast.'],
      ['Secret codes', 'Do not share passwords or login codes.'],
      ['Lost information', 'If a site has a problem, an adult can help fix your account.'],
      ['Big hurry', 'If a message says “hurry,” slow down.'],
    ],
    mapTitle: 'Click a card for a safe step.',
    mapCopy: 'Match a problem with what to do next.',
  },
  entry: {
    title: 'Understand common threats.',
    description: 'Some threats are technical, some are social, and many combine both.',
    cards: [
      ['Malware', 'Malware is harmful software. It might arrive through a fake app, unsafe download, or infected attachment.'],
      ['Scams', 'Scams try to make you pay, share information, or trust a false story. The technology is often simple.'],
      ['Credential theft', 'Credential theft means someone gets a password, session, code, or login token that can open an account.'],
      ['Data leaks', 'Data leaks expose information from services you use. A leak can fuel spam, scams, and password attacks.'],
      ['Social engineering', 'Social engineering manipulates people with urgency, trust, fear, curiosity, or helpfulness.'],
    ],
    mapTitle: 'Click a card to reveal one practical defense.',
    mapCopy: 'Beginners do not need to memorize every attack name. Start by matching common risks to repeatable habits.',
  },
  enthusiast: {
    title: 'Map threat patterns.',
    description:
      'Start with attack surface, vector, credential exposure, data impact, and recovery path.',
    cards: [
      ['Malware vectors', 'Downloads, macros, extensions, and trojanized installers can create endpoint exposure.'],
      ['Fraud and scams', 'Scams combine pretext, urgency, and payment rails to turn trust into action.'],
      ['Credential abuse', 'Phishing, reuse, token theft, and credential stuffing all target identity control.'],
      ['Breach fallout', 'Leaked emails, hashes, sessions, and profile data can power later attacks.'],
      ['Social engineering', 'Attackers exploit authority, scarcity, fear, curiosity, or routine workflow patterns.'],
    ],
    mapTitle: 'Click a card to connect vector, impact, and defense.',
    mapCopy: 'Think in risk-reduction layers: reduce exposure, detect suspicious context, limit blast radius, and recover cleanly.',
  },
};

export function Threats() {
  const { level } = useLearningLevel();
  const content = threatsContent[level];

  return (
    <>
      <PageHeader
        eyebrow="Threats"
        title={content.title}
        description={content.description}
      />

      <section className="content-grid">
        {content.cards.map(([title, copy]) => (
          <InfoCard title={title} key={title}>
            <p>{copy}</p>
          </InfoCard>
        ))}
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Threat map</p>
          <h2>{content.mapTitle}</h2>
          <p>{content.mapCopy}</p>
        </div>
        <ThreatRevealGrid />
      </section>
    </>
  );
}
