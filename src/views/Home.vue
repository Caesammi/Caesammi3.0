<template>
  <div class='Home-wrap'>
    <router-view v-slot="{ Component }">
      <transition name="move" mode="out-in">
        <keep-alive>
          <component
            :is="Component"
          />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {},
    props: {},
    computed: {},
    data() {
      return {}
    },
    methods: {},
    created() {
    },
    mounted() {
    }
  }
</script>

<style>
  .Home-wrap {
    border: 2px solid black;
    width: 100%;
    height: 1080px;
  }
  .content {
    width: auto;
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
</style>
