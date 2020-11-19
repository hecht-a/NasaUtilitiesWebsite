<template>
  <div id="map">
    <div class="inSpace">
      <div class="searchContainerMap">
        <h2>ISS flyover</h2>
        <div class="searchComponentsMap">
          <label for="searchMap">Search a city: </label>
          <input
            type="text"
            id="searchMap"
            :placeholder="placeholder"
            v-model.lazy="search"
          />
        </div>
        <h2 class="errorCity">{{ errorMessage }}</h2>
        <p style="display: none !important; visibility: hidden;">
          {{ searchCity() }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import mapboxgl from "mapbox-gl";
import capitalize from "../functions/capitalize";
import minsec from "../functions/minsec";

export default {
  name: "ISSPos",
  components: {},
  data() {
    return {
      href: "http://api.open-notify.org/iss-now.json",
      numberAstros: 0,
      text: "",
      errorMessage: "",
      placeholder: "",
      apiHref: `${process.env.VUE_APP_API_URL}city/website_key/`,
      passHref: `${process.env.VUE_APP_API_URL}localisation/website_key/`,
      searchData: "",
      saveSearchData: "",
      map: "",
      marker: "",
      cityMarker: "",
      issPopup: "",
      issPopupEnabled: true
    };
  },
  computed: {
    search: {
      get() {
        return this.searchData;
      },
      set(value) {
        this.searchData = value;
      }
    }
  },
  async mounted() {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;

    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 2
    });

    this.marker = new mapboxgl.Marker();
    const { data } = await axios.get(this.href);
    const lon = data.iss_position.longitude;
    const lat = data.iss_position.latitude;

    const popup = new mapboxgl.Popup().setHTML(
      `
                  <h2>ISS Position</h2>
                  <p>[${lat}, ${lon}]</p>
                  `
    );

    this.marker
      .setLngLat([lon, lat])
      .setPopup(popup)
      .addTo(this.map)
      .togglePopup();
    this.map.setCenter(this.marker.getLngLat());
    this.issPopup = popup.getElement();

    window.setInterval(async () => {
      const { data } = await axios.get(_this.href);
      const lon = data.iss_position.longitude;
      const lat = data.iss_position.latitude;

      _this.marker.setLngLat([lon, lat]).setPopup(
        new mapboxgl.Popup().setHTML(
          `
            <h2>ISS Position</h2>
            <p>[${lat}, ${lon}]</p>
            `
        )
      );

      this.issPopupEnabled ? _this.marker.togglePopup() : "";
    }, 1000);
  },
  methods: {
    async searchCity() {
      if (this.searchData === "") return;
      this.errorMessage = "";

      this.text = capitalize(this.searchData);
      const { data } = await axios.get(`${this.apiHref}${this.searchData}`);

      const LAT = data.features[0].geometry.coordinates[1];
      const LON = data.features[0].geometry.coordinates[0];

      if (this.cityMarker) this.cityMarker.remove();

      this.issPopup.remove();
      this.issPopupEnabled = false;

      const popup = new mapboxgl.Popup().setHTML(
        `
            <h2 class="cityMarkerTitle">${capitalize(this.text)}</h2>
            <ul class="cityMarker"></ul>
            `
      );

      this.cityMarker = new mapboxgl.Marker();
      this.cityMarker
        .setLngLat([LON, LAT])
        .setPopup(popup)
        .addTo(this.map)
        .togglePopup();

      const issPopup = this.marker.getPopup();

      popup.on("close", () => {
        this.issPopupEnabled = true;
      });

      popup.on("open", () => {
        this.issPopupEnabled = false;
      });

      this.map.setCenter(this.cityMarker.getLngLat());

      const ul = document.querySelector(".cityMarker");

      let dataBis = await axios.get(`${this.passHref}${LAT}/${LON}`);
      dataBis = dataBis.data;
      dataBis["response"].forEach(pass => {
        const ts = pass.risetime * 1000;
        const time = new Date(ts).toLocaleString();

        const li = document.createElement("li");
        li.textContent = `${pass.duration}sec (${minsec(
          pass.duration
        )}) on ${time}`;
        ul.appendChild(li);
      });
      this.saveSearchData = this.searchData;
      this.searchData = "";
    }
  }
};
</script>

<style scoped lang="less">
.editedPopup {
  display: none !important;
}

#map {
  display: flex;
  width: 100%;
  height: calc(100vh - 76px);
  bottom: 0;
}

@media screen and (max-width: 929px) {
  #map {
    height: calc(100vh - 60px);
  }
}

.mapboxgl-canvas {
  width: 100% !important;
}

.marker {
  width: 40px;
  height: 40px;
}

.inSpace {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 999;
  background-color: #343a40ad;
  color: #fff;
  width: auto;
  height: auto;
  max-height: 15vh;
  margin: 20px 20px;
  padding: 10px;

  ul {
    margin: 0;
    padding: 0;

    li a {
      text-decoration: underline;
      color: rgb(136, 214, 240);
    }
  }

  h2 {
    margin-top: 0;
  }
}

.errorCity {
  color: #c58b0e;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
}

.cityMarkerTitle {
  text-align: center;
}

.cityMarker {
  margin: 0;
  padding: 0;
}

.searchContainerMap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.searchComponentsMap {
  padding: 0;
  margin: 0;
}

#searchMap {
  padding: 1px;
}
</style>
