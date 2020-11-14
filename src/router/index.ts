import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Apod from "../views/Apod.vue";
import Search from "../views/Search.vue";
import ISSPos from "../views/ISSPos.vue";
import SpaceX from "../views/SpaceX.vue";
import Error404 from "../views/Error404.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: ["/home"],
    name: "Home",
    meta: {
      title: "Home"
    },
    component: Home
  },
  {
    path: "/apod",
    name: "Apod",
    meta: {
      title: "Nasa Image of the Day"
    },
    component: Apod
  },
  {
    path: "/search",
    name: "Search",
    meta: {
      title: "Search images"
    },
    component: Search
  },
  {
    path: "/isspos",
    name: "ISSPos",
    meta: {
      title: "ISS Position"
    },
    component: ISSPos
  },
  {
    path: "/spacex",
    name: "SpaceX",
    meta: {
      title: "Upcoming Launches"
    },
    component: SpaceX
  },
  {
    path: "/404",
    name: "Error404",
    meta: {
      title: "Error 404"
    },
    component: Error404
  }
];

const arrayRoute: Array<string> = [];

routes.forEach((route: RouteRecordRaw) => {
  arrayRoute.push(route.path);
  if (!route.alias) {
    return;
  }
  if (typeof route.alias === "object") {
    route.alias.forEach((alias: string) => {
      arrayRoute.push(alias);
    });
  } else {
    arrayRoute.push(route.alias);
  }
});

if (!arrayRoute.includes(window.location.pathname)) {
  window.location.href = `${window.location.origin}/404`;
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
