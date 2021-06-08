<!--  -->
<template>
    <div class='container'>
        <Crumbs title="业务管理-关键字管理"></Crumbs>
        <SearchCard>
            <div class="iListBox">
                <div class="iListLable">关键字</div>
                <div class="iListConent">
                    <el-input  v-model="keyName" placeholder="请输入关键字"></el-input>
                </div>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-search" size="small" @click="searchData" >搜索</el-button>
                <el-button type="warning" size="small" @click="resetData" icon="el-icon-refresh">重置</el-button>
                <el-button type="primary" size="small" @click="dialogFormVisible = true" icon="el-icon-plus">添加</el-button> 
            </div>
        </SearchCard> 

        <div class="icontent">
            <div class="tabBOx">
                <div class="tabBox">
                <el-table
                    stripe
                    :data="tableData"
                    max-height="650"
                    style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="名称" > 
                        </el-table-column> 
                        <el-table-column
                            prop="createTime"
                            label="发布时间" >
                        </el-table-column> 
                        <el-table-column 
                        label="操作">
                        <!--  -->
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" @click="editOpen( scope.row.id )" icon="el-icon-tickets" >修改</el-button>
                            <el-button type="danger" size="mini" @click="delete_this( scope.row.id )" icon="el-icon-delete" >删除</el-button>
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
                        :page-size="20"
                        :total="dataCount"> 
                    </el-pagination>
                </div>
            </div>
            
            <div class="dialogs">
                <!-- 添加 -->
                <el-dialog
                    title="添加"
                    :modal-append-to-body="false"
                    :visible.sync="dialogFormVisible"
                    width="50%" >
                    <div style="overflow: auto;" >
                        <el-form :model="form" ref="form" style="marginRight: 80px">
                            <el-form-item label="关键词:" prop="name" :label-width="formLabelWidth">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        
                        </el-form>

                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addUpload">确 定</el-button>
                    </span>
                </el-dialog>

                <!-- 修改 -->
                <el-dialog
                    title="修改"
                    :modal-append-to-body="false"
                    :visible.sync="editFormVisible"
                    width="50%" >
                    <div style="overflow: auto;" >
                        <el-form :model="editform" ref="editform" style="marginRight: 80px">
                            <el-form-item label="关键词:" prop="name" :label-width="formLabelWidth">
                                <el-input v-model="editform.name"></el-input>
                            </el-form-item>
                        
                        </el-form>

                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="editFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editUpload">确 定</el-button>
                    </span>
                </el-dialog>
            </div>

        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Crumbs from '../../../components/crumbs';
import SearchCard from '../../../components/SearchCard';

