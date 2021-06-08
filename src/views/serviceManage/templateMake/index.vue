<!--  -->
<template>
    <div class='container' id="container">
        <div class="crumbs">
            服务管理—模板制作
        </div>
 
        <div class="searchBox">
            <div class="iListBox">
                <div class="iListLable">输入标题</div>
                <div class="iListConent">
                    <el-input  v-model="inputTitle" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div class="iListBox">
                <div class="iListLable">模板</div>
                <div class="iListConent">
                    <el-select v-model="templateValue" @change="changeTemplate" placeholder="请选择">
                        <el-option
                            label="新建模板"
                            key="xinjian"
                            value="0">
                        </el-option>
                        <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <el-button type="primary" size="small" @click="makeTagTemplate">制作</el-button>
            </div>
        </div>

        <div class="makeBox">
            <div class="editor">
                <!-- <div ref="toolbar" id="toolbar" style="width: 100%" class="toolbar"></div> -->
                <div id='wangeditor'>
                    
                </div>
            </div>

            <!-- <Affix :offset-top="100" @on-change="change"> -->
            <div style="width: 300px;flex-shrink: 0;">
                <div class="option" id="option"  :class="{'is_fixed' : isFixed}">
                    <div class="top" >
                        <div >标签选择</div>
                    </div>
                    <div class="centerTab">
                        <Tabs size="small">
                            <TabPane label="数值类">
                                <div>
                                    <div>
                                        <div>查询标签</div>
                                        <div class="diyInputBox">
                                            <el-input placeholder="请输入内容" v-model="numValue" class="input-with-select">
                                                <el-button slot="append" icon="el-icon-search" @click="searchNum()" ></el-button>
                                            </el-input>
                                        </div>
                                        <div>默认标签</div>
                                        <div class="tagsBox">
                                            <div class="tagList" :class="{ 'isActive': activeNum == item.id }" v-for="(item,index) in numDataArr" :key="index" @click="addTag(item)">
                                                {{ item.title }}
                                            </div>
                                            <div v-if="numDataArr.length<=0">暂无标签</div>
                                            
                                        </div>
                                    </div>
                                    <!-- <div  style="margin: 10px 0">
                                        <el-button type="primary" size="small" @click="addNumTag">确定</el-button>
                                    </div> -->
                                </div>
                            </TabPane>
                            <TabPane label="文本类">
                                <div>
                                    <div>
                                        <div>查询标签</div>
                                        <div class="diyInputBox">
                                            <el-input placeholder="请输入内容" v-model="textValue" class="input-with-select">
                                                <el-button slot="append" icon="el-icon-search" @click="searchText()"></el-button>
                                            </el-input>
                                        </div>
                                        <div>默认标签</div>
                                        <div class="liwai">
                                            <div class="tagList"  @click="addTag(redLine)">
                                                红色分割线
                                            </div>
                                            <div class="tagList"  @click="addTag(importantF)">
                                                重要内容提取符
                                            </div>
                                        </div>
                                        <div class="tagsBox">
                                            <div class="tagList" :class="{ 'isActive': activeNum == item.id }" v-for="(item,index) in textDataArr" :key="index" @click="addTag(item)">
                                                {{ item.title }}
                                            </div>
                                            <div v-if="textDataArr.length<=0">暂无标签</div>
                                        </div>
                                    </div>
                                    <!-- <div  style="margin: 10px 0">
                                        <el-button type="primary" size="small" >确定</el-button>
                                    </div> -->
                                </div>
                            </TabPane>
                            <TabPane label="等级">
                                
                                <div>
                                    <div>
                                        <div>查询标签</div>
                                        <div class="diyInputBox">
                                            <el-input placeholder="请输入内容" v-model="gradeValue" class="input-with-select">
                                                <el-button slot="append" icon="el-icon-search"  @click="searchGrade()"></el-button>
                                            </el-input>
                                        </div>
                                        <div>默认标签</div>
                                        <div class="tagsBox">
                                            <div class="tagList" :class="{ 'isActive': activeNum == item.id }" v-for="(item,index) in gradeDataArr" :key="index" @click="addTag(item)">
                                                {{ item.title }}
                                            </div>
                                            <div v-if="gradeDataArr.length<=0">暂无标签</div>
                                            
                                        </div>
                                    </div>
                                    <!-- <div  style="margin: 10px 0">
                                        <el-button type="primary" size="small">确定</el-button>
                                    </div> -->
                                </div>
                            </TabPane>
                            <TabPane label="图片">
                                
                                <div>
                                    <div>
                                        <div>查询标签</div>
                                        <div class="diyInputBox">
                                            <el-input placeholder="请输入内容" v-model="imgValue" class="input-with-select">
                                                <el-button slot="append" icon="el-icon-search" @click="searchImg()"></el-button>
                                            </el-input>
                                        </div>
                                        <div>默认标签</div>
                                        <div class="tagsBox">
                                            <div class="tagList" :class="{ 'isActive': activeNum == item.id }" v-for="(item,index) in imgDataArr" :key="index" @click="addTag(item)">
                                                {{ item.title }}
                                            </div>
                                            <div v-if="imgDataArr.length<=0">暂无标签</div>
                                        </div>
                                    </div>
                                    <!-- <div style="margin: 10px 0">
                                        <el-button type="primary" size="small"  >确定</el-button>
                                    </div> -->
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                    <div></div>
                </div>
            </div>
            <!-- </Affix> -->
        </div>



    </div>








