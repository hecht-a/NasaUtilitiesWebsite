<template>
  <div id="map">
    <title>ISS Position</title>
    <div class="inSpace">
      <p><u>Number astronauts in space:</u> {{ numberAstros }}</p>
      <ul></ul>
      <div class="searchContainerMap">
        <h2>ISS flyover</h2>
        <div class="searchComponentsMap">
          <label for="searchMap">Search a city: </label>
          <input
            type="text"
            id="searchMap"
            :placeholder="placeholder"
            v-model.lazy="search"
            autofocus
          />
        </div>
        <h2 class="errorCity">{{ errorMessage }}</h2>
        {{ searchCity() }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import mapboxgl from "mapbox-gl";
import capitalize from "../functions/capitalize";
import addZero from "../functions/addZero";

export default {
  name: "ISSPos",
  components: {},
  data() {
    return {
      href: "http://api.open-notify.org/astros.json",
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
      cityMarker: ""
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
  mounted() {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;

    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      zoom: 2 // starting zoom
    });

    this.marker = new mapboxgl.Marker();
    axios.get("http://api.open-notify.org/iss-now.json").then(resp => {
      const lon = resp.data.iss_position.longitude;
      const lat = resp.data.iss_position.latitude;

      this.marker
        .setLngLat([lon, lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `
          <h2>ISS Position</h2>
          <p>[${lat}, ${lon}]</p>
          `
          )
        )
        .addTo(this.map)
        .togglePopup();
      this.map.setCenter(this.marker.getLngLat());
    });

    window.setInterval(function() {
      axios.get("http://api.open-notify.org/iss-now.json").then(resp => {
        const lon = resp.data.iss_position.longitude;
        const lat = resp.data.iss_position.latitude;

        _this.marker
          .setLngLat([lon, lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `
            <h2>ISS Position</h2>
            <p>[${lat}, ${lon}]</p>
            `
            )
          )
          .togglePopup();
      });
    }, 1000);
    this.getInSpace();
  },
  methods: {
    getInSpace() {
      const ul = document.querySelector(".inSpace > ul");

      axios
        .get(this.href)
        .then(resp => {
          Promise.resolve(resp)
            .then(urlResolved => {
              this.numberAstros = urlResolved.data.number;

              const astros = urlResolved.data.people;
              astros.forEach(astro => {
                const li = document.createElement("li");

                const a = document.createElement("a");
                a.href = `https://wikipedia.org/wiki/${astro.name}`;
                a.target = "_blank";
                a.text = astro.name;

                li.appendChild(a);
                li.append(` in ${astro.craft}`);
                ul.appendChild(li);
              });
            })
            .catch(err => {
              if (err) {
                this.text = "Erreur de recherche.";
                return;
              }
            });
        })
        .catch(err => {
          if (err) {
            this.text = "Erreur de recherche.";
            return;
          }
        });
    },
    searchCity() {
      if (this.searchData === "") return;
      this.errorMessage = "";

      this.text = capitalize(this.searchData);
      axios
        .get(`${this.apiHref}${this.searchData}`)
        .then(resp => {
          Promise.resolve(resp)
            .then(urlRes => {
              const LAT = urlRes.data.features[0].geometry.coordinates[1];
              const LON = urlRes.data.features[0].geometry.coordinates[0];

              if (this.cityMarker) this.cityMarker.remove();

              this.cityMarker = new mapboxgl.Marker();
              this.cityMarker
                .setLngLat([LON, LAT])
                .setPopup(
                  new mapboxgl.Popup().setHTML(
                    `
                  <h2 class="cityMarkerTitle">${capitalize(this.text)}</h2>
                  <ul class="cityMarker">
                  </ul>
                  `
                  )
                )
                .addTo(this.map)
                .togglePopup();
              this.map.setCenter(this.cityMarker.getLngLat());

              const ul = document.querySelector(".cityMarker");

              axios
                .get(`${this.passHref}${LAT}/${LON}`)
                .then(response => {
                  Promise.resolve(response)
                    .then(urlResolved => {
                      urlResolved.data["response"].forEach(pass => {
                        const day = new Date(pass.risetime * 1000).getDay();
                        const month = new Date(pass.risetime * 1000).getMonth();
                        const year = new Date(
                          pass.risetime * 1000
                        ).getFullYear();
                        const hours = new Date(pass.risetime * 1000).getHours();
                        const minutes = new Date(
                          pass.risetime * 1000
                        ).getMinutes();
                        const seconds = new Date(
                          pass.risetime * 1000
                        ).getSeconds();

                        const date = `${addZero(day)}/${addZero(
                          month
                        )}/${year}`;
                        const hour = `${addZero(hours)}:${addZero(
                          minutes
                        )}:${addZero(seconds)}`;

                        const li = document.createElement("li");
                        li.textContent = `${pass.duration}sec (${Number(
                          pass.duration / 60
                        ).toFixed(2)}min) on ${date} at ${hour}`;
                        ul.appendChild(li);
                      });
                    })
                    .catch(err => {
                      if (err) {
                        this.className = "error";
                        this.errorMessage = "Erreur de recherche.";
                        return err;
                      }
                    });
                })
                .catch(err => {
                  if (err) {
                    this.className = "error";
                    this.errorMessage = "Erreur de recherche.";
                    return err;
                  }
                });
            })
            .catch(err => {
              if (err) {
                this.className = "error";
                this.errorMessage = "Erreur de recherche.";
                return err;
              }
            });
        })
        .catch(err => {
          if (err) {
            this.className = "error";
            this.errorMessage = "Erreur de recherche.";
            return;
          }
        });
      this.saveSearchData = this.searchData;
      this.searchData = "";
    }
  }
};
</script>

<style scoped>
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

  .inSpace {
    max-height: 30vh !important;
  }
}

.mapboxgl-canvas {
  width: 100% !important;
}

.marker {
  width: 40px;
  height: 40px;
}

.inSpace ul {
  margin: 0;
  padding: 0;
}

.inSpace ul li a {
  text-decoration: underline;
  color: rgb(136, 214, 240);
}

.inSpace {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  z-index: 999;
  background-color: #343a40ad;
  color: #fff;
  width: auto;
  height: auto;
  max-height: 20vh;
  margin: 20px 20px;
  padding: 10px;
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
