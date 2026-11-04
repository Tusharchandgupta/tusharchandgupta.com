import {
  Article,
  Project,
  EngineeringTool,
  WikiEntry,
  LabExperiment,
  DirectoryListing,
  DownloadItem,
  BookRecommendation,
} from '../types';

export const INITIAL_TOOLS: EngineeringTool[] = [
  {
    id: 'ohms-law',
    slug: 'ohms-law',
    name: "Ohm's Law Calculator",
    category: 'Electrical',
    description: 'Calculate Voltage, Current, Resistance, and Power instantly with engineering notation.',
    formula: 'V = I × R | P = V × I = I²R = V²/R',
    iconName: 'Zap',
    tags: ['Voltage', 'Current', 'Resistance', 'Power', 'Basic Circuits'],
  },
  {
    id: 'resistor-color-code',
    slug: 'resistor-color-code',
    name: 'Resistor Colour Code Calculator',
    category: 'Electrical',
    description: 'Decipher 4-band and 5-band axial resistor color bands or reverse-lookup color bands from resistance.',
    formula: 'R = (Band1 × 10 + Band2) × Multiplier ± Tol%',
    iconName: 'Palette',
    tags: ['Resistor', 'Color Code', 'E24', 'Tolerance', 'Passive'],
  },
  {
    id: 'led-resistor',
    slug: 'led-resistor',
    name: 'LED Series Resistor Calculator',
    category: 'Electrical',
    description: 'Determine the exact current-limiting series resistor and wattage rating for any single or array LED.',
    formula: 'R = (V_supply - V_forward) / I_forward',
    iconName: 'Lightbulb',
    tags: ['LED', 'Resistor', 'Current Limiting', 'Power Dissipation'],
  },
  {
    id: 'voltage-divider',
    slug: 'voltage-divider',
    name: 'Voltage Divider Calculator',
    category: 'Circuit Analysis' as any,
    description: 'Calculate unloaded and loaded output voltages, division ratios, and resistor power dissipation.',
    formula: 'V_out = V_in × (R2 / (R1 + R2))',
    iconName: 'Split',
    tags: ['Voltage Divider', 'Attenuation', 'Reference', 'Load Effect'],
  },
  {
    id: 'rc-rl-circuit',
    slug: 'rc-rl-circuit',
    name: 'RC & RL Filter Calculator',
    category: 'Signals & RF',
    description: 'Compute cutoff frequency (-3dB), time constant (τ), and transient step settling times for RC/RL networks.',
    formula: 'f_c = 1 / (2πRC) | τ = R × C | f_c = R / (2πL)',
    iconName: 'Activity',
    tags: ['Cutoff Frequency', 'Filter', 'Time Constant', 'Transient'],
  },
  {
    id: 'pcb-trace-width',
    slug: 'pcb-trace-width',
    name: 'PCB Trace Width Calculator',
    category: 'PCB Design',
    description: 'IPC-2221 standard conductor width for current carrying capacity and IPC-2141 microstrip impedance.',
    formula: 'I = k × ΔT^0.44 × A^0.725 | Z_0 Microstrip',
    iconName: 'Cpu',
    tags: ['IPC-2221', 'Trace Width', 'Impedance', 'Copper Weight', 'Ampacity'],
  },
  {
    id: 'battery-runtime',
    slug: 'battery-runtime',
    name: 'Battery Runtime Calculator',
    category: 'Power & Energy',
    description: 'Estimate operating duration in hours and days based on battery mAh, average load, and chemistry efficiency.',
    formula: 'Runtime = (Capacity_mAh × Efficiency) / Load_mA',
    iconName: 'BatteryCharging',
    tags: ['Battery', 'IoT', 'Power Budget', 'Runtime', 'mAh'],
  },
  {
    id: 'solar-sizing',
    slug: 'solar-sizing',
    name: 'Solar Panel Sizing Calculator',
    category: 'Power & Energy',
    description: 'Size solar photovoltaic wattage and battery bank capacity for off-grid IoT and embedded installations.',
    formula: 'Watts = Daily_Wh / (Peak_Sun_Hours × Efficiency)',
    iconName: 'Sun',
    tags: ['Solar PV', 'Renewable', 'Off-Grid', 'Battery Bank', 'MPPT'],
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'article-1',
    slug: 'top-electronics-companies-in-india',
    title: 'Top Electronics Companies in India: Leading the ESDM Revolution',
    category: 'Industry',
    excerpt: 'An extensive breakdown of India’s top electronic system design and manufacturing (ESDM) pioneers including BEL, Dixon, Kaynes, and Syrma SGS.',
    publishedAt: '2026-10-24',
    readingTime: '8 min read',
    author: 'Tushar Chand Gupta',
    coverImage: '/assets/images/project-iot.jpg',
    tags: ['India ESDM', 'Electronics Manufacturing', 'BEL', 'Dixon', 'Embedded'],
    status: 'published',
    content: `India is rapidly emerging as a global powerhouse in Electronic System Design and Manufacturing (ESDM), supported by the Modified Special Incentive Package Scheme (M-SIPS), Production Linked Incentives (PLI), and the Scheme for Promotion of Manufacturing of Electronic Components and Semiconductors (SPECS).

### 1. Bharat Electronics Limited (BEL)
A Navratna PSU under the Ministry of Defence, BEL manufactures state-of-the-art radar systems, sonar, electronic warfare suites, avionics, and high-reliability defense communications. BEL demonstrates how rigorous MIL-STD environmental testing and high-density multi-layer PCB design are executed at scale.

### 2. Dixon Technologies (India) Ltd.
Headquartered in Noida, Dixon is one of the largest electronic manufacturing services (EMS) providers in India. They produce consumer electronics, mobile phones, lighting solutions, and security surveillance systems. Dixon's high-speed Surface Mount Technology (SMT) lines illustrate modern automated pick-and-place efficiency.

### 3. Kaynes Technology India Limited
Based in Mysuru, Kaynes specializes in conceptual design, PCB assembly, box-build, and cable harness manufacturing for aerospace, railway signaling, automotive, and medical diagnostics. Their focus on IPC Class 3 high-reliability manufacturing makes them a prime benchmark for young hardware engineers.

### 4. Tata Elxsi & Syrma SGS
Tata Elxsi excels in silicon design, embedded software architecture, and automotive AUTOSAR integration. Syrma SGS operates state-of-the-art SMT lines in Chennai and Gurugram, manufacturing RFID tags, electromagnetic coils, and IoT sensor modules.

### Key Takeaways for Students & Engineers
Engineering students aiming for careers in Indian ESDM should focus on:
- Schematic capture and PCB layout in Altium or KiCad.
- Understanding Design for Manufacturing (DFM) and Design for Assembly (DFA).
- Signal Integrity (SI) and Power Integrity (PI) fundamentals.
- Firmware bring-up using C/C++ on ARM Cortex-M and RISC-V architectures.`,
  },
  {
    id: 'article-2',
    slug: 'best-pcb-designers-in-india',
    title: 'Best PCB Designers in India: Engineering High-Speed Silicon & Precision Boards',
    category: 'PCB Design',
    excerpt: 'A comprehensive guide to top PCB design consultancies, freelance IPC-certified masters, and design bureaus across Bengaluru, Pune, Hyderabad, and Delhi-NCR.',
    publishedAt: '2026-10-28',
    readingTime: '7 min read',
    author: 'Tushar Chand Gupta',
    coverImage: '/assets/images/hero-pcb.jpg',
    tags: ['PCB Design', 'High Speed', 'Signal Integrity', 'Altium', 'India'],
    status: 'published',
    content: `Printed Circuit Board (PCB) design has transcended traditional point-to-point copper routing. Modern systems demand controlled impedance, differential skew matching under 0.2 picoseconds, power distribution network (PDN) impedance optimization, and thermal relief modeling.

### High-Speed PCB Design Hubs in India
- **Bengaluru (Karnataka):** The silicon capital hosts global design centers and boutique engineering consultancies working on multi-gigabit PCIe Gen4/Gen5 carriers, DDR4/DDR5 fly-by topologies, and satellite transponders.
- **Hyderabad (Telangana):** Known for aerospace and defense hardware layout, missile guidance computers, and RF microwave radar substrates.
- **Pune (Maharashtra):** Automotive PCB powerhouses designing heavy-copper motor inverters, Battery Management Systems (BMS), and ISO 26262 functional safety hardware.
- **Noida / Delhi-NCR:** Rapid prototyping hubs, telecommunications base stations, and consumer IoT design bureaus.

### What Distinguishes Top PCB Designers?
1. **IPC-CID / CID+ Certification:** Mastery of IPC-2221 (generic design), IPC-7351 (SMD footprints), and IPC-6012 (qualification of rigid boards).
2. **3D Electromagnetic Simulation:** Ability to run full-wave 3D solvers like ANSYS HFSS or CST Microwave Studio to inspect return path discontinuties and via stubs.
3. **Power Integrity Analysis:** Simulating IR-drop and DC plane resistance to ensure sub-1.0V high-current core rails (e.g. 0.85V @ 60A) remain within ±1% ripple.

In the PCB Design Centre section of this platform, explore our curated tutorials on layer stackup calculations, differential trace routing, and Gerber/BOM generation rules.`,
  },
  {
    id: 'article-3',
    slug: 'getting-started-with-esp32-a-complete-guide',
    title: 'Getting Started with ESP32: A Complete Guide for Embedded IoT Developers',
    category: 'Embedded Systems',
    excerpt: 'Master the Espressif ESP32 dual-core Xtensa processor: architecture, FreeRTOS multi-threading, pinout caveats, Wi-Fi/BLE provisioning, and ultra-low power modes.',
    publishedAt: '2026-11-01',
    readingTime: '10 min read',
    author: 'Tushar Chand Gupta',
    coverImage: '/assets/images/project-iot.jpg',
    tags: ['ESP32', 'FreeRTOS', 'IoT', 'Embedded C', 'Hardware'],
    status: 'published',
    content: `The ESP32 from Espressif Systems has revolutionized IoT and embedded hardware prototyping. Packing dual 32-bit Xtensa LX6 microprocessors running up to 240 MHz, integrated 2.4 GHz Wi-Fi and Bluetooth 4.2 / BLE, it delivers unprecedented computing power at consumer price points.

### 1. Architectural Highlights
- **Dual Core:** Core 0 (Protocol CPU - handles Wi-Fi/BLE stacks) and Core 1 (Application CPU - executes user tasks).
- **Memory:** 520 KB internal SRAM, typically accompanied by 4 MB to 16 MB external SPI Flash.
- **Peripherals:** 12-bit SAR ADC, 2-channel 8-bit DAC, capacitive touch sensors, UART, SPI, I2C, I2S, PWM, and CAN 2.0B (TWAI).

### 2. Critical Pinout Gotchas & Strapping Pins
Many beginners struggle with board bootloops caused by strapping pins:
- **GPIO 0:** Must be HIGH for normal boot; pulled LOW to enter UART download flashing mode.
- **GPIO 2:** Connected to on-board LED on many DevKits; must be left floating or pulled low during boot.
- **GPIO 12 (MTDI):** Controls flash voltage (3.3V vs 1.8V). Pulling it HIGH at boot can cause brownouts.
- **ADC2 Limitation:** ADC2 channels (GPIOs 0, 2, 4, 12, 13, 14, 15, 25, 26, 27) CANNOT be read when Wi-Fi is actively transmitting. Always use ADC1 pins (GPIOs 32-39) for analog sensors!

### 3. Harnessing FreeRTOS Multi-Threading
In ESP-IDF or Arduino-ESP32, you can pin tasks to specific cores using \`xTaskCreatePinnedToCore()\`:

\`\`\`c
void sensorTask(void *pvParameters) {
  while(1) {
    readSensors();
    vTaskDelay(pdMS_TO_TICKS(100));
  }
}

void setup() {
  xTaskCreatePinnedToCore(sensorTask, "Sensors", 4096, NULL, 1, NULL, 1);
}
\`\`\`

Explore our interactive Hardware Wiki for ESP32 pinout maps and code templates.`,
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'project-energy-management',
    slug: 'ai-smart-energy-management',
    title: 'AI-Powered Smart Energy Management System',
    category: 'Automation & AI',
    description: 'Edge-AI non-intrusive load monitoring (NILM) platform using current transformers and neural networks to classify household appliance power consumption in real time.',
    image: '/assets/images/project-iot.jpg',
    technologies: ['STM32G4', 'Edge Impulse', 'SCT-013 CT Sensors', 'FreeRTOS', 'MQTT', 'TensorFlow Lite'],
    specs: [
      { label: 'Sampling Rate', value: '10 kHz Continuous Voltage/Current' },
      { label: 'Neural Model', value: '1D-CNN Appliance Classifier' },
      { label: 'Inference Time', value: '14.2 ms on Cortex-M4F' },
      { label: 'Accuracy', value: '94.6% F1-Score across 6 loads' },
    ],
    features: [
      'Non-invasive current transformer clamp measurement.',
      'Active, reactive, and apparent power calculation with power factor estimation.',
      'On-device anomaly detection for motor bearing faults and excessive line harmonics.',
      'Encrypted telemetry upload to web dashboard via MQTT over TLS.',
    ],
    githubUrl: 'https://github.com/Tusharchandgupta',
    status: 'published',
  },
  {
    id: 'project-weather-station',
    slug: 'iot-weather-monitoring-station',
    title: 'IoT Solar-Powered Weather Monitoring Station',
    category: 'Embedded & IoT',
    description: 'Ruggedized environmental monitoring node measuring ambient temperature, humidity, atmospheric barometric pressure, UV index, wind speed, and rainfall metrics.',
    image: '/assets/images/project-iot.jpg',
    technologies: ['ESP32', 'BME280', 'Anemometer', 'Tipping Bucket', 'Solar MPPT', 'Deep Sleep'],
    specs: [
      { label: 'Standby Current', value: '18 µA Deep Sleep' },
      { label: 'Battery Backup', value: '3400 mAh 18650 LiFePO4' },
      { label: 'Solar Input', value: '5W 6V Monocrystalline Panel' },
      { label: 'Telemetry', value: 'Wi-Fi 802.11 b/g/n + ESP-NOW' },
    ],
    features: [
      'Low-power sensor polling every 5 minutes with automatic deep-sleep cycling.',
      'Integrated MPPT battery charge management circuit with over-discharge protection.',
      'Enclosure IP65 waterproof rated with 3D-printed Stevenson screen radiation shield.',
      'Real-time data visualization via Grafana dashboard.',
    ],
    githubUrl: 'https://github.com/Tusharchandgupta',
    status: 'published',
  },
  {
    id: 'project-load-balancer',
    slug: 'three-phase-load-balancer',
    title: 'Automatic Three-Phase Load Balancer',
    category: 'Power Electronics',
    description: 'Intelligent solid-state phase balancing unit for commercial distributions, dynamically redistributing single-phase branch loads across R, Y, and B phases to minimize neutral current.',
    image: '/assets/images/project-gan.jpg',
    technologies: ['Microchip PIC18F', 'Zero-Crossing SSRs', 'Current Transformers', 'Power Factor Correction', 'LCD Display'],
    specs: [
      { label: 'Phase Rating', value: '415V AC Three-Phase 50Hz' },
      { label: 'Max Load per Phase', value: '32A Continuous' },
      { label: 'Neutral Reduction', value: 'Up to 78% Neutral Current Drop' },
      { label: 'Switching Transient', value: '< 10 ms Zero-Cross Transfer' },
    ],
    features: [
      'Simultaneous 3-phase RMS current and voltage monitoring.',
      'Zero-crossing triac/SSR switching to eliminate inductive arcing and voltage spikes.',
      'Automated phase re-assignment algorithm executing every 30 seconds.',
      'Audible alarm and thermal trip protection for over-current conditions.',
    ],
    githubUrl: 'https://github.com/Tusharchandgupta',
    status: 'published',
  },
  {
    id: 'project-gps-tracker',
    slug: 'gps-tracking-system',
    title: 'High-Precision Real-Time GPS Tracking System',
    category: 'Embedded & IoT',
    description: 'Compact vehicle telematics unit with multi-constellation GNSS positioning, 4G LTE Cat-1 cellular fallback, on-board inertial accelerometer crash detection, and geofencing.',
    image: '/assets/images/hero-pcb.jpg',
    technologies: ['u-blox NEO-M8N', 'Quectel EC200U 4G', 'STM32F4', 'LIS3DH Accelerometer', 'LiPo Charger'],
    specs: [
      { label: 'Position Accuracy', value: '1.5 m CEP with SBAS' },
      { label: 'Update Rate', value: 'Up to 10 Hz Navigation Fix' },
      { label: 'Cellular Band', value: '4G LTE FDD/TDD Bands 1/3/5/8' },
      { label: 'Power Input', value: '9V - 36V Automotive Transient Clamp' },
    ],
    features: [
      'Multi-constellation reception: GPS, GLONASS, BeiDou, and Galileo.',
      'Internal buffer storage on SPI NOR flash when cellular signal is absent.',
      'Configurable geofencing polygon boundaries with instant SMS and webhook alerts.',
      'Automated vehicle towing and impact detection via 3-axis accelerometer interrupts.',
    ],
    githubUrl: 'https://github.com/Tusharchandgupta',
    status: 'published',
  },
  {
    id: 'project-fpga-carrier',
    slug: 'ultracompute-x100-fpga',
    title: 'UltraCompute X100: Kintex UltraScale+ FPGA Carrier',
    category: 'High-Speed',
    description: '14-layer PCIe Gen4 hardware accelerator card with 4x 28Gbps QSFP28 cages, DDR4-3200 memory bus, and 0.85V @ 60A multiphase PMIC power stages.',
    image: '/assets/images/project-fpga.jpg',
    technologies: ['Kintex UltraScale+', 'Altium Designer', 'ANSYS HFSS', 'PCIe Gen4', 'DDR4 Fly-By'],
    specs: [
      { label: 'Layer Stack', value: '14-Layer Megtron-6 ENIG' },
      { label: 'High-Speed I/O', value: '4x QSFP28 (100 Gbps aggregate)' },
      { label: 'Core Power', value: '0.85V @ 60A Core Rail' },
      { label: 'Diff Impedance', value: '85Ω PCIe / 100Ω SerDes' },
    ],
    features: [
      'Differential length tuning skew < 0.2 ps within byte lanes.',
      'Target PDN impedance < 2.5 mΩ up to 500 MHz.',
      'Rigorous 3D EM via transition modeling to eliminate differential stub resonances.',
    ],
    githubUrl: 'https://github.com/Tusharchandgupta',
    status: 'published',
  },
  {
    id: 'project-gan-inverter',
    slug: 'gan-drive-servo-inverter',
    title: 'GaN-Drive: 48V/60A Brushless Servo Inverter',
    category: 'Power Electronics',
    description: 'High-power-density 3-phase motor driver featuring 650V GaN Systems E-HEMTs switching at 200kHz with isolated Kelvin gate loops and >98.4% efficiency.',
    image: '/assets/images/project-gan.jpg',
    technologies: ['GaN FETs', 'STM32G474', 'Kelvin Current Shunt', 'CAN-FD', 'Heavy Copper'],
    specs: [
      { label: 'Power Rating', value: '48V DC, 60A Continuous (3 kW)' },
      { label: 'Switching Freq', value: '200 kHz GaN PWM' },
      { label: 'Copper Weight', value: '4-Layer 3oz Heavy Copper' },
      { label: 'Telemetry', value: '5 Mbps CAN-FD Bus' },
    ],
    features: [
      'Parasitic commutation loop inductance reduced to < 1.2 nH.',
      'Four-terminal Kelvin shunt feedback into fast on-chip analog comparators.',
      'Hardware latch shutdown within 25 ns upon over-current detection.',
    ],
    githubUrl: 'https://github.com/Tusharchandgupta',
    status: 'published',
  },
];

