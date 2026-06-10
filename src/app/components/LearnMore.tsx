import { ExternalLink } from 'lucide-react';

type LearnMoreProps = {
  copy: string;
  href: string;
  source: string;
  title?: string;
};

export function LearnMore({ copy, href, source, title = 'Learn more' }: LearnMoreProps) {
  return (
    <section className="learn-more-section" aria-labelledby="learn-more-title">
      <div>
        <p className="eyebrow">Keep learning</p>
        <h2 id="learn-more-title">{title}</h2>
        <p>{copy}</p>
      </div>
      <a className="learn-more-link" href={href} target="_blank" rel="noreferrer">
        <span>{source}</span>
        <ExternalLink size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
