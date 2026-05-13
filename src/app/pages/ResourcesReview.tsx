import { PageHeader } from '../components/PageHeader';
import { Quiz } from '../components/learning/Quiz';
import { useLearningLevel } from '../learningLevel';

const resourcesContent = {
  kids: {
    title: 'Remember a few simple safety habits.',
    description: 'Small safe choices help you enjoy the internet with less worry.',
    heading: 'A kid-friendly safety checklist.',
    checklist: ['Keep secret codes private.', 'Ask before clicking strange links.', 'Use strong secret phrases.', 'Tell a trusted adult if something feels wrong.', 'Do not open surprise files.', 'Use trusted Wi-Fi.', 'Keep devices updated.', 'Back up important things with help.'],
    nextTitle: 'Pick one safe habit to practice today.',
    nextCopy: 'Try asking before clicking a surprise link, or make one account safer with help from a trusted adult.',
  },
  entry: {
    title: 'Turn security lessons into a short checklist.',
    description: 'You do not need perfect security. You need a few reliable habits that reduce common risk.',
    heading: 'A practical checklist for everyday accounts.',
    checklist: ['Use unique passwords.', 'Use a password manager.', 'Enable 2FA.', 'Check URLs before signing in.', 'Keep software updated.', 'Avoid unknown attachments.', 'Be careful on public Wi-Fi.', 'Back up important data.'],
    nextTitle: 'Pick one account that matters and improve it today.',
    nextCopy:
      'Start with email, banking, school, work, or cloud storage. Give it a unique password, enable stronger 2FA if available, save recovery codes safely, and review where the account is signed in.',
  },
  enthusiast: {
    title: 'Review habits as controls that reduce likelihood, impact, or recovery time.',
    description: 'The best next step is usually a high-leverage control on a high-value account.',
    heading: 'A technical hygiene checklist.',
    checklist: ['Use unique manager-generated passwords.', 'Prefer phishing-resistant MFA where available.', 'Audit recovery email and phone paths.', 'Verify domains before authentication.', 'Patch browsers, OS, and extensions.', 'Limit extension permissions.', 'Separate sensitive accounts and profiles.', 'Keep tested backups.'],
    nextTitle: 'Harden one high-value workflow.',
    nextCopy:
      'Choose email, identity provider, cloud storage, or finance. Review recovery paths, rotate reused credentials, enable stronger MFA, and remove stale sessions or devices.',
  },
};

export function ResourcesReview() {
  const { level } = useLearningLevel();
  const content = resourcesContent[level];

  return (
    <>
      <PageHeader
        eyebrow="Review"
        title={content.title}
        description={content.description}
      />

      <section className="checklist-section" aria-labelledby="hygiene-title">
        <div className="section-heading">
          <p className="eyebrow">Cyber hygiene</p>
          <h2 id="hygiene-title">{content.heading}</h2>
        </div>
        <ul className="hygiene-list">
          {content.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Quiz />

      <section className="split-section">
        <div>
          <p className="eyebrow">Your next security upgrade</p>
          <h2>{content.nextTitle}</h2>
        </div>
        <p>{content.nextCopy}</p>
      </section>
    </>
  );
}
