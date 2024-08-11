import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculosEstadisticosService {
  constructor() {}

  promedio(numbers: number[]) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
  }

  desviacion(numbers: number[]) {
    const promedio = this.promedio(numbers);
    const sum = numbers.reduce((a, b) => a + Math.pow(b - promedio, 2), 0);
    return sum / numbers.length;
  }

  errorEstandarDiferencia(numbersA: number[], numbersB: number[]) {
    return Math.sqrt(
      this.desviacion(numbersA) / numbersA.length +
        this.desviacion(numbersB) / numbersB.length
    );
  }

  calcularZ(intervaloConfianza: number) {
    return intervaloConfianza + 1;
  }

  // el intervalo de confianza es un numero como 0.95
  calcularIntervaloConfianza(
    numbersA: number[],
    numbersB: number[],
    intervaloConfianza: number
  ) {
    let diferenciaMedias = this.promedio(numbersA) - this.promedio(numbersB);
    let Z = this.calcularZ(intervaloConfianza);
    return {
      menor:
        diferenciaMedias - Z * this.errorEstandarDiferencia(numbersA, numbersB),
      mayor:
        diferenciaMedias + Z * this.errorEstandarDiferencia(numbersA, numbersB),
    };
  }
}
