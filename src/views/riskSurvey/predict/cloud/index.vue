<!--  -->
<template>
    <div class='container'>

        <div class="crumbs">
            风险普查—卫星监测
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
            <ScrollPic mode="cloud" :datass='idata' ></ScrollPic>
        </div> 



    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ScrollPic from '@/components/ScrollPic';

export default {
name: 'cloud',
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
            img: 'http://image.nmc.cn/product/2021/06/07/WXBL/medium/SEVP_NSMC_WXBL_FY4A_ETCC_ACHN_LNO_PY_20210607040000000.JPG?v=1623039668324'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/WXBL/medium/SEVP_NSMC_WXBL_FY4A_ETCC_ACHN_LNO_PY_20210607041500000.JPG?v=1623040403383'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/WXBL/medium/SEVP_NSMC_WXBL_FY4A_ETCC_ACHN_LNO_PY_20210607041900000.JPG?v=1623040630446'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/WXBL/medium/SEVP_NSMC_WXBL_FY4A_ETCC_ACHN_LNO_PY_20210607042300000.JPG?v=1623040956563'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/WXBL/medium/SEVP_NSMC_WXBL_FY4A_ETCC_ACHN_LNO_PY_20210607043000000.JPG?v=1623041294595'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/WXBL/medium/SEVP_NSMC_WXBL_FY4A_ETCC_ACHN_LNO_PY_20210607043400000.JPG?v=1623041539222'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/WXBL/medium/SEVP_NSMC_WXBL_FY4A_ETCC_ACHN_LNO_PY_20210607043800000.JPG?v=1623041839530'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/WXBL/medium/SEVP_NSMC_WXBL_FY4A_ETCC_ACHN_LNO_PY_20210607044500000.JPG?v=1623042190972'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/WXBL/medium/SEVP_NSMC_WXBL_FY4A_ETCC_ACHN_LNO_PY_20210607044900000.JPG?v=1623042477177'
          },
          {
            time: '06/01 16:00',
            img: 'http://image.nmc.cn/product/2021/06/07/WXBL/medium/SEVP_NSMC_WXBL_FY4A_ETCC_ACHN_LNO_PY_20210607045300000.JPG?v=1623042758091'
          },
        ]
    };
},
//监听属性 类似于data概念
computed: {},
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