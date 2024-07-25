import { defineStore } from 'pinia'

defineStore('userinfo', () => {
    //定义状态相关内容

    const info = ref({})

    const setInfo = (newInfo)=>{
        info.value = newInfo;
    }

    const removeInfo = ()=>{
        info.value = {}
    }

    return {info,setInfo,removeInfo}

},{persist:true}
)