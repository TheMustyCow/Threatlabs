import { InfoCard } from '../components/InfoCard';
import { LearnMore } from '../components/LearnMore';
import { PageHeader } from '../components/PageHeader';
import { PasswordStrengthLab } from '../components/learning/PasswordStrengthLab';
import { useLearningLevel } from '../learningLevel';

const passwordContent = {
  kids: {
    title: 'Passwords protect your accounts.',
    description: 'Learn how to make passwords longer, private, and easier to remember.',
    passwordCards: [
      ['Make it long', 'Long passwords are harder to guess.'],
      ['Keep it private', 'Do not share passwords or login codes.'],
      ['Use a new one', 'Try not to use the same password everywhere.'],
    ],
    managerTitle: 'A password manager is a helper.',
    managerCopy: 'A password manager keeps passwords in one safer place. That is better than losing a paper list or hiding notes. With help from a trusted adult, it can make strong passwords and remember them for you.',
    managerCards: [
      ['Keeps them safe', 'It stores passwords for you.'],
      ['Makes new ones', 'It can make long passwords.'],
      ['Ask for help', 'A trusted adult can help set it up.'],
    ],
  },
  entry: {
    title: 'Build stronger password habits.',
    description: 'Use longer, unique passwords and let a manager handle the hard parts.',
    passwordCards: [
      ['Length matters', 'Long passwords or passphrases are usually harder to guess.'],
      ['Uniqueness matters', 'Reused passwords can fail on many sites after one breach.'],
      ['Avoid patterns', 'Names, dates, repeats, and keyboard runs are easier to guess.'],
    ],
    managerTitle: 'Password managers reduce the memory burden.',
    managerCopy: 'Password managers help because most people cannot safely memorize a different strong password for every account. Without one, passwords often end up reused, saved in insecure notes, or written on paper that can be lost or seen by someone else. A manager stores them in a protected vault, creates stronger unique passwords, and keeps account access more organized.',
    managerCards: [
      ['Generate', 'Create long random passwords for each account.'],
      ['Remember', 'Store them behind one strong master password or device unlock.'],
      ['Autofill carefully', 'Filling only on matching sites can help you spot impostors.'],
    ],
  },
  enthusiast: {
    title: 'Model password risk.',
    description: 'Compare length, search space, reuse, and predictable human patterns.',
    passwordCards: [
      ['Entropy is only a model', 'Search space helps, but real guesses exploit human patterns.'],
      ['Length expands cost', 'Long passphrases often beat short complex strings.'],
      ['Reuse changes impact', 'One leaked password can power credential stuffing elsewhere.'],
    ],
    managerTitle: 'Managers make unique credentials practical.',
    managerCopy: 'Password managers reduce the operational risk of human memory and ad hoc storage. Without a vault, credentials tend to drift into insecure notes, reused patterns, screenshots, or paper records that can be misplaced or exposed. A manager makes unique high-entropy credentials practical, centralizes protected storage, and helps keep recovery and autofill behavior more controlled.',
    managerCards: [
      ['Random by default', 'Generated passwords avoid many human pattern penalties.'],
      ['Per-site isolation', 'Unique credentials reduce breach blast radius.'],
      ['Recovery matters', 'Protect vault access, recovery codes, and trusted devices.'],
    ],
  },
};

export function PasswordLab() {
  const { level } = useLearningLevel();
  const content = passwordContent[level];

  return (
    <>
      <PageHeader
        eyebrow="Password"
        title={content.title}
        description={content.description}
      />

      <section className="content-grid">
        {content.passwordCards.map(([title, copy]) => (
          <InfoCard title={title} key={title}>
            <p>{copy}</p>
          </InfoCard>
        ))}
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">Password managers</p>
          <h2>{content.managerTitle}</h2>
        </div>
        <p>{content.managerCopy}</p>
      </section>

      <section className="content-grid">
        {content.managerCards.map(([title, copy]) => (
          <InfoCard title={title} key={title}>
            <p>{copy}</p>
          </InfoCard>
        ))}
      </section>

      <PasswordStrengthLab />

      <LearnMore
        copy="FTC Consumer Advice covers strong passwords, password managers, and safer ways to protect important accounts."
        source="FTC Password Guidance"
        href="https://consumer.ftc.gov/articles/protect-your-personal-information-hackers-and-scammers"
      />
    </>
  );
}
