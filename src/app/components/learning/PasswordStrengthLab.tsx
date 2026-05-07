import { Check, Circle, Shield, X } from 'lucide-react';
import { useMemo, useState } from 'react';

const commonWords = ['password', 'admin', 'qwerty', 'letmein', 'welcome', '123456'];
const sequentialPatterns = ['abc', 'bcd', 'cde', '123', '234', '345', '456', '567', '678', '789', 'qwerty', 'asdf'];

type RuleResult = {
  id: string;
  label: string;
  passed: boolean;
};

function hasRepeatedCharacters(value: string) {
  return /(.)\1{2,}/.test(value);
}

function includesPattern(value: string, patterns: string[]) {
  const lower = value.toLowerCase();
  return patterns.some((pattern) => lower.includes(pattern));
}

function getCharacterSetSize(checks: { uppercase: boolean; lowercase: boolean; number: boolean; symbol: boolean }) {
  return (
    (checks.lowercase ? 26 : 0) +
    (checks.uppercase ? 26 : 0) +
    (checks.number ? 10 : 0) +
    (checks.symbol ? 33 : 0)
  );
}

function scoreFromEstimatedBits(bits: number) {
  if (bits >= 80) {
    return 100;
  }

  if (bits >= 60) {
    return 90 + (bits - 60) * 0.5;
  }

  if (bits >= 45) {
    return 70 + (bits - 45) * (20 / 15);
  }

  if (bits >= 30) {
    return 40 + (bits - 30) * 2;
  }

  return bits * (40 / 30);
}

function estimatePassword(value: string) {
  const wordChunks = value.trim().split(/[\s._-]+/).filter(Boolean);
  const checks = {
    length12: value.length >= 12,
    length16: value.length >= 16,
    uppercase: /[A-Z]/.test(value),
    lowercase: /[a-z]/.test(value),
    number: /\d/.test(value),
    symbol: /[^A-Za-z0-9]/.test(value),
    repeated: hasRepeatedCharacters(value),
    common: includesPattern(value, commonWords),
    sequential: includesPattern(value, sequentialPatterns),
    passphrase: wordChunks.length >= 4 && value.length >= 18,
  };
  const characterClassCount = [checks.uppercase, checks.lowercase, checks.number, checks.symbol].filter(Boolean).length;
  const characterSetSize = getCharacterSetSize(checks);
  const characterEntropyBits = characterSetSize > 0 ? value.length * Math.log2(characterSetSize) : 0;
  const passphraseEntropyBits =
    wordChunks.length >= 4
      ? wordChunks.length * 16 + (checks.number ? 6 : 0) + (checks.symbol ? 4 : 0) + (checks.uppercase ? 3 : 0)
      : 0;

  let score = scoreFromEstimatedBits(Math.max(characterEntropyBits, passphraseEntropyBits));
  score -= checks.repeated ? 12 : 0;
  score -= checks.common ? 28 : 0;
  score -= checks.sequential ? 18 : 0;

  if (value.length < 8) {
    score = Math.min(score, 35);
  } else if (value.length < 12) {
    score = Math.min(score, 62);
  }

  if (checks.common) {
    score = Math.min(score, 48);
  }

  if (checks.sequential) {
    score = Math.min(score, 74);
  }

  if (checks.repeated) {
    score = Math.min(score, 82);
  }

  const strongPhraseOrGenerated = checks.passphrase || (value.length >= 20 && characterClassCount === 4);
  const rules: RuleResult[] = [
    { id: 'length12', label: 'Longer than 12 characters', passed: checks.length12 },
    { id: 'length16', label: 'Extra length beyond 16 characters', passed: checks.length16 },
    { id: 'uppercase', label: 'Includes an uppercase letter', passed: checks.uppercase },
    { id: 'lowercase', label: 'Includes a lowercase letter', passed: checks.lowercase },
    { id: 'number', label: 'Includes a number', passed: checks.number },
    { id: 'symbol', label: 'Includes a symbol', passed: checks.symbol },
    { id: 'repeated', label: 'Avoids repeated characters', passed: !checks.repeated },
    { id: 'common', label: 'Avoids common weak words', passed: !checks.common },
    { id: 'sequential', label: 'Avoids obvious sequences', passed: !checks.sequential },
    { id: 'passphrase', label: 'Strong passphrase or generated-style length', passed: strongPhraseOrGenerated },
  ];
  const passesEveryVisibleRule = rules.every((rule) => rule.passed);

  if (!passesEveryVisibleRule) {
    score = Math.min(score, 99);
  }

  const normalizedScore = value.length === 0 ? 0 : Math.max(0, Math.min(100, Math.round(score)));
  const label =
    normalizedScore >= 88
      ? 'Excellent'
      : normalizedScore >= 72
        ? 'Strong'
        : normalizedScore >= 50
          ? 'Decent'
          : normalizedScore >= 28
            ? 'Weak'
            : 'Very Weak';

  const difficulty =
    normalizedScore >= 88
      ? 'Harder to guess when it is unique and not reused.'
      : normalizedScore >= 72
        ? 'A solid educational estimate, especially if unique.'
        : normalizedScore >= 50
          ? 'Better, but still has room for safer habits.'
          : normalizedScore >= 28
            ? 'Likely easy to guess or automate against.'
      : 'Very easy to guess, especially if reused.';

  const suggestions = [
    !checks.length12 ? 'Aim for at least 12 characters. Longer is usually better than complex-but-short.' : '',
    !checks.uppercase ? 'Add an uppercase letter if you want a perfect lab score.' : '',
    !checks.lowercase ? 'Add a lowercase letter if you want a perfect lab score.' : '',
    !checks.number ? 'Add a number if you want a perfect lab score.' : '',
    !checks.symbol ? 'Add a symbol if you want a perfect lab score.' : '',
    !strongPhraseOrGenerated
      ? 'Use at least four separated words, or make it 20+ characters with all character types.'
      : '',
    !checks.passphrase && characterClassCount < 3
      ? 'Mix character types, or use a long passphrase with several unrelated words.'
      : '',
    checks.passphrase && wordChunks.length < 5 ? 'Add one more unrelated word to make the passphrase stronger.' : '',
    checks.common ? 'Remove common words such as password, admin, welcome, qwerty, or 123456.' : '',
    checks.sequential ? 'Avoid sequences like abc, 123, qwerty, and keyboard walks.' : '',
    checks.repeated ? 'Avoid repeated runs such as aaa or 111.' : '',
    value.length > 0 ? 'Use a unique password for every account and let a password manager remember it.' : 'Try a sample password to see the lab respond.',
  ].filter(Boolean);

  const badges = [
    checks.length12 ? 'Longer than 12 characters' : '',
    characterClassCount >= 3 ? 'Uses variety' : '',
    !checks.common && !checks.sequential && value.length > 0 ? 'Avoids common patterns' : '',
    checks.passphrase ? 'Strong passphrase' : '',
  ].filter(Boolean);

  return { score: normalizedScore, label, difficulty, rules, suggestions, badges };
}