export const INITIAL_WIKI: WikiEntry[] = [
  {
    id: 'wiki-esp32',
    slug: 'esp32',
    title: 'ESP32 Dual-Core Microcontroller System Architecture',
    category: 'Microcontrollers',
    summary: 'Comprehensive pinout, hardware peripherals, FreeRTOS core pinning, power management states, and RF layout requirements.',
    specifications: [
      { key: 'CPU Core', val: 'Xtensa Dual-Core 32-bit LX6 @ 240 MHz' },
      { key: 'SRAM', val: '520 KB Internal SRAM' },
      { key: 'Wireless', val: 'Wi-Fi 802.11 b/g/n + Bluetooth 4.2 / BLE' },
      { key: 'Operating Voltage', val: '3.0 V to 3.6 V (3.3V Nominal)' },
      { key: 'Deep Sleep Current', val: '10 µA (ULP coprocessor active)' },
    ],
    pinout: [
      { pin: 'GPIO 0', name: 'BOOT / ADC2_CH1', type: 'I/O Strapping', desc: 'Pulled high for boot; pull low to flash firmware.' },
      { pin: 'GPIO 2', name: 'IO2 / ADC2_CH2', type: 'I/O Strapping', desc: 'Must be low or floating during boot; on-board LED.' },
      { pin: 'GPIO 21', name: 'SDA', type: 'I/O', desc: 'Default Wire I2C Serial Data.' },
      { pin: 'GPIO 22', name: 'SCL', type: 'I/O', desc: 'Default Wire I2C Serial Clock.' },
      { pin: 'GPIO 34-39', name: 'GPI / ADC1', type: 'Input Only', desc: 'Input only pins without internal pull-up/pull-down.' },
    ],
    content: `The ESP32 is a low-cost, low-power system on a chip (SoC) series with Wi-Fi & dual-mode Bluetooth capabilities.

### Clock Tree & Power Domains
The ESP32 features five power modes:
1. **Active Mode:** Both CPU cores running, Wi-Fi and Bluetooth transmitters active (typically 80-240 mA).
2. **Modem-sleep:** CPU operational, Wi-Fi/BLE radio powered down.
3. **Light-sleep:** CPU paused, peripherals clock-gated. RTC memory active (~0.8 mA).
4. **Deep-sleep:** Main CPU powered off. Only RTC memory, RTC peripherals, and Ultra-Low-Power (ULP) co-processor are powered (~10-15 µA).
5. **Hibernation:** Entire chip powered down except a single RTC timer (~5 µA).`,
    sampleCode: `// ESP32 FreeRTOS Dual-Core Blink & Telemetry Example
void core0Task(void *pvParameters) {
  while (true) {
    Serial.println("Core 0 executing Wi-Fi handler...");
    vTaskDelay(pdMS_TO_TICKS(1000));
  }
}

void setup() {
  Serial.begin(115200);
  xTaskCreatePinnedToCore(core0Task, "Core0Worker", 2048, NULL, 1, NULL, 0);
}

void loop() {
  Serial.println("Core 1 executing main control loop.");
  delay(500);
}`,
  },
  {
    id: 'wiki-stm32f4',
    slug: 'stm32f4',
    title: 'STM32F401 ARM Cortex-M4 Microcontroller',
    category: 'Microcontrollers',
    summary: 'High-performance DSP instruction set, single-precision FPU, DMA controller, and advanced motor-control PWM timers.',
    specifications: [
      { key: 'Core Architecture', val: 'ARM 32-bit Cortex-M4 with FPU' },
      { key: 'Clock Speed', val: 'Up to 84 MHz (0-wait state flash)' },
      { key: 'Flash / RAM', val: 'Up to 512 KB Flash / 96 KB SRAM' },
      { key: 'Timers', val: '1x 32-bit, 4x 16-bit, advanced PWM' },
      { key: 'ADC', val: '12-bit 2.4 MSPS ADC with 16 channels' },
    ],
    content: `The STM32F401xB/xC family is based on the high-performance Arm Cortex-M4 32-bit RISC core operating at a frequency of up to 84 MHz. Its Cortex-M4 core features a Floating point unit (FPU) single precision which supports all Arm single-precision data-processing instructions and data types.`,
  },
  {
    id: 'wiki-i2c-protocol',
    slug: 'i2c-protocol',
    title: 'I²C (Inter-Integrated Circuit) Bus Protocol & Hardware Sizing',
    category: 'Communication Protocols',
    summary: 'Two-wire synchronous serial protocol: start/stop conditions, 7-bit addressing, pull-up resistor calculation, and bus capacitance limits.',
    specifications: [
      { key: 'Bus Lines', val: 'SDA (Serial Data), SCL (Serial Clock)' },
      { key: 'Standard Mode', val: '100 kHz maximum clock' },
      { key: 'Fast Mode', val: '400 kHz maximum clock' },
      { key: 'Fast Mode Plus', val: '1.0 MHz maximum clock' },
      { key: 'Max Bus Capacitance', val: '400 pF (Standard/Fast Mode)' },
    ],
    content: `I²C is an open-drain/open-collector bus architecture requiring external pull-up resistors to pull lines high when all devices release the bus.

### Pull-Up Resistor Calculation Formula
The maximum pull-up resistance is governed by the rise time ($t_r$) and total bus capacitance ($C_b$):
$$R_{p,max} = \\frac{t_r}{0.8473 \\times C_b}$$

For Fast Mode (400 kHz) with $t_r = 300\\text{ ns}$ and $C_b = 100\\text{ pF}$:
$$R_{p,max} = \\frac{300 \\times 10^{-9}}{0.8473 \\times 100 \\times 10^{-12}} \\approx 3.54\\text{ k}\\Omega$$
Hence, standard values between 2.2 kΩ and 4.7 kΩ are typically used.`,
  },
];

