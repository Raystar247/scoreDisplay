function pointSet(){
    var rows = [];
    var table = window0.document.getElementById("table");
    rows.push(table.insertRow(-1));
    var i = 0;
    var cell;
    while(i < nPlayer){
        cell = rows[0].insertCell(-1);
        cell.appendChild(document.createTextNode("0"));
        cell.classList.add('point');
        i ++;
    }
    rows.push(table.insertRow(-1));
    i = 0;
    while (i < nPlayer) {
        cell = rows[1].insertCell(-1);
        cell.appendChild(document.createTextNode("・・"));
        cell.classList.add('counterWrong');
        i ++;        
    }
}