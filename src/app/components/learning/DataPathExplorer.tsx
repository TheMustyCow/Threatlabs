import { useState } from 'react';

const pathSteps = [
  {
    name: 'Device',
    detail: 'Your phone or laptop starts the request and may store local files, app data, browser history, and cookies.',
    visible: 'Your device can see everything you type before it is sent.',
    habit: 'Lock the device, keep it updated, and be careful about shared devices.',
  },
  {
    name: 'Wi-Fi / Router',
    detail: 'Your request leaves your device through a home router, school network, cafe Wi-Fi, or mobile hotspot.',
    visible: 'The network may see the sites you connect to, especially if traffic is not protected well.',
    habit: 'Use trusted networks for sensitive tasks and avoid fake look-alike Wi-Fi names.',
  },
  {
    name: 'ISP / Network',
    detail: 'Your internet provider or organization network forwards traffic toward the destination.',
    visible: 'They can often see connection metadata such as timing, IP addresses, and domain lookups.',
    habit: 'HTTPS protects page contents, but metadata can still exist.',
  },
  {
    name: 'Website / Server',
    detail: 'The service receives your request and decides what page, file, or app response to send back.',
    visible: 'The service can see information you submit, your account activity, IP address, and browser details.',
    habit: 'Share only what the service needs and review privacy settings.',
  },
  {
    name: 'Response',
    detail: 'The server sends data back through the same chain so your browser can display the page.',
    visible: 'Cookies and tracking pixels may help services remember sessions or measure activity.',
    habit: 'Clear old sessions, block unnecessary tracking, and sign out on shared devices.',
  },
];

export function DataPathExplorer() {
  const [activeStep, setActiveStep] = useState(pathSteps[0]);

  return (
    <section className="interactive-panel" aria-labelledby="data-path-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Interactive</p>
          <h2 id="data-path-title">Data Path Explorer</h2>
        </div>
        <p>Click each stop to see what may be visible.</p>
      </div>

      <div className="data-flow" aria-label="Website visit data path">
        {pathSteps.map((step, index) => (
          <button
            className={activeStep.name === step.name ? 'flow-step is-active' : 'flow-step'}
            type="button"
            key={step.name}
            onClick={() => setActiveStep(step)}
          >
            <span>{index + 1}</span>
            {step.name}
          </button>
        ))}
      </div>

      <article className="path-detail" aria-live="polite">
        <h3>{activeStep.name}</h3>
        <p>{activeStep.detail}</p>
        <dl>
          <div>
            <dt>What may be visible</dt>
            <dd>{activeStep.visible}</dd>
          </div>
          <div>
            <dt>Useful habit</dt>
            <dd>{activeStep.habit}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
