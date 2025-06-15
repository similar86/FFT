import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale
  } from 'chart.js';
  import { FFT } from './src/FFT/FFT';
  
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
  
  let chart: Chart | null = null;
  
  function parseInput(input: string): number[] {
    return input.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
  }
  
  function updateChart(data: number[]) {
    const labels = data.map((_, i) => i);
  
    const config = {
      type: 'line' as const,
      data: {
        labels,
        datasets: [{
          label: 'FFT 振幅スペクトル',
          data,
          borderColor: 'blue',
          fill: false
        }]
      }
    };
  
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
  
    if (chart) {
      chart.destroy();
    }
  
    chart = new Chart(canvas, config);
  }
  
  window.onload = () => {
    const btn = document.getElementById('runBtn') as HTMLButtonElement;
    const inputField = document.getElementById('inputData') as HTMLInputElement;
  
    btn.onclick = () => {
      const inputArray = parseInput(inputField.value);
      const fft = new FFT();
      const result = fft.DFT(inputArray);
      const amplitude = result.map(p => Math.sqrt(p.real ** 2 + p.imag ** 2));
  
      updateChart(amplitude);
    };
  
    // 初回表示用
    btn.click();
  };
  