import { FFT } from "./FFT/FFT";
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { ChartConfiguration } from 'chart.js';
import * as fs from 'fs';

// キャンバスサイズ
const width = 800;
const height = 600;

// キャンバスを作成
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

// グラフの設定
const config: ChartConfiguration = {
  type: 'line',
  data: {
    labels: [0, 1, 2, 3, 4, 5],
    datasets: [{
      label: 'y = FFT',
      data: [0, 1, 4, 9, 16, 25],
      borderColor: 'blue',
      fill: false
    }]
  }
};

// グラフ画像を生成して保存
async function createChartImage() {
  const buffer = await chartJSNodeCanvas.renderToBuffer(config);
  fs.writeFileSync('./output-graph.png', buffer);
  console.log('✅ グラフ画像を出力しました: output-graph.png');
}

createChartImage();


const fft_result = new FFT();
const sample : number[] = [1 ,0];
console.log(fft_result.DFT(sample));
console.log(fft_result.IDFT(fft_result.DFT(sample)));
