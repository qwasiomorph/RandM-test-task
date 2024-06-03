import { Outlet } from "react-router-dom";

import Header from "../widgets/Header/Header";

import styles from "./App.module.scss";

function App() {
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <Outlet />
      </main>
    </>
  );
}

export default App;
