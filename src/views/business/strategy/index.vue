<!--  -->
<template>
    <div class='container'>
        <Crumbs title="业务管理-策略管理"></Crumbs>
        <SearchCard>
            <div class="iListBox">
                <div class="iListLable">预警名称</div>
                <div class="iListConent">
                    <el-input  v-model="searchName" placeholder="请输入预警名称"></el-input>
                </div>
            </div>
            <div class="iListBox">
                <div class="iListLable">预警级别</div>
                <div class="iListConent">
                    <el-select v-model="searchLevel" style='width: 160px' placeholder="请输入预警级别">
                            <el-option label="红色预警[Ⅰ级/特别严重]" value="RED"></el-option>
                            <el-option label="橙色预警[Ⅱ级/严重]" value="ORANGE"></el-option>
                            <el-option label="黄色预警[Ⅲ级/较重]" value="YELLOW"></el-option>
                            <el-option label="蓝色预警[Ⅳ级/一般]" value="BLUE"></el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-search" @click="searchData" size="small" >搜索</el-button>
                <el-button type="warning" size="small" @click="reset" icon="el-icon-refresh">重置</el-button>
                <el-button type="success" size="small"  @click=" addVisible = true "  icon=" ">增加</el-button>
                <el-button type="danger" size="small" @click="deleteSelected"    icon=" ">删除</el-button>
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
                            label="策略名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="flow"
                            label="预警流程">
                            <template slot-scope="scope" >
                                    <el-tag v-for="item in msort(scope.row.flow.split(','))"
                                      :key="item.label"
                                      type="success"
                                      effect="plain" >
                                         <span v-if=" item == 0 " >录入</span>
                                         <span v-if=" item == 1 " >审核</span>
                                         <span v-if=" item == 2 " >签发</span>
                                         <span v-if=" item == 3 " >应急办签发</span>
                                         <span v-if=" item == 4 " >发布</span>
                                    </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="300">
                            <template slot-scope="scope">
                                <!-- <el-button type="info" size="mini" @click="dispose( scope.row.id )" icon="el-icon-copy-document" >配置职务</el-button> -->
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
                                            <div class="releaseTxt">
                                                发布
                                            </div>
                                        </div>
                                    </div>
                            </el-form-item>
                            <el-form-item label="渠道配置:"  prop="channel" :label-width="formLabelWidth">
                                <el-checkbox-group  v-model="addform.channel" @change='changeSelect("add")'  >  
                                    <el-checkbox v-for=" (item,index) in checkboxs" v-show=" item.status == 1" :name="item.code" :label="item.name" :key="index"> </el-checkbox>
                                    <el-checkbox v-for=" (item,index) in checkboxs" v-show=" item.status == 0" disabled :name="item.code" :label="item.name" :key="index"> </el-checkbox>
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
                                            <div class="releaseTxt">
                                                发布
                                            </div>
                                        </div>
                                    </div>
                            </el-form-item>
                            <el-form-item label="渠道配置:"  prop="channel" :label-width="formLabelWidth">
                                <el-checkbox-group  disabled v-model="detailsform.channel" @change='changeSelect'  >  
                                    <el-checkbox v-for=" (item,index) in checkboxs" v-show=" item.status == 1" :name="item.code" :label="item.name" :key="index"> </el-checkbox>
                                    <el-checkbox v-for=" (item,index) in checkboxs" v-show=" item.status == 0" disabled :name="item.code" :label="item.name" :key="index"> </el-checkbox>
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
                                            <div class="releaseTxt">
                                                发布
                                            </div>
                                        </div>
                                    </div>
                            </el-form-item>
                            <el-form-item label="渠道配置:"  prop="channel" :label-width="formLabelWidth">
                                <el-checkbox-group  v-model="editform.channel" @change='changeSelect("edit")'  >  
                                    <el-checkbox v-for=" (item,index) in checkboxs" v-show=" item.status == 1" :name="item.code" :label="item.name" :key="index"> </el-checkbox>
                                    <el-checkbox v-for=" (item,index) in checkboxs" v-show=" item.status == 0" disabled :name="item.code" :label="item.name" :key="index"> </el-checkbox>
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
name: 'strategy',
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
            thrProps:{
                value: 'id',
                label: 'name',
                children: 'children'
            },
            gen: [],
            tableData:[],
            currentPage: 1,
            dataCount: 0,
            pageSize: 20,
            searchName:'',
            searchLevel:'',
            // 增加
            addVisible: false,
            addform:{
                channel:'',
                content:'',
                disasterCode:'',
                disasterLevel:'',
                disasterName:'',
                guide:'',
                icon:'',
                id:'',
                flow:'1,4',
                instruction:'',
                name:'',
                levelName:'',
                zzName:'',
                channel:[],
                channelStr:'',
                fabuqudao:[]
            },
            detailsform: {
                channel:'',
                content:'',
                disasterCode:'',
                disasterLevel:'',
                disasterName:'',
                guide:'',
                icon:'',
                id:'',
                flow:'1,4',
                instruction:'',
                name:'',
                levelName:'',
                zzName:'',
                channel:[],
                channelStr:'',
                fabuqudao:[]
            },
            formLabelWidth: '160px',
            areaOptions:[],
            rules:{
                zzName: [
                    { 
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    },
                ],
                disasterLevel: [
                    { 
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    },
                ],
                channel: [
                    { 
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    },
                ],
                content: [
                    { 
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    },
                ],
                // instruction: [
                //     { 
                //         required: true, //是否必填
                //         message: '不能为空', //规则
                //         trigger: 'blur'  //何事件触发
                //     },
                // ],
                guide: [
                    { 
                        required: true, //是否必填
                        message: '不能为空', //规则
                        trigger: 'blur'  //何事件触发
                    },
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
                channel:'',
                content:'',
                disasterCode:'',
                disasterLevel:'',
                disasterName:'',
                guide:'',
                icon:'',
                id:'',
                flow:'1,4',
                instruction:'',
                name:'',
                levelName:'',
                zzName:'',
                channel:[],
                channelStr:'',
                fabuqudao:[]
            },

            // 流程
            examineflag: false,
            // examineflag : false, 
            Issueflag : false,
            yjbIssueflag : false,
            flowArr: [0,4],  //流程数据


            // 编辑 
            bjexamineflag: false, 
            bjIssueflag : false,
            bjyjbIssueflag : false,


            // 渠道
            checkboxs:[],
            flowArr_edit: [],

            isYes: this.global.serverSrc + '/files/channel/yes.png',
            isNo: this.global.serverSrc + '/files/channel/no.png'
            
            
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
            let api = '/api/disaster/strategy';
                this.$axios.get(api,{
                    params:{
                        disasterCode: id,
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
            this.$axios.get(api,{
                params:{
                    "enabled":"1"
                }
            }).then((res)=>{
                let oldTreeNodeData  =  res.data.data.content;
                this.treeData = this.handletreeData( oldTreeNodeData , 'id' ,'parent','children'  );
                console.log( this.treeData )
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
            let api = '/api/disaster/strategy';
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
            if( this.searchName != '' || this.searchLevel != '' ){
                let api = '/api/disaster/strategy';
                this.$axios.get(api,{
                    params:{
                        name: this.searchName,
                        mobile: this.searchLevel,
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
                let api = '/api/disaster/strategy';
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
            if( this.searchName == '' &&  this.searchLevel == '' ){
                this.$message({
                    message:'请输入正确的搜索条件',
                    type: 'warning'
                })
            }else{
                 let api = '/api/disaster/strategy';
                this.$axios.get(api,{
                    params:{
                        disasterName: this.searchName,
                        disasterLevel: this.searchLevel,
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
            this.searchLevel = '';
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
            this.examineflag=false;
            this.Issueflag = false;
            this.yjbIssueflag = false;
            this.flowArr= [0,4]; 
            this.getflow();
        },
        // 提交表单
        submitAddForm(formName){
            console.log( this.addform )
            // return ;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //如果通过验证 to do...
                    let api = '/api/disaster/strategy';
                    this.$axios.post(api,{
                     
                        channel: this.addform.channelStr,
                        content: this.addform.content,
                        disasterCode: this.addform.disasterCode,
                        disasterLevel: this.addform.disasterLevel,
                        disasterName: this.addform.disasterName,
                        flow: this.addform.flow,
                        guide: this.addform.guide,
                        instruction: this.addform.instruction,
                        levelName: this.addform.levelName,
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



                            this.channel='';
                            this.content='';
                            this.disasterCode='';
                            this.disasterLevel='';
                            this.disasterName='';
                            this.guide='';
                            this.icon='';
                            this.id='';
                            this.flow='1,4';
                            this.instruction='';
                            this.name='';
                            this.levelName=''
                            this.zzName='';
                            this.channel=[];
                            this.channelStr='';
                            this.fabuqudao=[];
                            this.examineflag= false;  
                            this.Issueflag = false;
                            this.yjbIssueflag = false;
                            this.flowArr= [0,4];  //流程数据







                            
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
        // 删除
        deleteSelected(){
            let api = '/api/disaster/strategy';
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
                let api = '/api/disaster/strategy';
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
        msort(arr){
            for(var i=0;i<arr.length-1;i++){
                for(var j=0;j<arr.length-i-1;j++){
                    if(arr[j]>arr[j+1]){// 相邻元素两两对比
                        var hand = arr[j];
                        arr[j]=arr[j+1];
                        arr[j+1]=hand; 
                    } 
                }
            }
            return arr;
        },

        // 分配人员
        dispose(a){
            console.log( a )
            this.editId = a;
            this.disposeVisible = true;
            let api ='/api/disaster/strategy';
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
                    let api = '/api/disaster/strategy/job';
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
        // 详情
        details(a){
            this.detailsVisible = true;
            this.editId = a;
            let api ='/api/disaster/strategy';
            this.$axios.get(api,{
                 params:{
                    key: a
                }
            }).then((res)=>{
                console.log( res );
                // this.stepArr = res.data.data.content;
                let data = res.data.data.content[0];
  
                this.detailsform.channel = this.fanzhuan(data.channel.split(","))  ;
                
                this.detailsform.content = data.content;
                // this.detailsform = disasterCode;
                this.detailsform.disasterLevel = data.disasterLevel;
                // this.detailsform.zzName = data.disasterName;
                this.detailsform.zzName = [data.disasterCode];
                this.detailsform.guide = data.guide;
                // this.detailsform = icon;
                // this.detailsform = id;
                let newFlowArr = [];
                // this.detailsform.flow 
                newFlowArr = data.flow.split(",");
                console.log(  newFlowArr )
                this.examineflag = false;
                this.Issueflag = false;
                this.yjbIssueflag = false;
                if( newFlowArr.indexOf('1') > 0 ){ 
                    this.examineflag = true; 
                }
                if( newFlowArr.indexOf('2') > 0 ){
                    this.Issueflag = true;
                }
                if( newFlowArr.indexOf('3') > 0 ){
                    this.yjbIssueflag = true;
                }
                this.getflow();

                this.detailsform.instruction = data.instruction;
                // this.detailsform = name;
                // this.detailsform = levelName;
                // this.detailsform = zzName;
                // this.detailsform = channel;
                // this.detailsform = channelStr;
                // this.detailsform = fabuqudao;


            }).catch((err)=>{
                console.log(err)
            })
        },
        // 编辑
        edit_this(a){
            this.editVisible = true;
            this.editId = a;
            let api ='/api/disaster/strategy';
            this.$axios.get(api,{
                 params:{
                    key: a
                }
            }).then((res)=>{
                console.log( res );
                
                this.examineflag = false;
                this.Issueflag = false; 
                this.yjbIssueflag = false;
                if( res.data.status ==200 ){ 
                let data = res.data.data.content[0]; 
                this.editform.channel = this.fanzhuan(data.channel.split(","))  ; 
                this.editform.content = data.content;
                this.editform.disasterName = data.disasterName;
                this.editform.disasterLevel = data.disasterLevel; 
                this.editform.zzName = [data.disasterCode];
                this.editform.guide = data.guide; 
                let newFlowArr = []; 
                newFlowArr = data.flow.split(",");
                this.editform.flow = data.flow;
                this.flowArr_edit = newFlowArr;
                console.log(  'newFlowArr' )
                console.log(  newFlowArr )
                this.examineflag = false;
                this.Issueflag = false;
                this.yjbIssueflag = false;
                if( data.flow.indexOf('1') > 0 ){
                    console.log( data.flow )
                    console.log( data.flow.indexOf('1') )
                    this.examineflag = true; 
                    console.log( this.examineflag )
                }else{
                    this.examineflag = false; 
                }
                if( data.flow.indexOf('2') > 0 ){
                    this.Issueflag = true;
                }else{
                    this.Issueflag = false;
                }
                if( data.flow.indexOf('3') > 0 ){
                    this.yjbIssueflag = true;
                }else{
                    this.yjbIssueflag = false; 
                }
                this.getflow_edit();

                this.editform.instruction = data.instruction;
                // this.editform = name;
                // this.editform = levelName;
                // this.editform = zzName;
                // this.editform = channel;
                // this.editform = channelStr;
                // this.editform = fabuqudao;
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        submitEditForm(formName){
             this.$refs[formName].validate(valid => {
                if (valid) {
                    //如果通过验证 to do...
                    let api = '/api/disaster/strategy';
                    this.$axios.put(api,{
                        id: this.editId,

                        // address: this.editform.address,

                        channel: this.editform.channelStr,
                        content: this.editform.content,
                        disasterCode: this.editform.disasterCode,
                        disasterLevel: this.editform.disasterLevel,
                        disasterName: this.editform.disasterName,
                        flow: this.editform.flow,
                        guide: this.editform.guide,
                        instruction: this.editform.instruction,
                        levelName: this.editform.levelName,
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
                            this.examineflag = false;
                            this.Issueflag = false; 
                            this.yjbIssueflag = false;
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
        // 改变流程
        changeflow($event){
             
            if( $event.target.classList.contains('examineList') ){
                if(  this.examineflag == false ){
                    $event.target.style.backgroundImage = "url("+ this.isYes +")";
                    this.examineflag = true; 
                    this.flowArr.splice(2,0,'1')
                    console.log( this.flowArr )
                }else if( this.examineflag == true ){
                    $event.target.style.backgroundImage = "url("+ this.isNo +")";
                    this.examineflag = false;
                    this.flowArr.splice( this.flowArr.indexOf('1'),1) 
                    console.log( this.flowArr )
                }
            }else if( $event.target.classList.contains('issueList') ){
                if(  this.Issueflag == false ){
                    $event.target.style.backgroundImage = "url("+ this.isYes +")";
                    this.Issueflag = true;
                    this.flowArr.splice(3,0,'2')
                }else if( this.Issueflag == true ){
                    $event.target.style.backgroundImage = "url("+ this.isNo +")";
                    this.Issueflag = false;
                    this.flowArr.splice(this.flowArr.indexOf('2'),1) 
                }
            }else if( $event.target.classList.contains('yjbIssueList') ){
                if(  this.yjbIssueflag == false ){
                    $event.target.style.backgroundImage = "url("+ this.isYes +")";
                    // $event.target.style.backgroundImage = "1url(https://i.postimg.cc/wTRGz54K/image.png)";
                    this.yjbIssueflag = true;
                    this.flowArr.splice(4,0,'3')
                }else if( this.yjbIssueflag == true ){
                    $event.target.style.backgroundImage = "url("+ this.isNo +")";
                    // $event.target.style.backgroundImage = "1url(https://i.postimg.cc/HLXWR7Xd/image.png)";
                    this.yjbIssueflag = false;
                    this.flowArr.splice(this.flowArr.indexOf('3'),1) 
                }
            }  

            this.addform.flow = this.flowArr.join(','); 
            console.log( this.addform.flow )
        },  
        // 改变流程
        changeflow_edit($event){
             console.log( this.flowArr_edit )
            if( $event.target.classList.contains('examineList_e') ){
                if(  this.examineflag == false ){
                    $event.target.style.backgroundImage = "url("+ this.isYes +")";
                    this.examineflag = true; 
                    this.flowArr_edit.splice(2,0,'1') 
                }else if( this.examineflag == true ){
                    $event.target.style.backgroundImage = "url("+ this.isNo +")";
                    this.examineflag = false;
                    this.flowArr_edit.splice( this.flowArr_edit.indexOf('1'),1) 
                }
            }else if( $event.target.classList.contains('issueList_e') ){
                if(  this.Issueflag == false ){
                    $event.target.style.backgroundImage = "url("+ this.isYes +")";
                    this.Issueflag = true;
                    this.flowArr_edit.splice(3,0,'2')
                }else if( this.Issueflag == true ){
                    $event.target.style.backgroundImage = "url("+ this.isNo +")";
                    this.Issueflag = false;
                    this.flowArr_edit.splice(this.flowArr_edit.indexOf('2'),1) 
                }
            }else if( $event.target.classList.contains('yjbIssueList_e') ){
                if(  this.yjbIssueflag == false ){
                    $event.target.style.backgroundImage = "url("+ this.isYes +")";
                    this.yjbIssueflag = true;
                    this.flowArr_edit.splice(4,0,'3')
                }else if( this.yjbIssueflag == true ){
                    $event.target.style.backgroundImage = "url("+ this.isNo +")";
                    this.yjbIssueflag = false;
                    this.flowArr_edit.splice(this.flowArr_edit.indexOf('3'),1) 
                }
            }  

            this.editform.flow = this.flowArr_edit.join(','); 
            console.log( this.editform.flow )
        },       
        // 获取预警流程
        getflow(){
            let examine = document.getElementsByClassName('examineList')[0];
            let issue = document.getElementsByClassName('issueList')[0];
            let yjbIssue = document.getElementsByClassName('yjbIssueList')[0];
            if(  this.examineflag == false ){
                examine.style.backgroundImage = "url("+ this.isNo +")";
            }
            if( this.examineflag == true ){
                examine.style.backgroundImage = "url("+ this.isYes +")";
            }
            if(  this.Issueflag == false ){
                issue.style.backgroundImage = "url("+ this.isNo +")";
            }
            if( this.Issueflag == true ){
                issue.style.backgroundImage = "url("+ this.isYes +")";
            }
            if(  this.yjbIssueflag == false ){
                yjbIssue.style.backgroundImage = "url("+ this.isNo +")";
            }
            if( this.yjbIssueflag == true ){
                yjbIssue.style.backgroundImage = "url("+ this.isYes +")";
            }
        },

        // 获取渠道
        getChannel(){
            let api = '/api/dict/channel';
            this.$axios.get(api).then((res)=>{
                console.log( '获取渠道' )
                console.log( res )
                this.checkboxs = res.data.data.content;
            }).catch((err)=>{
                console.log( err )
            })
        },
        // 
        changeCascader(   ){
            console.log( this.addform.zzName )
            let aId = this.addform.zzName[this.addform.zzName.length - 1];
            let bId = this.editform.zzName[this.editform.zzName.length - 1];
            console.log( aId );

            this.getAreaName( 'add',aId );
            this.getAreaName( 'edit',bId );
        },
        changeSelect(issha){ 
            console.log( issha )
            let arr = []; 
            if( issha == 'add'){
                for( let i = 0;i< this.addform.channel.length;i++ ){
                    let channel = this.addform.channel[i];
                    // let arr = [];
                    if( channel == '短信' ){
                    arr[i] = 'SMS'
                    }else if( channel == '微信' ){
                        arr[i]  = 'WECHAT'
                    }else if( channel == '邮件' ){
                        arr[i]  = 'EMAIL'
                    }else if( channel == '微博' ){
                        arr[i]  = 'WEIBO'
                    }else if( channel == '声讯' ){
                        arr[i]  = 'VOICE'
                    }else if( channel == '智慧滨海APP' ){
                        arr[i]  = 'APP'
                    }else if( channel == '大喇叭' ){
                        arr[i]  = 'SPEAKER'
                    }else if( channel == '多媒体显示屏' ){
                        arr[i]  = 'LED'
                    }else if( channel == '滨海论坛' ){
                        arr[i]  = 'WEB'
                    }else if( channel == '北斗' ){
                        arr[i]  = 'BEIDOU'
                    }else if( channel == '电视' ){
                        arr[i]  = 'TV'
                    }else if( channel == '广播' ){
                        arr[i]  = 'BROADCAST'
                    }else if( channel == '传真' ){
                        arr[i]  = 'FAX'
                    }
                }
                this.addform.channelStr = arr.join(',');
            }else{ 
                
                console.log( this.editform.channel )
                for( let i = 0;i< this.editform.channel.length;i++ ){
                    let channel = this.editform.channel[i];
                    // let arr = [];
                    if( channel == '短信' ){
                    arr[i] = 'SMS'
                    }else if( channel == '微信' ){
                        arr[i]  = 'WECHAT'
                    }else if( channel == '邮件' ){
                        arr[i]  = 'EMAIL'
                    }else if( channel == '微博' ){
                        arr[i]  = 'WEIBO'
                    }else if( channel == '声讯' ){
                        arr[i]  = 'VOICE'
                    }else if( channel == '智慧滨海APP' ){
                        arr[i]  = 'APP'
                    }else if( channel == '大喇叭' ){
                        arr[i]  = 'SPEAKER'
                    }else if( channel == '多媒体显示屏' ){
                        arr[i]  = 'LED'
                    }else if( channel == '滨海论坛' ){
                        arr[i]  = 'WEB'
                    }else if( channel == '北斗' ){
                        arr[i]  = 'BEIDOU'
                    }else if( channel == '电视' ){
                        arr[i]  = 'TV'
                    }else if( channel == '广播' ){
                        arr[i]  = 'BROADCAST'
                    }else if( channel == '传真' ){
                        arr[i]  = 'FAX'
                    }
                }
                this.editform.channelStr = arr.join(',');
            } 

        },
        fanzhuan( a ){
            let arr = a;
            let newArr = [];
            for( let i = 0;i< arr.length;i++ ){
                let channel = arr[i]; 
                if( channel == 'SMS' ){
                   newArr[i] = '短信'
                }else if( channel == 'WECHAT' ){
                    newArr[i]  = '微信'
                }else if( channel == 'EMAIL' ){
                    newArr[i]  = '邮件'
                }else if( channel == 'WEIBO' ){
                    newArr[i]  = '微博'
                }else if( channel == 'VOICE' ){
                    newArr[i]  = '声讯'
                }else if( channel == 'APP' ){
                    newArr[i]  = '智慧滨海APP'
                }else if( channel == 'SPEAKER' ){
                    newArr[i]  = '大喇叭'
                }else if( channel == 'LED' ){
                    newArr[i]  = '多媒体显示屏'
                }else if( channel == 'WEB' ){
                    newArr[i]  = '滨海论坛'
                }else if( channel == 'BEIDOU' ){
                    newArr[i]  = '北斗'
                }else if( channel == 'TV' ){
                    newArr[i]  = '电视'
                }else if( channel == 'BROADCAST' ){
                    newArr[i]  = '广播'
                }else if( channel == 'FAX' ){
                    newArr[i]  = '传真'
                }
            }

            return newArr;
        },
        // 获取label
        getAreaName(isAdd,id){
            
            let api ='/api/dict/disasterType';
            if( isAdd == 'add' ){
                console.log( 'add' )
                this.$axios.get(api,{
                    params:{
                        id: id
                    }
                }).then((res)=>{
                    console.log( res );
                    if( res.data.status ==200 ){
                        this.addform.disasterName = res.data.data.content.name;
                        this.addform.disasterCode = id;

                        console.log( 'addform' )
                        console.log( this.addform )
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }else if( isAdd == 'edit' ){
                this.$axios.get(api,{
                    params:{
                        id: id
                    }
                }).then((res)=>{
                    console.log( res );
                    if( res.data.status ==200 ){  
                        this.editform.disasterName = res.data.data.content.name;
                        this.editform.disasterCode = id;
                        console.log( 'editform' )
                        console.log( this.editform )
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        // 改变预警等级
        changeWarningName(num){
            if( num == 'add'){
                console.log( this.addform.disasterLevel )
                if( this.addform.disasterName != ''){
                    if( this.addform.disasterLevel == "RED" ){
                        this.addform.levelName = '红色预警[Ⅰ级/特别严重]';
                    }else if( this.addform.disasterLevel == "ORANGE" ){
                        this.addform.levelName = '橙色预警[Ⅱ级/严重]';
                    }else if( this.addform.disasterLevel == "YELLOW" ){
                        this.addform.levelName = '黄色预警[Ⅲ级/较重]';
                    }else if( this.addform.disasterLevel == "BLUE" ){
                        this.addform.levelName = '蓝色预警[Ⅳ级/一般]';
                    }
                    this.addform.name = this.addform.disasterName + this.addform.levelName;
                    console.log( this.addform.name )
                }else{
                    this.$message({
                        message:'请先填写灾种名称！',
                        type: 'warning'
                    })
                    this.addform.disasterLevel = '';
                    // return;
                }
            }else if( num == 'edit' ){
                if( this.editform.disasterName != ''){
                    if( this.editform.disasterLevel == "RED" ){
                        this.editform.levelName = '红色预警[Ⅰ级/特别严重]';
                        
                    }else if( this.editform.disasterLevel == "ORANGE" ){
                        this.editform.levelName = '橙色预警[Ⅱ级/严重]';
                    }else if( this.editform.disasterLevel == "YELLOW" ){
                        this.editform.levelName = '黄色预警[Ⅲ级/较重]';
                    }else if( this.editform.disasterLevel == "BLUE" ){
                        this.editform.levelName = '蓝色预警[Ⅳ级/一般]';
                    }
                    this.editform.name = this.editform.disasterName + this.editform.levelName;
                    console.log( this.editform.name )
                }else{
                    this.$message({
                        message:'请先填写灾种名称！',
                        type: 'warning'
                    })
                    this.editform.disasterLevel = '';
                    return;
                }
            }

        },
        // 获取预警流程
        getflow_edit(){
            console.log( this.examineflag )
            console.log( this.Issueflag )
            console.log( this.yjbIssueflag )
            let examine = document.getElementsByClassName('examineList_e')[0];
            let issue = document.getElementsByClassName('issueList_e')[0];
            let yjbIssue = document.getElementsByClassName('yjbIssueList_e')[0];

            if( this.examineflag ){
                examine.style.backgroundImage = "url("+ this.isYes +")";
            }else{
                examine.style.backgroundImage = "url("+ this.isNo +")";
            }
            if( this.Issueflag ){
                issue.style.backgroundImage = "url("+ this.isYes +")";
            }else{
                issue.style.backgroundImage = "url("+ this.isNo +")";
            }
            if(this.yjbIssueflag){
                yjbIssue.style.backgroundImage = "url("+ this.isYes +")";
            }else{ 
                yjbIssue.style.backgroundImage = "url("+ this.isNo +")";
            }


            // if(  this.examineflag == false ){
            //     examine.style.backgroundImage = "url("+ this.isNo +")";
            // }
            // if( this.examineflag == true ){
            //     examine.style.backgroundImage = "url("+ this.isYes +")";
            // }
            // if(  this.Issueflag == false ){
            //     issue.style.backgroundImage = "url("+ this.isNo +")";
            // }
            // if( this.Issueflag == true ){
            //     issue.style.backgroundImage = "url("+ this.isYes +")";
            // }
            // if(  this.yjbIssueflag == false ){
            //     yjbIssue.style.backgroundImage = "url("+ this.isNo +")";
            // }
            // if( this.yjbIssueflag == true ){
            //     yjbIssue.style.backgroundImage = "url("+ this.isYes +")";
            // }
        },

    },

//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
        this.getTreeData();
        this.initTableData();
        this.getArea();
        this.getChannel();
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
        
        .dialogs{
            .process{
            width: 100%;
            height: 70px;
            .listBox{
                width: 490px;
                margin: 0 auto;
                > div{
                    float: left;
                }
                .processList{
                    width: 50px;
                    height: 50px;
                    background-size: 100%;
                }
                .enterList{
                    background: url('../../../assets/images/lYes.png') no-repeat;
                    background-size: 100%;
                }
                .examineList{
                    background: url('../../../assets/images/no.png') no-repeat;
                    background-size: 100%;
                }
                .issueList{
                    background: url('../../../assets/images/no.png') no-repeat;
                    background-size: 100%;
                }
                .yjbIssueList{
                    background: url('../../../assets/images/no.png') no-repeat;
                    background-size: 100%;
                }
                .releaseList{
                    background: url('../../../assets/images/rYes.png') no-repeat;
                    background-size: 100%;
                }
                .connect{
                    width: 60px;
                    height: 6px;
                    background-color: rgb(109, 220, 218);
                    margin-top: 22px;
                }
            }
            .listTxt{
                width: 490px;
                height: 20px;
                margin: 0 auto;
                > div{
                    width: 50px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 16px;
                    text-align: center;
                    float: left;
                    margin-right: 60px;
                }
                .issueTxt{
                    margin-right: 45px;
                }
                .yjbIssueTxt{
                    width: 85px;
                    margin-right: 40px;
                }
                .releaseTxt{
                    width: 50px;
                    margin-right: 0px;
                }
            }
            
            }
            /deep/.details{
                .el-input__inner,.el-textarea__inner{
                    color: rgb(46, 148, 92)
                }
            }
        }
    }



}
</style>