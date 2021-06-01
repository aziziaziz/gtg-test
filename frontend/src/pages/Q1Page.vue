<template>
  <div class="q1-main">
    <div class="title">This page helps to automatically converts your text to lower case</div>
    <div>Enter your text below</div>
    <input type="text" @keyup="enterClicked" v-model="text">
    <div>Converted text below</div>
    <input type="text" v-if="optionSelected == 'auto'" v-model="convertedText" disabled>
    <input type="text" v-else v-model="textOnEnter" disabled>

    <div class="option-title">Options</div>
    <div class="options">
      <input type="radio" value="auto" v-model="optionSelected">
      <span @click="optionClicked('auto')">Automatically</span>
      <input type="radio" value="enter" v-model="optionSelected">
      <span @click="optionClicked('enter')">On Enter</span>
      <div class="desc">{{ optionSelected == 'auto' ? '** The output is shown while you type' : '** The output is shown after you press enter' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: function() {
    return {
      text: '',
      textOnEnter: '',
      optionSelected: 'auto'
    }
  },
  computed: {
    convertedText: function() {
      return this.text.toLowerCase();
    }
  },
  props: {
  },
  methods: {
    enterClicked: function(e) {
      if (e.key == 'Enter') {
        this.textOnEnter = this.text.toLowerCase();
      }
    },
    optionClicked: function(val) {
      this.optionSelected = val;
      if (val == 'enter') {
        this.textOnEnter = this.text.toLowerCase();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.q1-main {
  width: 100%;
  max-width: 400px;
  border: 1px solid rgb(128,128,128);
  padding: 10px;
  border-radius: 5px;
  background-color: rgb(215, 243, 210);

  > * {
    margin-bottom: 5px;
    box-sizing: border-box;
  }

  > .title {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 1.5em;
    margin-bottom: 15px;
  }

  > .option-title {
    font-weight: bold;
    margin-top: 10px;
  }

  > .options {
    > span, > input {
      cursor: pointer;
    }

    > .desc {
      font-style: italic;
    }
  }
}

@media only screen and (max-width: 400px) {
  .q1-main {
    > .title {
      font-size: 1.15em;
    }
  }
}
</style>