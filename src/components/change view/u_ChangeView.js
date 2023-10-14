// import s from './s_ChangeView.module.css'
export const gridType = (grid, toggle, s) => [
  {
    id: 1,
    class: `${s.views} ${grid ? s["v-list"] : ""} ${toggle && grid ? s.dark : ""
      }`,
    value: true,
    src1: "/Images/icons8-grid-50 white.png",
    alt1: "grid-icon",
    className1: `${s.list}`,
    src2: "/Images/icons8-grid-50.png",
    alt2: "grid-icon",
    className2: `${s.list}`,
  },
  {
    id: 2,
    class: `${s.views} ${grid ? "" : s["v-grid"]} ${s.v} ${toggle && !grid ? s.dark : ""
      }`,
    value: false,
    src1: "/Images/icons8-list-white.png",
    alt1: "list-icon",
    className1: `${s.list}`,
    src2: "/Images/icons8-list-30.png",
    alt2: "list icon",
    className2: `${s.list}`,
  },
];
