<!--  -->
<template>
<div class='container'>
    <div class="Pandora">
        <div class="leftBox">
            <div class="Daily menuLists">
                <div class="titles">
                    <Subhead subName="日值查询"></Subhead>
                </div>
                <div class="contents">
                    <div class="miniMenu" :class=" activeNum == item.id ? 'isActive' : '' " v-for="(item,index) in dailyArr" :key="index">
                        <div class="diamond"></div>
                        <div class="texts">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="TenDays menuLists">
                <div class="titles">
                    <Subhead subName="旬值查询"></Subhead>
                </div>
                <div class="contents">
                    <div class="miniMenu" :class=" activeNum == item.id ? 'isActive' : '' " v-for="(item,index) in tenDaysArr" :key="index">
                        <div class="diamond"></div>
                        <div class="texts">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="Monthly menuLists">
                <div class="titles">
                    <Subhead subName="月值查询"></Subhead>
                </div>
                <div class="contents">
                    <div class="miniMenu" :class=" activeNum == item.id ? 'isActive' : '' " v-for="(item,index) in monthlyArr" :key="index">
                        <div class="diamond"></div>
                        <div class="texts">{{item.name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="centerBox">
            <div class="searchBox">
                <div class="tipsTitle">日值气压统计</div>
                <div class="searchs">
                    <div>
                        选择时间 &nbsp;
                        <el-date-picker
                            v-model="value1"
                            size="small"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="chartsBox">
                <div class="stationBox">
                    <div class="stationTit">站点选择</div>
                    <div class="stations">
                        <el-tree
                            :data="treeData"
                            :props="defaultProps"
                            node-key="id"
                            accordion
                            @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </div>
                <div class="icharts">
                    <div class="analyseTip">
                        曲线
                    </div>
                    <div class="echart" id="iChart">
                        
                    </div>
                </div>
            </div> 
            <div class="tableBoxs" style="padding: 0px 40px;" >
                <div class="analyseTip">
                    表格
                </div>
                <Itable :tabHeardData='tabHeardData' :tableData="tableData" ></Itable>
            </div>
        </div>
        <div class="rightBox">
            <div class="Annual menuLists">
                <div class="titles">
                    <Subhead subName="年值查询"></Subhead>
                </div>
                <div class="contents">
                    <div class="miniMenu" :class=" activeNum == item.id ? 'isActive' : '' " v-for="(item,index) in annualArr" :key="index">
                        <div class="diamond"></div>
                        <div class="texts">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="History menuLists">
                <div class="titles">
                    <Subhead subName="历史平均值统计"></Subhead>
                </div>
                <div class="contents isFlexColumn">
                    <div class="miniMenu" :class=" activeNum == item.id ? 'isActive' : '' " v-for="(item,index) in historyArr" :key="index">
                        <div class="diamond"></div>
                        <div class="texts">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="Arbitrarily menuLists">
                <div class="titles">
                    <Subhead subName="任意时段统计"></Subhead>
                </div>
                <div class="contents isFlexColumn">
                    <div class="miniMenu" :class=" activeNum == item.id ? 'isActive' : '' " v-for="(item,index) in arbitrarilyArr" :key="index">
                        <div class="diamond"></div>
                        <div class="texts">{{item.name}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Subhead from '../../../components/Subhead';
import Itable from '../../../components/Itable';
import * as echarts from 'echarts';

export default {
    name: 'analyse',
    props: {

    },
    //import引入的组件需要注入到对象中才能使用
    components: {
        Subhead: Subhead, //
        Itable: Itable, 
    },
    data() {
    //这里存放数据
        return {
            //日值
            dailyArr:[
                {
                    id: 1,
                    name: '气压'
                },
                {
                    id: 2,
                    name: '气温'
                },
                {
                    id: 3,
                    name: '空气湿度'
                },
                {
                    id: 4,
                    name: '风向风速'
                },
                {
                    id: 5,
                    name: '降水'
                },
                {
                    id: 6,
                    name: '能见度'
                },
                {
                    id: 7,
                    name: '地面温度'
                },
            ],
            // 旬值
            tenDaysArr:[
                {
                    id: 8,
                    name: '气压'
                },
                {
                    id: 9,
                    name: '气温'
                },
                {
                    id: 10,
                    name: '空气湿度'
                },
                {
                    id: 11,
                    name: '风向风速'
                },
                {
                    id: 12,
                    name: '降水'
                },
                {
                    id: 13,
                    name: '地面温度'
                },
            ],
            // 月值
            monthlyArr:[
                {
                    id: 14,
                    name: '气压'
                },
                {
                    id: 15,
                    name: '气温'
                },
                {
                    id: 16,
                    name: '空气湿度'
                },
                {
                    id: 17,
                    name: '风向风速'
                },
                {
                    id: 18,
                    name: '降水'
                },
                {
                    id: 19,
                    name: '能见度'
                },
                {
                    id: 20,
                    name: '地面温度'
                },
            ],
            // 年值
            annualArr:[
                {
                    id: 21,
                    name: '气压'
                },
                {
                    id: 22,
                    name: '气温'
                },
                {
                    id: 23,
                    name: '空气湿度'
                },
                {
                    id: 24,
                    name: '风向风速'
                },
                {
                    id: 25,
                    name: '降水'
                },
                {
                    id: 26,
                    name: '能见度'
                },
                {
                    id: 27,
                    name: '地面温度'
                },
            ],
            // 历史
            historyArr:[
                {
                    id: 28,
                    name: '同月统计'
                },
                {
                    id: 29,
                    name: '同日统计'
                },
                {
                    id: 30,
                    name: '同时刻统计'
                },
            ],
            // 历史
            arbitrarilyArr:[
                {
                    id: 31,
                    name: '小时统计'
                },
                {
                    id: 32,
                    name: '日数统计'
                },
                {
                    id: 33,
                    name: '极值统计'
                },
            ],

            // 站点数据
            treeData:[],
            // 树结构
            defaultProps: {
                children: 'children',
                label: 'name'
            },

            
            tabHeardData: [
                { label: '日期' ,desc: 'date', tbChildren: [] },
                { label: '气温' ,desc: 'tem', tbChildren: [{label: '最高温',desc: 'heightTem'},{label: '最低温',desc: 'lowTem'}] },
                
                { label: '气温' ,desc: 'tem', tbChildren: [{label: '最高温',desc: 'heightTem'},{label: '最低温',desc: 'lowTem'}] },
            ],

            tableData: [{
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
            }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
            }, ],


            value1: '',










            activeNum: 1
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        // 站点点击事件
        handleNodeClick(){

        },

        // chart 初始化
        initChart(){
            let chartDom = document.getElementById('iChart');
            let myChart = echarts.init(chartDom);
            let option;

            option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    
                    axisLine:{
                        lineStyle:{
                            color:'#002E62',
                            //width:8,//这里是为了突出显示加上的
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: '#fff'
                    },
                },
                yAxis: {
                    type: 'value',
                    // name: '温度(℃)',
                    color:"#65ABE7",
                    axisLabel : {
                        color: '#2DB6FF'
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: '#03254B',
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#022F5680',
                    color: '#fff',
                    borderColor: '#022F5680',
                    // formatter: function(params){
                    //     let str = '<div style="color: #fff"><p>'+params[0].name+'</p></div>' 
                    //     for(var i=0;i<params.length;i++){
                    //         str+='<div  style="color: #fff">'+params[i].marker+' '+params[i].seriesName+'：'+params[i].data+'℃</div>'
                    //     }

                    //     return str
                    // }
                    textStyle: {
                        // fontSize: 12,
                        color: '#fff'
                    },
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true
                }]
            };

            myChart.setOption(option);
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.initChart()
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

.container{
    background: url('../../../assets/images/chief/square.png');
    box-sizing: border-box;
    padding: 30px 20px 0px;
    
    .Pandora{
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-image: url('../../../assets/images/chief/LINE.png') 1 0 round;
        width: 1820px;
        margin: 0px auto;
        display: flex;
        justify-content: space-around;
        .leftBox{
            width: 400px;
            box-sizing: border-box;
            padding: 0 20px;
            .Daily{

            }
            .TenDays{

            }
            .Monthly{

            }
        }
        .centerBox{
            width: 1080px;
            background: #06142E;
            .searchBox{
                width: 1077px;
                height: 64px;
                background: url('../../../assets/images/chief/analyseCenter.png') no-repeat;
                margin: 20px  auto 0;
                display: flex;
                align-items: center;

                .tipsTitle{
                    font-size: 18px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #EF8D15;
                    margin-left: 50px;
                }

                .searchs{
                    margin-left: 80px;
                }
 
            }
            .chartsBox{
                box-sizing: border-box;
                padding: 20px;
                display: flex;
                justify-content: space-around;
                .stationBox{
                    width: 168px;
                    height: 380px;
                    background: url('../../../assets/images/chief/stationBg.png') no-repeat;
                    .stationTit{
                        height: 30px;
                        line-height: 36px;
                        text-align: center;
                        font-size: 16px;
                        font-family: Adobe Heiti Std;
                        font-weight: normal;
                        color: #30D4D0;
                    }
                    .stations{
                        height: 350px;
                    }
                }
                .icharts{
                    width: 810px;
                    .analyseTip{
                        width: 376px;
                        height: 57px;
                        background: url('../../../assets/images/chief/analyseTipBg.png') no-repeat;
                        font-size: 20px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #AAD4FF;
                        line-height: 57px;
                        padding-left: 20px;
                    }
                    .echart{
                        height: 380px;
                        width: 810px;
                        
                    }
                }
            }
            .tableBoxs{
                width: 100%;
                box-sizing: border-box;
                padding: 0px 40px;
                .analyseTip{
                    width: 376px;
                    height: 57px;
                    background: url('../../../assets/images/chief/analyseTipBg.png') no-repeat;
                    font-size: 20px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #AAD4FF;
                    line-height: 57px;
                    padding-left: 20px;
                }
            }
        }
        .rightBox{
            width: 400px;
            box-sizing: border-box;
            padding: 0 20px;
        }
    }


    // 公共类
    .menuLists{
        .titles{
            margin: 20px 0px;
        }
        .contents{
            box-sizing: border-box;
            padding: 10px 0px;
            display: flex;
            flex-wrap: wrap;
            .miniMenu{
                min-width: 100px;
                height: 40px;
                border-radius: 18px;border: 1px solid #06516F;
                background: radial-gradient(circle,#206BB4 0%, #041B38 100%);
                display: flex;
                align-items: center;
                padding: 0 8px;
                margin: 10px 5px;
                align-self: baseline;
                .diamond{
                    width: 15px;
                    height: 15px;
                    transform: rotate(45deg);
                    border: 2px solid #06516F;
                }
                .texts{
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #0199E8;
                    margin: 0px 5px;
                }
            }
            .isActive{
                border-radius: 18px;border: 1px solid #df9d4d;
                background: radial-gradient(circle, #ac9a86 0%, #4d3e2bc2 100%);
                .diamond{
                    border: 2px solid #F18B11;
                    background: #F18B11;
                }
                .texts{
                    color: #F18B11;
                }
            }
        }
    }
    .isFlexColumn{
        flex-direction: column;
    }

}



</style>