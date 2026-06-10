import { useEffect, useMemo, useState } from 'react';
import { type LearningLevel, useLearningLevel } from '../../learningLevel';

type Question = {
  prompt: string;
  options: string[];
  answer: number;
  feedback: string;
};

const questionsByLevel: Record<LearningLevel, Question[]> = {
  kids: [
    {
      prompt: 'A prize message asks for your login code. What should you do?',
      options: ['Send the code', 'Ask a trusted adult', 'Click fast before it expires'],
      answer: 1,
      feedback: 'Secret codes stay private. Asking is a smart choice.',
    },
    {
      prompt: 'What is a strong password like?',
      options: ['A strong lock', 'A public sign', 'A sticker on your screen'],
      answer: 0,
      feedback: 'A strong password helps lock the account.',
    },
    {
      prompt: 'Should you open a surprise file from someone you do not know?',
      options: ['Yes', 'No, ask first', 'Only if it looks fun'],
      answer: 1,
      feedback: 'Surprise files can be unsafe. Pause and ask first.',
    },
    {
      prompt: 'What should you do before clicking a strange link?',
      options: ['Pause and check', 'Click twice', 'Share it with everyone'],
      answer: 0,
      feedback: 'Pausing gives you time to notice clues.',
    },
    {
      prompt: 'What is 2FA?',
      options: ['One more sign-in check', 'A game level', 'A kind of snack'],
      answer: 0,
      feedback: 'It adds one more check after the password.',
    },
  ],
  entry: [
    {
      prompt: 'What is the safest response to an unexpected email asking you to reset your password?',
      options: ['Open the link and sign in quickly', 'Visit the service directly using a known address', 'Reply and ask if it is real'],
      answer: 1,
      feedback: 'Typing the known address or using a saved bookmark avoids trusting the email link.',
    },
    {
      prompt: 'Why should passwords be unique for each account?',
      options: ['It makes them easier to memorize', 'It limits damage if one service is breached', 'Websites require unique passwords by law'],
      answer: 1,
      feedback: 'Credential stuffing depends on people reusing the same password across services.',
    },
    {
      prompt: 'What does HTTPS mainly protect?',
      options: ['The connection content between your browser and the site', 'The company from all data breaches', 'Your device from every virus'],
      answer: 0,
      feedback: 'HTTPS helps protect traffic in transit, but it does not guarantee the site itself is trustworthy.',
    },
    {
      prompt: 'Which second factor is generally stronger than SMS when available?',
      options: ['A reused password', 'An authenticator app, passkey, or hardware key', 'A public profile question'],
      answer: 1,
      feedback: 'SMS can still help, but authenticator apps, passkeys, and hardware keys are often stronger choices.',
    },
    {
      prompt: 'What is a practical habit on public Wi-Fi?',
      options: ['Ignore browser warnings', 'Join any network with a familiar name', 'Avoid sensitive sign-ins on unknown networks'],
      answer: 2,
      feedback: 'Unknown networks can be imitated or monitored. Save sensitive work for trusted connections when possible.',
    },
    {
      prompt: 'What should you do with unexpected attachments?',
      options: ['Open them to see what they are', 'Check the sender and context before opening', 'Forward them to friends'],
      answer: 1,
      feedback: 'Unexpected attachments are a common delivery path for scams and unwanted software.',
    },
  ],
  enthusiast: [
    {
      prompt: 'A sign-in email links to a domain that sounds close to the real service but is not exact. What is the best next step?',
      options: ['Use the link if the email design looks right', 'Navigate to the known domain independently', 'Forward the email to a friend'],
      answer: 1,
      feedback: 'Lookalike domains are a phishing signal. Navigate independently or use a trusted bookmark.',
    },
    {
      prompt: 'Why does credential stuffing work?',
      options: ['Attackers reuse leaked username/password pairs at scale', 'TLS is broken by default', '2FA creates weak passwords'],
      answer: 0,
      feedback: 'Credential stuffing relies on password reuse and automation.',
    },
    {
      prompt: 'Which statement about HTTPS is most accurate?',
      options: ['It encrypts content in transit but metadata can still exist', 'It proves the website is safe', 'It hides all DNS and IP metadata in every setup'],
      answer: 0,
      feedback: 'HTTPS protects traffic content, but connection metadata and site trust are separate topics.',
    },
    {
      prompt: 'Which MFA option is usually most phishing-resistant?',
      options: ['SMS code', 'FIDO hardware key or passkey bound to the origin', 'Security question'],
      answer: 1,
      feedback: 'Origin-bound cryptographic MFA resists many fake-site credential collection flows.',
    },
    {
      prompt: 'What should you protect alongside MFA setup?',
      options: ['Recovery codes and recovery email', 'Only the profile picture', 'Only browser color theme'],
      answer: 0,
      feedback: 'Recovery paths can bypass strong MFA if they are weaker than the main sign-in path.',
    },
    {
      prompt: 'What does a password manager mainly improve?',
      options: ['Unique high-entropy passwords with lower memory burden', 'Guaranteed immunity from phishing', 'The speed of public Wi-Fi'],
      answer: 0,
      feedback: 'Managers make unique passwords practical, but phishing awareness and MFA still matter.',
    },
  ],
};

export function Quiz() {
  const { level } = useLearningLevel();
  const questions = questionsByLevel[level];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  useEffect(() => {
    setAnswers({});
  }, [level]);
  const score = useMemo(
    () => questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0),
    [answers, questions],
  );
  const completed = Object.keys(answers).length === questions.length;

  return (
    <section className="interactive-panel" aria-labelledby="quiz-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Review</p>
          <h2 id="quiz-title">{level === 'enthusiast' ? 'Scenario Security Quiz' : level === 'kids' ? 'Safety Quiz' : 'Beginner Security Quiz'}</h2>
        </div>
        <p>
          Score {score}/{questions.length}
        </p>
      </div>

      <div className="quiz-list">
        {questions.map((question, questionIndex) => {
          const chosen = answers[questionIndex];

          return (
            <article className="quiz-card" key={question.prompt}>
              <h3>{question.prompt}</h3>
              <div className="answer-list">
                {question.options.map((option, optionIndex) => (
                  <button
                    className={
                      chosen === optionIndex
                        ? optionIndex === question.answer
                          ? 'is-selected is-correct'
                          : 'is-selected is-incorrect'
                        : ''
                    }
                    type="button"
                    key={option}
                    onClick={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {chosen !== undefined ? (
                <p className={chosen === question.answer ? 'quiz-feedback is-correct' : 'quiz-feedback'}>
                  {chosen === question.answer ? 'Correct. ' : 'Not quite. '}
                  {question.feedback}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>

      {completed ? (
        <div className="quiz-result" aria-live="polite">
          <strong>{score >= Math.ceil(questions.length * 0.8) ? 'Good instincts.' : 'Keep practicing.'}</strong>
          <span>
            {score >= Math.ceil(questions.length * 0.8)
              ? 'Your next upgrade is turning these answers into habits.'
              : 'Review the module pages, then try the quiz again.'}
          </span>
        </div>
      ) : null}
    </section>
  );
}
