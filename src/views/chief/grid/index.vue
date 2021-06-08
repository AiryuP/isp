<!--  -->
<template>
    <div class="">
        <div id="SceneView"></div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import * as esriLoader from 'esri-loader'
import { loadModules } from "esri-loader";
import axios from 'axios';

export default {
name: 'grid',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
//创建视图
    createView() {
      let options = {
        url: 'https://js.arcgis.com/4.15/',
        // css: "https://js.arcgis.com/4.15/esri/themes/light/main.css"
      };
    
      let SCALE_MIN = 18480000;
      let SCALE_MAX = 560000;
      let SCALE_DEFAULT = 2311162.217155;

    //   SceneView, "esri/views/SceneView",
 
      loadModules(["esri/Map","esri/views/MapView", "esri/Basemap","esri/layers/TileLayer","esri/Graphic"], options).then(
        ([Map,MapView,Basemap,TileLayer,Graphic]) => {

             let basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
                    })
                ],
                title: "矢量图",
                id: "basemap",
                thumbnailUrl: "/img/map/BasemapGallery_Vector.png"
            })

            let map = new Map({
                basemap: basemap,
            })
    
            let view = new MapView({
                map: map, 
                container: "SceneView", 
                center: [125.03, 46.46],
                scale: SCALE_DEFAULT,
                maxScale: SCALE_MAX,
                minScale: SCALE_MIN
            });
 
            let data = {
                file_date: '20200819',
                time1: '00',
                time_interval: '3',
                long_time: '003',
                ele: '2t',
                pattern: 'ZYT'
            }

            axios.post("http://122.156.220.178:5556/DaqingProject/putGIS",data).then(response => {
                var gdData1 = response.data;
                var gdData = gdData1.data;
                window.data = gdData;
                console.log(gdData);
                console.log(Number(gdData.start_lon) + 0.1)
                console.log(gdData.result.length);
                console.log(gdData.result[1].length-27);
                console.log(gdData.result[46][0]);
                console.log(gdData.lon_array[1]);
                console.log(gdData.lon_array.length);
                console.log(gdData.lat_array.length);
                console.log(0.1 * 2)
                console.log(0.1 * (1+1))
                var lat = [];
                for(var i = gdData.lat_array.length - 1;i>=0;i--){
                    lat.push(gdData.lat_array[i]);

                }
                console.log(lat)
                console.log(lat.length)
                        
                                
                            
                for(var i = 0;i<gdData.result.length - 28;i++){
            
                    for(var j = 0;j<gdData.result[0].length - 32;j++){
                        
                        var gd_lon = gdData.lon_array[j];
                        
                        var gd_lat = lat[i];
                        
                        var gd_num = gdData.result[i][j];

                        
                        var wg_lon_left = (Number(gdData.start_lon)+(0.14*j)).toFixed(3);
                        var wg_lon_right = (Number(gdData.start_lon) +(0.14*(j+1))).toFixed(3);
                        var wg_lat_up = (Number(gdData.end_lat) - (0.12*i)).toFixed(3);
                        var wg_lat_down = (Number(gdData.end_lat) - (0.12*(i+1))).toFixed(3);
                        // console.log(Math.round(gd_num * 100) / 100)
                        var polygon = {
                            type: "polygon", // autocasts as new Polygon()
                            rings: [
                                [wg_lon_left, wg_lat_up],
                                [wg_lon_left, wg_lat_down],
                                [wg_lon_right, wg_lat_down],
                                [wg_lon_right, wg_lat_up]
                            ],
                            
                            };
                            function getColor(d) {
                            let defaultGrades = [-7.4, 3.8, 5.0, 6.2, 7.4, 8.6, 9.8, 11.0, 12.2, 13.4, 14.6, 15.8, 17.0, 18.2, 19.4, 20.6, 21.8, 23.0, 24.2, 25.4, 26.6, 27.8];
                            let defaultColors = ['#7AFEC6', '#4DFFFF', '#80FFFF', '#4EFEB3', '#53FF53', '#28FF28', '#00EC00', '#00DB00', '#00BB00', '#73BF00', '#8CD900', '#9AFF02', '#F9F900', '#FFE153', '#E1E100', '#EAC100', '#FFA042', '#FF9224', '#FF8000', '#EA7500', '#FF5809', '#D94600'];
                            let grades = defaultGrades;
                            let colors = defaultColors;
                            return d > grades[21] ? colors[21] :
                            d > grades[20] ? colors[20] :
                            d > grades[19] ? colors[19] :
                            d > grades[18] ? colors[18] :
                            d > grades[17] ? colors[17] :
                            d > grades[16] ? colors[16] :
                            d > grades[15] ? colors[15] :
                            d > grades[14] ? colors[14] :
                            d > grades[13] ? colors[13] :
                            d > grades[12] ? colors[12] :
                            d > grades[11] ? colors[11] :
                            d > grades[10] ? colors[10] :
                            d > grades[9] ? colors[9] :
                            d > grades[8] ? colors[8] :
                            d > grades[7] ? colors[7] :
                            d > grades[6] ? colors[6] :
                            d > grades[5] ? colors[5] :
                            d > grades[4] ? colors[4] :
                            d > grades[3] ? colors[3] :
                            d > grades[2] ? colors[2] :
                            d > grades[1] ? colors[1] :
                            // d > grades[0] ? colors[0] :
                            colors[0];
                        }
                            var color_data = getColor(gd_num);
                        
                            function hexToRgba(hex, opacity) {
                            return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
                            };
                        
                            var fillSymbol = {
                            type: "simple-fill", // autocasts as new SimpleFillSymbol()
                            color: hexToRgba(color_data,0.4),
                            outline: {
                                color: [255, 255, 255],
                                width: 0
                            }
                            };
                    
                            var polygonGraphic = new Graphic({
                            geometry: polygon,
                            symbol: fillSymbol
                            });
                            view.graphics.add(polygonGraphic);



                        var point = {
                            type: "point", // autocasts as new Point()
                            longitude: Number(wg_lon_left) + 0.06,
                            latitude: Number(wg_lat_up) - 0.06
                        };
                
                        

                        var markerSymbol = {
                            type: "text",
                            color: [0, 0, 0],
                            text: Math.round(gd_num * 100) / 100,
                            font:  {
                                size: 10,
                                family: "Josefin Slab"
                            }
                            
                        };
                
                        var pointGraphic = new Graphic({
                            geometry: point,
                            symbol: markerSymbol,
                            
                        });
                        
                        view.graphics.add(pointGraphic);


                        
                    }
                }
                
            });






        }
      );
    }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.createView();
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
    min-width: 1920px !important;
    overflow: auto !important;
    position: relative;
    #SceneView {
    //   position: absolute;
    width: 100%;
    // height: 860px;
    height: calc(100vh - 120px);
    overflow: hidden;
    }
}
</style>