import { CheckCircle2, KeyRound, LockKeyhole, Smartphone } from 'lucide-react';
import { useState } from 'react';

const steps = [
  {
    title: 'Enter password',
    copy: 'The password proves something you know. If it is stolen, this step alone may not stop account takeover.',
    icon: LockKeyhole,
  },
  {
    title: 'Verify second factor',
    copy: 'A code, passkey, authenticator prompt, or hardware key proves something you have or something you are.',
    icon: Smartphone,
  },
  {
    title: 'Access granted',
    copy: 'The account opens after both checks pass. An attacker with only the password is much less likely to get in.',
    icon: CheckCircle2,
  },
];

export function TwoFactorFlow() {
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
  return (
    <article className="recommendation-card">
      <div className="icon-disc" aria-hidden="true">
        <KeyRound size={22} />
      </div>
      <div>
        <h3>Which 2FA should I use?</h3>
        <ul className="recommendation-list">
          <li>
            <strong>Beginner:</strong> Use an authenticator app for important accounts.
          </li>
          <li>
            <strong>Stronger:</strong> Use passkeys or a hardware security key when available.
          </li>
          <li>
            <strong>Backup:</strong> Store recovery codes somewhere safe and private.
          </li>
        </ul>
      </div>
    </article>
  );
}
