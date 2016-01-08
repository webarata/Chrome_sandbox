var ajax = function(url, doneCallBack, failCallBack) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        doneCallBack(xhr.responseText);
      } else {
        failCallBack(xhr.statusText)
      }
    }
  };
  xhr.onerror = function(e) {
    failCallback(xhr.statusText);
  };

  xhr.open('GET', url, true);
  xhr.send();
};

ajax('https://lists.centos.org/pipermail/centos-announce/', function(responseText) {
  chrome.browserAction.setBadgeText({ text: '1111' });
  console.log(responseText);
}, function(statusText) {
  chrome.browserAction.setBadgeText({ text: '?' });
});

