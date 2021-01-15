<template>
  <button @click="click">{{ value }}</button>
</template>

<script>
export default {
  props: {
    // v-model
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    click() {
      this.$emit('input', this.value + 1)
      this.$emit('change', this.value + 1)
    },
  },
}
</script>