</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import E from "wangeditor";


export default {
    name: 'templateMake',
    props: {

    },
    //import引入的组件需要注入到对象中才能使用
    components: {
        
    },
    data() {
    //这里存放数据
        return {
            inputTitle: '', 
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }
            ],
            templateValue: '',
            offsetTop: 0,
            isFixed: false,
            activeName: 'second',
            editor: null,
            editorData: '',
            numDataArr: [],
            activeNum: '',
            textDataArr: [],
            gradeDataArr: [],
            imgDataArr: [],
            // 标签搜索
            numValue: '',
            textValue: '',
            gradeValue: '',
            imgValue: '',
            loading: null,

            redLine: {
                id: '',
                contentValue: '<p style="border-top: 2px solid red; border-bottom: none; border-right: none;border-left: none;align-content: center;"><br/></p ><br/>'
            },
            importantF:{
                id: '',
                contentValue: '@=@'
            }
             
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {

        change(){
            
        },
        initHeight() {
            let _top =  document.querySelector('#container').getBoundingClientRect().top;
            let offsetTop = document.querySelector('#option').getBoundingClientRect().top ;
            
            if(  _top > 0   ){
                this.isFixed = false ;
            }else{
                this.isFixed = true ;
            }
        },

        // 初始化编辑器
        wangeditorInit(){

            const editor = new E('#wangeditor')
            // 配置 onchange 回调函数，将数据同步到 vue 中
            editor.config.onchange = (newHtml) => {
                this.editorData = newHtml
            }
            editor.config.height = 650
            editor.config.zIndex = 6
            editor.config.showLinkImg = false
            editor.config.uploadImgServer = 'http://192.168.1.109:9068/api/ueditors/picture'
            editor.config.uploadFileName = 'picture'
            editor.config.uploadImgTimeout = 100 * 1000
            editor.config.uploadImgHooks = {
            // 上传图片之前
            before: function(xhr) {
                

                // 可阻止图片上传
                // return {
                //     prevent: true,
                //     msg: '需要提示给用户的错误信息'
                // }
            },
            // 图片上传并返回了结果，图片插入已成功
            success: function(xhr) {
                
            },
            // 图片上传并返回了结果，但图片插入时出错了
            fail: function(xhr, editor, resData) {
                
            },
            // 上传图片出错，一般为 http 请求的错误
            error: function(xhr, editor, resData) {
                
            },
            // 上传图片超时
            timeout: function(xhr) {
                
            },
            // 图片上传并返回了结果，想要自己把图片插入到编辑器中
            // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
            customInsert: function(insertImgFn, result) {
                // result 即服务端返回的接口

                // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
                insertImgFn(result.url)
            }
        }
            editor.config.debug = true
            editor.config.colors = [
                '#000000',
                '#ffffff',
                '#eeece0',
                '#1c487f',
                '#4d80bf',
                '#ff0000',
                '#00FF00',
                '#0000FF',
                '#FF00FF',
                '#00FFFF',
                '#FFFF00',
                '#70DB93',
                '#5C3317',
            ]
            // 配置字体
            editor.config.fontNames = [
                '黑体',
                '仿宋',
                '楷体',
                '隶书',
                '标楷体',
                '华文仿宋',
                '华文楷体',
                '宋体',
                '微软雅黑',
                'Arial',
                'Tahoma',
                'Verdana',
                'Times New Roman',
                'Courier New',
            ]



            editor.create()
            // this.editor.create()
            // let eds = document.getElementsByClassName('w-e-text-container')
            // let ele = document.getElementsByClassName('w-e-toolbar');
            // // eds[0].style = eds[0].style.cssText + 'height: 600px';
            // eds[0].style = eds[0].style.cssText + 'z-index: 5';
            // ele[0].style = ele[0].style.cssText + 'z-index: 6';
            
            this.editor = editor
            // this.$forceUpdate()
        },
        //插入代码
        insertHTML(value){
            const aaa = '<html> <head></head><body><p style="text-align:center"><strong><span style="font-size:29px;font-family:宋体;color:red"></span></strong></p><p style="text-align:center"><span style="font-size:70px;font-family:宋体;color:red;position:relative;top:1px;letter-spacing:-1px"></span></p><p style="text-align:center"><strong><span style="font-size:56px;font-family: 宋体;color:red">地质灾害气象风险</span></strong><strong><span style="font-size:56px;font-family:宋体;color:red">专题预报</span></strong></p><p style="text-align:center"><strong><span style="font-size:29px;font-family:宋体;color:red"></span></strong><span style="text-align: center; font-size: 24px; font-family: 宋体; color: red;">〔</span><span style="text-align: center; font-size: 24px;">2020</span><span style="text-align: center; font-size: 24px; font-family: 宋体; color: red;">〕第</span><span style="text-align: center; font-size: 24px; color: red;">01</span><span style="text-align: center; font-size: 24px; font-family: 宋体; color: red;">期</span></p><p style="display: inline-block;width: 100%;text-align:center;"><span style="display: inline-block;font-size:21px;font-family:仿宋_GB2312; text-align: justify; float: left; ">仪征市气象局</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="display: inline-block;font-size:21px;font-family:仿宋_GB2312; text-align: justify; float: right;">签发人:仪征市气象局</span></p><p style="border-top: 2px solid red; border-bottom: none; border-right: none;border-left: none;align-content: center;"><br/></p><p style="text-align:center"><span style="font-size:23px"></span></p><p style="text-indent:43px;line-height:21px"><span style="font-size:21px;font-family:仿宋_GB2312">受强气流影响，昨夜到今晨全市普降大雨到暴雨。预计今天到明天，我市各地仍有大雨到暴雨局部大暴雨降水过程，各地山区地质灾害气象风险预警等级为三级（黄色），发生滑坡、崩塌等地质灾害的可能性较大。请有关方面加强管理，做好地质灾害隐患点的巡查排查工作,注意防御局地山洪、崩塌、滑坡等地质灾害。</span></p><p><br/></p><p><br/></p><p><br/></p><p style="text-align: right;"><span style="font-family: 仿宋_GB2312; font-size: 21px; text-align: justify;">仪征市气象局</span><span style="font-family: 仿宋_GB2312; font-size: 21px; text-align: justify;"></span></p><p style="text-align: right;"><span style="font-family: 仿宋_GB2312; font-size: 21px; text-align: justify;">2020年06月09日18时00分</span></p><p style="text-indent:13px;line-height:37px"><span style="font-size:21px;font-family:仿宋_GB2312;"><br/></span></p><p style="text-indent:13px;line-height:37px"><br/></p><p style="text-indent:13px;line-height:37px"><span style="font-size:21px;font-family:仿宋_GB23129;"></span></p><p style="text-indent:0"><strong><span style="font-size:21px;font-family:仿宋_GB2312;">24小时值班电话：XXXX-XXXXXXX 审核人：仪征市气象局</span></strong></p><hr/><p style="text-indent: 0px;"><span style="font-size: 21px; font-family: 仿宋_GB2312, serif;">报送：</span></p></body></html>'
            this.editor.cmd.do('insertHTML',aaa)
            // this.editor.cmd.do('insertHTML','<div>'+ value + '</div>')
        },
        getEditorData() {
            // 通过代码获取编辑器内容
            let data = this.editor.txt.html()
            
        },
        getNumData(){
            let api = '/api/dict/labelContent';
            this.$axios.get(api,{
                params:{
                    typeValue: 'num'
                }
            })
            .then((res)=>{
                 
                if( res.data.status == 200 ){
                    let data = res.data.data.content;

                    this.numDataArr = data;
                }
            })
            .catch((err)=>{})
        },
        getTextData(){
            let api = '/api/dict/labelContent';
            this.$axios.get(api,{
                params:{
                    typeValue: 'text'
                }
            })
            .then((res)=>{
                 
                if( res.data.status == 200 ){
                    let data = res.data.data.content;

                    this.textDataArr = data;
                }
            })
            .catch((err)=>{})
        },
        getGradeData(){
            let api = '/api/dict/labelContent';
            this.$axios.get(api,{
                params:{
                    typeValue: 'level'
                }
            })
            .then((res)=>{
                 
                if( res.data.status == 200 ){
                    let data = res.data.data.content;

                    this.gradeDataArr = data;
                }
            })
            .catch((err)=>{})
        },
        getImgData(){
            let api = '/api/dict/labelContent';
            this.$axios.get(api,{
                params:{
                    typeValue: 'picture'
                }
            })
            .then((res)=>{
                 
                if( res.data.status == 200 ){ 
                    let data = res.data.data.content;

                    this.imgDataArr = data;
                }
            })
            .catch((err)=>{})
        },
        // 模糊查询
        searchNum(){
            let api = '/api/dict/labelContent';
            this.$axios.get(api,{
                params:{
                    typeValue: 'num',
                    title: this.numValue
                }
            })
            .then((res)=>{
                 
                if( res.data.status == 200 ){
                    let data = res.data.data.content;

                    this.numDataArr = data;
                }
            })
            .catch((err)=>{})
        },
        searchText(){
            let api = '/api/dict/labelContent';
            this.$axios.get(api,{
                params:{
                    typeValue: 'text',
                    title: this.textValue
                }
            })
            .then((res)=>{
                 
                if( res.data.status == 200 ){
                    let data = res.data.data.content;

                    this.textDataArr = data;
                }
            })
            .catch((err)=>{})
        },
        searchGrade(){
            let api = '/api/dict/labelContent';
            this.$axios.get(api,{
                params:{
                    typeValue: 'level',
                    title: this.gradeValue
                }
            })
            .then((res)=>{
                 
                if( res.data.status == 200 ){
                    let data = res.data.data.content;

                    this.gradeDataArr = data;
                }
            })
            .catch((err)=>{})
        },
        searchImg(){
            let api = '/api/dict/labelContent';
            this.$axios.get(api,{
                params:{
                    typeValue: 'picture',
                    title: this.imgValue
                }
            })
            .then((res)=>{
                 
                if( res.data.status == 200 ){ 
                    let data = res.data.data.content;

                    this.imgDataArr = data;
                }
            })
            .catch((err)=>{})
        },
        // 向模板内添加标签
        addTag( item ){
            this.activeNum = item.id;

            if( item.typeValue != 'text' ){
                this.editor.cmd.do('insertHTML',  item.contentValue )
            }else{
                this.editor.cmd.do('insertHTML', item.textContent )
            }


        },
        makeTagTemplate(){

            let api = '/api/ueditors/template';
            let data = this.editor.txt.html()
            let params={};
            this.openLoading();
            if( this.templateValue == 0 ){
                
                params = {
                    name: this.inputTitle,
                    content: data
                };
                this.$axios.post(api,params)
                .then((res)=>{
                    
                    console.log(res)

                    if(res.data.status == 200){
                        this.$message({
                            message: '新增模板成功！',
                            type: 'success'
                        });
                        this.editor.txt.clear();
                        this.inputTitle = '';
                        this.loading.close();
                        this.templateValue = '';
                        this.searchTemplate();
                    }

                }).catch((err)=>{})

            }else{ 
                params = {
                    name: this.inputTitle,
                    content: data,
                    id: this.templateValue
                };
                this.$axios.put(api,params)
                .then((res)=>{
                    
                    if(res.data.status == 200){
                        this.$message({
                            message: '修改模板成功！',
                            type: 'success'
                        });
                        this.editor.txt.clear();
                        this.inputTitle = '';
                        this.loading.close();
                        this.templateValue = '';
                        this.searchTemplate();
                    }

                }).catch((err)=>{})
 
            }

            
 




        },
        searchTemplate(){
            let api = '/api/ueditors/template';
            this.$axios.get(api,{
                type: '2'
            }).then((res)=>{
                console.log(res)
                let data = res.data.data.content;

                this.options = data;
                
                let datas = this.options[0].id;
                this.templateValue = datas;

                this.changeTemplate(datas);


            }).catch((err)=>{})
        },
        changeTemplate( val ){

            if( val != 0 ){
                
                let obj = {};
                obj = this.options.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.id === val;//筛选出匹配数据
                });
                
                
                this.inputTitle = obj.name;

                this.editor.txt.clear();
                
                this.editor.cmd.do('insertHTML', obj.content )
            }else{

                this.editor.txt.clear();
                this.inputTitle = '';

            }



        }, 
        openLoading() {
            this.loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
      }
        
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
        window.addEventListener('scroll', this.initHeight, true);
        this.wangeditorInit();
        this.getNumData();
        this.getTextData();
        this.getGradeData();
        this.getImgData();
        
        this.searchTemplate();




    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
         // 调用销毁 API 对当前编辑器实例进行销毁
        this.editor.destroy()
        this.editor = null
    }, //生命周期 - 销毁之前
    // destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
