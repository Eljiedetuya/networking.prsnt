const $ = (selector) => document.querySelector(selector);
const C = (title, content) => '<div class="card"><h4>' + title + '</h4><p>' + content + '</p></div>';

const S = [
  { t: 'NETWORKING FUNDAMENTALS • MODULE 8', s: 'How devices find services and receive network settings', c: [C('Topics', 'DNS, DHCP, DORA and the home network.'), C('Format', 'Slides + a live network simulation.'), C('Use', 'Arrow keys, dots or buttons to navigate.')] },
  { t: 'What will you learn?', s: 'Module objective: Explain how DNS and DHCP services operate.', c: [] },
  { t: 'Why do networks need these services?', s: 'Devices need addresses, and people need easy ways to reach online resources.', c: [] },
  { t: 'DNS: the Internet’s phone book', s: 'DNS stands for Domain Name System.', c: [C('Converts names', 'A domain name such as example.com becomes an IP address a device can use.'), C('Memorability', 'Users work with names instead of memorizing IP addresses.'), C('Records', 'DNS uses A/AAAA, MX, NS, and other records to answer different lookups.'), C('Resolution sources', 'Answers may come from a cache, a resolver, or authoritative servers.')] },
  { t: 'Introduction', s: 'Why devices need configuration', c: [C('IP configuration', 'A host needs an address, mask, gateway and DNS server before it can talk beyond itself.'), C('Name resolution', 'People use names like example.com; networks route by IP address.'), C('Automation', 'Typing settings on every device does not scale – DHCP and DNS automate it.')] },
  { t: 'DHCP: automatic network configuration', s: 'DHCP stands for Dynamic Host Configuration Protocol.', c: [C('Automatic leases', 'Leases IP addresses to devices on a network.'), C('Configuration', 'Can provide the subnet mask, default gateway, and DNS server addresses.'), C('Fewer errors', 'Reduces manual setup and helps prevent address conflicts when configured correctly.'), C('Temporary lease', 'A lease may be renewed while the device remains on the network.')] },
  { t: 'DORA Explained', s: 'The four DHCP messages', c: [C('1 Discover', 'Client broadcasts to find any DHCP server.'), C('2 Offer', 'Server proposes an available address.'), C('3 Request', 'Client asks to use the offered address.'), C('4 Acknowledge', 'Server confirms the lease and settings.')] },
  { t: 'DHCP Services', s: 'Automatic IP address assignment', c: [C('Server', 'Holds a pool of addresses and hands out leases.'), C('Client', 'Asks for configuration at boot or connect.'), C('Delivers', 'Address, mask, default gateway, DNS server, lease time.'), C('Benefit', 'Fewer errors and no duplicate addresses.')] },
  { t: 'Home Network Setup', s: 'Our lab topology', c: [C('Router', '<code>192.168.1.1/24</code> – LAN DHCP server.'), C('PC 2', 'Already leased <code>192.168.1.100</code>.'), C('PC 1', 'New client with no address yet.'), C('Pool', '<code>192.168.1.100–192.168.1.200</code>'), C('ISP', 'DHCP server on the WAN side.')] },
  null,
  { t: 'DNS & DHCP Summary', s: 'Two services, working together to connect devices and websites.', c: [] }
];

