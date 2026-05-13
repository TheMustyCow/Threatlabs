import { InfoCard } from '../components/InfoCard';
import { PageHeader } from '../components/PageHeader';
import { PasswordStrengthLab } from '../components/learning/PasswordStrengthLab';
import { useLearningLevel } from '../learningLevel';

const passwordContent = {
  kids: {
    title: 'A strong password is like a strong lock.',
    description: 'Use a made-up sample here. The lab stays on your device and helps you learn what makes a secret phrase stronger.',
    cards: [
      ['Long secrets help', 'A longer secret phrase is harder to guess than a tiny one.'],
      ['Keep it private', 'Do not share passwords or login codes in chats, games, or messages.'],
      ['Ask for help', 'A trusted adult can help set up a password manager.'],
      ['Use different secrets', 'Do not use the same secret for every account.'],
    ],
  },
  entry: {
    title: 'Test password strength without sending anything anywhere.',
    description: 'The lab estimates strength locally in your browser and teaches why length, uniqueness, and pattern avoidance matter.',
    cards: [
      ['Length matters', 'A longer password or passphrase usually gives attackers more possibilities to guess than a short complex password.'],
      ['Unique passwords matter', 'If one service is breached, reused passwords can let attackers try the same login elsewhere.'],
      ['Password managers help', 'A password manager can create and remember strong unique passwords so you do not have to memorize each one.'],
      ['Passphrases can be practical', 'Several unrelated words can be easier to type and remember while still being long.'],
    ],
  },
  enthusiast: {
    title: 'Estimate password strength from length, search space, and predictable patterns.',
    description: 'This local lab uses an educational entropy-style estimate, then applies caps and penalties for short, common, repeated, or sequential patterns.',
    cards: [
      ['Entropy is a model', 'More possible guesses usually means more work, but human patterns reduce real-world strength.'],
      ['Length usually wins', 'Long passphrases often beat short complex strings because each added character or word expands the search space.'],
      ['Reuse changes risk', 'A strong password reused across sites can fail after one breach because attackers automate credential stuffing.'],
      ['Managers reduce friction', 'Password managers make unique random passwords practical and reduce memorization pressure.'],
    ],
  },
};

export function PasswordLab() {
  const { level } = useLearningLevel();
  const content = passwordContent[level];

  return (
    <>
      <PageHeader
        eyebrow="Password Lab"
        title={content.title}
        description={content.description}
      />

      <PasswordStrengthLab />

      <section className="content-grid">
        {content.cards.map(([title, copy]) => (
          <InfoCard title={title} key={title}>
            <p>{copy}</p>
          </InfoCard>
        ))}
      </section>
    </>
  );
}
