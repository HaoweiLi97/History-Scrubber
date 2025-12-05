# History Zap ⚡️

**History Zap** is a powerful, privacy-focused Chrome Extension that automatically keeps your browser history clean based on your custom keywords. It works in the background to instantly remove specific URLs and close tabs, acting as a selective "Incognito Mode" for the sites you choose.

<p align="center">
  <img src="images/icon128.png" alt="History Zap Icon" width="128"/>
</p>

## ✨ Key Features

* **⚡️ Instant Auto-Zap**: Runs a background service worker that detects and deletes history entries the millisecond you visit a flagged website.
* **🧹 Deep Clean Loop**: A robust manual cleaning mode that recursively scans and deletes historical data (even thousands of entries) until no trace remains.
* **📝 Activity Log**: Keeps a local log of the last 10 actions so you know exactly what was removed and when.
* **🚫 Auto-Close Tabs**: (Optional) Detects and closes open tabs that match your restricted keywords.
* **🔒 100% Private**: No data leaves your browser. Keywords and logs are stored in `chrome.storage.local`. No analytics, no tracking.

## 🚀 Installation

### Option 1: Load Manually (Developer Mode)
Since this project is open source, you can run the latest version directly from the source code:

1.  Clone this repository:
    ```bash
    git clone [https://github.com/HaoweiLi97/history-zap.git](https://github.com/HaoweiLi97/history-zap.git)
    ```
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Toggle **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the folder where you cloned this repository.

### Option 2: Chrome Web Store
*(Coming soon...)*

## 🛠 Usage

1.  **Add Keywords**: Click the extension icon and enter a domain or keyword (e.g., `netflix.com`, `twitter`, `keyword`).
2.  **Auto-Mode**: Just browse the web. If you visit a URL containing any of your keywords, History Zap will:
    * Delete the history entry immediately.
    * Log the action in the "Recent Activity" view.
3.  **Deep Clean**: If you have old history from before you installed the extension, click the red **Deep Clean History Now** button in the popup. It will perform a deep scan and removal process.

## ⚙️ How It Works (Technical)

* **Manifest V3**: Built using the latest Chrome Extension standards for better performance and security.
* **Background Worker (`background.js`)**: Uses `chrome.history.onVisited` to listen for events. This ensures that history is scrubbed *before* it settles into the browser's long-term omnibox suggestions.
* **Recursive Deletion**: The manual scrub function uses a `do...while` loop with batch processing to bypass Chrome's API limits on single-query results, ensuring all records are found.

## 🛡 Privacy & Permissions

This extension requires the following permissions to function:

* `history`: To search for and delete specific URL entries.
* `tabs`: To detect active tabs and close them if they match your blocklist.
* `storage`: To save your keyword preferences and action logs locally on your device.

**Privacy Statement**: We do not collect, store, or transmit your personal data. Everything happens locally on your machine.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.