import { FFT } from "./FFT/FFT";
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { ChartConfiguration } from 'chart.js';
import * as fs from 'fs';

export class GraphPlotter {
  private width: number = 800;
  private height: number = 600;
  private chartJSNodeCanvas: ChartJSNodeCanvas;
  private fft: FFT;

  constructor() {
    this.chartJSNodeCanvas = new ChartJSNodeCanvas({ width: this.width, height: this.height });
    this.fft = new FFT();
  }

  private generateChartConfig(data: number[], label: string): ChartConfiguration {
    return {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [{
          label,
          data,
          borderColor: 'blue',
          fill: false
        }]
      }
    };
  }

  public async createChartImage(data: number[], label: string, outputPath: string): Promise<void> {
    const config = this.generateChartConfig(data, label);
    const buffer = await this.chartJSNodeCanvas.renderToBuffer(config);
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ グラフ画像を出力しました: ${outputPath}`);
  }

  public runFFTExample(sample: number[]): void {
    const fftResult = this.fft.DFT(sample);
    const idftResult = this.fft.IDFT(fftResult);

    console.log("DFT結果:", fftResult);
    console.log("IDFT結果:", idftResult);
  }
}
