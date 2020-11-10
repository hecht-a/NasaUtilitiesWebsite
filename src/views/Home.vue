<template>
  <div class="home"></div>
</template>

<script>
export default {
  name: "Home",
  created() {
    document.title = this?.$route.meta.title;
  }
};
</script>
