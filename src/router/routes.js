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
      {
        path: "/perfil",
        component: () => import("pages/perfil.vue"),
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

export default routes;
