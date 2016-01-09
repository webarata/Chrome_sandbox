document.getElementById('newUrl').setAttribute('href', url);

document.getElementById('critical').innerText = localStorage['criticalCount'];
document.getElementById('important').innerText = localStorage['importantCount'];
document.getElementById('moderate').innerText = localStorage['moderateCount'];
