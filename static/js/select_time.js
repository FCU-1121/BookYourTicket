let now = new Date();

let startTime = {
  "Date": now.toISOString().split('T')[0], // 獲取當前日期
  "Time": now.getHours().toString().padStart(2, '0') + ":00" // 獲取當前小時並補零
};

let showTimeContainer = document.querySelector('.time-container');
let selectTImeContainer = document.querySelector('.select-time');
let timeOptionsContainer = document.querySelector("#time");
let showStartTime = document.querySelector('#start-time');
showTimeContainer.addEventListener('click', () => {
  selectTImeContainer.classList.add('is-active');
})


function generateTime() {
  showStartTime.innerHTML = `${startTime["Date"]}\t${startTime["Time"]}`;
  let currentTime = startTime["Time"].split(':')[0];
  let timeList = null;
  for(let i = currentTime; i < 22; i++) {
    timeList += `<option value=${i + ":00"}>${i + ":00"}</option>`
  }
  timeOptionsContainer.innerHTML = timeList;
}

generateTime();



flatpickr("#date", {
    enableTime: false, // 如果需要選擇時間，將此設置為true
    dateFormat: "Y-m-d",
    minDate: "today", // 設定最小日期為今天
    maxDate: "2024-02-29", // 設定最大日期為 2024 年 2 月 29 日
    defaultDate: now // 將日期預設為今天
  });

  function submitForm() {
    selectTImeContainer.classList.remove('is-active');
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    showStartTime.innerHTML = `${date}\t${time}`;
  }