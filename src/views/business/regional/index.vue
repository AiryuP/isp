<!--  -->
<template>
    <div class='container'>
        <Crumbs title="业务管理-机构管理"></Crumbs>
        <SearchCard>
            <div class="iListBox">
                <div class="iListLable">地区名称</div>
                <div class="iListConent">
                    <el-input v-model="name" placeholder="请输入地区名称"></el-input>
                </div>
            </div>
            <div class="iListBox">
                <div class="iListLable">地区级别</div>
                <div class="iListConent">
                    <el-select v-model="level" placeholder="请选择地区级别">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-search" size="small" @click="searchData" >搜索</el-button>
                <el-button type="warning" size="small" @click="resetData" icon="el-icon-refresh">重置</el-button>
                <el-button type="primary" size="small" @click="addArea"  icon="el-icon-plus">添加</el-button>
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
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="地区编码"> 
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="地区名称">
                    </el-table-column>
                    <el-table-column
                        prop="parentName"
                        label="上级地区" >
                    </el-table-column>
                    <el-table-column
                        prop="level"
                        label="地区级别" >
                        <template slot-scope="scope">
                           <el-tag v-if="scope.row.level == '1'" effect="dark"> 省级 </el-tag>
                           <el-tag v-if="scope.row.level == '2'" effect="dark"> 市级 </el-tag>
                           <el-tag v-if="scope.row.level == '3'" effect="dark"> 县级 </el-tag>
                           <el-tag v-if="scope.row.level == '4'" effect="dark"> 乡镇 </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column 
                    label="操作"
                    width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="details_this( scope.row.id )" icon="el-icon-copy-document" >详情</el-button>
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
                <el-dialog title="添加" @close='closeDialog'   :close-on-click-modal='false' :visible.sync="addFormVisible">
                    <div style="height: 340px;overflow: auto;">
                        <el-form :model="form" ref="form" style="marginRight: 80px">

                        <el-form-item label="地区级别:" prop="level" :label-width="formLabelWidth"> 
                            <el-select v-model="form.level"   style="width: 100%" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        
                        <el-form-item label="上级地区:"  prop="parentName" :label-width="formLabelWidth"> 
                            <el-input  v-model="form.parentName"  @focus="innerVisible = true" ></el-input>
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

                        <el-form-item label="地区名称:" prop="name" :label-width="formLabelWidth">
                        <el-input  v-model="form.name" ></el-input>
                        </el-form-item>
                        <el-form-item label="地区编码:" prop="id" :label-width="formLabelWidth">
                        <el-input  v-model="form.id" ></el-input>
                        </el-form-item>
                        <el-form-item label="地区经度:" prop="longitude" :label-width="formLabelWidth">
                        <el-input  v-model="form.longitude" ></el-input>
                        </el-form-item>
                        <el-form-item label="地区纬度:" prop="latitude" :label-width="formLabelWidth">
                        <el-input  v-model="form.latitude" ></el-input>
                        </el-form-item>
                        <el-form-item label="周边地区:" prop="vicinity" :label-width="formLabelWidth">
                            <el-input  v-model="form.vicinity"  @focus="vicinityVisible = true" ></el-input>
                        </el-form-item>
                        <el-form-item label="重点责任区:" prop="redArea" :label-width="formLabelWidth">
                            <el-input placeholder="请输入区域面积（KM）" v-model="form.redArea"></el-input>
                        </el-form-item>
                        <el-form-item label="临近警戒区:" prop="yellowArea" :label-width="formLabelWidth">
                            <el-input placeholder="请输入区域面积（KM）" v-model="form.yellowArea"></el-input>
                        </el-form-item>
                        <el-form-item label="早期监视区:" prop="blueArea" :label-width="formLabelWidth">
                            <el-input placeholder="请输入区域面积（KM）" v-model="form.blueArea"></el-input>
                        </el-form-item>
                        <!-- 内部嵌套 -->
                        <el-dialog
                            width="60%"
                            title="请选择"
                            :visible.sync="vicinityVisible"
                            :close-on-click-modal='false'
                            append-to-body>
                                <div style="height: 350px; overflow: auto ">
                                    <el-tree
                                    ref="vicinityTree"
                                    :data="nearAreaTreeData"
                                    :props="defaultProps"
                                    :default-expanded-keys="gen"
                                    :show-checkbox='true'
                                    node-key="id"
                                    accordion 
                                    @check="NodeClick"
                                    >
                                    </el-tree>
                                </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="vicinityVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getVicinity">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addForm_this('form')">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 详情 --> 
                <el-dialog title="详情"   :close-on-click-modal='false' :visible.sync="detailsformVisible">
                    <div style="height: 340px;overflow: auto;">
                        <el-form :model="detailsform" ref="detailsform" style="marginRight: 80px">

                        <el-form-item label="地区级别:" prop="level" :label-width="formLabelWidth"> 
                            <el-select disabled v-model="detailsform.level"   style="width: 100%" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        
                        <el-form-item label="上级地区:"   prop="parentName" :label-width="formLabelWidth"> 
                            <el-input disabled v-model="detailsform.parentName"  @focus="innerVisible = true" ></el-input>
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

                        <el-form-item label="地区名称:" prop="name" :label-width="formLabelWidth">
                        <el-input disabled v-model="detailsform.name" ></el-input>
                        </el-form-item>
                        <el-form-item label="地区编码:" prop="id" :label-width="formLabelWidth">
                        <el-input disabled v-model="detailsform.id" ></el-input>
                        </el-form-item>
                        <el-form-item label="地区经度:" prop="longitude" :label-width="formLabelWidth">
                        <el-input disabled v-model="detailsform.longitude" ></el-input>
                        </el-form-item>
                        <el-form-item label="地区纬度:" prop="latitude" :label-width="formLabelWidth">
                        <el-input disabled v-model="detailsform.latitude" ></el-input>
                        </el-form-item>
                        <el-form-item label="周边地区:" prop="vicinity" :label-width="formLabelWidth">
                            <el-input disabled v-model="detailsform.vicinity"  @focus="vicinityVisible = true" ></el-input>
                        </el-form-item>
                        <el-form-item label="重点责任区:" prop="redArea" :label-width="formLabelWidth">
                            <el-input placeholder="请输入区域面积（KM）" disabled v-model="detailsform.redArea"></el-input>
                        </el-form-item>
                        <el-form-item label="临近警戒区:" prop="yellowArea" :label-width="formLabelWidth">
                            <el-input placeholder="请输入区域面积（KM）" disabled v-model="detailsform.yellowArea"></el-input>
                        </el-form-item>
                        <el-form-item label="早期监视区:" prop="blueArea" :label-width="formLabelWidth">
                            <el-input placeholder="请输入区域面积（KM）" disabled v-model="detailsform.blueArea"></el-input>
                        </el-form-item>
                        <!-- 内部嵌套 -->
                        <el-dialog
                            width="60%"
                            title="请选择"
                            :visible.sync="vicinityVisible"
                            :close-on-click-modal='false'
                            append-to-body>
                                <div style="height: 350px; overflow: auto ">
                                    <el-tree
                                    ref="vicinityTree"
                                    :data="nearAreaTreeData"
                                    :props="defaultProps"
                                    :default-expanded-keys="gen"
                                    :show-checkbox='true'
                                    node-key="id"
                                    accordion 
                                    @check="NodeClick"
                                    >
                                    </el-tree>
                                </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="vicinityVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getVicinity">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="detailsformVisible = false">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 编辑 -->
                <el-dialog title="编辑"   :close-on-click-modal='false' :visible.sync="editFormVisible">
                    <div style="height: 340px;overflow: auto;">
                        <el-form :model="editform" ref="editform" style="marginRight: 80px">

                        <el-form-item label="地区级别:" prop="level" :label-width="formLabelWidth"> 
                            <el-select v-model="editform.level"   style="width: 100%" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        
                        <el-form-item label="上级地区:"  prop="parentName" :label-width="formLabelWidth"> 
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
                                <!-- 确定逻辑代写 -->
                                <el-button type="primary" >确 定</el-button>
                            </div>

                        </el-dialog>

                        <el-form-item label="地区名称:" prop="name" :label-width="formLabelWidth">
                        <el-input  v-model="editform.name" ></el-input>
                        </el-form-item>
                        <el-form-item label="地区编码:" prop="id" :label-width="formLabelWidth">
                        <el-input  v-model="editform.id" ></el-input>
                        </el-form-item>
                        <el-form-item label="地区经度:" prop="longitude" :label-width="formLabelWidth">
                        <el-input  v-model="editform.longitude" ></el-input>
                        </el-form-item>
                        <el-form-item label="地区纬度:" prop="latitude" :label-width="formLabelWidth">
                        <el-input  v-model="editform.latitude" ></el-input>
                        </el-form-item>
                        <el-form-item label="周边地区:" prop="vicinity" :label-width="formLabelWidth">
                            <el-input  v-model="editform.vicinity"  @focus="vicinityVisible = true" ></el-input>
                        </el-form-item>
                        <el-form-item label="重点责任区:" prop="redArea" :label-width="formLabelWidth">
                            <el-input  v-model="editform.redArea"></el-input>
                        </el-form-item>
                        <el-form-item label="临近警戒区:" prop="yellowArea" :label-width="formLabelWidth">
                            <el-input  v-model="editform.yellowArea"></el-input>
                        </el-form-item>
                        <el-form-item label="早期监视区:" prop="blueArea" :label-width="formLabelWidth">
                            <el-input  v-model="editform.blueArea"></el-input>
                        </el-form-item>
                        <!-- 内部嵌套 -->
                        <el-dialog
                            width="60%"
                            title="请选择"
                            :visible.sync="vicinityVisible"
                            :close-on-click-modal='false'
                            append-to-body>
                                <div style="height: 350px; overflow: auto ">
                                    <el-tree
                                    ref="vicinityTree"
                                    :data="nearAreaTreeData"
                                    :props="defaultProps"
                                    :default-expanded-keys="gen"
                                    :show-checkbox='true'
                                    node-key="id"
                                    accordion 
                                    @check="NodeClick"
                                    >
                                    </el-tree>
                                </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="vicinityVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getVicinity">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="editFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="uploadEdit">确 定</el-button>
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
name: 'regional',
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
            level:'',
            tableData: [ ],
            dataCount: 0,
            pageSize: 20,
            current: 1, 
            form: {
                level:'',
                parent:'',
                parentName: '',
                latitude:'',
                longitude:'',
                name: '',
                vicinity:'',
                id:'',
                vicinityCode: '',

                redArea:'',
                yellowArea:'',
                blueArea:'',
            }, 
            innerVisible: false,
            editform:{
                level:'',
                parent:'',
                parentName: '',
                latitude:'',
                longitude:'',
                name: '',
                vicinity:'',
                id:'',
                vicinityCode: '',                
                redArea:'',
                yellowArea:'',
                blueArea:'',
            },
            detailsform:{
                level:'',
                parent:'',
                parentName: '',
                latitude:'',
                longitude:'',
                name: '',
                vicinity:'',
                id:'',
                vicinityCode: '',                
                redArea:'',
                yellowArea:'',
                blueArea:'',
            },
            addFormVisible: false,
            editFormVisible: false,
            distributeVisible: false,
            detailsformVisible: false,
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
            // *********************//
            options: [{
                value: '1',
                label: '省级'
                }, {
                value: '2',
                label: '市级'
                }, {
                value: '3',
                label: '县级'
                }, {
                value: '4',
                label: '乡镇'
            }],
            treeData:[],
            nearAreaTreeData:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            gen:[],
            transitId:'',
            transitName:'',
            transitVicinity: [],
            vicinityVisible : false,
            allTreeData: [],

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
            let api = '/api/dict/area';
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
            let api = '/api/dict/area';
            let searchVal = this.name;
            let searchLev = this.level;
            if( searchVal != ''  || searchLev != '' ){
                this.$axios.get( api ,{
                    params:{   
                        name: searchVal,
                        level: searchLev,
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
            this.name = '';
            this.level = '';
        },
        // 改变页数
        changePage( val ){
            this.current = val; 
            this.currentPage = val;
            if( this.name != '' || this.level != '' ){
                let api = '/api/dict/area';
                let searchVal = this.name;
                let searchLev = this.level;
                if( searchVal !== '' || searchLev !== ''){
                    this.$axios.get( api ,{
                        params:{ 
                            name: searchVal,
                            level: searchLev,
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
                let api = '/api/dict/area';
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
        addForm_this(){ 
            if( this.form.level !== '' && this.form.parentName !== '' && this.form.latitude !== '' && this.form.longitude !== '' && this.form.name !== '' && this.form.id !== ''   ){
                let api ='/api/dict/area';
                this.$axios.post( api,{ 
                    level: this.form.level,
                    parent: this.form.parent,
                    latitude: this.form.latitude,
                    longitude:  this.form.longitude,
                    name: this.form.name,
                    id:  this.form.id,
                    vicinity: this.form.vicinityCode,
                    parentName: this.form.parentName,

                    redArea: this.form.redArea, 
                    yellowArea: this.form.yellowArea, 
                    blueArea: this.form.blueArea, 

                }).then((res)=>{
                    
                    if( res.status == 200){
                        this.addFormVisible = false;
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
                    type: 'warning',
                    message: '请填写完整！'
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
                let api = '/api/dict/area';
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
        deleteSelected(){
            if( this.selectedArr.length > 0 ){
                this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let api = '/api/dict/area';
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
        // 添加
        addArea(){
            this.addFormVisible = true;
            this.getNearArea();
        },
            // 编辑
        edit_this( a ){
            
            this.editId = a;
            let api = '/api/dict/area';
            this.$axios.get( api , { 
                params:{ 
                    key: a 
                }
            }).then(( res )=>{
                
                let data = res.data.data.content;
                if( res.data.status == 200 ){ 
                    this.editform.level= data.level;
                    this.editform.parentName= data.parentName;
                    this.editform.latitude= data.latitude;
                    this.editform.longitude= data.longitude;
                    this.editform.name= data.name;
                    this.editform.redArea = data.redArea;
                    this.editform.yellowArea = data.yellowArea; 
                    this.editform.blueArea = data.blueArea;


                    // this.editform.vicinity= data.vicinity;
                    let arr = data.vicinity.split(",");
                    
                    let ar = []; 
                    if( arr[0] != "" ){
                        for( let i = 0;i<arr.length;i++ ){
                            let didian =  this.allTreeData.filter( item => item.id == arr[i] )[0].name;

                            ar.push( didian )

                        }
                    }
                    this.editform.vicinity = ar.join(',');
                     
                    
                    this.editform.id= data.id;

                    this.editFormVisible = true;
                }
            }).catch(( err )=>{
                 
            }) 
        },
        // 编辑上传
        uploadEdit(){
            if( this.editform.level !== '' && this.editform.parentName !== '' && this.editform.latitude !== '' && this.editform.longitude !== '' && this.editform.name !== '' && this.editform.id !== ''   ){
                let api ='/api/dict/area';
                this.$axios.put( api,{ 
                    level: this.editform.level,
                    parent: this.editform.parent,
                    latitude: this.editform.latitude,
                    longitude:  this.editform.longitude,
                    name: this.editform.name,
                    id:  this.editform.id,
                    vicinity: this.editform.vicinityCode,
                    parentName: this.editform.parentName,
                    redArea: this.editform.redArea, 
                    yellowArea: this.editform.yellowArea, 
                    blueArea: this.editform.blueArea, 
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
            }else{
                this.$message({
                    type: 'warning',
                    message: '请填写完整！'
                })
            }
        },
  
        // 查看详情
        details_this(a){
            let api = '/api/dict/area';
            this.$axios.get( api , { 
                params:{ 
                    key: a 
                }
            }).then(( res )=>{
                
                let data = res.data.data.content;
                if( res.data.status == 200 ){ 
                    this.detailsform.level= data.level;
                    this.detailsform.parentName= data.parentName;
                    this.detailsform.latitude= data.latitude;
                    this.detailsform.longitude= data.longitude;
                    this.detailsform.name= data.name;

                    this.detailsform.redArea = data.redArea;
                    this.detailsform.yellowArea = data.yellowArea; 
                    this.detailsform.blueArea = data.blueArea;
                    // this.detailsform.vicinity= data.vicinity;
                    let arr = data.vicinity.split(","); 
                    let ar = []; 
                    if( arr[0] != '' ){ 
                        

                        for( let i = 0;i<arr.length;i++ ){
                           let didian =  this.allTreeData.filter( item => item.id == arr[i] )[0].name;
                        

                            
                            ar.push( didian )

                        }

                    }

                     this.detailsform.vicinity = ar.join(',');
                     
                    
                    this.detailsform.id= data.id;
                    this.detailsformVisible = true;
                }
            }).catch(( err )=>{
                 
            }) 
        },

        // 获取渠道
        getChannel(){
            let api = '/api/dict/channel';
            this.$axios.get(api).then(( res )=>{
                //  
                if( res.data.status == 200){
                    let arr = [];
                    let data = res.data.data.content;

                    for( let i =0;i< data.length;i++ ){
                        let a = {};
                        a.value = data[i].code;
                        a.label = data[i].name;
                        arr.push( a )
                    }

                    // 
                    this.channelOptions = arr;
                }
            }).catch((err)=>{
                 
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
                // 获取周边地区
        getNearArea(){
            let api = '/api/dict/allArea';
            this.$axios.get(api).then(( res )=>{
                 
          
                    let oldTreeNodeData  =  res.data.data.content;
                    this.allTreeData = res.data.data.content;

                    this.nearAreaTreeData = this.handletreeData( oldTreeNodeData , 'id' ,'parent','children'  );
                    
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
 

  
        // 获取已选数组
        selectedChange( val ){
            
            let arr = [];
            for( let i = 0;i<val.length;i++ ){
                arr.push( val[i].id )
            }
            this.selectedArr = arr;
            
        }, 
        // 点击树 获取节点
        handleNodeClick(a){
            
            this.transitId = a.id;
            this.transitName = a.name;
            
        },
        NodeClick( data,a  ){
            this.transitVicinity = a.checkedKeys;
            let arr = [];
            for( let i =0;i<a.checkedNodes.length;i++){
                arr.push( a.checkedNodes[i].name )
            }
            this.form.vicinity = arr.join(",");
            this.editform.vicinity = arr.join(",");
        },
        // 
        getParent(){
            if( this.transitId !== '' || this.transitName !== '' ){
                this.form.parent = this.transitId;
                this.editform.parent = this.transitId;
                this.form.parentName = this.transitName;
                this.editform.parentName= this.transitName;

                this.innerVisible = false;
            }
        },
        getVicinity(){
            if( this.transitVicinity.length > 0 ){
                this.form.vicinityCode = this.transitVicinity.join(",");
                this.editform.vicinityCode = this.transitVicinity.join(",");
                this.vicinityVisible = false;
            }else{
                this.$message({
                    type:'warning',
                    message:'请选择周边地区'
                })
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
        this.getNearArea();
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