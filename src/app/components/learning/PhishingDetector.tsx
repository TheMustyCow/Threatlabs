import { useState } from 'react';

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
  subject: string;
  body: string;
  footer: string;
  clues: Clue[];
};

const examples: MessageExample[] = [
  {
    id: 'obvious',
    name: 'Obvious phishing',
    sender: 'security-alert@example.com',
    subject: 'Your mailbox will be closed today',
    body:
      'We detected unusual activity. Confirm your password immediately at account-review.example.com or your mailbox will be deleted.',
    footer: 'Attachment: Mailbox_Update_Form.html',
    clues: [
      {
        id: 'sender',
        label: 'Sender address',
        text: 'security-alert@example.com',
        explanation: 'The sender uses a generic safe example domain instead of a real organization domain.',
      },
      {
        id: 'urgency',
        label: 'Urgent threat',
        text: 'your mailbox will be deleted',
        explanation: 'Scams often rush people so they act before checking the message.',
      },
      {
        id: 'password',
        label: 'Password request',
        text: 'Confirm your password',
        explanation: 'Legitimate services should not ask you to provide a password through an email link.',
      },
      {
        id: 'attachment',
        label: 'Unexpected attachment',
        text: 'Mailbox_Update_Form.html',
        explanation: 'Unexpected forms or attachments can collect credentials or run unwanted code.',
      },
    ],
  },
  {
    id: 'subtle',
    name: 'Subtle phishing',
    sender: 'billing-team@example.com',
    subject: 'Invoice question for your account',
    body:
      'Hi, we noticed a payment issue on your account. Please review the secure billing note at portal.example.com before the end of the day.',
    footer: 'This message was sent by Example Billing Services.',
    clues: [
      {
        id: 'context',
        label: 'Unexpected context',
        text: 'payment issue on your account',
        explanation: 'A billing issue can be real, but unexpected money-related messages deserve extra checking.',
      },
      {
        id: 'link',
        label: 'Link destination',
        text: 'portal.example.com',
        explanation: 'Do not trust link text alone. Open a browser and type the known address yourself.',
      },
      {
        id: 'deadline',
        label: 'Soft deadline',
        text: 'before the end of the day',
        explanation: 'Subtle phishing may use polite pressure instead of dramatic threats.',
      },
    ],
  },
];

export function PhishingDetector() {
  const [messageId, setMessageId] = useState(examples[0].id);
  const [foundClues, setFoundClues] = useState<string[]>([]);
  const [activeClueId, setActiveClueId] = useState('');
  const message = examples.find((example) => example.id === messageId) ?? examples[0];
  const selectedClue = message.clues.find((clue) => clue.id === activeClueId);

  const resetMessage = (id: string) => {
    setMessageId(id);
    setFoundClues([]);
    setActiveClueId('');
  };

  const toggleClue = (id: string) => {
    setFoundClues((current) => (current.includes(id) ? current : [...current, id]));
    setActiveClueId(id);
  };

  return (
    <section className="interactive-panel" aria-labelledby="phishing-detector-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Interactive</p>
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
            <button type="button" onClick={() => toggleClue('sender')} disabled={!message.clues.some((clue) => clue.id === 'sender')}>
              {message.sender}
            </button>
          </div>
          <div className="email-row">
            <span>Subject</span>
            <strong>{message.subject}</strong>
          </div>
          <p>{message.body}</p>
          <div className="clue-buttons" aria-label="Suspicious message parts">
            {message.clues.map((clue) => (
              <button
                className={foundClues.includes(clue.id) ? 'is-found' : ''}
                type="button"
                key={clue.id}
                onClick={() => toggleClue(clue.id)}
              >
                {clue.text}
              </button>
            ))}
          </div>
          <p className="email-footer">{message.footer}</p>
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
