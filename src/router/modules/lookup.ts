// 最简代码，也就是这些字段必须有
export default {
  path: "/lookup",
  redirect: "/search/index",
  meta: {
    title: "Lookup",
    icon: "ri:search-line"
  },
  children: [
    {
      path: "/search/index",
      name: "Search",
      component: () => import("@/views/lookup/search/index.vue"),
      meta: {
        title: "Search",
        icon: "ri:search-line"
      }
    },
    {
      path: "/detail/index",
      name: "Detail",
      component: () => import("@/views/lookup/detail/index.vue"),
      meta: {
        title: "Detail",
        showLink: false,
        activePath: "/search/index"
      }
    },
    {
      path: "/match/index",
      name: "Match",
      component: () => import("@/views/lookup/match/index.vue"),
      meta: {
        title: "Match",
        icon: "material-symbols:compare-arrows"
      }
    }
  ]
} as RouteConfigsTable;
