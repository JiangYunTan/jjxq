import Vue from 'vue'

Vue.directive('Jujiao', {
  inserted (el) {
    if (el.tagName === 'INPUT') {
      el.focus()
    } else if (el.querySelector('input')) {
      el.querySelector('input').focus()
    } else if (el.querySelector('textarea')) {
      el.querySelector('textarea').focus()
    } else {
      this.$toast('请用在表单上')
    }
  }
})
