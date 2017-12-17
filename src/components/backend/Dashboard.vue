<template>
  <div>



    <el-row id="dash">
      <el-col :md="8" class="top-overview">
       <el-card :body-style="{ padding: '0px' }">
        <div class="status">
            <div class="status__icon">
            <i class="fa fa-database" aria-hidden="true"></i>
            </div>
            <div class="status__number">
                <p>Capacity</p>
                <span>10 GB</span>
            </div>
        </div>      
        </el-card>
      </el-col>
      <el-col :md="8" class="top-overview">
       <el-card :body-style="{ padding: '0px' }">
            <div class="status">
                <div class="status__icon">
                <i class="fa fa-user" aria-hidden="true"></i>
                </div>
                <div class="status__number">
                    <p>Users now</p>
                    <span>103</span>
                </div>
            </div> 
        </el-card>
      </el-col>
      <el-col :md="8" class="top-overview">
       <el-card :body-style="{ padding: '0px' }">
        <div class="status">
                <div class="status__icon">
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                </div>
                <div class="status__number">
                    <p>Errors</p>
                    <span>0</span>
                </div>
            </div> 
        </el-card>
      </el-col>
  </el-row> 
  
  <el-row>
      <el-col :md="12" class="top-overview">
       <el-card>

         <canvas id="myChartLine" width="400" height="200"></canvas>

        </el-card>
      </el-col>

      <el-col :md="12" class="top-overview">
       <el-card>

         <canvas id="myChart" width="400" height="200"></canvas>

        </el-card>
      </el-col>
  </el-row> 

    <el-row>
      <el-col :md="24" class="top-overview">
       <el-card>

         <canvas id="myChartLine2" width="300" height="100"></canvas>

        </el-card>
      </el-col>
  </el-row> 

    <!--<el-row id="go-to">
      <el-col :md="24" class="top-overview">
        <a><i class="el-icon-d-arrow-right"></i> Go to your website</a>
      </el-col>
  </el-row> -->

  </div>
</template>

<script>
import $ from 'jquery'

  export default {
    data() {
      return {
      }
    },
    beforeCreate () {
        setTimeout(function(){ 
            var ctx = document.getElementById("myChartLine").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["01/09/18", "02/09/18", "03/09/18", "04/09/18", "05/09/18", "06/09/18", "07/09/18"],
                    datasets: [{
                        label: 'Users',
                        data: [0, 1000, 1200, 2000, 3500, 6000, 5000],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0)',
                        ],
                        borderColor: [
                            '#409EFF',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: 'Users the past 7 days'
                    }
                }
            });

            ///////////////////
            var ctx = document.getElementById("myChartLine2").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["01/09/18", "02/09/18", "03/09/18", "04/09/18", "05/09/18", "06/09/18", "07/09/18"],
                    datasets: [{
                        label: 'Pageviews',
                        data: [12000, 10000, 12000, 23000, 18000, 13000, 28000],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0)',
                        ],
                        borderColor: [
                            '#409EFF',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: 'Pageviews the past 7 days '
                    }
                }
            });

            ///////////////////
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Denmark", "Finland", "Germany", "Sweden", "Irland"],
                    datasets: [{
                        label: 'Unique users',
                        data: [8600, 2033, 6002, 5004, 4232, 8022],
                        backgroundColor: [
                            'rgba(192,192,192,0)',
                            'rgba(192,192,192,0)',
                            'rgba(192,192,192,0)',
                            'rgba(192,192,192,0)',
                            'rgba(192,192,192,0)',
                            'rgba(192,192,192,0)'
                        ],
                        borderColor: [
                            '#409EFF',
                            '#409EFF',
                            '#409EFF',
                            '#409EFF',
                            '#409EFF',
                            '#409EFF'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: 'Top 5 countries'
                    }
                }
            });
         }, 10);
      
    },
  };
</script>

<style>
#dash {
    margin-top: 0%;
}
#go-to a {
    color: #409EFF;
}
.top-overview {
    padding: 2%;
}
.top-overview .el-card {
    min-height: 100px;
    box-shadow: none !important;
}
#myChartLine, #myChart {
    padding-left: 1%;
}
.status {
    display: flex;
}
.status__icon {
    flex: 1;
}
.status__icon i {
   font-size: 3rem;
   color: #8c8c8c;
   padding-top: 22px;
}
.status__number {
    flex: 1;
}
.status__number p {
    font-size: 16px;
    margin-bottom: -0.5%;
    color: #8c8c8c;
}
.status__number span {
    font-size: 2rem;
    color: grey;
    font-weight: lighter;
}
</style>
