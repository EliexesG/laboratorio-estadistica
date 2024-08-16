import { Injectable } from '@angular/core';

// @ts-ignore
import jStat from 'jstat';

@Injectable({
  providedIn: 'root',
})
export class CalculosEstadisticosService {
  constructor() {}

  calcularPromedio(numbers: number[]) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
  }

  calcularDesviacion(numbers: number[]) {
    return jStat.stdev(numbers);
  }

  calcularErrorEstandarDiferencia(numbersA: number[], numbersB: number[]) {
    return Math.sqrt(
      this.calcularDesviacion(numbersA) / numbersA.length +
        this.calcularDesviacion(numbersB) / numbersB.length
    );
  }

  calcularZ(intervaloConfianza: number) {
    return jStat.normal.inv(intervaloConfianza, 0, 1);
  }

  // el intervalo de confianza es un numero como 0.95
  calcularIntervaloConfianza(
    numbersA: number[],
    numbersB: number[],
    intervaloConfianza: number
  ) {
    let diferenciaMedias =
      this.calcularPromedio(numbersA) - this.calcularPromedio(numbersB);
    let Z = this.calcularZ(intervaloConfianza);
    return {
      minimo:
        diferenciaMedias -
        Z * this.calcularErrorEstandarDiferencia(numbersA, numbersB),
      maximo:
        diferenciaMedias +
        Z * this.calcularErrorEstandarDiferencia(numbersA, numbersB),
    };
  }

  calcularTDeStudent(
    mediaMuestral: number,
    mediaPoblacional: number,
    desviacionMuestral: number,
    tamannoMuestra: number
  ) {
    return (
      (mediaMuestral - mediaPoblacional) /
      (desviacionMuestral / Math.sqrt(tamannoMuestra))
    );
  }

  calcularTCrit(significancia: number, df: number): number {
    return jStat.studentt.inv(1 - significancia, df);
  }

  calcularValorMenosP(t: number, df: number): number {
    return 1 - jStat.studentt.cdf(t, df);
  }

  // media de 120
  calcularPruebaHipotesis(
    numbers: number[],
    significancia: number,
    mediaPoblacional: number
  ) {
    // datos iniciales
    let mediaMuestral = this.calcularPromedio(numbers);
    let desviacionEstandar = this.calcularDesviacion(numbers);
    let n = numbers.length;

    // t de student
    let t = this.calcularTDeStudent(
      mediaMuestral,
      mediaPoblacional,
      desviacionEstandar,
      n
    );

    // t-crit y -p
    let tCrit: number = this.calcularTCrit(significancia, n - 1);
    let menosP: number = this.calcularValorMenosP(t, n- 1);

    return {
      t,
      tCrit,
      menosP,
    };
  }
}
