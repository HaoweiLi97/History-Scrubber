// popup.js

document.addEventListener('DOMContentLoaded', () => {
    loadKeywords();
    loadLogs(); // 新增：加载日志
  });
  
  document.getElementById('addBtn').addEventListener('click', addKeyword);
  document.getElementById('scrubBtn').addEventListener('click', scrubHistory);
  document.getElementById('newKeyword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addKeyword();
  });
  
  // 新增：清除日志按钮事件
  document.getElementById('clearLogs').addEventListener('click', () => {
    chrome.storage.local.set({ actionLogs: [] }, loadLogs);
  });
  
  // --- 原有的 loadKeywords, addKeyword, removeKeyword, renderList 保持不变 ---
  // (请保留你之前的这些函数)
  function loadKeywords() {
    chrome.storage.local.get(['scrubList'], function(result) {
      renderList(result.scrubList || []);
    });
  }
  
  function addKeyword() {
    const input = document.getElementById('newKeyword');
    const value = input.value.trim();
    if (!value) return;
    chrome.storage.local.get(['scrubList'], function(result) {
      const list = result.scrubList || [];
      if (!list.includes(value)) {
        list.push(value);
        chrome.storage.local.set({ scrubList: list }, function() {
          renderList(list);
          input.value = '';
        });
      }
    });
  }
  
  function removeKeyword(keywordToRemove) {
    chrome.storage.local.get(['scrubList'], function(result) {
      let list = result.scrubList || [];
      list = list.filter(item => item !== keywordToRemove);
      chrome.storage.local.set({ scrubList: list }, function() {
        renderList(list);
      });
    });
  }
  
  function renderList(list) {
    const ul = document.getElementById('keywordList');
    ul.innerHTML = '';
    if (list.length === 0) {
      ul.innerHTML = '<li style="justify-content:center; color:#999;">No keywords set</li>';
      return;
    }
    list.forEach(keyword => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${keyword}</span><span class="remove-item">×</span>`;
      li.querySelector('.remove-item').onclick = () => removeKeyword(keyword);
      ul.appendChild(li);
    });
  }
  
  // --- 新增：Log 处理函数 ---
  
  function loadLogs() {
    chrome.storage.local.get(['actionLogs'], function(result) {
      const logs = result.actionLogs || [];
      const container = document.getElementById('logContainer');
      container.innerHTML = '';
  
      if (logs.length === 0) {
        container.innerHTML = '<div class="empty-state">No recent history scrubbed.</div>';
        return;
      }
  
      logs.forEach(log => {
        const div = document.createElement('div');
        div.className = 'log-item';
        
        // 限制 URL 长度，太长显示不美观
        const displayUrl = log.url.length > 40 ? log.url.substring(0, 40) + '...' : log.url;
  
        div.innerHTML = `
          <span class="log-time">${log.time}</span>
          <span class="log-url" title="${log.url}">Deleted: ${displayUrl}</span>
        `;
        container.appendChild(div);
      });
    });
  }
  
 

  // popup.js - 修复版 scrubHistory

async function scrubHistory() {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = "Initializing Deep Clean...";
    statusDiv.style.color = "#d32f2f"; // 使用红色表示正在进行危险操作
  
    // 1. 获取关键词列表
    const getList = () => new Promise(resolve => {
      chrome.storage.local.get(['scrubList'], result => resolve(result.scrubList || []));
    });
  
    const list = await getList();
  
    if (list.length === 0) {
      statusDiv.textContent = "List is empty!";
      statusDiv.style.color = "#333";
      return;
    }
  
    let totalDeleted = 0;
  
    // 2. 逐个关键词进行“循环清洗”
    for (const keyword of list) {
      let hasMore = true;
      
      // 只要能搜到结果，就一直循环删
      while (hasMore) {
        // 每次只取 1000 条，保证稳定性，避免浏览器卡死
        const results = await chrome.history.search({ 
          text: keyword, 
          startTime: 0, 
          maxResults: 1000 
        });
  
        if (results.length === 0) {
          hasMore = false; // 没结果了，跳出循环，处理下一个关键词
        } else {
          // 更新 UI 状态，让用户知道还在工作
          statusDiv.textContent = `Scrubbing "${keyword}"... (${totalDeleted} deleted)`;
          
          // 并行删除这一批
          const deletePromises = results.map(page => chrome.history.deleteUrl({ url: page.url }));
          await Promise.all(deletePromises);
          
          totalDeleted += results.length;
          
          // 重要：稍微暂停 10ms，给 Chrome 数据库一点喘息时间，防止 API 拥堵
          await new Promise(r => setTimeout(r, 10)); 
        }
      }
    }
  
    // 3. (可选) 关闭相关标签页
    // 如果你在 manifest 中有 "tabs" 权限，可以取消下面的注释
    /*
    if (chrome.tabs) {
      const tabs = await chrome.tabs.query({});
      const tabsToClose = tabs.filter(t => list.some(k => t.url && t.url.includes(k)));
      if (tabsToClose.length > 0) {
        await Promise.all(tabsToClose.map(t => chrome.tabs.remove(t.id)));
      }
    }
    */
  
    // 4. 完成
    statusDiv.textContent = `Deep Clean Complete! Removed ${totalDeleted} items.`;
    statusDiv.style.color = "green";
  
    // 3秒后清空状态文字
    setTimeout(() => {
      statusDiv.textContent = "";
    }, 3000);
  }