const buttons = document.querySelectorAll("button[class=b]");
const checkBoxes = document.querySelectorAll("input[name=num]");
const inputY = document.querySelector("input[type=text]");
const SEND_BUTTON = document.querySelector("button[name=send]")
const LEFT_BORDER = -5;
const RIGHT_BORDER = 3;
let z = null;
let x = null;
let y = null;
const REQ_INT = new RegExp('^-?[0-5]*$')


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
    console.log(y)

})

checkBoxes.forEach(box => {
    box.addEventListener('change', () => {
        box.checked = true;
        checkBoxes.forEach((item) => {
            if (item !== box) item.checked = false
        })
        x = box.value;
        console.log(x)

    })
})
buttons.forEach(b => {
    b.addEventListener('click', () => {
        z = b.value
        console.log(z)

    })
})


SEND_BUTTON.addEventListener('click', () => {
        if (z === null || x === null || y === null) {
            alert("Fill all the data")
            return;
        }

        $.post("\\scripts\\server.php", {
                x: x,
                y: y,
                z: z,
                currentTime: Date.now()
            },
            () => {
                console.log("WE DONE IT")
            }
        )

    }
)





