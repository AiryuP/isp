<!--  -->
<template>
    <div class='container'>
        <Crumbs title="业务管理-机构管理"></Crumbs>
        <SearchCard>
            <div class="iListBox">
                <div class="iListLable">机构名称</div>
                <div class="iListConent">
                    <el-input v-model="name" placeholder="请输入机构名称"></el-input>
                </div>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-search" size="small" @click="searchData" >搜索</el-button>
                <el-button type="warning" size="small" @click="resetData" icon="el-icon-refresh">重置</el-button>
                <el-button type="primary" size="small" @click="dialogFormVisible = true"  icon="el-icon-plus">添加</el-button>
                <el-button type="danger"  size="small" @click="deleteSelected" icon="el-icon-delete">删除</el-button>
            </div>
            
        </SearchCard> 

        <div class="icontent">
            <div class="tabBOx">
                <div class="tabBox">
                <el-table
                    stripe
                    :data="tableData"
                    max-height="650"
                    @selection-change="selectedChange"
                    id="Tab"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="85">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="机构名称"> 
                    </el-table-column>
                    <el-table-column
                        prop="areaName"
                        label="所属地区" >
                    </el-table-column>
                    <el-table-column
                        prop="typeName"
                        label="机构职能">
                    </el-table-column> 
                    <el-table-column 
                    label="操作"
                    width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="details_this( scope.row.id )" icon="el-icon-tickets" >详情</el-button>
                        <el-button type="success" size="mini" @click="edit_this( scope.row.id )" icon="el-icon-edit" >编辑</el-button>
                        <el-button type="danger" size="mini" @click="del_this( scope.row.id )" icon="el-icon-delete" >删除</el-button>
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
                <!-- 添加  -->
                <el-dialog title="添加" @close='closeDialog' :close-on-click-modal='false' :visible.sync="dialogFormVisible">
                    <div style="height: 340px;overflow: auto;">
                        <el-form :model="form" ref="form" style="marginRight: 80px">
                        <el-form-item label="所属地区:" prop="areaName" :label-width="formLabelWidth">
                        <el-input v-model="form.areaName"  @focus="innerVisible = true" ></el-input>
                        <!-- <el-input v-model="form.areaName"></el-input> -->
                        </el-form-item>
                        <!-- 内部嵌套 -->
                        <el-dialog
                            width="60%"
                            title="请选择"
                            :visible.sync="innerVisible"
                            :close-on-click-modal='false'
                            append-to-body>
                                <div style="height: 350px; overflow: auto ">
                                    <el-tree
                                    :data="treeData"
                                    :props="defaultProps"
                                    :default-expanded-keys="gen"
                                    node-key="id"
                                    accordion
                                    @node-click="handleNodeClick">
                                    </el-tree>
                                </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="innerVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getParent">确 定</el-button>
                            </div>

                        </el-dialog>

                        <el-form-item label="机构职能:" prop="typeCode" :label-width="formLabelWidth">
                        <el-select v-model="form.typeCode"   style="width: 100%" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        </el-form-item> 
                        <el-form-item label="机构名称:" prop="name" :label-width="formLabelWidth">
                        <el-input v-model="form.name" ></el-input>
                        </el-form-item>
                        <el-form-item label="机构编码:" prop="id" :label-width="formLabelWidth">
                        <el-input placeholder="例如：23030641600000" v-model="form.id" ></el-input>
                        </el-form-item>
                    </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addNewSupplies">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 编辑 -->
                <el-dialog title="编辑" :close-on-click-modal='false' :visible.sync="editFormVisible">
                    <div style="height: 340px;overflow: auto;">
                        <el-form :model="editform" style="marginRight: 80px">
                        <el-form-item label="所属地区:" prop="areaName" :label-width="formLabelWidth">
                        <el-input  v-model="editform.areaName"  @focus="innerVisible = true" ></el-input>
                        </el-form-item>
                        <!-- 内部嵌套 -->
                        <el-dialog
                            width="60%"
                            title="请选择"
                            :visible.sync="innerVisible"
                            :close-on-click-modal='false'
                            append-to-body>
                                <div style="height: 350px; overflow: auto ">
                                    <el-tree
                                    :data="treeData"
                                    :props="defaultProps"
                                    :default-expanded-keys="gen"
                                    node-key="id"
                                    accordion
                                    @node-click="handleNodeClick">
                                    </el-tree>
                                </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="innerVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getParent">确 定</el-button>
                            </div>

                        </el-dialog> 
                        <el-form-item label="机构职能:" prop="typeName" :label-width="formLabelWidth">
                        <el-select  v-model="editform.typeName"   style="width: 100%" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        </el-form-item> 
                        <el-form-item label="机构名称:" prop="name" :label-width="formLabelWidth">
                        <el-input  v-model="editform.name" ></el-input>
                        </el-form-item>
                        <el-form-item label="机构编码:" prop="id" :label-width="formLabelWidth">
                        <el-input  v-model="editform.id" ></el-input>
                        </el-form-item>
                       
                    </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="editFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updataEditForm">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 详情  details -->
                <el-dialog title="详情" :close-on-click-modal='false' :visible.sync="detailsformVisible">
                    <div style="height: 340px;overflow: auto;">
                        <el-form :model="detailsform" style="marginRight: 80px">
                        <el-form-item label="所属地区:" prop="areaName" :label-width="formLabelWidth">
                        <el-input disabled v-model="detailsform.areaName"  @focus="innerVisible = true" ></el-input>
                        </el-form-item>
                        <!-- 内部嵌套 -->
                        <el-dialog
                            width="60%"
                            title="请选择"
                            :visible.sync="innerVisible"
                            :close-on-click-modal='false'
                            append-to-body>
                                <div style="height: 350px; overflow: auto ">
                                    <el-tree
                                    :data="treeData"
                                    :props="defaultProps"
                                    :default-expanded-keys="gen"
                                    node-key="id"
                                    accordion
                                    @node-click="handleNodeClick">
                                    </el-tree>
                                </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="innerVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getParent">确 定</el-button>
                            </div>

                        </el-dialog> 
                        <el-form-item label="机构职能:" prop="typeName" :label-width="formLabelWidth">
                        <el-select disabled v-model="detailsform.typeName"   style="width: 100%" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        </el-form-item> 
                        <el-form-item label="机构名称:" prop="name" :label-width="formLabelWidth">
                        <el-input disabled v-model="detailsform.name" ></el-input>
                        </el-form-item>
                        <el-form-item label="机构编码:" prop="id" :label-width="formLabelWidth">
                        <el-input disabled v-model="detailsform.id" ></el-input>
                        </el-form-item>
                       
                    </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="detailsformVisible = false">取 消</el-button>
                        <el-button type="primary" @click="detailsformVisible = false">确 定</el-button>
                    </div>
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
name: 'organization',
//import引入的组件需要注入到对象中才能使用
components: {
    Crumbs: Crumbs,
    SearchCard: SearchCard
},
data() {
//这里存放数据

        return{ 
            value: '',
            code: '',
            name:'',
            tableData: [ ],
            dataCount: 0,
            pageSize: 20,
            current: 1, 
            form: {
                areaName:'',
                typeName: '', 
                name: '',
                areaCode: '', 
                id:'',
                typeCode:''
            },
            editform:{
                areaName:'',
                typeName: '', 
                name: '',
                areaCode: '', 
                id:'',
                typeCode:''
            },
            detailsform:{
                areaName:'',
                typeName: '', 
                name: '',
                areaCode: '', 
                id:'',
                typeCode:''
            },
            dialogFormVisible: false,
            editFormVisible: false,
            detailsformVisible: false,
            dialogUpdataVisible: false,
            formLabelWidth: '160px',
            editId: '',
            currentPage: 1,

            options: [{
                value: '0',
                label: '发布中心发布'
                }, {
                value: '1',
                label: '预案编辑'
                }, {
                value: '2',
                label: '应急办签发'
            }],
            innerVisible: false,
            treeData:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            gen:[],
            transitId: '',
            transitName:'',
            selectedArr:[],


        }

},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合

    methods:{
        // 初始化表格数据
        initTableData(){
            let api = '/api/system/organization';
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
        // 根据条件搜索
        searchData(){
            let api = '/api/system/organization';
            let searchVal = this.name;
            if( searchVal !== ''){
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
                this.initTableData();
            }
        },
        // 重置
        resetData(){
            this.initTableData();
            this.tableData = [];
            this.name = '';
        },
        // 改变页数
        changePage( val ){
            this.current = val; 
            this.currentPage = val;
            if( this.name != '' ){
                let api = '/api/system/organization';
                let searchVal = this.name;
                if( searchVal !== ''){
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
                let api = '/api/system/organization';
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
        // 添加
        addNewSupplies(){
            let api ='/api/system/organization';
            if( this.form.typeCode == '0'){
                this.form.typeName = '发布中心'
            }else if( this.form.typeCode == '1' ){
                this.form.typeName = '预案单位'
            }else if( this.form.typeCode == '2' ){
                this.form.typeName = '应急办'
            }
            if( this.form.areaName != '' && this.form.typeName != '' && this.form.name != '' && this.form.id != '' ){
                this.$axios.post( api,{ 
                    areaName: this.form.areaName,
                    typeName: this.form.typeCode,
                    name: this.form.name,
                    id: this.form.id,
                    areaCode: this.form.areaCode,
                    typeName: this.form.typeName,
                }).then((res)=>{
                    
                    if( res.status == 200){
                        this.dialogFormVisible = false;
                        this.initTableData();
                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'warning'
                        })
                    }
                }).catch((err)=>{
                     
                })
            }else{
                this.$message({
                    message: '请输入完整信息！',
                    type: 'warning'
                })
            }
        },
        //  关闭弹出框回调
        closeDialog(){
            
            this.$refs.form.resetFields()
        }, 
        // 点击操作
            // 删除
        del_this( a ){
            
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let api = '/api/system/organization';
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
                        if( this.name =="" ){
                            this.initTableData();
                            this.currentPage = 1;
                        }else{
                            this.searchData();
                        }
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
        deleteSelected(){
            if( this.selectedArr.length > 0 ){
                this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let api = '/api/system/organization';
                    this.$axios.delete( api , {
                        data: this.selectedArr
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
            }else{
                this.$message({
                    type:'warning',
                    message:'请选择需要删除的数据！'
                })
            }
        },
            // 编辑
        edit_this( a ){
            
            this.editId = a;
            let api = '/api/system/organization';
            this.$axios.get( api , { 
                params:{ 
                    id: a 
                }
            }).then(( res )=>{
                
                let data = res.data.data.content[0];
                if( res.data.status == 200 ){ 
                    this.editform.areaName= data.areaName;
                    this.editform.typeName= data.typeName;
                    this.editform.name= data.name;
                    this.editform.id= data.id;
                    this.editform.areaCode= data.areaCode;
                    this.editform.typeName= data.typeName;

                    this.editFormVisible = true;
                }
            }).catch(( err )=>{
                 
            }) 
        },
            // 上传更新
        updataEditForm(){
            let api ='/api/system/organization';
            this.$axios.put( api,{
                id : this.editId,
                areaName: this.editform.areaName,
                typeName: this.editform.typeCode,
                name: this.editform.name,
                id: this.editform.id,
                areaCode: this.editform.areaCode,
                typeName: this.editform.typeName,
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
            // 查看详情
        details_this(a){
            let api = '/api/system/organization';
            this.$axios.get( api , { 
                params:{ 
                    id: a 
                }
            }).then(( res )=>{
                
                let data = res.data.data.content[0];
                // if( res.data.status == 200 ){ 
                this.detailsform.areaName= data.areaName;
                this.detailsform.typeName= data.typeName;
                this.detailsform.name= data.name;
                this.detailsform.id= data.id;
                this.detailsform.areaCode= data.areaCode;
                this.detailsform.typeName= data.typeName;

                this.detailsformVisible = true;
                // }
            }).catch(( err )=>{
                 
            }) 
        },
        // 获取所属地区
        getArea(){
            let api = '/api/dict/area';
            this.$axios.get(api).then(( res )=>{
                 
                // if( res.data.status == 200){
                    // let arr = [];
                    // let data = res.data.data.content;

                    // for( let i =0;i< data.length;i++ ){
                    //     let a = {};
                    //     a.value = data[i].id;
                    //     a.label = data[i].name;
                    //     // a.
                    //     arr.push( a )
                    // }

                    // // 
                    // this.areaOptions = arr;
                    let oldTreeNodeData  =  res.data.data.content;
                    this.treeData = this.handletreeData( oldTreeNodeData , 'id' ,'parent','children'  );
                    
                // }
            }).catch(( err )=>{
                 
            })  
        },
        handletreeData(source, id, parentId, children){   
            let cloneData = JSON.parse(JSON.stringify(source));
            return cloneData.filter(father=>{
                let branchArr = cloneData.filter(child => father[id] == child[parentId]);
                branchArr.length >0 ? father[children] = branchArr : '';
                let a  = this.listToTree( "id","parent", source );
                this.gen.push( a.id );
                return father[parentId] == a.parent ;      // 如果第一层不是parentId=0，请自行修改
                // return father[parentId] == a;
            })
        },
        listToTree(myId,pId,list){
            function exists(list, parentId){
                for(let i=0; i<list.length; i++){
                    if (list[i][myId] == parentId) return true;
                }
                return false;
            }
            let a = '';
            // get the top level nodes
            for(let i=0; i<list.length; i++){
                let row = list[i];
                if (!exists(list, row[pId])){
                    a = row;
                    // a = row[pId]
                }
            }
            return a ;
        },
        // 点击树 获取节点
        handleNodeClick(a){
            
            this.transitId = a.id;
            this.transitName = a.name;
            
        },
        // 确认获取
        getParent(){
            if( this.transitId !== '' || this.transitName !== '' ){
                this.form.areaCode = this.transitId; 
                this.form.areaName = this.transitName;

                this.editform.areaCode = this.transitId; 
                this.editform.areaName = this.transitName;

                this.innerVisible = false;
            }
            
        },
         // 获取已选数组
        selectedChange( val ){
            
            let arr = [];
            for( let i = 0;i<val.length;i++ ){
                arr.push( val[i].id )
            }
            this.selectedArr = arr;
            
        }, 
 
    },

//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
        this.initTableData();
        this.getArea();
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