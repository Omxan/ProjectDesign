export function calculateAirflow(length, width, height, ach) {
    const area = length * width;
    const volume = area * height;
    const volumeFt3 = volume * 35.3147; 
    const requiredCFM = (volumeFt3 * ach) / 60; 
    const purificationTime = 60 / ach; 
  
    return { area, volume, requiredCFM, purificationTime };
  }
  