const M = document.getElementById('slides');
S.forEach(function(d, i) {
  const section = document.createElement('section');
  section.className = 'slide';

  if (i === 0) {
    section.classList.add('title-slide');
    section.innerHTML = "<div class='title-slide-wrap'><p class='eyebrow'>NETWORKING FUNDAMENTALS • MODULE 8</p><h1><span>IP Addressing</span><span>Services</span></h1><p class='blue-tag'>DNS & DHCP</p><p class='subtitle'>How devices find services and receive network settings</p></div>";
  } else if (i === 1) {
    section.classList.add('overview-slide');
    section.innerHTML = "<div class='overview-content'><p class='overview-kicker'>MODULE OVERVIEW</p><h2>What will you learn?</h2><p class='overview-lead'>Module objective: Explain how DNS and DHCP services operate.</p><div class='overview-rule'></div><div class='overview-cards'><article class='overview-card overview-dns'><h3><span>01</span> DNS Services</h3><p>Explain how DNS translates human-readable domain names into IP addresses.</p></article><article class='overview-card overview-dhcp'><h3><span>02</span> DHCP Services</h3><p>Explain how DHCP automatically provides IP configuration to devices.</p></article></div><p class='overview-outcome'>By the end, you should be able to compare both services and describe how they work in a typical network.</p></div><span class='overview-page-number' aria-hidden='true'>02</span>";
  } else if (i === 2) {
    section.classList.add('service-need-slide');
    section.innerHTML = "<div class='service-need-content'><p class='service-need-kicker'>THE BIG PICTURE</p><h2>Why do networks need these services?</h2><p class='service-need-lead'>Devices need addresses, and people need easy ways to reach online resources.</p><div class='service-need-rule'></div><div class='service-need-cards'><article class='service-need-card service-addressing'><h3>The addressing problem</h3><p>Computers communicate using IP addresses. Manually configuring every device can be slow and error-prone.</p></article><article class='service-need-card service-names'><h3>The name problem</h3><p>People remember names like example.com more easily than numeric IP addresses.</p></article></div><p class='service-need-takeaway'>DHCP helps devices join the network. DNS helps them locate services by name.</p></div><span class='service-need-page-number' aria-hidden='true'>03</span>";
  } else if (i === 3) {
    section.classList.add('topic-slide');
    section.innerHTML = "<p class='topic-tag'>TOPIC 1</p><h2>DNS: the Internet’s phone book</h2><p class='topic-lead'>DNS stands for Domain Name System.</p><div class='topic-rule'></div><ul class='topic-list'><li>Converts a domain name (example.com) into an IP address a device can use.</li><li>Lets users work with memorable names instead of memorizing IP addresses.</li><li>Uses DNS records, such as A/AAAA records for addresses and MX records for mail servers.</li><li>Answers may come from a cache, a DNS resolver, or authoritative name servers.</li></ul><p class='key-idea'>Key idea: DNS resolves names; it does not assign your device its IP address.</p>";
  } else if (i === 4) {
    section.classList.add('dns-simulation-slide');
    section.innerHTML = `<div class="dns-simulation">
      <div class="dns-sim-heading">
        <p class="dns-kicker">DNS IN ACTION</p>
        <h2 class="dns-title">How does DNS work?</h2>
        <p class="dns-sub">Step through a lookup for <code>www.example.com</code>.</p>
      </div>
      <div class="dns-sim-layout">
        <div class="dns-canvas">
          <svg class="dns-network" viewBox="20 25 870 320" role="img" aria-label="DNS lookup from a browser through a resolver and DNS servers to a website">
            <defs>
              <marker id="dnsArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0L9,4.5L0,9z" fill="#738198"/></marker>
              <marker id="dnsArrowActive" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0L9,4.5L0,9z" fill="#168f82"/></marker>
            </defs>
            <path class="dns-link" data-link="clientResolver" d="M205 183H287"/>
            <path class="dns-link" data-link="resolverRoot" d="M453 165C480 165 480 73 505 73"/>
            <path class="dns-link" data-link="rootTld" d="M588 111V145"/>
            <path class="dns-link" data-link="tldAuth" d="M588 221V255"/>
            <path class="dns-link" data-link="authResolver" d="M505 293C480 293 480 201 453 201"/>
            <path class="dns-link" data-link="resolverClient" d="M287 201H205"/>
            <path class="dns-link" data-link="resolverWeb" d="M453 183H748"/>
            <g class="dns-network-node" data-node="client">
              <rect x="35" y="130" width="170" height="106" rx="16"/>
              <g class="dns-svg-icon dns-icon-client" aria-hidden="true">
                <rect x="106" y="139" width="28" height="19" rx="2"/>
                <path d="M102 162h36l-3 4h-30zM120 158v4"/>
              </g>
              <text x="120" y="188" text-anchor="middle" class="dns-svg-title">Browser / device</text>
              <text x="120" y="212" text-anchor="middle" class="dns-svg-copy">Needs an IP address</text>
            </g>
            <g class="dns-network-node" data-node="resolver">
              <rect x="287" y="130" width="166" height="106" rx="16"/>
              <g class="dns-svg-icon dns-icon-server" aria-hidden="true">
                <rect x="357" y="138" width="26" height="12" rx="2"/>
                <rect x="357" y="154" width="26" height="12" rx="2"/>
                <circle cx="362" cy="144" r="1.4"/><circle cx="362" cy="160" r="1.4"/>
                <path d="M368 144h10M368 160h10"/>
              </g>
              <text x="370" y="188" text-anchor="middle" class="dns-svg-title">DNS resolver</text>
              <text x="370" y="212" text-anchor="middle" class="dns-svg-copy">Checks its cache</text>
            </g>
            <g class="dns-network-node dns-hierarchy-node" data-node="root">
              <rect x="505" y="35" width="166" height="76" rx="14"/>
              <g class="dns-svg-icon dns-icon-globe" aria-hidden="true">
                <circle cx="531" cy="73" r="14"/><path d="M517 73h28M531 59c7 7 7 21 0 28M531 59c-7 7-7 21 0 28"/>
              </g>
              <text x="547" y="70" text-anchor="start" class="dns-svg-title">Root DNS</text>
              <text x="547" y="91" text-anchor="start" class="dns-svg-copy">Finds .com servers</text>
            </g>
            <g class="dns-network-node dns-hierarchy-node" data-node="tld">
              <rect x="505" y="145" width="166" height="76" rx="14"/>
              <g class="dns-svg-icon dns-icon-globe" aria-hidden="true">
                <circle cx="531" cy="183" r="14"/><path d="M517 183h28M531 169c7 7 7 21 0 28M531 169c-7 7-7 21 0 28"/>
              </g>
              <text x="547" y="180" text-anchor="start" class="dns-svg-title">.com DNS</text>
              <text x="547" y="201" text-anchor="start" class="dns-svg-copy">Finds the domain</text>
            </g>
            <g class="dns-network-node dns-hierarchy-node" data-node="authoritative">
              <rect x="505" y="255" width="166" height="76" rx="14"/>
              <g class="dns-svg-icon dns-icon-server dns-icon-auth" aria-hidden="true">
                <rect x="515" y="275" width="26" height="12" rx="2"/>
                <rect x="515" y="291" width="26" height="12" rx="2"/>
                <circle cx="520" cy="281" r="1.4"/><circle cx="520" cy="297" r="1.4"/>
                <path d="M526 281h10M526 297h10"/>
              </g>
              <text x="547" y="288" text-anchor="start" class="dns-svg-title">Authoritative DNS</text>
              <text x="547" y="311" text-anchor="start" class="dns-svg-copy">Has the DNS record</text>
            </g>
            <g class="dns-network-node" data-node="website">
              <rect x="748" y="130" width="132" height="106" rx="16"/>
              <g class="dns-svg-icon dns-icon-website" aria-hidden="true">
                <rect x="795" y="138" width="38" height="27" rx="3"/>
                <path d="M795 145h38"/>
                <circle cx="800" cy="142" r="1"/><circle cx="804" cy="142" r="1"/>
                <circle cx="814" cy="154" r="6"/><path d="M808 154h12M814 148c3 3 3 9 0 12M814 148c-3 3-3 9 0 12"/>
              </g>
              <text x="814" y="188" text-anchor="middle" class="dns-svg-title">Website</text>
              <text x="814" y="212" text-anchor="middle" class="dns-svg-copy">93.184.216.34</text>
            </g>
            <circle class="dns-packet" cx="120" cy="183" r="10"/>
          </svg>
          <p class="dns-canvas-caption" id="dnsCanvasCaption">Ready to look up <code>www.example.com</code>.</p>
        </div>
        <aside class="dns-presenter">
          <h3 id="dnsStepTitle">Ready to begin</h3>
          <p id="dnsStepDescription">Start the simulation to see how a browser finds a website using DNS.</p>
          <div class="dns-status"><span>Status</span><strong id="dnsStatus">Waiting for a lookup</strong></div>
        </aside>
      </div>
      <div class="dns-sim-controls">
        <button class="dns-control alt" id="dnsStart">▶ Start</button>
        <button class="dns-control alt" id="dnsPrev" disabled>◀ Previous Step</button>
        <button class="dns-control" id="dnsNext">Next Step ▶</button>
        <button class="dns-control alt" id="dnsAuto">Auto Play</button>
        <button class="dns-control alt" id="dnsPause">⏸ Pause</button>
        <button class="dns-control alt" id="dnsReset">↺ Reset</button>
        <em id="dnsStepCount">Step 0 of 8</em>
      </div>
      <p class="dns-footer" id="dnsFooter">A cached answer can skip the requests to other DNS servers.</p>
    </div>`;
  } else if (i === 5) {
    section.classList.add('topic-slide', 'dhcp-topic-slide');
    section.innerHTML = "<p class='topic-tag'>TOPIC 2</p><h2>DHCP: automatic network configuration</h2><p class='topic-lead'>DHCP stands for Dynamic Host Configuration Protocol.</p><div class='topic-rule'></div><ul class='topic-list'><li>Automatically leases IP addresses to devices on a network.</li><li>Can provide the subnet mask, default gateway, and DNS server addresses.</li><li>Reduces manual setup and helps prevent address conflicts when configured correctly.</li><li>A lease is temporary and may be renewed while the device remains on the network.</li></ul><p class='key-idea'>Key idea: DHCP provides configuration; it does not translate website names.</p>";
  } else if (i === 6) {
    section.classList.add('dora-explained-slide');
    section.innerHTML = "<div class='dora-explained-content'><div class='dora-explained-heading'><p class='dora-explained-kicker'>DHCP ADDRESS ASSIGNMENT</p><h2>DORA Explained</h2><p class='dora-explained-lead'>The four DHCP messages that give a client its network settings.</p><div class='dora-explained-rule'></div></div><div class='dora-explained-steps'><article class='dora-explained-step dora-discover'><span class='dora-explained-letter'>D</span><span class='dora-explained-number'>01 · DISCOVER</span><h3>Find a DHCP server</h3><p>The client broadcasts a message to locate an available DHCP server.</p></article><span class='dora-explained-arrow' aria-hidden='true'>→</span><article class='dora-explained-step dora-offer'><span class='dora-explained-letter'>O</span><span class='dora-explained-number'>02 · OFFER</span><h3>Propose an address</h3><p>The server offers an available IP address and network settings.</p></article><span class='dora-explained-arrow' aria-hidden='true'>→</span><article class='dora-explained-step dora-request'><span class='dora-explained-letter'>R</span><span class='dora-explained-number'>03 · REQUEST</span><h3>Request the offer</h3><p>The client requests the offered address from the selected server.</p></article><span class='dora-explained-arrow' aria-hidden='true'>→</span><article class='dora-explained-step dora-acknowledge'><span class='dora-explained-letter'>A</span><span class='dora-explained-number'>04 · ACKNOWLEDGE</span><h3>Confirm the lease</h3><p>The server confirms the lease; the client can now use its settings.</p></article></div><p class='dora-explained-takeaway'>Discover → Offer → Request → Acknowledge</p></div><span class='dora-explained-page-number' aria-hidden='true'>07</span>";
  } else if (i === 7) {
    section.classList.add('dora-simulation-slide');
    section.innerHTML = `<div class="dora-simulation">
      <div class="dora-sim-heading">
        <p class="dora-kicker">DHCP IN ACTION</p>
        <h2 class="dora-title">The DORA process</h2>
        <p class="dora-lead">Follow the messages a device exchanges with a DHCP server to get online.</p>
      </div>
      <div class="dora-sim-layout">
        <div class="dora-canvas">
          <svg class="dora-network" viewBox="0 0 900 360" role="img" aria-label="Interactive DHCP DORA exchange between a client and a DHCP server">
            <defs>
              <marker id="doraArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0L9,4.5L0,9z" fill="#9aa3af"/></marker>
              <marker id="doraArrowActive" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0L9,4.5L0,9z" fill="#168f82"/></marker>
            </defs>
            <g class="dora-actor" data-actor="client">
              <rect class="dora-actor-card" x="36" y="88" width="230" height="198" rx="14"/>
              <g class="dora-svg-icon dora-client-icon" aria-hidden="true">
                <rect x="126" y="112" width="50" height="35" rx="3"/>
                <path d="M120 154h62l-5 7h-52zM151 147v7"/>
              </g>
              <text x="151" y="190" text-anchor="middle" class="dora-svg-title">DHCP client</text>
              <text x="151" y="216" text-anchor="middle" class="dora-svg-copy">PC 1 · no IP address</text>
              <text x="151" y="245" text-anchor="middle" class="dora-svg-copy" id="doraClientAddress">Waiting for configuration</text>
            </g>
            <g class="dora-actor" data-actor="server">
              <rect class="dora-actor-card" x="634" y="88" width="230" height="198" rx="14"/>
              <g class="dora-svg-icon dora-server-icon" aria-hidden="true">
                <rect x="721" y="111" width="58" height="17" rx="3"/>
                <rect x="721" y="133" width="58" height="17" rx="3"/>
                <circle cx="729" cy="119" r="2"/><circle cx="729" cy="141" r="2"/>
                <path d="M737 119h35M737 141h35"/>
              </g>
              <text x="749" y="190" text-anchor="middle" class="dora-svg-title">DHCP server</text>
              <text x="749" y="216" text-anchor="middle" class="dora-svg-copy">Router · 192.168.1.1</text>
              <text x="749" y="245" text-anchor="middle" class="dora-svg-copy" id="doraServerStatus">Listening for clients</text>
            </g>
            <path class="dora-message-path" data-message="discover" d="M266 153H634"/>
            <path class="dora-message-path" data-message="offer" d="M634 178H266"/>
            <path class="dora-message-path" data-message="request" d="M266 203H634"/>
            <path class="dora-message-path" data-message="ack" d="M634 228H266"/>
            <text x="450" y="145" text-anchor="middle" class="dora-message-label">DHCP DISCOVER</text>
            <text x="450" y="171" text-anchor="middle" class="dora-message-label">DHCP OFFER</text>
            <text x="450" y="197" text-anchor="middle" class="dora-message-label">DHCP REQUEST</text>
            <text x="450" y="223" text-anchor="middle" class="dora-message-label">DHCP ACK</text>
            <circle class="dora-packet" cx="266" cy="153" r="9"/>
            <rect class="dora-lease-card" x="634" y="304" width="230" height="48" rx="8"/>
            <text x="749" y="324" text-anchor="middle" class="dora-lease-title">AVAILABLE ADDRESS POOL</text>
            <text x="749" y="342" text-anchor="middle" class="dora-lease-copy">.100–.200 · .100 already leased</text>
          </svg>
          <p class="dora-canvas-caption" id="doraCanvasCaption">PC 1 is connected and ready to request network settings.</p>
        </div>
        <aside class="dora-presenter">
          <h3 id="doraStepTitle">Ready to begin</h3>
          <p id="doraStepDescription">Start the walkthrough to see how DHCP assigns a unique address and network settings to a client.</p>
          <div class="dora-status"><span>Status</span><strong id="doraStatus">No lease assigned</strong></div>
          <div class="dora-settings" id="doraSettings" hidden>
            <strong>Lease settings</strong>
            <span>IP address: 192.168.1.101</span>
            <span>Subnet mask: 255.255.255.0</span>
            <span>Gateway: 192.168.1.1</span>
            <span>DNS server: 8.8.8.8</span>
          </div>
        </aside>
      </div>
      <div class="dora-sim-controls">
        <button class="dora-control alt" id="doraStart">▶ Start</button>
        <button class="dora-control alt" id="doraPrev" disabled>◀ Previous Step</button>
        <button class="dora-control" id="doraNext">Next Step ▶</button>
        <button class="dora-control alt" id="doraAuto">Auto Play</button>
        <button class="dora-control alt" id="doraPause">⏸ Pause</button>
        <button class="dora-control alt" id="doraReset">↺ Reset</button>
        <em id="doraStepCount">Step 0 of 5</em>
      </div>
      <p class="dora-footer" id="doraFooter">DORA stands for Discover, Offer, Request, Acknowledge.</p>
    </div>`;
  } else if (i === 8) {
    section.classList.add('home-network-slide');
    section.innerHTML = `<div class="home-network-content">
      <div class="home-network-heading">
        <p class="home-network-kicker">HOME NETWORK</p>
        <h2>Home Network Setup</h2>
        <p class="home-network-lead">See how devices connect to the router, receive addresses, and reach the internet.</p>
      </div>
      <div class="home-network-canvas">
        <svg class="home-network-diagram" viewBox="0 0 1200 360" role="img" aria-labelledby="homeNetworkTitle homeNetworkDescription">
          <title id="homeNetworkTitle">Home network topology</title>
          <desc id="homeNetworkDescription">Two PCs connect to a home router on the local network. The router provides DHCP addresses and connects over the WAN to the internet and the ISP DHCP server.</desc>
          <defs>
            <marker id="homeLanArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#387a9e"/></marker>
            <marker id="homeWanArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#b57916"/></marker>
          </defs>
          <rect class="home-lan-zone" x="18" y="24" width="654" height="312" rx="18"/>
          <text class="home-zone-title" x="42" y="54">LOCAL AREA NETWORK · LAN</text>
          <text class="home-zone-subtitle" x="42" y="76">192.168.1.0/24</text>
          <path class="home-lan-link" d="M290 153H345V175H390"/>
          <path class="home-lan-link" d="M290 263H345V232H390"/>
          <path class="home-wan-link" d="M650 204H952"/>
          <g class="home-device">
            <rect class="home-device-card" x="62" y="105" width="228" height="96" rx="12"/>
            <g class="home-device-icon home-pc-icon" aria-hidden="true">
              <rect x="80" y="128" width="44" height="30" rx="3"/>
              <path d="M75 163h54l-5 7H80zM102 158v5"/>
            </g>
            <text class="home-device-title" x="145" y="145">PC 2</text>
            <text class="home-device-copy" x="145" y="169">192.168.1.100 · lease active</text>
            <text class="home-device-small" x="145" y="187">DHCP client</text>
          </g>
          <g class="home-device">
            <rect class="home-device-card home-client-card" x="62" y="215" width="228" height="96" rx="12"/>
            <g class="home-device-icon home-pc-icon" aria-hidden="true">
              <rect x="80" y="238" width="44" height="30" rx="3"/>
              <path d="M75 273h54l-5 7H80zM102 268v5"/>
            </g>
            <text class="home-device-title" x="145" y="255">PC 1</text>
            <text class="home-device-copy" x="145" y="279">No address · requesting a lease</text>
            <text class="home-device-small" x="145" y="297">DHCP client</text>
          </g>
          <g class="home-router">
            <rect class="home-router-card" x="390" y="126" width="260" height="156" rx="16"/>
            <g class="home-device-icon home-router-icon" aria-hidden="true">
              <path d="M465 169v-20M575 169v-20"/>
              <circle cx="465" cy="145" r="4"/><circle cx="575" cy="145" r="4"/>
              <rect x="440" y="169" width="160" height="43" rx="8"/>
              <circle cx="458" cy="190" r="3"/><circle cx="471" cy="190" r="3"/>
              <path d="M489 190h93"/>
            </g>
            <text class="home-router-title" x="520" y="240" text-anchor="middle">HOME ROUTER</text>
            <text class="home-device-copy" x="520" y="261" text-anchor="middle">192.168.1.1 · LAN DHCP server</text>
          </g>
          <g class="home-pool">
            <rect class="home-device-card" x="400" y="55" width="240" height="52" rx="10"/>
            <text class="home-pool-label" x="520" y="76" text-anchor="middle">DHCP ADDRESS POOL</text>
            <text class="home-device-copy" x="520" y="96" text-anchor="middle">.100 – .200 · .100 leased</text>
          </g>
          <path class="home-pool-link" d="M520 107V126"/>
          <g class="home-internet">
            <path class="home-cloud" d="M735 225c-18 0-30-11-30-25 0-14 11-25 26-26 7-20 24-32 43-32 22 0 39 15 44 34 16 1 27 12 27 25 0 14-12 24-29 24z"/>
            <circle class="home-globe-line" cx="774" cy="193" r="18"/>
            <path class="home-globe-line" d="M756 193h36M774 175c-10 10-10 26 0 36M774 175c10 10 10 26 0 36"/>
            <text class="home-device-title" x="774" y="259" text-anchor="middle">INTERNET</text>
          </g>
          <g class="home-isp">
            <rect class="home-device-card" x="952" y="116" width="210" height="176" rx="14"/>
            <g class="home-device-icon home-server-icon" aria-hidden="true">
              <rect x="1018" y="137" width="78" height="23" rx="4"/>
              <rect x="1018" y="169" width="78" height="23" rx="4"/>
              <circle cx="1029" cy="148" r="3"/><circle cx="1029" cy="180" r="3"/>
              <path d="M1040 148h45M1040 180h45"/>
            </g>
            <text class="home-device-title" x="1057" y="220" text-anchor="middle">ISP</text>
            <text class="home-device-copy" x="1057" y="241" text-anchor="middle">DHCP server</text>
            <text class="home-device-small" x="1057" y="263" text-anchor="middle">Assigns WAN settings</text>
          </g>
          <text class="home-link-label home-lan-label" x="334" y="134" text-anchor="middle">LAN</text>
          <text class="home-link-label home-wan-label" x="798" y="132" text-anchor="middle">WAN · DHCP client</text>
        </svg>
      </div>
    </div>`;
  } else if (i === 10) {
    section.classList.add('summary-slide');
    section.innerHTML = "<div class='summary-content'><p class='summary-kicker'>MODULE SUMMARY</p><h2>DNS & DHCP work together</h2><p class='summary-lead'>One helps devices join the network; the other helps them find destinations.</p><div class='summary-rule'></div><div class='summary-grid'><article class='summary-card summary-dhcp'><span class='summary-number'>01</span><h3>DHCP gives the device its settings</h3><p>Automatically assigns a temporary IP address and provides the subnet mask, default gateway, and DNS server.</p><div class='summary-example'><strong>Example</strong><span>PC 1 receives <code>192.168.1.101/24</code>, gateway <code>192.168.1.1</code>.</span></div></article><article class='summary-card summary-dns'><span class='summary-number'>02</span><h3>DNS finds a website by name</h3><p>Looks up a domain name and returns the matching DNS record, such as an IP address.</p><div class='summary-example'><strong>Example</strong><span><code>www.example.com</code> resolves to an IP address.</span></div></article></div><div class='summary-flow'><span>DHCP configures the device</span><b aria-hidden='true'>→</b><span>DNS resolves the name</span><b aria-hidden='true'>→</b><span>Browser connects to the site</span></div><p class='summary-takeaway'>Remember: DHCP assigns network configuration; DNS translates names into records.</p></div>";
  } else if (i === 9) {
    section.classList.add('dhcp-simulation-slide');
    section.innerHTML = "<h2>Interactive DHCP Simulation</h2><p class='sub'>Watch the home network build itself</p>";
    section.append($('#simT').content.cloneNode(true));
  } else {
    const heading = i ? '<h2>' + d.t + '</h2>' : '<h1>' + d.t + '</h1>';
    section.innerHTML = heading + '<p class="sub">' + d.s + '</p><div class="cards">' + d.c.join('') + '</div>';
  }

  M.append(section);
});

