const maxCorrect = 5;
const maxWrong = 2;

function send(){
    Frame.document.getElementsByClassName("sendButton")[0].addEventListener("click",function(){
        console.log("読み込まれました");
        if (nQuestion >= maxQuestion) {
            return;
        }
        window0.document.getElementsByClassName("question")[0].innerText = QdataArray[nQuestion][0];
        window0.document.getElementsByClassName("answer")[0].innerText = QdataArray[nQuestion][1];
        nQuestion ++;
        number_display ++;
        if (nQuestion >= maxQuestion) {
            nQuestion --;
            return;
        }
        Frame.document.getElementsByClassName("Qnumber")[0].innerText = number_display;
        Frame.document.getElementsByClassName("nextQuestion")[0].innerText = QdataArray[nQuestion][0];
        Frame.document.getElementsByClassName("nextAnswer")[0].innerText = QdataArray[nQuestion][1];
    });
    Frame.document.getElementsByClassName("settingQst")[0].addEventListener('click', function(){
        var numQst = Frame.document.getElementsByClassName("Qjump")[0].value;
        console.log(numQst);
        if (numQst - 1 >= maxQuestion || numQst <= 0) {
            return;
        }
        nQuestion = numQst - 1;
        number_display = numQst;
        Frame.document.getElementsByClassName("nextQuestion")[0].innerText = QdataArray[nQuestion][0];
        Frame.document.getElementsByClassName("nextAnswer")[0].innerText = QdataArray[nQuestion][1];
        Frame.document.getElementsByClassName("Qnumber")[0].innerText = numQst;
    });
}

function EventListener(){
    var elementCorrect = Frame.document.getElementsByClassName("correct");
    var elementWrong = Frame.document.getElementsByClassName("wrong");
    for (let i = 0; i < nPlayer; i++) {
        elementCorrect[i].addEventListener('click', function(){
            correctEvent(i);
        });
        elementWrong[i].addEventListener('click', function(){
            wrongEvent(i);
        });
    }
}

function correctEvent(number){
    scoreCorrect[number] ++;
    window0.document.getElementsByClassName("point")[number].innerText = scoreCorrect[number];
}

function wrongEvent(number){
    if (scoreWrong[number] >= maxWrong) {
        return;
    }
    scoreWrong[number] ++;
    var textWrong = window0.document.getElementsByClassName("counterWrong")[number].innerText;
    console.log(textWrong);
    var counter = textWrong.replace('・','×');
    window0.document.getElementsByClassName("counterWrong")[number].innerText = counter;
}