<template>
  <div class="btn-section">
    <router-link 
    :to="btnUrl.backRoute"
    v-if="btnUrl.backRoute !== ''"
    >
    <button class="back-step" id="back-step">
      上一步
    </button>
    </router-link>
    <router-link :to="btnUrl.nextRoute" class="next">
    <button v-if="btnUrl.nextRoute !== ''" class="next-step" id="next-step">
      下一步
    </button>
    <button v-else @click="checkout" class="next-step" id="next-step">
      結帳
    </button>
    </router-link>
    <modal name="my-first-modal">
        <p>
          {{ ticketData }}
        </p>
    </modal>
  </div>
</template>

<script>


export default {
  props: {
    btnUrl: {
      type: Object,
      required: true
    },
    //購買人及運送資訊
    userInfo: {
      type: Object,
      default: () =>({
        id: -1,
        gender: '',
        name: '',
        phoneNumber: '',
        email: '',
        city: '',
        address: ''
      })
    },
    // 運送方式，可能會增加所以用數字表示 0:標準 , 1:DHL
    delivery: {
      type: Number,
      default: 0
    },
    paymentInfo: {
      type: Object,
      default: () => ({
        name: '',
        cardNumber: '',
        goodThru: '',
        cvc: ''
      })
    }
  },
  data() {
    return {
      user: {},
      payment: {},
      deliveryMethod:  0,
      total: 0,
      ticketData: {}
    }
  },
  methods: {
    checkout() {
      this.user = JSON.parse(sessionStorage.getItem('user')) || {}
      this.payment = JSON.parse(sessionStorage.getItem('payment')) || {}
      this.deliveryMethod = JSON.parse(sessionStorage.getItem('deliveryMethod')) || 0
      this.total = JSON.parse(sessionStorage.getItem('totalPrice')) || 0
      this.getTicket()
    },
    getTicket() {
      this.ticketData = {
        ...this.user,
        ...this.payment,
        totalPrice: this.total,
        deliveryMethod:this.deliveryMethod
      }
      console.log(this.ticketData)
      this.$modal.show('my-first-modal');
      sessionStorage.clear();
      this.$emit('after-submit')
    }
  },
  watch: {
    userInfo: {
      handler: function() {
        // this.user = JSON.parse(sessionStorage.getItem('user')) || {}
        this.user = { ...this.userInfo }
        sessionStorage.setItem('user', JSON.stringify(this.user))
      },
      deep: true
    },
    paymentInfo: {
      handler: function() {
        // const payment = JSON.parse(sessionStorage.getItem('payment')) || {}
        this.payment = { ...this.paymentInfo }
        sessionStorage.setItem('payment', JSON.stringify(this.payment))
      },
      deep: true
    },
    delivery: {
      handler: function() {
        // const deliveryMethod = JSON.parse(sessionStorage.getItem('deliveryMethod')) || 0
        this.deliveryMethod = this.delivery
        sessionStorage.setItem('deliveryMethod', JSON.stringify(this.deliveryMethod))
      },
    }
  },
}
</script>