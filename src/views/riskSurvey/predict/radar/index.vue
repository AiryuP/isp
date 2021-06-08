
<!--  -->
<template>
    <div class='container'>
        
        <div class="crumbs">
            风险普查—雷达监测
        </div>
        <div class="searchBox">
            <div class="iListBox">
                <div class="iListLable">查询</div>
                <div class="iListConent">
                    <el-input  v-model="searchTime" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div>
                <el-button type="primary" size="small" @click="search">搜索</el-button>
            </div>
        </div>

        <div class="content">
            <ScrollPic mode="radar" :datass='idata' ></ScrollPic>
        </div>
 
 
    

    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import ScrollPic from '@/components/ScrollPic';

export default {
name: 'radar',
//import引入的组件需要注入到对象中才能使用
components: {
    ScrollPic: ScrollPic
},
data() {
//这里存放数据
return {
    searchTime: '',
    idata: [
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/RDCP/medium/SEVP_AOC_RDCP_SLDAS_EBREF_ACHN_L88_PI_20210607040600001.PNG?v=1623039472629'
          },
          {
            time: '06/01 17:00',
            img: 'http://image.nmc.cn/product/2021/06/07/RDCP/medium/SEVP_AOC_RDCP_SLDAS_EBREF_ACHN_L88_PI_20210607041200001.PNG?v=1623039826065'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/RDCP/medium/SEVP_AOC_RDCP_SLDAS_EBREF_ACHN_L88_PI_20210607041800001.PNG?v=1623040189618'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/RDCP/medium/SEVP_AOC_RDCP_SLDAS_EBREF_ACHN_L88_PI_20210607042400001.PNG?v=1623040549790'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/RDCP/medium/SEVP_AOC_RDCP_SLDAS_EBREF_ACHN_L88_PI_20210607043000001.PNG?v=1623040898091'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/RDCP/medium/SEVP_AOC_RDCP_SLDAS_EBREF_ACHN_L88_PI_20210607043600001.PNG?v=1623041272640'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/RDCP/medium/SEVP_AOC_RDCP_SLDAS_EBREF_ACHN_L88_PI_20210607044200001.PNG?v=1623041632791'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/RDCP/medium/SEVP_AOC_RDCP_SLDAS_EBREF_ACHN_L88_PI_20210607044800001.PNG?v=1623041981589'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/RDCP/medium/SEVP_AOC_RDCP_SLDAS_EBREF_ACHN_L88_PI_20210607045400001.PNG?v=1623042343584'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/RDCP/medium/SEVP_AOC_RDCP_SLDAS_EBREF_ACHN_L88_PI_20210607050000001.PNG?v=1623042706046'
          },
    ]
};
},
//监听属性 类似于data概念
computed: {

},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    search(){
        
    }
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
@import '../../../../assets/css/styles.css';
.container{
    flex: 1;
    // height: 200px;
    height: calc(100vh - 190px);
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
    
}
</style>