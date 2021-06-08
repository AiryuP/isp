<!--  -->
<template>
    <div class='container'>
        <div class="crumbs">
            服务管理—标签制作
        </div>
        <div class="tagMakeBox">
            <div class="tagMakeDeta">
                <div class="tagMakeList">
                    <div class="ilabel">当前标签标题 <div class="subtitle">可自定义修改</div> </div>
                    <div><el-input v-model="tagTitle" size="small" placeholder="请输入标题"></el-input></div>
                </div>
                <div class="tagMakeList">
                    <div class="ilabel">标签类别</div>
                    <div class="icontent">
                        <div class="iTagOption" :class="{ 'isActive': isType == 'num' }" @click="changeType('num')">数值类</div>
                        <div class="iTagOption" :class="{ 'isActive': isType == 'text' }" @click="changeType('text')">文本类</div>
                        <div class="iTagOption" :class="{ 'isActive': isType == 'level' }" @click="changeType('level')">等级</div>
                        <div class="iTagOption" :class="{ 'isActive': isType == 'picture' }" @click="changeType('picture')">图片</div>
                    </div>
                </div>
                <div class="tagMakeList" v-show=" isType != 'text' ">
                    <div class="ilabel">时间类</div>
                    <div class="icontent">
                        <div class="iTagOption" :class="{ 'isActive': isTime == 'old' }" @click="changeTime('old')" >过去</div>
                        <div class="iTagOption" :class="{ 'isActive': isTime == 'now' }" @click="changeTime('now')" >当前</div>
                        <div class="iTagOption" :class="{ 'isActive': isTime == 'future' }" v-show="isType != 'picture' " @click="changeTime('future')" >未来</div>
                    </div>
                </div>
                <div class="tagMakeList" v-show="  isType != 'text' && isTime != 'now' ">
                    <div class="ilabel"></div>
                    <div class="radios">
                        <el-radio v-model="radio" label="1">1日</el-radio>
                        <el-radio v-model="radio" label="2">2日</el-radio>
                        <el-radio v-model="radio" label="3">3日</el-radio>
                        <el-radio v-model="radio" label="4">4日</el-radio>
                        <el-radio v-model="radio" label="5">5日</el-radio>
                        <el-radio v-model="radio" label="6">6日</el-radio>
                        <el-radio v-model="radio" label="7">7日</el-radio>
                    </div>
                </div>
                <div class="tagMakeList" v-show=" isType != 'text' ">
                    <div class="ilabel">要素类</div>
                    <div class="icontent">
                        <div class="iTagOption" :class="{ 'isActive': isFactor == 'tem' }" @click="changeFactor('tem')" >气温</div>
                        <div class="iTagOption" v-show="isTime != 'future'" :class="{ 'isActive': isFactor == 'pre_1h' }" @click="changeFactor('pre_1h')" >降水</div>
                        <div class="iTagOption" v-show="isTime != 'future'" :class="{ 'isActive': isFactor == 'win_s_avg_2mi' }" @click="changeFactor('win_s_avg_2mi')" >风速</div>
                        <div class="iTagOption" v-show="isTime != 'future'" :class="{ 'isActive': isFactor == 'rhu' }" @click="changeFactor('rhu')" >湿度</div>
                        <div class="iTagOption" v-show="isTime != 'future'" :class="{ 'isActive': isFactor == 'prs' }" @click="changeFactor('prs')" >气压</div>
                    </div>
                </div>
                <div class="tagMakeList">
                    <div class="ilabel">发布单位</div>
                    <div class="icontent">
                        <div class="blable">选择单位</div>
                        <el-select v-model="unitValue" size="small" placeholder="请选择">
                            <el-option
                            v-for="item in unitOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="textarea">
                <div class="ilabel">输入文本</div>
                <div class="icontent">
                    <el-input
                        type="textarea"
                        rows='11'
                        :disabled=" isType != 'text' "
                        resize='none'
                        placeholder="请输入内容"
                        v-model="textarea">
                    </el-input>
                </div>
            </div>
            <div class="makeBtn">
                <el-button type="primary" @click="toMakeTag" size="medium">制作</el-button>
            </div>
        </div>

        <div class="tabTitle">
            <div class="left">
                <div>标签列表</div>
                <div class="icon" @click="deleteSelected">
                    <i class="el-icon-delete"></i>
                </div>
            </div>
            <div class="right">
                <span>共计 <span style="padding: 0px 6px;color: #fff">{{total}}</span> 条</span>
                <span class="changePage" @click="topPage">上一页</span>
                <span style="color: #fff">{{ current }}</span>
                <span class="changePage" @click="nextPage">下一页</span>
            </div>
        </div>
        <div class="tagMakeTab">
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
                prop="title"
                label="标签标题">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="制作时间">
                </el-table-column>
                <el-table-column
                prop="typeName"
                label="标签类别">
                </el-table-column>
                <el-table-column
                prop="eleName"
                label="要素类">
                </el-table-column>
                <el-table-column
                prop="timeName"
                label="时间类">
                </el-table-column>
                <el-table-column
                prop="orgName"
                label="发布单位">
                </el-table-column>
                
                <el-table-column
                prop="address"
                label="操作">
                    <template slot-scope="scope">
                        <!-- <div class="handleIconBox"><i class="el-icon-edit" @click="edit_this( scope.row.id )" ></i></div> -->
                        <div class="handleIconBox"><i class="el-icon-delete"  @click="del_this( scope.row.id )" ></i></div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    name: 'TagMake',
    props: {

    },
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
    //这里存放数据
        return {
            tagTitle: '',
            diyTagName: '',
            radio: '1',
            unitValue: '',
            unitOptions: [
                {
                    value: '选项1',
                    label: '气象局'
                }, 
                {
                    value: '选项2',
                    label: '水利局'
                },
                {
                    value: '选项3',
                    label: '交通局'
                },
            ],
            textarea: '',
            tableData: [
                
            ],
            isType: 'num',
            isFactor: 'tem',
            isTime: 'old',
            typeName: '数值类',
            factorName: '气温',
            timeName: '过去',
            diyTagContent: '',
            loading: null,
            current: 1,
            pageSize: 10,
            total: 0,
            selectedArr: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        edit_this(ele){
            
        },
        del_this(ele){
            
        },
        handleSelectionChange(val) {
            let arr = [];
            for( let i = 0;i<val.length;i++ ){
                arr.push( val[i].id )
            }
            this.selectedArr = arr;
        },
        getLabel(){
            let api = '/api/dict/labelContent';
            this.$axios.get(api,{
                params:{
                    current: 1,
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
        },
        topPage(){
            let api = '/api/dict/labelContent';
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
            let api = '/api/dict/labelContent';

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

        // 改变类型
        changeType(val){
            this.isType = val
            if( val == 'num' ){
                this.typeName = '数值类'
            }
            if( val == 'text' ){
                this.typeName = '文本类'
            }
            if( val == 'level' ){
                this.typeName = '等级'
            }
            if( val == 'picture' ){
                this.typeName = '图片类';
                this.isTime = 'old'
            }

        },
        // 改变要素
        changeFactor(val){
            this.isFactor = val
            if( val == 'tem' ){
                this.factorName = '气温'
            }
            if( val == 'pre_1h' ){
                this.factorName = '降水'
            }
            if( val == 'win_s_avg_2mi' ){
                this.factorName = '风速'
            }
            if( val == 'rhu' ){
                this.factorName = '湿度'
            }
            if( val == 'prs' ){
                this.factorName = '气压'
            }
        },
        // 改变时间
        changeTime(val){
            this.isTime = val;
            if( val == 'future' ){
                this.timeName = '未来'
                this.isFactor = 'tem';
                this.factorName = '气温';
            }
            if( val == 'now' ){
                this.timeName = '现在'
            }
            if( val == 'old' ){
                this.timeName = '过去'
            }
        },

        // 默认标签名
        makeTagName(){
            if( this.isTime == 'now'){
                this.diyTagContent = this.isType + '-' + this.isTime + '-'  + this.isFactor;
                this.diyTagName = this.timeName+this.factorName
            }else{
                this.diyTagContent = this.isType + '-' + this.isTime + '-' + this.radio+ '-' + this.isFactor;
                this.diyTagName = this.timeName+this.radio+'天'+this.factorName
            }
            
        },

        toMakeTag(){
            let api = '/api/dict/labelContent';
            
            this.makeTagName();
            this.upLoading();
            
            if(this.isType == 'text' && this.tagTitle == '' ){
                this.$message({
                    message: '请输入标签标题！',
                    type: 'warning'
                });

                return;
            }
            let params ={};

            
            let aTitle = ''
            if( this.tagTitle == ''){
                aTitle = this.diyTagName
            }else{
                aTitle = this.tagTitle
            }
            if( this.isType == 'text' ){
                params={
                    title: this.tagTitle,
                    contentValue: 'text',
                    textContent: this.textarea,
                    typeName: this.typeName,
                    typeValue: this.isType,
                    
                    orgName: '',
                    orgValue: '',
                    areaCode: '',
                    
                }

            }else{
                params={
                    title: aTitle,
                    contentValue: '[#' + this.diyTagContent + '#]' ,
                    
                    typeName: this.typeName,
                    typeValue: this.isType,
                    eleName: this.factorName,
                    eleValue: this.isFactor,
                    timeName: this.timeName,
                    timeValue: this.isTime,

                    orgName: '',
                    orgValue: '',
                    areaCode: '',
                    
                }


            }
            this.$axios.post(api,params)
            .then((res)=>{
                
                this.loading.close();
                
                this.$message({
                    message: '标签制作成功！',
                    type: 'success'
                });
                this.aTitle = '';
                this.textarea = '';
                this.getLabel();
            })
            .catch((err)=>{})







        },

        upLoading(){
            this.loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
            });
        },
        // 删除
        deleteSelected(){
            let api = '/api/dict/labelContent';
            if( this.selectedArr.length > 0 ){
                this.$axios.delete(api,{
                    data: this.selectedArr
                }).then(( res )=>{
                    if( res.data.status == 200 ){
                        this.$message({
                            type: 'success',
                            message:'删除成功！'
                        });
                        this.getLabel();
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
                let api = '/api/dict/labelContent';
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
                        this.getLabel();
                        // this.currentPage = 1;
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

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getLabel();
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
    .tagMakeBox{
        background: #011C3A;
        border-radius: 6px;
        margin: 10px 0;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        min-width: 690px;
        .tagMakeDeta{
            .tagMakeList{
                display: flex;
                margin: 10px 0;
                align-items: center;
                height: 40px;
                .ilabel{
                    width: 120px;
                    color: #94BDE6;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    font-size: 16px;
                    .subtitle{
                        font-size: 12px;
                        color: #898AA7;
                    }
                }
                .icontent{
                    display: flex;
                    justify-content: center;
                    .iTagOption{
                        width: 80px;
                        height: 30px;
                        line-height: 30px;
                        font-size: 14px;
                        background: #041931;
                        text-align: center;
                        border: 1px solid #3B4B61;
                        margin: 0 20px 0 0;
                        color: #898AA7;
                        &:hover{
                            cursor: pointer;
                        }
                    }
                    .isActive{
                        background: #1571FA;
                        color: #fff;
                    }
                    .radios{
                        display: flex;
                        align-items: center;
                    }
                    .blable{
                        width: 100px;
                        font-size: 12px;
                        height: 30px;
                        line-height: 30px;
                        color: #898AA7;
                    }
                    .Disable{
                        &:hover{
                            cursor: not-allowed;
                        }
                    }
                }
            }
        }
        .textarea{
            display: flex;
            font-size: 16px;
            color: #898AA7;
            margin-top: 70px;
            .ilabel{
                width: 100px;
            }
            .icontent{

            }
        }
        .makeBtn{
            display: flex;
            align-items: flex-end;
            margin: 0 20px;
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
                color: firebrick;
                &:hover{
                    cursor: pointer;
                }
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
    .tagMakeTab{
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
        background-color: #011C3A;
        margin: 0 auto;
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