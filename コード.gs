// 認証
function authorize() {
  twitter.authorize();
}

// 認証解除
function reset() {
  twitter.reset();
}

// 認証後のコールバック
function authCallback(request) {
  return twitter.authCallback(request);
}

// セルを取得
var sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1"); // 「シート1」はシート名
var lastRow = sheetData.getLastRow(); //最終行
//Logger.log('lastRow=%s',lastRow);
for(i=1;i<lastRow+1;i++){
  if(!sheetData.getRange(i, 2).getValue()){
//    Logger.log('i=%s',i);
    postMessageCell = sheetData.getRange(i, 1); // セルの位置。A列を指定
    sheetData.getRange(i, 2).setValue(true); //送信後はTRUEを立てる
    break;
  }  
}

// ツイートを投稿
function postUpdateStatus() {
//  Logger.log('i=%s',i);
//  Logger.log('lastRow=%s',lastRow);
  if(i!=lastRow+1){
    var service  = twitter.getService();
    var response = service.fetch('https://api.twitter.com/1.1/statuses/update.json', {
      method: 'post',
      payload: { status: postMessageCell.getValue() }
    });
//  Logger.log('aaa');
  }    
}
