import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

import firebase from "firebase";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from, next) => {
    // Verifica si la ruta requiere estar autenticado
    const rutaAuth = to.matched.some((record) => record.meta.requiresAuth);
    // obtiene la información del perfil del usuario
    // si es null no ha iniciado sesion
    const user = firebase.auth().currentUser;
    console.log(user);
    if (rutaAuth == true && user == null) {
      next({ name: "/" });
    } else {
      next();
    }
    // else next()
  });

  // Router.beforeEach(async (to, from, next) => {
  //   // const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  //   // if (requiresAuth && !(await firebase.getCurrentUser())) {
  //   //   next("signin");
  //   // } else {
  //   //   next();
  //   // }
  // });

  return Router;
});
