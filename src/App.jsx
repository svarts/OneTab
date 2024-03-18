import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

function App() {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getTabs" }, function(response) {
      setTabs(response.tabs);
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
    <header>
      <div className="p-4">
        <Button onClick={saveTabs} className="uppercase">Save Tabs</Button>
        <ul className="mt-4">
          {tabs.map(tab => (
            <li key={tab.id}>{tab.title}</li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default App;
