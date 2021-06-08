<!--  -->
<template>
<div class='container'>
    <div class="iBox">

        
    <!-- <div class="Subhead">
        <div class="icon"></div>
        <div class="subText">格点预报</div>
        <div class="beizhu">未来1小时</div>
    </div> -->
        
        <div class="boxLeft">
            <div class="leftTop">
                <div class="theSever">
                    <div class="Subhead">
                        <div class="icon"></div>
                        <div class="subText">服务器监控</div>
                    </div>
                    <div class="iContent">
                        <div class="icontBox">
                            <div class="fuwu">
                                <div class="fuwuLIst icpu">
                                    
                                </div>
                                <div class="fuwuLIst iram"></div>
                                <div class="fuwuLIst iyp"></div>
                            </div>
                            <div class="chartsBox">
                                <div id="charts">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="theSystem">
                    <div class="Subhead">
                        <div class="icon"></div>
                        <div class="subText">系统监控</div>
                    </div>
                    <div class="iContent">
                        <div class="sysBox">
                            <div class="sysList">
                                <div class="icon yy"></div>
                                <div class="name">应用</div>
                                <div class="status">
                                    <span class="zt">正常:</span>
                                    <span class="Num">1</span>
                                    <span class="zt mr10">异常:</span>
                                    <span class="Num redNum">0</span>
                                </div>
                            </div>
                            <div class="sysList">
                                <div class="icon sjk"></div>
                                <div class="name">数据库</div>
                                <div class="status">
                                    <span class="zt">正常:</span>
                                    <span class="Num">1</span>
                                    <span class="zt mr10">异常:</span>
                                    <span class="Num redNum">0</span>
                                </div>
                            </div>
                        </div>
                        <div class="zhuan">
                            <div class="centerImg">
                                <!--  -->
                                <div class="zhuanList" :class=" [ iindex == '1'? 'trun01': '', iindex == '2'? 'trun02': '',iindex == '3'? 'trun03': '',iindex == '4'? 'trun04': '', ] " ></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="leftBottom">
                <div  class="theChannel">
                    <div class="Subhead">
                        <div class="icon"></div>
                        <div class="subText">渠道监控</div>
                    </div>
                    <div class="icontent">
                        <div class="legend">
                            <div class="greenLine"></div>
                            <div class="texts">正常</div>
                            <div class="redLine"></div>
                            <div class="texts">异常</div>
                        </div>
                        <div class="channelBox">
                            <div class="justaBox" v-for="item in 5" :key="item">
                                <div class="channelList" :class="'animation'+item ">
                                    <div class="channelIcon">
                                        <div class="imgBox"> 
                                            <img src="../../../assets/images/chief/channel/duanxin.png" alt="">
                                        </div>
                                    </div>
                                    <div class="channelName">
                                        短信
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="iBg">

            </div>
        </div>
        <div  class="boxRight">
            <div class="Subhead">
                <div class="icon"></div>
                <div class="subText">网络监控</div>
            </div>
            <div class="iContent">
                <div class="tops">
                    <div class="topList">
                        <div class="iconBox">
                            <div class="text">政务网</div>
                        </div>
                    </div>
                </div>
                <div class="centers">
                    <div class="centerList" v-for="(item,index) in 5" :key="index">
                        <div class="line"></div>
                        <div class="iconBox">
                            <div class="icon">
                                <img src="../../../assets/images/chief/DZ.png" alt="">
                            </div>
                        </div>
                        <div class="ststus" :class="item.status == 0? 'statusRed': '' ">
                            正常
                        </div>
                        <div class="name">
                            地震局
                        </div>
                    </div>
                </div>
                <div class="bottoms">
                    
                    <div class="centerList" v-for="(item,index) in 6" :key="index">
                        <div class="line"></div>
                        <div class="iconBox">
                            <div class="icon">
                                <img src="../../../assets/images/chief/DZ.png" alt="">
                            </div>
                        </div>
                        <div class="ststus" :class="item.status == 0? 'statusRed': '' ">
                            正常
                        </div>
                        <div class="name">
                            地震局
                        </div>
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

import * as echarts from 'echarts'

