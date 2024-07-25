//导入request.js请求工具
import request from '@/utils/request.js'
//获得某个bot的函数
export const BotGetoneService = (Data) => {
    const params = new URLSearchParams();
    for (let key in Data) {
        params.append(key, Data[key]);
    }
    return request.get('bot/get');
}

export const BotLoginService = (Data) => {
    const params = new URLSearchParams();
    for (let key in Data) {
        params.append(key, Data[key]);
    }
    return request.post('bot/login',params);
}

export const BotLogoutService = () => {
    return request.post('bot/close');
}
//获得图片
export const BotPicService = () => {
    return request.get('bot/image');
}
//开始监听控制台
export const BotListenService = () => {
    return request.put('bot/listen');
}

