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

var getCounts = function() {
  var criticalCount = localStorage['criticalCount'] || 0;
  var importantCount = localStorage['importantCount'] || 0;
  var moderateCount = localStorage['moderateCount'] || 0;
  return [criticalCount, importantCount, moderateCount];
};

var compare = function(counts1, counts2) {
  for (var i = 0; i < counts1.length; i++) {
    if (counts1[i] != counts2[i]) {
      return false;
    }
  }
  return true;
};

var getData = function() {
  ajax(url, function(responseText) {
    var count = responseText.length;
    var criticalCount = (count - responseText.replace(/Critical/g, '').length) / 'Critical'.length;
    var importantCount = (count - responseText.replace(/Important/g, '').length) / 'Important'.length;
    var moderateCount = (count - responseText.replace(/Moderate/g, '').length) / 'Moderate'.length;

    if (compare(getCounts(), [criticalCount, importantCount, moderateCount])) {
      chrome.browserAction.setBadgeBackgroundColor({color: '#0000ff'});
    } else {
      chrome.browserAction.setBadgeBackgroundColor({color: '#ff0000'});
    }

    localStorage['criticalCount'] = criticalCount;
    localStorage['importantCount'] = importantCount;
    localStorage['moderateCount'] = moderateCount;

    chrome.browserAction.setBadgeText({text: (criticalCount + importantCount).toString()});
  }, function(statusText) {
    chrome.browserAction.setBadgeText({text: '-'});
    chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 100]});
  });
};

getData();