export default {
name: 'smon',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
    return {
        color: "red",
        iindex: 1
    };
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    initCharts(){
        // 自定义颜色

        let colors = ["red", "green", "blue", "orange", "greenyellow"];

        // 颜色下标，每次渲染饼图一个扇区加一操作

        let i = 0;

        let myChart = echarts.init(document.getElementById("charts"));  
        let option = {
            tooltip: {
                trigger: 'item',
                backgroundColor: '#00000080',
                textStyle: {
                    // fontSize: 12,
                    color: '#fff'
                },
            },
            graphic: {　　　　　　　　　　　　　　　　 
                type: 'text',　　　　　　　　　　　　 
                left: 'center',　　　　　　　　　　
                top: 'center',
                style: {　　　　　　　　　　　　　　　　
                    text: "服务器监控",
                    textAlign: 'center',
                    fill: '#AAD4FF',　　　　　　　　 
                    width: 30,
                    height: 30,
                    fontSize: 18,
                    color: "#AAD4FF",
                    fontFamily: "Microsoft YaHei"
                }
            },
            color: ['#2D7ECC', '#F18B11', '#00C785'],
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['45%', '60%'],

                    data: [
                        {value: 50, name: 'CPU'},
                        {value: 25, name: '硬盘'},
                        {value: 25, name: 'RAM'},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.7)'
                        }
                    },
                    // itemStyle:{

                    // }
                }
            ]
        };
        myChart.setOption(option); 
        //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    },

    myTimer(){
        setInterval(() => {
            this.iindex += 1;
            if( this.iindex > 4 ){
                this.iindex = 1;
            }
        }, 1000);
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    // cssVars(){
    //   return {
    //     "--color": this.color
    //   }
    // }
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.initCharts();
    this.myTimer();
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
<style lang='scss' scoped >
//@import url(); 引入公共css类
.container{
    width: 100%;
    // height: 200px;
    
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
    .iBox{
        width: 1815px;
        border-width: 1px;
        border-style: solid;
        margin: 20px auto 0;
        border-image: url('../../../assets/images/chief/LINE.png') 1 0 round;
        box-sizing: border-box;
        padding: 45px 0 20px;
        display: flex;
        justify-content: space-between;
        
        .boxLeft{
            width: 1080px;
            position: relative;
            .leftTop{
                display: flex;
                justify-content: space-between;
                .theSever{
                    width: 700px;
                    .iContent{
                        height: 480px;
                        box-sizing: border-box;
                        background: #041B38;
                        padding: 30px 0;

                        .icontBox{
                            margin: 0 auto;
                            width: 620px;
                            height: 420px;
                            border-width: 1px;
                            border-style: solid;
                            border-image: url('../../../assets/images/chief/line_01.png') 1 0 round;
                            display: flex;
                            justify-content: space-between;
                            .fuwu{
                                display: flex;
                                height: 420px;
                                flex-direction: column;
                                justify-content: center;
                                .fuwuLIst{
                                    width: 215px;
                                    height: 89px;
                                    margin: 10px 0;
                                }
                                .icpu{
                                    background: url('../../../assets/images/chief/fuwu_CPU.png') no-repeat;
                                }
                                .iram{
                                    background: url('../../../assets/images/chief/fuwu-RAM.png') no-repeat;
                                }
                                .iyp{
                                    background: url('../../../assets/images/chief/fuwu-YP.png') no-repeat;
                                }
                            }
                            .chartsBox{
                                display: flex;
                                height: 420px;
                                flex-direction: column;
                                justify-content: center;
                                #charts{
                                    width: 375px;
                                    height: 330px;
                                    border-width: 1px;
                                    border-style: solid;
                                    border-image: url('../../../assets/images/chief/shuline.png') 0 1 round;
                                }
                            }
                        }
                    }
                }
                .theSystem{
                    width: 370px;
                    .iContent{
                        .sysBox{
                            height: 240px;
                            display: flex;
                            justify-content: space-evenly;
                            .sysList{
                                width: 130px;
                                .icon{
                                    width: 130px;
                                    height: 128px;
                                }
                                .yy{
                                    background: url('../../../assets/images/chief/xitong_YY.png') no-repeat;
                                }
                                .sjk{
                                    background: url('../../../assets/images/chief/xitong_SJK.png') no-repeat;
                                }
                                .name{
                                    font-size: 16px;
                                    font-family: Microsoft YaHei;
                                    font-weight: bold;
                                    color: #AAD4FF;
                                    line-height: 24px;
                                    text-align: center;
                                }
                                .status{
                                    margin-top: 10px;
                                    width: 130px;
                                    text-align: center;
                                    .zt{
                                        height: 18px;
                                        font-size: 14px;
                                        font-family: Microsoft YaHei;
                                        font-weight: bold;
                                        color: #95AFD2;
                                        line-height: 24px;
                                    }
                                    .mr10{
                                        margin-left: 10px;
                                    }
                                    .Num{
                                        font-size: 18px;
                                        color: #0FBDFF;
                                        font-weight: bold;
                                        font-style: oblique;
                                        margin-left: 10px;
                                    }
                                    .redNum{
                                        color: #AC332F;
                                    }
                                }
                            }
                        }
                        .zhuan{
                            margin-top: 20px;
                            .centerImg{
                                width: 330px;
                                height: 165px;
                                background: url('../../../assets/images/chief/centerImg.png') ;
                                margin: 0px auto;
                                position: relative;
                                overflow: hidden;
                                .zhuanList{
                                    // width: 137px;
                                    height: 155px;
                                    height: 330px;
                                    width: 330px;
                                    background: url('../../../assets/images/chief/zhuan1.png') no-repeat;
                                    transition: transform .9s ease;
                                    // animation: mytrun 3s linear infinite; 
                                }
                                .trun01{
                                    position: absolute;
                                    top: -20px;
                                    transform: rotate(30deg) ;
                                    
                                }
                                .trun02{
                                    transform:rotate(70deg) ;
                                    position: absolute;
                                    top: -20px;

                                }
                                .trun03{
                                    transform:rotate(132deg) ;
                                    position: absolute;
                                    top: -20px;
                                }
                                .trun04{
                                    transform:rotate(181deg) ;
                                    position: absolute;
                                    top: -20px;
                                    left: 5px;
                                }
                            }
                        }
                    }
                }
            }
            .leftBottom{
                width: 1080px;
                height: 250px;
                margin-top: 20px;
                .theChannel{
                    .icontent{
                        .legend{
                            height: 30px;
                            display: flex;
                            align-items: center;
                            .greenLine{
                                width: 16px;
                                height: 2px;
                                background: #056164;
                            }
                            .texts{

                            }
                            .redLine{
                                width: 16px;
                                height: 2px;
                                background: #51133D;
                            }
                            >div{
                                margin: 0 5px;
                            }
                        } 
                        .channelBox{
                            height: 190px;
                            display: flex;
                            justify-content: space-around;
                            background-image: url('../../../assets/images/chief/qudao_B.png'),url('../../../assets/images/chief/qudao_r.png');
                            background-position: right 10px top -40px,left bottom; 
                            background-repeat: no-repeat, no-repeat; 
                            overflow: hidden;
                            .justaBox{
                                position: relative;
                                height: 120px;
                                width: 70px;
                                .channelList{
                                    height: 120px;
                                    width: 70px;
                                    position: absolute;
                                    // animation:mymove 1s infinite alternate linear;
                                    .channelIcon{
                                        height: 80px;
                                        width: 67px;
                                        background: url('../../../assets/images/chief/qudao.png') no-repeat;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        .imgBox{
                                            width: 42px;
                                            height: 42px;
                                            img{
                                                width: 100%;
                                                height: 100%;
                                            }
                                        }
                                    }
                                    .channelName{
                                        height: 30px;
                                        margin-top: 10px;
                                        width: 70px;
                                        text-align: center;
                                        line-height: 30px;
                                        // color: var(--color);
                                        // color: red;
                                    }
                                }

                                .animation1{
                                    animation:mymove 2s 0s infinite alternate linear;
                                } 
                                .animation2{ 
                                    animation:mymove 2s 300ms infinite alternate linear;
                                } 
                                .animation3{ 
                                    animation:mymove 2s 600ms infinite alternate linear;
                                } 
                                .animation4{ 
                                    animation:mymove 2s 900ms infinite alternate linear;
                                } 
                                .animation5{ 
                                    animation:mymove 2s 1200ms infinite alternate linear;
                                } 
                                .animation6{ 
                                    animation:mymove 2s 1500ms infinite alternate linear;
                                } 
                                .animation7{ 
                                    animation:mymove 2s 1800ms infinite alternate linear;
                                } 
                                .animation8{ 
                                    animation:mymove 2s 2100ms infinite alternate linear;
                                } 
                                .animation9{ 
                                    animation:mymove 2s 2400ms infinite alternate linear;
                                } 
                                .animation10{ 
                                    animation:mymove 2s 2700ms infinite alternate linear;
                                } 
                                .animation11{ 
                                    animation:mymove 2s 3000ms infinite alternate linear;
                                } 
                                .animation12{ 
                                    animation:mymove 2s 3300ms infinite alternate linear;
                                } 
                                .animation13{ 
                                    animation:mymove 2s 3600ms infinite alternate linear;
                                } 
                                .animation14{ 
                                    animation:mymove 2s 3900ms infinite alternate linear;
                                } 
                                .animation15{ 
                                    animation:mymove 2s 4200ms infinite alternate linear;
                                } 
                                .animation16{ 
                                    animation:mymove 2s 4500ms infinite alternate linear;
                                }
                                

                            }
                            
                        }
                    }
                }
            }
        }
        .boxRight{
            width: 700px;
            background: url('../../../assets/images/chief/square.png');
            .iContent{
                width: 700px;
                .tops{
                    height: 140px;
                    width: 700px;
                    .topList{
                        width: 80px;
                        height: 103px;
                        margin: 0 auto;
                        .iconBox{
                            height: 103px;
                            background: url('../../../assets/images/chief/aback.png');
                            .text{
                                height: 70px;
                                line-height: 70px;
                                text-align: center;
                                font-size: 16px;
                                font-family: Microsoft YaHei;
                                font-weight: bold;
                                color: #AAD4FF;
                            }
                        }
                    }
                }
                .centers{
                    height: 330px;
                    border-top: 1px solid #0B2C51;
                    display: flex;
                    justify-content: space-around;
                    .centerList{
                        width: 80px;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        .line{
                            height: 40px;
                            width: 1px;
                            background: #0097F5;
                        }
                        .iconBox{
                            height: 103px;
                            width: 80px;
                            background: url('../../../assets/images/chief/aback.png');
                            .icon{
                                width: 46px;
                                height: 46px;
                                margin: 13px auto 0 ;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                        .ststus{
                            width: 54px;
                            height: 54px;
                            background: url('../../../assets/images/chief/g.png') no-repeat;
                            line-height: 44px;
                            font-size: 14px;
                            margin-top: 10px;
                            font-family: Microsoft YaHei;
                            font-weight: bold;
                            color: #AAD4FF;
                            text-align: center;
                        }
                        .statusRed{
                            background: url('../../../assets/images/chief/r.png') no-repeat;
                        }
                        .name{
                            font-size: 16px;
                            font-family: Microsoft YaHei;
                            font-weight: bold;
                            color: #AAD4FF;
                            margin-top: 20px;
                            width: 80px;
                            text-align: center;
                        }
                    }
                }
                .bottoms{
                    height: 290px;
                    border-top: 1px solid #0B2C51;
                    display: flex;
                    justify-content: space-around;
                    .centerList{
                        width: 80px;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        .line{
                            height: 40px;
                            width: 1px;
                            background: #0097F5;
                        }
                        .iconBox{
                            height: 103px;
                            width: 80px;
                            background: url('../../../assets/images/chief/aback.png');
                            .icon{
                                width: 46px;
                                height: 46px;
                                margin: 13px auto 0 ;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                        .ststus{
                            width: 54px;
                            height: 54px;
                            background: url('../../../assets/images/chief/g.png') no-repeat;
                            line-height: 44px;
                            font-size: 14px;
                            margin-top: 10px;
                            font-family: Microsoft YaHei;
                            font-weight: bold;
                            color: #AAD4FF;
                            text-align: center;
                        }
                        .statusRed{
                            background: url('../../../assets/images/chief/r.png') no-repeat;
                        }
                        .name{
                            font-size: 16px;
                            font-family: Microsoft YaHei;
                            font-weight: bold;
                            color: #AAD4FF;
                            margin-top: 20px;
                            width: 80px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }



    // 动画
    @keyframes mymove
    {
        0%   {top:0px;}
        100% {top: 80px;}
    }

    @keyframes mytrun
    {
      0%{-webkit-transform:rotate(0deg);}
      25%{-webkit-transform:rotate(90deg);}
      50%{-webkit-transform:rotate(180deg);}
      75%{-webkit-transform:rotate(270deg);}
      100%{-webkit-transform:rotate(360deg);}
    }


    











}
</style>