/**
 * Hardware Engineering Calculator
 * Microstrip Characteristic Impedance (IPC-2141) & Trace Current Capacity (IPC-2221)
 */

(function () {
  const widthInput = document.getElementById('calcTraceWidth');
  const heightInput = document.getElementById('calcDielectricHeight');
  const erInput = document.getElementById('calcEr');
  const copperSelect = document.getElementById('calcCopperWeight');

  const z0Display = document.getElementById('calcResultZ0');
  const delayDisplay = document.getElementById('calcResultDelay');
  const currentDisplay = document.getElementById('calcResultCurrent');
  const resDisplay = document.getElementById('calcResultResistance');

  function calculate() {
    if (!widthInput || !heightInput || !erInput || !copperSelect) return;

    // Inputs (values in mils)
    const w = parseFloat(widthInput.value) || 10; // trace width in mils
    const h = parseFloat(heightInput.value) || 6;  // dielectric height in mils
    const er = parseFloat(erInput.value) || 4.2;   // dielectric constant (FR-4 ~ 4.2)
    const copperOz = parseFloat(copperSelect.value) || 1.0; // 1oz = 1.37 mils (35 um)
    const t = copperOz * 1.37; // copper thickness in mils

    // 1. IPC-2141 Microstrip Characteristic Impedance Z0 (Ohms)
    // Formula: Z0 = (87 / sqrt(er + 1.41)) * ln((5.98 * h) / (0.8 * w + t))
    const num = 87 / Math.sqrt(er + 1.41);
    const denomArg = (5.98 * h) / (0.8 * w + t);
    let z0 = num * Math.log(denomArg);
    if (isNaN(z0) || z0 < 10) z0 = 50.0;

    // 2. Propagation Delay t_pd (ps/inch)
    // Formula: t_pd = 84.72 * sqrt(0.475 * er + 0.67) ps/inch
    const delayPsPerInch = 84.72 * Math.sqrt(0.475 * er + 0.67);

    // 3. Current Capacity for 10 deg C rise (IPC-2221 External Trace)
    // I = 0.048 * (dT^0.44) * (Area_sq_mils ^ 0.725)
    const areaSqMils = w * t;
    const deltaT = 10; // 10 deg C temp rise
    const maxCurrentAmps = 0.048 * Math.pow(deltaT, 0.44) * Math.pow(areaSqMils, 0.725);

    // 4. DC Resistance per 1 inch trace (Ohms/inch)
    // Copper resistivity: 1.724e-6 ohm-cm = 0.6787 uOhm-inch
    // R = rho * L / Area
    const resPerInchMilliOhms = (0.6787 * 1000) / (w * t);

    // Render displays
    if (z0Display) z0Display.textContent = `${z0.toFixed(1)} Ω`;
    if (delayDisplay) delayDisplay.textContent = `${delayPsPerInch.toFixed(0)} ps/in`;
    if (currentDisplay) currentDisplay.textContent = `${maxCurrentAmps.toFixed(2)} A`;
    if (resDisplay) resDisplay.textContent = `${resPerInchMilliOhms.toFixed(1)} mΩ/in`;
  }

  const inputs = [widthInput, heightInput, erInput, copperSelect];
  inputs.forEach((input) => {
    if (input) {
      input.addEventListener('input', calculate);
      input.addEventListener('change', calculate);
    }
  });

  document.addEventListener('DOMContentLoaded', calculate);
})();
