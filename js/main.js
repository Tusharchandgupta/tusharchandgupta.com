/**
 * Main Application Logic
 * Navigation, Modals, PCB Stackup Explorer, CLI Terminal, and Project Data.
 */

// Project Deep-Dive Data Bank
const PROJECTS_DATA = {
  fpga: {
    title: 'UltraCompute X100: Kintex UltraScale+ FPGA Carrier',
    category: 'High-Speed PCB & Silicon',
    badge: '14-LAYER ENIG PCB // 28Gbps SerDes',
    image: 'assets/images/project-fpga.jpg',
    summary:
      'A multi-gigabit hardware accelerator carrier card designed for edge inference and real-time network packet inspection. Features matched-delay high-speed differential pairs, custom power distribution network (PDN), and high-density BGA breakout.',
    specs: [
      { k: 'Layer Stack', v: '14-Layer Megtron-6 ENIG' },
      { k: 'High-Speed I/O', v: '4x QSFP28 (100 Gbps aggregate)' },
      { k: 'Impedance', v: '85Ω Differential PCIe, 100Ω SerDes' },
      { k: 'Memory Bus', v: 'DDR4 SODIMM @ 3200 MT/s' },
      { k: 'Power Rail', v: '0.85V VCC_INT @ 60A with multiphase PMIC' },
      { k: 'EDA Toolchain', v: 'Altium Designer, ANSYS SIwave & HFSS' },
    ],
    challenges: [
      'Mitigated crosstalk on 28 Gbps transceiver channels by enforcing 3W spacing and ground via fences.',
      'Designed low-impedance power plane cavity resonances with target impedance < 2.5 mΩ up to 500 MHz.',
      'Performed DDR4 length tuning and fly-by topology verification with < 0.2 ps skew within byte lanes.',
    ],
    bom: [
      { designator: 'U1', mpn: 'XCKU060-2FFVA1156E', desc: 'Xilinx Kintex UltraScale+ FPGA', mfr: 'AMD / Xilinx' },
      { designator: 'U2-U4', mpn: 'LTM4677EY#PBF', desc: 'Dual 18A Step-Down DC/DC µModule with PMBus', mfr: 'Analog Devices' },
      { designator: 'J1-J4', mpn: '2170705-1', desc: 'QSFP28 1x1 Cage & Connector Assembly', mfr: 'TE Connectivity' },
      { designator: 'Y1', mpn: 'Si5345A-D-GM', desc: 'Ultra Low Jitter Multi-Channel Clock Generator', mfr: 'Skyworks' },
      { designator: 'CONN1', mpn: '10129381-902002BLF', desc: 'PCIe Gen4 x16 Edge Gold Finger Connector', mfr: 'Amphenol' },
    ],
  },
  power: {
    title: 'GaN-Drive: 48V/60A Brushless Servo Inverter',
    category: 'Power Electronics & GaN',
    badge: '4-LAYER 3oz HEAVY COPPER // 200kHz SWITCHING',
    image: 'assets/images/project-gan.jpg',
    summary:
      'Ultra-compact, high-efficiency GaN FET inverter for high-payload robotic actuators and EV steering servos. Features isolated Kelvin-source gate loops, ultra-low parasitic loop inductance, and high-side current monitoring.',
    specs: [
      { k: 'Input Voltage', v: '24V - 54V DC (48V nominal)' },
      { k: 'Peak Current', v: '60A continuous, 110A peak' },
      { k: 'Switching Freq', v: '200 kHz GaN PWM' },
      { k: 'Thermal Solution', v: 'Direct CNC aluminum plate mounting' },
      { k: 'MCU Control', v: 'STM32G474 Mixed-Signal ARM Cortex-M4' },
      { k: 'Telemetry', v: 'CAN-FD 5Mbps & Hall/Encoder telemetry' },
    ],
    challenges: [
      'Minimized power loop commutation inductance down to < 1.2 nH to prevent drain-source overshoot ringing at 200 kHz.',
      'Implemented four-terminal Kelvin shunt resistors for clean phase current feedback into fast on-chip comparators.',
      'Integrated active over-current shutdown within 25 nanoseconds via hardware latch.',
    ],
    bom: [
      { designator: 'Q1-Q6', mpn: 'GS66508T', desc: '650V 30A Top-Cooled GaN E-HEMTs', mfr: 'GaN Systems' },
      { designator: 'U1-U3', mpn: 'LMG1210VRVR', desc: 'Half-Bridge GaN Driver 50MHz', mfr: 'Texas Instruments' },
      { designator: 'U4', mpn: 'STM32G474RET6', desc: 'High-Resolution Timer Mixed-Signal MCU', mfr: 'STMicroelectronics' },
      { designator: 'R1-R3', mpn: 'WSL36371L000FEA', desc: '1 mΩ 0.1% 3W Kelvin Current Shunt', mfr: 'Vishay Dale' },
      { designator: 'C1-C6', mpn: 'C5750X7T2J474K250KC', desc: '0.47µF 630V Ceramic X7T Low-ESR Decoupling', mfr: 'TDK' },
    ],
  },
  iot: {
    title: 'Precision Industrial Edge IoT Gateway',
    category: 'Embedded IoT & Telemetry',
    badge: '6-LAYER ENIG // SUB-GHz + BLE 5.3',
    image: 'assets/images/project-iot.jpg',
    summary:
      'Ruggedized remote sensor aggregator for vibration analysis, acoustic anomaly detection, and factory automation. Integrates multi-core wireless SoCs, isolated RS-485, and ultra-low quiescent current power sequencing.',
    specs: [
      { k: 'Wireless Core', v: 'nRF52840 (BLE 5.3) + SX1262 LoRa' },
      { k: 'Analog Front-End', v: '24-bit 192kSPS Delta-Sigma ADC' },
      { k: 'Quiescent Current', v: '< 14 µA deep sleep mode' },
      { k: 'Industrial Bus', v: 'Isolated RS-485, CAN 2.0B, USB-C' },
      { k: 'Battery Mgmt', v: 'MPPT Solar / 18650 Li-Ion charger' },
      { k: 'Certifications', v: 'FCC Part 15 / CE compliant pre-tested' },
    ],
    challenges: [
      'Isolated sensitive 24-bit analog ADC traces from switching DC-DC power converter switching harmonics.',
      'Tuned custom 868/915 MHz PCB ceramic patch antenna network with return loss S11 < -22 dB.',
      'Achieved 4-year field battery life on dual 3400mAh 18650 Li-Ion cells using scheduled duty cycles.',
    ],
    bom: [
      { designator: 'U1', mpn: 'nRF52840-QIAA-R', desc: 'Bluetooth 5.3 / Thread / Zigbee SoC', mfr: 'Nordic Semi' },
      { designator: 'U2', mpn: 'SX1262IMLTRT', desc: 'Sub-GHz LoRa / FSK Transceiver IC', mfr: 'Semtech' },
      { designator: 'U3', mpn: 'ADS127L01IPW', desc: '24-Bit 512kSPS High-Speed ADC', mfr: 'Texas Instruments' },
      { designator: 'U4', mpn: 'MAX14853GWE+', desc: 'Isolated RS-485 Transceiver with Integrated Power', mfr: 'Analog Devices' },
      { designator: 'ANT1', mpn: 'W3011', desc: 'Ceramic Chip Antenna 868-928MHz', mfr: 'Pulse Electronics' },
    ],
  },
  instrumentation: {
    title: 'Low-Noise Electrometer & Transimpedance Amp',
    category: 'Mixed-Signal & RF',
    badge: '4-LAYER ROGERS RO4003C // FEMTOAMPERE TIA',
    image: 'assets/images/hero-pcb.jpg',
    summary:
      'Laboratory-grade picoampere current measurement front-end with sub-picofarad input capacitance, driven guard rings, and CNC nickel-plated Faraday shielding.',
    specs: [
      { k: 'Input Current', v: '10 fA to 10 µA dynamic range' },
      { k: 'Bandwidth', v: 'DC to 250 kHz' },
      { k: 'Substrate', v: 'Rogers RO4003C RF / PTFE substrate' },
      { k: 'Noise Floor', v: '< 4 fA/√Hz at 1 kHz' },
      { k: 'Shielding', v: 'Active driven PCB guard ring + milled can' },
      { k: 'Interface', v: 'High-speed SPI to STM32, USB-TMC' },
    ],
    challenges: [
      'Eliminated PCB surface leakage currents through multi-layer driven guard tracks held at virtual ground potential.',
      'Selected ultra-high gigohm feedback resistors with sub-0.05 pF parasitic shunt capacitance.',
      'Designed thermal symmetry across differential op-amp pairs to cancel thermocouple Seebeck voltages.',
    ],
    bom: [
      { designator: 'U1', mpn: 'ADA4530-1ARZ', desc: 'Femtoampere Input Bias Current Electrometer Amp', mfr: 'Analog Devices' },
      { designator: 'U2', mpn: 'ADR4525BRZ', desc: 'Ultra-Low Noise 2.5V Voltage Reference', mfr: 'Analog Devices' },
      { designator: 'R_FB', mpn: 'SM102031007FE', desc: '1 Gigaohm 1% Precision High-Voltage Resistor', mfr: 'Ohmite' },
      { designator: 'SHIELD1', mpn: 'SMS-204-C', desc: 'Surface Mount Two-Piece RF Shield Can', mfr: 'Leader Tech' },
    ],
  },
};

