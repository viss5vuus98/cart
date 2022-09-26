<template>
  <div class="row">
    <div class="form-panel">
      <div class="form-container">
        <form action="post" class="first-form form">
              <h4>寄送地址</h4>
              <div class="form-content">
                <div class="form-row first-row">
                  <div class="form-item gender">
                    <label for="">稱謂</label>
                    <div class="select-wrapper form-item">
                      <select
                      v-model="userInfo.gender" 
                      name="gender" 
                      id="gender"
                      class="select-control">
                        <option value="" disabled selected>請選擇稱謂</option>
                        <option :value="'先生'">先生</option>
                        <option :value="'女士'">女士</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-item name">
                    <label for="">姓名</label>
                    <input 
                    v-model="userInfo.name" 
                    type="text">
                  </div>
                </div>
                <div class="form-row form-item second-row">
                  <label for="">電話</label>
                  <input 
                  v-model="userInfo.phoneNumber" 
                  type="number">
                </div>
                <div class="form-row form-item third-row">
                  <label for="">Email</label>
                  <input 
                  v-model="userInfo.email" 
                  type="text">
                </div>
                <div class="form-row form-item fourth-row">
                  <label for="">縣市</label>
                  <div class="select-wrapper">
                    <select 
                    v-model="userInfo.city"
                    name="" id=""
                    class="select-control">
                      <option value="" disabled selected>請選擇縣市</option>
                      <option  
                      v-for="city in cityData"
                      :key="city.id"
                      :value="city.name">{{ city.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-row form-item fifth-reow">
                  <label for="">地址</label>
                  <input
                  v-model="userInfo.address"  
                  type="text">
                </div>
              </div>
            </form>
      </div>
    </div>
    <CartPanel />
    <BtnSection :btnUrl="{ nextRoute, backRoute }" :userInfo="userInfo"/>
  </div>
</template>

<script>
import CartPanel from '../components/CartPanel.vue'
import BtnSection from '../components/BtnSection.vue'
import { v4 as uuidv4 } from 'uuid'

const dummyData = {
  cityData:[
    {
      id: uuidv4(),
      name: '台南'
    },
    {
      id: uuidv4(),
      name: '高雄'
    },
    {
      id: uuidv4(),
      name: '屏東'
    }
  ],
  nextRoute: '/cart/shipping',
  backRoute: ''
}
export default {
  name: 'UserAddress',
  components: {
    CartPanel,
    BtnSection
  },
  data() {
    return {
      userInfo: {
        id: uuidv4(),
        gender: '',
        name: '',
        phoneNumber: '',
        email: '',
        city: '',
        address: ''
      },
      cityData: [],
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
      this.cityData = [ ...dummyData.cityData ],
      this.nextRoute = dummyData.nextRoute
      this.backRoute = dummyData.backRoute
    },
    getSessionData() {
      this.userInfo = JSON.parse(sessionStorage.getItem('user')) || this.userInfo
    }
  }
}
</script>
