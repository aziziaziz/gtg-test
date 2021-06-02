<template>
  <div class="dropdown-main">
    <div class="selected-box">
      <div class="selected-key">{{ selected ? selected[itemKey] : '' }}</div>
      <div class="selected-desc">{{ selected ? selected[itemDesc] : '' }}</div>
    </div>
    <div class="item-list">

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
      selected: null
    }
  },
  props: {
    items: { type: Array, default: function() { return [] } },
    itemKey: { type: String, default: '' },
    itemDesc: { type: String, default: '' },
  },
  methods: {
  },
  mounted() {
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.dropdown-main {
  position: relative;

  > .selected-box {
    border: 1px solid rgb(128,128,128);
    min-height: 25px;
  }

  > .item-list {
    max-height: 200px;
  }
}
</style>