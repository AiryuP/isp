<template>
<div>
  <div v-for="(val, key) in menuList" :key="key">
    <el-submenu :index="val[props.index]" v-if="val[props.children] && val[props.children].length > 0">
      <template slot="title">
        <span :class="[val.icon,'iconfont','i-icon']"></span>
        <!-- <i :class="val.icon"></i> -->
        <span>{{val[props.label]}}</span>
      </template>
      <SubMenu :menu-list="val[props.children]" :props="props" @getmenu="onMenuItemClick"/>
    </el-submenu>
    <el-menu-item :index="val[props.index]" v-else @click="onMenuItemClick(val)">
      <template style="background-color: red !important" slot="title">
        <span :class="[val.icon,'iconfont','i-icon']"></span>
        <!-- <i :class="val.icon"></i> -->
        <span>{{val[props.label]}}</span>
      </template>
    </el-menu-item>
  </div>
</div>
</template>

<script>
export default {
  name: 'SubMenu',
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    props: {
      type: Object,
      default () {
        return {
          children: 'children',
          label: 'label',
          index: 'id'
        }
      }
    }
  },
  methods: {
    onMenuItemClick(item) {
      this.$emit('getmenu', item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .i-icon{
    width: 24px;
    margin-right: 5px;
    display: inline-block;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
</style>
