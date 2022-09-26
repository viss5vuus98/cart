<template>
  <div class="row">
    <form action="post" class="third-form form">
      <h4>付款資訊</h4>
      <div class="form-content">
        <div class="form-row">
          <label for="">持卡人姓名</label>
          <input 
          v-model="paymentInfo.name"
          type="text">
        </div>
        <div class="form-row">
          <label for="">卡號</label>
          <input
          v-model="paymentInfo.cardNumber" 
          type="text"
          maxlength="16">
        </div>
        <div class="form-row last">
          <div class="form-item">
            <label for="">有效期限</label>
            <input 
            v-model="paymentInfo.goodThru"
            type="text">
          </div>
          <div class="form-item">
            <label for="">CVC/CCV</label>
            <input
            v-model="paymentInfo.cvc" 
            type="text" maxlength="3">
          </div>
        </div>
      </div>
    </form>
  <CartPanel />
  <BtnSection 
  :btnUrl="{ nextRoute, backRoute }" 
  :paymentInfo="paymentInfo"
  @after-submit="handlerSubmit"
  />
  </div>
</template>

<script>
import CartPanel from '../components/CartPanel.vue'
import BtnSection from '../components/BtnSection.vue'

const dummyData = {
  nextRoute: '',
  backRoute: '/cart/shipping'
}

export default {
  name: 'UserPayment',
  components: {
    CartPanel,
    BtnSection
  },
  data() {
    return {
      paymentInfo: {
        name: '',
        cardNumber: '',
        goodThru: '',
        cvc: ''
      },
      nextRoute: '',
      backRoute: ''
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
      this.paymentInfo = JSON.parse(sessionStorage.getItem('payment')) || this.paymentInfo
    },
    handlerSubmit() {
      this.paymentInfo = {
        name: '',
        cardNumber: '',
        goodThru: '',
        cvc: ''
      }
    }
  }
}
</script>