export const INITIAL_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'exp-oscilloscope',
    slug: 'virtual-oscilloscope',
    title: 'Interactive Digital Storage Oscilloscope (DSO)',
    category: 'Circuit Basics',
    objective: 'Analyze synthesized circuit waveforms, adjust horizontal timebase and vertical volts-per-division, and observe thermal noise and signal jitter.',
    theory: 'An oscilloscope plots electrical potential differences over time. Digital storage oscilloscopes sample the incoming analog voltage via high-speed ADC and reconstruct the signal on screen.',
    componentsNeeded: ['Tektronix/Rigol Hybrid 4-Channel DSO', 'BNC Coaxial Probes (10x attenuation)', 'Signal Generator'],
    procedure: [
      'Select a channel waveform: Sine Clock, GaN PWM, SPI Packet, or CAN-FD frame.',
      'Adjust the clock frequency slider from 1 MHz to 40 MHz.',
      'Vary the vertical scale (Volts/Div) to prevent ADC clipping or under-sampling.',
      'Introduce thermal noise & jitter to simulate EMI emissions and channel dispersion.',
      'Click FREEZE / STOP to capture a single trigger event for cursor measurement.',
    ],
    interactiveType: 'oscilloscope',
  },
  {
    id: 'exp-ohms-law',
    slug: 'ohms-law-verification',
    title: "Verification of Ohm's Law and V-I Characteristics",
    category: 'Circuit Basics',
    objective: 'Experimentally verify that current flowing through a conductor is directly proportional to the potential difference across it at constant temperature.',
    theory: "Ohm's Law states that V = I × R. The slope of the V vs I plot yields the constant ohmic resistance R.",
    componentsNeeded: ['DC Variable Power Supply (0-30V)', 'Digital Multimeter (Voltmeter)', 'Digital Ammeter (mA)', 'Precision Decade Resistance Box'],
    procedure: [
      'Connect the circuit loop with the DC supply, ammeter in series, and voltmeter across the load resistor.',
      'Set the resistor to 1000 Ω.',
      'Increase the voltage in 2V increments from 0V to 20V.',
      'Record current measurements and verify that I increases linearly with V.',
    ],
    interactiveType: 'ohms-law',
  },
  {
    id: 'exp-logic-gates',
    slug: 'digital-logic-gates',
    title: 'Digital Logic Gates & Combinational Truth Tables',
    category: 'Digital Electronics',
    objective: 'Construct and simulate fundamental logic gates (AND, OR, NOT, NAND, NOR, XOR) and observe outputs for all input combinations.',
    theory: 'Logic gates form the foundational building blocks of digital integrated circuits, executing Boolean algebraic operations based on high (1) and low (0) voltage levels.',
    componentsNeeded: ['7408 (Quad 2-Input AND)', '7432 (Quad 2-Input OR)', '7404 (Hex Inverter NOT)', '7400 (Quad NAND)', 'LED indicators', 'SPDT switches'],
    procedure: [
      'Toggle inputs A and B between logic 0 (0V) and logic 1 (+5V).',
      'Observe the output logic states on the virtual indicator LEDs.',
      'Verify De Morgan’s laws using NAND and NOR gates.',
    ],
    interactiveType: 'logic-gates',
  },
];

