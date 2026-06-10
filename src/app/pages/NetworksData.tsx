import { InfoCard } from '../components/InfoCard';
import { PageHeader } from '../components/PageHeader';
import { DataPathExplorer } from '../components/learning/DataPathExplorer';
import { useLearningLevel } from '../learningLevel';

const networksContent = {
  kids: {
    title: 'See where a website goes.',
    description: 'Your device asks for a page. The website sends one back.',
    cards: [
      ['Your device asks', 'Your phone, tablet, or computer asks for a website.'],
      ['Wi-Fi carries it', 'Wi-Fi helps send the message.'],
      ['The web guides it', 'The message finds the right website.'],
      ['The site answers', 'The website sends the page back.'],
      ['Some sites remember', 'A site may remember settings or sign-ins.'],
      ['Be careful', 'Only type secrets on sites you trust.'],
    ],
    wifiTitle: 'Unknown Wi-Fi needs care.',
    wifiCopy: 'Ask before joining Wi-Fi you do not know. Use trusted Wi-Fi for important accounts.',
  },
  entry: {
    title: 'Trace a web request.',
    description: 'Understanding the path helps explain privacy, tracking, public Wi-Fi risk, and why HTTPS matters.',
    cards: [
      ['What happens when you visit a website', 'Your browser asks for a site, the request travels across networks, and a server returns the page or app data.'],
      ['IP addresses', 'An IP address is a delivery address for network traffic. It helps systems send responses back to the right place.'],
      ['DNS', 'DNS turns a name like example.com into the network address your device needs to connect.'],
      ['HTTPS', 'HTTPS helps protect the contents of the connection. The lock icon matters, but it does not prove a site is honest.'],
      ['Cookies and tracking', 'Cookies can keep you signed in, remember preferences, or help services measure and track activity.'],
      ['Local versus sent data', 'Local data stays on your device until an app or site sends it. Data you submit to a service can be stored by that service.'],
    ],
    wifiTitle: 'Shared networks deserve extra care.',
    wifiCopy:
      'Public Wi-Fi is useful, but attackers can imitate network names or observe poorly protected traffic. For important accounts, prefer trusted networks, HTTPS, and a trusted VPN when your situation calls for it.',
  },
  enthusiast: {
    title: 'Map visible data.',
    description: 'DNS, IP routing, TLS, cookies, storage, and logs each shape what may be visible.',
    cards: [
      ['Request path', 'The browser resolves a name, opens a connection, negotiates encryption, and sends an HTTP request.'],
      ['IP metadata', 'IP addresses and timing can reveal connection patterns even when content is encrypted.'],
      ['DNS visibility', 'DNS maps names to addresses. Resolver choice affects who may observe lookup metadata.'],
      ['TLS and HTTPS', 'TLS protects content in transit and authenticates the server certificate, but it does not prove intent.'],
      ['Cookies and tracking', 'Cookies, local storage, pixels, and fingerprinting signals can connect activity across sessions.'],
      ['Local versus service data', 'Device data stays local until an app sends it; service-side logs and submissions follow that provider’s policies.'],
    ],
    wifiTitle: 'Public networks increase metadata and impersonation risk.',
    wifiCopy:
      'Use HTTPS, verify captive portals carefully, avoid sensitive changes on unknown networks, and consider a trusted VPN when network trust is low.',
  },
};

export function NetworksData() {
  const { level } = useLearningLevel();
  const content = networksContent[level];

  return (
    <>
      <PageHeader
        eyebrow="Networks & Data"
        title={content.title}
        description={content.description}
      />

      <section className="content-grid">
        {content.cards.map(([title, copy]) => (
          <InfoCard title={title} key={title}>
            <p>{copy}</p>
          </InfoCard>
        ))}
      </section>

      <DataPathExplorer />

      <section className="split-section">
        <div>
          <p className="eyebrow">Public Wi-Fi</p>
          <h2>{content.wifiTitle}</h2>
        </div>
        <p>{content.wifiCopy}</p>
      </section>
    </>
  );
}
