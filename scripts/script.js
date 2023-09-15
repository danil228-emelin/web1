const buttons = document.querySelectorAll("button[class=b]");
const checkBoxes = document.querySelectorAll("input[name=num]");
const inputY = document.querySelector("input[type=text]");
const SEND_BUTTON = document.querySelector("button[name=send]")
const CLEAR_BUTTON = document.querySelector("button[id=clearing]")
const LEFT_BORDER = -5;
const RIGHT_BORDER = 3;
let table = document.querySelector("table[id=results]");
let r = null;
let x = null;
let y = null;
const MAX_ROWS_SAVED = 50;
window.onbeforeunload = saveTableInLocalStorage
window.addEventListener('load', loadData);

function saveTableInLocalStorage() {
    let data = [];
    if (table.rows.length === 1) {
        console.log("The length of table 1,isn't saved")
        return;
    }
    let rows = table.rows;
    for (let i = 1; i < rows.length && i < MAX_ROWS_SAVED; i++) {
        let inRange = table.rows[i].cells[0].innerHTML
        let requestTime = table.rows[i].cells[1].innerHTML
        let responseTime = table.rows[i].cells[2].innerHTML
        let x = table.rows[i].cells[3].innerHTML
        let y = table.rows[i].cells[4].innerHTML
        let r = table.rows[i].cells[5].innerHTML
        let temp = {inRange: inRange, requestTime: requestTime, responseTime: responseTime, x: x, y: y, r: r}
        data.push(temp);
    }
    window.localStorage.setItem('Table', JSON.stringify(data));
    console.log("Table is saved")
}

function loadData() {
    if (localStorage.getItem('Table') === null) {
        console.log("Table wasn't saved")
        return;
    }
    let data = JSON.parse(localStorage.getItem('Table'));
    for (i = data.length > MAX_ROWS_SAVED ? MAX_ROWS_SAVED - 1 : data.length - 1; i >= 0; i--) {
        let row = table.insertRow(1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        cell1.innerHTML = data[i].inRange
        cell2.innerHTML = data[i].requestTime
        cell3.innerHTML = data[i].responseTime
        cell4.innerHTML = data[i].x
        cell5.innerHTML = data[i].y
        cell6.innerHTML = data[i].r
    }
    console.log("Table is refreshed");
    localStorage.removeItem('Table');
}

buttons.forEach(b => {
    b.addEventListener('click', () => {
        buttons.forEach(b => b.style.color = 'white')
        b.style.color = 'red';
    })
})
addEventListener("load", () => {
    inputY.value = "";
    checkBoxes.forEach(box => {
        box.checked = false;
    })
    r = null;
    x = null;
    y = null;
})
inputY.addEventListener('input', (element) => {
    const isValid = element.target.checkValidity();
    let res = inputY.value
    if (!isValid) {
        return;
    }
    if (res < LEFT_BORDER || res > RIGHT_BORDER) {
        alert(res.concat(" wrong value for y"));
        inputY.value="";
        return;
    }
    y = parseFloat(res);


})

checkBoxes.forEach(box => {
    box.addEventListener('change', () => {
        box.checked = true;
        checkBoxes.forEach((item) => {
            if (item !== box) item.checked = false
        })
        x = box.value;
        console.log("x=".concat(x));

    })
})
buttons.forEach(b => {
    b.addEventListener('click', () => {
        r = b.value
        console.log("r=".concat(r));

    })
})


SEND_BUTTON.addEventListener('click', () => {
    if (r === null) {
        alert("Fill parameter r")
        return;
    }
    if (x === null) {
        alert("Fill parameter x")
        return;
    }
    if (y === null) {
        alert("Fill parameter y")
        return;
    }
    let currentTime = new Date()
        .toLocaleString("ru-RU", {timeZone: "Europe/Moscow", hour: "numeric", minute: "numeric", second: "numeric"})


    $.post("\\scripts\\script.php", {
        x: x, y: y, r: r
    }, (result) => {
        let json = JSON.parse(result)

        let row = table.insertRow(1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        cell1.innerHTML = json.boolean;
        cell2.innerHTML = currentTime
        cell3.innerHTML = json.response_time;
        cell4.innerHTML = json.x;
        cell5.innerHTML = json.y;
        cell6.innerHTML = json.r;
    })

})


CLEAR_BUTTON.addEventListener('click', () => {
    $("#results").find("tr:gt(0)").remove();
})

