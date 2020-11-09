<template>
  <header>
    <div class="navbar bg-dark">
      <a href="home" class="">
        <img class="logo" src="./assets/nasaBlue.png" alt="" />
      </a>
      <input type="checkbox" name="icon" id="icon" />
      <label for="icon" class="a"><i class="fas fa-bars icon"></i></label>
      <div class="d-flex">
        <ul>
          <li>
            <router-link to="/">Home</router-link>
            <router-link to="/apod">Image of the Day</router-link>
            <router-link to="/search">Search image</router-link>
            <router-link to="/isspos">ISS Position</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="under-nav"></div>
  </header>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      logoUrl: "./assets/nasaBlue.png"
    };
  }
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped lang="less">
@font-face {
  font-family: astrospace;
  src: url(./assets/fonts/AstroSpace-0Wl3o.otf);
}

header {
  margin: 0;
}

body {
  background-color: #f2f2f2;
  font-family: "RobotoDraft", "Roboto", sans-serif;
  margin: 0;
}

.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}

.navbar-dark .navbar-brand {
  color: #fff;
}

.bg-dark {
  background-color: #343a40 !important;
}

.under-nav {
  background-color: rgb(136, 214, 240);
  height: 10px;
}

#icon {
  display: none;
}

a:hover,
.a:hover {
  transition: 0.2s;
  color: rgba(44, 135, 165, 1);
}

a,
.a {
  font-weight: bold;
  color: white;
  text-decoration: none;

  &.router-link-exact-active {
    color: rgb(136, 214, 240);
  }
}

.logo {
  width: 100px;
  height: 30px;
}

ul {
  list-style-type: none;
}

.d-flex {
  display: flex;
  justify-content: flex-end;
}

.d-flex ul li a {
  margin: 0 30px 0 0;
  text-transform: uppercase;
  font-family: astrospace;
}

@media screen and (min-width: 930px) {
  .icon {
    display: none;
  }
}

@media screen and (max-width: 929px) {
  .icon {
    justify-self: flex-end;
    cursor: pointer;
    font-size: 24px;
    position: fixed;
    right: 20px;
    top: 14px;
  }

  .d-flex {
    display: none;
  }

  #icon:checked ~ .d-flex {
    display: flex;
  }

  .navbar {
    height: auto;
    flex-direction: column;
  }

  ul,
  .d-flex {
    margin: 10px 0 0 0;
    padding: 0px;
  }

  .d-flex ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .d-flex ul li a {
    margin: 0px;
    padding: 0px;
  }

  .d-flex ul li a:not(:last-child) {
    padding-bottom: 15px;
  }
}
</style>