export const INITIAL_DIRECTORIES: DirectoryListing[] = [
  {
    id: 'dir-bel',
    name: 'Bharat Electronics Limited (BEL)',
    category: 'Electronics Companies',
    location: 'Bengaluru, Karnataka, India',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    description: 'Premier defense electronics PSU manufacturing radar, sonar, defense communication systems, avionics, and electronic voting machines.',
    specialization: ['Defense Electronics', 'Avionics', 'Radar Systems', 'High-Reliability PCBs'],
    website: 'https://bel-india.in',
    contactEmail: 'contact@bel-india.in',
    verified: true,
    status: 'approved',
    submittedAt: '2026-10-15',
  },
  {
    id: 'dir-dixon',
    name: 'Dixon Technologies (India) Ltd.',
    category: 'Electronics Companies',
    location: 'Noida, Uttar Pradesh, India',
    city: 'Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    description: 'Leading electronics manufacturing services (EMS) company producing mobile phones, LED televisions, lighting, home appliances, and CCTV cameras.',
    specialization: ['EMS', 'SMT Assembly', 'Consumer Electronics', 'High-Volume Production'],
    website: 'https://dixoninfo.com',
    verified: true,
    status: 'approved',
    submittedAt: '2026-10-18',
  },
  {
    id: 'dir-kaynes',
    name: 'Kaynes Technology India Limited',
    category: 'Electronics Companies',
    location: 'Mysuru, Karnataka, India',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    description: 'Integrated electronics manufacturer providing conceptual design, PCB assembly, box-build, and test engineering for aerospace, railways, and automotive.',
    specialization: ['Aerospace Electronics', 'Railway Signaling', 'Automotive PCBs', 'IPC Class 3'],
    website: 'https://kaynestechnology.net',
    verified: true,
    status: 'approved',
    submittedAt: '2026-10-20',
  },
  {
    id: 'dir-ats',
    name: 'AT&S India Pvt. Ltd.',
    category: 'PCB Manufacturers',
    location: 'Nanjangud, Mysuru, Karnataka, India',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    description: 'World-class manufacturer of high-end HDI (High-Density Interconnect) printed circuit boards and IC substrates for automotive and industrial sectors.',
    specialization: ['HDI Micro-vias', 'Multi-layer PCBs', 'Automotive Grade', 'Rigid-Flex'],
    website: 'https://ats.net',
    verified: true,
    status: 'approved',
    submittedAt: '2026-10-22',
  },
  {
    id: 'dir-shogini',
    name: 'Shogini Technoarts Pvt. Ltd.',
    category: 'PCB Manufacturers',
    location: 'Pune, Maharashtra, India',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    description: 'Certified manufacturer of professional single-sided, double-sided, and multi-layer PCBs up to 16 layers with quick-turn prototype service.',
    specialization: ['Multi-layer PCBs', 'Metal Core PCBs', 'Quick Turn Prototypes', 'UL Certified'],
    website: 'https://shogini.com',
    verified: true,
    status: 'approved',
    submittedAt: '2026-10-25',
  },
  {
    id: 'dir-element14',
    name: 'Element14 India (Farnell)',
    category: 'Component Distributors',
    location: 'Bengaluru, Karnataka, India',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    description: 'Authorized high-service distributor of electronic components, development kits, test instruments, and laboratory tooling.',
    specialization: ['Passives & Actives', 'Semiconductors', 'Test & Measurement', 'Same-day Shipping'],
    website: 'https://in.element14.com',
    verified: true,
    status: 'approved',
    submittedAt: '2026-10-28',
  },
];

