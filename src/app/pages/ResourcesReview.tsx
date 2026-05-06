import { PageHeader } from '../components/PageHeader';
import { Quiz } from '../components/learning/Quiz';

const checklist = [
  'Use unique passwords.',
  'Use a password manager.',
  'Enable 2FA.',
  'Check URLs before signing in.',
  'Keep software updated.',
  'Avoid unknown attachments.',
  'Be careful on public Wi-Fi.',
  'Back up important data.',
];

export function ResourcesReview() {
  return (
    <>
      <PageHeader
        eyebrow="Review"
        title="Turn security lessons into a short checklist."
        description="You do not need perfect security. You need a few reliable habits that reduce common risk."
      />

      <section className="checklist-section" aria-labelledby="hygiene-title">
        <div className="section-heading">
          <p className="eyebrow">Cyber hygiene</p>
          <h2 id="hygiene-title">A practical checklist for everyday accounts.</h2>
        </div>
        <ul className="hygiene-list">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Quiz />

      <section className="split-section">
        <div>
          <p className="eyebrow">Your next security upgrade</p>
          <h2>Pick one account that matters and improve it today.</h2>
        </div>
        <p>
          Start with email, banking, school, work, or cloud storage. Give it a unique password, enable stronger 2FA if
          available, save recovery codes safely, and review where the account is signed in.
        </p>
      </section>
    </>
  );
}
