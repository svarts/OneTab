import React from 'react';
import '@pages/newtab/Newtab.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Newtab = () => {
  return (
    <div className="bg-zinc-900 h-screen flex items-center justify-center">
      <div className="flex items-center">
        <img src="/icon-34.png" alt="icon" className="h-10 mr-4" />
        <h1 className="text-white text-lg font-semibold">OneTab</h1>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
