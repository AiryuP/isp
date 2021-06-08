<!--  -->
<template>
    <div class='container'>
        <Crumbs title="业务管理-群组管理"></Crumbs>
        <SearchCard>
            <div class="iListBox">
                <div class="iListLable">群组名称</div>
                <div class="iListConent">
                    <el-input  v-model="name" placeholder="请输入群组名称"></el-input>
                </div>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-search" size="small" @click="searchData" >搜索</el-button>
                <el-button type="warning" size="small" @click="resetData" icon="el-icon-refresh">重置</el-button>
                <el-button type="primary" size="small" @click="dialogFormVisible = true" icon="el-icon-plus">添加</el-button>
                <el-button type="primary" size="small" @click="downloadTemplate"  >下载模板</el-button>
                <el-button type="primary" size="small" @click="dialogUpdataVisible = true"  >导入数据</el-button>
            </div>
            
            <el-dialog title="上传文件"   :close-on-click-modal='false' :visible.sync="dialogUpdataVisible">
                <div style="height: 340px;">
                        <el-upload
                            class="upload-demo"
                            action="http://123"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="1"
                            ref="newupload"
                            accept=".xls,.xlsx"
                            :auto-upload='false'
                            :on-exceed="handleExceed"
                            :http-request="uploadFile"
                            >
                            <el-button   type="primary">导入数据</el-button>
                        </el-upload>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogUpdataVisible = false">取 消</el-button>
                    <el-button type="primary" @click="newSubmitForm">确 定</el-button>
                </div>
            </el-dialog>
        </SearchCard> 

        <div class="icontent">
            <div class="tabBOx">
                <div class="tabBox">
                <el-table
                    stripe
                    :data="tableData"
                    max-height="650"
                    id="Tab"
                    style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="群组名称"> 
                        </el-table-column>
                        <el-table-column
                            prop="areaName"
                            label="所属地区">
                        </el-table-column>
                        <el-table-column
                            prop="typeName"
                            label="所属渠道" >
                        </el-table-column>
                        <el-table-column 
                        label="操作"
                        width="300">
                        <template slot-scope="scope">
                            <el-button type="info" size="mini" @click="distribute( scope.row.id )" icon="el-icon-copy-document" >分配人员</el-button>
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
                        <el-form-item label="所属地区:"  prop="areaCode" :label-width="formLabelWidth">
                        <!-- <el-input v-model="form.areaName"></el-input> -->
                            <el-select v-model="form.areaCode" @change="getAreaName" style="width: 100%" placeholder="请选择">
                                <el-option
                                v-for="item in areaOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属渠道:" prop="type" :label-width="formLabelWidth">
                        <!-- <el-input v-model="form.typeName" ></el-input> -->
                            <el-select v-model="form.type" @change="getTypeName" style="width: 100%" placeholder="请选择">
                                <el-option
                                v-for="item in channelOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item label="群组名称:" prop="name" :label-width="formLabelWidth">
                        <el-input  v-model="form.name" ></el-input>
                        </el-form-item>
                    </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addNewSupplies">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 修改 -->
                <el-dialog title="编辑" :close-on-click-modal='false' :visible.sync="editFormVisible">
                    <div style="height: 340px;overflow: auto;">
                        <el-form :model="editform" style="marginRight: 80px">
                        <el-form-item label="所属地区:"  prop="areaCode" :label-width="formLabelWidth">
                            <el-select v-model="editform.areaCode" @change="getAreaName_edit" style="width: 100%" placeholder="请选择">
                                <el-option
                                v-for="item in areaOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属渠道:" prop="type" :label-width="formLabelWidth"> 
                            <el-select v-model="editform.type" @change="getTypeName_edit" style="width: 100%" placeholder="请选择">
                                <el-option
                                v-for="item in channelOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item label="群组名称:" prop="name" :label-width="formLabelWidth">
                        <el-input  v-model="editform.name" ></el-input>
                        </el-form-item>
                       
                    </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="editFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updataEditForm">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 分配 -->
                <el-dialog class="distribute" title="分配人员信息" :close-on-click-modal='false' width='80%' :visible.sync="distributeVisible">
                    <div style="height: 370px;">
                        <el-tabs @tab-click="a" type="border-card">
                            <el-tab-pane label="未选受众">
                                <div style="height: 330px; overflow: auto">
                                    <el-input v-model="unselectedValue" style="width: 300px;" placeholder="请输入用户名"> </el-input> &nbsp;&nbsp;
                                    <el-button type="primary" @click="searchUnselect" icon="el-icon-search"></el-button>
                                    <el-button type="warning" @click='resetData' icon="el-icon-refresh"></el-button>
                                    <el-button type="success" @click="addPeople">添加</el-button>
                                    <el-table
                                        border
                                        ref="multipleTable"
                                        :data="unselectedTableData"
                                        tooltip-effect="dark"
                                        max-height="240"
                                        @selection-change="unselectedChange"
                                        style="width: 100%;margin-top: 10px;"
                                        
                                        >
                                        <!-- @selection-change="handleSelectionChange" -->
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="name"
                                        label="人员名称">
                                        </el-table-column>
                                        <el-table-column
                                        prop="mobile"
                                        label="终端号码">
                                        </el-table-column>
                                        <el-table-column
                                        prop="email"
                                        label="邮箱">
                                        </el-table-column>
                                        <el-table-column
                                        prop="address"
                                        label="地址"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination
                                        background
                                        :current-page.sync = "unsctedCurrentPage"
                                        @current-change='changeUnsctedPage'
                                        layout="prev, pager, next"
                                        :page-size="20"
                                        :total="unsctedCount"> 
                                    </el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="已选受众">
                                <div style="height: 330px; overflow: auto">
                                    <el-input v-model="selectedValue" style="width: 300px;" placeholder="请输入用户名"></el-input> &nbsp;&nbsp;
                                    <el-button type="primary" @click="searchselected" icon="el-icon-search"></el-button>
                                    <el-button type="warning" @click='resetData' icon="el-icon-refresh"></el-button>
                                    <el-button type="danger" @click="remPeople">移除</el-button>
                                    <el-table
                                        border
                                        ref="multipleTable"
                                        :data="selectedTableData"
                                        tooltip-effect="dark"
                                        max-height="240"
                                        @selection-change="selectedChange"
                                        style="width: 100%;margin-top:10px"
                                          >
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="name"
                                        label="人员名称">
                                        </el-table-column>
                                        <el-table-column
                                        prop="mobile"
                                        label="终端号码">
                                        </el-table-column>
                                        <el-table-column
                                        prop="email"
                                        label="邮箱">
                                        </el-table-column>
                                        <el-table-column
                                        prop="address"
                                        label="地址"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination
                                        background
                                        :current-page.sync = "selectedCurrentPage"
                                        @current-change='selectedChangePage'
                                        layout="prev, pager, next"
                                        :page-size="20"
                                        :total="selectedCount"> 
                                    </el-pagination>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <!-- <el-button @click="distributeVisible = false">取 消</el-button> -->
                        <el-button type="primary" @click="distributeVisible = false">关闭</el-button>
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
name: 'group',
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
            type:'',
        },
        editform:{
            areaName:'',
            typeName: '', 
            name: '',
            areaCode: '',
            type:'',
        },
        detailsform:{
            hospitalName:'',
            hospitalLevel: '', 
            lon: '',
            lat: '', 
            contact:'',
            mobilePhone:'',
        },
        dialogFormVisible: false,
        editFormVisible: false,
        distributeVisible: false,
        dialogUpdataVisible: false,
        formLabelWidth: '160px',
        editId: '',
        currentPage: 1,
        channelOptions: [],
        areaOptions: [],
        unselectedTableData:[],
        selectedTableData:[],
        selectedValue:'',
        unselectedValue:'',
        // 未选
        unsctedCurrentPage:0,
        unsctedCount:0,
        // 已选
        selectedCurrentPage:0,
        selectedCount:0,
        _groupId : '', //已选群组

        selectedArr:[],
        unselectedArr: [],
    }

},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合

    methods:{
        // 上传文件
        newSubmitForm(){//确定上传
            this.$refs.newupload.submit();
        },
        handleExceed(files) {
            this.$message.warning(`当前限制选择 1 个文件`);
        },
        uploadFile(param){
            var fileObj = param.file
            console.log(fileObj)
            var FileController = '/api/publish/target/inexcel'    // 接收上传文件的后台地址
            var form = new FormData()    // FormData 对象
            form.append('addFile', fileObj)    // 文件对象

            this.$axios.post(FileController, form).then( (res)=> {
                console.log(res);
                if( res.data.code == 200 ){
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    })
                    this.$refs.newupload.clearFiles();
                    this.dialogUpdataVisible = false;
                    this.initTableData();
                }else{
                     this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    })
                }
            }).catch((error) =>{
                console.log(error);
            })
        },
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 下载模板
        downloadTemplate(){
            if( this.tableData.length < 1  ){
                this.$message({
                    message: '请先创建至少一个群组！',
                    type: 'warning'
                })
                return ;
            } 
            let api = '/api/publish/group/excel';
            this.$axios.get(api,{responseType: 'blob'}).then(
                (res)=>{
                    console.log( res )
                    // let data = res.data
                    // window.open(data.responseText);
                    if( res.status == 200){
                        let blob = new Blob([res.data],{type: 'application/vnd.ms-excel'});

                        let downloadElement = document.createElement('a');
                        let href = window.URL.createObjectURL(blob); //创建下载的链接
                    　　downloadElement.href = href;
                    　　downloadElement.download = '群组受众数据导入.xlsx'; //下载后文件名
                    　　document.body.appendChild(downloadElement);
                    　　downloadElement.click(); //点击下载
                    　　document.body.removeChild(downloadElement); //下载完成移除元素
                    　　window.URL.revokeObjectURL(href); //释放掉blob对象 
                    }
                }
            ).catch((err)=>{
                console.log(err)
            })
        },
        // 初始化表格数据
        initTableData(){
            let api = '/api/publish/group';
            this.$axios.get( api , { 
                params:{
                    current: 1,
                    pageSize: 20
                }
            }).then(( res )=>{
                // console.log( res );
                this.tableData = res.data.data.content;
                this.currentPage = res.data.data.pagination.current;
                this.dataCount = res.data.data.pagination.total;
            }).catch(( err )=>{
                console.log( err )
            }) 
   
        }, 
        // 根据条件搜索
        searchData(){
            let api = '/api/publish/group';
            let searchVal = this.name;
            if( searchVal !== ''){
                this.$axios.get( api ,{
                    params:{   
                        name: searchVal,
                        current: 1,
                        pageSize: 20
                    }
                }).then(( res )=>{
                    console.log( res );
                    this.tableData = res.data.data.content;
                    this.currentPage = res.data.data.pagination.current;
                    this.dataCount = res.data.data.pagination.total;
                }).catch(( err )=>{
                    console.log( err )
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
            this.name = '';

            this.unsctedInit();
            this.unselectedValue = '';

            this.selectedInit();
            this.selectedValue = '';
        },
        // 改变页数
        changePage( val ){
            this.current = val; 
            this.currentPage = val;
            if( this.name != '' ){
                let api = '/api/publish/group';
                let searchVal = this.name;
                if( searchVal !== ''){
                    this.$axios.get( api ,{
                        params:{ 
                            name: searchVal,
                            current: this.current,
                            pageSize: 20
                        }
                    }).then(( res )=>{
                        console.log( res );
                        this.tableData = res.data.data.content;
                        this.currentPage = res.data.data.pagination.current;
                        this.dataCount = res.data.data.pagination.total;
                    }).catch(( err )=>{
                        console.log( err )
                    }) 
                }else{
                    this.$message({
                        message: '请输入搜索条件',
                        type: 'warning'
                    })
                }
            }else{
                let api = '/api/publish/group';
                this.$axios.get( api ,{
                    params:{ 
                        current: this.current,
                        pageSize: 20
                    }
                }).then(( res )=>{
                    console.log( res );
                    this.tableData = res.data.data.content;
                    this.currentPage = res.data.data.pagination.current;
                    this.dataCount = res.data.data.pagination.total;
                }).catch(( err )=>{
                    console.log( err )
                })
            }
        },
        // 添加
        addNewSupplies(){
            let api ='/api/publish/group';
            if( this.form.areaCode != '' && this.form.type != '' && this.form.name != '' ){
                this.$axios.post( api,{ 
                    areaName: this.form.areaName,
                    typeName: this.form.typeName,
                    name: this.form.name,
                    areaCode:  this.form.areaCode,
                    type: this.form.type,
                }).then((res)=>{
                    console.log( res );
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
                    console.log( err )
                })
            }else{
                this.$message({
                    message: '请正确输入信息！',
                    type: 'warning'
                })
            }
        },
        //  关闭弹出框回调
        closeDialog(){
            console.log( this.$refs.form  )
            this.$refs.form.resetFields()
        }, 
        // 点击操作
            // 删除
        del_this( a ){
            console.log(a);
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let api = '/api/publish/group';
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
            // 编辑
        edit_this( a ){
            console.log( a )
            this.editId = a;
            let api = '/api/publish/group';
            this.$axios.get( api , { 
                params:{ 
                    id: a 
                }
            }).then(( res )=>{
                console.log( res );
                let data = res.data.data.content;
                if( res.data.status == 200 ){ 
                    this.editform.areaName= data.areaName;
                    this.editform.typeName= data.typeName;
                    this.editform.name= data.name;
                    this.editform.areaCode= data.areaCode;
                    this.editform.type= data.type;

                    this.editFormVisible = true;
                }
            }).catch(( err )=>{
                console.log( err )
            }) 
        },
            // 上传更新
        updataEditForm(){
            let api ='/api/publish/group';
            this.$axios.put( api,{
                id : this.editId,
                areaName: this.editform.areaName,
                typeName: this.editform.typeName,
                name: this.editform.name,
                areaCode:  this.editform.areaCode,
                type: this.editform.type,
            }).then((res)=>{
                console.log( res );
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
                console.log( err )
            })
        },
            // 查看详情
        details_this(a){
            let api = '/api/publish/group';
            this.$axios.get( api , { 
                params:{ 
                    id: a 
                }
            }).then(( res )=>{
                console.log( res );
                let data = res.data.data.content;
                if( res.data.status == 200 ){ 
                    this.detailsform.hospitalName= data.hospitalName;
                    this.detailsform.hospitalLevel= data.hospitalLevel;
                    this.detailsform.lon= data.lon;
                    this.detailsform.lat= data.lat;
                    this.detailsform.contact= data.contact;
                    this.detailsform.mobilePhone= data.mobilePhone;

                    this.detailsformVisible = true;
                }
            }).catch(( err )=>{
                console.log( err )
            }) 
        },

        // 获取渠道
        getChannel(){
            let api = '/api/dict/channel';
            this.$axios.get(api).then(( res )=>{
                // console.log( res )
                if( res.data.status == 200){
                    let arr = [];
                    let data = res.data.data.content;

                    for( let i =0;i< data.length;i++ ){
                        let a = {};
                        a.value = data[i].code;
                        a.label = data[i].name;
                        arr.push( a )
                    }

                    // console.log( arr )
                    this.channelOptions = arr;
                }
            }).catch((err)=>{
                console.log( err )
            })
        },
        // 获取所属地区
        getArea(){
            let api = '/api/dict/area';
            this.$axios.get(api).then(( res )=>{
                console.log( res )
                if( res.data.status == 200){
                    let arr = [];
                    let data = res.data.data.content;

                    for( let i =0;i< data.length;i++ ){
                        let a = {};
                        a.value = data[i].id;
                        a.label = data[i].name;
                        // a.
                        arr.push( a )
                    }

                    // console.log( arr )
                    this.areaOptions = arr;
                }
            }).catch(( err )=>{
                console.log( err )
            })  
        },
        // 获取label
        getAreaName(a){
            // this.form.areaCode 
            console.log(  a) 
            let obj = {};
            obj = this.areaOptions.find((item)=>{//这里的userList就是上面遍历的数据源
                return item.value === a;//筛选出匹配数据
            });
            console.log(obj.label);//我这边的name就是对应label的
            this.form.areaName = obj.label;
        },
        getTypeName(a){
             let obj = {};
            obj = this.channelOptions.find((item)=>{//这里的userList就是上面遍历的数据源
                return item.value === a;//筛选出匹配数据
            });
            console.log(obj.label);//我这边的name就是对应label的
            this.form.typeName = obj.label;
        },
        getAreaName_edit(a){
            // this.form.areaCode 
            console.log(  a) 
            let obj = {};
            obj = this.areaOptions.find((item)=>{//这里的userList就是上面遍历的数据源
                return item.value === a;//筛选出匹配数据
            });
            console.log(obj.label);//我这边的name就是对应label的
            this.editform.areaName = obj.label;
        },
        getTypeName_edit(a){
             let obj = {};
            obj = this.channelOptions.find((item)=>{//这里的userList就是上面遍历的数据源
                return item.value === a;//筛选出匹配数据
            });
            console.log(obj.label);//我这边的name就是对应label的
            this.editform.typeName = obj.label;
        },
        // 分配  未选
        distribute(a){
            this.distributeVisible = true;
            this._groupId = a;
            this.unsctedInit();
        },
        unsctedInit(){
            let api = "/api/publish/target/group";
            this.$axios.get(api,{
                params:{ 
                    groupId: this._groupId,
                    current: 1,
                    pageSize: 20
                }
            }).then(( res )=>{
                console.log( res )
                if( res.data.status == 200 ){
                    this.unselectedTableData = res.data.data.content;
                    this.unsctedCurrentPage = res.data.data.pagination.current;
                    this.unsctedCount = res.data.data.pagination.total;
                }
            }).catch((err)=>{
                console.log( err )
            })
        },
        // 未选  改变分页
        changeUnsctedPage( val ){
            this.unsctedCurrentPage = val;
            if( this.unselectedValue != '' ){
                let api = "/api/publish/target/group";
                let searchVal = this.unselectedValue;
                if( searchVal !== ''){
                    this.$axios.get( api ,{
                        params:{ 
                            name: searchVal,
                            groupId: this._groupId,
                            current: this.unsctedCurrentPage,
                            pageSize: 20
                        }
                    }).then(( res )=>{
                        console.log( res );
                        this.unselectedTableData = res.data.data.content;
                        this.unsctedCurrentPage = res.data.data.pagination.current;
                        this.unsctedCount = res.data.data.pagination.total;
                    }).catch(( err )=>{
                        console.log( err )
                    }) 
                }else{
                    this.$message({
                        message: '请输入搜索条件',
                        type: 'warning'
                    })
                }
            }else{
                let api = "/api/publish/target/group";
                this.$axios.get( api ,{
                    params:{ 
                        groupId: this._groupId,
                        current: this.unsctedCurrentPage,
                        pageSize: 20
                    }
                }).then(( res )=>{
                    console.log( res );
                    this.unselectedTableData = res.data.data.content;
                    this.unsctedCurrentPage = res.data.data.pagination.current;
                    this.unsctedCount = res.data.data.pagination.total;
                }).catch(( err )=>{
                    console.log( err )
                })
            }
        },
        // 搜索 未选
        searchUnselect(){
            let api = "/api/publish/target/group";
            let searchVal = this.unselectedValue;
            if( searchVal !== ''){
                this.$axios.get( api ,{
                    params:{   
                        name: searchVal,
                        current: 1,
                        pageSize: 20
                    }
                }).then(( res )=>{
                    console.log( res );
                    this.unselectedTableData = res.data.data.content;
                    this.unsctedCurrentPage = res.data.data.pagination.current;
                    this.unsctedCount = res.data.data.pagination.total;
                }).catch(( err )=>{
                    console.log( err )
                }) 
            }else{
                this.$message({
                    message: '请输入搜索条件',
                    type: 'warning'
                })
            }
        },
        // 已选
        selectedInit(){
            let api = "/api/publish/group/target";
            this.$axios.get(api,{
                params:{ 
                    groupId: this._groupId,
                    current: 1,
                    pageSize: 20
                }
            }).then(( res )=>{
                console.log( res )
                if( res.data.status == 200 ){
                    this.selectedTableData = res.data.data.content;
                    this.selectedCurrentPage = res.data.data.pagination.current;
                    this.selectedCount = res.data.data.pagination.total;
                }
            }).catch((err)=>{
                console.log( err )
            })
        },
        // 已选 改变分页
        selectedChangePage( val ){
            this.selectedCurrentPage = val;
            if( this.selectedValue != '' ){
                let api = "/api/publish/group/target";
                let searchVal = this.selectedValue;
                if( searchVal !== ''){
                    this.$axios.get( api ,{
                        params:{ 
                            name: searchVal,
                            groupId: this._groupId,
                            current: this.selectedCurrentPage,
                            pageSize: 20
                        }
                    }).then(( res )=>{
                        console.log( res );
                        this.selectedTableData = res.data.data.content;
                        this.selectedCurrentPage = res.data.data.pagination.current;
                        this.selectedCount = res.data.data.pagination.total;
                    }).catch(( err )=>{
                        console.log( err )
                    }) 
                }else{
                    this.$message({
                        message: '请输入搜索条件',
                        type: 'warning'
                    })
                }
            }else{
                let api = "/api/publish/group/target";
                this.$axios.get( api ,{
                    params:{ 
                        groupId: this._groupId,
                        current: this.selectedCurrentPage,
                        pageSize: 20
                    }
                }).then(( res )=>{
                    console.log( res );
                    this.selectedTableData = res.data.data.content;
                    this.selectedCurrentPage = res.data.data.pagination.current;
                    this.selectedCount = res.data.data.pagination.total;
                }).catch(( err )=>{
                    console.log( err )
                })
            }
        },
        // 搜索 已选
        searchselected(){
            let api = "/api/publish/group/target";
            let searchVal = this.selectedValue;
            if( searchVal !== ''){
                this.$axios.get( api ,{
                    params:{   
                        name: searchVal,
                        current: 1,
                        pageSize: 20
                    }
                }).then(( res )=>{
                    console.log( res );
                    this.selectedTableData = res.data.data.content;
                    this.selectedCurrentPage = res.data.data.pagination.current;
                    this.selectedCount = res.data.data.pagination.total;
                }).catch(( err )=>{
                    console.log( err )
                }) 
            }else{
                this.$message({
                    message: '请输入搜索条件',
                    type: 'warning'
                })
            }
        },
        // 切换tabs
        a(a){
            console.log(a)
            if( a.label == '已选受众'){
                this.selectedInit();
            }else if( a.label == '未选受众' ){
                this.unsctedInit();
            }
        },
        // 获取已选数组
        selectedChange( val ){
            console.log( val )
            let arr = [];
            for( let i = 0;i<val.length;i++ ){
                arr.push( val[i].id )
            }
            this.selectedArr = arr;
            console.log( this.selectedArr );
        },
        // 获取未选数组
        unselectedChange( val ){
            console.log( val )
            let arr = [];
            for( let i = 0;i<val.length;i++ ){
                arr.push( val[i].id )
            }
            this.unselectedArr = arr;
            console.log( this.unselectedArr );
        },
        // 添加
        addPeople(){
            if( this.unselectedArr.length > 0 ){

                let api = '/api/publish/group/target';
                this.$axios.post(api,{
                    key: this._groupId,
                    list: this.unselectedArr,
                }).then((res)=>{
                    console.log(res)
                    if( res.data.status == 200 ){
                        this.unsctedInit();
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        })
                    }
                }).catch((err)=>{
                    console.log( err )
                })

            }else{
                this.$message({
                    type: 'warning',
                    message: '请选择人员！'
                })
                return;
            }

        },
        // 移除
        remPeople(){
            if( this.selectedArr.length > 0 ){

                let api = '/api/publish/group/target';
                this.$axios.delete(api,{
                    data:{
                        key: this._groupId,
                        list: this.selectedArr,
                    }
                }).then((res)=>{
                    console.log(res)
                    if( res.data.status == 200 ){
                        this.selectedInit();
                        this.$message({
                            message: '移除成功！',
                            type: 'success'
                        })
                    }else{
                         this.$message({
                            message: res.data.message,
                            type: 'warning'
                        })
                    }
                }).catch((err)=>{
                    console.log( err )
                })

            }else{
                this.$message({
                    type: 'warning',
                    message: '请选择人员！'
                })
                return;
            }
        },
 
 
    },

//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
        this.initTableData();
        this.getChannel();
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