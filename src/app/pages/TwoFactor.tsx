import { InfoCard } from '../components/InfoCard';
import { PageHeader } from '../components/PageHeader';
import { TwoFactorFlow, TwoFactorRecommendation } from '../components/learning/TwoFactorFlow';
import { useLearningLevel } from '../learningLevel';

const twoFactorContent = {
  kids: {
    title: '2FA is a second step that helps prove it is really you.',
    description: 'A password is one secret. A second step can be a code, a trusted device, or help from a grown-up.',
    splitTitle: 'One secret plus one extra check.',
    splitCopy: 'If someone guesses a password, the second step can help keep the account closed.',
    cards: [
      ['Text codes', 'A code can arrive on a phone. It is better than no extra step.'],
      ['Authenticator apps', 'An app can make a new code when you need to sign in.'],
      ['Security keys', 'A small key can help prove the right person is signing in.'],
      ['Passkeys', 'A passkey lets a trusted device help you sign in safely.'],
    ],
  },
  entry: {
    title: 'Two-factor authentication adds a second check before account access.',
    description: 'Passwords can be guessed, reused, phished, or leaked. 2FA makes a stolen password less useful by asking for another proof.',
    splitTitle: 'Something you know, plus something you have or are.',
    splitCopy:
      'A password is something you know. An authenticator app, hardware key, passkey, device prompt, or biometric check can add a second factor. Any 2FA is usually better than none, though some options are stronger than others.',
    cards: [
      ['SMS codes', 'Convenient and better than no 2FA, but phone numbers can be targeted or transferred through account abuse.'],
      ['Authenticator apps', 'Apps generate short-lived codes on your device and are a strong beginner-friendly upgrade for many accounts.'],
      ['Hardware security keys', 'Physical keys are strong for important accounts because they resist many phishing attempts.'],
      ['Passkeys', 'Passkeys use device-backed cryptography and can reduce password and phishing risk when services support them.'],
    ],
  },
  enthusiast: {
    title: 'MFA reduces identity risk by requiring a second proof.',
    description: 'Compare SMS, TOTP, push prompts, passkeys, and hardware keys by usability, recoverability, and phishing resistance.',
    splitTitle: 'Different factors resist different failure modes.',
    splitCopy:
      'SMS and push prompts can help, but TOTP, passkeys, and hardware keys often provide stronger resistance to phishing or SIM-swap risk. Recovery codes matter because lockout recovery can become the weakest path.',
    cards: [
      ['SMS codes', 'Useful baseline, but vulnerable to SIM-swap, number recycling, and social engineering of phone accounts.'],
      ['TOTP apps', 'Authenticator apps generate time-based codes locally and avoid phone-number dependency.'],
      ['Hardware keys', 'FIDO security keys bind authentication to the legitimate origin, making many phishing flows fail.'],
      ['Passkeys', 'Passkeys use public-key cryptography and can be synced or device-bound depending on provider choices.'],
    ],
  },
};

export function TwoFactor() {
  const { level } = useLearningLevel();
  const content = twoFactorContent[level];

  return (
    <>
      <PageHeader
        eyebrow="2FA"
        title={content.title}
        description={content.description}
      />

      <section className="split-section">
        <div>
          <p className="eyebrow">The basic idea</p>
          <h2>{content.splitTitle}</h2>
        </div>
        <p>{content.splitCopy}</p>
      </section>

      <section className="content-grid">
        {content.cards.map(([title, copy]) => (
          <InfoCard title={title} key={title}>
            <p>{copy}</p>
          </InfoCard>
        ))}
      </section>

      <TwoFactorFlow />
      <TwoFactorRecommendation />
    </>
  );
}
