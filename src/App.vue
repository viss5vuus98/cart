<template>
  <div id="app">
    <div class="main">
      <div class="container">
      <h3>結帳</h3>
      <StepArea />
      <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import StepArea from './components/StepArea.vue'

export default {
  components: {
    StepArea
  }
}
</script>

<style lang="scss" src="./assets/main.scss">

</style>
