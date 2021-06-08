<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

  html,body{
    // width: 100vw;
    // height: 100vh;
  }
  #app{
    width: 100vw;
    // min-width: 1920px;
    overflow: auto;
    height: 100vh;
    background-color: #06142E;
    color: #fff;
  }
  
#app::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
    scrollbar-arrow-color:red;

}
#app::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 6px #06395B;
    background: #3886b9;
    scrollbar-arrow-color:red;
}
#app::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 6px #06395B;
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}

</style>
