import { useMemo, useState } from 'react';

const questions = [
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
];

export function Quiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = useMemo(
    () => questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0),
    [answers],
  );
  const completed = Object.keys(answers).length === questions.length;

  return (
    <section className="interactive-panel" aria-labelledby="quiz-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Review</p>
          <h2 id="quiz-title">Beginner Security Quiz</h2>
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
                    className={chosen === optionIndex ? 'is-selected' : ''}
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
          <strong>{score >= 5 ? 'Good instincts.' : 'Keep practicing.'}</strong>
          <span>
            {score >= 5
              ? 'Your next upgrade is turning these answers into habits.'
              : 'Review the module pages, then try the quiz again.'}
          </span>
        </div>
      ) : null}
    </section>
  );
}
