<script setup>
import { ref } from 'vue';
import { BotGetoneService, BotLoginService, BotPicService, BotLogoutService,BotListenService } from '@/api/bot';
import { VideoPause, VideoPlay, Loading,Refresh } from '@element-plus/icons-vue'
import { useTokenStore } from '@/stores/token.js'
import { ElMessage } from 'element-plus';
//获得bot信息
const botGet = async () => {
    let result = await BotGetoneService();
    botinfo.value.qq = result.data;
    if (result.data !== null) botinfo.value.status = 2;
    console.log(result.data)
}
const base64info = ref('')
const tokenStore = useTokenStore();
//bot状态
const botinfo = ref({
    qq: '',
    status: 0
})
//传给后端的QQ号
const botData = ref({
    qq: '',
})
//qr
const ifshowqr = ref(false)
//开始登录
const loginbot = async () => {
    console.log(botData.value.qq)
    //开始登录
    botinfo.value.status = 1;
    let result = await BotLoginService(botData.value);
    if (result.data === "之前已登录") {
        ElMessage.success("已自动登录")
        botGet();
    }
    else {
        ifshowqr.value = true;
        ElMessage.success("已获取二维码,请扫码登录")
        getpic();
        console.log("码为:"+base64info.value)
        let result = await BotListenService();
        if (result.data==="登录成功"){
            ElMessage.success('登录成功')
            botGet();
        }
        else if(result.data=="超时或者已取消登录"){
            ElMessage.error('超时或者已取消登录,请重新登录')
            botGet();
            ifshowqr.value=0;
            botinfo.value.status=0;
        }
    }
}
const logoutbot = async () => {
    //开始退出
    botinfo.value.status = 1;
    let result = await BotLogoutService();
    ElMessage.success('已退出登录')
    botinfo.value.status=0
    botGet();
}
//图片
const transpic = async () => {
    let result = await BotPicService();
    console.log("tranpic"+result.data);
    base64info.value = result.data
    console.log("tranpic"+base64info.value);
}
//transpic();
//要发送

botGet();
//获得图片的base64编码
const getpic = async () => {
    let result = await BotPicService();
    base64info.value = result.data
    console.log("getpic"+base64info.value); 
}
//监听
const startlisten = async () => {
    let result = await BotListenService();
    
    console.log("getpic"+base64info.value); 
}



</script>

<template>
    <el-card class="headcard">
        <div class="headtext">
            <el-text tag="b">机器人</el-text>
        </div>
    </el-card>
    <!--内容-->
    <el-card class="botcard" style="margin: 20px;width: 1000px;">
        <el-card class="semiicon" style="margin-bottom: -20px;"></el-card>
        <el-descriptions title="当前机器人信息" style="margin-left: 10px;border: 1px,black;">
            <el-descriptions-item label="状态:">
                <el-text v-if="botinfo.qq !== null" type="success"> 在线 </el-text>
                <el-text v-else> 离线 </el-text>
            </el-descriptions-item>
            <el-descriptions-item label="qq账号:">
                <el-input v-if="botinfo.qq !== null" disabled v-model="botinfo.qq"></el-input>
                <el-input v-else v-model="botData.qq" placeholder="在此输入需要登录的机器人账号"></el-input>
            </el-descriptions-item>

        </el-descriptions>
    </el-card>
    <el-card style="margin-left: 20px;width: 1000px;">
        <div style="display: flex;"><el-card class="semiicon"></el-card>
            <el-text style="font-weight: 600;color: black;">基本操作<br></el-text>
        </div>
        <div v-if="botinfo.qq === null">
            <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled" icon-color="#626AEF"
                title="确定登录机器人吗?" @confirm="loginbot">
                <template #reference>
                    <el-button v-if="botinfo.status === 0" class="startbutton"
                        :disabled="!(botData.qq.length >= 5 && botData.qq.length <= 12)"
                        style="width: 500px;margin-top: 10px;">
                        <el-icon>
                            <VideoPlay />
                        </el-icon>
                        登录机器人
                    </el-button>
                    <el-button v-if="botinfo.status === 1" class="startbutton"
                        :disabled="!(botData.qq.length >= 5 && botData.qq.length <= 12)"
                        style="width: 500px;margin-top: 10px;">
                        <el-icon class="is-loading">
                            <Loading />
                        </el-icon>
                        获取二维码中
                    </el-button>
                </template>
            </el-popconfirm>
        </div>
        <div v-else>
            <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled" icon-color="#626AEF"
                title="确定退出机器人吗?" @confirm="logoutbot">
                <template #reference>
                    <el-button class="closebutton" :disabled="botinfo.qq === null"
                        style="width: 500px;margin-top: 10px;">
                        <el-icon>
                            <VideoPause />
                        </el-icon>
                        退出登录机器人
                    </el-button>
                </template>
            </el-popconfirm>
        </div>
    </el-card>

    <el-card v-if="ifshowqr" style="margin-left: 20px;display: flex;width: 1000px;">
        <div style="display: flex;"><el-card class="semiicon"></el-card>
            <el-text style="font-weight: 600;color: black;">扫描二维码登录<br></el-text>
        </div>
        <img style="margin-left: 200px;" :src="'data:image/png;base64,' + base64info" height="250px">
        <el-button @click="getpic"><el-icon><Refresh /></el-icon></el-button>
    </el-card>

</template>


<style>
.headtext {
    margin-top: -9px;
}

.headcard {
    height: 45px;
    margin-left: 20px;
}

</style>