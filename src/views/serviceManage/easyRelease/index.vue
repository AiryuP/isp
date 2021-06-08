<!--  -->
<template>
<div class='container'>
    <div class="crumbs">
        服务管理—一键发布
    </div>

 
    <div class="searchBox">
        <div class="iListBox">
            <div class="iListLable">标题</div>
            <!-- <div class="iListConent">
                <el-input  v-model="inputTitle" placeholder="请输入内容"></el-input>
            </div> -->
            <div class="iListConent">
                  <el-select v-model="activeData.title" :disabled=' topData != "" ' @change='changeOption' placeholder="请选择模板">
                    <el-option
                    v-for="item in options"
                    :key="item.id" 
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </div>
    </div>

    <div class="channel">
        <div class="channelTitle">发布渠道</div>
        <div class="channelBox">
            <div class="channels" :class=" item.isSelect ? 'channelActive': '' " v-for="(item,index) in channelArr" :key="index"  :title="item.name" >
                <img :src="global.serverSrc + '/files/' + item.newIcon " @click.self="selectChannel(item)" :alt="item.name" >
            </div>
        </div>
    </div>

    <div class="product">
        <div class="productTit">服务产品</div>
        <div class="productCont">
            <!-- 地质灾害风险评估 -->
            
            <el-table
                ref="multipleTable"
                :data="tableData"
                :max-height="280"
                @selection-change="selectedChange"
                style="width: 100%">
                <el-table-column
                    :selectable='selectInit'
                    type="selection"
                >
                <!-- width="120" -->
                </el-table-column> 
                <el-table-column
                    prop="title"
                    label="文件名称" >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间" >
                </el-table-column> 
            </el-table>
        </div>
        
    </div>

    <div class="surplus">
        <div class="audience">
            <div class="twoTit">受众&群组</div>
            <div class="audienceBox">
                <div v-for="(item,index) in groupsArr" :key="index">
                    <div class="groupName">{{ item.item.name }}</div>
                    <div v-for="( iitem , indexs ) in item.data" class="groupBox" :key="indexs">
                        <!-- <div v-if="iitem.type != '1'"> {{ iitem.name }} </div> -->
                        <el-checkbox-group v-model="checkList[item.code]" @change="changeSelect" >
                            <el-checkbox v-if="iitem.type != '1'" :label="iitem.id">{{ iitem.name }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
        </div>
        <div class="pubContent">
            <div class="twoTit">发布内容</div>
            <div class="pubBox">
                <!-- <div class="textArea">  -->
                    <el-input
                        type="textarea"
                        :rows="6"
                        resize="none"
                        placeholder="请输入内容"
                        v-model="activeData.content">
                    </el-input>
                <!-- </div> -->
                <div class="enclosure">
                    附件
                </div>
                <div class="othersBox">
                        <!-- <div>获取文件</div> -->
                        
                    <el-upload
                        ref="newupload"
                        action="https://baidu.com"
                        :before-remove="beforeRemove"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :on-change="onChange"
                        :http-request="uploadFile"
                        :auto-upload="false">
                        
                        <div class="btn">
                            <div>上传文件</div>
                        </div>
                        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="newSubmitForm">发布</el-button> -->


                    </el-upload> 
                    <div class="uploadBox" @click="newSubmitForm" >
                        <div class="uploadIcon"></div>
                        <div class="uploadText">发布</div>
                    </div>
                </div>
            </div>
        </div>
    </div>




</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    name: 'easyRelease',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    inputTitle: '',
    channelArr: [],
    groupsArr: [],
    checkList: [],
    
    options: [],
    tableData: [],

    selectedArr: [],

    topData: this.$route.query.itme || '',

    channels: [],  // 已选渠道
    filesArr: [], // 存放附件
    
    activeData:{
        title: '',
        type: '',
        typeName: '',
        lon: '',
        lat: '',
        orgCode: '',
        orgNmae: '',
        content: '',
        geocode: [],
        messages: {},
    },

    att: [],

    fileList: [],

    loading: null,


};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
 
    // 获取渠道
    getAllChannel(){
        let api = '/api/dict/channel';
        this.$axios.get(api,{
            params:{
                areaCode: '230600000000'
            }
        }).then((res)=>{
            let data = res.data.data.content;
            for( let i = 0; i< data.length;i++ ){
                data[i].isSelect = false
                // this.checkList[data[i].code] = [];
                this.$set(this.checkList, data[i].code, [])
            }
            this.channelArr = data;
        }).catch((err)=>{

        })
    },
    //  选中渠道
    selectChannel( item ){
        item.isSelect = !item.isSelect

        let api = 'api/dict/area/group';
        this.$axios.get(api,{
            params:{
                areaCode: '230600000000',
                channel: item.code
            }
        }).then((res)=>{
            let groupsArr  = this.groupsArr;
            let a = groupsArr.some(items => items.code.indexOf(item.code) > -1);
            let obj = {};
            if( a ){
                groupsArr = groupsArr.filter(items => items.code != item.code );

            }else{
                obj.code = item.code;
                obj.name = item.name;
                obj.item = item;
                obj.data = res.data.data.content;
                groupsArr.push( obj )
                this.checkList[item.code] = []
            }
            this.groupsArr = groupsArr;


        }).catch((err)=>{

        })

        let arr = this.channelArr;

        this.channels = arr.filter(item=> item.isSelect == true )

    },
    // 获取渠道下的群组
    getGroups( item ){

    },
    // 获取选中的群组
    changeSelect(){
        
    },
    // 循环添加checkList
    forAddChenck(){

    },
    // 改变模板option搜索
    changeOption( val ){
        // for( let i = 0;i< this.options.length;i++ ){
        //     if( val == this.options[i].id ){
        //         this.activeData.type = this.options[i].id;
        //         this.activeData.typeName = this.options[i].name;
        //         this.activeData.title = this.options[i].name;
        
        //     }
        // }
        let api = '/api/ueditors/serverProduct';
        this.$axios.get( api,{
            params:{
                areaCode: '230600000000',
                current: 1,
                pageSize: 100,
                type: val
            }
        } ).then((res)=>{
            
            this.tableData = res.data.data.content;
        }).catch((err)=>{
            
        })
    },
    // 获取模板
    getMuban(){
        let api = '/api/ueditors/template';
        this.$axios.get( api ).then((res)=>{
            
            this.options = res.data.data.content;
        }).catch((err)=>{
            
        })
    },
    selectedChange( val ){  
        this.selectedArr = val;
        
    },
    // 附件上传
    uploadFile(param){
        var fileObj = param.file;
        var FileController = '/api/business/publish/files'    // 接收上传文件的后台地址
        var form = new FormData()    // FormData 对象
        form.append('warnFile', fileObj)    // 文件对象
        this.loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios.post(FileController, form).then( (res)=> {
            if( res.data.status == 200 ){
                // loading.close();
                
                this.loading.close();  
                this.filesArr.push( res.data.data.content[0] )
                this.submission();

            }else{
                    this.$message({
                    message: res.data.message,
                    type: 'warning'
                })
            }
        }).catch((error) =>{
        })
    }, 
    
    // 提交数据
    submission(){ 
        if( this.activeData.title == '' ){
            this.$message({
                message: '请选择需要发布的模板！',
                type: 'warning'
            })
            return ;
        }
        if( this.channels.length < 1 ){
            this.$message({
                message: '请至少选择一个发布渠道！',
                type: 'warning'
            })
            return ;
        }
        

        let arr = this.channels;
        let messages = [];
        // let area = JSON.parse(sessionStorage.getItem('area'));
        let area = JSON.parse(sessionStorage.getItem('area'));
        let organization = JSON.parse(sessionStorage.getItem('organization'));
        // let organization = JSON.parse(sessionStorage.getItem('organization'));

        let bbb = this.options.filter(item=> item.id == this.activeData.title );

        for( let i = 0; i< arr.length; i++ ){ 
            if( this.checkList[arr[i].code].length < 1 ){
                this.$message({
                    message: '请选择发布群组！',
                    type: 'warning'
                })
                return ;
            }
            let att = [];
            for(let o = 0;o<this.filesArr.length;o++){
                att.push({ 
                    name: this.filesArr[o].name,
                    size: this.filesArr[o].size,
                    url : this.filesArr[o].url,
                    type: '0'
                })
            }
            for( let k =0; k< this.selectedArr.length; k++ ){
                let url =  this.selectedArr[k].path;
                let ind =  url.lastIndexOf('/') + 1;
                url = url.substring( ind )
                att.push({ 
                    name: url,
                    size: '',
                    url : this.selectedArr[k].path,
                    type: '2'
                })
            }
            this.att = att;
            messages.push({
                channelCode: arr[i].code,
                channelName: arr[i].name,
                content: this.activeData.content,
                groups: this.checkList[arr[i].code],
                title: bbb[0].name,
                attachments: att
            })
        }


        let  api = '/api/business/publish';

        let ititle = bbb[0].name;
        let itype = this.activeData.title;
        let itypeName = bbb[0].name;
        let icontent = this.activeData.content;

        this.loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios.post( api,{
            title: ititle,
            areaCode: '230600000000',
            lon: '',
            lat: '',
            orgCode: '23060041600000',
            orgName: '大庆市气象局',
            type: itype,
            typeName: itypeName,
            content: icontent,
            geocode: [],
            messages: messages,
        } ).then( (res)=>{
            if( res.data.status == 200){
                this.loading.close(); 
                this.$message({
                    message: '发布成功！',
                    type: 'success'
                })
                this.$router.push({
                    path: '/publishList'
                })
            }


        } ).catch((err)=>{
            
        })




    },
    
    newSubmitForm(){
        if( this.fileList.length < 1 ){
            this.submission();
        }else{
            this.$refs.newupload.submit();
        }
    },

    inits(val){
        
        if( this.topData == '' ){
            
            // let api = '/api/ueditors/serverProduct';
            // this.$axios.get( api,{
            //     params:{
            //         areaCode: '230600000000',
            //         current: 1,
            //         pageSize: 100,
            //         type: val
            //     }
            // } ).then((res)=>{
            //     this.tableData = res.data.data.content;
            // }).catch((err)=>{
            // })

        }else{


            this.activeData.title = this.topData.type;
            this.activeData.content = this.topData.content;
            let api = '/api/ueditors/serverProduct';
            this.$axios.get( api,{
                params:{
                    id: this.topData.productId
                }
            } ).then((res)=>{
                
                let obj = {};
                let arr = [];
                obj = res.data.data.content;
                arr.push(obj)
                this.tableData = arr;
                this.$nextTick(()=>{
                    this.tableData.forEach(row => {
                        
                        this.$refs.multipleTable.toggleRowSelection(row,true);
                    });
                })
            }).catch((err)=>{
                
            })









        }
    },
    // 禁用多选框
    selectInit(row,index){
        if(row.id==this.topData.productId){
            return false  //不可勾选
        }else{    
            return true  //可勾选
        }
    },
    
    // 附件上传
    beforeRemove(file) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
    onChange(file, fileList){
        // this.fileList = fileList
        
        this.fileList = fileList;
    },
    handleRemove(file, fileList) {
        
        this.fileList = fileList;
    },
    handlePreview(){

    },

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.getAllChannel();
    this.getMuban();

    this.inits();

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
@import '../../../assets/css/styles.css';

