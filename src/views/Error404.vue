<template>
  <div class="body-container">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <p>
      ERREUR 404
      <a class="home" href="/home">Retourner a l'accueil</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "Error404",
  components: {},
  data() {
    return {
      text: "Nasa Image of the Day"
    };
  },
  created() {
    document.title = this?.$route.meta.title;
  }
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: astrospace;
  src: url(../assets/fonts/AstroSpace-0Wl3o.otf);
}

.body-container {
  display: flex;
  width: 100%;
  height: calc(100vh - 76px);
  align-items: center;
  justify-content: center;
}

.body-container p {
  position: absolute;
  color: #fff;
  font-family: "astrospace";
  font-size: 96px;
}

.body-container a {
  margin-top: -10px;
  margin-left: 5px;
  color: rgb(211, 239, 248);
  font-size: 14px;
}

canvas {
  width: 100%;
  height: calc(100vh - 76px);
  background: #111;
}

@keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-webkit-keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-moz-keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-ms-keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}

.stars,
.twinkling {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.stars {
  background: #000 url(../assets/starry_sky/stars2.png) repeat top center;
  z-index: -2;
}

.twinkling {
  background: transparent url(../assets/starry_sky/twinkling.png) repeat top
    center;
  z-index: -1;

  -moz-animation: move-twink-back 200s linear infinite;
  -ms-animation: move-twink-back 200s linear infinite;
  -o-animation: move-twink-back 200s linear infinite;
  -webkit-animation: move-twink-back 200s linear infinite;
  animation: move-twink-back 200s linear infinite;
}
</style>
