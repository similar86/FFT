"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFT = void 0;
class FFT {
    DFT(x) {
        const N = x.length;
        const X = [];
        for (let k = 0; k < N; k++) {
            let re = 0; // 実部
            let im = 0; // 虚部
            for (let n = 0; n < N; n++) {
                const angle = (-2 * Math.PI * k * n) / N;
                re += x[n] * Math.cos(angle);
                im += x[n] * Math.sin(angle); // sinの符号に注意（負号ではない）
            }
            X.push({ re, im });
        }
        return X;
    }
    IDFT(X) {
        const N = X.length;
        const x = [];
        for (let n = 0; n < N; n++) {
            let reSum = 0;
            for (let k = 0; k < N; k++) {
                const angle = (2 * Math.PI * k * n) / N;
                const re = X[k].re * Math.cos(angle) - X[k].im * Math.sin(angle);
                reSum += re;
            }
            x.push(reSum / N); // 実数部分だけ取り出して正規化
        }
        return x;
    }
}
exports.FFT = FFT;
const dft_result = new FFT();
console.log(dft_result.DFT([1, 0, -1, 0, 1]));
const idft_result = new FFT();
console.log(idft_result.DFT([1, 0]));
