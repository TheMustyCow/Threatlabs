import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLearningLevel } from '../../learningLevel';

const threatsByLevel = {
  kids: [
    ['Unsafe downloads', 'Some apps or files are not safe.', 'They can make a device act strange.', 'Ask before downloading.'],
    ['Tricky messages', 'A message may pretend to be from a game, school, or friend.', 'It may ask you to click or share a code.', 'Pause and ask before clicking.'],
    ['Shared passwords', 'A password is a secret.', 'If someone has it, they may open your account.', 'Keep secret codes private.'],
    ['Unknown Wi-Fi', 'Some Wi-Fi is not safe to use.', 'Other people may be nearby on it.', 'Use trusted Wi-Fi for important accounts.'],
  ],
  entry: [
    ['Malware', 'Software designed to damage a device, spy on activity, or take control of files.', 'It can slow devices, steal data, or lock files for payment.', 'Install updates, avoid unknown downloads, and use built-in security tools.'],
    ['Phishing', 'A message that pretends to be trusted so you click, sign in, or share a code.', 'It can lead to stolen passwords, financial loss, or account takeover.', 'Check the sender, inspect links, and visit sites directly instead of using surprise links.'],
    ['Credential stuffing', 'Attackers try leaked username and password pairs on other services.', 'One reused password can unlock several accounts.', 'Use a unique password for every account and turn on 2FA.'],
    ['Data breaches', 'A company, school, or app accidentally exposes or loses user data.', 'Leaked emails and passwords can be used for scams or login attempts.', 'Change affected passwords quickly and watch for follow-up phishing.'],
    ['Unsafe downloads', 'Apps, browser extensions, or files from untrusted sources can hide unwanted behavior.', 'They may collect data, inject ads, or install more harmful software.', 'Download from official stores or vendor sites and remove unused extensions.'],
    ['Public Wi-Fi risks', 'Shared networks in cafes, hotels, airports, and schools can be easier to observe or imitate.', 'Attackers may trick devices into joining fake networks or view unencrypted traffic.', 'Prefer HTTPS, avoid sensitive logins on unknown networks, and use a trusted VPN when needed.'],
  ],
  enthusiast: [
    ['Malware', 'Endpoint compromise can start through trojanized installers, document macros, browser extensions, or drive-by downloads.', 'It may establish persistence, exfiltrate data, or encrypt files.', 'Patch quickly, restrict extensions, verify sources, and keep backups offline or versioned.'],
    ['Phishing', 'Social engineering uses sender spoofing, lookalike domains, and believable workflow pretexts.', 'It can steal credentials, MFA codes, payment approvals, or session tokens.', 'Validate domains, use phishing-resistant MFA, and report suspicious messages.'],
    ['Credential stuffing', 'Automated login attempts reuse leaked credential pairs across services.', 'A single reused password can become an identity pivot.', 'Use a password manager, unique passwords, MFA, and breach monitoring.'],
    ['Data breaches', 'Breaches may expose emails, hashed passwords, phone numbers, tokens, or profile metadata.', 'The data can fuel targeted phishing and account recovery abuse.', 'Rotate affected credentials and watch for follow-on scams.'],
    ['Supply chain downloads', 'Extensions, packages, or installers can inherit trust from a familiar workflow.', 'The risk is amplified when software has broad permissions.', 'Prefer official sources, review permissions, and remove unused software.'],
    ['Network exposure', 'On shared networks, metadata and misconfigured traffic may be observable even when contents are encrypted.', 'Fake access points and captive portals can create credential risk.', 'Use HTTPS, trusted VPNs when appropriate, and avoid sensitive work on unknown networks.'],
  ],
};

export function ThreatRevealGrid() {
  const { level } = useLearningLevel();
  const threats = useMemo(
    () => threatsByLevel[level].map(([name, what, impact, defense]) => ({ name, what, impact, defense })),
    [level],
  );
  const [openThreat, setOpenThreat] = useState('');

  useEffect(() => {
    setOpenThreat('');
  }, [level]);

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
              <span className="expand-action" aria-hidden="true">
                {isOpen ? 'Close' : 'Defense'}
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>
            <p>
              <strong>{level === 'kids' ? 'What:' : 'What it is:'}</strong> {threat.what}
            </p>
            <p>
              <strong>{level === 'kids' ? 'Why it matters:' : 'How it affects users:'}</strong> {threat.impact}
            </p>
            {isOpen ? (
              <p className="defense-note">
                <strong>{level === 'kids' ? 'Safe step:' : 'Practical defense:'}</strong> {threat.defense}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
