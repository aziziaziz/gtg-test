<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>

<style lang="scss">
body {
  margin: 0;
}

input[type=text] {
  padding: 5px;
  width: 100%;
  border: 1px solid rgb(128,128,128);
  background-color: white;
  outline: none;
  border-radius: 5px;
}

input:disabled {
  background-color: rgba(235, 235, 235, 0.5);
}
</style>