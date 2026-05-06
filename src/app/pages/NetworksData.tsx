import { InfoCard } from '../components/InfoCard';
import { PageHeader } from '../components/PageHeader';
import { DataPathExplorer } from '../components/learning/DataPathExplorer';

export function NetworksData() {
  return (
    <>
      <PageHeader
        eyebrow="Networks & Data"
        title="A website visit is a round trip through several places."
        description="Understanding the path helps explain privacy, tracking, public Wi-Fi risk, and why HTTPS matters."
      />

      <section className="content-grid">
        <InfoCard title="What happens when you visit a website">
          <p>Your browser asks for a site, the request travels across networks, and a server returns the page or app data.</p>
        </InfoCard>
        <InfoCard title="IP addresses">
          <p>An IP address is a delivery address for network traffic. It helps systems send responses back to the right place.</p>
        </InfoCard>
        <InfoCard title="DNS">
          <p>DNS turns a name like example.com into the network address your device needs to connect.</p>
        </InfoCard>
        <InfoCard title="HTTPS">
          <p>HTTPS helps protect the contents of the connection. The lock icon matters, but it does not prove a site is honest.</p>
        </InfoCard>
        <InfoCard title="Cookies and tracking">
          <p>Cookies can keep you signed in, remember preferences, or help services measure and track activity.</p>
        </InfoCard>
        <InfoCard title="Local versus sent data">
          <p>Local data stays on your device until an app or site sends it. Data you submit to a service can be stored by that service.</p>
        </InfoCard>
      </section>

      <DataPathExplorer />

      <section className="split-section">
        <div>
          <p className="eyebrow">Public Wi-Fi</p>
          <h2>Shared networks deserve extra care.</h2>
        </div>
        <p>
          Public Wi-Fi is useful, but attackers can imitate network names or observe poorly protected traffic. For important
          accounts, prefer trusted networks, HTTPS, and a trusted VPN when your situation calls for it.
        </p>
      </section>
    </>
  );
}
