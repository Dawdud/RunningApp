  function runingChartData(labels, data){
  var  chartData= {
        type: "bar",
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
          },
          title: {
            display: true,
            text: "Running Distance in meters",
            fontSize: 20
          },

        },
        data: {
          labels,
          datasets: [
            {
              label: ["distance"],
              data,
              backgroundColor: "#3C65F2"
            }
          ]
        }
      };
      return  chartData;
}
export {runingChartData}