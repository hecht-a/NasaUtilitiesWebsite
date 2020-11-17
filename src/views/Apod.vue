<template>
  <div class="imageNasa">
    <h1 class="">
      {{ text }}
      {{ title }}
    </h1>
    <br />
    <div class="infos"></div>
    <div class="image"></div>
    <!-- {{ createApod(href) }} -->
  </div>
</template>

<script>
import axios from "axios";
import removeChilds from "@/functions/removeChilds";
import target from "@/functions/target";

export default {
  name: "Apod",
  components: {},
  data() {
    return {
      text: "Nasa Image of the Day",
      href: `${process.env.VUE_APP_API_URL}apod/website_key`,
      title: ""
    };
  },
  created() {
    document.title = this.$route.meta.title;
    this.createApod(this.href);
  },
  methods: {
    async createApod(url) {
      const { data } = await axios.get(`${url}`);
      const title = this.createTitle();
      const author = this.createAuthor();
      const date = this.createDate();
      const description = this.createDescription();
      const img = data.url.includes("youtube")
        ? this.createVideo()
        : this.createImg();

      title.textContent = `Title: ${data.title}`;
      author.textContent = `Author: ${data.copyright}`;
      date.textContent = `Date: ${new Date(data.date).toLocaleDateString()}`;
      description.textContent = `Description: ${data.explanation}`;
      img.src = data.url;

      img.addEventListener("click", () => {
        this.displayBigImage(data.url, data.title, data.explanation);
      });
    },
    createImg() {
      const div = document.querySelector(".imageNasa > .image");
      const img = document.createElement("img");
      img.classList.add("img");
      const getImg = div.appendChild(img);
      return getImg;
    },
    createVideo() {
      const div = document.querySelector(".imageNasa > .image");
      const iframe = document.createElement("iframe");
      const getIframe = div.appendChild(iframe);
      return getIframe;
    },
    createAuthor() {
      const div = document.querySelector(".imageNasa > .infos");
      const p = document.createElement("p");
      const getP = div.appendChild(p);
      return getP;
    },
    createTitle() {
      const div = document.querySelector(".imageNasa > .infos");
      const h3 = document.createElement("h3");
      const getH3 = div.appendChild(h3);
      return getH3;
    },
    createDate() {
      const div = document.querySelector(".imageNasa > .infos");
      const p = document.createElement("p");
      const getP = div.appendChild(p);
      return getP;
    },
    createDescription() {
      const div = document.querySelector(".imageNasa > .infos");
      const p = document.createElement("p");
      const getP = div.appendChild(p);
      return getP;
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
      pDescription.innerHTML = description;

      target(pDescription);

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
