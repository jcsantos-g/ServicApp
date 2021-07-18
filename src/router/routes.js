// import firebase from "src/boot/firebase";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        // meta:{requiresAuth:true}
      },
      {
        path: "/chats",
        component: () => import("pages/chats.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

// router.beforeEach((to, from, next) => {
//   const rutaAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const user = app.auth().currenteUser;
//   if (rutaAuth && user == null) {
//     next({ name: "/" });
//   } else {
//     next();
//   }
//   // else next()
// });

export default routes;