export function PasswordStrengthLab() {
  const [password, setPassword] = useState('');
  const result = useMemo(() => estimatePassword(password), [password]);

  return (
    <section className="interactive-panel password-panel" aria-labelledby="password-lab-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Interactive</p>
          <h2 id="password-lab-title">Password Strength Lab</h2>
        </div>
        <p>This tool runs locally in your browser. Nothing is stored or sent.</p>
      </div>

      <div className="password-layout">
        <div className="password-entry">
          <label htmlFor="sample-password">Sample password</label>
          <input
            id="sample-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-describedby="password-privacy-note"
          />
          <p id="password-privacy-note">
            Use a made-up sample. This is an educational estimate, not a security guarantee.
          </p>
        </div>

        <div className="vault-meter" aria-live="polite">
          <div className="meter-topline">
            <span>
              <Shield size={20} aria-hidden="true" /> Vault integrity
            </span>
            <strong>{result.score}/100</strong>
          </div>
          <div className="meter-track" aria-label={`Password score ${result.score} out of 100`}>
            <span style={{ width: `${result.score}%` }} />
          </div>
          <div className="meter-label">{result.label}</div>
          <p>{result.difficulty}</p>
        </div>
      </div>

      <div className="lab-grid">
        <article className="checklist-card">
          <h3>Checklist</h3>
          <ul className="rule-list">
            {result.rules.map((rule) => (
              <li className={rule.passed ? 'is-passed' : ''} key={rule.id}>
                {rule.passed ? <Check size={18} /> : <X size={18} />}
                {rule.label}
              </li>
            ))}
          </ul>
        </article>

        <article className="checklist-card">
          <h3>Suggestions</h3>
          <ul className="plain-list">
            {result.suggestions.map((suggestion) => (
              <li key={suggestion}>
                <Circle size={8} aria-hidden="true" />
                {suggestion}
              </li>
            ))}
          </ul>
        </article>

        <article className="checklist-card">
          <h3>Badges</h3>
          <div className="badge-row">
            {result.badges.length > 0 ? result.badges.map((badge) => <span key={badge}>{badge}</span>) : <p>Badges appear as the sample improves.</p>}
          </div>
        </article>
      </div>
    </section>
  );
}
