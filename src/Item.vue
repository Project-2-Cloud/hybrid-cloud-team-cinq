<template>
  <div class="col-sm-4 item">
    <div class="card text-center">
      <div>
        <img :src="item.thumbnail_url" alt="" class="card-img-top grow">
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ item.title }}</h5>
        <p class="card-text">{{ item.shortSummary | shortDescription }} </p>
        <div class="row">
          <p class="col-6 lead">${{ item.price }}/hour</p>
          <p class="col-6">
            <!--<button class="btn btn-success" :disabled="item.quantity === 0" @click="addToCart(item)">
              Hire
            </button>-->
            <!--<Consultant v-bind:class="item" />-->
            <button class="btn btn-success" data-toggle="modal" data-target="#consultantDetail"
                    @click="addToCart(item)">
              Hire
            </button>

          </p>

          <div id="consultantDetail" class="modal fade">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    Consultant detail
                  </h5>
                  <button class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div class="modal-body">
                  <table class="table">
                    <tbody>
                    <tr v-for="(item,idx) in inCart" :key="idx">
                      <p>{{ item.name }}</p>
                      <p>{{ item.description }}</p>
                      <p>${{item.price}}/hour</p>

                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-primary" @click="checkout()">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>

//import Consultant from "@/Consultant";
export default {
  name: 'item',
  components: {},
  props: ['item'],
  data() {
    return {
      size: ''
    }
  },
  filters: {
    shortDescription(value) {
      if (value && value.length > 200) {
        return value.substring(0, 200) + '...';
      } else {
        return value;
      }
    }
  },
  computed: {
    inCart() {
      console.log(this.$store.getters.inCart);
      return this.$store.getters.inCart;
    },
    numInCart() {
      return this.inCart.length;
    },
    total() {
      return this.inCart.reduce((acc, cur) => acc + cur.price, 0);
    },
    isAuthenticated() {
      return this.$store.state.user.isAuthenticated;
    },
  },
  methods: {
    addToCart(item) {
      console.log("doest this method work??")

      this.$store.commit('addToCart', item)
    },
    hire(item) {
      this.$store.commit('hireItem', item);
    },
    removeFromCart(item) {
      this.$store.commit('removeFromCart', item);
    },
    checkout() {
      if (this.isAuthenticated) {
        if (this.numInCart === 0) {
          alert('Your cart is empty!');
          return
        }
      } else {
        alert('Please login to checkout');
        return
      }
    },
  }
}
</script>

<style scoped>

.remain {
  color: #d17581;
}

.grow {
  width: 90%;
  height: 90%;
  padding: 15px;
  transition: all .2s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}

.item {
  display: flex;
  content: "";
  padding: 10px 10px;
}

</style>