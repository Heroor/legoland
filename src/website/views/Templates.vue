<template lang="pug">
doc-layout
  template(#sidebar)
    | sidebar
  | document
</template>

<script>
import DocLayout from '@/components/doc-layout'

export default {
  components: { DocLayout },
  name: 'Templates'
}
</script>
