<template>
  <div class="row">
    <form action="post" class="second-form form">
      <h4>運送方式</h4>
      <div class="form-content">
        <div class="radio-wrapper">
          <input 
          v-model="shipFee"
          :value="0"
          @click="delivery = 0"
          type="radio"
          name="ship" 
          >
          <div class="deliver">
            <p class="radio-title">標準運送</p>
            <p class="radio-date">約3~7個工作天</p>
          </div>
          <p class="radio-price">免費</p>
        </div>
        <div class="radio-wrapper">
          <input
          v-model="shipFee"
          :value="500"
          @click="delivery = 1"
          type="radio"
          name="ship" 
          >
          <div class="deliver">
            <p class="radio-title">DHL貨運</p>
            <p class="radio-date">48小時內送達</p>
          </div>
          <p class="radio-price">$500</p>
        </div>
      </div>
    </form>
    <CartPanel :shipFee="shipFee"/>
    <BtnSection :btnUrl="{nextRoute, backRoute}" :delivery="delivery"/>
  </div>
</template>

<script>
import BtnSection from '../components/BtnSection.vue'
import CartPanel from '../components/CartPanel.vue'

const dummyData = {
  nextRoute: '/cart/payment',
  backRoute: '/cart/address'
}
export default {
  components: {
    BtnSection,
    CartPanel
  },
  data() {
    return {
      nextRoute: '',
      backRoute: '',
      shipFee: 0,
      delivery: 0
    }
  },
  created() {
    this.fetchLoadData()
  },
  mounted() {
    this.getSessionData()
  },
  methods: {
    fetchLoadData() {
      this.nextRoute = dummyData.nextRoute
      this.backRoute = dummyData.backRoute
    },
    getSessionData() {
      this.delivery = JSON.parse(sessionStorage.getItem('deliveryMethod')) || this.delivery
      switch(this.delivery) {
        case 1:
          this.shipFee = 500
          break;
        default:
          this.shipFee = 0
      }
    }
  }
}
</script>