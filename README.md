# OneTab Extension

## Description

OneTab is a browser extension designed to help manage browser tabs efficiently. It consolidates all your open tabs into a single list, reducing memory usage and improving organization. This tool is especially useful for users who handle numerous tabs simultaneously.

## Features

- Efficient tab management.
- Memory usage optimization.
- Easy access to consolidated tabs.
- Shareable and backup-able tab lists.

## Local Setup and Installation

To set up and use OneTab locally:

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed.
- A modern web browser (Chrome, Firefox, Edge).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/svarts/OneTab.git
   ```
2. Navigate to the cloned repository:
```bash
cd OneTab
```
3. Install dependencies:
```bash
pnpm install
```
4. Build the project (assuming this populates the dist folder):
```bash
npm run build
```

### Running Locally

1. Open your browser and navigate to the extensions page (e.g., chrome://extensions for Chrome).
2. Enable 'Developer mode'.
3. Click 'Load unpacked' and select the dist folder from the cloned OneTab repository.
4. The OneTab extension icon should now appear in your browser toolbar.

### Usage

1. Click on the OneTab icon to convert all open tabs into a list within the extension.
2. Click on any item in the list to reopen that tab in the browser.
3. Use the additional features like share, export, or import tabs as needed.

