var MONTH_NAME = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// 当日から、検索するURLを決定する
var today = new Date();
var dateUrl = today.getFullYear() + '-' + MONTH_NAME[today.getMonth()] + '/date.html';
var url = 'https://lists.centos.org/pipermail/centos-announce/' + dateUrl;
