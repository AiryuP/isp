<!--  -->
<template>
    <div class='container' id="container">
        <div class="crumbs">
            风险普查—风险区划图
        </div>
 
        <div class="searchBox">
            <div class="iListBox">
                <div class="iListLable">灾种</div>
                <div class="iListConent">
                    <!-- <el-input  v-model="inputTitle" placeholder="请输入内容"></el-input> --> 
                    <el-select v-model="disaster" @change="changeDisaster" placeholder="请选择">
                        <el-option
                        v-for="item in disasterArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <!-- <div class="iListBox">
                <div class="iListLable">致灾因子</div>
                <div class="iListConent">
                    <el-select v-model="causeDisaster" placeholder="请选择">
                        <el-option
                        v-for="item in causeDisasterArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div> -->
            <div class="iListBox">
                <div class="iListLable">产品类型</div>
                <div class="iListConent">
                    <el-select v-model="product" placeholder="请选择">
                        <el-option
                        v-for="item in productArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="iListBox">
                <div class="iListLable">承灾体</div>
                <div class="iListConent">
                    <el-select v-model="bear" @change="changeBear" placeholder="请选择">
                        <el-option
                        v-for="item in bearArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="iListBox">
                <div class="iListLable">时间</div>
                <div class="iListConent">
                    <!-- <el-input  v-model="inputTitle" placeholder="请输入内容"></el-input> -->
                    <el-date-picker
                        v-model="times"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <el-button type="primary" size="small" @click="search">搜索</el-button>
            </div>
            <div style="margin-left: 10px" v-show="showBtn" >
                <el-button type="primary" size="small" @click="holdReport">保存评估报告</el-button>
            </div>
        </div>

        <div v-if="showTab" style="width:100%;height:220px">
            <dv-scroll-board :config="config" style="width:100%;height:220px" />
        </div>

        <div v-if="showTab2" style="width:100%;height:220px">
            <!-- <dv-decoration-12 style="width:150px;height:150px;margin: 0 auto;margin-top: 40px" /> -->
            <dv-decoration-3 style="width: 600px;height:100px;margin: 0 auto;margin-top: 40px" />
        </div>

        <div v-if="showText" class="introduceText">
            <div class="introduceCard">
                <div class="introduceTit">总体目标</div>
                <div class="introduceCont">
                    通过组织开展第一次全国自然灾害综合风险普查，摸清全国自然灾害风险隐患底数，查明重点区域减灾能力，客观认识全国和各地区自然灾害综合风险水平，为中央和地方各级政府有效开展自然灾害防治和应急管理工作、切实保障经济社会可持续发展提供权威的自然灾害风险信息和科学决策依据。
                </div>
            </div>
            <div class="introduceCard">
                <div class="introduceTit">主要任务</div>
                <div class="introduceCont">
                    开展地震灾害、地质灾害、气象灾害、水旱灾害、海洋灾害、森林和草原火灾等主要自然灾害风险要素全面调查，突出地震、洪水、台风、地质灾害，开展自然灾害重点隐患调查与评估，查明区域减灾能力，建立分区域、分类型、分要素的国家自然灾害综合风险与减灾能力数据库；开发主要自然灾害风险和减灾能力评估与制图系统，开展主要自然灾害风险评估，编制全国 1:100 万、省级 1:25 万、重点地区市县级 1:5 万或 1:10 万主要自然灾害系列风险图，修订主要自然灾害区划，编制自然灾害综合风险区划和自然灾害综合防治区划。
                </div>
            </div>
            <div class="introduceCard">
                <div class="introduceTit">灾种</div>
                <div class="introduceCont">
                    是对能够给人类和人类赖以生存的环境造成破坏性影响的事件。纵观人类的历史可以看出，灾害的发生原因主要有二个：一是自然变异，二是人为影响。因此，通常把以自然变异为主因的灾害称之为自然灾害，如地震、风暴、海啸；将以人为影响为主因的灾害称之为人为灾害，如人为引起的火灾、交通事故和酸雨等。影响自然灾害灾情大小的因素有三个：一是孕育灾害的环境（孕灾环境），二是导致灾害发生的因子（致灾因子），三是承受灾害的客体（受灾体）。
                </div>
            </div>
            <div class="introduceCard">
                <div class="introduceTit">致灾因子</div>
                <div class="introduceCont">
                    即由孕灾环境产生的各种异动因子。其是由各种自然异动（暴雨、雷电、台风、地震等）、人为异动（操作管理失误、人为破坏等）、技术异动（机械故障、技术失误等）、政治经济异动（能源危机、金融危机等）等产生的。
                </div>
            </div>
            <div class="introduceCard">
                <div class="introduceTit">承灾体</div>
                <div class="introduceCont">
                    承灾体是指直接受到灾害影响和损害的人类社会主体。主要包括人类本身和社会发展的各个方面，如工业、农业、能源、建筑业、交通、通信、教育、文化、娱乐、各种减灾工程设施及生产、生活服务设施，以及人们所积累起来的各类财富等。
                </div>
                
                <div class="introduceCont">
                    承灾体受灾害的程度，除与致灾因子的强度有关外，很大程度上取决于承灾体自身的脆弱性。
                </div>
                <div class="introduceCont">
                    承受灾害的对象称为承灾体。研究目标不同，承灾体的层次也不同，主要有宏观承灾体和微观承灾体之分。
                </div>
            </div>
        </div>

        <div v-show="showImg"  class="contentBox">
            <div class="mapBox iiiiBox" id="map" >

            </div>
            <div class="imgBox iiiiBox">
                 <el-image :src='srcs' class="imgs" >
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                 </el-image>
            </div>
        </div>

         
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import AMap from 'AMap';
var AAAmap, mouseTool,overlays= [],heatmap,infoWindow,imageLayer1,myChart,satelliteLayer ;

