<template>
  <title>Search</title>
  <div class="searchContainer">
    <h1>
      {{ text }}
    </h1>
    <br />
    <div class="searchComponents">
      <label for="search">Search: </label>
      <input
        type="text"
        id="search"
        :placeholder="placeholder"
        v-model.lazy="search"
        autofocus
      />
      <select class="selectNbImages" v-model="limit"></select>
    </div>
    <div class="errorMessage">
      <p class="error">{{ errorMessage }}</p>
    </div>
  </div>
  {{ getImageArray(href) }}
</template>

<script>
import axios from "axios";
import capitalize from "../functions/capitalize";
import removeChilds from "@/functions/removeChilds";

export default {
  name: "Search",
  components: {},
  data() {
    return {
      text: "Search Nasa image",
      placeholder: "",
      href: `${process.env.VUE_APP_API_URL}search/website_key/`,
      searchData: "",
      saveSearchData: "",
      limit: 7,
      errorMessage: ""
    };
  },
  created() {
    document.title = this.$route.meta.title;
  },
  mounted() {
    const select = document.querySelector("select");
    this.appendSelect(select, 15);
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
  unmounted() {
    const container = document.querySelector(".container");
    removeChilds(container, ".center");
  },
  methods: {
    appendSelect(component, max) {
      for (let i = 1; i <= max; i++) {
        const opt = document.createElement("option");
        opt.value = i.toString();
        opt.textContent = i.toString();
        // eslint-disable-next-line no-constant-condition
        opt.selected = true ? i === this.limit : false;
        component.appendChild(opt);
      }
    },
    getImageArray(url) {
      if (this.searchData === "") return;
      const container = document.querySelector(".container");
      const center = document.createElement("div");
      const getCenter = container.appendChild(center);
      removeChilds(container, ".center");
      const randArray = [];
      this.errorMessage = "";
      axios
        .get(`${url}${this.searchData}`)
        .then(resp => {
          for (let i = 0; i < this.limit; i++) {
            Promise.resolve(resp)
              .then(urlResolved => {
                const items = urlResolved.data["collection"]["items"];

                if (items.length === 0) {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const pError = document.querySelector("p.error");
                  return (this.errorMessage =
                    "Aucune image trouvée. Réessayer la recherche.");
                }

                if (items.length < this.limit) {
                  return (this.errorMessage =
                    "Pas assez d'images à afficher. Essayer de réduire le nombre d'images à afficher.");
                }

                let rand = Math.floor(Math.random() * items.length);
                if (randArray.includes(rand)) {
                  while (randArray.includes(rand)) {
                    rand = Math.floor(Math.random() * items.length);
                  }
                }
                randArray.push(rand);

                const data = items[rand]["data"][0];
                const url = items[rand]["links"][0]["href"];
                const title = data["title"];
                const description = data["description"];

                const propertyCard = document.createElement("div");
                const a = document.createElement("a");
                const propertyImage = document.createElement("div");
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const propertyImageTitle = document.createElement("div");
                const h5 = document.createElement("h5");

                const propertyDescription = document.createElement("div");
                const p = document.createElement("p");

                a.href = "#";

                const getPropertyCard = getCenter.appendChild(propertyCard);
                const getA = getPropertyCard.appendChild(a);
                const getPropertyImage = getA.appendChild(propertyImage);

                const getPropertyDescription = getPropertyCard.appendChild(
                  propertyDescription
                );
                const getH5 = getPropertyDescription.appendChild(h5);
                const getP = getPropertyDescription.appendChild(p);

                getCenter.classList.add("center");
                getPropertyCard.classList.add("property-card");
                getPropertyImage.classList.add("property-image");
                getPropertyImage.style.backgroundImage = `url(${url.replace(
                  / /g,
                  "%20"
                )})`;
                getPropertyDescription.classList.add("property-description");

                getPropertyImage.addEventListener("click", () => {
                  this.displayBigImage(url, title, description);
                });

                getH5.textContent = title;
                getP.textContent = description;
              })
              .catch(err => {
                if (err) {
                  this.text = "erreur de recherche";
                  return;
                }
              });
          }
        })
        .catch(err => {
          if (err) {
            this.text = "erreur de recherche";
            return;
          }
        });

      this.text = `${capitalize(this.searchData)} image`;
      this.placeholder = capitalize(this.searchData);
      this.searchData = "";
    },
    displayBigImage(url, title, description) {
      url = url.replace(/thumb|small|medium/gm, "medium");
      const div = document.createElement("div");
      div.className = "bigImage";
      const divImg = document.createElement("div");
      divImg.className = "divImg";

      const divElement = document.createElement("div");
      divElement.className = "divElement";
      const image = document.createElement("img");

      const divH5 = document.createElement("div");
      divH5.className = "divTitle";

      const h5Title = document.createElement("h5");
      h5Title.textContent = title;
      divH5.appendChild(h5Title);

      const pDescription = document.createElement("p");
      pDescription.textContent = description;

      divElement.append(divH5);
      divElement.append(pDescription);

      image.src = url;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      image.onerror = e => {
        url = url.replace(/thumb|small|medium/gm, "thumb");
        image.src = url;
      };
      divImg.appendChild(image);
      div.appendChild(divImg);
      div.appendChild(divElement);
      document.getElementsByTagName("body")[0].appendChild(div);
      window.addEventListener("keydown", e => {
        if (e.keyCode === 27 && div) {
          div.remove();
        }
      });
      div.onclick = e => {
        const container = document.querySelector("body");
        if (e.srcElement.tagName == "DIV") {
          removeChilds(container, ".bigImage");
        }
      };
      image.onclick = e => {
        e.preventDefault();
        window.open(url, "_blank");
      };
    }
  }
};
</script>

<style lang="less" scoped>
.searchContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.errorMessage {
  text-align: center;
}

.error {
  width: 500px;
  color: red;
  word-wrap: break-word;
}

#search {
  margin-bottom: 20px;
  padding: 1px;
}

