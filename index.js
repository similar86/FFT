"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chart_js_1 = require("chart.js");
const FFT_1 = require("./src/FFT/FFT");
chart_js_1.Chart.register(chart_js_1.LineController, chart_js_1.LineElement, chart_js_1.PointElement, chart_js_1.LinearScale, chart_js_1.Title, chart_js_1.CategoryScale);
let chart = null;
function parseInput(input) {
    return input.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
}
function updateChart(data) {
    const labels = data.map((_, i) => i);
    const config = {
        type: 'line',
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
    const canvas = document.getElementById('myChart');
    if (chart) {
        chart.destroy();
    }
    chart = new chart_js_1.Chart(canvas, config);
}
window.onload = () => {
    const btn = document.getElementById('runBtn');
    const inputField = document.getElementById('inputData');
    btn.onclick = () => {
        const inputArray = parseInput(inputField.value);
        const fft = new FFT_1.FFT();
        const result = fft.DFT(inputArray);
        const amplitude = result.map(p => Math.sqrt(p.real ** 2 + p.imag ** 2));
        updateChart(amplitude);
    };
    // 初回表示用
    btn.click();
};
