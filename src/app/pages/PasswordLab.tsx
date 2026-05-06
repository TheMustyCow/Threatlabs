import { InfoCard } from '../components/InfoCard';
import { PageHeader } from '../components/PageHeader';
import { PasswordStrengthLab } from '../components/learning/PasswordStrengthLab';

export function PasswordLab() {
  return (
    <>
      <PageHeader
        eyebrow="Password Lab"
        title="Test password strength without sending anything anywhere."
        description="The lab estimates strength locally in your browser and teaches why length, uniqueness, and pattern avoidance matter."
      />

      <PasswordStrengthLab />

      <section className="content-grid">
        <InfoCard title="Length matters">
          <p>A longer password or passphrase usually gives attackers more possibilities to guess than a short complex password.</p>
        </InfoCard>
        <InfoCard title="Unique passwords matter">
          <p>If one service is breached, reused passwords can let attackers try the same login elsewhere.</p>
        </InfoCard>
        <InfoCard title="Password managers help">
          <p>A password manager can create and remember strong unique passwords so you do not have to memorize each one.</p>
        </InfoCard>
        <InfoCard title="Passphrases can be practical">
          <p>Several unrelated words can be easier to type and remember while still being long.</p>
        </InfoCard>
      </section>
    </>
  );
}
