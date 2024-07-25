//导入request.js请求工具
import request from '@/utils/request.js'

//提供调用注册接口的函数
export const userRegisterServerice = (registerData) => {
    //借助URLSearchParams 完成传递
    const params = new URLSearchParams()
    for (let key in registerData) {
        params.append(key, registerData[key]);
    }
    return request.post('user/register', params);
}
export const userLoginService = (loginData) => {
    const params = new URLSearchParams();
    for (let key in loginData) {
        params.append(key, loginData[key]);
    }
    console.log("登录:"+params);
    return request.post('user/login', params)
}

//提供所有用户信息
export const userGetServerice = () => {
    return request.get('user/getall')
}
//删除选定用户信息

export const userDelService = (loginData) => {
  
    console.log("删除:"+loginData);
    return request.post('user/del', loginData)
}

//修改密码
export const userResetService = (loginData) => {
    const params = new URLSearchParams();
    for (let key in loginData) {
        params.append(key, loginData[key]);
    }
    console.log("xiugai:"+params);
    return request.post('user/reset', params)
}
