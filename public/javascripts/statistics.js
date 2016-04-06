/**
 * Created by 31344 on 2016/3/30.
 */
$(document).ready(function(){

        $.get("/functions/statistics",function(data){
            if(data != null){
                showChart(data.statistics);
            }
        });


        function showChart(data){
            $('#chart1').highcharts({
                chart: {
                    type: 'column',
                    margin: 75,
                    options3d: {
                        enabled: true,
                        alpha: 10,
                        beta: 25,
                        depth: 70
                    }
                },
                title: {
                    text: '不同体质类别的人数统计'
                },
                subtitle: {
                    text: ''
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                xAxis: {
                    categories: ["平和质","气虚质","阳虚质","阴虚质","痰湿质","湿热质","血淤质","气郁质","特禀质"]
                },
                yAxis: {
                    opposite: true
                },
                series: [{
                    name: '人数',
                    data: data
                }]
            });
            $('#chart2').highcharts({
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: '不同体质类别的人数比例'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '人数比例',
                    data: [
                        ["平和质",data[0]],
                        ["气虚质",data[1]],
                        ["阳虚质",data[2]],
                        ["阴虚质",data[3]],
                        ["痰湿质",data[4]],
                        ["湿热质",data[5]],
                        ["血淤质",data[6]],
                        ["气郁质",data[7]],
                        ["特禀质",data[8]]
                    ]
                }]
            });
        }

    }
);