//////////////// SELECT POSITION ////////////////
const positions = [
    "基隆",
    "台北",
    "桃園",
    "新竹",
    "苗栗",
    "台中",
    "彰化",
    "雲林",
    "嘉義",
    "台南",
    "高雄",
    "屏東",
    "台東",
    "花蓮",
    "宜蘭"
];



let startendPosition = {
    "start-position" : "台北",
    "end-position" : "台南"
};

let selectContainer = document.querySelector('.select-container')
let selectContainerHeight = selectContainer.clientHeight;
let positionsUlContainer = [document.querySelector('.start-position'), document.querySelector('.end-position')];
let showStartEndPosition = [document.querySelector("#start-position"), document.querySelector("#end-position")];
let positionsLiArray = [
    [],
    []
];


function setPositionStyle() {
    for(let i = 0; i < positionsLiArray[0].length; i++) {
        if(positionsLiArray[0][i].innerText == startendPosition['start-position']) {
            positionsLiArray[0][i].classList.add('is-active');
            showStartEndPosition[0].innerHTML = startendPosition['start-position'];
        } else {
            positionsLiArray[0][i].classList.remove('is-active');
        }

        if(positionsLiArray[0][i].innerText == startendPosition['end-position']) {
            positionsLiArray[0][i].classList.add('unenable');
        } else {
            positionsLiArray[0][i].classList.remove('unenable');
        }
    }

    for(let i = 0; i < positionsLiArray[1].length; i++) {
        if(positionsLiArray[1][i].innerText == startendPosition['end-position']) {
            positionsLiArray[1][i].classList.add('is-active');
            showStartEndPosition[1].innerHTML = startendPosition['end-position'];
        } else {
            positionsLiArray[1][i].classList.remove('is-active');
        }

        if(positionsLiArray[1][i].innerText == startendPosition['start-position']) {
            positionsLiArray[1][i].classList.add('unenable');
        } else {
            positionsLiArray[1][i].classList.remove('unenable');
        }
    }
}

function generatePosition() {
    let positionLiList = "";
    for(let position of positions) {
        positionLiList += (`<li>${position}</li>`);
    }

    positionsUlContainer[0].innerHTML = positionLiList;
    positionsUlContainer[1].innerHTML = positionLiList;

    for(let i = 0; i < positionsUlContainer.length; i++) {
        positionsLiArray[i] = positionsUlContainer[i].querySelectorAll('li');
    }
    setPositionStyle();
}

generatePosition();


//////////////////////////////////////////////////////////////////////////////


let showPosition = document.querySelectorAll('.show-position');

showPosition.forEach(element => {
    element.addEventListener('click', () => {
        selectContainer.classList.add('is-active');
    })
});

function removeClass() {
    selectContainer.classList.remove('is-active');
    updatePositionOfData();
}

function updatePositionOfData() {
    fetch('/updateConfigOfPosition', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(startendPosition),
    })
    .then(response => response.json())
    .then(updatedData => {
        console.log('Updated data from server:', updatedData);
    })
    .catch(error => {
        console.error('Error updating start time:', error);
    });
}


for(let i = 0; i < positionsLiArray.length; i++) {
    for(let j = 0; j < positionsLiArray[i].length; j++) {
        positionsLiArray[i][j].addEventListener('click', () => {
            let updateKey = (i == 0 ? "start-position" : "end-position");
            let checkkey = (i == 1 ? "start-position" : "end-position");
            if(startendPosition[checkkey] != positionsLiArray[i][j].innerText) {
                startendPosition[updateKey] = positionsLiArray[i][j].innerText;
                setPositionStyle();
            }
        });
    }
}

//////////////// SWAP ////////////////

function swap() {
    let temp = startendPosition["start-position"];
    startendPosition["start-position"] = startendPosition["end-position"];
    startendPosition["end-position"] = temp;
    setPositionStyle();
    updatePositionOfData();
}

document.querySelector('#search').addEventListener('click', () => {
    updatePositionOfData();
})