<!--  -->
<template>
    <div class='container' id="container">
        <div class="crumbs">
            服务管理—产品制作
        </div>
 
        <div class="searchBox">
            <div class="iListBox">
                <div class="iListLable">输入标题</div>
                <div class="iListConent">
                    <el-input  v-model="inputTitle" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div>
                <el-button type="primary" size="small" @click="search">搜索</el-button>
            </div>
        </div>

        

        <div class="tabTitle">
            <div class="left">
                <div>模板列表</div>
                <div class="icon" @click="deleteSelected">
                    <i class="el-icon-delete"></i>
                </div>
            </div>
            <div class="right">
                <span>共计 <span style="padding: 0px 6px;color: #fff">{{total}}</span> 条</span>
                <span class="changePage" @click="topPage">上一页</span>
                <span style="color: #fff">{{ current }}</span>
                <span class="changePage" @click="nextPage">下一页</span>
            </div>
        </div>

        <div class="productMakeTab">
            <el-table
                :data="tableData"
                stripe
                @selection-change="handleSelectionChange"
                :header-cell-style="{'text-align':'center',background: '#06395B'}"
                :cell-style="{'text-align':'center'}"
                style="width: 100%">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                type="index"
                label="序号">
                </el-table-column>
                <el-table-column
                prop="name"
                label="模板标题">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="制作时间">
                </el-table-column>
                
                <!-- prop="createTime" -->
                <el-table-column
                label="制作人">
                    <template>
                        <div>
                            气象局
                        </div>
                    </template>
                </el-table-column>
                
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <div class="handleIconBox" title="产品制作并下载" ><i class="el-icon-edit-outline"  @click="make_this( scope.row )" ></i></div>
                        <div class="handleIconBox" title="删除"><i class="el-icon-delete"  @click="del_this( scope.row.id )" ></i></div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
  
    </div>









</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import E from "wangeditor";


export default {
    name: 'productMake',
    props: {

    },
    //import引入的组件需要注入到对象中才能使用
    components: {
        
    },
    data() {
    //这里存放数据
        return {
            inputTitle: '', 
            loading: null,
            tableData: [],
            current: 1,
            pageSize: 10,
            total: 0,
            selectedArr: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {

        //  搜索
        search(){

        },
        make_this(item){
            
            // let api = '/api/ueditors/product';
            // let content = '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"> <head></head><body>'
            //             + item.content 
            //             + "</body></html>"
            
            // let params = {
            //     typeId: item.id,
            //     typeName: item.name,
            //     content: content
            // }
            // this.$axios.post(api,params)
            // .then((res)=>{
                
            //     let url = res.data.url;
            //     if( url != '' ){
            //         window.location.href= url
            //     }else{
            //         this.$message({
            //             type: 'warning',
            //             message:'制作失败，请稍后再试！'
            //         });
            //     }
            // }).catch((err)=>{})
            this.$router.push(
                {
                    path: '/productMake/preview',
                    query: {
                        itme: item
                    }
                }
            )
        },
        getTabData(){
            let api = '/api/ueditors/template';
            this.$axios.get(api,{
                params:{
                    current: 1,
                    pageSize: 20,
                    type: '2',
                }

            }).then((res)=>{
                
                let data = res.data.data.content;
                this.tableData = data;
                let pages = res.data.data.pagination;
                this.current = pages.current;
                this.total = pages.total;
            }).catch((err)=>{})
        },
        handleSelectionChange(val) {
            let arr = [];
            for( let i = 0;i<val.length;i++ ){
                arr.push( val[i].id )
            }
            this.selectedArr = arr;
        },
        // 删除
        deleteSelected(){
            let api = '/api/ueditors/template';
            if( this.selectedArr.length > 0 ){
                this.$axios.delete(api,{
                    data: this.selectedArr
                }).then(( res )=>{
                    if( res.data.status == 200 ){
                        this.$message({
                            type: 'success',
                            message:'删除成功！'
                        });
                        this.getTabData();
                        this.selectedArr = [];
                    }
                }).catch((err)=>{
                    
                })
            }else{
                this.$message({
                    type: 'warning',
                    message:'请选取需要删除的数据！'
                })
            }
        },
        // 删除
        del_this( a ){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let api = '/api/ueditors/template';
                let arr = [];
                arr.push(a)
                this.$axios.delete( api , {
                    data: arr 
                }).then((res)=>{
                    if( res.data.status = 200 ){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        }); 
                        this.getTabData();
                    }else{
                        this.$message({
                            type: 'info',
                            message: res.data.message
                        });
                    }
                }).catch((err)=>{
                    
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }, 
        
        topPage(){
            let api = '/api/ueditors/template';
            if( this.current == '1' ){
                this.$message({
                    message: '第一页啦！',
                    type: 'warning'
                });
                return;
            }else{
                this.$axios.get(api,{
                    params:{
                        current: + this.current - 1,
                        pageSize: 10
                    }
                })
                .then((res)=>{
                    if( res.data.status == 200 ){
                        let data = res.data.data.content;
                        let pages = res.data.data.pagination;
                        this.tableData = data;
                        this.current = pages.current;
                        this.total = pages.total;
                    }
                })
                .catch((err)=>{})
            }
        },
        nextPage(){
            let api = '/api/ueditors/template';

            let num =  this.total / this.pageSize;

            let nextpage = parseInt(num) + 1;
            


            if( this.current >= nextpage ){
                this.$message({
                    message: '最后一页啦！',
                    type: 'warning'
                });
                return;
            }else{
                this.$axios.get(api,{
                    params:{
                        current: + this.current + 1,
                        pageSize: 10
                    }
                })
                .then((res)=>{
                    if( res.data.status == 200 ){
                        let data = res.data.data.content;
                        let pages = res.data.data.pagination;
                        this.tableData = data;
                        this.current = pages.current;
                        this.total = pages.total;
                    }
                })
                .catch((err)=>{})
            }
        },


        
    },
    //回调中移除监听
    //生命周期 - 销毁完成
    destroyed() {
        
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        
        this.getTabData();

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
        
    }, //生命周期 - 销毁之前
    // destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
@import '../../../assets/css/styles.css';

.container{
    flex: 1;
    height: 200px;
    min-width: 760px;
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
    .tabTitle{
        color: #9FC8F2;
        font-size: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        .left{
            display: flex;
            .icon{
                margin: 0 0 0 20px;
                color: firebrick;
                &:hover{
                    cursor: pointer;
                }
            }
        }
        .right{
            color: #898AA7;
            font-size: 14px;
            >span{
                display: inline-block;
                margin: 0px 10px;
            }
            .changePage{
                &:hover{
                    cursor: pointer;
                    color: cyan;
                }
            }
        }
    }

    .productMakeTab{
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
        background-color: #011C3A;
        margin: 10px auto;
    }
    
    .handleIconBox{
        display: inline-block;
        font-size: 18px;
        margin: 0 6px;
        &:hover{
            cursor: pointer;
            color: cyan;
        }
    }





 
}
</style>