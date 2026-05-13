import { useEffect, useState } from 'react';
import { type LearningLevel, useLearningLevel } from '../../learningLevel';

type Clue = {
  id: string;
  label: string;
  text: string;
  explanation: string;
};

type MessageExample = {
  id: string;
  name: string;
  sender: string;
  senderClueId?: string;
  subject: string;
  subjectClueId?: string;
  bodyParts: Array<string | { clueId: string; text: string }>;
  footer: string | { label: string; clueId: string; text: string };
  clues: Clue[];
};

const examplesByLevel: Record<LearningLevel, MessageExample[]> = {
  kids: [
    {
      id: 'kids-prize',
      name: 'Prize message',
      sender: 'game-prizes@example.com',
      senderClueId: 'sender',
      subject: 'You won free game coins',
      subjectClueId: 'subject',
      bodyParts: [
        'Click now to get your prize. ',
        { clueId: 'secret', text: 'Send your login code' },
        ' and ',
        { clueId: 'link', text: 'claim-prize.example.com' },
        '.',
      ],
      footer: 'Ask a trusted adult if a prize message surprises you.',
      clues: [
        { id: 'subject', label: 'Surprise prize', text: 'You won free game coins', explanation: 'A surprise prize is a clue to slow down and ask before clicking.' },
        { id: 'sender', label: 'Strange sender', text: 'game-prizes@example.com', explanation: 'The sender is not a person or game you know.' },
        { id: 'secret', label: 'Secret code request', text: 'Send your login code', explanation: 'Your password or login code is private. Do not share it in a message.' },
        { id: 'link', label: 'Unknown link', text: 'claim-prize.example.com', explanation: 'A surprise prize link is a reason to stop and ask for help.' },
      ],
    },
  ],
  entry: [
    {
      id: 'obvious',
      name: 'Obvious phishing',
      sender: 'security-alert@example.com',
      senderClueId: 'sender',
      subject: 'Your mailbox will be closed today',
      subjectClueId: 'subject',
      bodyParts: [
        'We detected unusual activity. ',
        { clueId: 'password', text: 'Confirm your password' },
        ' immediately at ',
        { clueId: 'link', text: 'account-review.example.com' },
        ' or ',
        { clueId: 'urgency', text: 'your mailbox will be deleted' },
        '.',
      ],
      footer: { label: 'Attachment', clueId: 'attachment', text: 'Mailbox_Update_Form.html' },
      clues: [
        { id: 'subject', label: 'Threatening subject', text: 'Your mailbox will be closed today', explanation: 'The subject tries to create pressure before you even open the message.' },
        { id: 'sender', label: 'Sender address', text: 'security-alert@example.com', explanation: 'The sender uses a generic safe example domain instead of a real organization domain.' },
        { id: 'urgency', label: 'Urgent threat', text: 'your mailbox will be deleted', explanation: 'Scams often rush people so they act before checking the message.' },
        { id: 'password', label: 'Password request', text: 'Confirm your password', explanation: 'Legitimate services should not ask you to provide a password through an email link.' },
        { id: 'link', label: 'Suspicious link', text: 'account-review.example.com', explanation: 'The link uses a generic safe example domain. Visit the real service through a known address instead.' },
        { id: 'attachment', label: 'Unexpected attachment', text: 'Mailbox_Update_Form.html', explanation: 'Unexpected forms or attachments can collect credentials or run unwanted code.' },
      ],
    },
    {
      id: 'subtle',
      name: 'Subtle phishing',
      sender: 'billing-team@example.com',
      subject: 'Invoice question for your account',
      subjectClueId: 'subject',
      bodyParts: [
        'Hi, we noticed a ',
        { clueId: 'context', text: 'payment issue on your account' },
        '. Please review the secure billing note at ',
        { clueId: 'link', text: 'portal.example.com' },
        ' ',
        { clueId: 'deadline', text: 'before the end of the day' },
        '.',
      ],
      footer: 'This message was sent by Example Billing Services.',
      clues: [
        { id: 'subject', label: 'Unexpected account topic', text: 'Invoice question for your account', explanation: 'A surprise billing subject is not proof of phishing, but it is a reason to verify carefully.' },
        { id: 'context', label: 'Unexpected context', text: 'payment issue on your account', explanation: 'A billing issue can be real, but unexpected money-related messages deserve extra checking.' },
        { id: 'link', label: 'Link destination', text: 'portal.example.com', explanation: 'Do not trust link text alone. Open a browser and type the known address yourself.' },
        { id: 'deadline', label: 'Soft deadline', text: 'before the end of the day', explanation: 'Subtle phishing may use polite pressure instead of dramatic threats.' },
      ],
    },
  ],
  enthusiast: [
    {
      id: 'enthusiast-workflow',
      name: 'Workflow pretext',
      sender: 'it-support@example.com',
      senderClueId: 'sender',
      subject: 'SSO session review for your workspace',
      subjectClueId: 'subject',
      bodyParts: [
        'We saw unusual login metadata for your account. Review the SSO report at ',
        { clueId: 'link', text: 'sso-review.example.com' },
        ' and upload the ',
        { clueId: 'attachment', text: 'session_export.html' },
        ' file ',
        { clueId: 'deadline', text: 'before today’s access sync' },
        '. If prompted, ',
        { clueId: 'mfa', text: 'approve the verification request' },
        '.',
      ],
      footer: { label: 'Reply-To', clueId: 'reply', text: 'helpdesk-review@example.com' },
      clues: [
        { id: 'subject', label: 'Identity workflow pretext', text: 'SSO session review for your workspace', explanation: 'A sign-in or SSO subject can be legitimate, but it is high-value enough to verify through a known channel.' },
        { id: 'sender', label: 'Sender domain', text: 'it-support@example.com', explanation: 'Generic sender domains are a clue. Compare sender, reply-to, and the real service domain.' },
        { id: 'link', label: 'Lookalike workflow link', text: 'sso-review.example.com', explanation: 'The text sounds official, but the destination should be verified independently.' },
        { id: 'attachment', label: 'HTML attachment', text: 'session_export.html', explanation: 'HTML files can imitate sign-in screens or collect data. Unexpected attachments deserve caution.' },
        { id: 'deadline', label: 'Operational pressure', text: 'before today’s access sync', explanation: 'A believable deadline can push people through normal checks.' },
        { id: 'mfa', label: 'MFA prompt request', text: 'approve the verification request', explanation: 'Approving unexpected prompts can give an attacker access.' },
        { id: 'reply', label: 'Reply-To mismatch', text: 'helpdesk-review@example.com', explanation: 'Reply-to details can differ from the visible sender. That mismatch is a useful defensive signal.' },
      ],
    },
  ],
};

