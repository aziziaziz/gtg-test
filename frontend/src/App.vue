<template>
  <div class="app-main">
    <div class="back-to-home" @click="$router.go(-1)" v-if="$route.path != '/'">&lt; Back to Home</div>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  > .back-to-home {
    align-self: flex-start;
    background-color: rgb(88, 155, 255);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 5px gray;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: rgb(55, 101, 171);
      color: white;
    }
  }
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