export const INITIAL_DOWNLOADS: DownloadItem[] = [
  {
    id: 'dl-gate-notes',
    title: 'GATE ECE Comprehensive Quick-Revision Formula Sheet',
    category: 'GATE ECE',
    format: 'PDF',
    size: '4.8 MB',
    description: 'High-yield formula handbook covering Network Theory, Signals & Systems, Analog & Digital Circuits, Electronic Devices (EDC), and Electromagnetics.',
    downloadUrl: '#',
    license: 'Creative Commons CC BY-NC 4.0',
  },
  {
    id: 'dl-embedded-manual',
    title: 'Embedded Systems & ARM Cortex-M Laboratory Manual',
    category: 'Lab Manuals',
    format: 'PDF',
    size: '3.2 MB',
    description: 'Step-by-step hands-on experiments for GPIO, SysTick timers, UART interrupts, ADC DMA transfer, and FreeRTOS task scheduling.',
    downloadUrl: '#',
    license: 'Open Educational Resource (OER)',
  },
  {
    id: 'dl-esp32-pinout',
    title: 'ESP32 & STM32 Development Board Reference Pinout Card',
    category: 'Datasheets',
    format: 'PDF',
    size: '1.9 MB',
    description: 'High-resolution printable laminated cheat-sheet detailing strapping pins, ADC channels, I2C/SPI default mappings, and power rail tolerances.',
    downloadUrl: '#',
    license: 'Open Access',
  },
  {
    id: 'dl-pcb-checklist',
    title: 'Pre-Tapeout High-Speed PCB Design Review Checklist',
    category: 'Study Notes',
    format: 'PDF',
    size: '1.2 MB',
    description: 'Comprehensive 48-point checklist covering DFM/DFA checks, trace length-matching, return-path ground plane splits, thermal vias, and silkscreen clearances.',
    downloadUrl: '#',
    license: 'Open Engineering Guide',
  },
];

