<template lang="pug">

  div#app
    ReturnOnInvestment

</template>


<script>
  import ReturnOnInvestment from './components/ReturnOnInvestment.vue'

  export default {
    name: 'app',

    components: {
      ReturnOnInvestment
    }
  }

</script>


<style lang="stylus">
  @require 'assets/style/core'
  @import 'https://use.fontawesome.com/releases/v5.0.6/css/all.css'

  *
    margin: 0
    padding: 0

  html
    font-size: 100%

  body
    background-color: $body-bg
    color: $body-text
    font-size: rem(16px)
    font-family: 'Roboto', sans-serif

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    margin: 60px auto 0
    max-width: 940px

</style>
