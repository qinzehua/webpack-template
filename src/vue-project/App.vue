
<template>
  <div id="app">
    <h1>{{ msg }} 测试 git</h1>
    <input type="text" v-model="msg" />
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js'
      }
    },
    created() {
      console.log(333)
    },
  
  }
</script>
