<!--  -->
<template>
<div class='container'>
    <div class="left">
        <div class="validWarning">
            <div class="Subhead">
                <div class="icon"></div>
                <div class="subText">有效预警</div>
            </div>
            <div class="icontent"></div>
        </div>

        <div class="channelStatistics">
            <div class="Subhead">
                <div class="icon"></div>
                <div class="subText">渠道统计</div>
            </div>

            <div class="icontent">
                <div class="channelList" v-for="(item,index) in channelArr" :key="index">
                    <div class="channelIcon">
                        <img :src="item.icon" alt="">
                    </div>
                    <div class="channelDetailed">
                        <div class="num">{{ item.value }}</div>
                        <div class="name">{{ item.name }}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="gradeWarning">
            <div class="Subhead">
                <div class="icon"></div>
                <div class="subText">预警等级</div>
            </div>
            <div class="icontent">
                <div class="tips redTips">
                    <div class="level">Ⅰ级</div>
                    <div class="nums">
                        <span>数量：{{ warningLevelArr.redTotel }}</span>
                        <span>占比：{{ warningLevelArr.redPer }}%</span>
                    </div>
                </div>
                <div class="tips orgTips">
                    <div class="level">Ⅱ级</div>
                    <div class="nums">
                        <span>数量：{{ warningLevelArr.orgTotel }}</span>
                        <span>占比：{{ warningLevelArr.orgPer }}%</span>
                    </div>
                </div>
                <div class="tips yelTips">
                    <div class="level">Ⅲ级</div>
                    <div class="nums">
                        <span>数量：{{ warningLevelArr.yelTotel }}</span>
                        <span>占比：{{ warningLevelArr.yelPer }}%</span>
                    </div>
                </div>
                <div class="tips blueTips">
                    <div class="level">Ⅳ级</div>
                    <div class="nums">
                        <span>数量：{{ warningLevelArr.blueTotel }}</span>
                        <span>占比：{{ warningLevelArr.bluePer }}%</span>
                    </div>
                </div>
                <div class="redLine"></div>
                <div class="orgLine"></div>
                <div class="yelLine"></div>
                <div></div>
                <div class="legend">
                    <div class="redLeg Leg">
                        <div class="colorBlock"></div>
                        <div class="level">Ⅰ级</div>
                        <div class="notes">特别严重</div>
                    </div>
                    <div class="orgLeg Leg">
                        <div class="colorBlock"></div>
                        <div class="level">Ⅱ级</div>
                        <div class="notes">严重</div>
                    </div>
                    <div class="yewLeg Leg">
                        <div class="colorBlock"></div>
                        <div class="level">Ⅲ级</div>
                        <div class="notes">较重</div>
                    </div>
                    <div class="blueLeg Leg">
                        <div class="colorBlock"></div>
                        <div class="level">Ⅳ级</div>
                        <div class="notes">一般</div>
                    </div>
                </div>
                <div class="progress">
                    <div class="redColor" :style="'width:'+ warningLevelArr.redPer +'%;'" ></div>
                    <div class="orangeColor" :style="'width:'+ warningLevelArr.orgPer +'%;'"></div>
                    <div class="yellowColor" :style="'width:'+ warningLevelArr.yelPer +'%;'"></div>
                    <div class="blueColor" :style="'width:'+ warningLevelArr.bluePer +'%;'"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="center">
        <div id="map" ></div>
        <div class="warningNum">
            <div class="warningNumList" v-for="(item,index) in warningNumArr" :key="index">
                <div class="numLeft">
                    <div class="areaName">
                        <div class="cityName">{{ item.name }}</div>
                        <div class="numTit">预警事件数：{{ item.num }}</div>
                    </div>
                    <div class="progress">
                        <!-- color='#ccc' -->
                        <el-progress :percentage="Number(item.percentage)"  :show-text="false"></el-progress>
                    </div>
                </div>
                <div class="numRight">
                    <div class="zb">{{ item.percentage }}%</div>
                    <div class="tit">总占比率</div>
                </div>
            </div>
        </div>
    </div>
    <div class="right">
        
        <div class="weatherLive">
            <div class="Subhead">
                <div class="icon"></div>
                <div class="subText">天气实况</div>
            </div>
            <div class="icontent">
                <div class="weatherIcons">
                    <div class="update">
                        更新时间：{{ weatherLiveArr.skTime }}
                    </div>
                    <div class="weatherBox">
                        <div class="weatherIcon">
                            <img :src="weatherLiveArr.icon" alt="">
                        </div>
                        <div class="weatherTems">
                            <div class="tems">
                                <div class="temText">{{ weatherLiveArr.tem }}</div>
                                <div class="unit">℃</div>
                            </div>
                            <div>{{ weatherLiveArr.weather }}</div>
                        </div>
                    </div>
                </div>
                <div class="status">
                    <div class="statusList">降水：<span style="color: #07CCF1">{{ weatherLiveArr.pre }}</span></div>
                    <div class="statusList">能见度：<span style="color: #07CCF1">{{ weatherLiveArr.vis }}</span></div>
                    <div class="statusList">相对湿度：<span style="color: #07CCF1">{{ weatherLiveArr.rhu }}</span></div>
                    <div class="statusList">风向风速：<span style="color: #07CCF1">{{ weatherLiveArr.wind }}{{ weatherLiveArr.wins }}</span></div>
                </div>
            </div>
        </div>
        
        <div class="forecast">
            <div class="Subhead">
                <div class="icon"></div>
                <div class="subText">七天预报</div>
            </div>
            <div class="icontent" >
                <!-- <div class="opts">
                    <div class="optList">温度</div>
                    <div class="optList">降水</div>
                    <div class="optList">风力</div>
                </div> -->
                <div id="forecast"></div>
            </div>
        </div>

        
        <div class="gridPoint">
            <div class="Subhead">
                <div class="icon"></div>
                <div class="subText">格点预报</div>
                <div class="beizhu">未来1小时</div>
            </div>
            <div class="icontent" >
                
            <el-table
                :data="tableData"
                stripe
                height="260"
                @selection-change="handleSelectionChange"
                :header-cell-style="{'text-align':'center',background: '#06395B'}"
                :cell-style="{'text-align':'center'}"
                style="width: 100%">
                <!-- <el-table-column
                type="selection"
                width="55"> -->
                <!-- </el-table-column> -->
                <el-table-column
                prop="stationName"
                label="站点">
                </el-table-column>
                <el-table-column
                prop="tem"
                width="70"
                label="温度">
                </el-table-column>
                <el-table-column
                prop="pre"
                label="降水mm">
                </el-table-column>
                <el-table-column
                prop="wiv10"
                label="风力m/s">
                </el-table-column>
                <el-table-column
                prop="rhu"
                label="湿度">
                </el-table-column>
                <el-table-column
                prop="vis"
                label="能见度">
                </el-table-column>
                
                
                <!-- <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <div class="handleIconBox" title="产品制作并下载" ><i class="el-icon-edit-outline"  @click="make_this( scope.row )" ></i></div>
                        <div class="handleIconBox" title="删除"><i class="el-icon-delete"  @click="del_this( scope.row.id )" ></i></div>
                    </template>
                </el-table-column> -->
            </el-table>
            </div>
        </div>


    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import * as echarts from 'echarts'
