<!--  -->
<template>
    <div class='container'>
        <Crumbs title="业务管理-受众管理"></Crumbs>
        <SearchCard>
            <div class="iListBox">
                <div class="iListLable">受众名称</div>
                <div class="iListConent">
                    <el-input  v-model="searchName" placeholder="请输入受众名称"></el-input>
                </div>
            </div>
            <div class="iListBox">
                <div class="iListLable">终端号码</div>
                <div class="iListConent">
                    <el-input  v-model="searchMob" placeholder="请输入终端号码"></el-input>
                </div>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-search" size="small" >搜索</el-button>
                
                <!-- <el-button-group> -->
                    <el-button type="primary" size="small" @click=" addVisible = true "  icon=" ">增加</el-button>
                    <el-button type="primary" size="small" @click="deleteSelected"   icon=" ">删除</el-button>
                    <el-button type="primary" size="small" @click="downloadMoban" >下载模板</el-button>
                    <el-button type="primary" size="small" @click="dialogUpdataVisible = true" icon=" ">导入用户信息</el-button>
                <!-- </el-button-group> -->
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
                        id="Tab"
                        @selection-change="selectedChange"
                        >
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="人员名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            label="手机号码">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="400">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" @click="dispose( scope.row.id )" icon="el-icon-copy-document" >配置职务</el-button>
                                <el-button type="primary" size="mini" @click="details( scope.row.id )" icon="el-icon-copy-document" >详情</el-button>
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
                <el-dialog title="添加" @close='closeDialog' :close-on-click-modal='false' width="70%" :visible.sync="addVisible">
                    <div style="height: 300px;overflow: auto;">
                        <el-form :model="addform" :rules="rules" ref="addform"  style="marginRight: 80px" >
                            <el-form-item label="灾种名称:" prop="zzName" :label-width="formLabelWidth">
                                <el-cascader v-model="addform.zzName" @change="changeCascader" :options="treeData" :props="thrProps" style="width: 100%" :show-all-levels="false"></el-cascader>
                            </el-form-item>
                            <el-form-item label="灾种级别:"  prop="disasterLevel" :label-width="formLabelWidth">
                                <el-select v-model="addform.disasterLevel" @change="changeWarningName('add')" style="width: 100%" placeholder="请选择">
                                    <el-option label="红色预警[Ⅰ级/特别严重]" value="RED"></el-option>
                                    <el-option label="橙色预警[Ⅱ级/严重]" value="ORANGE"></el-option>
                                    <el-option label="黄色预警[Ⅲ级/较重]" value="YELLOW"></el-option>
                                    <el-option label="蓝色预警[Ⅳ级/一般]" value="BLUE"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="流程配置:"  prop="flow" :label-width="formLabelWidth">
                                <div class="process ">
                                        <div class="listBox clearfix">
                                            <div class="processList enterList" >

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList  examineList" @click="changeflow">

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList issueList" @click="changeflow">

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList yjbIssueList" @click="changeflow">

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList fuheList" @click="changeflow">

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList releaseList">

                                            </div>
                                        </div>
                                        <div class="listTxt">
                                            <div class="enterTxt">
                                                录入
                                            </div>
                                            <div class="examineTxt">
                                                审核
                                            </div>
                                            <div class="issueTxt">
                                                签发
                                            </div>
                                            <div class="yjbIssueTxt">
                                                应急办签发
                                            </div>
                                            <div class="fuheTxt">
                                                发布复核
                                            </div>
                                            <div class="releaseTxt">
                                                发布
                                            </div>
                                        </div>
                                    </div>
                            </el-form-item>
                            <el-form-item label="渠道配置:"  prop="channel" :label-width="formLabelWidth">
                                <el-checkbox-group  v-model="addform.channel" @change='changeSelect("add")'  >  
                                    <el-checkbox v-for=" item in checkboxs" v-show=" item.status == 1" :name="item.code" :label="item.name" :key="item"> </el-checkbox>
                                    <el-checkbox v-for=" item in checkboxs" v-show=" item.status == 0" disabled :name="item.code" :label="item.name" :key="item"> </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="预警内容:"  prop="content" :label-width="formLabelWidth">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="addform.content">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="防御指南:"  prop="guide" :label-width="formLabelWidth">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="addform.guide">
                                </el-input>
                            </el-form-item>

                        </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitAddForm('addform')">确 定</el-button>
                    </div>
                </el-dialog>
 
      
                <!-- 详情  details -->
                <el-dialog title="详情" class="details" width="70%" :close-on-click-modal='false' :visible.sync="detailsVisible">
                    <div style="height: 300px;overflow: auto;">
                        <el-form :model="detailsform" :rules="rules" ref="detailsform"  style="marginRight: 80px" >
                            <el-form-item label="灾种名称:" prop="zzName" :label-width="formLabelWidth">
                                <el-cascader disabled v-model="detailsform.zzName" @change="changeCascader" :options="treeData" :props="thrProps" style="width: 100%" :show-all-levels="false"></el-cascader>
                            </el-form-item>
                            <el-form-item label="灾种级别:"  prop="disasterLevel" :label-width="formLabelWidth">
                                <el-select disabled v-model="detailsform.disasterLevel" @change="changeWarningName" style="width: 100%" placeholder="请选择">
                                    <el-option label="红色预警[Ⅰ级/特别严重]" value="RED"></el-option>
                                    <el-option label="橙色预警[Ⅱ级/严重]" value="ORANGE"></el-option>
                                    <el-option label="黄色预警[Ⅲ级/较重]" value="YELLOW"></el-option>
                                    <el-option label="蓝色预警[Ⅳ级/一般]" value="BLUE"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="流程配置:"  prop="flow" :label-width="formLabelWidth">
                                <div class="process ">
                                        <div class="listBox clearfix">
                                            <div class="processList enterList" >

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList  examineList"  >

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList issueList"  >

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList yjbIssueList"  >

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList fuheList"  >

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList releaseList">

                                            </div>
                                        </div>
                                        <div class="listTxt">
                                            <div class="enterTxt">
                                                录入
                                            </div>
                                            <div class="examineTxt">
                                                审核
                                            </div>
                                            <div class="issueTxt">
                                                签发
                                            </div>
                                            <div class="yjbIssueTxt">
                                                应急办签发
                                            </div>
                                            <div class="fuheTxt">
                                                发布复核
                                            </div>
                                            <div class="releaseTxt">
                                                发布
                                            </div>
                                        </div>
                                    </div>
                            </el-form-item>
                            <el-form-item label="渠道配置:"  prop="channel" :label-width="formLabelWidth">
                                <el-checkbox-group  disabled v-model="detailsform.channel" @change='changeSelect'  >  
                                    <el-checkbox v-for=" item in checkboxs" v-show=" item.status == 1" :name="item.code" :label="item.name"  :key="item"> </el-checkbox>
                                    <el-checkbox v-for=" item in checkboxs" v-show=" item.status == 0" disabled :name="item.code" :label="item.name"  :key="item"> </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="预警内容:"  prop="content" :label-width="formLabelWidth">
                                <el-input disabled
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="detailsform.content">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="防御指南:"  prop="guide" :label-width="formLabelWidth">
                                <el-input disabled
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="detailsform.guide">
                                </el-input>
                            </el-form-item>

                        </el-form>
                    </div>
                    <div slot="footer"  class="dialog-footer">
                        <!-- <el-button @click="detailsVisible = false">取 消</el-button> -->
                        <el-button type="primary" @click="detailsVisible = false">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 编辑 -->
                <el-dialog title="编辑" width="70%"  :close-on-click-modal='false' :visible.sync="editVisible">
                    <div style="height: 300px;overflow: auto;">
                        <el-form :model="editform" :rules="rules" ref="editform"  style="marginRight: 80px" >
                            <el-form-item label="灾种名称:" prop="zzName" :label-width="formLabelWidth">
                                <el-cascader v-model="editform.zzName" @change="changeCascader" :options="treeData" :props="thrProps" style="width: 100%" :show-all-levels="false"></el-cascader>
                            </el-form-item>
                            <el-form-item label="灾种级别:"  prop="disasterLevel" :label-width="formLabelWidth">
                                <el-select v-model="editform.disasterLevel" @change="changeWarningName('edit')" style="width: 100%" placeholder="请选择">
                                    <el-option label="红色预警[Ⅰ级/特别严重]" value="RED"></el-option>
                                    <el-option label="橙色预警[Ⅱ级/严重]" value="ORANGE"></el-option>
                                    <el-option label="黄色预警[Ⅲ级/较重]" value="YELLOW"></el-option>
                                    <el-option label="蓝色预警[Ⅳ级/一般]" value="BLUE"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="流程配置:"  prop="flow" :label-width="formLabelWidth">
                                <div class="process ">
                                        <div class="listBox clearfix">
                                            <div class="processList enterList" >

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList  examineList_e" @click="changeflow_edit">

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList issueList_e" @click="changeflow_edit">

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList yjbIssueList_e" @click="changeflow_edit">

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList fuhe_e" @click="changeflow_edit">

                                            </div>
                                            <div class="connect"></div>
                                            <div class="processList releaseList">

                                            </div>
                                        </div>
                                        <div class="listTxt">
                                            <div class="enterTxt">
                                                录入
                                            </div>
                                            <div class="examineTxt">
                                                审核
                                            </div>
                                            <div class="issueTxt">
                                                签发
                                            </div>
                                            <div class="yjbIssueTxt">
                                                应急办签发
                                            </div>
                                            <div class="fuheTxt">
                                                发布复核
                                            </div>
                                            <div class="releaseTxt">
                                                发布
                                            </div>
                                        </div>
                                    </div>
                            </el-form-item>
                            <el-form-item label="渠道配置:"  prop="channel" :label-width="formLabelWidth">
                                <el-checkbox-group  v-model="editform.channel" @change='changeSelect("edit")'  >  
                                    <el-checkbox v-for=" item in checkboxs" v-show=" item.status == 1" :name="item.code" :label="item.name"  :key="item"> </el-checkbox>
                                    <el-checkbox v-for=" item in checkboxs" v-show=" item.status == 0" disabled :name="item.code" :label="item.name"  :key="item"> </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="预警内容:"  prop="content" :label-width="formLabelWidth">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="editform.content">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="防御指南:"  prop="guide" :label-width="formLabelWidth">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="editform.guide">
                                </el-input>
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
name: 'audience',
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
            searchMob:'',
            // 增加
            addVisible: false,
            addform:{
                areaCode:'',
                address:'',
                mobile:'',
                name:'',
                areaName:'',
                email: ''
            },
            formLabelWidth: '160px',
            areaOptions:[],
            rules:{
                areaCode: [
                    { 
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    },
                ],
                name:[
                    { 
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    },
                ],
                address:[
                   { 
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    }, 
                ],
                mobile:[
                    { 
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    }, 
                ],
                job:[
                    {
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发  
                    }
                ],
                unit:[
                    {
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    }
                ],
                email:[
                    {
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    }
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
                areaCode:'',
                address:'',
                mobile:'',
                name:'',
                areaName:'',
                email: ''
            },
            aareacode:'',
            agroupId:'',

            treeSearchId: '',
            
        
};
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
        let id = '';
        // this.treeSearchId = id;
        let areaCode = '';
        if( data.type == 1){
            id = '';
            areaCode = data.id;
            this.aareacode = data.id;
            this.agroupId = '';
        }else{
            id = data.id;
            areaCode = data.parent;
            
            this.aareacode = data.parent;
            this.agroupId = data.id;
        }
        let api = '/api/publish/target';
            this.$axios.get(api,{
                params:{
                    groupId: id,
                    current: 1,
                    areaCode: areaCode,
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
    // 下载模板
    downloadMoban(){
        window.location.href = this.GLOBAL.serverSrc + "/files/baseTemplate/A4.1,表5.1全国气象灾害责任人信息表、气象信息员表.xls";
    },
    // 获取群组树数据
    getTreeData(){
        let api = '/api/dict/area/group';
        this.$axios.get(api).then((res)=>{
            let oldTreeNodeData  =  res.data.data.content;
            this.treeData = this.handletreeData( oldTreeNodeData , 'id' ,'parent','children'  );
        }).catch((err)=>{
            console.log( err )
        })
    },
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
        let api = '/api/publish/target';
        let areaCode = JSON.parse(sessionStorage.getItem('user')).areaCode;
        this.$axios.get(api,{
            params:{
                areaCode: areaCode,
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
        if( this.aareacode == '' ){
            this.aareacode = JSON.parse(sessionStorage.getItem('user')).areaCode;
        }
        if( this.searchName != '' || this.searchMob != '' ){
            let api = '/api/publish/target';
            this.$axios.get(api,{
                params:{
                    name: this.searchName,
                    mobile: this.searchMob, 
                    areaCode: this.aareacode,
                    groupId: this.agroupId, 
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
            let api = '/api/publish/target';
            this.$axios.get(api,{
                params:{
                    current: val,
                    pageSize: 20,
                    areaCode: this.aareacode,
                    groupId: this.agroupId, 
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
        if( this.searchName == '' &&  this.searchMob == '' ){
            this.$message({
                message:'请输入正确的搜索条件',
                type: 'warning'
            })
        }else{
                let api = '/api/publish/target';
            this.$axios.get(api,{
                params:{
                    name: this.searchName,
                    mobile: this.searchMob,
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
        this.searchMob = '';
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
        this.$refs.addform.resetFields();
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
    // 提交表单
    submitAddForm(formName){
        this.$refs[formName].validate(valid => {
            if (valid) {
                //如果通过验证 to do...
                let api = '/api/publish/target';
                this.$axios.post(api,{
                    areaCode: this.addform.areaCode,
                    address: this.addform.address,
                    mobile: this.addform.mobile,
                    name: this.addform.name,
                    email: this.addform.email,
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
    // 删除
    deleteSelected(){
        let api = '/api/publish/target';
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
            let api = '/api/publish/target';
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

    // 上传
    handlePreview(file) {
        console.log(file);
    },
    handleExceed(files) {
        this.$message.warning(`当前限制选择 1 个文件`);
    },
    beforeRemove(file) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
    newSubmitForm(){//确定上传
        this.$refs.newupload.submit();
    },
    uploadFile(param){
        var fileObj = param.file
        console.log(fileObj)
        var FileController = '/api/publish/target/excel'    // 接收上传文件的后台地址
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
    // 分配人员
    dispose(a){
        console.log( a )
        this.editId = a;
        this.disposeVisible = true;
        let api ='/api/publish/target';
        this.$axios.get(api,{
                params:{
                key: a
            }
        }).then((res)=>{
            console.log( res );
            if( res.data.status ==200 ){
                this.disposeform.unit = res.data.data.content[0].unit;
                this.disposeform.job = res.data.data.content[0].job;
            }
        }).catch((err)=>{
            console.log(err)
        })
    },
    submitDisposeform(formName){
        console.log( this.editId )
        this.$refs[formName].validate(valid => {
            if (valid) {
                //如果通过验证 to do...
                let api = '/api/publish/target/job';
                this.$axios.post(api,{
                    targetId: this.editId,
                    unit: this.disposeform.unit,
                    job: this.disposeform.job,
                }).then(( res )=>{
                    console.log( res );
                    if( res.data.status == 200 ){
                        this.$message({
                            message:'添加成功！',
                            type:'success'
                        });
                        this.disposeVisible = false;
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
    },

    //  返回职务详情
    backJob(a){
        if( a == 0 ){
            return '国家'
        }else if( a == 1 ){
            return '省部'
        }else if( a == 2 ){
            return '地厅'
        }else if( a == 3 ){
            return '县处'
        }else if( a == 4 ){
            return '乡科'
        }else if( a == 99 ){
            return '其他'
        }else{
            return a
        }
    },

    // 详情
    details(a){
        this.detailsVisible = true;
        this.editId = a;
        let api ='/api/publish/target/job';
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
    edit_this(a){
        this.editVisible = true;
        this.editId = a;
        let api ='/api/publish/target';
        this.$axios.get(api,{
                params:{
                key: a
            }
        }).then((res)=>{
            console.log( res );
            if( res.data.status ==200 ){
                // this.disposeform.unit = res.data.data.content[0].unit;
                // this.disposeform.job = res.data.data.content[0].job;
                this.editform.name = res.data.data.content[0].name;
                this.editform.mobile = res.data.data.content[0].mobile;
                this.editform.address = res.data.data.content[0].address;
                this.editform.email = res.data.data.content[0].email;
            }
        }).catch((err)=>{
            console.log(err)
        })
    },
    submitEditForm(formName){
            this.$refs[formName].validate(valid => {
            if (valid) {
                //如果通过验证 to do...
                let api = '/api/publish/target';
                this.$axios.put(api,{
                    id: this.editId,
                    address: this.editform.address,
                    mobile: this.editform.mobile,
                    name: this.editform.name,
                    email: this.editform.email,
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

    .icontent{
        display: flex;
        justify-content: space-around;
        .dataTree{
            width: 300px;
            height: 100%;
            margin-right: 20px;
            float: left;
            .treeBox{
                height: 70%;
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
                max-height:"calc( 100vh -300px )";
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