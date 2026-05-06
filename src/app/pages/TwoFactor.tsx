import { InfoCard } from '../components/InfoCard';
import { PageHeader } from '../components/PageHeader';
import { TwoFactorFlow, TwoFactorRecommendation } from '../components/learning/TwoFactorFlow';

export function TwoFactor() {
  return (
    <>
      <PageHeader
        eyebrow="2FA"
        title="Two-factor authentication adds a second check before account access."
        description="Passwords can be guessed, reused, phished, or leaked. 2FA makes a stolen password less useful by asking for another proof."
      />

      <section className="split-section">
        <div>
          <p className="eyebrow">The basic idea</p>
          <h2>Something you know, plus something you have or are.</h2>
        </div>
        <p>
          A password is something you know. An authenticator app, hardware key, passkey, device prompt, or biometric check
          can add a second factor. Any 2FA is usually better than none, though some options are stronger than others.
        </p>
      </section>

      <section className="content-grid">
        <InfoCard title="SMS codes">
          <p>Convenient and better than no 2FA, but phone numbers can be targeted or transferred through account abuse.</p>
        </InfoCard>
        <InfoCard title="Authenticator apps">
          <p>Apps generate short-lived codes on your device and are a strong beginner-friendly upgrade for many accounts.</p>
        </InfoCard>
        <InfoCard title="Hardware security keys">
          <p>Physical keys are strong for important accounts because they resist many phishing attempts.</p>
        </InfoCard>
        <InfoCard title="Passkeys">
          <p>Passkeys use device-backed cryptography and can reduce password and phishing risk when services support them.</p>
        </InfoCard>
      </section>

      <TwoFactorFlow />
      <TwoFactorRecommendation />
    </>
  );
}
