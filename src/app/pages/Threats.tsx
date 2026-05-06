import { InfoCard } from '../components/InfoCard';
import { PageHeader } from '../components/PageHeader';
import { ThreatRevealGrid } from '../components/learning/ThreatRevealGrid';

export function Threats() {
  return (
    <>
      <PageHeader
        eyebrow="Threats"
        title="A cyber threat is anything that can misuse your devices, accounts, money, or data."
        description="Threats are not all the same. Some are technical, some are social, and many combine both."
      />

      <section className="content-grid">
        <InfoCard title="Malware">
          <p>Malware is harmful software. It might arrive through a fake app, unsafe download, or infected attachment.</p>
        </InfoCard>
        <InfoCard title="Scams">
          <p>Scams try to make you pay, share information, or trust a false story. The technology is often simple.</p>
        </InfoCard>
        <InfoCard title="Credential theft">
          <p>Credential theft means someone gets a password, session, code, or login token that can open an account.</p>
        </InfoCard>
        <InfoCard title="Data leaks">
          <p>Data leaks expose information from services you use. A leak can fuel spam, scams, and password attacks.</p>
        </InfoCard>
        <InfoCard title="Social engineering">
          <p>Social engineering manipulates people with urgency, trust, fear, curiosity, or helpfulness.</p>
        </InfoCard>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Threat map</p>
          <h2>Click a card to reveal one practical defense.</h2>
          <p>Beginners do not need to memorize every attack name. Start by matching common risks to repeatable habits.</p>
        </div>
        <ThreatRevealGrid />
      </section>
    </>
  );
}
