<script setup>
import { fileUploadzipServerice } from '@/api/file';
import { ref } from 'vue';
import { useTokenStore } from '@/stores/token';
//token
const tokenStore = useTokenStore()
//显不显示上传页面的常数
const ifshowbutton = ref(true)
//上传zip的函数
const uploadzip = async () => {
    ifshowbutton.value = false

}
//上传zip的参数
const fileUploadzipData = ref(
    {
        cmd: '',
        nickname: ''
    }
)
//规则
const rules1 = {
    nickname: [
        {required: true, message: '请输入实例名', trigger: 'blur' },
],
    cmd:[
        { required:true,message:'请输入启动命令',trigger:'blur' },
    ]
}
//按钮是否能点
const ifdisabled = ()=>{
if(fileUploadzipData.value.cmd!==''&&fileUploadzipData.value.nickname!==''){
    return false;
}
else return true;
}
</script>

<template>
    <el-card class="headcard">
        <div class="headtext">
            <el-text tag="b">上传服务端zip文件</el-text>
        </div>
    </el-card>

    <div v-if="ifshowbutton" class="uploadb1">
        <el-button class="button1" @click="uploadzip"><el-text tag="b">上传zip文件<br><br>上传后自动解压</el-text>
        </el-button>
    </div>

    <div v-else class="uploadb">
        <el-form ref="form"  class="uploadform" :model="fileUploadzipData" :rules="rules1">
            <el-card class="uploadbutton">
            <!--头部区域-->
            <template #header>
                <div class="uploadheader">
                    <el-text tag="b">设置参数</el-text>
                </div>
            </template>
            <div class="text1"> <el-text style="font-size: 14px;font-weight: 400;"> 实例名称<br></el-text></div>
            <div class="text2"> <el-text type="info" style="font-size: 13px;"> 支持中文,尽量唯一 </el-text></div>
            <el-form-item prop="nickname"><div class="input1" > <el-input name="nickname" v-model="fileUploadzipData.nickname" style="height: 40px;width: 800px;" placeholder="输入实例名,保持唯一"> </el-input></div></el-form-item>
            <div class="text1"> <el-text style="font-size: 14px;font-weight: 400;">启动命令<br></el-text></div>
            <div class="text2"> <el-text type="info" style="font-size: 13px;"> 如:java -jar xxxxx.jar 
            </el-text></div>
            <el-form-item prop="cmd"><div class="input1"> <el-input v-model="fileUploadzipData.cmd" style="height: 40px;width: 800px;" placeholder="输入服务端的启动命令"> </el-input></div></el-form-item>
            <div class="text1"> <el-text style="font-size: 14px;font-weight: 400;">上传服务端压缩包<br></el-text></div>
            <div class="text2"> <el-text type="info" style="font-size: 13px;"> 仅支持zip格式 </el-text></div>


            <el-upload v-model:file-list="fileList" class="upload-demo" accept=".zip"
                action="/api/zipupload" :on-preview="handlePreview"
                name="zipfile"
                :on-remove="handleRemove" 
                :before-remove="beforeRemove" 
                :limit="1" 
                :on-exceed="handleExceed"
                :headers="{'Authorization':tokenStore.token}"
                :on-success="uploadSuccess"
                :data="fileUploadzipData"
                >
                
                <el-button type="primary" :disabled="ifdisabled()" >点击上传</el-button>
                <template #tip>
                    <div class="el-upload__tip">
                        上传文件后实例将自动创建并解压文件，可能需要一段时间才能完成解压任务<br>
                        注:不同版本的minecraft服务端运行的java版本不同,如果需要指定java版本需要将启动命令前面的java替换成java路径,如:<br>"C:\\Program Files\\Java\\jdk1.8.0_202\\bin\\java.exe" -Xms1G -Xmx4G -jar forge-1.16.5-36.2.34.jar nogui pause
                    </div>
                </template>
            </el-upload>
</el-card>
        </el-form>
    </div>



    <el-upload />

</template>


<style>
.headtext {
    margin-top: -9px;
}

/* .headcard {
    height: 45px;
    margin-left: 20px;
} */

.button1 {
    margin-left: 20px;
    margin-top: 50px;
    font-size: 18px;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    height: 150px;
    /* 修改背景色 */
    background-color: #ffffff;

    /* 修改文本颜色 */
    color: rgb(0, 0, 0);

    /* 添加阴影 */
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);

    /* 添加过渡效果 */
    transition: background-color 0.3s ease;
}

.uploadbutton {
    margin-top: 50px;
    font-size: 18px;
    padding: 20px;
    border-radius: 10px;
    width: 900px;
    height: 500px;
}

.uploadb {
    display: flex;
    justify-content: center;
    /* 水平居中 */
}

.uploadb1 {
    display: flex;
    justify-content: center;
}

.uploadheader {
    margin-top: -20px;
}


.text2 {
    margin-top: -5px;
}

.input1 {
    margin-top: 10px;
}

.upload-demo {
    margin-top: 10px
}
.uploadform{
    display: flex;
    justify-content: center;
}
</style>