const dnsSteps = [
  { title: 'Ready to begin', description: 'Start the simulation to see how a browser finds a website using DNS.', status: 'Waiting for a lookup', caption: 'Ready to look up www.example.com.', footer: 'A cached answer can skip the requests to other DNS servers.', nodes: [], current: '', links: [], packet: [120, 183] },
  { title: '1. The browser needs an address', description: 'You enter www.example.com. The browser needs an IP address before it can connect to that site.', status: 'Looking for www.example.com', caption: 'The browser asks for the address of www.example.com.', footer: 'DNS looks up a name; it does not assign the device its network settings.', nodes: ['client'], current: 'client', links: [], packet: [120, 183] },
  { title: '2. The device asks a resolver', description: 'The device sends a DNS query to its recursive resolver. The resolver checks its cache first.', status: 'Query sent to the DNS resolver', caption: 'Request: www.example.com → DNS resolver', footer: 'If the resolver already has a fresh cached answer, it can return it right away.', nodes: ['client', 'resolver'], current: 'resolver', links: ['clientResolver'], packet: [245, 183] },
  { title: '3. Root DNS points to .com', description: 'No cached answer was found, so the resolver asks a root DNS server where to find the .com domain servers.', status: 'Root DNS queried', caption: 'Resolver asks root DNS where .com is handled.', footer: 'Root DNS servers direct resolvers to the right top-level domain servers.', nodes: ['client', 'resolver', 'root'], current: 'root', links: ['clientResolver', 'resolverRoot'], packet: [588, 73] },
  { title: '4. The .com server points to the domain', description: 'The resolver asks a .com DNS server, which refers it to the authoritative DNS server for example.com.', status: '.com DNS queried', caption: '.com DNS points to example.com’s authoritative server.', footer: 'TLD means top-level domain, such as .com, .org, or .net.', nodes: ['client', 'resolver', 'root', 'tld'], current: 'tld', links: ['clientResolver', 'resolverRoot', 'rootTld'], packet: [588, 183] },
  { title: '5. The authoritative server has the answer', description: 'The resolver asks the authoritative DNS server for www.example.com. It holds the requested record.', status: 'Authoritative DNS queried', caption: 'Resolver asks for the www.example.com record.', footer: 'Authoritative DNS is the source of the domain’s DNS records.', nodes: ['client', 'resolver', 'root', 'tld', 'authoritative'], current: 'authoritative', links: ['clientResolver', 'resolverRoot', 'rootTld', 'tldAuth'], packet: [588, 293] },
  { title: '6. The IP address is found', description: 'The authoritative server returns an A record. In this example, www.example.com resolves to 93.184.216.34.', status: 'A record received by resolver', caption: 'Answer: www.example.com → 93.184.216.34', footer: 'A DNS A record contains an IPv4 address; IPv6 addresses use AAAA records.', nodes: ['client', 'resolver', 'root', 'tld', 'authoritative'], current: 'resolver', links: ['clientResolver', 'resolverRoot', 'rootTld', 'tldAuth', 'authResolver'], packet: [480, 245] },
  { title: '7. The resolver returns the address', description: 'The resolver sends the IP address back to the device and may cache the answer for its time to live (TTL).', status: '93.184.216.34 returned to device', caption: 'DNS response: 93.184.216.34 → browser', footer: 'Caching helps make later lookups faster and reduces repeated DNS queries.', nodes: ['client', 'resolver', 'root', 'tld', 'authoritative'], current: 'client', links: ['clientResolver', 'resolverRoot', 'rootTld', 'tldAuth', 'authResolver', 'resolverClient'], packet: [245, 201] },
  { title: '8. The browser connects to the website', description: 'With the IP address, the browser can connect to the website. DNS resolution is complete.', status: 'Connected to 93.184.216.34', caption: 'Browser → website at 93.184.216.34', footer: 'DNS found the destination; the browser now uses the IP address to communicate with it.', nodes: ['client', 'resolver', 'root', 'tld', 'authoritative', 'website'], current: 'website', links: ['clientResolver', 'resolverRoot', 'rootTld', 'tldAuth', 'authResolver', 'resolverClient', 'resolverWeb'], packet: [700, 183] }
];