// PCB Stackup Layer Database
const STACKUP_LAYERS = {
  1: {
    name: 'Layer 1: Top Copper (Signal / Microstrip)',
    thickness: '0.043 mm (1 oz + Plating)',
    type: 'High-Speed Signal & RF Microstrip',
    mat: 'Electrodeposited Copper / ENIG Gold Finish',
    notes: 'Controlled 50Ω single-ended & 100Ω differential pairs. Low-loss copper foil.',
  },
  2: {
    name: 'Layer 2: Prepreg (Dielectric)',
    thickness: '0.100 mm (1080 Glass Style)',
    type: 'Dielectric Insulation',
    mat: 'Megtron-6 High-Tg FR-4 (Dk = 3.65, Df = 0.002)',
    notes: 'Ultra-low dielectric loss for multi-gigabit signal preservation.',
  },
  3: {
    name: 'Layer 3: Inner Ground Plane (GND 1)',
    thickness: '0.035 mm (1 oz Copper)',
    type: 'Continuous Ground Reference Plane',
    mat: 'Solid Solid-Copper Pour',
    notes: 'Unbroken return path directly underneath Layer 1 high-speed lines.',
  },
  4: {
    name: 'Layer 4: FR-4 Core Laminate',
    thickness: '0.200 mm',
    type: 'Structural Dielectric Core',
    mat: 'Reinforced Woven Fiberglass FR-4',
    notes: 'Mechanical stability and impedance spacing.',
  },
  5: {
    name: 'Layer 5: Inner Power Plane (Split VDD_CORE / 3V3)',
    thickness: '0.035 mm (1 oz Copper)',
    type: 'Split Power Distribution Plane',
    mat: 'Copper Polygon Islands',
    notes: 'Low DC IR drop with interleaved bypass ceramic caps to adjacent GND planes.',
  },
  6: {
    name: 'Layer 6: Bottom Copper (Bottom Signal & Power)',
    thickness: '0.043 mm (1 oz + Plating)',
    type: 'Secondary Component Mounting & Bulk Routing',
    mat: 'Copper / ENIG Gold Finish',
    notes: 'Secondary decoupling capacitors and test point breakouts.',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initProjectFilters();
  initModal();
  initStackupViewer();
  initTerminal();
  initContactForm();
});

