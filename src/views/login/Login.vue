<template>
  <div class="login">
      <div class="entryName">
        智慧气象综合业务平台
      </div>
      <div class="loginBox">
          <div class="userName">
            <el-input
              placeholder="请输入用户名"
              v-model="userName">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </div>
          <div class="password">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="password"
              @keydown.enter.native="handleLogin"
              >
              <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
            </el-input>
          </div>
          <div class="loginBtn" @click="handleLogin">
             登录
          </div>
      </div>
  </div>
</template>


<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import axios from 'axios'

export default {
    name: 'Login',
    props: {

    },
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
    //这里存放数据
        return {
          userName: '',
          password: '',
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      handleLogin(){

        console.log('11111')


          let api = this.global.serverSrc + '/api/login/account'
          axios.post(api, {userName: this.userName,password: this.password})
              .then(data => {
                console.log(data)
                  //登录失败,先不讨论
                  if (data.data.status != 200) {
                    this.$message({
                        message: '登录失败！',
                        type: 'warning'
                    })
                    //登录成功
                  } else {
                      sessionStorage.setItem("Flag", "isLogin")
                      sessionStorage.setItem("token", data.data.token )
                      sessionStorage.setItem("authority", data.data.authority )
                      sessionStorage.setItem("area", data.data.area )
                      sessionStorage.setItem("menu", data.data.menu )
                      sessionStorage.setItem("organization", data.data.organization )
                      sessionStorage.setItem("user", data.data.user )
                      sessionStorage.setItem('permissions',data.data.permissions)
                      sessionStorage.setItem('warningId','NAN')

                      
                      this.$store.commit('userInfo',data.data.user)

                      console.log( this.$store )


                      this.$router.push("/");
                  }
          });
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
  .login{
    background: url('../../assets/images/login/loginbg.png') no-repeat;
    width: 100%;
    height: 100%;
    background-size: cover;
    min-width: 1290px;
    min-height: 770px;
    box-sizing: border-box;
    // position: relative;
    overflow:hidden;

      .entryName{
        height: 88px;
        font-size: 70px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 15px;
        margin: 220px auto 30px;
        text-align: center;
      }
      .loginBox{
        width: 580px;
        height: 387px;
        background: url('../../assets/images/login/border.png') no-repeat;
        background-size: 100%;
        margin: 0 auto;
        position: relative;
        padding-top: 100px;
        box-sizing: border-box;
        .userName{
          width: 380px;
          height: 52px;
          margin: 0px auto 20px;
          border: 2px solid #37C0EA;
          border-radius: 4px;
        }
        /deep/.userName{
          .el-input{
              .el-input__inner{
                height: 52px;
                border: none !important;
                padding-left: 50px;
                font-size: 20px;
              }
              .el-input__prefix{
                top: 0px;
                left: 15px;
                .el-input__icon{
                  font-size: 20px;
                  color: #03D4E3;
                }
              }
          }
        }
        .password{
          width: 380px;
          height: 52px;
          margin: 0px auto 20px;
          border: 2px solid #37C0EA;
          border-radius: 4px;
        }
        /deep/.password{
          .el-input{
              .el-input__inner{
                height: 52px;
                border: none !important;
                padding-left: 50px;
                font-size: 20px;
              }
              .el-input__prefix{
                top: 0px;
                left: 15px;
                .el-input__icon{
                  font-size: 20px;
                  color: #03D4E3;
                }
              }
          }
        }
        .loginBtn{
          margin: 0px auto 20px;
          width: 380px;
          height: 52px;
          background: #1571FA;
          border-radius: 4px;
          font-size: 28px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #FFFFFF;
          text-align: center;
          line-height: 52px;
          &:hover{
            cursor: pointer;
          }
        }
      }
  }
</style>