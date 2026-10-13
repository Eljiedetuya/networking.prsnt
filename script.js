const $ = (selector) => document.querySelector(selector);
const C = (title, content) => '<div class="card"><h4>' + title + '</h4><p>' + content + '</p></div>';

const S = [
  { t: 'NETWORKING FUNDAMENTALS • MODULE 8', s: 'How devices find services and receive network settings', c: [C('Topics', 'DNS, DHCP, DORA and the home network.'), C('Format', 'Slides + a live network simulation.'), C('Use', 'Arrow keys, dots or buttons to navigate.')] },
  { t: 'Learning Objectives', s: 'By the end you can…', c: [C('Explain DNS', 'How names become IP addresses.'), C('Explain DHCP', 'How hosts get addresses automatically.'), C('Describe DORA', 'Discover, Offer, Request, Acknowledge.'), C('Read addressing', 'Subnet, gateway, DNS and pool.')] },
  { t: 'Introduction', s: 'Why devices need configuration', c: [C('IP configuration', 'A host needs an address, mask, gateway and DNS server before it can talk beyond itself.'), C('Name resolution', 'People use names like example.com; networks route by IP address.'), C('Automation', 'Typing settings on every device does not scale – DHCP and DNS automate it.')] },
  { t: 'DNS Services', s: 'Domain-name resolution', c: [C('A / AAAA', 'Name → IPv4 / IPv6 address.'), C('CNAME', 'Alias pointing to another name.'), C('MX', 'Mail server for a domain.'), C('NS / PTR', 'Authoritative servers / reverse lookup.'), C('Result', 'DNS answers “what is the address of this name?”')] },
  { t: 'DHCP Services', s: 'Automatic IP address assignment', c: [C('Server', 'Holds a pool of addresses and hands out leases.'), C('Client', 'Asks for configuration at boot or connect.'), C('Delivers', 'Address, mask, default gateway, DNS server, lease time.'), C('Benefit', 'Fewer errors and no duplicate addresses.')] },
  { t: 'Home Network Setup', s: 'Our lab topology', c: [C('Router', '<code>192.168.1.1/24</code> – LAN DHCP server.'), C('PC 2', 'Already leased <code>192.168.1.100</code>.'), C('PC 1', 'New client with no address yet.'), C('Pool', '<code>192.168.1.100–192.168.1.200</code>'), C('ISP', 'DHCP server on the WAN side.')] },
  null,
  { t: 'DORA Explained', s: 'The four DHCP messages', c: [C('1 Discover', 'Client broadcasts to find any DHCP server.'), C('2 Offer', 'Server proposes an available address.'), C('3 Request', 'Client asks to use the offered address.'), C('4 Acknowledge', 'Server confirms the lease and settings.')] },
  { t: 'DHCP Leases', s: 'Pools, tracking and reservations', c: [C('Address pool', 'Range the server may hand out.'), C('Lease', 'Temporary; renewed before it expires.'), C('Tracking', 'Server records which MAC holds which address.'), C('Static / reservation', 'Fixed devices keep a set address, outside the pool or reserved by MAC.')] },
  { t: 'LAN vs. WAN', s: 'Two roles for one router', c: [C('LAN side', 'Router is a DHCP <b>server</b> for PC 1, PC 2…'), C('WAN side', 'Router is a DHCP <b>client</b> of the ISP.'), C('Gateway', '<code>192.168.1.1</code> forwards LAN traffic toward the internet.')] },
  { t: 'DNS vs. DHCP', s: 'Different jobs, working together', c: [C('DHCP', 'Assigns network configuration (address, mask, gateway, DNS).'), C('DNS', 'Resolves names to DNS records such as A records.'), C('Gateway', 'Neither – the gateway routes traffic to other networks.'), C('Link', 'DHCP tells clients <i>which</i> DNS server (<code>8.8.8.8</code>) to use.')] },
  null,
  { t: 'Summary', s: 'Key concepts', c: [C('DHCP', 'Automatic addressing via Discover-Offer-Request-ACK.'), C('Our lab', 'PC 1 got <code>192.168.1.101/24</code>; PC 2 keeps <code>.100</code>.'), C('Remember', 'Actual addresses depend on server config and existing leases.'), C('Router', 'DHCP server on LAN, client on WAN.')] }
];

const Q = [
  ['Which message does a client send first?', ['Offer', 'Discover', 'ACK'], 1, 'The client broadcasts Discover to find a server.'],
  ['Why did the server offer .101 to PC 1?', ['PC 2 already holds .100', 'It is random', 'DNS said so'], 0, 'The server avoids addresses with active leases.'],
  ['What does DNS do?', ['Assigns IPs', 'Routes packets', 'Resolves names to addresses'], 2, 'DNS maps names to records.'],
  ['On its WAN, the home router typically acts as a…', ['DHCP client', 'DNS record', 'switch only'], 0, 'It requests its ISP-facing config.']
];

const M = document.getElementById('slides');
S.forEach(function(d, i) {
  const section = document.createElement('section');
  section.className = 'slide';

  if (i === 0) {
    section.classList.add('title-slide');
    section.innerHTML = "<div class='title-slide-wrap'><p class='eyebrow'>NETWORKING FUNDAMENTALS • MODULE 8</p><h1><span>IP Addressing</span><span>Services</span></h1><p class='blue-tag'>DNS & DHCP</p><p class='subtitle'>How devices find services and receive network settings</p></div>";
  } else if (i === 6) {
    section.innerHTML = "<h2>Interactive DHCP Simulation</h2><p class='sub'>Watch the home network build itself</p>";
    section.append($('#simT').content.cloneNode(true));
  } else if (i === 11) {
    let html = "<h2>Knowledge Check</h2><p class='sub'>Instant feedback</p>";
    html += Q.map(function (q, n) {
      let options = '';
      q[1].forEach(function (option, k) {
        options += '<button data-n="' + n + '" data-k="' + k + '">' + option + '</button>';
      });
      return '<div class="q"><b>' + (n + 1) + '. ' + q[0] + '</b>' + options + '<div class="fb" id="f' + n + '"></div></div>';
    }).join('');
    section.innerHTML = html;
  } else {
    const heading = i ? '<h2>' + d.t + '</h2>' : '<h1>' + d.t + '</h1>';
    section.innerHTML = heading + '<p class="sub">' + d.s + '</p><div class="cards">' + d.c.join('') + '</div>';
  }

  M.append(section);
});

document.addEventListener('click', function(event) {
  const button = event.target.closest('.q button');
  if (!button) return;
  const q = Q[button.dataset.n];
  const ok = Number(button.dataset.k) === q[2];
  button.className = ok ? 'ok' : 'no';
  $('#f' + button.dataset.n).textContent = (ok ? '✔ Correct. ' : '✘ Try again. ') + (ok ? q[3] : '');
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
