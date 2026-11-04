/**
 * Mathematical Verification Test Suite for Engineering Calculators
 */
import {
  calculateOhmsLaw,
  calculateResistorFrom4Bands,
  calculateResistorFrom5Bands,
  calculateLedResistor,
  calculateVoltageDivider,
  calculateRcRl,
  calculatePcbTrace,
  calculateBatteryRuntime,
  calculateSolarSizing,
  findNearestE24,
} from '../src/utils/calculators.ts';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

function runTests() {
  console.log('\n--- 1. Testing Ohm’s Law Calculator ---');
  const ohm1 = calculateOhmsLaw({ voltage: 12, current: 0.05 });
  assert(ohm1.resistance === 240, `V=12V, I=0.05A => R=${ohm1.resistance} (expected 240)`);
  assert(ohm1.power === 0.6, `V=12V, I=0.05A => P=${ohm1.power}W (expected 0.6)`);

  const ohm2 = calculateOhmsLaw({ resistance: 100, power: 4 });
  assert(ohm2.voltage === 20, `R=100Ω, P=4W => V=${ohm2.voltage}V (expected 20)`);
  assert(ohm2.current === 0.2, `R=100Ω, P=4W => I=${ohm2.current}A (expected 0.2)`);

  console.log('\n--- 2. Testing Resistor Color Code ---');
  const res4 = calculateResistorFrom4Bands('brown', 'black', 'red', 'gold');
  assert(res4.resistance === 1000, `Brown-Black-Red-Gold => ${res4.resistance}Ω (expected 1000Ω)`);
  assert(res4.tolerancePercent === 5, `Tolerance => ±${res4.tolerancePercent}% (expected ±5%)`);

  const res5 = calculateResistorFrom5Bands('brown', 'black', 'black', 'red', 'brown');
  assert(res5.resistance === 10000, `Brown-Black-Black-Red-Brown => ${res5.resistance}Ω (expected 10kΩ)`);
  assert(res5.tolerancePercent === 1, `Tolerance => ±${res5.tolerancePercent}% (expected ±1%)`);

  assert(findNearestE24(147) === 150, `Nearest E24 for 147Ω => ${findNearestE24(147)}Ω (expected 150Ω)`);
  assert(findNearestE24(4650) === 4700, `Nearest E24 for 4650Ω => ${findNearestE24(4650)}Ω (expected 4700Ω)`);

  console.log('\n--- 3. Testing LED Series Resistor Calculator ---');
  const led = calculateLedResistor({ supplyVoltage: 5.0, forwardVoltage: 2.0, forwardCurrentmA: 20 });
  assert(led.resistance === 150, `Vs=5V, Vf=2V, If=20mA => R=${led.resistance}Ω (expected 150Ω)`);
  assert(led.nearestE24 === 150, `Nearest E24 => ${led.nearestE24}Ω`);
  assert(led.powerWatts === 0.06, `Power => ${led.powerWatts}W (expected 0.06W)`);

  console.log('\n--- 4. Testing Voltage Divider Calculator ---');
  const div1 = calculateVoltageDivider({ vin: 12, r1: 10000, r2: 10000 });
  assert(div1.vout === 6, `Vin=12V, R1=10k, R2=10k => Vout=${div1.vout}V (expected 6V)`);
  assert(div1.ratio === 0.5, `Ratio => ${div1.ratio} (expected 0.5)`);

  const divLoaded = calculateVoltageDivider({ vin: 12, r1: 10000, r2: 10000, loadR: 10000 });
  // R2 || RL = 5k. Total R = 15k. Vout = 12 * (5/15) = 4V
  assert(divLoaded.vout === 4, `Loaded divider with RL=10k => Vout=${divLoaded.vout}V (expected 4V)`);

  console.log('\n--- 5. Testing RC & RL Filter Calculator ---');
  const rc = calculateRcRl({ type: 'RC', resistance: 1000, capacitanceUf: 0.1 });
  // fc = 1 / (2 * pi * 1000 * 1e-7) ≈ 1591.55 Hz
  assert(Math.abs(rc.cutoffFreqHz - 1591.55) < 1.0, `RC fc = ${rc.cutoffFreqHz} Hz (expected ~1591.55 Hz)`);
  assert(rc.timeConstantSec === 0.0001, `tau = ${rc.timeConstantSec} s (expected 0.0001 s)`);

  const rl = calculateRcRl({ type: 'RL', resistance: 100, inductanceMh: 10 });
  // fc = R / (2 * pi * L) = 100 / (2 * pi * 0.01) ≈ 1591.55 Hz
  assert(Math.abs(rl.cutoffFreqHz - 1591.55) < 1.0, `RL fc = ${rl.cutoffFreqHz} Hz (expected ~1591.55 Hz)`);

  console.log('\n--- 6. Testing PCB Trace Width (IPC-2221) ---');
  const trace = calculatePcbTrace({ currentA: 2.5, tempRiseC: 10, copperWeightOz: 1.0, isExternal: true });
  assert(trace.traceWidthMils > 0, `External trace width = ${trace.traceWidthMils} mils`);
  assert(trace.traceWidthMm > 0, `External trace width = ${trace.traceWidthMm} mm`);
  assert(trace.microstripImpedanceZ0! >= 10, `Z0 = ${trace.microstripImpedanceZ0} Ω (clamped low for heavy power trace)`);

  const rfTrace = calculatePcbTrace({ currentA: 0.5, tempRiseC: 10, copperWeightOz: 1.0, isExternal: true, dielectricHeightMils: 6, dielectricConstantEr: 4.2 });
  assert(rfTrace.microstripImpedanceZ0! > 40, `Low-current trace Z0 = ${rfTrace.microstripImpedanceZ0} Ω`);

  console.log('\n--- 7. Testing Battery Runtime Calculator ---');
  const bat = calculateBatteryRuntime({ capacityMah: 2600, loadCurrentMa: 45, batteryChemistryEfficiency: 0.85 });
  // Effective = 2600 * 0.85 = 2210 mAh. Runtime = 2210 / 45 = 49.11 hours
  assert(bat.runtimeHours === 49.11, `Runtime = ${bat.runtimeHours} hours (expected 49.11)`);
  assert(bat.runtimeDays === 2.05, `Days = ${bat.runtimeDays} days (expected 2.05)`);

  console.log('\n--- 8. Testing Solar Sizing Calculator ---');
  const solar = calculateSolarSizing({ dailyEnergyWh: 1200, peakSunHours: 5.0, systemEfficiency: 0.75 });
  // Required = 1200 / (5 * 0.75) = 320 W
  assert(solar.requiredPanelWattageW === 320, `Required panel wattage = ${solar.requiredPanelWattageW}W (expected 320W)`);
  assert(solar.recommendedPanels100W === 4, `100W panels needed = ${solar.recommendedPanels100W} (expected 4)`);

  console.log(`\n========================================`);
  console.log(`TEST RESULTS: ${passed} passed, ${failed} failed`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

runTests();
