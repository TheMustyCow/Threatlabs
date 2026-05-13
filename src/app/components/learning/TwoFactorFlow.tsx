import { CheckCircle2, KeyRound, LockKeyhole, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { useLearningLevel } from '../../learningLevel';

const stepsByLevel = {
  kids: [
    ['Enter password', 'First you type the secret you know.', LockKeyhole],
    ['Use second step', 'Then a trusted phone, app, or key helps prove it is you.', Smartphone],
    ['Account opens', 'The account opens after both checks pass.', CheckCircle2],
  ],
  entry: [
    ['Enter password', 'The password proves something you know. If it is stolen, this step alone may not stop account takeover.', LockKeyhole],
    ['Verify second factor', 'A code, passkey, authenticator prompt, or hardware key proves something you have or something you are.', Smartphone],
    ['Access granted', 'The account opens after both checks pass. An attacker with only the password is much less likely to get in.', CheckCircle2],
  ],
  enthusiast: [
    ['Password check', 'The password starts the session, but phishing or reuse can make it insufficient by itself.', LockKeyhole],
    ['Factor challenge', 'TOTP, passkeys, or hardware keys add possession or cryptographic proof; phishing resistance depends on the method.', Smartphone],
    ['Session issued', 'After verification, the service issues access. Recovery and session controls still matter.', CheckCircle2],
  ],
};

export function TwoFactorFlow() {
  const { level } = useLearningLevel();
  const steps = stepsByLevel[level].map(([title, copy, icon]) => ({ title, copy, icon }));
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];
  const ActiveIcon = activeStep.icon;

  return (
    <section className="interactive-panel" aria-labelledby="two-factor-flow-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Interactive</p>
          <h2 id="two-factor-flow-title">Account Sign-In Flow</h2>
        </div>
        <p>Step {activeIndex + 1} of 3</p>
      </div>

      <div className="factor-flow">
        {steps.map((step, index) => {
          const StepIcon = step.icon;

          return (
            <button
              className={index === activeIndex ? 'factor-step is-active' : 'factor-step'}
              type="button"
              key={step.title}
              onClick={() => setActiveIndex(index)}
              aria-current={index === activeIndex ? 'step' : undefined}
            >
              <StepIcon size={20} aria-hidden="true" />
              <span>{step.title}</span>
            </button>
          );
        })}
      </div>

      <article className="factor-detail" aria-live="polite">
        <ActiveIcon size={34} aria-hidden="true" />
        <h3>{activeStep.title}</h3>
        <p>{activeStep.copy}</p>
      </article>
    </section>
  );
}

export function TwoFactorRecommendation() {
  const { level } = useLearningLevel();
  const recommendations = {
    kids: [
      ['Beginner', 'Ask a trusted adult to help turn on a second step.'],
      ['Stronger', 'Use a trusted device or passkey when available.'],
      ['Backup', 'Keep recovery codes private and safe.'],
    ],
    entry: [
      ['Beginner', 'Use an authenticator app for important accounts.'],
      ['Stronger', 'Use passkeys or a hardware security key when available.'],
      ['Backup', 'Store recovery codes somewhere safe and private.'],
    ],
    enthusiast: [
      ['Baseline', 'Use TOTP rather than SMS where practical.'],
      ['Stronger', 'Prefer passkeys or FIDO hardware keys for phishing resistance.'],
      ['Recovery', 'Protect recovery codes and account recovery channels like high-value credentials.'],
    ],
  }[level];

  return (
    <article className="recommendation-card">
      <div className="icon-disc" aria-hidden="true">
        <KeyRound size={22} />
      </div>
      <div>
        <h3>Which 2FA should I use?</h3>
        <ul className="recommendation-list">
          {recommendations.map(([label, copy]) => (
            <li key={label}>
              <strong>{label}:</strong> {copy}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
