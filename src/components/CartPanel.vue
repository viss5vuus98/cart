<template>
  <div class="cart-panel">
    <h4 class="cart-title">購物籃</h4>
    <div class="cart-list-wrapper">
      <div 
      v-for="product in products"
      :key="product.id"
      class="cart-item">
        <div class="product-image"><img :src="require(`../../public/${product.image}.png`)" alt=""></div>
        <div class="cart-item-control">
          <p class="cart-title">{{ product.name }}</p>
          <div class="cart-btn">
            <button @click="reduceProductQuantity(product.id)" class="reduce" id="reduce">-</button>
            <span>{{ product.quantity }}</span>
            <button @click="addProductQuantity(product.id)" class="add" id="add">+</button>
          </div>
          <p class="cart-price">${{ product.price }}</p>
        </div>
      </div>
    </div>
    <div class="cart-footer">
      <div class="delivery-charge">
        <p>運費</p>
        <p class="point">{{ shipFee !== 0 ? shipFee : '免費' }}</p>
      </div>
      <div class="total">
        <p>小計</p>
        <p class="point total-penal">${{  getTotal }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

const dummyProduct = [
  {
    id: uuidv4(),
    name: '破壞補丁修身牛仔褲',
    image: 'Block@2x',
    quantity: 1,
    price: 3999
  },
  {
    id: uuidv4(),
    name: '刷色直筒牛仔褲',
    image: 'Block@2x-2',
    quantity: 1,
    price: 1299
  }
]


export default {
  name: 'CartPanel',
  props: {
    shipFee: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      products: [],
      total: 0
    }
  },
  created() {
    this.fetchProduct()
  },
  methods: {
    fetchProduct() {
      this.products = dummyProduct.map(product => ({
        ...product,
        currentPrice: product.quantity * product.price
      }))
    },
    addProductQuantity(productId) {
      this.products = this.products.map( product => {
        if(product.quantity >= 99) {
          return product
        }else if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity += 1,
            currentPrice: product.quantity * product.price
          }
        }
          return product
      })
    },
    reduceProductQuantity(productId) {
      this.products = this.products.map( product => {
        if(product.quantity <= 1) {
          return product
        }else if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity -= 1,
            currentPrice: product.quantity * product.price
          }
        }
          return product
      })
    },
  },
  computed: {
    //計算總價 包含運費
    //因計算值在product物件內 所以先將值存在暫存物件內在輸出
    getTotal() {
      const initPrice = this.products.reduce((total, product) => {
        return {
          totalPrice: total.currentPrice + product.currentPrice
        }
      })
      sessionStorage.setItem('totalPrice', initPrice.totalPrice + this.shipFee)
      return initPrice.totalPrice + this.shipFee
    }
  }
}
</script>