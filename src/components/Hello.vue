<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <a v-bind:href="url">Home</a>
    <p>
      <form>
        FirstName: <input type="text" v-model="firstname"/>
        LastName: <input type="text" v-model.lazy="lastname"/>
        <input type="submit" value="Submit"/>
        <p>firstname: {{firstname}}</p>
        <p>lastname: {{lastname}}</p>
        <p>fullname: {{firstname + ', ' + lastname}}</p>
        <div v-for="interest in interests" v-bind:key="interest">
          <input type="checkbox" v-model="selectedInterests" :value="interest"/> {{interest}}
        </div>
        <p v-if="selectedInterests.length > 0">You selected: {{selectedInterests.join(', ')}}</p>
        <p v-else>Please select at least one interest</p>
        <div v-for="(key, value, index) in address" v-bind:key="key">
          {{key}}: {{value}}
        </div>
        <button @click="change('itChanged', $event)">Change</button>
      </form>
      <div :style="fancyDiv"
        @mouseover="fancyDiv.border = 'dashed 1px blue'"
        @mouseout="fancyDiv.border = 'solid 1px black'">
        JS Object literal bound to style
      </div>
      <div class="square" :class="{blue: cold, red: hot}"></div>
      <div :class="[squareClass, {'dashed-border': selected}]"></div>
      <div>
        <input type="text" v-model.number="tempFahrenheit">
        Temperature in Celsius: {{tempCelsius}}C from {{tempFahrenheit}}F
      </div>
      Got a question? Ask! (with products in query)
      <input type="text" v-model="question">
      {{response}}
      <ul>
        <li v-for="product in products" v-bind:key="product">{{product.name}}</li>
      </ul>
      <div id="global">
        <global-component>
          <p slot="top">SLOT TEST</p>
        </global-component>
        <local-component :data="theData" title="Local title"></local-component>
        <!-- <component is="local-component" :data="theData" title="Dynamic component"></component> -->
        <b>***PRODUCT FLEXIBLE**</b>
        <product-flexible :data="theData">
          <template scope="props">
            <strong>{{props.product.name}}</strong>
          </template>
        </product-flexible>
      </div>
    </p>
  </div>
</template>

<script>
import $ from 'jquery';
import GlobalComponent from '@/components/global-component';

/* eslint-disable no-multi-str */
const productFlexible = {
  template: '<ul><li v-for="product in data">\
                <slot :product="product"></slot>\
              </li></ul>',
  props: ['data'],
};

const productAdditional = {
  template: '<div>Nested component {{product.description}}<a @click="clickedMethod">Click me!</a>\
  <a @click="requestClick">Me too!</a></div>',
  props: ['product', 'clickedMethod'],
  methods: {
    requestClick() {
      this.$emit('click');
    },
  },
};

const localComponent = {
  template: '<div>\
            A local component {{title}}: {{num}}\
            <ul>\
              <li v-for="(product, i) in data">\
                <p><strong>{{product.name}}</strong></p>\
                <product-additional @click="click(i)" :clicked-method="clicked.bind(this, i)" :product="product" :key="product.id"></product-additional>\
              </li>\
            </ul>\
            </div>',
  data() {
    return {
      num: Math.random(),
    };
  },
  props: ['data', 'title'],
  components: {
    'product-additional': productAdditional,
  },
  methods: {
    clicked(i) {
      console.log(`You clicked${i}`);
    },
    click(i) {
      console.log(`V2: You clicked${i}`);
    },
  },
};

export default {
  name: 'hello',
  components: {
    GlobalComponent,
    'local-component': localComponent,
    'product-flexible': productFlexible,
  },
  data() {
    return {
      msg: 'AskToni',
      url: 'http://google.ca',
      firstname: 'Mike',
      lastname: 'smith',
      interests: ['Running', 'Cycling', 'Swimming'],
      selectedInterests: [],
      address: {
        street: 'bob street',
        city: 'la',
        state: 'ca',
      },
      myFontSize: 24,
      fancyDiv: { border: 'solid 2px black', 'margin-bottom': '30px' },
      cold: true,
      hot: false,
      squareClass: 'square',
      selected: true,
      tempFahrenheit: 0,
      question: '',
      response: '',
      products: [],
      theData: [],
    };
  },
  methods: {
    change(...args) {
      this.msg = 'Welcome!';
      console.log(args);
    },
  },
  computed: {
    tempCelsius() {
      return Math.round((5 / 9) * (this.tempFahrenheit - 32));
    },
  },
  watch: {
    question(newValue) {
      if (newValue.indexOf('products') > -1) {
        $.getJSON('https://hplussport.com/api/products').done((data) => {
          this.products = data;
          this.response = '';
        });
      } else {
        this.response = "Don't understand";
        this.products = [];
      }
    },
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
    $.getJSON('https://hplussport.com/api/products').done((data) => {
      this.theData = data;
    });
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  destroyed() {
    console.log('destroyed');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .square {
         width: 200px;
         height: 200px;
         margin-bottom: 20px;
    }
    .blue {
        background-color: blue;
    }
    .red {
        background-color: red;
    }
	.yellow {
        background-color: yellow;
    }
    .dashed-border {
        border: dashed 4px black;
    }
</style>
