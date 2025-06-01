"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const FFT_1 = require("./FFT/FFT");
// src/index.ts
const chartjs_node_canvas_1 = require("chartjs-node-canvas");
const fs = __importStar(require("fs"));
// キャンバスサイズ
const width = 800;
const height = 600;
// キャンバスを作成
const chartJSNodeCanvas = new chartjs_node_canvas_1.ChartJSNodeCanvas({ width, height });
// グラフの設定
const config = {
    type: 'line',
    data: {
        labels: [0, 1, 2, 3, 4, 5],
        datasets: [{
                label: 'y = x²',
                data: [0, 1, 4, 9, 16, 25],
                borderColor: 'blue',
                fill: false
            }]
    }
};
// グラフ画像を生成して保存
function createChartImage() {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = yield chartJSNodeCanvas.renderToBuffer(config);
        fs.writeFileSync('./output-graph.png', buffer);
        console.log('✅ グラフ画像を出力しました: output-graph.png');
    });
}
createChartImage();
const fft_result = new FFT_1.FFT();
const sample = [1, 0];
console.log(fft_result.DFT(sample));
console.log(fft_result.IDFT(fft_result.DFT(sample)));
