<script setup>

import { serversGetServerice, serversStartServerice, serversCloseServerice, serversConnectServerice, serversDisconnectServerice, serversGetoneServerice } from '@/api/server.js'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { fileGetServerice, fileGetContentServerice, filePutContentServerice, fileDelServerice, fileNewServerice } from '@/api/file';
import { BotGetoneService } from '@/api/bot';
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore()
import {
    SemiSelect,
    VideoPause,
    VideoPlay,
    Delete,
    Edit,
    Folder,
    Document,
    Connection,
    Loading,
    Plus,
    EditPen
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';


const store = useStore();
const router = useRouter();
const categorys = ref([

])
const tableData = ref([

])
//调用函数获得实例数据
const serversGet = async () => {
    let result = await serversGetServerice();
    categorys.value = result.data;
    console.log(categorys)
}
//调用函数获得实例数据
const serversGetone = async () => {
    let result = await serversGetoneServerice(nowfile.value);
    nowfile.value = result.data
    console.log("xxxxxxxxxxxxxxxx" + nowfile.value.ifon)
}
const fileGet = async () => {
    let result = await fileGetServerice(fileGetData.value);
    tableData.value = result.data;
}
const fileGetData = ref(
    {
        path: '',
    }
)
const nowfile = ref({
    qq: '',
    nickname: '',
    ifon: 0,
    name: '',
    qqgroup: '',
    ifconnect: ''
})
const qq = ref('')
//获取机器人账号
const getbot = async () => {
    let result = await BotGetoneService();
    qq.value = result.data;
}
getbot();
// 控制弹窗可见性的响应式变量
const dialogVisible = ref(false);
// 文本编辑器内容
const editorContent = ref('');
//点击文件夹
const handleClick = (n) => {
    fileGetData.value.path = n;
    fileGet();
};
function file(n) {
    fileGetData.value.path = n;
    console.log(n)
    console.log(fileGetData.value.path)
    fileGet();
    ifshowserverbool.value = false
    ifshowfilebool.value = true
}
serversGet();
const ifshowserverbool = ref(true)
const ifshowfilebool = ref(false)
const ifshowpanelbool = ref(false)
const ifedit = (value) => {
    if (value === "目录") {
        return true
    }
    else return false
}
const ifline = (value) => {
    if (value === "目录") {
        return 'underline'
    }
    else return 'notunderline'
}
const fileGetContentData = ref(
    {
        path: '',
    }
)
const filePutContentData = ref(
    {
        path: '',
        content: ''
    }
)
const fileDelData = ref(
    {
        path: ''
    }
)
// 打开弹窗并加载文件内容
const openDialog = async (n) => {
    fileGetContentData.value.path = n;
    let result = await fileGetContentServerice(fileGetContentData.value);
    editorContent.value = result.data
    console.log(editorContent.value)
    dialogVisible.value = true;
};
//保存文件
const handleSave = async () => {
    filePutContentData.value.path = fileGetContentData.value.path;
    filePutContentData.value.content = editorContent.value
    await filePutContentServerice(filePutContentData.value)
    ElMessage.success('已保存');
    dialogVisible.value = false;
}
//正在运行/未运行
const ifonline = (n) => {
    console.log("dddddddddddddddd:" + n)
    if (n === true) {
        return true
    }
    else return false
}
//跳转至面板界面
const panel = (n) => {
    serversGet();
    nowfile.value.nickname = n.nickname;
    nowfile.value.ifon = n.ifon;
    nowfile.value.name = n.name;
    nowfile.value.ifconnect = n.ifconnect;
    ifshowpanelbool.value = true;
    ifshowfilebool.value = false;
    ifshowserverbool.value = false;
}
//开启实例函数
const startconfirmEvent = async () => {
    xunhuan(2);
    await serversStartServerice(nowfile.value);
    ElMessage.success('正在开启');
}
//关闭实例函数
const closeconfirmEvent = async () => {
    xunhuan(0);
    await serversCloseServerice(nowfile.value);
    ElMessage.success('正在关闭');
}
//连接机器人
const connectEvent = async () => {
    nowfile.value.qq = qq.value
    await serversConnectServerice(nowfile.value);
    ElMessage.success('已连接机器人');
    serversGetone();
}
//断开机器人
const disconnectEvent = async () => {
    await serversDisconnectServerice(nowfile.value);
    ElMessage.success('已断开机器人');
    serversGetone();
}
//开启后的循环请求
const xunhuan = async (x) => {
    while (nowfile.value.ifon !== x) {
        serversGetone();
        console.log("sss")
        //两秒请求一次
        await sleep(2000)
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//删除文件
const delfile = async (x) => {
    fileDelData.value.path = x
    let result = await fileDelServerice(fileDelData.value)
    ElMessage.success(result.data)
    fileGet();
}
//上传成功提示
const cao = () => {
    fileGet();
    ElMessage.success("上传成功")
}
const ifshownew = ref(false)
const newfileData = ref({
    num: '',
    name: '',
    path:''
})
//新建文件/文件夹
const newfile = async() => {
    newfileData.value.path = fileGetData.value.path;
    console.log("4545454545455"+newfileData.value.path)
    let result =  await fileNewServerice(newfileData.value);
    ElMessage.success(result.data);
    fileGet();
    ifshownew.value = false;
}


</script>

<template>

    <!--编辑界面-->
    <el-dialog :draggable="true" title="文件编辑器" v-model="dialogVisible" width="50%">
        <textarea v-model="editorContent" class="text-editor"></textarea>
        <template #footer>
            <el-button @click="dialogVisible = false, fileGetContentData.path = ''">取 消</el-button>
            <el-button type="primary" @click="handleSave">保 存</el-button>
        </template>
    </el-dialog>
    <!--文件/文件夹命名-->
    <el-dialog :draggable="false" title="新文件/文件夹名" v-model="ifshownew" width="20%">
        <el-input v-model="newfileData.name"> </el-input>
        <template #footer>
            <el-button @click="ifshownew = false, fileGetContentData.path = ''">取消</el-button>
            <el-button type="primary" @click="newfile">确定</el-button>
        </template>
    </el-dialog>


    <!--展示服务端实例的界面-->
    <el-card class="headcard" v-if="ifshowserverbool">
        <div class="headtext">
            <el-text tag="b">服务端实例</el-text>
        </div>
    </el-card>
    <el-space wrap v-if="ifshowserverbool">
        <el-button v-for="n in categorys" :key="n.name" class="server" @click="panel(n)">
            <div>
                <div><el-text tag="b" class="serverheadtext">{{ n.nickname }}</el-text> </div>
                <div><el-divider border-style="dashed" class="linee" /></div>
                <div v-if="n.ifon === 2" class="statustext"><el-text tag="b" class="statustext">状态:</el-text>
                    <el-text wrap type="success">正在运行</el-text>
                </div>
                <div v-else-if="n.ifon === 0" class="statustext"><el-text tag="b" class="statustext">状态:</el-text>
                    <el-text type="info" style="font-weight: 400;">未运行</el-text>
                </div>
                <div v-else-if="n.ifon === 1" class="statustext"><el-text tag="b" class="statustext">状态:</el-text>
                    <el-text type="warning" style="font-weight: 400;">启动中</el-text>
                </div>
                <div v-else-if="n.ifon === 3" class="statustext"><el-text tag="b" class="statustext">状态:</el-text>
                    <el-text type="warning" style="font-weight: 400;">关闭中</el-text>
                </div>
            </div>
            <div class="serverbutton"><el-button type="primary" @click="file(n.name)">文件管理</el-button></div>
        </el-button>
    </el-space>
    <!--文件管理的界面-->
    <el-card v-else-if="ifshowfilebool">
        <template #header>
            <div class="cardheader">
                <span>文件管理</span>
            </div>
        </template>
        <el-card class="top">
            <div class="toptext">
                <el-text style="font-weight:bold ;" :underline="false">
                    当前目录地址: {{ fileGetData.path }}
                </el-text>
                <!--上传-->
            </div>

        </el-card>
        <el-upload class="upload" action="/api/upload" name="file" :limit="1"
            :headers="{ 'Authorization': tokenStore.token }" :data="fileGetData" :on-success="cao"
            style="width: 300px;">
            <el-button style="margin-top: 15px" type="success"><el-icon>
                    <Plus />
                </el-icon>上传文件</el-button>
            <template #tip>
                <div class="el-upload__tip">
                    上传文件至当前目录
                </div>
            </template>
        </el-upload>
        <el-button style="margin-top: 15px;" type="primary" plain @click="ifshownew = true, newfileData.num = 0"><el-icon>
                <Plus />
            </el-icon>新建文件</el-button>
        <el-button style="margin-top: 15px" type="primary" plain @click="ifshownew = true, newfileData.num = 1"><el-icon>
                <Plus />
            </el-icon>新建目录</el-button>
        <el-table :data="tableData" stripe style="width: 100%">

            <el-table-column prop="name" label="名称"> <template #default="{ row }">

                    <el-icon v-if="ifedit(row.isDirectory)">
                        <Folder />
                    </el-icon>
                    <el-icon v-else>
                        <document />
                    </el-icon>
                    <el-link v-if="ifedit(row.isDirectory)" :underline="false" :class="ifline(row.isDirectory)"
                        @click.prevent="handleClick(row.path)">{{
                            row.name }}</el-link>
                    <el-text v-else :class="ifline(row.isDirectory)"> {{ row.name }} </el-text>
                </template>
            </el-table-column>

            <el-table-column prop="isDirectory" label="文件类型" width="200" :style="ifline(isDirectory)" />
            <el-table-column prop="size" label="文件大小" width="200" />
            <el-table-column prop="isDirectory" label="操作" width="500">
                <template #default="{ row }">
                    <el-row>
                        <el-button :disabled="ifedit(row.isDirectory)" type="primary" :icon="Edit" plain
                            @click="openDialog(row.path)" />
                        <el-popconfirm width="200" confirm-button-text="Yes" cancel-button-text="No"
                            title="确定删除该文件/文件夹吗?" @confirm="delfile(row.path)">
                            <template #reference>
                                <el-button type="danger" :icon="Delete" plain />
                            </template>
                        </el-popconfirm>
                    </el-row>

                </template>


            </el-table-column>
        </el-table>
    </el-card>
    <!--面板的内容-->
    <el-space v-else wrap>
        <!--panel1-->
        <el-card class="panel1">
            <div style="display: flex;"><el-card class="semiicon"></el-card><el-text
                    style="font-weight: 600;color: black;">
                    基本信息<br></el-text></div>
            <div class="paneltext"><el-text>名称:{{ nowfile.nickname }}</el-text></div>
            <div class="paneltext" v-if="nowfile.ifon === 2">
                <el-text>状态:</el-text>
                <el-text wrap type="success">正在运行</el-text>
            </div>
            <div v-else-if="nowfile.ifon === 0" class="paneltext">
                <el-text>状态:</el-text>
                <el-text type="info" style="font-weight: 400;">未运行</el-text>
            </div>
            <div v-else-if="nowfile.ifon === 1" class="paneltext">
                <el-text>状态:</el-text>
                <el-text type="info" style="font-weight: 400;">启动中</el-text>
            </div>
            <div v-else-if="nowfile.ifon === 3" class="paneltext">
                <el-text>状态:</el-text>
                <el-text type="info" style="font-weight: 400;">关闭中</el-text>
            </div>
            <div class="paneltext"><el-text style="width: 150px;">机器人qq账号:</el-text>
                <el-input v-if="qq !== null" v-model="qq" disabled></el-input>
                <el-text v-else type="error">机器人未登录</el-text>
            </div>
            <div class="paneltext"><el-text style="width: 150px;">互联的qq群:</el-text>
                <el-input v-model="nowfile.qqgroup" placeholder="在此输入需要互联的qq群号"></el-input>
            </div>
            <div class="text2"> <el-text type="info" style="font-size: 13px;"> <br>Tips:只有在实例已开启的情况下才能连接机器人 </el-text>
            </div>
            <div></div>
        </el-card>

        <!--pannel2-->
        <el-card class="panel2">
            <div style="display: flex;"><el-card class="semiicon"></el-card><el-text
                    style="font-weight: 600;color: black;">
                    基本操作<br></el-text></div>
            <!--已经开启或者正在关闭-->
            <div v-if="nowfile.ifon === 2 | nowfile.ifon === 3">
                <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled" icon-color="#626AEF"
                    title="确定关闭实例吗?" @confirm="closeconfirmEvent">
                    <template #reference>
                        <el-button :disabled="nowfile.ifon === 3" class="closebutton"
                            style="width: 500px;margin-top: 10px;">
                            <el-icon v-if="nowfile.ifon === 2">
                                <VideoPause />
                            </el-icon>
                            <el-icon v-else class="is-loading">
                                <Loading />
                            </el-icon>
                            关闭实例
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
            <!--已经关闭或者正在开启-->
            <div v-else-if="nowfile.ifon === 0 | nowfile.ifon === 1">
                <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled" icon-color="#626AEF"
                    title="确定开启实例吗?" @confirm="startconfirmEvent">
                    <template #reference>
                        <el-button :disabled="nowfile.ifon === 1" class="startbutton"
                            style="width: 500px;margin-top: 10px;">
                            <el-icon v-if="nowfile.ifon === 0">
                                <VideoPlay />
                            </el-icon>
                            <el-icon v-else class="is-loading">
                                <Loading />
                            </el-icon>
                            开启实例
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
            <!--连接机器人-->
            <div> <el-popconfirm v-if="nowfile.ifconnect === 0" confirm-button-text="Yes" cancel-button-text="No"
                    :icon="InfoFilled" icon-color="#626AEF" title="确定连接机器人吗?" @confirm="connectEvent">
                    <template #reference>
                        <el-button
                            :disabled="!(nowfile.ifon === 2 && nowfile.ifconnect === 0 && qq !== '' && nowfile.qqgroup !== '')"
                            class="startbutton" style="width: 500px;margin-top: 10px;">
                            <el-icon>
                                <Connection />
                            </el-icon>
                            连接机器人
                        </el-button> </template></el-popconfirm>
                <el-popconfirm v-else confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled"
                    icon-color="#626AEF" title="确定断开机器人吗?" @confirm="disconnectEvent">
                    <template #reference>
                        <el-button :disabled="!(nowfile.ifconnect === 2)" class="closebutton"
                            style="width: 500px;margin-top: 10px;">
                            <el-icon>
                                <Connection />
                            </el-icon>
                            断开机器人
                        </el-button> </template></el-popconfirm>
            </div>
        </el-card>
    </el-space>

    <!--面板的内容-->
</template>

<style>
.headtext {
    margin-top: -9px;
}

.headcard {
    height: 45px;
    margin-left: 20px;
}

.server {
    width: 300px;
    margin: 20px;
    height: 200px;
    /* border: 5px, black, solid; */
}

.statustext {
    margin-left: 0;
    margin-top: -20px;
    /* border: 5px, solid, rgb(77, 30, 206); */
}

.serverbutton {
    margin-top: 100px;
    margin-left: -80px;
}

.underline {
    text-decoration: underline;
}

.notunerline {
    text-decoration: none;
}

.top {
    height: 30px;
}

.toptext {
    /* border: 5px, black, solid; */
    margin-top: -17px;
}

.cardheader {
    margin-top: 6px
}

.text-editor {
    white-space: normal;
    /* 允许文本换行 */
    width: 100%;
    height: 300px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: Arial, sans-serif;
}

.serverheadtext {
    /* border: 5px, black, solid; */
    padding-bottom: 0px;
}

.linee {
    margin-top: 5px;
    margin-bottom: 25px;
    /* border: 5px, black, solid; */
}

.paneltext {
    font-weight: 400;
    color: black;
    font-size: 13px;
    /* border: 3px,solid,black; */
    margin-top: 15px;
    display: flex;
}

.panel1 {
    width: 400px;
}

.closebutton {
    border-color: #edbcab;
    background-color: #fbeff0;
    color: #FF6A6A
}

.closebutton:hover {
    background-color: #FF6A6A;
    color: white;
    /* 初始文字颜色 */
    transition: background-color 0.3s, color 0.3s;
    /* 平滑过渡 */
}

.startbutton {
    border-color: #FFD700;
    color: #debc4f;
    background-color: #fef1e0
}

.startbutton:hover {
    border-color: #fef1e0;
    color: white;
    background-color: #EEB422
}

.semiicon {
    margin-top: 3px;
    margin-right: 5px;
    /* border: #6494e8, solid, 1px; */
    background-color: #6494e8;
    font-size: 100px;
    height: 14px;
    width: 5px;
}
</style>