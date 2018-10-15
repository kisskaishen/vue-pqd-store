import api from '../js/ajax';

import echarts from "echarts"

export default {
    notice(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if(result.code==200){
                	var jsonData = result.data;
                    that.msg_content = jsonData.notice;
                    that.is_default_address = jsonData.is_default_address;
                    if(that.is_default_address==0){
                    	that.dialogVisible = true;
                    }
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    orderStatusStatistics(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    that.orderStatusStatistics = result.data;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    getIndexData(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success: function (result) {
                if (result.code == 200) {
                    var mainSalesVolumeId = document.getElementById('mainSalesVolume');
                    var mainSalesVolumes = echarts.init(mainSalesVolumeId);
                    var data = result.data;
                    that.listData = data;
                    that.lastday30 = data.day30;
                    that.today = data.day;
                    that.storeInfo = data.storeInfo;
                    that.tableData = data.week2;
                    var results = data.week1;
                    // 基于准备好的dom，初始化echarts实例    
                    // 指定图表的配置项和数据

                    var option = {
                        title: {
                            text: ''
                        },
                        tooltip: {},
                        legend: {
                            data:['销量','销售额']
                        },
                        xAxis: {
                            data:results.time
                            // data: ["2018-03-01","2018-03-02","2018-03-03","2018-03-04","2018-03-05","2018-03-06","2018-03-07"]
                        },
                        yAxis: {
                        
                        },
                        series: [{
                            name: '销量',
                            type: 'bar',
                            // data: [5, 20, 36, 10, 10, 20]
                            data: results.num
                        },{
                            name: '销售额',
                            type: 'bar',
                            // data: [5, 20, 36, 10, 10, 20]
                                data: results.money
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    mainSalesVolumes.setOption(option);
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    }
}