let dnsStep = 0;
let dnsTimer = null;
const dnsNode = (id) => document.getElementById(id);

function updateDnsSlide(stepIndex) {
  const state = dnsSteps[stepIndex];
  document.querySelectorAll('[data-node]').forEach(function(node) {
    node.classList.toggle('on', state.nodes.indexOf(node.dataset.node) !== -1);
    node.classList.toggle('current', node.dataset.node === state.current);
  });
  document.querySelectorAll('[data-link]').forEach(function(link) {
    link.classList.toggle('on', state.links.indexOf(link.dataset.link) !== -1);
  });

  const packet = document.querySelector('.dns-packet');
  packet.setAttribute('cx', state.packet[0]);
  packet.setAttribute('cy', state.packet[1]);
  packet.classList.toggle('on', stepIndex > 1);
  dnsNode('dnsStepTitle').textContent = state.title;
  dnsNode('dnsStepDescription').textContent = state.description;
  dnsNode('dnsStatus').textContent = state.status;
  dnsNode('dnsCanvasCaption').textContent = state.caption;
  dnsNode('dnsFooter').textContent = state.footer;
  dnsNode('dnsStepCount').textContent = 'Step ' + stepIndex + ' of ' + (dnsSteps.length - 1);
  dnsNode('dnsStart').disabled = stepIndex > 0;
  dnsNode('dnsPrev').disabled = stepIndex === 0;
  dnsNode('dnsNext').disabled = stepIndex === dnsSteps.length - 1;
}

