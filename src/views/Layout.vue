<script setup>
import {
    Coin,
    UploadFilled,
    Connection,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton, 
    CaretBottom
} from '@element-plus/icons-vue'


</script>

<template>
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323"  text-color="#fff"
                router>
                <el-menu-item index="/server/servers">
                    <el-icon>
                        <coin />
                    </el-icon>
                    <span>服务端实例</span>
                </el-menu-item>
                <el-menu-item index="/server/uploadzipfile">
                    <el-icon>
                        <UploadFilled />
                    </el-icon>
                    <span>上传服务端zip文件</span>
                </el-menu-item>
                <el-menu-item index="/bot/bot">
                    <el-icon>
                        <Connection />
                    </el-icon>
                    <span>机器人</span>
                </el-menu-item>
                <el-menu-item index="/user/manage">
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <span>管理员账号管理</span>
                </el-menu-item>
                <!-- <el-sub-menu >
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更换头像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu> -->
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <!-- <el-header>
                <el-dropdown placement="bottom-end">
                    <span class="el-dropdown__box">
                        <el-avatar :src="avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                            <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header> -->
            <!-- 中间区域 -->
            <el-main>
                <router-view>

                </router-view>
            </el-main>
            <!-- 底部区域 -->
            <el-footer>minecraft服务端管理&群服互通面板 ©2024 Created by 922106840635魏凌霄</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            margin-left: -20px;
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 300px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>