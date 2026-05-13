import { useEffect, useMemo, useState } from 'react';
import { useLearningLevel } from '../../learningLevel';

const pathStepsByLevel = {
  kids: [
    ['Device', 'Your device writes the “letter” asking for a website.', 'It knows what you type before sending it.', 'Keep your device locked and ask before sharing private info.'],
    ['Wi-Fi / Router', 'Your Wi-Fi router is the first stop for the message.', 'The network name and connection may be visible.', 'Use trusted Wi-Fi when possible.'],
    ['Internet path', 'Other networks help deliver the message.', 'They help move the message but should not see protected page details.', 'Look for HTTPS on important sites.'],
    ['Website', 'The website reads the request and sends a page back.', 'The site sees what you send to it.', 'Only type secrets on sites you trust.'],
    ['Back to you', 'The answer travels back so your browser can show the page.', 'The site may remember you with cookies.', 'Sign out on shared devices.'],
  ],
  entry: [
    ['Device', 'Your phone or laptop starts the request and may store local files, app data, browser history, and cookies.', 'Your device can see everything you type before it is sent.', 'Lock the device, keep it updated, and be careful about shared devices.'],
    ['Wi-Fi / Router', 'Your request leaves your device through a home router, school network, cafe Wi-Fi, or mobile hotspot.', 'The network may see the sites you connect to, especially if traffic is not protected well.', 'Use trusted networks for sensitive tasks and avoid fake look-alike Wi-Fi names.'],
    ['ISP / Network', 'Your internet provider or organization network forwards traffic toward the destination.', 'They can often see connection metadata such as timing, IP addresses, and domain lookups.', 'HTTPS protects page contents, but metadata can still exist.'],
    ['Website / Server', 'The service receives your request and decides what page, file, or app response to send back.', 'The service can see information you submit, your account activity, IP address, and browser details.', 'Share only what the service needs and review privacy settings.'],
    ['Response', 'The server sends data back through the same chain so your browser can display the page.', 'Cookies and tracking pixels may help services remember sessions or measure activity.', 'Clear old sessions, block unnecessary tracking, and sign out on shared devices.'],
  ],
  enthusiast: [
    ['Device', 'The browser prepares DNS lookups, connection state, cookies, headers, and request payloads.', 'Local malware, extensions, or shared profiles can observe high-value data before encryption.', 'Patch, restrict extensions, and isolate profiles for sensitive accounts.'],
    ['DNS / Resolver', 'A resolver maps a domain to network addresses before the browser connects.', 'Resolver logs may include queried domains and timestamps.', 'Use a trusted resolver and understand that DNS privacy varies by setup.'],
    ['Network / ISP', 'Routers and providers forward packets based on IP addressing and routing tables.', 'They can often observe IPs, timing, volume, and sometimes domain metadata.', 'HTTPS protects content; VPNs shift trust rather than remove it.'],
    ['TLS / Server', 'TLS authenticates the server certificate and encrypts HTTP content in transit.', 'The server sees submitted data, account actions, IP address, and client signals.', 'Verify domains and limit unnecessary data disclosure.'],
    ['Storage / Tracking', 'Responses can set cookies, scripts, cache entries, and tracking pixels.', 'Services may correlate sessions, devices, and behavior across time.', 'Review privacy settings, clear stale sessions, and block unnecessary trackers.'],
  ],
};

export function DataPathExplorer() {
  const { level } = useLearningLevel();
  const pathSteps = useMemo(
    () => pathStepsByLevel[level].map(([name, detail, visible, habit]) => ({ name, detail, visible, habit })),
    [level],
  );
  const [activeStepName, setActiveStepName] = useState(pathSteps[0].name);
  const activeStep = pathSteps.find((step) => step.name === activeStepName) ?? pathSteps[0];

  useEffect(() => {
    setActiveStepName(pathSteps[0].name);
  }, [level, pathSteps]);

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
            onClick={() => setActiveStepName(step.name)}
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
