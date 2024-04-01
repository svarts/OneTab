import { useState, useEffect } from 'react';
import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const Popup = () => {
  const [tabs, setTabs] = useState([]);
  const [savedTabs, setSavedTabs] = useState([]);

  useEffect(() => {
    chrome.tabs.query({ currentWindow: true }, function (retrievedTabs) {
      setTabs(retrievedTabs);
    });

    chrome.storage.local.get('savedTabs', result => {
      if (result.savedTabs) {
        setSavedTabs(result.savedTabs);
      }
    });
  }, []);

  const calculateHeightClass = (itemsCount) => {
    const maxHeight = 72;
    const minHeight = 20;
    const heightPerItem = 10;
    let height = minHeight + (itemsCount * heightPerItem);
    height = Math.min(height, maxHeight);
    return `h-${height}`;
  };

  const saveTabs = () => {
    const tabData = tabs.map(tab => ({ url: tab.url, title: tab.title }));
    chrome.storage.local.set({ savedTabs: tabData }, () => {
      tabs.forEach(tab => {
        chrome.tabs.remove(tab.id);
      });
      setTabs([]);
      setSavedTabs(tabData);
    });
  };

  const clearSavedTabs = () => {
    chrome.storage.local.remove('savedTabs', () => {
      setSavedTabs([]);
    });
  };

  const openTab = url => {
    chrome.tabs.create({ url });
  };

  const getFaviconUrl = url => {
    try {
      const { hostname } = new URL(url);
      return `https://www.google.com/s2/favicons?sz=64&domain=${hostname}`;
    } catch {
      return '';
    }
  };

  return (
    <div className="flex items-center justify-center bg-neutral-900 text-white">
      <div className="w-full bg-neutral-900 rounded-lg shadow-xl border border-gray-400 overflow-hidden">
        <header className="flex justify-center items-center p-4 bg-neutral-800">
          <div className="flex flex-grow items-center justify-start">
            <img src="/icon-34.png" className="w-8 h-8" alt="icon" />
            <h1 className="text-white text-lg font-semibold ml-4">OneTab</h1>
          </div>
          <Button
            onClick={saveTabs}
            className="py-2 px-4 bg-lime-500 hover:bg-lime-400 rounded text-sm text-black font-bold">
            Save Tabs
          </Button>
        </header>

        <div className="flex p-4">
          <div className="flex-1 mr-2 w-32">
            <h2 className="text-md font-semibold mb-2">Active Tabs</h2>
            <ScrollArea className={`${calculateHeightClass(tabs.length)} w-32 rounded bg-neutral-800 whitespace-nowrap`}>
              {tabs.map(tab => (
                <li key={tab.id} className="flex items-center border-b border-neutral-600 last:border-b-0 p-2">
                  <img src={getFaviconUrl(tab.url)} alt="Favicon" className="w-4 h-4 mr-2" />
                  <div>{tab.title}</div>
                </li>
              ))}
            </ScrollArea>
          </div>

          <div className="flex-1 ml-2">
            <h2 className="text-md font-semibold mb-2">Saved Tabs</h2>
            <ScrollArea className={`${calculateHeightClass(savedTabs.length)} w-44 rounded bg-neutral-800`}>
              {savedTabs.length > 0 ? (
                savedTabs.map((tab, index) => (
                  <li key={index} className="flex items-center border-b border-neutral-600 last:border-b-0 p-2">
                    <img src={getFaviconUrl(tab.url)} alt="Favicon" className="w-4 h-4 mr-2" />
                    <a href="#" onClick={() => openTab(tab.url)} className="max-w-sm">
                      {tab.title || tab.url}
                    </a>
                  </li>
                ))
              ) : (
                <div className="text-gray-400 italic p-2">No tabs saved.</div>
              )}
            </ScrollArea>
            {savedTabs.length > 0 && (
              <Button
                onClick={clearSavedTabs}
                className="py-2 px-4 bg-rose-900 hover:bg-rose-950 rounded text-sm text-white font-semibold mt-2">
                Clear Saved Tabs
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
