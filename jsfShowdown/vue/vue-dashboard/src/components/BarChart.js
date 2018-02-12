import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,

  mounted () {
    this.renderChart({
      labels: ['Cost','Value'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#CDE9F5',
          data: [111000]
        },{
          label: 'Data Two',
          backgroundColor: '#ABC040',
          data: [150000]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  }
}