import $ from 'jquery'

import datasss from '@/assets/json/map.json'
var rateChart;
export default {
    name: 'monitor',
    props: {

    },
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
    //这里存放数据
        return {
            tableData: [],
            mapJson: '',
            mapData: [],

            format: '',

            //  预警等级
            warningLevelArr: {
                redTotel: 0,
                yelTotel: 0,
                orgTotel: 0,
                blueTotel: 0,

                redPer: 0,
                yelPer: 0,
                orgPer: 0,
                bluePer: 0,

            },
            // 渠道
            channelArr: [],
            // 天气实况
            weatherLiveArr:{
                air:"",
                icon: "",
                max: "",
                min: "",
                pm: "",
                pre: "0mm",
                rhu: "20%",
                vis: "999m",
                skTime: "2021-03-11 15:00:00",
                sunrise: "06:00",
                sunset: "17:39",
                tem: "9.2",
                weather: "晴",
                wind: "北风",
                wins: "3.8m/s",
            },
            datass: [
                [124.81938,46.046384],
                [124.897479,46.403914],
                [124.869074,47.177431],
                [125.084569,45.524961]

            ]
            ,

            warningNumArr: [{
        "id": "230600000000",
        "name": "大庆市",
        "level": "",
        "parent": "",
        "parentName": "",
        "longitude": 125.03,
        "latitude": 46.58,
        "vicinity": "",
        "redArea": "",
        "yellowArea": "",
        "blueArea": "",
        "num": 5,
        "percentage": "100"
    },
    {
        "id": "230602000000",
        "name": "萨尔图区",
        "level": "",
        "parent": "",
        "parentName": "",
        "longitude": 125.08792,
        "latitude": 46.59359,
        "vicinity": "",
        "redArea": "",
        "yellowArea": "",
        "blueArea": "",
        "num": 5,
        "percentage": "100"
    },
    {
        "id": "230603000000",
        "name": "龙凤区",
        "level": "",
        "parent": "",
        "parentName": "",
        "longitude": 125.11657,
        "latitude": 46.53273,
        "vicinity": "",
        "redArea": "",
        "yellowArea": "",
        "blueArea": "",
        "num": 5,
        "percentage": "100"
    },
    {
        "id": "230604000000",
        "name": "让胡路区",
        "level": "",
        "parent": "",
        "parentName": "",
        "longitude": 124.87075,
        "latitude": 46.6522,
        "vicinity": "",
        "redArea": "",
        "yellowArea": "",
        "blueArea": "",
        "num": 0,
        "percentage": "0"
    },
    {
        "id": "230605000000",
        "name": "红岗区",
        "level": "",
        "parent": "",
        "parentName": "",
        "longitude": 124.89248,
        "latitude": 46.40128,
        "vicinity": "",
        "redArea": "",
        "yellowArea": "",
        "blueArea": "",
        "num": 1,
        "percentage": "20"
    },
    {
        "id": "230606000000",
        "name": "大同区",
        "level": "",
        "parent": "",
        "parentName": "",
        "longitude": 124.81591,
        "latitude": 46.03295,
        "vicinity": "",
        "redArea": "",
        "yellowArea": "",
        "blueArea": "",
        "num": 1,
        "percentage": "20"
    },
    {
        "id": "230621000000",
        "name": "肇州县",
        "level": "",
        "parent": "",
        "parentName": "",
        "longitude": 125.27059,
        "latitude": 45.70414,
        "vicinity": "",
        "redArea": "",
        "yellowArea": "",
        "blueArea": "",
        "num": 1,
        "percentage": "20"
    },
    {
        "id": "230622000000",
        "name": "肇源县",
        "level": "",
        "parent": "",
        "parentName": "",
        "longitude": 125.08456,
        "latitude": 45.52032,
        "vicinity": "",
        "redArea": "",
        "yellowArea": "",
        "blueArea": "",
        "num": 1,
        "percentage": "20"
    },
    {
        "id": "230623000000",
        "name": "林甸县",
        "level": "",
        "parent": "",
        "parentName": "",
        "longitude": 124.87564,
        "latitude": 47.18601,
        "vicinity": "",
        "redArea": "",
        "yellowArea": "",
        "blueArea": "",
        "num": 0,
        "percentage": "0"
    },
    {
        "id": "230624000000",
        "name": "杜尔伯特蒙古族自治县",
        "level": "",
        "parent": "",
        "parentName": "",
        "longitude": 124.44937,
        "latitude": 46.86507,
        "vicinity": "",
        "redArea": "",
        "yellowArea": "",
        "blueArea": "",
        "num": 1,
        "percentage": "20"
    }
            ],
            
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        initEcharts(x,y1,y2){
            let this_ = this;
            if (rateChart != null && rateChart != "" && rateChart != undefined) {
                rateChart.dispose();//销毁
            }
            let myChart = echarts.init(document.getElementById("forecast"));
            rateChart = myChart;
            let option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: x,
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
                    name:'温度(℃)',
                    color:"#65ABE7", 
                    fontSize:12, 
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
                    borderColor: '#022F5680',
                    formatter: function(params){
                        let str = '<div style="color: #fff"><p>'+params[0].name+'</p></div>' 
                        for(var i=0;i<params.length;i++){
                            str+='<div  style="color: #fff">'+params[i].marker+' '+params[i].seriesName+'：'+params[i].data+'℃</div>'
                        }

                        return str
                    }
                },
                grid : {
                    top : 40,    //距离容器上边界40像素
                    bottom: 30   //距离容器下边界30像素
                },
                series: [
                    {
                    data: y1,
                    name: '最高温',
                    type: 'line',
                    areaStyle: {},
                    smooth: true,
                    itemStyle: {
                       areaStyle: {type: 'default'},
                       color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#c93a02'},
                                {offset: 0.5, color: '#c93a029f'},
                                {offset: 1, color: '#c93a023f'}
                            ]
                        ),
                       borderColor:'#71df6f',//拐点边框颜色
                       borderWidth: 2 //拐点边框大小
                    },
                },
                {
                    data: y2,
                    name: '最低温',
                    type: 'line',
                    areaStyle: {},
                    smooth: true,
                    itemStyle: {
                       areaStyle: {type: 'default'},
                       color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#02c0a5'},
                                {offset: 0.5, color: '#02c0a475'},
                                {offset: 1, color: '#02c0a431'}
                            ]
                        ),
                       borderColor:'#71df6f',//拐点边框颜色
                       borderWidth: 2 //拐点边框大小
                    },
                }
                ]
            };
            myChart.setOption(option); 
            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        init(){
            let myChart = echarts.init(document.getElementById('map'),'light');
            echarts.registerMap('cityMap',this.mapJson,{});  //加载自定义边界数据地图
            let data = [
                [124.81938,46.046384,30],
                [124.897479,46.403914, 90],
                [124.869074,47.177431, 10],
                [125.084569,45.524961, 70]
            ]
            // 市区坐标
            // let geoCoordMap = {
            //     "林甸县": [124.81938,46.046384],
            //     "红岗区": [124.897479,46.403914],
            //     "大同区": [124.869074,47.177431],
            //     "肇源县": [125.084569,45.524961],
            // };
            // let rawData = [
            //     ["林甸县",20],
            //     ["红岗区",10],
            //     ["大同区",30],
            //     ["肇源县",60]
            // ];
            // function makeMapData(rawData) {
            //     var mapData = [];
            //     for (var i = 0; i < rawData.length; i++) {
            //         var geoCoord = geoCoordMap[rawData[i][0]];
            //         if (geoCoord) {
            //             mapData.push({
            //                 name: rawData[i][0],
            //                 value: geoCoord.concat(rawData[i].slice(1))
            //             });
            //         }
            //     }
            //     return mapData;
            // };
            var option = {
                //backgroundColor:'#04222e',// 背景颜色
                tooltip: {
                    trigger: 'item',
                    formatter: p => {
                            let val = p.value;
                            if (window.isNaN(val)) {
                                val = 0;
                            }
                            let txtCon =
                            "<div style='text-align:center'> 地区：" + p.name + "<br />预警数：" + p.data.num + "<br />" + '</div>';
                            return txtCon;
                        }
                },
                grid : {
                    top : 10,    //距离容器上边界40像素
                    bottom: 10,   //距离容器下边界30像素
                    left: 10,
                    right: 10
                },
                geo3D: {
                    name: 'ditu',
                    top: -60,
                    map: 'cityMap',
                    itemStyle: {
                        //areaColor:'rgb(85,176,219)', //地图区域的颜色
                        opacity: 1,
                        color:'#011C3A',
                        borderWidth: 1, //边界线的宽度
                        borderColor: '#228EDD', //边界线颜色
                        // borderColor: '#67C1FF'
                        emphasis:{
                            color:'#33CCCC',
                        }
                    },
                    label: {
                        show: true,
                        color: '#fff',
                        fontSize: 14,
                        opacity: 1,
                        backgroundColor: 'rgba(0,0,0,0)'
                    },
                    emphasis: { 
                        color:'#33CCCC',
                        label: {
                            show: true,
                            color: 'green',
                            fontSize: 14
                        }
                    },
                    light: {
                        main: {
                            color: '#fff',
                            intensity: 1.2,
                            shadow: false,
                            alpha: 50,
                            beta: 10
                        },
                        ambient: {
                            intensity: 0.3
                        }
                    },
                    viewControl: {//用于鼠标的旋转，缩放等视角控制
                        distance: 160,//默认视角距离主体的距离
                        //panMouseButton: 'left',//平移操作使用的鼠标按键
                        //rotateMouseButton: 'right',//旋转操作使用的鼠标按键
                        alpha:30 // 让canvas在x轴有一定的倾斜角度
                    },
                    data: this.mapData
                },
                
                // geo: {
                //     name: 'ditu',
                //     type: 'map',
                //     map: 'cityMap',
                //     aspectScale: 0.8,  //地图长度比
                //     top: 10,
                //     zoom: 1,
                //     itemStyle: {
                //         normal: {
                //             show: true,
                //             areaColor:'#011C3A', //地图区域的颜色 也可以颜色渐变如下的 areaColor
                //             borderColor: '#228EDD', //边界线颜色
                //             borderWidth: '1', //边界线的宽度
                //             shadowColor: '#000d2e',
                //             shadowOffsetX: 0,
                //             shadowOffsetY: 8
                //         },
                //         emphasis: { // 鼠标移入时区域的样式
                //             areaColor: '#2AB8FF',
                //             borderWidth: 0,
                //             color: 'green'
                //         }
                //     },
                //     select:{
                //         itemStyle:{
                //             areaColor:'#011C3A', //地图区域的颜色 也可以颜色渐变如下的 areaColor
                //             borderColor: '#228EDD', //边界线颜色
                //             borderWidth: '1', //边界线的宽度
                //             color: '#fff'
                //         }
                //     },
                //     emphasis:{
                //         areaColor: '#ccc',
                //         borderWidth: 0,
                //         color: 'green'
                //     },
                //     label: {
                //         normal: {
                //             show: true,
                //             textStyle: {
                //                 color: '#fff'  //省市区字体颜色
                //             }
                //         },
                //         emphasis: {//对应的鼠标悬浮效果
                //             show: true,
                //             textStyle: {
                //                 color: '#333'  //鼠标移入对应的省市区字体颜色
                //             }
                //         }
                //     },
                //     data: this.warningNumArr   // 上面添加了 name,value,level,cityCode的数据
                // },

                series: [
                    {
                        type: 'bar3D',
                        coordinateSystem: 'geo3D',
                        shading: 'lambert',
                        data: data,
                        barSize: 4,
                        minHeight: 1,
                        silent: true,
                        color: '#FFB159'
                        // itemStyle: {
                        //     normal:{
                        //         label: {
                        //             show: true, //开启显示
                        //             position: 'top', //在上方显示
                        //             textStyle: { //数值样式
                        //                 color: '#fff',
                        //                 fontSize: 16
                        //             }
                        //         }
                        //     }
						// },
                    }
                ]
            }

            myChart.setOption(option);

            // myChart.getZr().on('click', params => {
            // })
            myChart.on('click', params => {

            })




        },
        aaa(item){

            this.$axios.get('/api/homeMonitor/mapJson',{})
            .then((res)=>{
                let url = res.data.data.content
                // let aaa = item || {}
                // let areaCode = aaa.cityCode || '230600000000'
                // let api;
                // // api = 'http://192.168.1.109:9068/files/base/map/'+areaCode+'.json'
                // if( aaa.level == 'district' ){
                //     // http://192.168.1.109:9068/files/base/map/230600000000.json
                //     api = this.global.serverSrc + '/files/base/map/'+areaCode+'.json'
                // }else{
                //     // api = 'https://geo.datav.aliyun.com/areas_v2/bound/'+areaCode+'_full.json'
                //     api = this.global.serverSrc + '/files/base/map/'+areaCode+'.json'
                // }
                this.$axios.get(url).then(res=>{
                    //获取的边界数据
                    this.mapJson=res.data
                    //对获取的每个子区域添加 name:省市区名称  value 要展示的值  level 此区域的省市区等级  cityCode：省市区的code   
                    //可通过需求自行添加和修改
                    // this.mapData = this.mapJson.features.map(item => {  
                    //         return ({
                    //                 name: item.properties.name,
                    //                 value: 1000,
                    //                 level: item.properties.level,
                    //                 cityCode: item.properties.adcode
                    //         })
                    // })
                    this.mapData = this.warningNumArr;
                    this.init()//调用下面的 echarts初始化
                })


            }).catch(()=>{})




        },
        handleSelectionChange(){

        },
        // 渠道统计
        getChannelTotal(){
            let api = '/api/homeMonitor/channelTotal';
            this.$axios.get(api,{
                params:{
                    // areaCode: '230600000000',
                    startTime: '2020-12-12',
                    endTime: '2021-03-12'
                }
            }).then((res)=>{
                let data = res.data.data.content;
                let arr = data.arry;
                this.channelArr = arr;
            }).catch((err)=>{})
        },
        // 预警级别
        getWarningLevel(){
            let api = '/api/homeMonitor/warnLevelTotal';
            this.$axios.get(api,{
                params:{
                    // areaCode: '230600000000',
                    startTime: '2020-12-12',
                    endTime: '2021-03-12'
                }
            }).then((res)=>{
                let data = res.data.data.content;
                let arr = data.arry;
                let redNum = 0,orgNum = 0,yelNum = 0,blueNum = 0;
                let allNum=0;
                for( let i = 0;i<arr.length;i++ ){
                    if( arr[i].name == '红色【I级】' ){
                        redNum = arr[i].value;
                    }
                    if( arr[i].name == '橙色【II级】' ){
                        orgNum = arr[i].value;
                    }
                    if( arr[i].name == '黄色【III级】' ){
                        yelNum = arr[i].value;
                    }
                    if( arr[i].name == '蓝色【IV级】' ){
                        blueNum = arr[i].value;
                    }
                }
                allNum = redNum *1 + orgNum*1 + yelNum*1 + blueNum*1;
                let redPer,orgPer,yelPer,bluePer;
                redPer = redNum/allNum*100
                orgPer = orgNum/allNum*100
                yelPer = yelNum/allNum*100
                bluePer = blueNum/allNum*100
                this.warningLevelArr.redTotel = redNum;
                this.warningLevelArr.orgTotel = orgNum;
                this.warningLevelArr.yelTotel = yelNum;
                this.warningLevelArr.blueTotel = blueNum;

                this.warningLevelArr.redPer = Math.round(redPer);
                this.warningLevelArr.orgPer = Math.round(orgPer);
                this.warningLevelArr.yelPer = Math.round(yelPer);
                this.warningLevelArr.bluePer= Math.round(bluePer);




            }).catch((err)=>{})
        },
        //  天气实况
        getWeatherLive(){
            let api = '/api/homeMonitor/getSkData';
            this.$axios.get(api,{}).then((res)=>{
                console.log(res)
                let data = res.data.data.content;
                this.weatherLiveArr = data;
            }).catch((err)=>{})
        },
        // 七天预报
        getSevenDayWeather(){

            let api = '/api/homeMonitor/sevenDayTem';
            this.$axios.get(api,{
                // params:{
                //     areaCode: '230600000000',
                // }
            }).then((res)=>{
                let data = res.data.data.content.tem;
                
                let time = data.time;
                let temMax = data.temMax;
                let temMin = data.temMin;


                this.initEcharts(time,temMax,temMin);


            }).catch((err)=>{})
        },
        // 格点预报
        getGedianData(){
            let api = '/api/homeMonitor/geDian';
            this.$axios.get(api,{
            }).then((res)=>{

                this.tableData = res.data.data.content
            }).catch()
        },
        // 预警数
        getWearningNum(){
            let api = '/api/homeMonitor/areaStatic';
            this.$axios.get(api,{
                // params: {
                //     areaCode: '230600000000',
                // }
            }).then((res)=>{
                let data = res.data.data.content;
                this.warningNumArr = data;
                
            })
        }


    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getWearningNum();
        this.aaa();
        this.getChannelTotal();
        this.getWarningLevel();
        this.getWeatherLive();
        this.getSevenDayWeather();
        this.getGedianData();
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
    box-sizing: border-box;
    display: flex;
    // color: #001242;
    // 公共标题 
    .Subhead{
        display: flex;
        width: 204px;
        height: 30px;
        margin-bottom: 10px;
        background: url('../../../assets/images/chief/subbg.png') no-repeat;
        background-position: left 10px bottom 0px;
        align-items: flex-end;
        .icon{
            height: 30px;
            width: 25px;
            background: url('../../../assets/images/chief/subicon.png') no-repeat;
            background-size: 100%;
        }
        .subText{
            color: #0199E8;
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            padding-left: 10px;
            box-sizing: border-box;
        }
        .beizhu{
            color: #e0dddd;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            padding-left: 10px;
            box-sizing: border-box;
        }

    }

    .left{
        width: 510px;
        box-sizing: border-box;
        padding:0 0 10px 20px;
        padding-top: 20px;
        .validWarning{
            margin-bottom: 20px;
            .icontent{
                height: 210px;
                background: url('../../../assets/images/chief/validWarning.png') no-repeat;
                color: #2AB8FF;
            }
        }
        .channelStatistics{
            margin-bottom: 20px;
            .icontent{
                display: flex;
                flex-wrap: wrap;
                .channelList{
                    display: flex;
                    width: 120px;
                    .channelIcon{
                        width: 86px;
                        height: 88px;
                        background: url('../../../assets/images/chief/qudaoxxhdpi.png') no-repeat;
                        background-size: 100%;
                        background-position: center;
                        display: flex;
                        justify-content: center; 
                        img{
                            width: 24px;
                            height: 24px;
                            margin-top: 20px;
                        }
                    }
                    .channelDetailed{
                        width: 70px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        .num{
                            height: 24px;
                            line-height: 24px;
                            font-size: 16px;
                        }
                        .name{
                            height: 26px;
                            line-height: 26px;
                        }
                    }
                }
            }
        }
        .gradeWarning{
            .icontent{
                min-height: 260px;
                // max-height: 300px;
                // height: calc( 100vh*27% );
                overflow: hidden;
                position: relative;
                .progress{
                    width: 400px;
                    height: 24px;
                    background-color: paleturquoise;
                    border-radius: 12px;
                    position: absolute;
                    bottom: 0px;
                    left: 45px;
                    display: flex;
                    overflow: hidden;
                    .redColor{
                        background-color: red;
                        height: 24px;
                    }
                    .orangeColor{
                        background-color: orange;
                        height: 24px;
                    }
                    .yellowColor{
                        background-color: yellow;
                        height: 24px;
                    }
                    .blueColor{
                        background-color: blue;
                        height: 24px;
                    }
                }
                .legend{
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 120px;
                    // height: 90px;
                    .Leg{
                        display: flex;
                        align-items: center;
                        height:20px;
                        .colorBlock{
                            width: 8px;
                            height: 8px;
                            margin-right: 10px;
                        }
                        .level{
                            margin-right: 10px;
                            color: #d48d09;
                        }
                        .notes{
                            color: #1E64B0;
                        }
                    }
                    .redLeg{
                        .colorBlock{
                            background-color: red;
                            
                        }
                    }
                    .orgLeg{
                        .colorBlock{
                            background-color: orange;
                        }
                    }
                    .yewLeg{
                        .colorBlock{
                            background-color: yellow;
                        }
                    }
                    .blueLeg{
                        .colorBlock{
                            background-color: blue;
                        }
                    }
                }
                .tips{
                    width: 140px;
                    height: 46px;
                    background: #012C50;
                    // opacity: 0.4;
                    border-radius: 4px;
                    position: absolute;
                    font-size: 14px;
                    >div{
                        height: 23px;
                    }
                }
                .redTips{
                    color: #AC332F;
                    // top: 10px;
                    left: 10px;
                }
                .orgTips{
                    top: 55px;
                    left: 80px;
                    color: #FB8204;
                }
                .yelTips{
                    top: 110px;
                    left: 160px;
                    color: yellow;
                }
                .blueTips{
                    top: 160px;
                    left: 290px;
                    color: rgb(105, 105, 252);
                }
                .redLine{
                    height: 185px;
                    width: 1px;
                    background-color: #AC332F;
                    position: absolute;
                    top: 70px;
                    left: 60px;
                    &:before {
                        top: -8px;
                        left: -4px;
                        position: absolute;
                        display: block;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background: #AC332F;
                        content: '';
                    }
                }
                .orgLine{
                    height: 150px;
                    width: 1px;
                    background-color: #FB8204;
                    position: absolute;
                    top: 120px;
                    left: 150px;
                    &:before {
                        top: -8px;
                        left: -4px;
                        position: absolute;
                        display: block;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background: #FB8204;
                        content: '';
                    }
                }
                .yelLine{
                    height: 110px;
                    width: 1px;
                    background-color: #C8B210;
                    position: absolute;
                    top: 160px;
                    left: 255px;
                    &:before {
                        top: -8px;
                        left: -4px;
                        position: absolute;
                        display: block;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background: #C8B210;
                        content: '';
                    }
                }
            }
        }
    }
    .center{
        width: 900px;
        position: relative;
        #map{
            width: 900px;
            height: 540px;
        }
        .warningNum{
            height: 320px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            // align-items: center;
            .warningNumList{
                display: flex;
                margin-right: 20px;
                .numLeft{
                    .areaName{
                        display: flex;
                        
                        align-items: flex-end;
                        width: 220px;
                        margin: 0px 0 10px 0;
                        div{
                            margin: 0px 10px;
                        }
                        .cityName{
                            font-size: 20px;
                            font-weight: bold;
                            color: #AAD4FF;
                            // width: 80px;
                        }
                        .numTit{
                            font-size: 14px;
                            font-weight: bold;
                            color: #95AFD2;
                        }
                    }
                    .progress{
                        /deep/.el-progress{
                            .el-progress-bar{
                                .el-progress-bar__outer{
                                        background-color: #ebeef500;
                                        border: 1px solid #004677;
                                }
                            }
                        }
                    }
                }
                .numRight{
                    width: 60px;
                    text-align: center;
                    .zb{
                        font-size: 20px;
                        font-weight: bold;
                        color: #0FBDFF;
                        margin-bottom: 5px;
                    }
                    .tit{
                        font-size: 12px;
                        font-weight: bold;
                        color: #95AFD2;
                    }
                }
            }
        }
    }
    .right{
        width: 510px;
        box-sizing: border-box;
        padding: 20px 0 20px 10px;
        .weatherLive{
            margin-bottom: 20px;
            .icontent{
                display: flex;
                .weatherIcons{ 
                    width: 270px;
                    height: 190px;
                    background-color: #022F56;
                    .update{
                        height: 24px;
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: #6887AB;
                        padding-left: 20px;
                        line-height: 24px;
                    }
                    .weatherBox{
                        display: flex;
                        align-items: center;
                        .weatherIcon{
                            width: 110px;
                            height: 120px;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .weatherTems{
                            margin-left: 10px;
                            .tems{
                            display: flex;
                                .temText{
                                    font-size: 68px; 
                                    font-weight: bold;
                                    color: #FFF402;
                                }
                            }
                        }
                    }
                }
                .status{
                    box-sizing: border-box;
                    padding-left: 20px;
                    .statusList{
                        height: 44px;
                        line-height: 44px;
                        font-size: 16px;
                        font-weight: bold;
                        color: #0199E8;
                    }
                }
            }
        }
        .forecast{
            .icontent{
                position: relative;
                .opts{
                    position: absolute;
                    right: 40px;
                    display: flex;
                    .optList{
                        width: 50px;
                        height: 24px;
                        line-height: 24px;
                        color: #0FBDFF;
                        margin: 0 3px;
                        border: 1px solid #06395B;
                        border-radius: 12px;
                        text-align: center;
                        z-index: 100;
                        &:hover{
                            cursor: pointer;
                        }
                    }
                }
                #forecast{
                    height: 260px;
                }

            }
            /deep/.icontent{
                .el-table{

                    // .el-table__body-wrapper{
                    //     .el-table__body{
                    //     }
                    // }
                    // ::-webkit-scrollbar {/*滚动条整体样式*/
                    //     width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
                    //     height: 8px;
                    //     scrollbar-arrow-color:red;

                    // }
                    // ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                    //     border-radius: 6px;
                    //     -webkit-box-shadow: inset 0 0 6px #06395B;
                    //     background: #06395B;
                    //     scrollbar-arrow-color:red;
                    // }
                    // ::-webkit-scrollbar-track {/*滚动条里面轨道*/
                    //     -webkit-box-shadow: inset 0 0 6px #06395B;
                    //     border-radius: 0;
                    //     background: rgba(0,0,0,0.1);
                    // }
                    ::-webkit-scrollbar 
                    { 
                        width: 3px; 
                        height: 16px; 
                        background-color: #F5F5F5; 
                    } 
                    
                    /*定义滚动条轨道 内阴影+圆角*/ 
                    ::-webkit-scrollbar-track 
                    { 
                        -webkit-box-shadow: inset 0 0 6px rgba(103, 172, 250, 0.3); 
                        border-radius: 10px; 
                        background-color: rgb(4, 35, 61); 
                    } 
                    
                    /*定义滑块 内阴影+圆角*/ 
                    ::-webkit-scrollbar-thumb 
                    { 
                        border-radius: 10px; 
                        -webkit-box-shadow: inset 0 0 6px rgba(45, 198, 245, 0.3); 
                        background-color: rgb(255, 255, 255); 
                    } 
                }
            }
        }
        .gridPoint{
            .icontent{
                height: 250px;
                box-sizing: border-box;
                padding-right: 10px;
            }
        }
    }

}
</style>