.center {
  img:hover {
    cursor: pointer;
  }

  .bigImage {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    animation: 0.4s ease-in-out bgAppear;
    top: 0;
  }

  .bigImage img {
    animation: 0.4s ease-in-out imgAppear;
    width: auto;
    height: auto;
    max-width: 1152px;
    max-height: 882px;
  }

  @keyframes imgAppear {
    from {
      transform: scale(0.7);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes bgAppear {
    from {
      background: rgba(0, 0, 0, 0);
    }
    to {
      background: rgba(0, 0, 0, 0.6);
    }
  }

  h5 {
    margin: 0px;
    font-size: 1.4em;
    font-weight: 700;
  }

  p {
    font-size: 12px;
  }

  .center {
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
  }

  .property-card {
    height: 18em;
    width: 14em;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff;
    margin: 20px;
  }

  .property-image {
    height: 6em;
    width: 14em;
    padding: 1em 2em;
    position: absolute;
    top: 0px;
    transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    background-image: url("https://cdn.photographylife.com/wp-content/uploads/2017/01/What-is-landscape-photography.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }

  /* Bottom Card Section */

  .property-description {
    background-color: #fafafc;
    height: 11em;
    width: 14em;
    position: absolute;
    bottom: 0em;
    transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    padding-top: 0.5em;
    text-align: center;
    overflow: auto;
    word-wrap: break-word;
  }

  .property-description p,
  h5 {
    padding: 0 15px;
  }

  .property-image-title {
    text-align: center;
    position: Relative;
    top: 30%;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
    color: black;
    font-size: 1.2em;
  }

  .divElement {
    background: rgba(0, 0, 0, 0.6);
    width: 300px;
    max-height: 500px;
    height: auto;
    color: #fff;
    margin: 15px;
    padding: 15px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
    text-align: center;
  }

  .divTitle {
    width: 100%;
    height: auto;
    padding: 10px 0;
    background: rgba(52, 58, 64);
  }

  .divElement p {
    word-wrap: break-word;
    padding: 0 20px;
  }
}
</style>
