const buttons = document.querySelectorAll("button[class=b]");
const checkBoxes = document.querySelectorAll("input[name=num]");
const inputY = document.querySelector("input[type=text]");
let z;
let x;
let y;
const REQ_INT = new RegExp('^-?[0-5]*$')
inputY.addEventListener('input', () => {
    y = inputY.value
    if (!REQ_INT.test(y)) {
        inputY.value = "";
        alert(y.concat(" :incorrect Input for y"));
    }


})

checkBoxes.forEach(box => {
    box.addEventListener('change', () => {
        box.checked = true;
        checkBoxes.forEach((item) => {
            if (item !== box) item.checked = false
        })
        x = box.value;
    })
})
buttons.forEach(b => {
    b.addEventListener('click', () => {
        z = b.value
    })
})



