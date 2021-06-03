<template>
  <div class="home-main">
    <div class="title">Question 1</div>
    <div>
      A simple page to allow user enter message and auto convert the message to lowercase <br>
      Original message: &lt;Input box&gt; <br>
      Message in Lowercase: &lt;Display entered message in lowercase&gt;
    </div>
    <router-link to="/Q1">View Question 1 Solution</router-link>

    <div class="title">Question 2</div>
    <div>
      1. Use PHP to create a Currency Conversion Page as shown and consume the API to get the rate. <br>
      2. Assuming the API has a rate limit daily (say, only can request 5 times per day). Propose a database design to store the currency rate as a source for this currency conversion page
    </div>
    <router-link to="/Q2">View Question 2 Solution</router-link>
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
.home-main {
  width: 100%;
  max-width: 500px;
  padding-top: 20px;

  > .title {
    font-weight: bold;
    font-size: 1.3em;
    text-decoration: underline;
    margin: 5px 0;
    margin-top: 10px;
  }
}
</style>