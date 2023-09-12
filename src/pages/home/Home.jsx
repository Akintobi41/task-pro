import { useState } from "react";
import s from "./s_home.module.css";

const Home = () => {
  const [loading, isLoading] = useState(false);
  console.log(loading);

  return (
    <section className={s.home}>
      <section className={`${isLoading ? s.show : s.hide}`}>
        <div className={s["lds-ellipsis"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </section>
  );
};

export default Home;
