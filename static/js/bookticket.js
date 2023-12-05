//////////////// MATCH TRAIN ////////////////

const trainLink = "../static/json/trainData.json";
const configLink = "../static/json/config.json";    




let trainData, configData;

async function search() {
    // 假設你的 JSON 檔案路徑為 "trainData.json"
    await fetch(trainLink)
        .then(response => response.json())
        .then(data => {
            // 在這裡處理 JSON 數據，例如將數據顯示在網頁上或進行其他操作
            trainData = data;
        })
        .catch(error => {
        console.error('讀取 JSON 檔案時發生錯誤：', error);
        });

    
    await fetch(configLink)
        .then(response => response.json())
        .then(data => {
            // 在這裡處理 JSON 數據，例如將數據顯示在網頁上或進行其他操作
            configData = data;
        })
        .catch(error => {
        console.error('讀取 JSON 檔案時發生錯誤：', error);
        });

    
}
  