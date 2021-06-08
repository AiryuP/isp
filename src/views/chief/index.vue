<!--  -->
<template>
    <div class='container'>
        <div class="isp_header">
            <div class="isp_date">
                <div>2021/03/08</div>
                <div>星期一</div>
                <div></div>
            </div>
            <div class="isp_user">
                <!-- <el-badge :value="12" class="item">
                    <el-button size="small">评论</el-button>
                </el-badge> -->
                <div>
                    <el-badge :value="12" class="item">
                        <img src="../../assets/images/chief/xinxi.png" alt="">
                    </el-badge>
                </div>
                <div>
                    <el-badge :value="12" class="item">
                        <img src="../../assets/images/chief/通知.png" alt="">
                    </el-badge>
                </div>
                <div>
                    <img src="../../assets/images/chief/tuichu.png" alt="">
                </div>
                <div  class="logout" @click="logout">退出</div>
            </div>
            <div class="isp_title">
                <div class="text">智 慧 气 象 综 合 业 务 平 台</div>
                <div class="subText">Intelligent meteorological integrated service platform</div>
            </div>
        </div>
        <div class="tabCardLeft">
            <div class="tabCards" :class="isActive == 'monitor' ? 'iActive' : ''" @click="toMonitor">首页</div>
            <div class="tabCards" :class="isActive == 'analyse' ? 'iActive' : ''" @click="toTexts">实况分析</div>
            <div class="tabCards" :class="isActive == 'smon' ? 'iActive' : ''" @click="toSmon">监控</div>
            <div class="tabCards" :class="isActive == 'grid' ? 'iActive' : ''" @click='toGrid' >格点预报</div>
        </div>
        <div class="tabCardRight">
            <div class="tabCards" @click="toHome">业务平台</div>
            <div class="tabCards">选项二</div>
            <div class="tabCards">选项三</div>
            <div class="tabCards">选项四</div>
        </div>
        <div class="isp_body">
            <router-view/>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    name: '',
    props: {
        
    },
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
    //这里存放数据
        return {
            isActive: 'monitor'
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        toMonitor(){
            this.isActive = 'monitor'
            this.$router.push({
                path: '/monitor'
            })
        },
        toTexts(){
            this.isActive = 'analyse'
            this.$router.push({
                path: '/analyse'
            })
        },
        toSmon(){
            this.isActive = 'smon';
            this.$router.push({
                path: '/smon'
            })
        },
        toGrid(){
            this.isActive = 'grid';
            this.$router.push({
                path: '/grid'
            })
        },
        toHome(){
            this.$router.push({
                path: '/home'
            })
        },
        // 退出
        logout(){
        sessionStorage.clear();
        this.$router.go(0);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

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
    .isp_header{
        height: 100px;
        width: 100%;
        background: url('../../assets/images/chief/isp_header.png') no-repeat;
        background-size: cover;
        // position: relative;
        .isp_date{
            // position: absolute;
            float: left;
            height: 60px;
            display: flex;
            div{
                margin-left: 20px;
                height: 60px;
                line-height: 60px;
                color: #6984C1;
                font-size: 16px;
                font-weight: 400;
            }
            

        }
        .isp_title{
            margin: 0 auto;
            color: #FFFFFF; 
            width: 480px;
            position: relative;
            .text{
                text-align: center;
                line-height: 100px;
                font-size: 36px; 
                font-weight: 400;
            }
            .subText{
                position:  absolute;
                bottom: 10px;
                left: 65px;
                font-size: 16px;
            }
        }
        .isp_user{
            float: right;
            height: 60px;
            display: flex;
            align-items: center;
            div{
                margin-right: 20px;
            }
            .logout{
                &:hover{
                    cursor: pointer;
                }
            }
        }
    }
    .tabCardLeft{
        position: absolute;
        height: 40px;
        width: 560px;
        top: 80px;
        left: 20px;
        display: flex;
        z-index: 10;
        .tabCards{
            width: 140px;
            height: 40px;
            font-size: 16px;
            font-weight: 400;
            line-height: 40px;
            text-align: center;
            background-color: #06395B;
            &:hover{
                background-color: #266e9e;
                cursor: pointer;
            }
        }
        .iActive{
            background-color: #0199E8;
        }
    }
    .tabCardRight{
        position: absolute;
        height: 40px;
        width: 560px;
        top: 80px;
        right: 20px;
        display: flex;
        z-index: 10;
        .tabCards{
            width: 140px;
            height: 40px;
            font-size: 16px;
            font-weight: 400;
            line-height: 40px;
            text-align: center;
            background-color: #06395B;
            &:hover{
                background-color: #2587c9;
                cursor: pointer;
            }
        }
    }
    .isp_body{
        // height: 800px;
        box-sizing: border-box;
        padding-top: 20px;
        // padding-left: 20px;
        // padding-right: 20px;
    }
}
</style>