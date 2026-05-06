import { InfoCard } from '../components/InfoCard';
import { PageHeader } from '../components/PageHeader';
import { PhishingDetector } from '../components/learning/PhishingDetector';

const warningSigns = [
  'Strange sender address',
  'Urgent language',
  'Suspicious links',
  'Unexpected attachments',
  'Spelling or formatting issues',
  'Requests for passwords or codes',
];

export function Phishing() {
  return (
    <>
      <PageHeader
        eyebrow="Phishing"
        title="Phishing messages try to make a bad action feel normal."
        description="They often borrow trust from brands, schools, employers, banks, delivery services, or people you know."
      />

      <section className="split-section">
        <div>
          <p className="eyebrow">How it works</p>
          <h2>Phishing creates urgency, trust, fear, or curiosity.</h2>
        </div>
        <p>
          The message may ask you to sign in, open a file, send money, or share a verification code. The safest move is
          to pause, check the source, and open the service through a known address instead of a surprise link.
        </p>
      </section>

      <section className="content-grid">
        {warningSigns.map((sign) => (
          <InfoCard title={sign} key={sign}>
            <p>When this appears unexpectedly, slow down and verify the message through another trusted path.</p>
          </InfoCard>
        ))}
      </section>

      <PhishingDetector />
    </>
  );
}
