import React from 'react';
import styles from './page.module.css';
import Maintenance from './maintenance/page';
const Home = () => {
  return (
    <main>
      <Maintenance />
      {/* <div className={styles.container}>

      </div> */}
    </main>
  );
};

export default Home;