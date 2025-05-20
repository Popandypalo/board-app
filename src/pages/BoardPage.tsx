import React from 'react';
import { BoardWidget } from '@widgets/board';
import { AddCardFab } from '@features/card-add';

const BoardPage = () => {
  return (
    <>
      <BoardWidget />
      <AddCardFab />
    </>
  );
};

export default BoardPage; 