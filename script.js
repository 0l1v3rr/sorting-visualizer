/* === VARIABLES === */
const arrayContainer = document.querySelector('[data-array-container]');
const arraySizeInputBox = document.querySelector('[data-array-size]');
const generateNewArrayBtn = document.querySelector('[data-generate-new-array-btn]');
const visualizeBtn = document.querySelector('[data-visualize-btn]');
const select = document.querySelector('[data-select-sorting-algorithm]');
const speed = document.querySelector('[data-input-range]');
const speedText = document.querySelector('[data-speed-text]');

let arraySizeInput = document.querySelector('[data-array-size]').value;
let arr = [];
let sleepTime = 100;

/* === FUNCTION CALLS === */
generateNewArray();

/* === FUNCTIONS === */
function generateNewArray() {
    for(let i = 0; i < arraySizeInput; i++) {
        arr[i] = Math.floor(Math.random() * 100) + 1;
    }
    generateArrayDivs(false);
}

function generateArrayDivs(isSorted) {
    let arrayDivHtml = '';
    for(let i = 0; i < arraySizeInput; i++) {
        arrayDivHtml += `<div class="array-item ${isSorted ? "sorted" : ""}" style="height: ${arr[i]}%; width: calc(100% / ${arraySizeInput} - .1rem);"></div>`;
    }
    arrayContainer.innerHTML = arrayDivHtml;
}

function generateArrayDivsForBubbleSort(active) {
    let arrayDivHtml = '';
    for(let i = 0; i < arraySizeInput; i++) {
        arrayDivHtml += `<div class="array-item ${active != null && active === i ? "active" : ""}" style="height: ${arr[i]}%; width: calc(100% / ${arraySizeInput} - .1rem);"></div>`;
    }
    arrayContainer.innerHTML = arrayDivHtml;
}

function generateArrayDivsForSelectionSort(active, checkOne, checkTwo) {
    let arrayDivHtml = '';
    for(let i = 0; i < arraySizeInput; i++) {
        arrayDivHtml += `<div class="array-item ${active != null && active === i ? "active" : ""} ${checkOne === i || checkTwo === i ? "selected" : ""}" style="height: ${arr[i]}%; width: calc(100% / ${arraySizeInput} - .1rem);"></div>`;
    }
    arrayContainer.innerHTML = arrayDivHtml;
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

function sortedArrayHandle() {
    generateArrayDivs(true);
    visualizeBtn.disabled = false;
    generateNewArrayBtn.disabled = false;
    arraySizeInputBox.disabled = false;
    select.disabled = false;
    speed.disabled = false;
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
visualizeBtn.onclick = async () => {
    visualizeBtn.disabled = true;
    generateNewArrayBtn.disabled = true;
    arraySizeInputBox.disabled = true;
    select.disabled = true;
    speed.disabled = true;

    if(select.value == "bubblesort") {
        bubbleSort();
    } else if(select.value == "selectionsort") {
        selectionSort();
    } else if(select.value == "insertionsort") {
        insertionSort();
    } else if(select.value == "quicksort") {
        await quickSort(arr, 0, arraySizeInput - 1);
        sortedArrayHandle();
    } else if(select.value == "heapsort") {
        await heapSort(arr);
        sortedArrayHandle();
    }
}
speed.onchange = () => {
    let value = speed.value;
    if(value == 1) {
        sleepTime = 750;
        speed.classList.add('slow');
        speed.classList.remove('medium');
        speed.classList.remove('fast');
        speedText.innerText = 'Slow';
    } else if(value == 2) {
        sleepTime = 350;
        speed.classList.add('medium');
        speed.classList.remove('slow');
        speed.classList.remove('fast');
        speedText.innerText = 'Medium';
    } else {
        sleepTime = 100;
        speed.classList.add('fast');
        speed.classList.remove('slow');
        speed.classList.remove('medium');
        speedText.innerText = 'Fast';
    }
}

/* === SORTING ALGORITHMS === */

// Bubble Sort
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
            await sleep(sleepTime);
            generateArrayDivsForBubbleSort(j+1);
        }
        if(isSorted) break;
    }
    sortedArrayHandle();
}

// Selection Sort
async function selectionSort() {
    for(let i = 0; i < arraySizeInput - 1; i++) {
        let minIndex = i;

        for(let j = i + 1; j < arraySizeInput; j++) {
            await sleep(sleepTime);
            generateArrayDivsForSelectionSort(null, minIndex, j+1);
            if(arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }

        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;

        await sleep(sleepTime);
        generateArrayDivsForSelectionSort(i, null, null);
    }
    sortedArrayHandle();
}

// Insertion Sort
async function insertionSort() {
    for (let i = 1; i < arraySizeInput; i++) {
        let temp = arr[i];

        let j = i - 1;
        while (j >= 0 && arr[j] > temp) {
            await sleep(sleepTime);
            generateArrayDivsForSelectionSort(null, j, j+1);
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
        await sleep(sleepTime);
        generateArrayDivsForSelectionSort(j+1, null, null);
    }
    sortedArrayHandle();
}

// Quick Sort
async function quickSort(array, low, high) {
    if(array == null) return;
    if(low >= high) return;
    if(array.length < 2) return;

    let pivot = array[high];

    let leftPointer = low, rightPointer = high;

    while(leftPointer < rightPointer) {
        await sleep(sleepTime);
        generateArrayDivsForSelectionSort(null, leftPointer, rightPointer);

        while(array[leftPointer] <= pivot && leftPointer < rightPointer) {
            leftPointer++;
        }
        while(array[rightPointer] >= pivot && leftPointer < rightPointer) {
            rightPointer--;
        }

        let temp = array[leftPointer];
        array[leftPointer] = array[rightPointer];
        array[rightPointer] = temp;
    }
    
    let temp = array[leftPointer];
    array[leftPointer] = array[high];
    array[high] = temp;

    await sleep(sleepTime);
    generateArrayDivsForSelectionSort(high, null, null);

    await quickSort(array, low, leftPointer - 1);
    await quickSort(array, leftPointer + 1, high);
}

// Heap Sort
async function heapSort(array) {
    if(array == null) return;
    if(array.length < 2) return;

    for(let i = arraySizeInput / 2 - 1; i >= 0; i--)
        await heapify(array, arraySizeInput, i);

    for(let i = arraySizeInput - 1; i >= 0; i--) {
        let temp = array[i];
        array[i] = array[0];
        array[0] = temp;

        await sleep(sleepTime);
        generateArrayDivsForSelectionSort(i, null, null);


        await heapify(arr, i, 0);
    }
}

async function heapify(array, n, i) {
    let largest = i;

    let left = 2 * i + 1;
    let right = 2 * i + 2;

    await sleep(sleepTime);
    generateArrayDivsForSelectionSort(null, left, largest);
    if (left < n && array[left] > array[largest]) largest = left;

    await sleep(sleepTime);
    generateArrayDivsForSelectionSort(null, right, largest);
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest != i) {
        let temp = array[i];
        array[i] = arr[largest];
        array[largest] = temp;

        await sleep(sleepTime);
        generateArrayDivsForSelectionSort(i, null, null);

        await heapify(array, n, largest);
    }
}