# Tushar Chand Gupta — Electronics Engineering Platform

A modern, professional, fully responsive electronics engineering platform combining a personal portfolio, virtual laboratory, engineering calculators, hardware wiki, PCB design resources, educational downloads, company directories, and technical blog.

**Live URL:** [https://tusharchandgupta.com](https://tusharchandgupta.com)  
**Brand:** Tushar Chand Gupta  
**Tagline:** Electronics Engineering · Projects · Learning

---

## 🚀 Features & Architecture

### 1. Interactive Homepage
- **Navigation Header:** Clean white navbar with orange electronics emblem, dropdowns for Tools, Resources, Directories, global search (Ctrl+K), and a distinct orange **Admin Login** button (no public user login).
- **Hero Section:** Two-column hero with verified engineering headlines, dual CTAs (*Explore Virtual Lab* and *Explore Tools*), and high-resolution laboratory instrumentation visuals.
- **Resource Categories:** 7 compact cards (*Virtual Lab, Engineering Tools, Hardware Wiki, PCB & Design, Downloads, Books, Directories*).
- **About Me:** Verified profile card with bio, skills, and links to projects.
- **Latest Articles:** Technical deep dives into Indian ESDM pioneers, high-speed PCB design consultancies, and ESP32 architecture.
- **Featured Engineering Tools:** Direct access to 8 working CAD & circuit calculators.
- **Featured Projects:** Production board designs including Edge-AI Energy Management, IoT Weather Stations, 3-Phase Load Balancer, and GPS Vehicle Tracking.
- **Platform Overview Strip:** Compact summary strip (*Learn, Design, Explore, Discover, Read, Download, Build*).
- **Newsletter Subscription:** Validated email subscription with real-time feedback.
- **Dark Navy Footer:** Complete directory links, copyright, and verified contact channels.

### 2. Virtual Laboratory (`/virtual-lab`)
- **Digital Storage Oscilloscope (DSO):** Live interactive canvas bench oscilloscope with Sine Clock, GaN PWM, SPI, and CAN-FD signal generators, clock frequency tuning (1–40 MHz), vertical V/div scaling, thermal noise/jitter injection, and STOP/RUN freeze triggers.
- **Digital Logic Gates Simulator:** Real-time simulation of AND, OR, NOT, NAND, NOR, XOR, XNOR gates with interactive input switches and live truth table row highlighting.
- **Ohm's Law Circuit Loop:** Interactive DC supply voltage and decade resistance box with real-time Voltmeter, Ammeter, and Wattmeter readouts.
- **Guided Lab Manuals:** AICTE/IEEE aligned curriculum experiments with objectives, circuit diagrams, procedures, and calculations.

### 3. Engineering Calculators (`/tools` & `/tools/:slug`)
All calculators feature mathematically verified formulas, input validation, and unit conversions:
1. **Ohm’s Law Calculator:** Computes any two parameters from Voltage, Current, Resistance, and Power.
2. **Resistor Colour Code Calculator:** 4-band and 5-band interactive band picker with live resistor body visualization and nearest E24 standard matching.
3. **LED Series Resistor Calculator:** Calculates exact resistance, recommended E24 value, power dissipation, and minimum wattage rating (0.25W, 0.5W, 1W).
4. **Voltage Divider Calculator:** Computes output voltage, division ratio, total current, and loaded divider effects.
5. **RC & RL Circuit Calculator:** -3dB cutoff frequency ($f_c$), time constant ($\tau$), and 99% step settling times.
6. **PCB Trace Width (IPC-2221):** Conductor width for target current and temperature rise, plus IPC-2141 microstrip characteristic impedance ($Z_0$).
7. **Battery Runtime Calculator:** Operating duration in hours and days accounting for battery capacity (mAh), average load, and chemistry efficiency derating.
8. **Solar Panel Sizing Calculator:** Photovoltaic array wattage and battery bank capacity for off-grid IoT nodes.

### 4. Hardware Wiki (`/wiki` & `/wiki/:slug`)
Searchable documentation for ESP32, STM32 Cortex-M4, I²C bus protocols, pinouts, strapping pins, deep sleep power domains, and driver code snippets.

### 5. PCB Design Centre (`/pcb-design`)
- Interactive 12-layer high-speed cross-section stackup visualizer with Megtron-6 dielectric, 1 oz copper, and ENIG plating details.
- Design for Manufacturing (DFM) and Design for Assembly (DFA) rules.
- High-speed differential pair routing and return-path plane split checklists.

### 6. Electronics Directories (`/directories`)
- Searchable directory of Indian electronics companies (BEL, Dixon, Kaynes), PCB manufacturers (AT&S, Shogini), PCB designers, and component distributors (Element14).
- Public submission modal with validation; submissions enter the admin moderation queue as `pending` until approved.

### 7. Downloads & Books (`/downloads` & `/books`)
- GATE ECE formula revision sheet, Embedded systems lab manuals, and PCB review checklists.
- Recommended engineering textbooks (*The Art of Electronics*, *High-Speed Digital Design*, *Microelectronic Circuits*, *Embedded Systems*).

### 8. Protected Admin Dashboard (`/admin`)
- Secure login and initial provisioning system with setup secret key.
- Real-time overview metrics.
- Article CMS (create, edit, draft/publish, delete).
- Project CMS (create, edit, delete).
- Directory Submissions Moderation (approve, reject, delete).
- Contact Messages Inbox (read messages, mark read).
- Newsletter Subscribers management and CSV export.
- Security Audit Trail with chronological event logging.

---

## 🛠️ Technology Stack

- **Frontend:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Data & Auth:** LocalStorage persistence with Firebase Auth / Firestore integration points
- **Deployment:** Netlify with SPA redirects (`netlify.toml`)

---

## 💻 Local Development & Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Automated Tests
Runs unit tests verifying mathematical correctness for all engineering calculators:
```bash
npm test
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Build for Production
```bash
npm run build
```
Build output is generated in the `dist/` directory.

---

## 🔐 Admin Authentication Credentials

- **Admin Login Route:** `/admin` or `/admin/login`
- **Default Master Username:** `admin` or `tushar@tusharchandgupta.com`
- **Default Password:** `admin`
- **Provisioning Setup Secret:** `TCG-ADMIN-2026-SETUP` (can be configured via `VITE_ADMIN_PROVISION_KEY`)

---

## 🌐 Netlify Deployment

The project is pre-configured with `netlify.toml`:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
Simply connect the repository to Netlify or push to GitHub to trigger continuous deployment.