function setDnsStep(stepIndex) {
  dnsStep = Math.max(0, Math.min(dnsSteps.length - 1, stepIndex));
  updateDnsSlide(dnsStep);
  if (dnsStep === dnsSteps.length - 1) pauseDns();
}

function pauseDns() {
  clearInterval(dnsTimer);
  dnsTimer = null;
  const autoButton = dnsNode('dnsAuto');
  if (autoButton) autoButton.textContent = 'Auto Play';
}

function playDns() {
  if (dnsTimer) {
    pauseDns();
    return;
  }
  if (dnsStep === dnsSteps.length - 1) setDnsStep(0);
  if (dnsStep === 0) setDnsStep(1);
  dnsNode('dnsAuto').textContent = 'Pause Auto Play';
  dnsTimer = setInterval(function() { setDnsStep(dnsStep + 1); }, 3500);
}

updateDnsSlide(dnsStep);

const doraSteps = [
  { title: 'Ready to begin', description: 'Start the walkthrough to see how DHCP assigns a unique address and network settings to a client.', status: 'No lease assigned', caption: 'PC 1 is connected and ready to request network settings.', footer: 'DORA stands for Discover, Offer, Request, Acknowledge.', message: '', direction: 'none', client: 'Waiting for configuration', server: 'Listening for clients' },
  { title: '1. Discover — the client looks for DHCP', description: 'PC 1 has no address yet, so it broadcasts DHCPDISCOVER on the local network to find a DHCP server.', status: 'DHCPDISCOVER broadcast', caption: 'PC 1 broadcasts: “Is there a DHCP server on this network?”', footer: 'The client uses 0.0.0.0 as its source because it has not received an address yet.', message: 'discover', direction: 'toServer', client: 'No address · requesting a lease', server: 'DHCPDISCOVER received' },
  { title: '2. Offer — the server proposes settings', description: 'The server checks its available pool. Since .100 is already leased, it offers 192.168.1.101 with network settings and a lease time.', status: 'DHCPOFFER · 192.168.1.101', caption: 'Server offers 192.168.1.101 · mask, gateway, DNS and lease time', footer: 'An offer is a proposal; the client has not started using the address yet.', message: 'offer', direction: 'toClient', client: 'Offer received · reviewing settings', server: 'Offering 192.168.1.101' },
  { title: '3. Request — the client accepts the offer', description: 'PC 1 broadcasts DHCPREQUEST to accept 192.168.1.101 and identify the server whose offer it chose.', status: 'DHCPREQUEST · .101 requested', caption: 'PC 1 broadcasts: “I would like to use 192.168.1.101.”', footer: 'Broadcasting the request also tells other DHCP servers that their offers were not selected.', message: 'request', direction: 'toServer', client: 'Requesting 192.168.1.101', server: 'Request received · checking lease' },
  { title: '4. Acknowledge — the server confirms the lease', description: 'The server records the lease and sends DHCPACK. PC 1 can now configure and use the assigned address.', status: 'DHCPACK · lease confirmed', caption: 'Server confirms 192.168.1.101 and delivers the configuration', footer: 'The client can now communicate using its new address and the supplied network settings.', message: 'ack', direction: 'toClient', client: 'Lease confirmed · 192.168.1.101', server: 'Lease recorded for PC 1' },
  { title: '5. PC 1 is ready to communicate', description: 'PC 1 applies its address, subnet mask, default gateway, and DNS server. It can now communicate on the network.', status: 'Configured · 192.168.1.101/24', caption: 'PC 1 is configured · address .101, gateway .1, DNS 8.8.8.8', footer: 'The lease is temporary and can be renewed before it expires.', message: 'ack', direction: 'done', client: '192.168.1.101 · online', server: 'Active lease · PC 1' }
];

