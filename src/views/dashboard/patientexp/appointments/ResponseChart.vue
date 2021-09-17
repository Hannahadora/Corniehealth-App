<template>
  <div>
    <canvas ref="responsechart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import ResponseData from './response-data'
import CornieSelect from "@/components/cornieselect.vue";
import SingleDatePicker from "./datepicker.vue";
import { cornieClient } from "@/plugins/http";
import moment from 'moment'

export default {
  name: 'ResponseChart',
  components:{
    CornieSelect,
    SingleDatePicker
  },
  props:{
      chartData: {
        type:  Array,
        required: true,
        default: ""
      },
      chartLabels: {
        type: Array,
        required: true,
      },
      chartFullfilled:{
        type:Array,
        required: true,
      }
  },
  data() {
    return {
      ResponseData: ResponseData,
      date:"",
      loaded: false,
      chartLength:[],
      dateLabels:[],
    }
  },
  method:{
   
  },
  async created(){
  },
  computed:{
  
  },
  mounted() {
    //  const values = this.chartData[0].map(function (e) {
    //     e.createdAt = moment(values).format('dddd,GG')
    //     return e.createdAt;
    //   });
  //this.loaded = true;
  const ctx = this.$refs.responsechart;
   const chart = new Chart(ctx,{
    type: "bar",
    data: {
      labels: this.chartData,
      datasets: [
        {
          label: "Appointments",
          data: this.chartLabels,
          backgroundColor: "rgba(84, 19, 136, 1)",
          borderColor: "#541388",
          borderWidth: 1,
          borderRadius: {
             topLeft: 100,
             topRight: 100,
           // bottomRight: 100,  
           // bottomLeft: 100,  
          },
          pointRadius: 2,
          borderSkipped: false,
        },
        {
          label: "Fulfilled",
          data: [5, 10, 15, 20, 25],
          backgroundColor: "rgba(194, 199, 214, 1)",
          borderColor: "#C2C7D6",
          borderWidth: 2,
          borderRadius: {
             topLeft: 100,
             topRight: 100,
           // bottomRight: 100,  
           // bottomLeft: 100,  
          },
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      lineTension: 1,
      plugins: {
        tooltip: {
            backgroundColor:'rgba(8, 0, 86, 1)',
            titleAlign: 'center',
            titleMarginBottom: 9,
            bodyAlign: 'center',
            padding: 30,
            position:'average',
            yAlign: 'bottom',
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            color: "#000",
            boxWidth: 5,
            boxHeight: 10,

          },
          font: {
            size: 14
            },
          align: 'start',
          title:{
              color: '#000',
          },
        },
        title: {
          display: true,
          text: 'Appointment Statistics',
          align: 'start',
          color: '#541388',
          padding: 20,
          font:{
              weight: 'bold',
              size: 16,
          },
        
        }
      },
      scales: {
        y:{
            ticks: {
              fixedStepSize: 1,
              padding: 25
            },
            grid:{
                drawBorder: false,
                display:false,
                color:'rgba(194, 199, 214, 1)'
            }
        },
        xAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 25
              },
              gridLines: {
                  display:false
              }
            }
          ]
      }
    }
   });
 
  }
}
</script>