import { type LucideIcon } from 'lucide-react';

type ModuleCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  onNavigate: (path: string) => void;
};

export function ModuleCard({ icon: Icon, title, description, href, onNavigate }: ModuleCardProps) {
  return (
    <a
      className="module-card"
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(href);
      }}
    >
      <span className="icon-disc" aria-hidden="true">
        <Icon size={22} />
      </span>
      <span className="module-card-title">{title}</span>
      <span className="module-card-copy">{description}</span>
      <span className="module-card-action">Open module</span>
    </a>
  );
}
