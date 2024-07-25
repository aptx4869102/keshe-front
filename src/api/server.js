//导入request.js请求工具
import request from '@/utils/request.js'
//导入token
//提供调用服务器接口的函数
export const serversGetServerice = () => {
    return request.get('server/getall')
}
//开启实例函数
export const serversStartServerice = (StartData) => {
    const params = new URLSearchParams();
    for (let key in StartData) {
        params.append(key, StartData[key]);
    }
    return request.put('server/start', params);
}
//关闭实例函数
export const serversCloseServerice = (StartData) => {
    const params = new URLSearchParams();
    for (let key in StartData) {
        params.append(key, StartData[key]);
    }
    return request.put('server/stop', params);
}
//连接机器人函数
export const serversConnectServerice = (StartData) => {
    const params = new URLSearchParams();
    for (let key in StartData) {
        params.append(key, StartData[key]);
    }
    return request.put('server/connect', params);
}
//断开机器人函数
export const serversDisconnectServerice = (Data) => {
    const params = new URLSearchParams();
    for (let key in Data) {
        params.append(key, Data[key]);
    }
    return request.put('server/disconnect', params);
}
//获得某个服务端的函数
export const serversGetoneServerice = (Data) => {
    const params = new URLSearchParams();
    for (let key in Data) {
        params.append(key, Data[key]);
    }
    return request.put('server/get', params);
}
