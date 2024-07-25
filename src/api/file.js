//导入request.js请求工具
import request from '@/utils/request.js'

//提供调用文件接口的函数
export const fileGetServerice = (fileData) => {
    //借助URLSearchParams 完成传递
    const params = new URLSearchParams();
    for (let key in fileData) {
        params.append(key, fileData[key]);
    }
    console.log("文件:"+params);
    return request.put('file/getfile',params);
}

export const fileGetContentServerice = (fileData) => {
    //借助URLSearchParams 完成传递
    const params = new URLSearchParams();
    for (let key in fileData) {
        params.append(key, fileData[key]);
    }
    return request.put('file/getfilecontent',params);
}

export const filePutContentServerice = (fileData) => {
    //借助URLSearchParams 完成传递
    const params = new URLSearchParams();
    for (let key in fileData) {
        params.append(key, fileData[key]);
    }
    return request.put('file/savefile',params);
}

export const fileUploadzipServerice = (fileData) => {
    //借助URLSearchParams 完成传递
    const params = new URLSearchParams();
    for (let key in fileData) {
        params.append(key, fileData[key]);
    }
    return request.put('zipupload',params);
}
//删除函数
export const fileDelServerice = (fileData) => {
    //借助URLSearchParams 完成传递
    const params = new URLSearchParams();
    for (let key in fileData) {
        params.append(key, fileData[key]);
    }
    return request.post('file/delete',params);
}
//新建函数
export const fileNewServerice = (fileData) => {
    //借助URLSearchParams 完成传递
    const params = new URLSearchParams();
    for (let key in fileData) {
        params.append(key, fileData[key]);
    }
    return request.post('file/newfile',params);
}

