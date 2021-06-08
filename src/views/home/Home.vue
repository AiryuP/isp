<template>

<el-container>
  <el-header class="elHeader" >
    <div class="projectName">智慧气象综合业务平台</div>
    <div class="userInfo">
        <div>欢迎您，<span style="color: #f3b01e"> {{ userName }} </span> </div>
        <div>丨</div>
        <div class="loginOut" @click="logout">退出</div>
        <div class="iNotice">消息</div>
    </div>
  </el-header>
  <el-container>
    <el-aside class="menuList">
       <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#011C3A"
      :router='true'
      text-color="#fff"
      active-text-color="#ffd04b">
      <SubMenu :menu-list="list" :props="defaultProps" @getmenu="onGetMenu" />
    </el-menu>
    </el-aside>
    <el-main class="icontainer" >
      <router-view/>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
// @ is an alias to /src
import SubMenu from '../../components/SubMenu';

export default {
  name: 'Home',
  components: {
    SubMenu
  },
  computed: {
  //获取当前路由渲染页面菜单
  //$route.path
  defaultActive() {
    let pathLength = this.$route.path.split("/").reverse();
    
    if (pathLength.length < 4) {
      let path;
      if( this.$route.path.split("/").reverse()[1] != '' ){
        
       path=
        "/" +
        this.$route.path.split("/").reverse()[1]
        +
        "/" +
        this.$route.path.split("/").reverse()[0];
      }else{
        path =
        "/" +
        this.$route.path.split("/").reverse()[0];
      }


      return path;
    } else {
      
      let path1 =
        "/" +
        this.$route.path.split("/").reverse()[2] +
        "/" +
        this.$route.path.split("/").reverse()[1] +
        "/" +
        this.$route.path.split("/").reverse()[0];
      return path1;
    }
  }
  },

  data(){
    return{
      defaultProps: {
        children: 'children',
        label: 'title',
        index: 'path'
      },
      list: [{
          id: 1,
          title: '首页',
          path: '/meter',
          icon: 'icon-home',
          children: [

          ]
        },
        {
          id: 6,
          title: '预警处理',
          path: '',
          icon: 'icon-service',
          children: [

            ]
        },
        {
          id: 2,
          title: '服务管理',
          path: '',
          icon: 'icon-home',
          children: [
            {
              id: 21,
              title: '标签制作',
              path: '/tagMake',
            },
            {
              id: 22,
              title: '模板制作',
              path: '/templateMake',
            },
            {
              id: 23,
              title: '产品制作',
              path: '/productMake',
            },
            {
              id: 24,
              title: '一键发布',
              path: '/easyRelease',
            },
            {
              id: 25,
              title: '发布列表',
              path: '/publishList',
            }
            ]
        },
        {
          id: 3,
          title: '配置管理',
          path: '/configure',
          icon: 'icon-analysis',
          children: [
            {
              id: 31,
              title: '邮件配置',
              path: '/configure/email',
              // icon: 'el-icon-location',
            },
            // {
            //   id: 32,
            //   title: '测试32',
            //   path: '/demo32',
            //   icon: 'el-icon-location',
            // }
          ]
        },
        {
          id: 5,
          title: '业务管理',
          path: '/business',
          icon: 'icon-collection',
          children: [
            {
              id: 51,
              title: '受众管理',
              path: '/business/audience'
            },
            {
              id: 52,
              title: '灾种管理',
              path: '/business/disaster'
            },
            {
              id: 53,
              title: '群组管理',
              path: '/business/group'
            },
            {
              id: 54,
              title: '关键字管理',
              path: '/business/keyWord'
            },
            {
              id: 55,
              title: '机构管理',
              path: '/business/organization'
            },
            {
              id: 56,
              title: '策略管理',
              path: '/business/strategy'
            },
            // {
            //   id: 32,
            //   title: '测试32',
            //   path: '/demo32',
            //   icon: 'el-icon-location',
            // }
          ]
        },
        {
          id: 8,
          title: '风险普查',
          path: '/riskSurvey',
          icon: 'icon-collection',
          children: [
            {
              id: 81,
              title: '风险预估',
              path: '/riskSurvey/predict',
              children: [
                {
                  id: '8101',
                  title: '雷达监测',
                  path: '/riskSurvey/predict/radar',
                },
                {
                  id: '8102',
                  title: '卫星监测',
                  path: '/riskSurvey/predict/cloud',
                },
                {
                  id: '8103',
                  title: '数据监测',
                  path: '/riskSurvey/predict/live',
                },
                {
                  id: '8104',
                  title: '预估分析图',
                  path: '/riskSurvey/predict/analysis',
                },
                {
                  id: '8105',
                  title: '预估分析报告',
                  path: '/riskSurvey/predict/report',
                },
              ]
            },
            {
              id: 82,
              title: '灾害研判',
              path: '/riskSurvey/judge',

            },
            {
              id: 82,
              title: '灾害评估',
              path: '/riskSurvey/assess',
              children: [
                {
                  id: 8201,
                  title: '数据录入',
                  path: '/riskSurvey/assess/dataEntry',
                  children: [
                    {
                      id: 820101,
                      title: '暴雨',
                      path: '/riskSurvey/assess/dataEntry/rain'
                    },
                    {
                      id: 820102,
                      title: '干旱',
                      path: '/riskSurvey/assess/dataEntry/drought'
                    },
                    {
                      id: 820103,
                      title: '高温',
                      path: '/riskSurvey/assess/dataEntry/highTem'
                    },
                    {
                      id: 820104,
                      title: '低温',
                      path: '/riskSurvey/assess/dataEntry/lowTem'
                    },
                    {
                      id: 820105,
                      title: '大风',
                      path: '/riskSurvey/assess/dataEntry/gale'
                    },
                    {
                      id: 820106,
                      title: '冰雹',
                      path: '/riskSurvey/assess/dataEntry/hail'
                    },
                    {
                      id: 820107,
                      title: '雪灾',
                      path: '/riskSurvey/assess/dataEntry/snowstorm'
                    },
                    {
                      id: 820108,
                      title: '雷电',
                      path: '/riskSurvey/assess/dataEntry/thunder'
                    },
                  ]
                },
                {
                  id: 8202,
                  title: '灾害风险区划图',
                  path: '/riskSurvey/assess/plan',
                },
                {
                  id: 8203,
                  title: '评估分析报告',
                  path: '/riskSurvey/assess/reports'
                }
              ]
            },


          ]
        },
        {
          id: 4,
          title: '系统管理',
          path: '/system',
          icon: 'icon-configuration',
          children: [
            {
              id: '4_1',
              title: '菜单管理',
              path: '/system/menuControl',
            },
            {
              id: '4_2',
              title: '员工管理',
              path: '/system/staff',
            },
            {
              id: '4_3',
              title: '角色管理',
              path: '/system/role',
            },
            {
              id: '4_4',
              title: '权限管理',
              path: '/system/power',
            }
          ]
        }
      ],
      userName: ''
    }
  },



  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    onGetMenu(item) {
      // this.selMenuData = item
      // this.$router.push({
      // 	path: item.path,
      // 	query: {
      // 		t: new Date().getTime()
      // 	}
      // })
    },
    //  获取用户信息
    gtUserInfo(){
      let userInfo = JSON.parse( sessionStorage.getItem('user') ); 
      this.userName = userInfo.name;
    },
    // 退出
    logout(){
      sessionStorage.clear();
      this.$router.go(0);
    },
  },
  mounted(){
    this.gtUserInfo();
  }



}
</script>

<style lang="scss">
.elHeader{
  height: 90px !important;
  background-color: #011C3A;
  border-bottom: 1px solid #1E1F33;
  color: #f3b01e;
  display: flex;
  justify-content: space-between;
    color: #fff;
  .projectName{
    height: 90px;
    font-size: 36px;
    line-height: 90px;
    font-weight: 600;
  }
  .userInfo{
    display: flex;
    font-size: 16px;
    align-items: center;
    >div{
      margin: 0 10px;
    }
    .loginOut{
      &:hover{
        cursor: pointer;
      }
    }
    .iNotice{
      
      &:hover{
        cursor: pointer;
      }
    }
  }
}
.menuList{
  width: 260px !important;
  height: calc(100vh - 90px);
  overflow: hidden;
  background-color: #011C3A;
  .el-menu{
    border-right: none;
  }
}
.icontainer{
  overflow: auto;
  
}

.icontainer::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
    scrollbar-arrow-color:red;

}
.icontainer::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 6px #06395B;
    background: #3886b9;
    scrollbar-arrow-color:red;
}
.icontainer::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 6px #06395B;
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}






</style>
