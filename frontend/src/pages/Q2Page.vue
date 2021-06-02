<template>
  <div class="q2-main">
    <input type="number">
    <dropdown :items="allCurrencies" itemKey="id" itemDesc="name" />
    <dropdown :items="allCurrencies" itemKey="id" itemDesc="name" />
  </div>
</template>

<script>
/* eslint-disable */
export default {
  components: {
  },
  data: function() {
    return {
      allCurrencies: []
    }
  },
  props: {
  },
  methods: {
  },
  async mounted() {
    this.allCurrencies = (await this.$axios.get('/currencies')).data;
    // setTimeout(async () => {
    // }, 3000);
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.q2-main {
  width: 100%;
  max-width: 600px;
  display: flex;
  
  > * {
    margin: 5px;
    box-sizing: border-box;
    width: 100%;
  }

  > input[type=number] {
    font-size: 18px;
  }
}

@media only screen and (max-width: 600px) {
  .q2-main {
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
</style>