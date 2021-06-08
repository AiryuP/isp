
<!--  -->
<template>
    <div class='container'>
        <Crumbs title="系统管理-角色管理"></Crumbs>
        <SearchCard>
            <div class="iListBox">
                <div class="iListLable">菜单名称</div>
                <div class="iListConent">
                    <el-input  v-model="inputTitle" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div class="iListBox">
                <div class="iListLable">菜单级别</div>
                <div class="iListConent">
                    <el-input  v-model="inputTitle" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-search" size="small" >搜索</el-button>
                <el-button type="success" icon="el-icon-search" size="small" >增加</el-button>
                <el-button type="danger" icon="el-icon-search" size="small" >删除</el-button>
            </div>
        </SearchCard>
        <div class="tabSBox">
            <el-table
                :data="tableData"

                @selection-change="selectChange"
                tooltip-effect="dark">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    type="index"
                    label="编号">
                </el-table-column>                    
                <el-table-column
                    label="菜单名称"
                    align="left"
                    prop="name">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="菜单路径">
                </el-table-column>
                <el-table-column
                    prop="level"
                    label="菜单级别"
                    sortable
                    >
                    <template slot-scope="scope">
                        <el-button 
                            :type="scope.row.level === '1' ? 'danger' : 'warning'"
                            size="small"
                            >
                            {{scope.row.level === '1' ? '一级菜单' : '二级菜单'}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="parentName"
                    label="上级菜单"
                    >
                </el-table-column>                    
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini" 
                        type="primary" 
                        @click="handleAddRole(scope.row)"
                        icon="el-icon-edit">
                        编辑
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        icon="el-icon-delete"
                        @click="handleToDelete(scope.row)"
                        >
                        删除
                    </el-button>
                </template>
                </el-table-column>                    
            </el-table> 
        </div>
        
        <div class="pagBox">
            <el-pagination
                background
                :current-page.sync = "currentPage"
                @current-change='changePage'
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="dataCount"> 
            </el-pagination>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Crumbs from '../../../components/crumbs';
import SearchCard from '../../../components/SearchCard';


export default {
    name: 'role',
    //import引入的组件需要注入到对象中才能使用
    components: {
        Crumbs: Crumbs,
        SearchCard: SearchCard
    },
    data() {
        //这里存放数据
        return {
            inputTitle: '',
            currentPage: 1,
            dataCount: 0,
            pageSize: 20,

            tableData:[],


            
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        selectChange(){

        },
        handleAddRole(){

        },
        handleToDelete(){

        },
        changePage(){

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
.container{
    flex: 1;
    height: 200px;
    min-width: 760px;

    .tabSBox{
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
        background-color: #011C3A;
        margin: 20px auto;
        .el-table{
            max-height: calc(100vh - 350px);
        }
    }
    
    .pagBox{
        margin-top: 20px;
        float: right;
        margin-right: 40px;
    }
}
</style>