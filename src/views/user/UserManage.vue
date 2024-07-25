<script setup>
import { userGetServerice, userDelService, userRegisterServerice, userResetService } from '@/api/user';
import { userInfoStore } from '@/stores/token';
import { ref } from 'vue';
import { Plus, User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { useTokenStore } from '@/stores/token';
const t = useTokenStore();
//选中的对象
const newData = ref({
    username: '',
    password: ''
})
const multipleSelection = ref([])
const realmultipleSelection = ref([

])
const handleSelectionChange = (val) => {
    realmultipleSelection.value = val;
    for (let i = 0; i < val.length; i++) {
        multipleSelection.value[i] = val[i].id
    }
   multipleSelection.value.length=val.length
}
const userinfo = userInfoStore();
const usertableData = ref([])
const getall = async () => {
    let result = await userGetServerice();
    usertableData.value = result.data;
}
getall();

const delEvent = async () => {
    let result = await userDelService(multipleSelection.value)
    ElMessage.success(result.data);
    getall();
}
//是否展示新建弹窗的
const ifshowuser = ref(false);
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5-16位非空字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5-16位非空字符', trigger: 'blur' }
    ],
    forpassword: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5-16位非空字符', trigger: 'blur' }
    ],
}

const register = async () => {
    let result = await userRegisterServerice(newData.value);
    //alert(result.msg ? result.msg : '注册成功'); 
    ElMessage.success(result.message ? result.message : '注册成功');
    ifshowuser.value = false;
    getall();

}
//是否展示重新设定密码
const ifreset = ref(false)
const resetData = ref({
    username: '',
    password: ''
})
const forpassword = ref();
const reset = async () => {

    if (userinfo.info === '666666') {
        if (realmultipleSelection.value[0].password.length >= 5 && realmultipleSelection.value[0].password.length <= 16) {
            resetData.value.username = realmultipleSelection.value[0].username;
            resetData.value.password = realmultipleSelection.value[0].password;
            let result = await userResetService(resetData.value);
            //alert(result.msg ? result.msg : '注册成功'); 
            ElMessage.success(result.message ? result.message : '修改成功66');
            ifreset.value = false;
            getall();
        }

    }
    //加个判断
    else {
        if (forpassword.value === realmultipleSelection.value[0].password) {
            resetData.value.username = realmultipleSelection.value[0].username;
            if (resetData.value.password === null)
                resetData.value.password = realmultipleSelection.value[0].password;
            if (resetData.value.password.length >= 5 && resetData.value.password.length <= 16) {
                let result = await userResetService(resetData.value);
                //alert(result.msg ? result.msg : '注册成功'); 
                ElMessage.success(result.message ? result.message : '修改成功000');
                ifreset.value = false;
                getall();
                forpassword = null;
            }
            else {
                ElMessage.error("新密码必须是5-16位!");
            }

        }
        else {
            ElMessage.error("原密码错误!");
        }
    }


}
//退出登录
const relogin = ()=>{
t.removeToken();
getall();
}

</script>

<template>
    <!--注册弹窗-->
    <el-dialog :draggable="false" title="新建管理员账号" v-model="ifshowuser" width="50%">
        <!-- 注册表单 -->
        <el-form size="large" autocomplete="off" :rules="rules" :model="newData">
            <el-form-item>
                <h1>注册</h1>
            </el-form-item>
            <el-form-item prop="username">
                <el-input v-model=newData.username :prefix-icon="User" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model=newData.password :prefix-icon="Lock" placeholder="请输入密码"></el-input>
            </el-form-item>

        </el-form>
        <template #footer>
            <el-button @click="ifshowuser = false">取消</el-button>
            <el-button type="primary" @click="register">确定</el-button>
        </template>
    </el-dialog>


    <!--重设密码弹窗-->
    <el-dialog :draggable="false" title="重设密码" v-model="ifreset" width="50%">
        <!-- 注册表单 -->
        <el-form size="large" autocomplete="off" :rules="rules" :model="realmultipleSelection[0]">

            <el-form-item prop="username">
                <el-input v-if="realmultipleSelection.length > 0" v-model=realmultipleSelection[0].username
                    :prefix-icon="User" disabled></el-input>
            </el-form-item>
            <!--管理员界面-->
            <el-form-item prop="password" v-if="userinfo.info === '666666'">
                <el-input v-if="realmultipleSelection.length > 0" v-model=realmultipleSelection[0].password
                    :prefix-icon="Lock"></el-input>
            </el-form-item>
            <!--普通管理员界面-->
            <div v-else>
                <el-form-item>
                    <el-input v-if="realmultipleSelection.length > 0" v-model=forpassword :prefix-icon="Lock"
                        placeholder="请输入原密码"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-if="realmultipleSelection.length > 0" v-model=resetData.password :prefix-icon="Lock"
                        placeholder="请输入新密码"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <template #footer>
            <el-button @click="ifreset = false">取消</el-button>
            <el-button type="primary" @click="reset">确定</el-button>
        </template>
    </el-dialog>


    <el-card class="headcard">
        <div class="headtext">
            <el-text tag="b">管理员管理</el-text>
        </div>
    </el-card>

    <el-card style="margin: 20px">
        <!--新建管理员-->
        <el-button v-show="userinfo.info === '666666'" style="margin-top: 15px;" type="primary" plain
            @click="ifshowuser = true">
            <el-icon>
                <Plus />
            </el-icon>新建管理员</el-button>
        <!--删除管理员-->
        <el-button v-show="userinfo.info === '666666'" :disabled="multipleSelection.length === 0"
            style="margin-top: 15px;" type="danger" @click="delEvent">删除管理员</el-button>
        <!--更改密码-->
        <el-button
            :disabled="!(realmultipleSelection.length === 1 && (realmultipleSelection[0].username !== '666666' && (realmultipleSelection[0].username === userinfo.info || userinfo.info === '666666')))"
            style="margin-top: 15px;" type="danger" @click="ifreset = true">更改密码</el-button>
        <!--退出登录-->
            <el-button
            style="margin-top: 15px;" type="danger" @click="relogin">退出登录</el-button>
        <!--user表-->
        <el-table :data="usertableData" stripe style="width: 100%" @selection-change="handleSelectionChange"
            ref="table">

            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column v-if="userinfo.info === '666666'" prop="password" label="密码"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间"></el-table-column>

        </el-table>


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