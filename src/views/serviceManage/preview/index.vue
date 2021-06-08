<!--  -->
<template>
    <div  class='container'> 
        <div class="editor">
            <!-- <div ref="toolbar" id="toolbar" style="width: 100%" class="toolbar"></div> -->
            <div id='wangeditor'>
                
            </div>
        </div>

        <div class="btnsBox">
            <el-button type="primary" @click="downloadFile">下载</el-button>
            <el-button type="primary" @click="makeProduct">制作</el-button>
            <el-button type="primary" @click="toEsayPub">发布</el-button>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import E from "wangeditor";

export default {
//import引入的组件需要注入到对象中才能使用
name: 'Preview',
components: {},
data() {
//这里存放数据
return {
    data: this.$route.query.itme
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

    // 初始化编辑器
    wangeditorInit(){

        const editor = new E('#wangeditor')
        // 配置 onchange 回调函数，将数据同步到 vue 中
        editor.config.onchange = (newHtml) => {
            this.editorData = newHtml
        }
        editor.config.height = 580
        editor.config.zIndex = 6
        editor.config.uploadImgServer = '/upload-img'
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
        this.editor = editor
    },
    // 通过ID获取内容
    getEditContent(){
        let api = '/api/ueditors/preview'
        this.$axios.get(api,{
            params:{
                typeId: this.data.id
            }
        }).then((res)=>{
            let data = res.data.content;
            this.editor.cmd.do('insertHTML',data)
        }).catch((err)=>{
            
        })
    },
    downloadFile(){
            let item = this.data
            let api = '/api/ueditors/product';
            let contents = this.editor.txt.html()
            let content = '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"> <head></head><body>'
                        + contents 
                        + "</body></html>"
            
            let params = {
                typeId: item.id,
                typeName: item.name,
                content: content
            }
            this.$axios.post(api,params)
            .then((res)=>{
                
                let url = res.data.url;
                if( url != '' ){
                    window.location.href= url
                }else{
                    this.$message({
                        type: 'warning',
                        message:'制作失败，请稍后再试！'
                    });
                }
            }).catch((err)=>{})
    },
    // 
    makeProduct(){

            let item = this.data
            let api = '/api/ueditors/makeProduct';
            let contents = this.editor.txt.html()
            let content = '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"> <head></head><body>'
                        + contents 
                        + "</body></html>"
            
            let params = {
                areaCode: '230600000000',
                typeId: item.id,
                typeName: item.name,
                content: content
            }
            this.$axios.post(api,params)
            .then((res)=>{
                
                // let url = res.data.url;
                // if( url != '' ){
                //     window.location.href= url
                // }else{
                //     this.$message({
                //         type: 'warning',
                //         message:'制作失败，请稍后再试！'
                //     });
                // }
            }).catch((err)=>{})
    },
    // 跳转一键发
    toEsayPub(){
        
            let item = this.data
            let api = '/api/ueditors/publishProduct';
            let contents = this.editor.txt.html()
            let content = '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"> <head></head><body>'
                        + contents 
                        + "</body></html>"
            
            let params = {
                areaCode: '230600000000',
                typeId: item.id,
                typeName: item.name,
                content: content
            }
            this.$axios.post(api,params)
            .then((res)=>{
                
                let data = res.data
                // let url = res.data.url;
                // if( url != '' ){
                //     window.location.href= url
                // }else{
                //     this.$message({
                //         type: 'warning',
                //         message:'制作失败，请稍后再试！'
                //     });
                // }

                this.$router.push(
                    {
                        path: '/easyRelease',
                        query: {
                            itme: data
                        }
                    }
                )
            }).catch((err)=>{})











    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.wangeditorInit();

    this.getEditContent();

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
    min-width: 760px;

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
    .btnsBox{
        margin: 20px 0;
    }
}
</style>