////////// MATCH TICKETS //////////

// 使用 fetch API 取得 trainData.json
const trainDataLink = "../static/json/trainData.json";
const configLink = "../static/json/config.json";
let ticketsUlContainer = document.querySelector('#tickets');
let startPosition = document.querySelector('.start')
let endPosition = document.querySelector('.end')



async function generateDataObj() {
    let trainsObj = null, configObj = null;

    await fetch(trainDataLink)
    .then(response => response.json())
    .then(trainDataObj => {
        // 在這裡使用 trainDataObj 進行你的操作
        trainsObj = trainDataObj;
        console.log('trainData 讀取成功');
    })
    .catch(error => {
        console.error('發生錯誤:', error);
    });


    await fetch(configLink)
    .then(response => response.json())
    .then(configDataObj => {
        // 在這裡使用 trainDataObj 進行你的操作
        configObj = configDataObj
        console.log('configData 讀取成功');
    })
    .catch(error => {
        console.error('發生錯誤:', error);
    });
    

    return {trainsObj, configObj};
};


function generateTicketLi(trainID, stationStartTime, stationArriveTime) {
    const curLi = `<li>
        <div class="show-time">
            <div class="start-end-time" id="start-time">${stationStartTime}</div>
            <img src="../static/icon/right-arrow.png" alt="right-arrow">
            <div class="start-end-time" id="end-time">${stationArriveTime}</div>
        </div>
        <div class="train-info">
            trainID:&nbsp
            <div id="train-number">
                ${trainID}
            </div>
        </div>
    </li>`
    return curLi;
}


async function updateMyTickets(addTicket) {
    console.log(addTicket);
    await fetch('/updateMyTickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addTicket),
    })
    .then(response => response.json())
    .then(updatedData => {
        console.log('Updated data from server:', updatedData);
    })
    .catch(error => {
        console.error('Error updating MyTickets:', error);
    });
}



(async function matchData() {
    const { trainsObj, configObj } = await generateDataObj();

    startPosition.innerHTML = configObj["startPosition"];
    endPosition.innerHTML = configObj["endPosition"];

    let ticketsDicList = [];

    for(let train of trainsObj["trains"]) {
        let trainID = null, stationStartTime = null, stationArriveTime = null;
        for(let station of train["trainStations"]) {
            if( station["name"] == configObj["startPosition"] && station["time"] >= configObj["startTime"]) {
                stationStartTime = station["time"];
            }

            if( stationStartTime != null ) {
                if( station["name"] == configObj["endPosition"] ) {
                    stationArriveTime = station["time"];
                    trainID = train["trainID"];
                    break;
                }
            }
        }

        if(trainID != null) {
            ticketsDicList.push({
                "trainID" : trainID,
                "stationStartTime" : stationStartTime,
                "stationArriveTime" : stationArriveTime
            });
        }
    }

    
    ticketsDicList.sort(function (a, b) {
        return a.stationStartTime.localeCompare(b.stationStartTime);
    });

    let ticketsList = ""

    for(let i of ticketsDicList) {
        ticketsList += generateTicketLi(i.trainID, i.stationStartTime, i.stationArriveTime);    
    }

    ticketsUlContainer.innerHTML = ticketsList;



    let LiList = ticketsUlContainer.querySelectorAll('li');
    let checkBar = document.querySelector('.bookcheck-container');


    LiList.forEach(element => {
        element.addEventListener('click', () => {
            const startTimeElement = element.querySelector('#start-time');
            const endTimeElement = element.querySelector('#end-time');
            const trainNumberElement = element.querySelector('#train-number');

            // 獲取相應的值
            const stationStartTime = startTimeElement.textContent;
            const stationArriveTime = endTimeElement.textContent;
            const trainID = trainNumberElement.textContent.trim(); // 移除可能的空格
            checkBar.classList.add('is-active');

            $('#cancle').on('click', () => {
                checkBar.classList.remove('is-active');
            });
            
            $('#sure').on('click', () => {
                checkBar.classList.remove('is-active');
                console.log(stationArriveTime);

                updateMyTickets({
                    "startPosition": configObj["startPosition"],
                    "endPosition": configObj["endPosition"],
                    "startTime": stationStartTime,
                    "arriveTime": stationArriveTime,
                    "trainID": trainID
                });
                // window.location.href = '/myTicket';
            });


        })
    });
    
})();
