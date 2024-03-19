import React, { useState, useEffect } from 'react';
import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Popup = () => {
  const [tabs, setTabs] = useState([]);
  const theme = useStorage(exampleThemeStorage);

  useEffect(() => {
    chrome.tabs.query({ currentWindow: true }, function (retrievedTabs) {
      setTabs(retrievedTabs);
    });
  }, []);

  const saveTabs = () => {
    const tabUrls = tabs.map(tab => tab.url);
    chrome.storage.local.set({ savedTabs: tabUrls }, () => {
      tabs.forEach(tab => {
        chrome.tabs.remove(tab.id);
      });
      setTabs([]);
    });
  };

  return (
    <div
      className="App rounded-full"
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#000',
        borderRadius: '10px',
      }}>
      <header className="App-header" style={{ color: theme === 'light' ? '#000' : '#fff' }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/popup/Popup.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme === 'light' ? '#0281dc' : '#fff', marginBottom: '10px' }}>
          Learn React
        </a>
        <button
          style={{
            backgroundColor: theme === 'light' ? '#fff' : '#000',
            color: theme === 'light' ? '#000' : '#fff',
          }}
          onClick={saveTabs}>
          Save All Tabs
        </button>
        <ul>
          {tabs.map(tab => (
            <li key={tab.id}>{tab.title}</li>
          ))}
        </ul>

      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
