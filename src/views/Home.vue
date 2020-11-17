<template>
  <div class="home">
    <div class="inspace">
      <p class="number">There are {{ nbrAstros }} astronauts in space.</p>
      <ul></ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      nbrAstros: ""
    };
  },
  created() {
    document.title = this?.$route.meta.title;
  },
  async mounted() {
    const { data } = await axios.get("http://api.open-notify.org/astros.json");
    this.nbrAstros = data.number;
    const people = data.people;

    const ul = document.querySelector(".inspace > ul");
    people.forEach(astro => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `https://wikipedia.org/wiki/${astro.name}`;
      a.textContent = astro.name;

      li.appendChild(a);
      ul.appendChild(li);
    });
  }
};
</script>
