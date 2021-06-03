<template>
  <div class="q2-main">
    <div class="conversion-box">
      <div class="q2-container">
        <span>Amount</span>
        <input type="number" v-model.number="amount">
      </div>
      <div class="q2-container">
        <span>From</span>
        <dropdown :items="allCurrencies" :selectedItem.sync="from" itemKey="id" itemDesc="name" />
      </div>
      <img class="switch-sides" @click="switchSides" src="../assets/switcharrows.png" alt="" width="20">
      <div class="q2-container">
        <span>To</span>
        <dropdown :items="allCurrencies" :selectedItem.sync="to" itemKey="id" itemDesc="name" />
      </div>
      <button @click="convertClicked" :disabled="(!from || !to) || (from == to)">
        <img src="../assets/rightarrow.png" alt="" width="30" height="30">
      </button>
    </div>
    <div class="loader" v-if="converting"></div>
    <div class="conversion-result" v-if="conversionResult">
      <div>{{ amount ? amount : '1' }} {{ from['id'] }} =</div>
      <div class="r-box">
        <span class="r-value">{{ outputValue }}</span>
        <span class="r-currency">{{ to['id'] }}</span>
      </div>
      <div class="r-rate">1 {{ from['id'] }} = {{ from['id'] == conversionResult['from'] ? conversionResult['value'] : conversionResult['reversed'] }} {{ to['id'] }}</div>
      <div class="r-rate">1 {{ to['id'] }} = {{ to['id'] == conversionResult['from'] ? conversionResult['value'] : conversionResult['reversed'] }} {{ from['id'] }}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  components: {
  },
  data: function() {
    return {
      allCurrencies: [],
      from: null,
      to: null,
      conversionResult: null,
      converting: false,
      amount: 1
    }
  },
  computed: {
    outputValue: function() {
      let output = this.from['id'] == this.conversionResult['from'] ? this.conversionResult['value'] : this.conversionResult['reversed'];
      if (this.amount) {
        return output * this.amount;
      } else {
        return output;
      }
    },
  },
  props: {
  },
  methods: {
    switchSides: function() {
      var tempFrom = this.from;
      this.from = this.to;
      this.to = tempFrom;
    },
    convertClicked: async function() {
      this.converting = true;
      this.conversionResult = (await this.$axios.get(`/convert?from=${this.from['id']}&to=${this.to['id']}`)).data;
      this.converting = false;
    },
    checkChanges: function() {
      let resultFrom = this.conversionResult['from'];
      let resultTo = this.conversionResult['to'];

      if ((this.from['id'] == resultFrom && this.to['id'] == resultTo) || (this.to['id'] == resultFrom && this.from['id'] == resultTo)) {

      } else {
        this.conversionResult = null;
      }
    }
  },
  async mounted() {
    var currencyData = (await this.$axios.get('/currencies')).data;
    currencyData = currencyData.sort((a, b) => { return a['id'] < b['id'] ? -1 : 1 });
    this.allCurrencies = currencyData;
  },
  watch: {
    from: function() {
      this.checkChanges();
    },
    to: function() {
      this.checkChanges();
    }
  }
}
</script>

<style lang="scss" scoped>
.q2-main {
  width: 100%;
  max-width: 600px;
  background-color: rgb(20, 69, 137);
  padding: 20px;
  border-radius: 10px;

  > .conversion-box {
    display: flex;
    align-items: center;

    > * {
      margin: 5px;
      box-sizing: border-box;
      width: 100%;
    }

    > .switch-sides {
      width: 20px;
      height: 20px;
      margin-top: 22px;
      cursor: pointer;
      transition: 0.3s;

      &:active {
        transform: scale(0.9);
      }
    }

    > button {
      position: relative;
      max-height: 50px;
      min-height: 50px;
      max-width: 50px;
      min-width: 50px;
      padding: 10px;
      box-sizing: border-box;
      border: none;
      margin-top: 22px;
      background-color: rgb(252,184,20);
      border-radius: 10px;
      cursor: pointer;
      transition: 0.3s;

      &:active:enabled {
        transform: scale(0.9);
      }

      &:disabled {
        background-color: rgba(252,184,20,0.3);
      }
    }

    > .q2-container {
      > * {
        width: 100%;
        box-sizing: border-box;
      }

      > span {
        color: white;
      }

      > input[type=number] {
        font-size: 18px;
        max-height: 50px;
        min-height: 50px;
        border: none;
        padding: 0 5px;
        border-radius: 10px;
      }
    }
  }

  > .loader {
    height: 30px;
    width: 30px;
    border-color: white;
    border-width: 2px;
    border-style: hidden hidden dashed dashed;
    margin: auto;
    margin-top: 10px;
    border-radius: 100%;
    animation: spin 0.5s ease-in-out infinite;
  }

  > .conversion-result {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;

    > .r-box {
      > .r-value {
        font-size: 3em;
      }

      > .r-currency {
        margin-left: 10px;
      }
    }

    > .r-rate {
      font-size: 0.7em;
      margin: 3px 0;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  .q2-main {
    > .conversion-box {
      flex-direction: column;

      > * {
        margin: 5px 0;
      }

      > input[type=number] {
        min-height: 50px;
        max-height: 50px;
      }
    }
  }
}
</style>