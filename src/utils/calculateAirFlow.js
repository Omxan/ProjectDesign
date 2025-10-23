// src/utils/calculateAirflow.js
export function calculateAirflow(length, width, height, ach) {
    const area = length * width;
    const volume = area * height;
    const volumeFt3 = volume * 35.3147; // convert cubic meters to cubic feet
    const requiredCFM = (volumeFt3 * ach) / 60; // airflow rate in CFM
    const purificationTime = 60 / ach; // minutes
  
    return { area, volume, requiredCFM, purificationTime };
  }
  