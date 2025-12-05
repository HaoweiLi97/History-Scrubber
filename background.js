// background.js

chrome.history.onVisited.addListener(async (historyItem) => {
    const result = await chrome.storage.local.get(['scrubList', 'actionLogs']);
    const list = result.scrubList || [];
    let logs = result.actionLogs || [];
  
    if (list.length === 0 || !historyItem.url) return;
  
    const shouldDelete = list.some(keyword => historyItem.url.includes(keyword));
  
    if (shouldDelete) {
      // 1. 执行删除
      await chrome.history.deleteUrl({ url: historyItem.url });
      console.log(`Auto-deleted: ${historyItem.url}`);
  
      // 2. 记录日志 (只保留最新的10条)
      const newLog = {
        time: new Date().toLocaleString(), // 包含日期和时间
        url: historyItem.url
      };
  
      logs.unshift(newLog); // 加到开头
      if (logs.length > 10) {
        logs = logs.slice(0, 10); // 截取前10条
      }
  
      // 3. 保存回 Storage
      await chrome.storage.local.set({ actionLogs: logs });
    }
  });