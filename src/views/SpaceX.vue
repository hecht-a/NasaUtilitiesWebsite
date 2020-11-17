<template>
  <ul class="timeline">
    <li v-for="launch in launches" :key="launch.flight_number">
      <div class="direction">
        <div class="flag-wrapper">
          <span class="hexa"></span>
          <span class="flag">{{ launch.mission_name }}</span>
          <span class="time-wrapper"
            ><span class="time">{{
              launchDate(launch.launch_date_utc)
            }}</span></span
          >
        </div>
        <div class="desc">
          <h5>Flight number:</h5>
          <p>{{ launch.flight_number }}</p>
          <h5>Rocket name:</h5>
          <p>{{ launch.rocket.rocket_name }}</p>
          <h5 v-if="launch.launch_site.site_name_long">Launch site:</h5>
          <p v-if="launch.launch_site.site_name_long">
            {{ launch.launch_site.site_name_long }}
          </p>
          <h5 v-if="launch.details">Details:</h5>
          <p v-if="launch.details">
            {{ launch.details }}
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import axios from "axios";

export default {
  name: "Error404",
  components: {},
  data: () => {
    return {
      launches: []
    };
  },
  async created() {
    document.title = this?.$route.meta.title;

    const { data } = await axios.get(
      "https://api.spacexdata.com/v3/launches/upcoming"
    );

    data.forEach((launch, i) => {
      this.launches.push(launch);
      launch.i = i;
    });
  },
  methods: {
    launchDate(date) {
      return new Date(date).toLocaleString();
    }
  }
};
</script>

<style lang="less">
@import (css) url("https://fonts.googleapis.com/css?family=Raleway:400,900");

body {
  font-family: "Raleway", sans-serif;
  color: #333;
}

header {
  p {
    text-align: center;
    margin-bottom: 0;
  }
  h1 {
    text-align: center;
    font-weight: bold;
    margin-top: 0;
  }
}

.hexa {
  border: 0px;
  float: left;
  text-align: center;
  height: 35px;
  width: 60px;
  font-size: 22px;
  background: #f0f0f0;
  color: #3c3c3c;
  position: relative;
  margin-top: 15px;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 0;
    height: 0;
    border-bottom: 15px solid #f0f0f0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    top: -15px;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-top: 15px solid #f0f0f0;
    bottom: -15px;
  }
}

.timeline {
  position: relative;
  padding: 0;
  width: 100%;
  margin-top: 20px;
  list-style-type: none;

  &:before {
    position: absolute;
    left: 50%;
    top: 0;
    content: " ";
    display: block;
    width: 2px;
    height: 100%;
    margin-left: -1px;
    background: -moz-linear-gradient(
      top,
      rgba(213, 213, 213, 0) 0%,
      rgb(213, 213, 213) 8%,
      rgb(213, 213, 213) 92%,
      rgba(213, 213, 213, 0) 100%
    );
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0%, rgba(30, 87, 153, 1)),
      color-stop(100%, rgba(125, 185, 232, 1))
    );
    background: -webkit-linear-gradient(
      top,
      rgba(213, 213, 213, 0) 0%,
      rgb(213, 213, 213) 8%,
      rgb(213, 213, 213) 92%,
      rgba(213, 213, 213, 0) 100%
    );
    background: -o-linear-gradient(
      top,
      rgba(213, 213, 213, 0) 0%,
      rgb(213, 213, 213) 8%,
      rgb(213, 213, 213) 92%,
      rgba(213, 213, 213, 0) 100%
    );
    background: -ms-linear-gradient(
      top,
      rgba(213, 213, 213, 0) 0%,
      rgb(213, 213, 213) 8%,
      rgb(213, 213, 213) 92%,
      rgba(213, 213, 213, 0) 100%
    );
    background: linear-gradient(
      to bottom,
      rgba(213, 213, 213, 0) 0%,
      rgb(213, 213, 213) 8%,
      rgb(213, 213, 213) 92%,
      rgba(213, 213, 213, 0) 100%
    );
    z-index: 5;
  }

  li {
    padding: 2em 0;
  }

  .hexa {
    width: 16px;
    height: 10px;
    position: absolute;
    background: #2c87a5;
    z-index: 5;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: -30px;
    margin-top: 0;

    &:before {
      border-bottom: 4px solid #2c87a5;
      border-left-width: 8px;
      border-right-width: 8px;
      top: -4px;
    }

    &:after {
      border-left-width: 8px;
      border-right-width: 8px;
      border-top: 4px solid #2c87a5;
      bottom: -4px;
    }
  }
}

.direction {
  float: none;
  width: 100%;
  text-align: center;

  .flag {
    -webkit-box-shadow: 0 0 1px rgba(0, 0, 0);
    -moz-box-shadow: 0 0 1px rgba(0, 0, 0);
    box-shadow: 0 0 3px rgb(0, 0, 0);

    &:after {
      content: "";
      position: absolute;
      left: 50%;
      top: -15px;
      height: 0;
      width: 0;
      margin-left: -8px;
      border: solid transparent;
      border-bottom-color: rgb(255, 255, 255);
      border-width: 8px;
      pointer-events: none;
    }
  }

  .time-wrapper {
    float: none;
  }

  .desc {
    position: relative;
    margin: 1em 4em 0 4em;
    padding: 1em;
    z-index: 15;
    border-radius: 5px;
  }
}

.flag-wrapper {
  text-align: center;
  position: relative;
}

.flag {
  position: relative;
  display: inline;
  background: rgb(255, 255, 255);
  font-weight: 600;
  z-index: 15;
  padding: 6px 10px;
  text-align: left;
  border-radius: 5px;
}

.time-wrapper {
  display: block;
  position: relative;
  margin: 4px 0 0 0;
  z-index: 14;
  line-height: 1em;
  color: #fff;
}

.time {
  background: #88d6f0;
  display: inline-block;
  padding: 8px;
  border-radius: 5px;
}

.desc {
  position: relative;
  margin: 1em 0 0 0;
  padding: 1em;
  background: #88d6f0;
  z-index: 15;
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0);
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0);
  box-shadow: 0 0 4px rgb(0, 0, 0);

  p {
    font-size: 0.9em;
    margin: 0;

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }

  h5 {
    font-size: 1.1em;
  }
}
</style>
