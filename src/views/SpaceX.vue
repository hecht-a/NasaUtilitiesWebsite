<template>
  <p>hello</p>
</template>

<script>
export default {
  name: "Error404",
  components: {},
  data() {
    return {};
  },
  created() {
    document.title = this?.$route.meta.title;
  }
};
</script>

<style lang="less" scoped></style>
