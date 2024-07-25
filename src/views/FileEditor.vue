<template>
    <div>
      <input v-model="filename" placeholder="Enter filename" />
      <button @click="getfile">Read File</button>
      <div v-if="fileContent !== null">
        <textarea v-model="fileContent" rows="20" cols="80"></textarea>
        <button @click="saveFile">Save File</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { fileGetServerice} from '@/api/file.js'
  
  const getfilepath=[
    ''
  ]

  const getfile = async() => {
     let result = await fileGetServerice(getfilepath.value);
    //alert(result.msg ? result.msg : '注册成功'); 
    ElMessage.success(result.message ? result.message : '注册成功');  
    
    
}


  </script>