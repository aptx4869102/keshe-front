//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/token';
import router from '@/router'
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({ baseURL })


//添加响应拦截器
instance.interceptors.response.use(
    result => {
        if (result.data.code === 0) {
            return result.data;
        }
        ElMessage.error(result.data.message ? result.data.message : '服务异常了了了了了了了了:(');
    },
    err => {
        //如果响应码是401
        if (err.response.status === 401) {
            ElMessage.error('请先登录!'),
            router.push('/login')
        }
        else
            ElMessage.error('服务异常');
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)
instance.interceptors.request.use(
    (config) => {
        //在发送请求前做什么
        let tokenStore = useTokenStore()
        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token
        }
        return config
    },
    (err) => {
        //如果请求错误做什么
        Promise.reject(err)
    }
)
export default instance;