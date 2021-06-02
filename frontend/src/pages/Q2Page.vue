<template>
  <div class="q2-main">
    <input type="number">
    <dropdown />
  </div>
</template>

<script>
/* eslint-disable */
export default {
  components: {
  },
  data: function() {
    return {
    }
  },
  props: {
  },
  methods: {
  },
  async mounted() {
    this.$axios.get('/currencies');
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.q2-main {

}
</style>