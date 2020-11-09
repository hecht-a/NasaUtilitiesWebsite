<template>
  <title>Image of the Day</title>
  <div class="imageNasa">
    <h1 class="">
      {{ text }}
    </h1>
    <br />
    {{ createApod(href) }}
    <div class="infos"></div>
    <div class="image"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Apod",
  components: {},
  data() {
    return {
      text: "Nasa Image of the Day",
      href: `${process.env.VUE_APP_API_URL}apod/website_key`
    };
  },
  created() {
    document.title = this.$route.meta.title;
  },
  methods: {
    createApod(url) {
      axios.get(`${url}`).then(resp => {
        Promise.resolve(resp).then(urlResolved => {
          const title = this.createTitle();
          const author = this.createAuthor();
          const date = this.createDate();
          const description = this.createDescription();
          const img = urlResolved.data.url.includes("youtube")
            ? this.createVideo()
            : this.createImg();

          title.textContent = `Title: ${urlResolved.data.title}`;
          author.textContent = `Author: ${urlResolved.data.copyright}`;
          date.textContent = `Date: ${new Date(
            urlResolved.data.date
          ).toLocaleDateString()}`;
          description.textContent = `Description: ${urlResolved.data.explanation}`;
          img.src = urlResolved.data.url;
        });
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
    }
  }
};
</script>
