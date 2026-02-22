/**
 * Step 1: Base Water Requirement (mm/week)
 * Step 2: Adjust using Soil Retention (AdjustedWater = BaseWater × SoilFactor)
 * Step 3: Adjust using Irrigation Efficiency (FinalWater = AdjustedWater / IrrigationEfficiency)
 * Step 4: Rain Adjustment (If rainfall forecast > threshold: Reduce irrigation by % value)
 */

export const calculateIrrigation = (farmerData, rainForecast = 0) => {
    const { crop, soil, landSize, irrigation } = farmerData;

    // Mock data as per spec
    const crops = {
        cotton: { base: 25, unit: 'mm/week' },
        wheat: { base: 20, unit: 'mm/week' },
        rice: { base: 50, unit: 'mm/week' },
        sugarcane: { base: 45, unit: 'mm/week' }
    };

    const soils = {
        black: 0.85, // High retention
        red: 1.0,    // Standard
        sandy: 1.2    // Low retention
    };

    const irrigationTypes = {
        drip: 0.95,   // High efficiency
        sprinkler: 0.75,
        flood: 0.5    // Low efficiency
    };

    const baseWater = crops[crop]?.base || 30;
    const soilFactor = soils[soil] || 1.0;
    const efficiencyFactor = irrigationTypes[irrigation] || 1.0;

    let adjustedWater = baseWater * soilFactor;
    let finalWaterMm = adjustedWater / efficiencyFactor;

    // Rain adjustment: If rain > 20mm, reduce by 50%
    if (rainForecast > 20) {
        finalWaterMm *= 0.5;
    } else if (rainForecast > 5) {
        finalWaterMm *= 0.8;
    }

    // Convert mm/week to liters/week for the whole land
    // 1 mm on 1 acre = 4046.86 liters
    const litersPerWeek = finalWaterMm * landSize * 4046.86;

    return {
        litersPerWeek: Math.round(litersPerWeek),
        mmPerWeek: Math.round(finalWaterMm),
        schedule: ['Monday', 'Thursday'],
        advice: rainForecast > 20 ? "Significant rain expected. Postpone manual irrigation." : "Irrigate as per schedule for optimal growth."
    };
};