let doraStep = 0;
let doraTimer = null;

function updateDoraSlide(stepIndex) {
  const state = doraSteps[stepIndex];
  document.querySelectorAll('[data-actor]').forEach(function(actor) {
    actor.classList.toggle('on', stepIndex > 0);
    actor.classList.toggle('current', actor.dataset.actor === (state.direction === 'toServer' ? 'server' : state.direction === 'toClient' ? 'client' : state.direction === 'done' ? 'client' : ''));
  });
  document.querySelectorAll('[data-message]').forEach(function(path) {
    path.classList.toggle('on', path.dataset.message === state.message);
  });
  document.querySelectorAll('.dora-message-label').forEach(function(label, index) {
    label.classList.toggle('on', ['discover', 'offer', 'request', 'ack'][index] === state.message);
  });

  const packet = document.querySelector('.dora-packet');
  const packetPosition = state.direction === 'toServer' ? 560 : state.direction === 'toClient' ? 340 : state.direction === 'done' ? 266 : 266;
  packet.setAttribute('cx', packetPosition);
  packet.classList.toggle('on', stepIndex > 0 && stepIndex < doraSteps.length - 1);
  dnsNode('doraStepTitle').textContent = state.title;
  dnsNode('doraStepDescription').textContent = state.description;
  dnsNode('doraStatus').textContent = state.status;
  dnsNode('doraCanvasCaption').textContent = state.caption;
  dnsNode('doraFooter').textContent = state.footer;
  dnsNode('doraClientAddress').textContent = state.client;
  dnsNode('doraServerStatus').textContent = state.server;
  dnsNode('doraSettings').hidden = stepIndex < 5;
  dnsNode('doraStepCount').textContent = 'Step ' + stepIndex + ' of ' + (doraSteps.length - 1);
  dnsNode('doraStart').disabled = stepIndex > 0;
  dnsNode('doraPrev').disabled = stepIndex === 0;
  dnsNode('doraNext').disabled = stepIndex === doraSteps.length - 1;
}

