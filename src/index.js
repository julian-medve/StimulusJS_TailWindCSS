import { Controller } from 'stimulus'
import Chart from 'chart.js'

export default class extends Controller {
  static targets = ['canvas']
  static values = {
    type: String,
    data: Object,
    options: Object
  }

  chartdata = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', ],
    datasets: [{
        label: 'Inkjet Printer',
        data: [4, 3, 2, 1],
        backgroundColor: [
            'rgba(255, 0, 0, 1.0)',
            'rgba(255, 154, 0, 1.0)',
            'rgba(255, 255, 255, 1.0)',
            'rgba(0, 251, 255, 1.0)',
        ],
        
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
    },]
  }

  chart_options = {
    scales: {
      xAxes: [{
          gridLines: {
              display:false,
          },
          ticks: {
            fontColor:'white',
            fontSize:20,
          },
          barPercentage: 0.6
      }],
      yAxes: [{
          gridLines: {
              display:false
          },
          ticks: {
            display: false,
            beginAtZero: true,
          },
      }]
    },
    legend: {
      labels: {
          // This more specific font property overrides the global property
          fontColor: 'white',
          fontSize:10
      },
      display: false
    },
    responsive: true,
    maintainAspectRatio: false
  }

  connect () {
    const element = this.hasCanvasTarget ? this.canvasTarget : this.element

    this.chart = new Chart(element.getContext('2d'), {
      type: this.typeValue || 'bar',
      data: this.chartdata,
      options: {
        ...this.chart_options,
        ...this.optionsValue
      }
    })
  }

  set chartData (data){
    this.dataValue = data;
  }

  disconnect () {
    this.chart.destroy()
    this.chart = undefined
  }

  static update() {
    this.update();
  }

  get chartData () {
    if (!this.hasDataValue) {
      console.warn('[stimulus-chartjs] You need to pass data as JSON to see the chart.')
    }

    return this.dataValue
  }

  get defaultOptions () {
    return chart_options
  }
}
