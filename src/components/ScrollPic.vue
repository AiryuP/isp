<!--  -->
<template>
    <div class='container'>
        <div class="time">
            <div class="title">时间</div>
            <div class="timeCont">
                <div class="timeList" v-for="(item,index) in myData" :class=" startIndex == index ? 'active': '' " @click="activeIt(index,item)" :key="index">
                    <div class="icon "></div>
                    <div class="times">{{ item.time }}</div>
                </div>
            </div>
            <div class="btns">
                <div class="play" @click="play"></div>
            </div>
        </div>
        <div class="imgBox"  >
            <div class="imgs" :class="[ mode == 'radar' ? 'radarBox' : '', mode == 'cloud' ? 'cloudBox' : '']">
                <img style="width:100%;height: 100%" :src="imgUrl" alt="">
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
name: 'ScrollPic',
//import引入的组件需要注入到对象中才能使用
components: {},
props:{
    mode: String,
    datass: Object,
},
data() {
//这里存放数据
return {
    myData: this.datass,
    imgUrl: '',

    timer: null,  //  定时器

    startIndex: 0,
    flagIndex: 6,
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    play(){
        let index = this.flagIndex;
        let that = this;
        this.timer = setInterval(() => {
            

            index += 1;

            console.log( index )

            console.log( that.myData.length )
            
            if( index == that.myData.length ){
                index = 0;
                console.log( 'index' )
            }
            that.startIndex = index;

            that.imgUrl = that.myData[index].img;

            console.log( index )

            
            if(index == that.flagIndex){
                console.log('xxxxxxxxxx') 
                clearInterval(that.timer);       
                that.timer = null;
            }

        }, 1000);
    },
    activeIt( num ,item ){
        console.log(item)
        this.startIndex = num
        this.flagIndex= num
        this.imgUrl = item.img
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.startIndex = this.myData.length - 1 ;
    this.flagIndex= this.startIndex;
    this.imgUrl = this.myData[this.startIndex].img;
  
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {
    clearInterval(this.timer);       
    this.timer = null;
}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.container{
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    // padding-top: 30px;
    margin-bottom: 40px;
    width: 100%;
    .time{
        width: 260px;
        box-sizing: border-box;
        padding: 0 0 10px 0;
        margin-bottom: 10px;
        .title{
            background-color: #06395B;
            color: #FFFFFF;
            height: 48px;
            box-sizing: border-box;
            padding-left: 40px;
            line-height: 48px;
            border-radius: 6px 6px 0px 0px;
        }
        .timeCont{ 
            width: 100%;
            height: 630px;
            background: #011C3A;
            border-radius: 0px 0px 6px 6px;
            box-sizing: border-box;
            padding: 20px 0;
            margin: 0 auto;
            overflow: auto;
            .timeList{
                width: 80%;
                margin: 6px auto;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                .icon{
                    width: 10px;
                    height: 10px;
                    margin: 0 20px;
                    background: #03254B;
                    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                    border-radius: 50%;
                    opacity: 1;
                }
                .times{
                    width: 120px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    background: #03254B;
                    opacity: 1;
                    border-radius: 4px;
                }
                &:hover{
                    cursor: pointer;
                }
            }
            .active{
                // margin-top: 30px;
                .icon{
                    width: 14px;
                    height: 14px;
                    margin: 0 18px;
                    background: #198cd8;
                }
                .times{
                    background: #06395B;
                }
            } 
        } 
        .timeCont::-webkit-scrollbar {/*滚动条整体样式*/
            width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 8px;
            scrollbar-arrow-color:red;

        }
        .timeCont::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 6px;
            -webkit-box-shadow: inset 0 0 6px #06395B;
            background: #3886b9;
            scrollbar-arrow-color:red;
        }
        .timeCont::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 6px #06395B;
            border-radius: 0;
            background: rgba(0,0,0,0.1);
        }
        .btns{
            height: 50px;
            background-color: #011C3A;
            display: flex;
            justify-content: center;
            align-items: center;
            .play{
                width: 32px;
                height: 32px;
                background: url('../assets/images/zaihai/play.png');
                background-size: 100%;
                &:hover{
                    cursor: pointer;
                }
            }
        }
    }
    .imgBox{ 
        border-radius: 6px;
        width: 80%;
        position: relative;
        flex-shrink: 0;
        .imgs{
            width: 100%;
            height: calc(100vh - 200px);
            min-width: 819px;
            min-height: 510px; 
            margin: 0 auto;
            max-height: 729px;
        }
        .radarBox{
            max-width: 972px;
            height: 729px; 
        }
        .cloudBox{
            max-width: 1170px;
            height: 729px; 
        }
        
    }
    
}
</style>