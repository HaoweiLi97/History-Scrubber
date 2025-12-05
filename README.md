History Zap ⚡️
History Zap is a powerful, privacy-focused Chrome Extension that automatically keeps your browser history clean based on your custom keywords. It works in the background to instantly remove specific URLs and close tabs, acting as a selective "Incognito Mode" for the sites you choose.

(Note: Upload your icon to an images folder in your repo to make it show up here)

✨ Key Features
⚡️ Instant Auto-Zap: Runs a background service worker that detects and deletes history entries the millisecond you visit a flagged website.

🧹 Deep Clean Loop: A robust manual cleaning mode that recursively scans and deletes historical data (even thousands of entries) until no trace remains.

🚫 Auto-Close Tabs: Optionally detects and closes open tabs that match your restricted keywords.

📝 Activity Log: Keeps a local log of the last 10 actions so you know exactly what was removed and when.

🔒 100% Private: No data leaves your browser. Keywords and logs are stored in chrome.storage.local. No analytics, no tracking.

🚀 Installation
Option 1: Chrome Web Store
(Add your store link here once approved, e.g., Download from Chrome Web Store)

Option 2: Load Manually (Developer Mode)
If you want to modify the code or run the latest version from GitHub:

Clone this repository:

Bash

git clone https://github.com/HaoweiLi97//history-zap.git
Open Chrome and navigate to chrome://extensions/.

Toggle Developer mode in the top right corner.

Click Load unpacked.

Select the folder where you cloned this repository.

🛠 Usage
Add Keywords: Click the extension icon and enter a domain or keyword (e.g., netflix.com, twitter, keyword).

Auto-Mode: Just browse the web. If you visit a URL containing any of your keywords, History Zap will:

Delete the history entry immediately.

(Optional) Close the tab.

Log the action in the "Recent Activity" view.

Deep Clean: If you have old history from before you installed the extension, click the red Deep Clean History Now button in the popup. It will perform a deep scan and removal process.

⚙️ How It Works (Technical)
Manifest V3: Built using the latest Chrome Extension standards for better performance and security.

Background Worker (background.js): Uses chrome.history.onVisited to listen for events. This ensures that history is scrubbed before it settles into the browser's long-term omnibox suggestions.

Recursive Deletion: The manual scrub function uses a do...while loop with batch processing to bypass Chrome's API limits on single-query results, ensuring all records are found.

🛡 Privacy & Permissions
This extension requires the following permissions to function:

history: To search for and delete specific URL entries.

tabs: To detect active tabs and close them if they match your blocklist.

storage: To save your keyword preferences and action logs locally on your device.

Privacy Statement: We do not collect, store, or transmit your personal data. Everything happens locally on your machine.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📝 License
Distributed under the MIT License. See LICENSE for more information.