export default {
name: '',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    srcs: 'http://192.168.1.109:9528/files/base/test/空.png',
    times: '', 
    disaster: '', 
    disasterName: '',
    disasterArr:[
        {
            value: 'baoyu',
            label: '暴雨'
        },
        {
            value: 'gaowen',
            label: '高温'
        },
        {
            value: 'diwen',
            label: '低温'
        },
        {
            value: 'bingbao',
            label: '冰雹'
        },
        {
            value: 'ganhan',
            label: '干旱'
        },
        {
            value: 'dafeng',
            label: '大风'
        },
        {
            value: 'xuezai',
            label: '雪灾'
        },
        {
            value: 'leidian',
            label: '雷电'
        }
    ],
    causeDisaster: '',
    causeDisasterArr:[],
    bear: '',
    bearName: '',
    bearArr:[
        {
            value: 'rk',
            label: '人口'
        },
        {
            value: 'jj',
            label: '经济'
        },
        {
            value: 'xm',
            label: '小麦'
        },
        {
            value: 'ym',
            label: '玉米'
        },
        {
            value: 'sd',
            label: '水稻'
        },
    ],
    product: '',
    productArr:[
        {
            value: '1',
            label: '危险性评估图'
        },
        {
            value: '2',
            label: '风险图'
        },
        {
            value: '3',
            label: '风险分区图'
        },
    ],
    config:{
        header: ['农作物', '灾害时间', '当年该区域GDP（万元）','直接经济损失（万元）','受灾人口','受灾面积'],
        data: [
            ['棉花', '2017-07-13', '300','20', '60', '30'],
            ['水稻', '2017-07-13', '300','20', '60', '30'],
            ['玉米', '2017-07-13', '300','20', '60', '30'],
            ['小麦', '2017-07-13', '300','20', '60', '30'],
            ['棉花', '2017-07-13', '300','20', '60', '30'],
            ['水稻', '2017-07-13', '300','20', '60', '30'],
            ['玉米', '2017-07-13', '300','20', '60', '30'],
            ['小麦', '2017-07-13', '300','20', '60', '30'],
            ['棉花', '2017-07-13', '300','20', '60', '30'],
            ['水稻', '2017-07-13', '300','20', '60', '30']
        ],
        waitTime: '300',
        hoverPause: false,
        align: ['center','center','center','center','center','center']
    },
    showTab: false,
    showTab2: false,
    showImg: false,
    showText: true,

    userInfo: {},
    area: {},
    productUrl: '',
    showBtn:  false
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

    GaodeMap(){
        // 初始化地图
        let map = new AMap.Map('map', {
          center: [124.563961,46.387851], // [纬度，经度]
          resizeEnable: true, 
          zoom: 8
        });  
        AAAmap = map;

        satelliteLayer = new AMap.TileLayer.Satellite({
          zIndex: 4
        });
        
        AAAmap.add( satelliteLayer );
        mouseTool = new AMap.MouseTool(AAAmap);  
        // 信息窗口
        infoWindow = new AMap.InfoWindow({
        isCustom:	false,  //是否自定义窗口
        draggable: false,  //是否可拖动
        offset: new AMap.Pixel(0, -31),
        content: ""
      });
    },
    // 区域轮廓
    getOutline(cityName){
        let district = null;
        let polygons=[];
        function drawBounds() {
            //加载行政区划插件
            if(!district){
                //实例化DistrictSearch
                let opts = {
                    subdistrict: 0,   //获取边界不需要返回下级行政区
                    extensions: 'all',  //返回行政区边界坐标组等具体信息
                    level: 'district'  //查询行政级别为 市
                };
                district = new AMap.DistrictSearch(opts);
            }
            //行政区查询
            district.setLevel('city')
            district.search( cityName, function(status, result) {
                AAAmap.remove(polygons)//清除上次结果
                polygons = [];
                let bounds = result.districtList[0].boundaries;
                if (bounds) {
                    for (let i = 0, l = bounds.length; i < l; i++) {
                        //生成行政区划polygon
                        let polygon = new AMap.Polygon({
                            strokeWeight: 2,
                            path: bounds[i],
                            fillOpacity: 0,
                            fillColor: '#80d8ff',
                            strokeColor: '#dd1616'
                        });
                        polygons.push(polygon);
                    }
                }
                AAAmap.add(polygons)
               // AAAmap.setFitView(polygons);//视口自适应
            });
        }
        drawBounds();
   
    }, 
    init1 (city) {//区域遮盖
        let that =this
        AAAmap.plugin('AMap.DistrictSearch', function () {
            new AMap.DistrictSearch({
                extensions: 'all',
                subdistrict: 0
            }).search(city, function(status, result) {// 外多边形坐标数组和内多边形坐标数组
                let outer = [
                new AMap.LngLat(-360, 90, true),
                new AMap.LngLat(-360, -90, true),
                new AMap.LngLat(360, -90, true),
                new AMap.LngLat(360, 90, true)
                ]
                let holes = result.districtList[0].boundaries
                let pathArray = [outer]
                pathArray.push.apply(pathArray, holes)
                that.polygon = new AMap.Polygon({
                    pathL: pathArray,
                    strokeColor: 'red',//城市边界颜色
                    strokeWeight: 2,
                    fillColor: '#00000999', // 遮罩背景色黑色
                    fillOpacity: 1
                })
                that.polygon.setPath(pathArray)
                AAAmap.add(that.polygon)
            })
        })
    },

    imgLayer(img){
        // let imageLayer = new AMap.ImageLayer({
        //     url: 'http://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg',
        //     bounds: new AMap.Bounds(
        //         [116.327911, 39.939229],
        //         [116.342659, 39.946275]
        //     ),
        //     // zooms: [15, 18]
        // });

        let startPoint,endPoint;

        if( this.userInfo.areaName == '黑龙江省' ){
            startPoint = [122.5, 43.0];
            endPoint = [136.0, 53.54];
            AAAmap.setZoom('6')

        }else if(this.userInfo.areaName == '大庆市'){
            startPoint = [123.7, 45.38];
            endPoint = [125.9, 47.5];
            AAAmap.setZoom('8')
        }else if(this.userInfo.areaName == '林甸县'){
            startPoint = [124.33, 46.82];
            endPoint = [125.36, 47.48];
            
            AAAmap.setZoom('9')
        }

        
        let center = [this.area.longitude,this.area.latitude]
        
        AAAmap.setCenter(center)



        let imageLayer = new AMap.ImageLayer({
            // url: 'http://192.168.1.109:9528/files/base/test/' + this.userInfo.areaCode + '_1.png',
            url: img,
            bounds: new AMap.Bounds(
                startPoint,
                endPoint
            ),
            // zooms: [15, 18]
        });
        // var map = new AMap.Map('container', {
        //     resizeEnable: true,
        //     center: [116.33719, 39.942384],
        //     zoom: 15,
        //     layers: [
        //         new AMap.TileLayer(),
        //         imageLayer
        //     ]
        // });
        AAAmap.add(imageLayer);
        AAAmap.setFitView(imageLayer);
    },

    //  搜索
    search(){ 
        this.showTab = true;
        this.showImg = false;
        this.showTab2 = true;
        this.showText = false;

        let api = '/api/zhfx/makePic';
        this.$axios.get(api,{
            params:{
                ele: this.disaster,
                type: this.product,
                disasterBody: this.bear,
                startTime: this.times[0],
                endTime: this.times[1]
            }
        }).then((res)=>{
            console.log(res)
            let data = res.data.data.content.picList;
            console.log( data[0] )
            console.log( data[1] )

            this.showImg = true;
            this.showTab2 = false;

            this.productUrl = res.data.data.content.productUrl;
            
            this.config={
                header: ['农作物', '灾害时间', '当年该区域GDP（万元）','直接经济损失（万元）','受灾人口','受灾面积'],
                data: [
                    ['棉花', '2017-07-13', '300','20', '60', '30'],
                    ['水稻', '2017-07-13', '300','20', '60', '30'],
                    ['玉米', '2017-07-13', '300','20', '60', '30'],
                    ['小麦', '2017-07-13', '300','20', '60', '30'],
                    ['棉花', '2017-07-13', '300','20', '60', '30'],
                    ['水稻', '2017-07-13', '300','20', '60', '30'],
                    ['玉米', '2017-07-13', '300','20', '60', '30'],
                    ['小麦', '2017-07-13', '300','20', '60', '30'],
                    ['棉花', '2017-07-13', '300','20', '60', '30'],
                    ['水稻', '2017-07-13', '300','20', '60', '30']
                ],
                waitTime: '300000',
                hoverPause: false,
                align: ['center','center','center','center','center','center']
            };
            
            this.imgLayer(data[0]);


            this.srcs = data[1];

            this.showBtn = true;

        })
        // this.config.waitTime = '30000';
        console.log( this.times )
        // let _that = this

        // setTimeout(() => {
            
        //     this.showImg = true;
        //     this.showTab2 = false;

        //     this.config={
        //         header: ['农作物', '灾害时间', '当年该区域GDP（万元）','直接经济损失（万元）','受灾人口','受灾面积'],
        //         data: [
        //             ['棉花', '2017-07-13', '300','20', '60', '30'],
        //             ['水稻', '2017-07-13', '300','20', '60', '30'],
        //             ['玉米', '2017-07-13', '300','20', '60', '30'],
        //             ['小麦', '2017-07-13', '300','20', '60', '30'],
        //             ['棉花', '2017-07-13', '300','20', '60', '30'],
        //             ['水稻', '2017-07-13', '300','20', '60', '30'],
        //             ['玉米', '2017-07-13', '300','20', '60', '30'],
        //             ['小麦', '2017-07-13', '300','20', '60', '30'],
        //             ['棉花', '2017-07-13', '300','20', '60', '30'],
        //             ['水稻', '2017-07-13', '300','20', '60', '30']
        //         ],
        //         waitTime: '300000',
        //         hoverPause: false,
        //         align: ['center','center','center','center','center','center']
        //     };
            
        //     this.imgLayer();

        //     this.srcs = 'http://192.168.1.109:9528/files/base/test/'+ _that.userInfo.areaCode +'.png'



        // }, 6000);

    },
    //  保存
    holdReport(){
        // this.showBtn = false;
        // window.open(this.productUrl);
        console.log(this.product)
        let zai,name;
        if(this.product == 1){
                zai = '危险性评估报告'
        }else if(this.product == 2){
                zai = '风险报告'
        }else if(this.product == 3){
                zai = '风险分析报告'
        }

        if( this.product == 2){
            name = this.disasterName + '灾害' + zai + '('+ this.bearName+')'
        }else{
            name = this.disasterName + '灾害' + zai
        }

        

        
        const api = '/api/zhfx/riskReport';
        this.$axios.post(api,{
            name: name,
            filePath: this.productUrl
        }).then((res)=>{
            console.log(res)
        })
    },
    changeDisaster(a){  
        let name = this.disasterArr.filter( item=> item.value == a )[0].label;
        this.disasterName = name;
    },
    //  获取该地区信息
    getUserInfo(){ 
      let userInfo = JSON.parse( sessionStorage.getItem('user') ); 
      let area = JSON.parse( sessionStorage.getItem('area') );
      this.area = area;
      this.userInfo = userInfo;
    },
    changeBear(a){
        console.log(a)
        let name = this.bearArr.filter( item=> item.value == a )[0].label;

        this.bearName = name;
    }
    
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.GaodeMap();
    this.getUserInfo();
    // this.init1( '大庆' );
    // this.getOutline('大庆市');
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
@import '../../../../assets/css/styles.css';

.container{
    flex: 1;
    height: 200px;
    min-width: 760px;
    .crumbs{
        font-size: 24px;
        font-weight: 400;
        color: #9FC8F2;
        height: 44px;
        line-height: 44px;
    }
    .searchBox{
        height: 90px;
        min-width: 370px;
        background-color: #011C3A;
        border-radius: 6px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        margin-bottom: 30px;
        .iListBox{
            display: flex;
            align-items: center;
            margin-right: 40px;
            .iListLable{
                margin-right: 20px;
            }
        }
    } 

    .contentBox{
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
        background-color: #011C3A;
        margin: 10px auto;
        display: flex;
        flex-wrap: wrap;
        .mapBox{
            width: 49%;
            min-width: 600px;
            height: 620px;
            margin-right: 2%; 
        }
        .imgBox{
            width: 49%;
            min-width: 600px;
            height: 620px;
            .imgs{
                width: 100%;
                height: 100%;
            }
        }
    }
    .introduceText{
        .introduceCard{
            .introduceTit{
                font-size: 16px;
                color: rgb(193, 226, 240);
                font-weight: 600;
            }
            .introduceCont{
                box-sizing: border-box;
                padding: 20px 40px;
                font-size: 14px;
                background-color: #011C3A;
                margin: 10px 0;
                letter-spacing: 4px;
                line-height: 26px;
                border-radius: 6px;
            }
        }
    }
    
    .handleIconBox{
        display: inline-block;
        font-size: 18px;
        margin: 0 6px;
        &:hover{
            cursor: pointer;
            color: cyan;
        }
    }





 
}
</style>