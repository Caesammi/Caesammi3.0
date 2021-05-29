<template>
  <h1>{{ msg }}</h1>
    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
    </el-switch>
  <p>
    <a style="font-size: 20px" href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>
    <p class="zc__pxtorem">Caesammi</p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
    export default {
      data() {
        return {
          value: false,
          state: {
            count: 0
          }
        }
      },
      props: {
        msg: {
          type: String,
          default: ''
        }
      },
      mounted() {
        let countDown = (num = 1) => {
          return new Promise(resolve => {
            setTimeout(() => {
              console.log(num)
              if(num === 1) {
                alert(1)
              }
              resolve()
            }, 1000)
          })
        }
        let dd = async () => {
          console.log('开始倒计时')
          for (let i = 10; i > 0; i--) {
            await countDown(i)
          }
        }
        dd()
      }
    }
</script>

<style scoped>
a {
  color: #42b983;
}
.zc__pxtorem {
    font-size: 30px;
}
</style>
