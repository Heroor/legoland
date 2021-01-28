<template>
  <el-button @click="click">{{ value }}</el-button>
</template>

<script>
export default {
  name: '{{LIB_NAME}}',
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
