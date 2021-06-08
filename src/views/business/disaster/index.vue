<!--  -->
<template>
    <div class='container'>
        <Crumbs title="业务管理-灾种管理"></Crumbs>
        <SearchCard>
            <div class="iListBox">
                <div class="iListLable">灾种名称</div>
                <div class="iListConent">
                    <el-input  v-model="searchName" placeholder="请输入灾种名称"></el-input>
                </div>
            </div>
            <div class="iListBox">
                <div class="iListLable">灾种编码</div>
                <div class="iListConent">
                    <el-input  v-model="searchCode" placeholder="请输入灾种编码"></el-input>
                </div>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-search" @click="searchData" size="small" >搜索</el-button>
                <el-button type="warning" size="small" @click="reset" icon="el-icon-refresh">重置</el-button>
                <el-button type="success" size="small" @click=" addVisible = true "  icon=" ">增加</el-button>
                <el-button type="danger" size="small" @click="deleteSelected"   icon=" ">删除</el-button>
            </div>
        </SearchCard> 

        <div class="icontent">
            <div class="dataTree">
                <div class="treeBox" >
                    <el-tree
                        :data="treeData"
                        :props="defaultProps"
                        :default-expanded-keys="gen"
                        node-key="id"
                        accordion
                        @node-click="handleNodeClick">
                    </el-tree>
                </div>
            </div>

            <div class="tabBOx">
                <div class="tabBox">
                    <el-table
                        stripe
                        :data="tableData"
                        max-height="650"
                        @selection-change="selectedChange"
                        >
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="灾种名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            label="灾种编码">
                        </el-table-column>
                        <el-table-column
                            prop="enabled"
                            label="状态">
                            <template slot-scope="scope">

                                <el-switch
                                    v-model="scope.row.enabled"
                                    :active-value= '1'
                                    :inactive-value= '0'
                                    active-text="启用"
                                    inactive-text="禁用"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="switchChange(scope.row.id,scope.row.enabled)"
                                    >
                                </el-switch>
                            </template>


                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="260">
                            <template slot-scope="scope">
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
                        :page-size="pageSize"
                        :total="dataCount"> 
                    </el-pagination>
                </div>
            </div>
            
            <div class="dialogs">
                <!-- 增加 -->
                <el-dialog title="添加" @close='closeDialog' :close-on-click-modal='false' :visible.sync="addVisible">
                    <div style="height: 300px;overflow: auto;">
                        <el-form :model="addform" :rules="rules" ref="addform" style="marginRight: 80px">
                        <el-form-item label="灾种类型:"  prop="parentName" :label-width="formLabelWidth">
                            <el-input  v-model="addform.parentName"  @focus="innerVisible = true" ></el-input>
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
                                    :data="innerTreeData"
                                    :props="defaultProps"
                                    :default-expanded-keys="gen"
                                    node-key="id"
                                    accordion
                                    @node-click="getDisCode">
                                    </el-tree>
                                </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="innerVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getParent">确 定</el-button>
                            </div>

                        </el-dialog>

                        <el-form-item label="灾种编码:" prop="id" :label-width="formLabelWidth">
                        <el-input placeholder="例如：11B01" v-model="addform.id" ></el-input>
                        </el-form-item>                            
                        <el-form-item label="灾种名称:" prop="name" :label-width="formLabelWidth">
                        <el-input placeholder="例如：台风" v-model="addform.name" ></el-input>
                        </el-form-item>
                        <el-form-item label="灾种描述:" prop="description" :label-width="formLabelWidth">
                        <el-input  v-model="addform.description" ></el-input>
                        </el-form-item>
                    </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitAddForm('addform')">确 定</el-button>
                    </div>
                </el-dialog>

                <!-- 编辑 -->
                <el-dialog title="编辑" :close-on-click-modal='false' :visible.sync="editVisible">
                    <div style="height: 340px;overflow: auto;">
                        <el-form :model="editform" :rules="rules" ref="editform" style="marginRight: 80px">
 
                         <el-form-item label="灾种类型:"  prop="parentName" :label-width="formLabelWidth">
                            <el-input  v-model="editform.parentName"  @focus="innerVisible = true" ></el-input>
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
                                    :data="innerTreeData"
                                    :props="defaultProps"
                                    :default-expanded-keys="gen"
                                    node-key="id"
                                    accordion
                                    @node-click="getDisCode">
                                    </el-tree>
                                </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="innerVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getParent">确 定</el-button>
                            </div>

                        </el-dialog>

                        <el-form-item label="灾种编码:" prop="id" :label-width="formLabelWidth">
                        <el-input  v-model="editform.id" ></el-input>
                        </el-form-item>                            
                        <el-form-item label="灾种名称:" prop="name" :label-width="formLabelWidth">
                        <el-input  v-model="editform.name" ></el-input>
                        </el-form-item>
                        <el-form-item label="灾种描述:" prop="description" :label-width="formLabelWidth">
                        <el-input  v-model="editform.description" ></el-input>
                        </el-form-item>
                        </el-form>
                    </div>
                    <div slot="footer"  class="dialog-footer">
                        <el-button @click="editVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitEditForm('editform')">确 定</el-button>
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
name: 'disaster',
//import引入的组件需要注入到对象中才能使用
components: {
    Crumbs: Crumbs,
    SearchCard: SearchCard
},
data() {
//这里存放数据

        return {
            msg:'',
            searchTreeNodeValue:'',
            treeData:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            gen: [],
            tableData:[],
            currentPage: 1,
            dataCount: 0,
            pageSize: 20,
            searchName:'',
            searchCode:'',
            // 增加
            addVisible: false,
            addform:{
                parent:'',
                id:'',
                name:'',
                description:'',
                enabled: 0,
                parentName:'',
            },
            formLabelWidth: '160px',
            areaOptions:[],
            rules:{
                name:[
                    { 
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    },
                ],
                parentName:[
                    { 
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    },
                ],
                id:[
                    { 
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    },
                    { min: 5, max: 5,  message: '应为5个字符！', }
                ],


            },
            // 删除
            selectedArr:[],
            // 上传
            dialogUpdataVisible: false,
            // 分配人员
            disposeVisible: false,
            disposeform:{
                unit: '',
                job:''
            },
            editId:'',
            options: [{
                value: '0',
                label: '国家'
                }, {
                value: '1',
                label: '省部'
                }, {
                value: '2',
                label: '地厅'
                }, {
                value: '3',
                label: '县处'
                }, {
                value: '4',
                label: '乡科'
                }
                , {
                    value: '99',
                    label: '其他'
            }],
            // 详情
            detailsVisible: false,
            stepArr:[],
            // 编辑
            editVisible: false,
            editform:{
                parent:'',
                id:'',
                name:'',
                description:'',
                enabled: 0,
                parentName:'',
            },
            innerVisible : false,
            innerTreeData:[],
            parentId: '',
            parentName: '',
            fullscreenLoading : false,
            treeSearchId: '',

            tabHeight: '',
        }

},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合

    methods: {
        // 点击树，获取群组受众
        handleNodeClick(data) {
            console.log(data);
            let id = data.id;
            this.treeSearchId = id;
            let api = '/api/dict/disasterType';
                this.$axios.get(api,{
                    params:{
                        parent: id,
                        current: 1,
                        pageSize: 20
                    }
                }).then((res)=>{
                    console.log( res );
                    this.tableData = res.data.data.content;
                    this.dataCount = res.data.data.pagination.total;
                    this.currentPage = res.data.data.pagination.current;
                    this.pageSize = res.data.data.pagination.pageSize;
                }).catch((err)=>{
                    console.log( err )
                }) 
        },
        // 获取群组树数据
        getTreeData(){
            let api = '/api/dict/disasterType';
            this.$axios.get(api).then((res)=>{
                console.log( res.data.data.content )
                let oldTreeNodeData  =  res.data.data.content;
                this.treeData = this.handletreeData( oldTreeNodeData , 'id' ,'parent','children'  ); 
                // this.innerTreeData = this.handletreeData( oldTreeNodeData , 'id' ,'parent','children'  );
            }).catch((err)=>{
                console.log( err )
            })
        },
        getInnerTreeData(){
            let api = '/api/dict/addDisasterType';
            this.$axios.get(api).then((res)=>{
                console.log( res.data.data.content )
                let oldTreeNodeData  =  res.data.data.content;
                this.innerTreeData = this.AtreeData( oldTreeNodeData,'id','parent','children' );
                console.log( this.innerTreeData  )
            }).catch((err)=>{
                console.log( err )
            })
        },
        // 处理获取到的树结构
        AtreeData(source, id, parentId, children){   
            let cloneData = JSON.parse(JSON.stringify(source))
            return cloneData.filter(father=>{
                let branchArr = cloneData.filter(child => father[id] == child[parentId]);
                branchArr.length>0 ? father[children] = branchArr : ''
                return father[parentId] == 0        // 如果第一层不是parentId=0，请自行修改
            })
        } ,
        // bbb(myId,pId,list){
        //     function exists(list, parentId){
        //         for(let i=0; i<list.length; i++){
        //             if (list[i][myId] == parentId) return true;
        //         }
        //         return false;
        //     }
        //     let a = '';
        //     // get the top level nodes
        //     for(let i=0; i<list.length; i++){
        //         let row = list[i];
        //         if (!exists(list, row[pId])){
        //             a = row;
        //             // a = row[pId]
        //         }
        //     }
        //     return a ;
        // },





        // 处理获取到的树结构
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
        // 获取表格数据
        initTableData(){
            let api = '/api/dict/disasterType';
            this.$axios.get(api,{
                params:{
                    current: 1,
                    pageSize: 20
                }
            }).then((res)=>{
                console.log( res );
                this.tableData = res.data.data.content;
                this.dataCount = res.data.data.pagination.total;
                this.currentPage = res.data.data.pagination.current;
                this.pageSize = res.data.data.pagination.pageSize;
            }).catch((err)=>{
                console.log( err )
            })
        },
        // 多选
        selectedChange(val){
            console.log( val )
            let arr = [];
            for( let i = 0;i<val.length;i++ ){
                arr.push( val[i].id )
            }
            this.selectedArr = arr;
            console.log( this.selectedArr );
        },
        // 改变分页
        changePage( val ){
            this.currentPage = val;
            if( this.searchName != '' || this.searchCode != '' ){
                let api = '/api/dict/disasterType';
                this.$axios.get(api,{
                    params:{
                        name: this.searchName,
                        code: this.searchCode,
                        current: val,
                        pageSize: 20
                    }
                }).then((res)=>{
                    console.log( res );
                    this.tableData = res.data.data.content;
                    this.dataCount = res.data.data.pagination.total;
                    this.currentPage = res.data.data.pagination.current;
                    this.pageSize = res.data.data.pagination.pageSize;
                }).catch((err)=>{
                    console.log( err )
                }) 
            }else if( this.treeSearchId != '' && this.searchName == '' || this.searchCode == '' ){

                let api = '/api/dict/disasterType';
                    this.$axios.get(api,{
                        params:{
                            parent: this.treeSearchId,
                            current: val,
                            pageSize: 20
                        }
                    }).then((res)=>{
                        console.log( res );
                        this.tableData = res.data.data.content;
                        this.dataCount = res.data.data.pagination.total;
                        this.currentPage = res.data.data.pagination.current;
                        this.pageSize = res.data.data.pagination.pageSize;
                    }).catch((err)=>{
                        console.log( err )
                    }) 
            }else{
                let api = '/api/dict/disasterType';
                this.$axios.get(api,{
                    params:{
                        current: val,
                        pageSize: 20
                    }
                }).then((res)=>{
                    console.log( res );
                    this.tableData = res.data.data.content;
                    this.dataCount = res.data.data.pagination.total;
                    this.currentPage = res.data.data.pagination.current;
                    this.pageSize = res.data.data.pagination.pageSize;
                }).catch((err)=>{
                    console.log( err )
                }) 
            }
        },
        // 搜索
        searchData(){
            if( this.searchName == '' &&  this.searchCode == '' ){
                this.$message({
                    message:'请输入正确的搜索条件',
                    type: 'warning'
                })
            }else{
                 let api = '/api/dict/disasterType';
                this.$axios.get(api,{
                    params:{
                        name: this.searchName,
                        code: this.searchCode,
                        current: 1,
                        pageSize: 20
                    }
                }).then((res)=>{
                    console.log( res );
                    this.tableData = res.data.data.content;
                    this.dataCount = res.data.data.pagination.total;
                    this.currentPage = res.data.data.pagination.current;
                    this.pageSize = res.data.data.pagination.pageSize;
                }).catch((err)=>{
                    console.log( err )
                }) 
            }
        },
        // 重置
        reset(){
            this.initTableData();
            this.searchName = '';
            this.searchCode = '';
            this.treeSearchId = '';
        },
        // 查询地区
        getArea(){
            let api = '/api/dict/area';
            this.$axios.get(api).then(( res )=>{
                if( res.data.status == 200){
                    let arr = [];
                    let data = res.data.data.content;
                    for( let i =0;i< data.length;i++ ){
                        let a = {};
                        a.value = data[i].id;
                        a.label = data[i].name;
                        arr.push( a )
                    }
                    this.areaOptions = arr;
                }
            }).catch(( err )=>{
                console.log( err )
            })  
        },
        // 关闭模态框触发
        closeDialog(){
            this.$refs.addform.resetFields()
        },
        // 赋值地区
        getAreaName(a){
            let obj = {};
            obj = this.areaOptions.find((item)=>{//这里的userList就是上面遍历的数据源
                return item.value === a;//筛选出匹配数据
            });
            console.log(obj.label);//我这边的name就是对应label的
            this.addform.areaName = obj.label;
        },
        // 获取上级灾种
        getDisCode(data){
            console.log(data);
            this.parentId = data.id;
            this.parentName = data.name;
        },
        getParent(){
 
            if( this.parentId !== '' || this.parentName !== '' ){
                this.addform.parent = this.parentId;
                this.addform.parentName = this.parentName;

                this.innerVisible = false;
            }
        },
        // 提交表单
        submitAddForm(formName){
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //如果通过验证 to do...
                    let api = '/api/dict/disasterType';
                    this.$axios.post(api,{

                        parent: this.addform.parent,
                        id: this.addform.id,
                        description: this.addform.description,
                        name: this.addform.name,

                    }).then(( res )=>{
                        console.log( res );
                        if( res.data.status == 200 ){
                            this.$message({
                                message:'添加成功！',
                                type:'success'
                            });
                            this.addVisible = false;
                            this.initTableData();
                        }
                    }).catch(( err )=>{
                        console.log( err );
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
            console.log( this.$refs[formName] )
        },
        // 改变switch
        switchChange(id,enabled){
            console.log(id);
            console.log(enabled);
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            
            let api = "/api/dict/disasterType";
            this.$axios.put(api,{
                id: id,
                enabled: enabled,
            }).then(( res )=>{
                console.log(res)
                if( res.data.status == 200){
                    loading.close();
                }
            }).catch(( err )=>{
                console.log(err)
            })


        },
        // 删除
        deleteSelected(){
            let api = '/api/dict/disasterType';
            if( this.selectedArr.length > 0 ){
                this.$axios.delete(api,{
                    data: this.selectedArr
                }).then(( res )=>{
                    console.log( res.data.status == 200 );
                    if( res.data.status == 200 ){
                        this.$message({
                            type: 'success',
                            message:'删除成功！'
                        });
                        this.initTableData();
                        this.selectedArr = [];
                    }
                }).catch((err)=>{
                    console.log( err )
                })
            }else{
                this.$message({
                    type: 'warning',
                    message:'请选取需要删除的数据！'
                })
            }
        },
        del_this( a ){
            console.log(a);
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let api = '/api/dict/disasterType';
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
                        this.initTableData();
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
 
        // 详情
        details(a){
            this.detailsVisible = true;
            this.editId = a;
            let api ='/api/dict/disasterType/job';
            this.$axios.get(api,{
                 params:{
                    targetId: a
                }
            }).then((res)=>{
                console.log( res );
                this.stepArr = res.data.data.content;
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 编辑
        edit_this(id){
            this.editVisible = true;
            this.editId = id;
            let api ='/api/dict/disasterType';
            this.$axios.get(api,{
                 params:{
                    id: id
                }
            }).then((res)=>{
                console.log( res );
                if( res.data.status ==200 ){
                    this.editform.description = res.data.data.content.description;
                    this.editform.id = res.data.data.content.id;
                    this.editform.name = res.data.data.content.name;
                    this.editform.parent = res.data.data.content.parent;

                    this.getParentName( res.data.data.content.parent )
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        getParentName(id){
            let api ='/api/dict/disasterType';
            this.$axios.get(api,{
                 params:{
                    id: id
                }
            }).then((res)=>{
                console.log( res );
                if( res.data.status ==200 ){
                    this.editform.parentName = res.data.data.content.name;
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        submitEditForm(formName){
             this.$refs[formName].validate(valid => {
                if (valid) {
                    //如果通过验证 to do...
                    let api = '/api/dict/disasterType';
                    this.$axios.put(api,{
                        id: this.editId,
                        description: this.editform.description,
                        parent: this.editform.parent,
                        name: this.editform.name,
                    }).then(( res )=>{
                        console.log( res );
                        if( res.data.status == 200 ){
                            this.$message({
                                message:'添加成功！',
                                type:'success'
                            });
                            this.editVisible = false;
                            this.initTableData();
                        }
                    }).catch(( err )=>{
                        console.log( err );
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
        

    },

//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
        this.getTreeData();
        this.getInnerTreeData();
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
        .dataTree{
            width: 300px;
            height: calc(100vh - 300px);
            margin-right: 20px;
            // float: left;
            .treeBox{
                height: 100%;
                padding: 20px 0px 0px 30px;
                overflow: auto;
            }
            ::-webkit-scrollbar 
                { 
                    width: 3px; 
                    height: 16px; 
                    background-color: #F5F5F5; 
                } 
                
                /*定义滚动条轨道 内阴影+圆角*/ 
                ::-webkit-scrollbar-track 
                { 
                    -webkit-box-shadow: inset 0 0 6px rgba(103, 172, 250, 0.3); 
                    border-radius: 10px; 
                    background-color: rgb(122, 191, 247); 
                } 
                
                /*定义滑块 内阴影+圆角*/ 
                ::-webkit-scrollbar-thumb 
                { 
                    border-radius: 10px; 
                    -webkit-box-shadow: inset 0 0 6px rgba(45, 198, 245, 0.3); 
                    background-color: rgb(195, 228, 230); 
                }
        }

        .tabBOx{
            width: 100%;
            padding: 20px 0 0 0;
            .el-table{
                height: calc( 100vh - 340px );
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