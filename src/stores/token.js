import { defineStore } from "pinia";
import { ref } from 'vue'  

export const useTokenStore = defineStore('token', () => {

    const token = ref('')

    const setToken = (newToken) => {
        token.value = newToken
    }

    const removeToken = () => {
        token.value = ''
    }
    return {
        token, setToken,removeToken
    }
},
{
   persist:false//持久化 
}
);

export const userInfoStore = defineStore('info', () => {

    const info = ref()

    const setInfo= (newInfo) => {
        info.value = newInfo
    }

    const removeInfo = () => {
        info.value = ''
    }
    return {
        info, setInfo,removeInfo
    }
},
{
   persist:false//持久化 
}

);