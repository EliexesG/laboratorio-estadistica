import { Component, Input, OnInit } from '@angular/core';
import { row } from 'src/app/utils/libraries/default-data';
import { CalculosEstadisticosService } from 'src/app/utils/services/calculos-estadisticos.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css',
})
export class EstadisticasComponent implements OnInit {
  @Input() rows: row[] = [];
  @Input() intervalo: number = 0.95;

  // intervalo
  interavaloConfianza: { menor: number; mayor: number } = {
    menor: 0,
    mayor: 0,
  };

  constructor(private calculosEstadisticos: CalculosEstadisticosService) {}

  ngOnInit(): void {
    this.interavaloConfianza = this.calcularIntervaloConfianza();
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

  decimalesFijos(numero: number, decimales: number) {
    return numero.toFixed(decimales);
  }
}
