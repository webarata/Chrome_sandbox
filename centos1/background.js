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

var getData = function() {
  ajax(url, function(responseText) {
    var count = responseText.length;
    var criticalCount = (count - responseText.replace(/Critical/g, '').length) / 'Critical'.length;
    var importantCount = (count - responseText.replace(/Important/g, '').length) / 'Important'.length;
    var moderateCount = (count - responseText.replace(/Moderate/g, '').length) / 'Moderate'.length;

    localStorage['criticalCount'] = criticalCount;
    localStorage['importantCount'] = importantCount;
    localStorage['moderateCount'] = moderateCount;

    chrome.browserAction.setBadgeText({text: (criticalCount + importantCount).toString()});
    chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 0]});
  }, function(statusText) {
    chrome.browserAction.setBadgeText({text: '-'});
    chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 255, 100]});
  });
};

getData();
