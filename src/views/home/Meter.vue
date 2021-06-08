<!--  -->
<template>

    <div class="container">
        <div class="liveBox">
            <div class="liveList" style="background-color: #1571FA;">
                <div class="yuansu">
                    <div class="zhi">28℃</div>
                    <div class="name">温度</div>
                </div>
                <div class="icon">
                    <img src="../../assets/images/home/tem.png" alt="">
                </div>
            </div>
            <div class="liveList" style="background-color: #EF609E;">
                <div class="yuansu">
                    <div class="zhi">1.22mm</div>
                    <div class="name">降水量</div>
                </div>
                <div class="icon">
                    <img src="../../assets/images/home/rain.png" alt="">
                </div>
            </div>
            <div class="liveList" style="background-color: #A14BF4;">
                
                <div class="yuansu">
                    <div class="zhi">东南风3级</div>
                    <div class="name">风力风向</div>
                </div>
                <div class="icon">
                    <img src="../../assets/images/home/wind.png" alt="">
                </div>
            </div>
            <div class="liveList" style="background-color: #FD9C55;"> 
                <div class="yuansu">
                    <div class="zhi">1000hpa</div>
                    <div class="name">气压</div>
                </div>
                <div class="icon">
                    <img src="../../assets/images/home/qiya.png" alt="">
                </div>
            </div>
            <div class="liveList" style="background-color: #37C0EA;">
                <div class="yuansu">
                    <div class="zhi">20%</div>
                    <div class="name">相对湿度</div>
                </div>
                <div class="icon">
                    <img src="../../assets/images/home/shidu.png" alt="">
                </div>
            </div>
        </div>
        <div class="centerBox" >
            <div class="centerList configure">
                <div class="subhead">
                    <div class="text">
                        配置管理
                    </div>
                    <div class="more">
                        查看更多
                    </div>
                </div>
                <div class="centerListContent">
                    <div class="crumbs">
                        配置管理 - 渠道管理
                    </div>
                    <div class="channels">
                        <div class="channelList">
                            <div class="icons">
                                <img src="../../assets/images/home/duanxin.png" alt="">
                            </div>
                            <div class="names">短信</div>
                        </div>
                        <div class="channelList">
                            <div class="icons">
                                <img src="../../assets/images/home/APP.png" alt="">
                            </div>
                            <div class="names">APP</div>
                        </div>
                        <div class="channelList">
                            <div class="icons">
                                <img src="../../assets/images/home/chezaipin.png" alt="">
                            </div>
                            <div class="names">车载屏</div>
                        </div>
                        <div class="channelList">
                            <div class="icons">
                                <img src="../../assets/images/home/wangzhan.png" alt="">
                            </div>
                            <div class="names">网站</div>
                        </div>
                        <div class="channelList">
                            <div class="icons">
                                <img src="../../assets/images/home/weibo.png" alt="">
                            </div>
                            <div class="names">微博</div>
                        </div>
                        <div class="channelList">
                            <div class="icons">
                                <img src="../../assets/images/home/laba.png" alt="">
                            </div>
                            <div class="names">大喇叭</div>
                        </div>
                        <div class="channelList">
                            <div class="icons">
                                <img src="../../assets/images/home/weixin.png" alt="">
                            </div>
                            <div class="names">微信</div>
                        </div>
                        <div class="channelList">
                            <div class="icons">
                                <img src="../../assets/images/home/email.png" alt="">
                            </div>
                            <div class="names">邮件</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="centerList warning">
                <div class="subhead">
                    <div class="text">
                        预警信息
                    </div>
                    <div class="more">
                        查看更多
                    </div>
                </div>
                <div class="centerListContent">
                    
                </div>
            </div>
            <div class="centerList service">
                <div class="subhead">
                    <div class="text">
                        服务管理
                    </div>
                    <div class="more">
                        查看更多
                    </div>
                </div>
                <div class="centerListContent">
                    
                </div>
            </div>
            
 
        </div>
        <div class="collection">
            <div class="subhead">
                <div class="text">
                    数据采集
                </div>
                <div class="more">
                    查看更多
                </div>
            </div>
            <div class="collectionContent">
                
            </div>
        </div>
    </div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    name: 'Meter',
    props: {

    },
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
    height: 200px;
    .liveBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .liveList{
            width: 280px;
            height: 120px;
            margin: 0 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px;
            min-width: 194px;
            border-radius: 6px;
            .yuansu{
                .zhi{
                    font-size: 24px;
                    margin: 10px 0;
                }
                .name{
                    font-size: 16px;
                }
            }
            .icon{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                >img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    
    .centerBox{
        min-width: 1070px;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        .centerList{
            margin: 0 10px;
            .subhead{
                height: 50px;
                background-color: #06395B;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                .text{
                    font-size: 18px;
                }
                .more{
                    color: #898AA7;
                    font-size: 14px;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
            .centerListContent{
                background-color: #011C3A;
                height: 320px;
                border-bottom-left-radius: 6px;
                border-bottom-right-radius: 6px;
                .crumbs{
                    font-size: 24px;
                    color: #7FA6CD;
                    height: 50px;
                    line-height: 50px;
                    padding: 0 30px;
                }
                .channels{
                    height: 270px;
                    width: 100%;
                    min-width: 506px;
                    flex-shrink: 0;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    .channelList{
                        width: 90px;
                        height: 90px;
                        display: flex;
                        justify-content: center;
                        // justify-content: space-around;
                        flex-wrap: wrap;
                        background-color: #03254B;
                        margin: 15px 10px;
                        border-radius: 8px;
                        .icons{
                            height: 60px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            >img{
                                width: 40px;
                                height: 40px;
                            }
                        }
                        .names{
                            height: 30px;
                            font-size: 14px;
                            width: 100%;
                            text-align: center;
                            line-height: 30px;
                        }
                    }
                }
            }
        }
        .configure{
            width: 40%;
            min-width: 500px;
        }
        .warning{
            width: 40%;
        }
        .service{
            width: 20%;
        }
        
        
    }

    .collection{
        margin: 0 10px;
        min-width: 1070px;
        margin-top: 30px;
        .subhead{
            height: 50px;
            background-color: #06395B;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            .text{
                font-size: 18px;
            }
            .more{
                color: #898AA7;
                font-size: 14px;
                &:hover{
                    cursor: pointer;
                }
            }
        }
        .collectionContent{
            height: 320px;
            background-color: #011C3A;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px; 
            margin-bottom: 20px;
        }


    }


}

</style>