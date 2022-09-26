<template>
  <div id="step-control" class="stepper-panel">
    <div class="stepper-container">
      <div
      v-for="(step, index) in steps"
      :key="step.id"
      :class="{ active: step.isActive }" 
      class="step">
        <div class="circle-container"></div>
        <div class="label-container"> {{ step.stepName }} </div>
        <span class="connect-line" v-if="index < steps.length - 1"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";


const stepData = [
  {
    id: uuidv4(),
    stepName: "寄送地址",
    path: '/cart/address'
  },
  {
    id: uuidv4(),
    stepName: "運送方式",
    path: '/cart/shipping'
  },
  {
    id: uuidv4(),
    stepName: "付款資訊",
    path: '/cart/payment'
  },
];

export default {
  name: 'StepArea',
  data() {
    return {
      steps: [],
    };
  },
  created() {
    this.fetchSteps();
  },
  methods: {
    fetchSteps() {
      this.steps = stepData.map((step) => ({
        ...step,
        isActive: false,
      }));
    },
  },
  watch: {
    $route(to) {
      this.steps = this.steps.map(step => {
        if(step.path === to.path){
          return {
            ...step,
            isActive: true,
          }
        }
        return step
      })
      const selectStep = this.steps.find(step => {
        return step.path === to.path
      })
      const index = this.steps.indexOf(selectStep)
      for(let i = index + 1; i <= this.steps.length -1; i++){
        this.steps[i].isActive = false
      }
      for(let i = index - 1; i >= 0; i--){
        this.steps[i].isActive = true
      }
    }
  }
};
</script>