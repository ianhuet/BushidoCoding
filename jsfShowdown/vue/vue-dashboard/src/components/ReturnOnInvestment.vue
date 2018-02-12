<template lang="pug">

  div.c-roi
    h2.c-roi__title Return on Investment % (ROI)
    div.c-roi__security-status
      i.c-roi__security-status--icon.fa.fa-lock

    div.c-roi__summary.c-roi--body
      h1.c-roi__summary-title 142%
        i.c-roi__summary-info.fa.fa-question-circle
      p.c-roi__summary-detail Payback: 8 months

    div.c-roi__graph.c-roi--body
      img(src="assets/graph.png" width="233" height="280")

    div.c-roi__detail.c-roi--body
      table.c-roi__table
        thead
          tr.c-roi__detail-legend
            th.c-roi__table--col Breakdown
            th.c-roi__table--col Cost
            th.c-roi__table--col Value
            th.c-roi__table--col %
            th.c-roi__table--col-thin

        tbody
          tr.c-roi__detail-total
            th Total
            th 111,000.00
            th 150,000.00
            th.c-roi__detail-high 142%
            th

          tr
            td CMCS
            td 100,000.00
            td 115,000.00
            td.c-roi__detail-high 90%
            td
              i.c-roi__detail-edit.fa.fa-edit

          tr
            td FTS
            td 11,000.00
            td 35,000.00
            td.c-roi__detail-mid 52%
            td
              i.c-roi__detail-edit.fa.fa-edit

        div.c-roi__detail-add
          a.o-btn add
            i.o-btn--icon.fa.fa-plus

</template>



<style lang="stylus" scoped>

  $btn-bg     = #ABC040
  $btn-text   = #333333
  $btn-bg-alt = darken(#ABC040, 30)
  $btn-text-alt = #FFFFFF

  $roi-bg     = #ffffff
  $roi-bg-alt = #FAFAFA

  $roi-border = #DDDDDD
  $roi-border-body = #1B9DD2

  $roi-shadow = #000000

  $roi-text   = #58595B
  $roi-icon   = #888888

  $roi-table-legend = #333333
  $roi-table-editor = #337AB7
  $roi-table-border = #CCCCCC
  $roi-result-high  = #B64442
  $roi-result-mid   = #C1863B
  $roi-result-low   = #ABC040


  .c-roi
    box-shadow: 3px 3px $roi-shadow
    color: $roi-text
    display: grid
    grid-template-columns: repeat(4, 1fr)
    text-align: left

    &--body
      background-color: $roi-bg-alt
      border-bottom: 1px solid $roi-border
      padding: 1rem


    &__title
      background-color: $roi-bg;
      border-bottom: 1px solid $roi-border
      border-left: 1px solid $roi-border
      border-top: 1px solid $roi-border
      border-top-left-radius: 5px
      font-size: rem(20px)
      font-family: 'Roboto Condensed', sans-serif
      font-weight: 300
      grid-column: 1 / 4
      grid-row: 1
      padding: .6rem .8rem

    &__security-status
      background-color: $roi-bg;
      border-bottom: 1px solid $roi-border
      border-right: 1px solid $roi-border
      border-top: 1px solid $roi-border
      border-top-right-radius: 5px
      grid-column: 4
      grid-row: 1
      padding: .6rem .8rem
      text-align: right

      &--icon
        font-size: 20px
        margin-top: 4px


    &__summary
      border-left: 4px solid $roi-border-body
      grid-column 1
      grid-row: 2
    
    &__summary-title
      font-size: 55px
      font-weight: 700

    &__summary-info
      color: $roi-icon
      font-size: 18px
      padding-left: .5em
      vertical-align: super
    
    &__summary-detail
      font-family: 'Roboto Condensed', sans-serif
      font-weight: 700


    &__graph
      grid-column: 2
      grid-row: 2

    &__detail
      border-right: 1px solid $roi-border
      border-bottom-right-radius: 5px
      grid-column: 3 / 5
      grid-row: 2
      position: relative

      &-edit
        color: $roi-table-editor

      &-high
        color: $roi-result-high

      &-mid
        color: $roi-result-mid

      &-low
        color: $roi-result-low


    &__detail-legend
      color: $roi-table-legend
      font-size: 18px

      th
        padding-bottom: 1rem

    tbody tr
      td
        padding: .5em 0

    &__detail-total
      color: $roi-table-legend
      font-weight: 700

      th
        border-bottom: 1px solid $roi-table-border
        padding-bottom: .5rem

    &__detail-add
      bottom: 2rem
      right: 1rem
      position: absolute


    &__table
      border-collapse: separate
      border-spacing: 0
      font-size: 14px
      width: 100%

      &--col
        width: 29%

      &--col-sm
        width: 9%;

      &--col-xs
        width: 4%;

  .o-btn
    background-color: $btn-bg
    border-radius: 50px
    color: $btn-text
    padding: .4em 2em

    &:hover
      background-color: $btn-bg-alt
      color: $btn-text-alt
      transition: all .2s ease
      
    &--icon
      color: $btn-text
      padding-left: .7em

    &:hover .o-btn--icon
      color: $btn-text-alt
      transition: all .2s ease

</style>



<script>
  // import {Bar} from 'vue-chartjs'

  export default {
    name: 'ReturnOnInvestment',

    // components: {
    //   Bar
    // },

    props: {
      msg: String
    }
  }

</script>
