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

var getStatus = function(responseText) {
  var count = responseText.length;
  var criticalCount = (count - responseText.replace(/Critical/g, '').length) / 'Critical'.length;
  var importantCount = (count - responseText.replace(/Important/g, '').length) / 'Important'.length;
  var moderateCount = (count - responseText.replace(/Moderate/g, '').length) / 'Moderate'.length;

  var date = new Date();
  var month = date.getMonth() + 1;
  var lastUpdateMonth = date.getFullYear().toString() + (month < 10 ? '0' + month : month);

  return {
    counts: [criticalCount, importantCount, moderateCount],
    lastUpdateMonth: lastUpdateMonth
  };
};

var setLocalStrage = function(status) {
  localStorage['criticalCount'] = status.counts[0];
  localStorage['importantCount'] = status.counts[1];
  localStorage['moderateCount'] = status.counts[2];
  localStorage['lastUpdateMonth'] = status.lastUpdateMonth;
};

var getSavedStatus = function() {
  var criticalCount = localStorage['criticalCount'] || 0;
  var importantCount = localStorage['importantCount'] || 0;
  var moderateCount = localStorage['moderateCount'] || 0;
  var lastUpdateMonth = localStorage['lastUpdateMonth'] || '0';

  return {
    counts: [criticalCount, importantCount, moderateCount],
    lastUpdateMonth: lastUpdateMonth
  };
};

var equalStatus = function(status1, status2) {
  if (status1.lastUpdateMonth != status2.lastUpdateMonth) {
    for (var i = 0; i < status2.counts.length; i++) {
      if (status2.counts[i] > 0) {
        return false;
      }
    }
    return true;
  }
  for (var i = 0; i < status1.counts.length; i++) {
    if (status1.counts[i] != status2.counts[i]) {
      return false;
    }
  }
  return true;
};

var getData = function() {
  ajax(url, function(responseText) {
    var status = getStatus(responseText);

    if (equalStatus(getSavedStatus(), status)) {
      chrome.browserAction.setBadgeBackgroundColor({color: '#0000ff'});
    } else {
      chrome.browserAction.setBadgeBackgroundColor({color: '#ff0000'});
    }

    setLocalStrage(status);

    chrome.browserAction.setBadgeText({text: (status.counts[0] + status.counts[1]).toString()});
  }, function(statusText) {
    chrome.browserAction.setBadgeText({text: '-'});
    chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 100]});
  });
};

getData();
