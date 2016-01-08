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

var MONTH_NAME = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var date = new Date();
var dateUrl = date.getFullYear() + '-' + MONTH_NAME[date.getMonth()] + '/date.html';

dateUrl = '2015-December/date.html';

ajax('https://lists.centos.org/pipermail/centos-announce/' + dateUrl, function(responseText) {
  var count = responseText.length;
  var criticalCount =  (count - responseText.replace(/Critical/g, '').length) / 'Critical'.length;
  var importantCount =  (count - responseText.replace(/Important/g, '').length) / 'Important'.length;
  var moderateCount =  (count - responseText.replace(/Moderate/g, '').length) / 'Moderate'.length;


  chrome.browserAction.setBadgeText({ text:  (criticalCount + importantCount).toString() });
  chrome.browserAction.setBadgeBackgroundColor({ color:[255, 0, 0, 0] });
}, function(statusText) {
  chrome.browserAction.setBadgeText({ text: '-' });
  chrome.browserAction.setBadgeBackgroundColor({ color:[0, 0, 255, 100] });
});

