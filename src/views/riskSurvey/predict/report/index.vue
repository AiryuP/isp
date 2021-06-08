<!--  -->
<template>
    <div class='container' id="container">
        <div class="crumbs">
            风险普查—预估分析报告
        </div>
 
        <div class="searchBox">
            <div class="iListBox">
                <div class="iListLable">名称</div>
                <div class="iListConent">
                    <el-input  v-model="searchName" placeholder="请输入内容"></el-input> 
                </div>
            </div>
            <div>
                <el-button type="primary" size="small" @click="search">搜索</el-button>
            </div>
        </div>


        <div class="tabTitle">
            <div class="left">
                <div>数据列表</div>
                <!-- <div class="icon colorRed" @click="deleteSelected" title="删除选中">
                    <i class="el-icon-delete"></i>
                </div>
                <div class="icon colorGreen" @click="addData" title="新增">
                    <i class="el-icon-plus"></i>
                </div>
                <div class="icon colorBlue" @click="dataImport" title="数据导入">
                    <i class="el-icon-document-add"></i>
                </div>
                <div class="icon colorOrg" @click="downloadEle" title="模板下载">
                    <i class="el-icon-download"></i>
                </div>
                <div class="icon colorBlue" @click="downloadData" title="数据导出">
                    <i class="el-icon-printer"></i>
                </div> -->

                
            </div>
            <div class="right">
                <span>共计 <span style="padding: 0px 6px;color: #fff">{{total}}</span> 条</span>
                <span class="changePage" @click="topPage">上一页</span>
                <span style="color: #fff">{{ current }}</span>
                <span class="changePage" @click="nextPage">下一页</span>
            </div>
        </div>
        
        <div class="tabBox">
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
                label="报告名称">
                </el-table-column>
                
                <el-table-column
                prop="areaName"
                label="所属地区">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="生成时间">
                </el-table-column>
                
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <div class="handleIconBox" title="下载" ><i class="el-icon-download"  @click="downit(scope.row.filePath)" ></i></div>
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

export default {
name: 'reports',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    searchName: '',
    times: '', 
    disaster: '', 
    disasterArr:[
        {
            value: '1',
            label: '暴雨'
        },
        {
            value: '2',
            label: '高温'
        },
        {
            value: '3',
            label: '低温'
        },
        {
            value: '4',
            label: '冰雹'
        },
        {
            value: '5',
            label: '干旱'
        },
        {
            value: '6',
            label: '大风'
        },
        {
            value: '7',
            label: '雪灾'
        },
        {
            value: '8',
            label: '雷电'
        }
    ],
    causeDisaster: '',
    causeDisasterArr:[],
    bear: '',
    bearArr:[
        {
            value: 'hs',
            label: '花生'
        },
        
        {
            value: 'xm',
            label: '小麦'
        },
        {
            value: 'sd',
            label: '水稻'
        },
        {
            value: 'ry',
            label: '人员'
        },
        {
            value: 'jj',
            label: '经济'
        },
    ],
    tableData: [],

    //  分页
    current: 1,
    pageSize: 10,
    total: 0,


};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    gettabData(){
        const api = '/api/zhfx/riskReport';
        this.$axios.get(api,{})
        .then((res)=>{
            console.log(res)
            let data = res.data.data.content;
            this.tableData = data
        })
    },
    search(){
        const api = '/api/zhfx/riskReport';
        this.$axios.get(api,{
            params:{
                name: this.searchName
            }
        })
        .then((res)=>{
            console.log(res)
            let data = res.data.data.content;
            this.tableData = data
        })
    },
    handleSelectionChange(){

    },
    downit(url){
        window.open(url)
    },
    del_this(a){

        const api = '/api/zhfx/riskReport';
        
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            // let api = '/api/publish/target';
            let arr = [];
            arr.push(a)
            this.$axios.delete( api , {
                data: arr 
            }).then((res)=>{
                console.log( res );
                if( res.data.status = 200 ){
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    }); 
                    this.gettabData();
                    this.currentPage = 1;
                }else{
                    this.$message({
                        type: 'info',
                        message: res.data.message
                    });
                }
            }).catch((err)=>{
                console.log( err );
            })

        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
        });

    },
    
        
    topPage(){
        let api = '/api/zhfx/riskReport';
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
                    pageSize: 10,
                    name: this.searchName
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
        let api = '/api/zhfx/riskReport';

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
                    pageSize: 10,
                    name: this.searchName
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
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.gettabData();
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
                &:hover{
                    cursor: pointer;
                }
            }
            .colorRed{
                color: firebrick;
            }
            .colorGreen{
                color: rgb(38, 219, 120);
            }
            .colorBlue{
                color: rgb(30, 156, 214);
            }
            .colorOrg{
                color: rgb(176, 206, 10);
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


    .tabBox{
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