export const INITIAL_BOOKS: BookRecommendation[] = [
  {
    id: 'book-art-of-electronics',
    title: 'The Art of Electronics (3rd Edition)',
    author: 'Paul Horowitz & Winfield Hill',
    category: 'Circuit Design',
    level: 'Intermediate',
    description: 'Widely regarded as the bible of circuit design, combining intuitive real-world explanations with rigorous electronic design principles.',
    coverImage: '/assets/images/hero-pcb.jpg',
    link: 'https://artofelectronics.net',
  },
  {
    id: 'book-high-speed-digital',
    title: 'High-Speed Digital Design: A Handbook of Black Magic',
    author: 'Howard Johnson & Martin Graham',
    category: 'RF & High Speed',
    level: 'Advanced',
    description: 'Essential reading for multi-layer PCB designers tackling transmission lines, ground bounce, skin effect, and crosstalk in fast clock systems.',
    coverImage: '/assets/images/project-fpga.jpg',
    link: 'https://www.sigcon.com',
  },
  {
    id: 'book-sedra-smith',
    title: 'Microelectronic Circuits',
    author: 'Adel S. Sedra & Kenneth C. Smith',
    category: 'Semiconductor',
    level: 'Beginner',
    description: 'The premier textbook for understanding MOSFET physics, BJT amplifier configurations, frequency response, and integrated circuit op-amps.',
    coverImage: '/assets/images/hero-pcb.jpg',
    link: 'https://global.oup.com',
  },
  {
    id: 'book-valvano',
    title: 'Embedded Systems: Real-Time Interfacing to ARM Cortex-M',
    author: 'Jonathan W. Valvano',
    category: 'Embedded Systems',
    level: 'Intermediate',
    description: 'Superb pedagogical guide connecting hardware architecture, C programming, ADC/DAC interfacing, and real-time operating systems.',
    coverImage: '/assets/images/project-iot.jpg',
    link: 'http://users.ece.utexas.edu/~valvano/',
  },
];

