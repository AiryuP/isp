<!--  -->
<template>
    <div class='container' id="container">
        <div class="crumbs">
            风险普查—数据录入
        </div>
 
        <div class="searchBox">
            <div class="iListBox">
                <div class="iListLable">查询</div>
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
                <div>低温数据列表</div>
                <div class="icon colorRed" @click="deleteSelected" title="删除选中">
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
                </div>

                
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
                prop="crops"
                label="农作物">
                </el-table-column>
                
                <el-table-column
                prop="disasterTime"
                label="灾害时间">
                </el-table-column>
                <el-table-column
                prop="iDay"
                label="总天数">
                </el-table-column>
                <el-table-column
                prop="gdp"
                label="当年该区域的GDP（万元）">
                </el-table-column>

                <el-table-column
                prop="iPre"
                label="累积降水量">
                </el-table-column>
                <el-table-column
                prop="iPre24"
                label="日降水量最大值">
                </el-table-column>
                <el-table-column
                prop="directEconomicLoss"
                label="直接经济损失（万元）"
                width="120">
                </el-table-column>
                <el-table-column
                prop="disasterHitPopulation"
                label="受灾人口">
                </el-table-column>
                <el-table-column
                prop="affectedArea"
                label="受灾面积">
                </el-table-column>
                
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <div class="handleIconBox" title="查看" ><i class="el-icon-tickets"  @click="check(scope.row)" ></i></div>
                        <div class="handleIconBox" title="修改" ><i class="el-icon-edit-outline"  @click="edit(scope.row)" ></i></div>
                        <div class="handleIconBox" title="删除"><i class="el-icon-delete"  @click="del_this( scope.row.id )" ></i></div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 新增 -->
        <el-dialog
            title="添加"
            :visible.sync="addVist"
            :close-on-click-modal='false'
            width="40%"
            :before-close="handleClose">



            <div style="height: 380px;overflow: auto;padding: 5px 10px">
                
            <el-form ref="addform" :model="addform" label-width="200px">
                <el-form-item label="最大小时降水量" prop="iPre1">
                    <el-input v-model="addform.iPre1"></el-input>
                </el-form-item>
                <el-form-item label="日降水量最大值" prop="iPre24">
                    <el-input v-model="addform.iPre24"></el-input>
                </el-form-item>
                <el-form-item label="暴雨过程的累积降水量" prop="iPre">
                    <el-input v-model="addform.iPre"></el-input>
                </el-form-item>
                <el-form-item label="总天数" prop="iDay">
                    <el-input v-model="addform.iDay"></el-input>
                </el-form-item>
                <el-form-item label="灾害时间" prop="disasterTime">
                    <el-input v-model="addform.disasterTime"></el-input>
                </el-form-item>
                <el-form-item label="直接经济损失（万元）" prop="directEconomicLoss">
                    <el-input v-model="addform.directEconomicLoss"></el-input>
                </el-form-item>
                <el-form-item label="当年该区域的GDP（万元）" prop="gdp">
                    <el-input v-model="addform.gdp"></el-input>
                </el-form-item>
                <el-form-item label="死亡人口" prop="deadPopulation">
                    <el-input v-model="addform.deadPopulation"></el-input>
                </el-form-item>
                <el-form-item label="受灾人口" prop="disasterHitPopulation">
                    <el-input v-model="addform.disasterHitPopulation"></el-input>
                </el-form-item>
                <el-form-item label="总人口" prop="totalPopulation">
                    <el-input v-model="addform.totalPopulation"></el-input>
                </el-form-item>
                <el-form-item label="农作物" prop="crops">
                    <el-input v-model="addform.crops"></el-input>
                </el-form-item>
                <el-form-item label="总面积" prop="totalArea">
                    <el-input v-model="addform.totalArea"></el-input>
                </el-form-item>
                <el-form-item label="受灾面积" prop="affectedArea">
                    <el-input v-model="addform.affectedArea"></el-input>
                </el-form-item>
                <el-form-item label="绝收面积" prop="jsArea">
                    <el-input v-model="addform.jsArea"></el-input>
                </el-form-item>
                <el-form-item label="总产" prop="totalOutput">
                    <el-input v-model="addform.totalOutput"></el-input>
                </el-form-item>
                <el-form-item label="单产" prop="unitYield">
                    <el-input v-model="addform.unitYield"></el-input>
                </el-form-item>
            </el-form>
            </div>
             
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateAdd">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 查看 -->
        <el-dialog
            title="查看"
            :visible.sync="checkVist"
            :close-on-click-modal='false'
            width="40%">
 
            <div style="height: 380px;overflow: auto;padding: 5px 10px">
                
            <el-form ref="checkform" :model="checkform" label-width="200px">
                <el-form-item label="最大小时降水量">
                    <el-input v-model="checkform.iPre1"></el-input>
                </el-form-item>
                <el-form-item label="日降水量最大值">
                    <el-input v-model="checkform.iPre24"></el-input>
                </el-form-item>
                <el-form-item label="暴雨过程的累积降水量">
                    <el-input v-model="checkform.iPre"></el-input>
                </el-form-item>
                <el-form-item label="总天数">
                    <el-input v-model="checkform.iDay"></el-input>
                </el-form-item>
                <el-form-item label="灾害时间">
                    <el-input v-model="checkform.disasterTime"></el-input>
                </el-form-item>
                <el-form-item label="直接经济损失（万元）">
                    <el-input v-model="checkform.directEconomicLoss"></el-input>
                </el-form-item>
                <el-form-item label="当年该区域的GDP（万元）">
                    <el-input v-model="checkform.gdp"></el-input>
                </el-form-item>
                <el-form-item label="死亡人口">
                    <el-input v-model="checkform.deadPopulation"></el-input>
                </el-form-item>
                <el-form-item label="受灾人口">
                    <el-input v-model="checkform.disasterHitPopulation"></el-input>
                </el-form-item>
                <el-form-item label="总人口">
                    <el-input v-model="checkform.totalPopulation"></el-input>
                </el-form-item>
                <el-form-item label="农作物">
                    <el-input v-model="checkform.crops"></el-input>
                </el-form-item>
                <el-form-item label="总面积">
                    <el-input v-model="checkform.totalArea"></el-input>
                </el-form-item>
                <el-form-item label="受灾面积">
                    <el-input v-model="checkform.affectedArea"></el-input>
                </el-form-item>
                <el-form-item label="绝收面积">
                    <el-input v-model="checkform.jsArea"></el-input>
                </el-form-item>
                <el-form-item label="总产">
                    <el-input v-model="checkform.totalOutput"></el-input>
                </el-form-item>
                <el-form-item label="单产">
                    <el-input v-model="checkform.unitYield"></el-input>
                </el-form-item>
            </el-form>
            </div>
             
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="checkVist = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog
            title="编辑"
            :visible.sync="editVist"
            :close-on-click-modal='false'
            width="40%">
 
            <div style="height: 380px;overflow: auto;padding: 5px 10px">
                
            <el-form ref="editform" :model="editform" label-width="200px">
                <el-form-item label="最大小时降水量">
                    <el-input v-model="editform.iPre1"></el-input>
                </el-form-item>
                <el-form-item label="日降水量最大值">
                    <el-input v-model="editform.iPre24"></el-input>
                </el-form-item>
                <el-form-item label="暴雨过程的累积降水量">
                    <el-input v-model="editform.iPre"></el-input>
                </el-form-item>
                <el-form-item label="总天数">
                    <el-input v-model="editform.iDay"></el-input>
                </el-form-item>
                <el-form-item label="灾害时间">
                    <el-input v-model="editform.disasterTime"></el-input>
                </el-form-item>
                <el-form-item label="直接经济损失（万元）">
                    <el-input v-model="editform.directEconomicLoss"></el-input>
                </el-form-item>
                <el-form-item label="当年该区域的GDP（万元）">
                    <el-input v-model="editform.gdp"></el-input>
                </el-form-item>
                <el-form-item label="死亡人口">
                    <el-input v-model="editform.deadPopulation"></el-input>
                </el-form-item>
                <el-form-item label="受灾人口">
                    <el-input v-model="editform.disasterHitPopulation"></el-input>
                </el-form-item>
                <el-form-item label="总人口">
                    <el-input v-model="editform.totalPopulation"></el-input>
                </el-form-item>
                <el-form-item label="农作物">
                    <el-input v-model="editform.crops"></el-input>
                </el-form-item>
                <el-form-item label="总面积">
                    <el-input v-model="editform.totalArea"></el-input>
                </el-form-item>
                <el-form-item label="受灾面积">
                    <el-input v-model="editform.affectedArea"></el-input>
                </el-form-item>
                <el-form-item label="绝收面积">
                    <el-input v-model="editform.jsArea"></el-input>
                </el-form-item>
                <el-form-item label="总产">
                    <el-input v-model="editform.totalOutput"></el-input>
                </el-form-item>
                <el-form-item label="单产">
                    <el-input v-model="editform.unitYield"></el-input>
                </el-form-item>
            </el-form>
            </div>
             
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 文件上传 -->
        <el-dialog title="上传文件"   :close-on-click-modal='false' :visible.sync="dialogUpdataVisible">
            <div style="height: 340px;">
                    <el-upload 
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
  
    </div>

 
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import E from "wangeditor";


