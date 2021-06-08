<!--  -->
<template>
<div class='container'>
    <div class="map" id="map">

    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
var AAAmap, mouseTool,overlays= [],heatmap,infoWindow,imageLayer1,myChart,satelliteLayer ;

export default {
name: 'live',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    stationArr: []
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    GaodeMap(){
        //  获取所在地经纬度
        let area = JSON.parse(sessionStorage.getItem('area'));
        let arr = [area.longitude,area.latitude]
        // 初始化地图
        let map = new AMap.Map('map', {
          center: arr, // [纬度，经度]
          resizeEnable: true, 
          zoom: 6
        });  
        AAAmap = map;
        window.iMap = map;

        satelliteLayer = new AMap.TileLayer.Satellite({
          zIndex: 4
        });
        
        AAAmap.add( satelliteLayer );
        mouseTool = new AMap.MouseTool(AAAmap);  
        // 信息窗口
        infoWindow = new AMap.InfoWindow({
        isCustom:	true,  //是否自定义窗口
        draggable: false,  //是否可拖动
        offset: new AMap.Pixel(0, -31),
        content: ""
      });
    },
    //  标记点
    setMakers(){
         
          let data = [
              {lon: '124.749014',lat: '46.588406',stationNum: '1'},
              {lon: '124.856835',lat: '46.808799',stationNum: '2'},
              {lon: '124.430721',lat: '46.295579',stationNum: '3'},
              {lon: '124.825729',lat: '46.076301',stationNum: '4'},
              {lon: '125.141685',lat: '46.683878',stationNum: '5'},
              {lon: '124.980147',lat: '46.760018',stationNum: '6'},
              {lon: '124.773123',lat: '47.021388',stationNum: '7'},
          ]
          let _that = this;
          let allMarker= []
          data.map((e) => { 
              let marker = new AMap.Marker({
                position: new AMap.LngLat(e.lon, e.lat),
                icon: require( '../../../../assets/images/mapIcon/zidongzhan.png' ),
                offset: new AMap.Pixel(-13, -30)
              }); 
              marker.stationId = e.stationNum;
          //     marker.name = e.schoolName;
          //     marker.pointData = e; 
              marker.on('click', e => {
          //     infoWindow.setContent(this.createInfoWindow(e.target.pointData)); 
              // infoWindow.open(AAAmap,  e.target.getPosition()  );
                //   _that.getStationInfoData(e)
                console.log(e)
                _that.openInfo(e)
              }); 
              allMarker.push(marker)
          }) 
          this.stationArr = allMarker;
          this.setMarker( this.stationArr );
    },
    // 设置地图marker
    setMarker(markerList) { 
       // 将 markers 添加到地图
        AAAmap.add(markerList);
    }, 
    //  打开弹窗
    openInfo(e){

            let data ;
            if(e.target.stationId == 1){
                data = {
                    
                }
            }else{
                data = {
                    'title': '这是一个标题'
                }
            }

        
            infoWindow.setContent( this.createInfoWindow( data ) ); 
            infoWindow.open(AAAmap,  e.target.getPosition()  ); 
    },
    // 自定义信息窗体  
    createInfoWindow(data) {
        
        let info ;
        if( JSON.stringify(data)=="{}" ){
          info = '<div class="iiiis" style="box-sizing: border-box;color: #000;padding: 25px;padding-top: 10px">'
               + '<div style="background-color: #06395B; height: 48px; display: flex;justify-content: flex-end;" >'
               + '<div style="color: #fff;line-height: 48px;margin-right: 10px;cursor: pointer;" onclick="window.iMap.clearInfoWindow()" >X</div>'
               + '</div>'
               + '<div style="width: 240px;height: 200;background-color: #011C3A;line-height: 200px;text-align: center;color: #3c9bc3">暂无数据!</div>'
                
               + '</div>' 
        }else{
          info = '<div style="width: 710px;box-sizing: border-box;color: #000;">'
               + '<div style="background-color: #06395B; color: #fff; height: 48px; display: flex;align-items: center;" >'
               + '<div style="width: 180px;box-sizing: border-box;padding-left: 10px;">实况</div>'
               + '<div style="width: 510px;box-sizing: border-box;padding-left: 10px;">预报</div>'
               + '<div style="color: #fff;line-height: 48px;margin-right: 10px;cursor: pointer;" onclick="window.iMap.clearInfoWindow()" >X</div>'
               + '</div>'
               + '<div style="height: 340px;display: flex">'
               + '<div style="box-sizing: border-box;padding-left: 10px;background-color:#022140;height: 340px;width: 180px">'
               + '</div>'
               + '<div style="box-sizing: border-box;padding-left: 10px;background-color:#011C3A;height: 340px;width: 530px">'
               + '</div>'
               + '</div>'
               + '</div>' 
        }
 

        return info;
    },
    aaa (){
        console.log('aaaaaaaaaaaaaaaaaaaaa')
        AAAmap.clearInfoWindow();
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.GaodeMap();
    this.setMakers();
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
.iiiis{
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
}
.container{
    flex: 1;
    height: 200px;
    #map{
        width: 100%;
        height: calc(100vh - 120px);
    }





}

</style>