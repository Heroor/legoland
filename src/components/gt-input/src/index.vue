<template lang="pug">
el-form-item(:label="label", :prop="prop", v-if="mode === 'form'")
  el-input(
    :class="[inputClass]",
    v-model="inputValue",
    @input="handleInput",
    v-on="$listeners",
    v-bind="$attrs",
    clearable,
    :placeholder="getPlaceholder"
  )
  slot
div(v-else)
  el-input(
    :class="[inputClass]",
    v-model="inputValue",
    @input="handleInput",
    v-on="$listeners",
    v-bind="$attrs",
    clearable,
    :placeholder="placeholder"
  )
  slot
</template>

<script>
export default {
  name: 'GtInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'form',
    },
    inputClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inputValue: this.value || '',
    }
  },
  computed: {
    getPlaceholder() {
      return this.placeholder ? this.placeholder : `请填写${this.label}`
    },
  },
  watch: {
    value(newValue) {
      this.inputValue = newValue
    },
  },
  methods: {
    handleInput() {
      this.$emit('input', this.inputValue)
    },
  },
}
</script>

<style lang="less" scoped>
// .el-input.invalid /deep/ .el-input__inner {
//   border-color: @danger-color;
// }
</style>