export default {
name: 'keyWord',
//import引入的组件需要注入到对象中才能使用
components: {
    Crumbs: Crumbs,
    SearchCard: SearchCard
},
data() {
//这里存放数据
        return { 
            keyName: '', 
            tableHeight: '',
            tableData: [],
            currentPage: 1,
            options: [],
            dataCount: 0,
            current: 1, 
            dialogFormVisible: false,
            editFormVisible: false,
            formLabelWidth: '160px',
            form: {
                name: ''
            }, 
            editform: {
                name: ''
            },
            editId: ''
            
        }

},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合

    methods: {
        // 编辑上传
        editUpload(){
            let api ='/api/words/keywords';
            this.$axios.put( api,{
                id : this.editId,     
                name: this.editform.name, 

            }).then((res)=>{
                
                if( res.status == 200){
                    this.editFormVisible = false;
                    this.initTableData();
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    })
                }
            }).catch((err)=>{
                 
            })
        },
        // 删除
        delete_this(a){
           this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let api = '/api/words/keywords';
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
                        this.initTableData();
                        this.currentPage = 1;
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
        // 打开修改
        editOpen(id){
            this.editId = id;

            let api = '/api/words/keywords';
            this.$axios.get( api , { 
                params:{ 
                    id: id
                }
            }).then(( res )=>{
                
                let data = res.data.data.content;
                if( res.data.status == 200 ){  
 
                    this.editform.name= data.name;  
                    this.editFormVisible = true;
                }
            }).catch(( err )=>{
                 
            }) 



        },
        // 上传
        addUpload(){
            if( this.form.name =="" ){
                this.$message({
                    message: '请填写关键字！',
                    type: 'warning'
                })
                return;
            }
            let api = '/api/words/keywords';
            this.$axios.post(api,{
                name: this.form.name
            }).then((res)=>{
                // 
                if(res.data.status == 200){
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    })
                    this.dialogFormVisible = false;
                    this.initTableData();
                    this.form.name = '';
                }

            }).catch((err)=>{

            })
        },
        // 获取窗口高度
        getClientHeight(){
            var clientHeight=0;
            if(document.body.clientHeight&&document.documentElement.clientHeight){
                var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            }else{
                var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            } 
            this.tableHeight = clientHeight*0.5; 
        },        
        // 根据条件搜索
        searchData(){
            let api = '/api/words/keywords';
            let searchVal = this.keyName;
            if( searchVal !== '' ){
                this.$axios.get( api ,{
                    params:{   
                        name: searchVal, 
                        current: 1,
                        pageSize: 20
                    }
                }).then(( res )=>{
                    
                    this.tableData = res.data.data.content;
                    this.currentPage = res.data.data.pagination.current;
                    this.dataCount = res.data.data.pagination.total;
                }).catch(( err )=>{
                     
                }) 
            }else{
                this.$message({
                    message: '请输入搜索条件',
                    type: 'warning'
                })
            }
        },
        // 重置
        resetData(){
            this.initTableData();
            this.tableData = [];
            this.keyName = ''; 
        },
        // 初始化表格数据
        initTableData(){
            let api = '/api/words/keywords';
            this.$axios.get( api , { 
                params:{
                    current: 1,
                    pageSize: 20
                }
            }).then(( res )=>{
                
                this.tableData = res.data.data.content;
                this.currentPage = res.data.data.pagination.current;
                this.dataCount = res.data.data.pagination.total;
            }).catch(( err )=>{
                 
            }) 
   
        },
        // 改变页数
        changePage( val ){
            this.current = val; 
            this.currentPage = val;
            if( this.keyName != ''   ){
                let api = '/api/words/keywords';
                let searchVal = this.keyName;
                if( searchVal !== ''  ){
                    this.$axios.get( api ,{
                        params:{ 
                            name: searchVal, 
                            current: this.current,
                            pageSize: 20
                        }
                    }).then(( res )=>{
                        
                        this.tableData = res.data.data.content;
                        this.currentPage = res.data.data.pagination.current;
                        this.dataCount = res.data.data.pagination.total;
                    }).catch(( err )=>{
                         
                    }) 
                }else{
                    this.$message({
                        message: '请输入搜索条件',
                        type: 'warning'
                    })
                }
            }else{
                let api = '/api/words/keywords';
                this.$axios.get( api ,{
                    params:{ 
                        current: this.current,
                        pageSize: 20
                    }
                }).then(( res )=>{
                    
                    this.tableData = res.data.data.content;
                    this.currentPage = res.data.data.pagination.current;
                    this.dataCount = res.data.data.pagination.total;
                }).catch(( err )=>{
                     
                })
            }
        },
  
    },

//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
        this.getClientHeight();
        this.initTableData();
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
    box-sizing: border-box;
    padding-bottom: 20px;

    .icontent{
        display: flex;
        justify-content: space-around;
        .tabBOx{
            width: 100%;
            padding: 20px 0 0 0;
            .el-table{
                // height: calc( 100vh - 340px );
            }
            .pagBox{
                margin-top: 20px;
                float: right;
                margin-right: 40px;
            }
            /deep/.pagBox{
                .el-pagination{
                    .btn-prev,.btn-next{
                        color: rgb(255, 255, 255);
                        background-color: rgba(255, 255, 255, 0);
                    }
                    .el-pager{
                        .number{
                            background-color: rgba(255, 255, 255, 0);
                            color: rgb(255, 255, 255);
                        }
                        .active{
                            background-color: rgb(20, 96, 209);
                        }
                        .more{
                            background-color: rgba(255, 255, 255, 0);
                            color: rgb(255, 255, 255);
                        }
                    }
                }
            }
        }
    }



}
</style>