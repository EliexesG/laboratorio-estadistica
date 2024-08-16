// @ts-ignore
import jStat from 'jstat';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculosEstadisticosService {
  constructor() {}

  calcularPromedio(numbers: number[]) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
  }

  calcularDesviacion(numbers: number[]): number {
    return jStat.stdev(numbers);
  }

  calcularErrorEstandarDiferencia(numbersA: number[], numbersB: number[]) {
    let desviacionA = this.calcularDesviacion(numbersA) ** 2;
    let desviacionB = this.calcularDesviacion(numbersB) ** 2;

    return Math.sqrt(
      desviacionA / numbersA.length + desviacionB / numbersB.length
    );
  }

  // el intervalo de confianza es un numero como 0.95
  calcularIntervaloConfianza(
    numbersA: number[],
    numbersB: number[],
    intervaloConfianza: number
  ) {
    let mediaA = this.calcularPromedio(numbersA);
    let mediaB = this.calcularPromedio(numbersB);
    let diferenciaMedias = mediaA - mediaB;
    let z = intervaloConfianza + 1;

    let errorEstandar = this.calcularErrorEstandarDiferencia(
      numbersA,
      numbersB
    );

    return {
      minimo: diferenciaMedias - z * errorEstandar,
      maximo: diferenciaMedias + z * errorEstandar,
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
    let menosP: number = this.calcularValorMenosP(t, n - 1);

    return {
      t,
      tCrit,
      menosP,
    };
  }
}
