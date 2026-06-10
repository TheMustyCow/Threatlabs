import { InfoCard } from '../components/InfoCard';
import { PageHeader } from '../components/PageHeader';
import { PhishingDetector } from '../components/learning/PhishingDetector';
import { useLearningLevel } from '../learningLevel';

const phishingContent = {
  kids: {
    title: 'Pause before you click.',
    description: 'Some messages ask for a code, a password, or a fast click. Stop and ask first.',
    splitTitle: 'Tricky messages rush you.',
    splitCopy: 'Watch for surprise prizes, scary warnings, strange links, or secret-code questions. You can always stop.',
    signs: ['Strange sender', 'Big hurry', 'Unknown link', 'Surprise file', 'Asks for a code', 'Surprise prize'],
    signCopy: 'If it surprises you, pause and ask.',
  },
  entry: {
    title: 'Spot phishing messages.',
    description: 'They borrow trust from brands, schools, banks, deliveries, or people you know.',
    splitTitle: 'Phishing creates urgency, trust, fear, or curiosity.',
    splitCopy:
      'The message may ask you to sign in, open a file, send money, or share a verification code. The safest move is to pause, check the source, and open the service through a known address instead of a surprise link.',
    signs: ['Strange sender address', 'Urgent language', 'Suspicious links', 'Unexpected attachments', 'Spelling or formatting issues', 'Requests for passwords or codes'],
    signCopy: 'When this appears unexpectedly, slow down and verify the message through another trusted path.',
  },
  enthusiast: {
    title: 'Read phishing signals.',
    description: 'Look for sender-domain mismatch, suspicious link targets, attachment risk, unusual workflow requests, and pressure patterns.',
    splitTitle: 'Good phishing often looks routine, not dramatic.',
    splitCopy:
      'Inspect the envelope: sender domain, reply-to context, link destination, attachment type, requested action, and timing. The goal is defensive recognition, not panic.',
    signs: ['Sender spoofing', 'Lookalike domains', 'Link mismatch', 'Attachment risk', 'Credential or MFA-code request', 'Urgency and authority cues'],
    signCopy: 'Treat this as a signal to verify out-of-band or navigate directly to the known service.',
  },
};

export function Phishing() {
  const { level } = useLearningLevel();
  const content = phishingContent[level];

  return (
    <>
      <PageHeader
        eyebrow="Phishing"
        title={content.title}
        description={content.description}
      />

      <section className="split-section">
        <div>
          <p className="eyebrow">How it works</p>
          <h2>{content.splitTitle}</h2>
        </div>
        <p>{content.splitCopy}</p>
      </section>

      <section className="content-grid">
        {content.signs.map((sign) => (
          <InfoCard title={sign} key={sign}>
            <p>{content.signCopy}</p>
          </InfoCard>
        ))}
      </section>

      <PhishingDetector />
    </>
  );
}