export default {
    name: 'lowTem',
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
            selectedArr: [],

            addVist: false,
            addform: {
                iPre1: '',
                iPre24: '',
                iPre: '',
                iDay: '',
                disasterTime: '',
                directEconomicLoss: '',
                gdp: '',
                deadPopulation: '',
                disasterHitPopulation: '',
                totalPopulation: '',
                crops: '',
                totalArea: '',
                affectedArea: '',
                jsArea: '',
                totalOutput: '',
                unitYield: '',
            },
            checkVist: false,
            checkform: {
                iPre1: '',
                iPre24: '',
                iPre: '',
                iDay: '',
                disasterTime: '',
                directEconomicLoss: '',
                gdp: '',
                deadPopulation: '',
                disasterHitPopulation: '',
                totalPopulation: '',
                crops: '',
                totalArea: '',
                affectedArea: '',
                jsArea: '',
                totalOutput: '',
                unitYield: '',
            },
            editVist: false,
            editform: {
                iPre1: '',
                iPre24: '',
                iPre: '',
                iDay: '',
                disasterTime: '',
                directEconomicLoss: '',
                gdp: '',
                deadPopulation: '',
                disasterHitPopulation: '',
                totalPopulation: '',
                crops: '',
                totalArea: '',
                affectedArea: '',
                jsArea: '',
                totalOutput: '',
                unitYield: '',
            },
            editId: null,
            dialogUpdataVisible: false,
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
        handleSelectionChange(val) {
            let arr = [];
            for( let i = 0;i<val.length;i++ ){
                arr.push( val[i].id )
            }
            this.selectedArr = arr;
        },
        // 删除
        deleteSelected(){
            let api = '/api/zhfx/baoYu';
            if( this.selectedArr.length > 0 ){
                this.$axios.delete(api,{
                    data: this.selectedArr
                }).then(( res )=>{
                    if( res.data.status == 200 ){
                        this.$message({
                            type: 'success',
                            message:'删除成功！'
                        });
                        this.getData();
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
                let api = '/api/zhfx/baoYu';
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
                        this.getData();
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
            let api = '/api/zhfx/baoYu';
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
            let api = '/api/zhfx/baoYu';

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



        //  获取表格数据
        getData(){
            let api = '/api/zhfx/baoYu';

            this.$axios.get(api,{
                params:{
                    current: 1,
                    pageSize: 10
                }
            })
            .then((res)=>{
                console.log(res);
                let data = res.data.data.content;
                let pagination = res.data.data.pagination;

                this.current = pagination.current,
                this.pageSize= pagination.pageSize,
                this.total= pagination.total,

                this.tableData = data;

            })
            .catch((err)=>{
                console.log(err)
            })

        },

        //  新增数据
        addData(){
            this.addVist = true;
        },
        //  确认新增
        updateAdd(){
            let api = '/api/zhfx/baoYu';
            this.$axios.post(api,{
                iPre1: this.addform.iPre1,
                iPre24: this.addform.iPre24,
                iPre: this.addform.iPre,
                iDay: this.addform.iDay,
                disasterTime: this.addform.disasterTime,
                directEconomicLoss: this.addform.directEconomicLoss,
                gdp: this.addform.gdp,
                deadPopulation: this.addform.deadPopulation,
                disasterHitPopulation: this.addform.disasterHitPopulation,
                totalPopulation: this.addform.totalPopulation,
                crops: this.addform.crops,
                totalArea: this.addform.totalArea,
                affectedArea: this.addform.affectedArea,
                jsArea: this.addform.jsArea,
                totalOutput: this.addform.totalOutput,
                unitYield: this.addform.unitYield,
            }).then((res)=>{
              
                if( res.data.status == 200){
                    this.$refs.addform.resetFields();
                    this.getData();
                    this.addVist = false;
                }
            }).catch(err=>{})
        },
        //  添加的form关闭前
        handleClose(){
            console.log('关闭')
        },
        //  查看
        check(item){
            console.log(item)


            this.checkform.iPre1= item.iPre1,
            this.checkform.iPre24= item.iPre24,
            this.checkform.iPre= item.iPre,
            this.checkform.iDay= item.iDay,
            this.checkform.disasterTime= item.disasterTime,
            this.checkform.directEconomicLoss= item.directEconomicLoss,
            this.checkform.gdp= item.gdp,
            this.checkform.deadPopulation= item.deadPopulation,
            this.checkform.disasterHitPopulation= item.disasterHitPopulation,
            this.checkform.totalPopulation= item.totalPopulation,
            this.checkform.crops= item.crops,
            this.checkform.totalArea= item.totalArea,
            this.checkform.affectedArea= item.affectedArea,
            this.checkform.jsArea= item.jsArea,
            this.checkform.totalOutput= item.totalOutput,
            this.checkform.unitYield= item.unitYield,
 

            this.checkVist = true;

        },
        //  编辑
        edit(item){
            this.editform.iPre1= item.iPre1,
            this.editform.iPre24= item.iPre24,
            this.editform.iPre= item.iPre,
            this.editform.iDay= item.iDay,
            this.editform.disasterTime= item.disasterTime,
            this.editform.directEconomicLoss= item.directEconomicLoss,
            this.editform.gdp= item.gdp,
            this.editform.deadPopulation= item.deadPopulation,
            this.editform.disasterHitPopulation= item.disasterHitPopulation,
            this.editform.totalPopulation= item.totalPopulation,
            this.editform.crops= item.crops,
            this.editform.totalArea= item.totalArea,
            this.editform.affectedArea= item.affectedArea,
            this.editform.jsArea= item.jsArea,
            this.editform.totalOutput= item.totalOutput,
            this.editform.unitYield= item.unitYield,
            this.editVist = true;
            this.editId = item.id;
        },
        //  确认编辑
        sureEdit(){
            let api = '/api/zhfx/baoYu';
            this.$axios.put(api,{
                id: this.editId,
                
                iPre1: this.editform.iPre1,
                iPre24: this.editform.iPre24,
                iPre: this.editform.iPre,
                iDay: this.editform.iDay,
                disasterTime: this.editform.disasterTime,
                directEconomicLoss: this.editform.directEconomicLoss,
                gdp: this.editform.gdp,
                deadPopulation: this.editform.deadPopulation,
                disasterHitPopulation: this.editform.disasterHitPopulation,
                totalPopulation: this.editform.totalPopulation,
                crops: this.editform.crops,
                totalArea: this.editform.totalArea,
                affectedArea: this.editform.affectedArea,
                jsArea: this.editform.jsArea,
                totalOutput: this.editform.totalOutput,
                unitYield: this.editform.unitYield,
            }).then((res)=>{
                console.log(res)
                if( res.data.status == 200){
                    this.getData();
                    this.editVist = false;
                }
            })
        },
        //  下载模板
        downloadEle(){
            let url = this.global.serverSrc + '/files/baseTemplate/暴雨灾害信息.xlsx'

            window.open(url)
        },
        //  数据导入
        dataImport(){
            this.dialogUpdataVisible = true
        },
 
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleExceed(files) {
            this.$message.warning(`当前限制选择 1 个文件`);
        },
        uploadFile(param){
            var fileObj = param.file
            console.log(fileObj)
            var FileController = '/api/zhfx/baoYu/import'    // 接收上传文件的后台地址
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
                    this.getData();
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
        newSubmitForm(){//确定上传
            this.$refs.newupload.submit();
        },

        
        // 导出数据
        downloadData(){
            let api = '/api/zhfx/baoYu/export';
            this.$axios.get(api,{})
            .then((res)=>{
                console.log(res)
                let url = res.data.data.content;

                window.open(url)
            })
            // this.$axios.get(api,{responseType: 'blob'}).then(
            // (res)=>{
            //     console.log( res ) 
            //     if( res.status == 200){
            //         let blob = new Blob([res.data],{type: 'application/vnd.ms-excel'}); 
            //         let downloadElement = document.createElement('a');
            //         let href = window.URL.createObjectURL(blob); //创建下载的链接
            //     　　downloadElement.href = href;
            //     　　downloadElement.download = '暴雨.xls'; //下载后文件名
            //     　　document.body.appendChild(downloadElement);
            //     　　downloadElement.click(); //点击下载
            //     　　document.body.removeChild(downloadElement); //下载完成移除元素
            //     　　window.URL.revokeObjectURL(href); //释放掉blob对象 
            //     }
            // }).catch((err)=>{
            //     console.log(err)
            // })
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
        
        this.getData();

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
@import '../../../../../assets/css/styles.css';

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