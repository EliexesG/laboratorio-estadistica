import { Component, Input, OnInit } from '@angular/core';
import { row } from 'src/app/utils/libraries/default-data';
import { CalculosEstadisticosService } from 'src/app/utils/services/calculos-estadisticos.service';
import { MatCardModule } from '@angular/material/card';
import { BasicCardComponent } from '../basic-card/basic-card.component';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [MatCardModule, BasicCardComponent],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css',
})
export class EstadisticasComponent implements OnInit {
  @Input() rows: row[] = [];
  @Input() intervalo: number = 0.95;
  @Input() significancia: number = 0.05;

  // intervalo
  interavaloConfianza: { minimo: number; maximo: number } = {
    minimo: 0,
    maximo: 0,
  };

  pruebaHipotesis: {
    t: number;
    tCrit: number;
    menosP: number;
  } = {
    t: 0,
    tCrit: 0,
    menosP: 0,
  };

  constructor(private calculosEstadisticos: CalculosEstadisticosService) {}

  ngOnInit(): void {
    this.interavaloConfianza = this.calcularIntervaloConfianza();
    this.pruebaHipotesis = this.calcularPruebaHipotesis();
  }

  calcularIntervaloConfianza() {
    const numbersA = this.rows.map((row) => row.glucosa);
    const numbersB = this.rows.map((row) => row.colesterol);
    
    return this.calculosEstadisticos.calcularIntervaloConfianza(
      numbersA,
      numbersB,
      this.intervalo
    );
  }

  calcularPruebaHipotesis() {
    return this.calculosEstadisticos.calcularPruebaHipotesis(
      this.rows.map((row) => row.glucosa),
      this.significancia,
      120
    );
  }

  decimalesFijos(numero: number, decimales: number) {
    return numero.toFixed(decimales);
  }
}