export function PhishingDetector() {
  const { level } = useLearningLevel();
  const examples = examplesByLevel[level];
  const [messageId, setMessageId] = useState(examples[0].id);
  const [foundClues, setFoundClues] = useState<string[]>([]);
  const [activeClueId, setActiveClueId] = useState('');
  const message = examples.find((example) => example.id === messageId) ?? examples[0];
  const selectedClue = message.clues.find((clue) => clue.id === activeClueId);

  useEffect(() => {
    setMessageId(examples[0].id);
    setFoundClues([]);
    setActiveClueId('');
  }, [examples]);

  const resetMessage = (id: string) => {
    setMessageId(id);
    setFoundClues([]);
    setActiveClueId('');
  };

  const toggleClue = (id: string) => {
    setFoundClues((current) => (current.includes(id) ? current : [...current, id]));
    setActiveClueId(id);
  };

  const renderHotspot = (clueId: string, text: string) => (
    <button
      className={foundClues.includes(clueId) ? 'suspicious-part is-found' : 'suspicious-part'}
      type="button"
      key={`${message.id}-${clueId}-${text}`}
      onClick={() => toggleClue(clueId)}
    >
      {text}
    </button>
  );

  return (
    <section className="interactive-panel" aria-labelledby="phishing-detector-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Interactive</p>
          <p className="eyebrow">Find all the clues</p>
          <h2 id="phishing-detector-title">Phishing Detector</h2>
        </div>
        <p>
          Found {foundClues.length} of {message.clues.length} clues
        </p>
      </div>

      <div className="segmented-control" aria-label="Choose phishing example">
        {examples.map((example) => (
          <button
            className={example.id === messageId ? 'is-selected' : ''}
            type="button"
            key={example.id}
            onClick={() => resetMessage(example.id)}
          >
            {example.name}
          </button>
        ))}
      </div>

      <div className="detector-layout">
        <article className="email-card" aria-label={`${message.name} example message`}>
          <div className="email-row">
            <span>From</span>
            {message.senderClueId ? renderHotspot(message.senderClueId, message.sender) : <strong>{message.sender}</strong>}
          </div>
          <div className="email-row">
            <span>Subject</span>
            {message.subjectClueId ? renderHotspot(message.subjectClueId, message.subject) : <strong>{message.subject}</strong>}
          </div>
          <div className="email-body">
            {message.bodyParts.map((part, index) =>
              typeof part === 'string' ? <span key={`${message.id}-body-${index}`}>{part}</span> : renderHotspot(part.clueId, part.text),
            )}
          </div>
          <div className="detector-progress" aria-label="Detected suspicious message parts">
            {message.clues.map((clue) => (
              <span className={foundClues.includes(clue.id) ? 'is-found' : ''} key={clue.id}>
                {foundClues.includes(clue.id) ? clue.label : 'Undetected clue'}
              </span>
            ))}
          </div>
          <p className="email-footer">
            {typeof message.footer === 'string' ? (
              message.footer
            ) : (
              <>
                {message.footer.label}: {renderHotspot(message.footer.clueId, message.footer.text)}
              </>
            )}
          </p>
        </article>

        <aside className="feedback-card" aria-live="polite">
          {selectedClue ? (
            <>
              <p className="eyebrow">{selectedClue.label}</p>
              <h3>{selectedClue.text}</h3>
              <p>{selectedClue.explanation}</p>
            </>
          ) : (
            <>
              <p className="eyebrow">Start here</p>
              <h3>Click anything that feels suspicious.</h3>
              <p>Look for pressure, odd sender details, password requests, attachments, and links you did not expect.</p>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
