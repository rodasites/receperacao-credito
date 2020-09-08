import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ObservadorService } from './../service/observador.service';
import { HttpService } from './../service/http.service';
import { environment } from '../environments/environment';
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('pieChart') pieChart: ElementRef

  public valorTotalInadimplente = ''
  public valorTotalPago = ''
  public valorTotalDividas = ''
  public inadimplenciasHoje = ''
  public connection
  public resultadoGrafico = []

  constructor(
    private http: HttpService,
    private observadorService: ObservadorService

  ) { }

  ngOnInit() {

    this.getValorTotalInadimplente();
    this.getValorTotalPago();
    this.getValorTotalDividas();
    this.getInadimplenciasHoje();

    this.observadorService.listen('divida-criada-v1').subscribe((data) => {
      if (data) {
        this.getValorTotalInadimplente();
        this.getValorTotalPago();
        this.getValorTotalDividas();
        this.getInadimplenciasHoje();
      }
    })
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.montaGrafico);

  }

  getValorTotalInadimplente() {
    this.http.get(`${environment.api}divida/getValorTotalInadimplente`).then((res) => {
      this.valorTotalInadimplente = res.valor

    })
  }
  getValorTotalPago() {
    this.http.get(`${environment.api}divida/getValorTotalPago`).then((res) => {
      this.valorTotalPago = res.valor

    })
  }
  getValorTotalDividas() {
    this.http.get(`${environment.api}divida/getValorTotalDividas`).then((res) => {
      this.valorTotalDividas = res.valor
    })
  }
  getInadimplenciasHoje() {
    this.http.get(`${environment.api}divida/getInadimplenciasHoje`).then((res) => {
      this.inadimplenciasHoje = res.valor
    })
  }

  montaGrafico = () => {
    let linha = ['', 'valor']
    this.resultadoGrafico.push(linha)

    linha = []
    linha.push('Valor pago', this.valorTotalPago)
    this.resultadoGrafico.push(linha);

    linha = []
    linha.push('valor Inadimplente', this.valorTotalInadimplente)
    this.resultadoGrafico.push(linha)

    const data = google.visualization.arrayToDataTable(this.resultadoGrafico);

    const options = {
      legend: { position: 'bottom' },
      is3D: true
    };

    const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    chart.draw(data, options);
  }
}