.container{
    flex: 1;
    height: 200px;
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

    .channel{
        display: flex;
        align-items: center;

 
        .channelTitle{
            font-size: 24px;
            font-weight: 400;
            color: #9FC8F2;
        }

        .channelBox{
            display: flex;
            .channels{
                width: 50px;
                height: 50px;
                padding: 2px;
                // background-color: #9FC8F2;
                margin: 0 10px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
                &:hover{
                    cursor: pointer;
                }
            }
            .channelActive{
                border: 2px solid #148ab4;
                box-shadow: 0 0 6px 1px rgb(11, 232, 240);
            }
        }

    }

    .product{
        // display: flex;
        align-items: center;
        margin: 20px 0;
        .productTit{
            font-size: 24px;
            font-weight: 400;
            color: #9FC8F2;
            margin: 10px 0;
        }
        .productCont{
            // font-size: 24px;
            // font-weight: 400;
            color: #ffffff;
            box-sizing: border-box;
            // margin-left: 20px;
            // &:hover{
            //     cursor: pointer;
            // }
        }
  
    }

    .surplus{
        display: flex;
        margin: 20px 0;
        div{
            .twoTit{
                font-size: 24px;
                font-weight: 400;
                color: #9FC8F2;
                margin-bottom: 10px;
            }
        }
        .audience{
            width: 15%;
            min-width: 160px;
            .audienceBox{
                // height: 450px;
                min-height: 200px;
                padding: 10px 0;
                background-color: #011C3A;
                box-sizing: border-box;
                margin: 10px 20px 10px 0px;

                .groupName{
                    color: aqua;
                    margin: 10px 5px;
                    font-size: 18px;
                }
                .groupBox{
                    box-sizing: border-box;
                    padding-left: 30px;
                }
            }
        }

        .pubContent{
            width: 85%;

            .pubBox{
                box-sizing: border-box;
                padding: 20px 10px;
                background-color: #011C3A;
                .textArea{
                    height: 320px;
                    background-color: #06395B;
                    border-radius: 6px;
                }
                .enclosure{
                    width: 130px;
                    border-left: #00FFFF;
                    border-left-style: solid;
                    border-left-width: 2px;
                    padding-left: 10px;
                    background-color: #06395B;
                    height: 30px;
                    line-height: 30px;
                    margin: 20px 0;
                }
                .othersBox{
                    display: flex;
                    .btn{
                        width: 200px;
                        height: 58px;
                        line-height: 58px;
                        text-align: center;
                        color: #fff;
                        font-size: 16px;
                        background-color: #093B6A;
                        &:hover{
                            background-color: #127fa0;
                        }
                    }
                    .uploadBox{
                        width: 31px;
                        height: 58px;
                        margin-left: 30px;
                        .uploadIcon{
                            width: 31px;
                            height: 32px;
                            background: url('../../../assets/images/other/release.png') no-repeat;
                        }
                        .uploadText{
                            width: 31px;
                            height: 26px;
                            line-height: 26px;
                            text-align: center;
                        }
                        &:hover{
                            cursor: pointer;
                        }
                    }
                }
            }

        }


    }



}
</style>