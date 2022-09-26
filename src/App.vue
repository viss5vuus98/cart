<template>
  <div id="app">
    <div class="main">
      <h3>結帳</h3>
      <div class="container">
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
