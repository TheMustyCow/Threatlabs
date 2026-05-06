import { useState } from 'react';

const threats = [
  {
    name: 'Malware',
    what: 'Software designed to damage a device, spy on activity, or take control of files.',
    impact: 'It can slow devices, steal data, or lock files for payment.',
    defense: 'Install updates, avoid unknown downloads, and use built-in security tools.',
  },
  {
    name: 'Phishing',
    what: 'A message that pretends to be trusted so you click, sign in, or share a code.',
    impact: 'It can lead to stolen passwords, financial loss, or account takeover.',
    defense: 'Check the sender, inspect links, and visit sites directly instead of using surprise links.',
  },
  {
    name: 'Credential stuffing',
    what: 'Attackers try leaked username and password pairs on other services.',
    impact: 'One reused password can unlock several accounts.',
    defense: 'Use a unique password for every account and turn on 2FA.',
  },
  {
    name: 'Data breaches',
    what: 'A company, school, or app accidentally exposes or loses user data.',
    impact: 'Leaked emails and passwords can be used for scams or login attempts.',
    defense: 'Change affected passwords quickly and watch for follow-up phishing.',
  },
  {
    name: 'Unsafe downloads',
    what: 'Apps, browser extensions, or files from untrusted sources can hide unwanted behavior.',
    impact: 'They may collect data, inject ads, or install more harmful software.',
    defense: 'Download from official stores or vendor sites and remove unused extensions.',
  },
  {
    name: 'Public Wi-Fi risks',
    what: 'Shared networks in cafes, hotels, airports, and schools can be easier to observe or imitate.',
    impact: 'Attackers may trick devices into joining fake networks or view unencrypted traffic.',
    defense: 'Prefer HTTPS, avoid sensitive logins on unknown networks, and use a trusted VPN when needed.',
  },
];

export function ThreatRevealGrid() {
  const [openThreat, setOpenThreat] = useState(threats[0].name);

  return (
    <div className="threat-grid">
      {threats.map((threat) => {
        const isOpen = openThreat === threat.name;

        return (
          <article className={isOpen ? 'threat-card is-open' : 'threat-card'} key={threat.name}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenThreat(isOpen ? '' : threat.name)}
            >
              <span>{threat.name}</span>
              <span aria-hidden="true">{isOpen ? 'Close' : 'Defense'}</span>
            </button>
            <p>
              <strong>What it is:</strong> {threat.what}
            </p>
            <p>
              <strong>How it affects users:</strong> {threat.impact}
            </p>
            {isOpen ? (
              <p className="defense-note">
                <strong>Practical defense:</strong> {threat.defense}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
