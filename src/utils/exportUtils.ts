import html2canvas from 'html2canvas';
import { ExportData } from '../types/data.types';

// Capture screenshot of the application
export async function captureScreenshot(): Promise<void> {
  try {
    const element = document.getElementById('root');
    if (!element) {
      throw new Error('Root element not found');
    }

    const canvas = await html2canvas(element, {
      backgroundColor: '#0F172A',
      scale: 2, // Higher resolution
      logging: false,
    });

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `OmaniMonia-Simulation-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Screenshot capture failed:', error);
    throw error;
  }
}

// Export data as CSV
export function exportDataAsCSV(data: ExportData): void {
  try {
    const rows: string[][] = [];

    // Header
    rows.push(['OmaniMonia - Ammonia Extraction Simulation']);
    rows.push([]);
    rows.push(['Session ID', data.sessionId]);
    rows.push(['Timestamp', new Date(data.timestamp).toLocaleString()]);
    rows.push(['Duration (seconds)', data.duration.toString()]);
    rows.push([]);

    // Parameters
    rows.push(['Parameters']);
    rows.push(['Voltage (V)', data.parameters.voltage.toString()]);
    rows.push(['Temperature (°C)', data.parameters.temperature.toString()]);
    rows.push(['pH', data.parameters.pH.toString()]);
    rows.push(['Flow Rate (L/h)', data.parameters.flowRate.toString()]);
    rows.push([]);

    // Metrics
    rows.push(['Final Metrics']);
    rows.push(['Energy Produced (kWh)', data.metrics.energyProduced.toString()]);
    rows.push(['Ammonia Extracted (L)', data.metrics.ammoniaExtracted.toString()]);
    rows.push(['Minerals Recovered (kg)', data.metrics.mineralsRecovered.toString()]);
    rows.push(['Efficiency (%)', data.metrics.efficiency.toString()]);
    rows.push(['CO2 Reduction (kg)', data.metrics.co2Reduction.toString()]);
    rows.push(['Water Recovered (L)', data.metrics.waterRecovered.toString()]);
    rows.push([]);

    // Sensor Readings
    rows.push(['Sensor Readings']);
    data.sensorReadings.forEach((sensor) => {
      rows.push([]);
      rows.push([`Sensor: ${sensor.sensorName} (${sensor.sensorId})`]);
      rows.push(['Timestamp', 'Value']);
      sensor.readings.forEach((reading) => {
        rows.push([
          new Date(reading.timestamp).toLocaleTimeString(),
          reading.value.toFixed(2),
        ]);
      });
    });

    // Convert to CSV string
    const csvContent = rows.map((row) => row.join(',')).join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `OmaniMonia-Data-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('CSV export failed:', error);
    throw error;
  }
}
