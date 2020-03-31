var n = 0, m= 0;
var window0;
var nPlayer, nQuestion;
var filename;
var dataArray, QdataArray;
var opeFrame;
var data, Qdata;
var FrameDocument;
const body = document.getElementsByTagName('BODY')[0];
var element_file = document.getElementById('file');
var question_file = document.getElementById('Qfile');
var scoreCorrect, scoreWrong;
var Frame;
var number_display;
var maxQuestion;
makeArray();
QfileArray();

function removeAllElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

function setting_n(){
    aim();
    iFrame_scan();
    scan();
}

function makeArray(){
    element_file.addEventListener("change" , function(e){
        if(!(element_file.value)) return;
        if (n > 0) {
            return;
        }
        var file_list = element_file.files;
        if(!file_list) return;
        var file = file_list[0];
        if(!file) return;
        var file_reader = new FileReader();
        file_reader.onload = function(e){
            data = file_reader.result;
            console.log(data);
        };
        file_reader.readAsText(file);
        n ++;
    });
}
function QfileArray(){
    question_file.addEventListener("change" , function(e){
        if(!(question_file.value)) return;
        if (m > 0) {
            return;
        }
        var file_list = question_file.files;
        if(!file_list) return;
        var file = file_list[0];
        if(!file) return;
        var file_reader = new FileReader();
        file_reader.onload = function(e){
            Qdata = file_reader.result;
            console.log(Qdata);
        };
        file_reader.readAsText(file);
        m ++;
    });
}

function convertCSVtoArray(str){
    var result = [];
    var tmp = str.split("\n"); //改行文字を区切りとして 配列の生成
    var i = 0;
    while(i < tmp.length){
        result[i] = tmp[i].split(","); //コンマを区切りとして配列を生成
        i ++;
    }
    return result;
}

function aim(){
    dataArray = convertCSVtoArray(data);
    QdataArray = convertCSVtoArray(Qdata);
    maxQuestion = QdataArray.length;
    console.log(maxQuestion);
    console.log(QdataArray);
    console.log(dataArray);
    nPlayer = dataArray[0].length;
}

function makeTable(data, tableId){
    // 表の作成開始
    var rows=[];
    var table = document.createElement("table");
    table.id = 'table';
    // 表に2次元配列の要素を格納
    for(i = 0; i < data.length; i++){
        rows.push(table.insertRow(-1));  // 行の追加
        for(j = 0; j < data[0].length; j++){
            var cell=rows[i].insertCell(-1);
            if (i != 2) {
                cell.appendChild(document.createTextNode(data[i][j]));
            }
            // クラスの設定
            if(i==0){
                cell.classList.add('rank');
            }else if(i == 1){
                cell.classList.add('school');
            }else if(i == 2){
                cell.classList.add('outer_person');
                cell.style.verticalAlign = "top";
                var spanName = document.createElement("span");
                spanName.classList.add('person');
                spanName.appendChild(document.createTextNode(data[i][j]));
                cell.appendChild(spanName);
            }else if(i == 3){
                cell.classList.add('point');
            }
        }
    }
    // 指定したdiv要素に表を加える
    tableId.appendChild(table);
}

function scan(){
    window0 = window.open("display.html","1R");
    window0.onload = () => {
        makeTable(dataArray,window0.document.getElementById("scoreboard"));
        pointSet();
    }
}

// 操作盤を開き、表を作成する
function iFrame_scan () {
    opeFrame = document.createElement("iframe");
    opeFrame.src = "../html/opeboard.html";
    removeAllElement(body);
    body.appendChild(opeFrame);
    opeFrame.onload = () => {
        Frame = document.getElementsByTagName('iframe')[0].contentWindow;
        var playerTable = Frame.document.getElementById("operation_player");
        Frame.document.getElementsByClassName("nextQuestion")[0].innerText = QdataArray[0][0];
        Frame.document.getElementsByClassName("nextAnswer")[0].innerText = QdataArray[0][1];
        nQuestion = 0;
        number_display = 1;
        Frame.document.getElementsByClassName("Qnumber")[0].innerText = number_display;
        console.log(playerTable);
        makeTable_operation(dataArray[2],playerTable);
        operation();
    }
}

function makeTable_operation(data, tableId){
    // 表の作成開始
    var rows=[];
    var table = document.createElement("table");
    // 表に2次元配列の要素を格納
    for(i = 0; i < 3; i++){
        rows.push(table.insertRow(-1));  // 行の追加
        for(j = 0; j < data.length; j++){
            var cell=rows[i].insertCell(-1);
            if(i==1){
                var button = document.createElement('input');
                button.classList.add('correct');
                button.value = "○";
                button.type = "button";
                cell.appendChild(button);
            }else if(i == 2){
                var button = document.createElement('input');
                button.classList.add('wrong');
                button.value = "×";
                button.type = "button";
                cell.appendChild(button);
            }else if(i == 0){
                cell.classList.add('outer_person');
                cell.style.verticalAlign = "top";
                var spanName = document.createElement("span");
                spanName.classList.add('person');
                spanName.appendChild(document.createTextNode(data[j]));
                cell.appendChild(spanName);
            }else if(i == 3){
                cell.classList.add('point');
            }
        }
    }
    // 指定したdiv要素に表を加える
    console.log(tableId);
    tableId.appendChild(table);   
}

function operation(){
    scoreCorrect = new Array(nPlayer);
    scoreWrong = new Array(nPlayer);
    var i = 0;
    while (i < nPlayer) {
        scoreCorrect[i] = 0;
        scoreWrong[i] = 0;
        i ++;
    }
    send();
    EventListener();
}