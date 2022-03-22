/* === VARIABLES === */
const arrayContainer = document.querySelector('[data-array-container]');
const arraySizeInputBox = document.querySelector('[data-array-size]');
let arraySizeInput = document.querySelector('[data-array-size]').value;
const generateNewArrayBtn = document.querySelector('[data-generate-new-array-btn]');
const visualizeBtn = document.querySelector('[data-visualize-btn]');
const select = document.querySelector('[data-select-sorting-algorithm]');
let arr = [];

/* === FUNCTION CALLS === */
generateNewArray();

/* === FUNCTIONS === */
function generateNewArray() {
    for(let i = 0; i < arraySizeInput; i++) {
        arr[i] = Math.floor(Math.random() * 100) + 1;
    }
    generateArrayDivs(false, null);
}

function generateArrayDivs(isSorted, active) {
    let arrayDivHtml = '';
    for(let i = 0; i < arraySizeInput; i++) {
        arrayDivHtml += `<div class="array-item ${isSorted ? "sorted" : ""}  ${active != null && active === i ? "active" : ""}" style="height: ${arr[i]}%; width: calc(100% / ${arraySizeInput} - .1rem);"></div>`;
    }
    arrayContainer.innerHTML = arrayDivHtml;
}

async function bubbleSort() {
    generateArrayDivs(false, 0);
    for(let i = 0; i < arraySizeInput - 1; i++) {
        let isSorted = true;
        for(let j = 0; j < arraySizeInput - 1 - i; j++) {
            if(arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                isSorted = false;
            }
            await sleep(100);
            generateArrayDivs(false, j+1);
        }
        if(isSorted) break;
    }
    generateArrayDivs(true, null);
    visualizeBtn.disabled = false;
    generateNewArrayBtn.disabled = false;
    arraySizeInputBox.disabled = false;
    select.disabled = false;
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

/* === FUNCTIONALITY === */
generateNewArrayBtn.onclick = (e) => {
    e.target.blur();
    generateNewArray();
}
arraySizeInputBox.onkeyup = (e) => {
    arraySizeInput = document.querySelector('[data-array-size]').value;
    if(isNaN(arraySizeInput)) {
        e.target.classList.add('error');
    } else {
        e.target.classList.remove('error');
        generateNewArray();
    }
}
visualizeBtn.onclick = () => {
    visualizeBtn.disabled = true;
    generateNewArrayBtn.disabled = true;
    arraySizeInputBox.disabled = true;
    select.disabled = true;

    if(select.value == "bubblesort") {
        bubbleSort();
    }
}