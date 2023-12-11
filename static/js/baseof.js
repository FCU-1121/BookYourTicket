const notification = ['../static/icon/bell.png', '../static/icon/notification.png'];
let notificationContainer = document.querySelector('#notification');
function generateNotification(status) {
    let notificationFather = `<img src="${notification[status]}" alt="notification">`;
    notificationContainer.innerHTML = notificationFather;
}

generateNotification(0);




