export const planetChartData = {
    type: "bar",
    data: {
      labels: ["Mon, 24", "Tue, 25", "Wed, 25", "Thur, 25", "Fri, 28", "Sat, 29", "Sun, 30","Mon, 32"],
      datasets: [
        {
          label: "Appointments",
          data: [550,460,771, 400, 420, 772, 450, 550],
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
          label: "Appointments",
          data: [450,660,971, 400, 420, 792, 250, 650],
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
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
          },
          font: {
            size: 14
            },
          align: 'start',
          title:{
              color: '#000',
          },
          boxWidth: 10,
          boxHeight: 14,
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
  };
  
  export default planetChartData;