@import '../../../assets/css/styles.css';

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
        .iListBox{
            display: flex;
            align-items: center;
            margin-right: 40px;
            .iListLable{
                margin-right: 20px;
            }
        }
    }

    .makeBox{
        // height: 90px;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
        // background-color: brown;
        display: flex;
        justify-content: space-between;

        .editor{
            width: 100%;
            margin-right: 10px;
            color: rgb(0, 0, 0);

            #wangeditor{
                width: 100%;
                
                .w-e-text-container{
                    height: 700px !important;
                    .w-e-text{
                        hr{
                            background-color: red;
                            height: 2px;
                            border: none;
                        }
                    }
                }
            }
            
        }
        .option{
            width: 300px;
            background-color: #011C3A;
            .top{
                width: 100%;
                height: 80px;
                display: flex;
                justify-content: center;
                align-items: center;
                >div{
                    height: 30px;
                    width: 130px;
                    line-height: 30px;
                    text-align: center;
                    background-color: #011C3A;
                    color: #fff;
                    border-left: 1px solid #00FFFF;
                    border-right: 1px solid #00FFFF;
                }
            }
            .centerTab{
                width: 270px;
                margin: 0 auto;
                .ivu-tabs{
                    color: #fff;
                    .diyInputBox{
                        margin: 10px 0; 
                        .diyInput :nth-last-child(1){       
                            color: rgb(255, 255, 255) !important;  
                            background-color: #06395B !important; 
                            outline: none;   
                            border: none;
                        }
                        .diyInput :nth-last-child(1)::-webkit-input-placeholder{
                            color:#898AA7;
                        }
                        .diyInput :nth-last-child(1)::-moz-placeholder{   /* Mozilla Firefox 19+ */
                            color:#898AA7;
                        }
                        .diyInput :nth-last-child(1):-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                            color:#898AA7;
                        }
                        .diyInput :nth-last-child(1):-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
                            color:#898AA7;
                        }
                    }

                    .liwai{
                        .tagList{
                            width: 130px;
                            height: 30px;
                            line-height: 30px;
                            text-align: center;
                            background-color: #093B6A;
                            color: #fff;
                            margin: 5px 0;
                            border-radius: 3px;
                            &:hover{
                                cursor: pointer;
                                background-color: #067dec;
                            }
                        }
                    }
                    .tagsBox{
                        box-sizing: border-box;
                        padding: 10px;
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                        border: 1px solid #06395B;
                        margin: 10px 0;
                        border-radius: 6px;
                        max-height: 300px;
                        overflow: auto;
                        -ms-overflow-style: none;
                        overflow: -moz-scrollbars-none;
                        &::-webkit-scrollbar { width: 0 !important }
                        .tagList{
                            width: 130px;
                            height: 30px;
                            line-height: 30px;
                            text-align: center;
                            background-color: #093B6A;
                            color: #fff;
                            margin: 5px 0;
                            border-radius: 3px;
                            &:hover{
                                cursor: pointer;
                            }
                        }
                        .isActive{
                            background-color: #1571FA;
                        }
                    }
                }
            }
        }
        .is_fixed{
            position: fixed;
            width: 300px;
            top: 100px;
            right: 30px;
        }
    }

 
}
</style>