function setDoraStep(stepIndex) {
  doraStep = Math.max(0, Math.min(doraSteps.length - 1, stepIndex));
  updateDoraSlide(doraStep);
  if (doraStep === doraSteps.length - 1) pauseDora();
}

function pauseDora() {
  clearInterval(doraTimer);
  doraTimer = null;
  const autoButton = dnsNode('doraAuto');
  if (autoButton) autoButton.textContent = 'Auto Play';
}

function playDora() {
  if (doraTimer) {
    pauseDora();
    return;
  }
  if (doraStep === doraSteps.length - 1) setDoraStep(0);
  if (doraStep === 0) setDoraStep(1);
  dnsNode('doraAuto').textContent = 'Pause Auto Play';
  doraTimer = setInterval(function() { setDoraStep(doraStep + 1); }, 3500);
}

updateDoraSlide(doraStep);

document.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'dnsStart') { setDnsStep(1); }
  if (event.target && event.target.id === 'dnsNext') { pauseDns(); setDnsStep(dnsStep + 1); }
  if (event.target && event.target.id === 'dnsPrev') { pauseDns(); setDnsStep(dnsStep - 1); }
  if (event.target && event.target.id === 'dnsAuto') { playDns(); }
  if (event.target && event.target.id === 'dnsPause') { pauseDns(); }
  if (event.target && event.target.id === 'dnsReset') {
    pauseDns();
    setDnsStep(0);
  }
  if (event.target && event.target.id === 'doraStart') { setDoraStep(1); }
  if (event.target && event.target.id === 'doraNext') { pauseDora(); setDoraStep(doraStep + 1); }
  if (event.target && event.target.id === 'doraPrev') { pauseDora(); setDoraStep(doraStep - 1); }
  if (event.target && event.target.id === 'doraAuto') { playDora(); }
  if (event.target && event.target.id === 'doraPause') { pauseDora(); }
  if (event.target && event.target.id === 'doraReset') {
    pauseDora();
    setDoraStep(0);
  }
});

let cur = 0;
const slides = Array.from(document.querySelectorAll('.slide'));
const dots = $('#dots');

slides.forEach(function(_, i) {
  const dot = document.createElement('i');
  dot.title = 'Slide ' + (i + 1);
  dot.onclick = function() { go(i); };
  dots.append(dot);
});

function go(i) {
  if (cur === 4 && i !== 4) pauseDns();
  if (cur === 7 && i !== 7) pauseDora();
  cur = Math.max(0, Math.min(slides.length - 1, i));
  slides.forEach(function(s, k) { s.classList.toggle('active', k === cur); });
  Array.from(dots.children).forEach(function(dot, k) { dot.classList.toggle('a', k === cur); });
  $('#ct').textContent = (cur + 1) + ' / ' + slides.length;
  $('#prog i').style.width = ((cur + 1) / slides.length * 100) + '%';
  $('#pv').disabled = !cur;
  $('#nx').disabled = cur === slides.length - 1;
  window.scrollTo(0, 0);
}

$('#pv').onclick = function() { go(cur - 1); };
$('#nx').onclick = function() { go(cur + 1); };
window.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') go(cur + 1);
  if (event.key === 'ArrowLeft') go(cur - 1);
});
$('#fs').onclick = function() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
};

const P = { pc1: [160, 325], rt: [400, 235] };
const RM = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

