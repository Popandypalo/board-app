import React from 'react';
import { BoardPage } from './pages';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.app__container}>
        <BoardPage />
      </div>
    </div>
  );
};

export default App;