// 1. Navbar Scroll Effect & Mobile Menu
function initNavbar() {
  const header = document.querySelector('.header-nav');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close on link click
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

// 2. Project Filtering
function initProjectFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      cards.forEach((card) => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 3. Project Modal Dialog
function initModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openBtns = document.querySelectorAll('.btn-open-modal');

  if (!modal) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projKey = btn.dataset.project;
      const data = PROJECTS_DATA[projKey];
      if (!data) return;

      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalBadge').textContent = data.badge;
      document.getElementById('modalSummary').textContent = data.summary;
      document.getElementById('modalImage').src = data.image;

      // Populate Specs
      const specsContainer = document.getElementById('modalSpecsList');
      specsContainer.innerHTML = '';
      data.specs.forEach((s) => {
        const item = document.createElement('div');
        item.className = 'spec-item';
        item.innerHTML = `<span class="spec-k">${s.k}</span><span class="spec-v">${s.v}</span>`;
        specsContainer.appendChild(item);
      });

      // Populate Challenges
      const challengesContainer = document.getElementById('modalChallengesList');
      challengesContainer.innerHTML = '';
      data.challenges.forEach((c) => {
        const li = document.createElement('li');
        li.textContent = c;
        challengesContainer.appendChild(li);
      });

      // Populate BOM Table
      const bomBody = document.getElementById('modalBomBody');
      bomBody.innerHTML = '';
      data.bom.forEach((b) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${b.designator}</strong></td>
          <td><code style="color: #00f0ff;">${b.mpn}</code></td>
          <td>${b.desc}</td>
          <td>${b.mfr}</td>
        `;
        bomBody.appendChild(tr);
      });

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

// 4. PCB Stackup Interactive Visualizer
function initStackupViewer() {
  const rows = document.querySelectorAll('.pcb-layer-row');
  const nameDisplay = document.getElementById('layerDetailName');
  const thickDisplay = document.getElementById('layerDetailThickness');
  const typeDisplay = document.getElementById('layerDetailType');
  const matDisplay = document.getElementById('layerDetailMat');
  const noteDisplay = document.getElementById('layerDetailNotes');

  rows.forEach((row) => {
    row.addEventListener('mouseenter', () => {
      const layerId = row.dataset.layer;
      const layer = STACKUP_LAYERS[layerId];
      if (!layer) return;

      if (nameDisplay) nameDisplay.textContent = layer.name;
      if (thickDisplay) thickDisplay.textContent = layer.thickness;
      if (typeDisplay) typeDisplay.textContent = layer.type;
      if (matDisplay) matDisplay.textContent = layer.mat;
      if (noteDisplay) noteDisplay.textContent = layer.notes;

      rows.forEach((r) => (r.style.opacity = '0.5'));
      row.style.opacity = '1';
    });

    row.addEventListener('mouseleave', () => {
      rows.forEach((r) => (r.style.opacity = '1'));
    });
  });
}

// 5. Hardware CLI Terminal
function initTerminal() {
  const input = document.getElementById('termInput');
  const output = document.getElementById('termOutput');
  if (!input || !output) return;

  function appendLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `term-line ${className}`;
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = input.value.trim();
      input.value = '';
      if (!rawCmd) return;

      appendLine(`<span class="term-prompt">tushar@hw-bench:~$</span> ${rawCmd}`);
      const cmd = rawCmd.toLowerCase();

      switch (cmd) {
        case 'help':
          appendLine('AVAILABLE SYSTEM COMMANDS:', 'gold');
          appendLine('  <strong>about</strong>        - Hardware architect bio & mission');
          appendLine('  <strong>specs</strong>        - Core engineering competencies & tooling');
          appendLine('  <strong>projects</strong>     - Summary of active hardware boards');
          appendLine('  <strong>telemetry</strong>    - Current lab bench status & diagnostics');
          appendLine('  <strong>contact</strong>      - Direct communication channels');
          appendLine('  <strong>ping</strong>         - Measure bench latency');
          appendLine('  <strong>clear</strong>        - Reset terminal display');
          break;

        case 'about':
          appendLine('TUSHAR CHAND GUPTA // HARDWARE SYSTEMS ARCHITECT', 'cyan');
          appendLine('Specialized in high-speed digital PCB design, mixed-signal analog instrumentation, and FPGA carrier boards.');
          appendLine('Experienced from initial schematic architecture and SI/PI 3D electromagnetic simulations to multi-layer fabrication and lab bench bring-up.');
          break;

        case 'specs':
          appendLine('HARDWARE SPECIFICATIONS:', 'cyan');
          appendLine('  EDA/CAD:       Altium Designer 24, KiCad 8, Cadence Allegro, OrCAD');
          appendLine('  SI / PI:       ANSYS HFSS, Keysight ADS, LTspice, HyperLynx');
          appendLine('  Buses & I/O:   PCIe Gen4, 28Gbps SerDes, DDR4/5, CAN-FD, USB 3.2, 10GbE');
          appendLine('  MCU / FPGA:    STM32 (Cortex-M4/M7), Xilinx UltraScale+, nRF52840');
          break;

        case 'projects':
          appendLine('ACTIVE HARDWARE PORTFOLIO:', 'gold');
          appendLine('  [1] UltraCompute X100: Kintex UltraScale+ 14-Layer PCIe Card');
          appendLine('  [2] GaN-Drive: 48V/60A Brushless Servo Inverter (200kHz)');
          appendLine('  [3] Precision Industrial Edge IoT Gateway (BLE 5.3 / LoRa)');
          appendLine('  [4] Femtoampere Low-Noise Electrometer Front-End');
          break;

        case 'telemetry':
          appendLine('SYSTEM TELEMETRY REPORT:', 'green');
          appendLine('  Bench Power:    48.0V @ 5.2A [ACTIVE]');
          appendLine('  Oscilloscope:   Tektronix 4-Channel 1GHz [LOCKED]');
          appendLine('  Thermal Imager: FLIR C5 [Core Temp: 34.2°C]');
          appendLine('  Clock Jitter:   < 85 fs RMS (Phase Noise Compliant)');
          break;

        case 'contact':
          appendLine('COMMUNICATION CHANNELS:', 'cyan');
          appendLine('  Email:   contact@tusharchandgupta.com');
          appendLine('  GitHub:  https://github.com/Tusharchandgupta');
          appendLine('  Web:     https://tusharchandgupta.com');
          break;

        case 'ping':
          appendLine('PING 127.0.0.1 (50-Ohm Terminated Line):', 'system');
          appendLine('64 bytes from 127.0.0.1: icmp_seq=1 time=0.082 ns (speed of light in FR-4)');
          break;

        case 'clear':
          output.innerHTML = '';
          appendLine('Hardware Diagnostic Shell Initialized. Type <span class="cyan">help</span> for commands.', 'system');
          break;

        default:
          appendLine(`command not found: "${rawCmd}". Type <span class="gold">help</span> for command list.`, 'system');
          break;
      }
    }
  });
}

// 6. Contact Form Transmission Simulator
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusBox = document.getElementById('formStatus');
  if (!form || !statusBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const msg = document.getElementById('contactMessage').value;

    if (!name || !email || !msg) {
      statusBox.innerHTML = '<span style="color: #ef4444;">ERROR: All telemetry fields required.</span>';
      return;
    }

    statusBox.innerHTML = '<span style="color: #00f0ff;">TRANSMITTING HARDWARE TELEMETRY PACKET OVER TLS...</span>';

    setTimeout(() => {
      statusBox.innerHTML =
        '<span style="color: #10b981;">✓ PACKET DELIVERED: Message sent to Tushar Chand Gupta. Expect response within 24 hours.</span>';
      form.reset();
    }, 1200);
  });
}