const ST = [
  ['Empty network', 'The canvas starts empty. We will build the home network one piece at a time.', '“Nothing is connected yet. Let’s build a home network and watch DHCP work.”', 'No devices yet.'],
  ['Introduce the home router', 'The home router is configured as the local DHCP server. Its LAN address is 192.168.1.1/24 and it has a built-in Ethernet switch.', '“This is our home router. It has the LAN address 192.168.1.1 and acts as the DHCP server for the 192.168.1.0/24 network.”', 'Router online as LAN DHCP server.'],
  ['DHCP address pool', 'The server chooses available addresses from its pool and manages leases, handing out mask, gateway and DNS too.', '“The pool is 192.168.1.100 to .200 with mask 255.255.255.0, gateway 192.168.1.1 and DNS 8.8.8.8.”', 'Pool configured · 1 lease active.'],
  ['Reveal PC 1', 'PC 1 has no IPv4 address and is set to ‘Obtain an IPv4 address automatically’ – it is a DHCP client.', '“PC 1 has just connected. It has no address, but it is set to obtain one automatically.”', 'PC 1 connected · no IPv4 address.'],
  ['DHCP Discover', 'PC 1 has no address, so it broadcasts a DHCP Discover to locate a DHCP server.', '“PC 1 sends a Discover message to find a DHCP server on the local network. The home router is ready to respond.”', 'Discover broadcast PC 1 → router.'],
  ['DHCP Offer', 'The server offers an available address. PC 2 already uses .100, so this example offers .101.', '“The router offers 192.168.1.101, because .100 is already leased to PC 2.”', 'Offer 192.168.1.101 router → PC 1.'],
  ['DHCP Request', 'The client formally requests the offered address.', '“PC 1 accepts the offer and sends a Request for 192.168.1.101.”', 'Request PC 1 → router.'],
  ['DHCP Acknowledge', 'The server confirms the lease. The client can now use the address.', '“The router sends an Acknowledge. The lease is confirmed and PC 1 is configured.”', 'ACK router → PC 1 · success.'],
  ['PC 1 configuration complete', 'Address identifies PC 1; mask defines the local subnet; the gateway reaches other networks; DNS resolves names.', '“PC 1 now has 192.168.1.101/24, gateway 192.168.1.1 and DNS 8.8.8.8. PC 2 stays at .100.”', 'PC 1 .101 · PC 2 .100 – no conflict.'],
  ['Internet and ISP', 'The router is a DHCP server on the LAN but may be a DHCP client on the WAN, getting its ISP-facing settings from the ISP’s DHCP server.', '“On the LAN the router serves addresses; on the WAN it asks the ISP for its own. Actual addresses always depend on server configuration and leases.”', 'LAN (blue) and WAN (red) paths active.'],
  ['Complete', 'The lab has shown how a home router can serve IPv4 configuration to devices on the LAN while also acting as a client on the WAN.', '“DHCP and DNS work together to assign settings and resolve names; the exact addresses depend on the active pool and leases.”', 'Simulation complete.']
];

const MSG = [
  0, 0, 0, 0, 0,
  ['DHCP DISCOVER', 'Broadcast: who is a DHCP server?', 1],
  ['DHCP OFFER', 'Offered: 192.168.1.101', 0],
  ['DHCP REQUEST', 'Requesting 192.168.1.101', 1],
  ['DHCP ACK', 'Lease confirmed ✓', 0]
];

let step = 0;
let timer = null;
let tok = 0;

const g = (id) => document.getElementById(id);
const on = (id, value) => g(id).classList.toggle('on', value);

function fly(toRouter, label) {
  const my = ++tok;
  const a = toRouter ? P.pc1 : P.rt;
  const b = toRouter ? P.rt : P.pc1;
  const pk = g('pk');
  g('pkl').textContent = label;
  g('rt').classList.add('act');

  if (RM) {
    pk.style.visibility = 'hidden';
    g('rt').classList.remove('act');
    return;
  }

  pk.style.visibility = 'visible';
  const t0 = performance.now();

  function animate(time) {
    if (my !== tok) return;
    const k = Math.min(1, (time - t0) / 1400);
    pk.setAttribute('transform', 'translate(' + (a[0] + (b[0] - a[0]) * k) + ',' + (a[1] + (b[1] - a[1]) * k) + ')');
    if (k < 1) {
      requestAnimationFrame(animate);
    } else {
      pk.style.visibility = 'hidden';
      g('rt').classList.remove('act');
    }
  }

  requestAnimationFrame(animate);
}

function render() {
  const s = step;
  on('Lrouter', s >= 1);
  on('Lpc2', s >= 2);
  on('l2', s >= 2);
  on('Lpool', s >= 3);
  on('Lpc1', s >= 4);
  on('l1', s >= 4);
  on('Lbadge', s >= 5 && s <= 8);
  on('Lok', s >= 8);
  on('Lwan', s >= 10);
  on('lw', s >= 10);
  on('lw2', s >= 10);

  g('intro').style.display = s ? 'none' : '';
  g('scr1').setAttribute('fill', s >= 8 ? '#bbf7d0' : '#fecaca');

  const values = [
    ['No IPv4 Address', 'Obtain an IPv4 address automatically', '', '', ''],
    ['Lease acknowledged ✓', 'Applying configuration…', '', '', ''],
    ['IPv4 Address: 192.168.1.101', 'Subnet Mask: 255.255.255.0', 'Default Gateway: 192.168.1.1', 'DNS Server: 8.8.8.8', 'PC 1 (DHCP client) · PC 2: .100/24']
  ];
  const t = values[s >= 9 ? 2 : s === 8 ? 1 : 0];
  t.forEach(function(entry, i) {
    g('t' + (i + 1)).textContent = entry;
  });
  g('t1').setAttribute('fill', s >= 8 ? '#15803d' : '#b91c1c');

  tok++;
  g('pk').style.visibility = 'hidden';
  g('rt').classList.remove('act');

  const m = MSG[s];
  if (m) {
    g('bt').textContent = m[0];
    g('bs').textContent = m[1];
    fly(m[2], m[0]);
  }

  const d = ST[s] || ST[ST.length - 1];
  $('#st').textContent = 'Step ' + s + ': ' + d[0];
  $('#ex').textContent = d[1];
  $('#sp').textContent = d[2];
  $('#ns').textContent = d[3];
  $('#sc').textContent = 'Step ' + s + ' of 10';

  $('#bp').disabled = s === 0;
  $('#bn').disabled = s === 10;
  $('#b0').disabled = s > 0;
}

const set = function(n) {
  step = Math.max(0, Math.min(10, n));
  render();
  if (step === 10) pause();
};

function pause() {
  clearInterval(timer);
  timer = null;
}

$('#b0').onclick = function() { if (step === 0) set(1); };
$('#bn').onclick = function() { pause(); set(step + 1); };
$('#bp').onclick = function() { pause(); set(step - 1); };
$('#br').onclick = function() { pause(); set(0); };
$('#bz').onclick = pause;
$('#ba').onclick = function() {
  if (timer) return;
  if (step >= 10) set(0);
  if (step === 0) set(1);
  timer = setInterval(function() { set(step + 1); }, 4500);
};

go(0);
render();
