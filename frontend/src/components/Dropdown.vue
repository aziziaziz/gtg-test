<template>
  <div class="dropdown-main">
    <div class="selected-box" @focus="dropdownFocus" @blur="dropdownBlur" tabindex="0" ref="box" @keydown="search"
      :style="{ borderRadius: focus ? '10px 10px 0 0' : '10px' }">
      <div class="d-key">{{ selected ? selected[itemKey] : '' }}</div>
      <div class="d-desc">{{ selected ? selected[itemDesc] : '' }}</div>
    </div>

    <div class="item-list" ref="dropdownItems" :style="{ display: focus ? '' : 'none' }" id="abc">
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  components: {
  },
  computed: {
  },
  data: function() {
    return {
      selected: null,
      focus: false,
      canClose: true,

      currentSearch: '',
      currentIndex: null,
      tempSelected: null,
      tempEl: null,

      timer: null
    }
  },
  props: {
    items: { type: Array, default: function() { return [] } },
    itemKey: { type: String, default: '' },
    itemDesc: { type: String, default: '' },

    selectedItem: { type: Object, default: null },
  },
  methods: {
    itemClicked: function(item, el) {
      this.selected = item;
      this.focus = false;
      this.tempEl = el.target.parentNode;
      this.tempEl.classList.add('d-selected');
      this.$emit('update:selectedItem', this.selected);
    },
    dropdownFocus: function() {
      this.focus = true;
      if (this.selected) {
        this.$nextTick(() => {
          this.tempEl = this.$refs.dropdownItems.querySelector(`#${this.selected[this.itemKey]}`);
          this.tempEl.classList.add('d-selected');
          console.log(this.tempEl);
          console.log(this.tempEl.offsetTop);

          this.$refs.dropdownItems.scrollTo(0, this.tempEl.offsetTop);
        });
      }
    },
    dropdownBlur: function() {
      if (this.canClose) {
        this.focus = false;
      }
    },
    search: function(e) {
      if (e.key == 'Enter') {
        this.selected = this.tempSelected;
        this.tempSelected = null;
        this.$refs.box.blur();
        this.$emit('update:selectedItem', this.selected);
      } else {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
          this.currentSearch = '';
          this.currentIndex = null;
          clearInterval(this.timer);
        }, 300);

        this.currentSearch += e.key;
        var search = this.items.filter(i => i[this.itemDesc].toLowerCase().startsWith(this.currentSearch.toLowerCase()));
        if (search.length > 0) {
          if (this.tempEl) {
            this.tempEl.classList.remove('d-selected');
          }
          this.tempSelected = search[0];
          this.tempEl = this.$refs.dropdownItems.querySelector(`#${search[0][this.itemKey]}`);
          this.tempEl.classList.add('d-selected');
          
          this.$refs.dropdownItems.scrollTo(0, this.tempEl.offsetTop);
        } else {
          this.tempSelected = null;
          if (this.tempEl) {
            this.tempEl.classList.remove('d-selected');
          }
        }
      }
    }
  },
  mounted() {
  },
  watch: {
    items: function(val) {
      let itemList = this.$refs.dropdownItems;

      val.forEach((v) => {
        var item = document.createElement('div');
        item.setAttribute('id', v[this.itemKey]);
        item.classList.add('d-item');
        item.addEventListener('mouseup', (e) => { this.itemClicked(v, e) });
        item.addEventListener('mouseenter', () => {
          this.canClose = false;
          this.tempSelected = null;
          if (this.tempEl) {
            this.tempEl.classList.remove('d-selected');
          }
        });
        item.addEventListener('mouseleave', () => { this.canClose = true });

        var key = document.createElement('div');
        key.classList.add('d-key');
        key.innerHTML = v[this.itemKey];

        var desc = document.createElement('div');
        desc.classList.add('d-desc');
        desc.innerHTML = v[this.itemDesc];

        item.appendChild(key);
        item.appendChild(desc);

        itemList.appendChild(item);
      })
    },
    selectedItem: function(val) {
      this.selected = val;
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-main {
  position: relative;
  width: 100%;

  > .selected-box {
    // border: 1px solid rgb(128,128,128);
    min-height: 50px;
    max-height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    background-color: white;
  }

  > .item-list {
    max-height: 200px;
    overflow: auto;
    position: absolute;
    left: 0;
    top: 100%;
    border-top: 1px solid rgb(128,128,128);
    border-bottom: 1px solid rgb(128,128,128);
    z-index: 99999;
  }
}
</style>

<style>
.d-item {
  border-color: rgb(128,128,128);
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  padding: 5px;
  cursor: pointer;
  background-color: white;
}

.d-item:hover, .d-selected {
  background-color: rgb(58, 148, 42);
  color: white;
}

.d-key {
  font-weight: bold;
  font-size: 1.2em;
}

.d-desc {
  font-weight: lighter;
  font-size: 0.8em;
}
</style>