const buttons = document.querySelectorAll("button[class=b]");
const checkBoxes = document.querySelectorAll("input[name=num]");
const inputY = document.querySelector("input[type=text]");
const SEND_BUTTON = document.querySelector("button[name=send]")
const CLEAR_BUTTON = document.querySelector("button[id=clearing]")
const LEFT_BORDER = -5;
const RIGHT_BORDER = 3;
const table = document.getElementById("results");
let r = null;
let x = null;
let y = null;
const REQ_INT = new RegExp('^-?[0-5]*$')
buttons.forEach(b=>{
    b.addEventListener('click',(e)=>{
      buttons.forEach(b=>
      b.style.color='white')
       b.style.color='red';
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
inputY.addEventListener('input', () => {
    let res = inputY.value
    if (res === "") {
        return;
    }
    if (!REQ_INT.test(res)) {
        inputY.value = "";
        alert(res.concat(" :incorrect Input for y"));
    }
    if (res < LEFT_BORDER || res > RIGHT_BORDER) {
        alert("value ".concat(res).concat(" out of range"));
        inputY.value = "";
    }
    y = inputY.value;
    console.log("y=".concat(y))

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

        $.post("\\scripts\\script.php", {
                x: x,
                y: y,
                r: r,
                currentTime: msToTime(Date.now())
            },
            (result) => {
                let json = JSON.parse(result)

                let row = table.insertRow(1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                cell1.innerHTML = json.boolean;
                cell2.innerHTML = json.request_time;
                cell3.innerHTML =json.response_time;
                cell4.innerHTML =json.x;
                cell5.innerHTML =json.y;
                cell6.innerHTML =json.r;
            }
        )

    }
)


function msToTime(duration) {
    let milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

CLEAR_BUTTON.addEventListener('click',()=>{
    $("#results").find("tr:gt(0)").remove();
})

