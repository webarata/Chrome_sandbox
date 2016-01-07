chrome.contextMenus.create({
  "title": "「%s」をTwitterで検索",
  "type": "normal",
  "contexts": ["selection"],
  "onclick": function(info) {
    var url = 'http://twitter.com/search?q=' + encodeURIComponent(info.selectionText);
    chrome.tabs.create({
      url: url
    });
  }
});
