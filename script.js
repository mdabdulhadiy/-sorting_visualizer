var n = 20;
var arr = [];

generate();

function generate() {
    for (let i = 0; i < n; i++) {
        arr[i] = Math.floor(Math.random() * 100) + 1; 
    }
    showBars();
}

function playSelectionSort() {
    selectionSort();
}

function playBubbleSort() {
    var copy = [...arr];
    var moves = bubbleSort(copy);
    animateBubbleSort(moves);
}

function playInsertionSort(){
    insertionSort();
}

function swap(a, b) {
    let temp = a;
    a = b;
    b = temp;
    return [a, b];
}
async function insertionSort(delay = 300){
    let bars = document.querySelectorAll(".bar");
    for(let i=0; i<n; i++){
        let j=i;
        bars[i].style.backgroundColor = "blue";
        j-1>=0?bars[j-1].style.backgroundColor = "blue":""; 
        await new Promise((resolve) => 
            setTimeout(() => { 
              resolve(); 
            }, 300) 
          ); 
             
        while(j>0 && arr[j-1]>arr[j]){
            bars[j-1].style.backgroundColor = "red";
            bars[j].style.backgroundColor = "red";

            [arr[j-1],arr[j]]=[arr[j],arr[j-1]];
            
             // Swap bar heights
             [bars[j-1].style.height, bars[j].style.height] = [bars[j].style.height, bars[j-1].style.height];
            
             // Swap bar labels
             [bars[j-1].children[0].innerHTML, bars[j].children[0].innerHTML] = [bars[j].children[0].innerHTML, bars[j-1].children[0].innerHTML];
            j-=1;
            await new Promise((resolve) => 
                setTimeout(() => { 
                  resolve(); 
                }, 300) 
              ); 
              for(var k=i;k>=0;k--){ 
                bars[k].style.backgroundColor = "black"; 
            }
        }
        await new Promise((resolve) => 
            setTimeout(() => { 
              resolve(); 
            }, 300) 
          ); 
        // bars[i].style.backgroundColor = "black";
        bars[i].style.backgroundColor = "black";
        j-1>=0?bars[j-1].style.backgroundColor = "black":""; 
        
    }
    for(var k=n-1;k>=0;k--){ 
        bars[k].style.backgroundColor = "green"; 
        await new Promise((resolve) => 
            setTimeout(() => { 
              resolve(); 
            }, 50) 
          ); 
    }
    enable();
}

async function selectionSort(delay = 300) {
    let bars = document.querySelectorAll(".bar");
    for (let i = 0; i < n; i++) {
        bars[i].style.backgroundColor = "blue";
        let min_index = i;
        for (let j = i + 1; j < n; j++) {
            bars[i].style.backgroundColor = "blue";
            bars[j].style.backgroundColor = "red";
            await new Promise(resolve => setTimeout(resolve, delay));
            if (arr[j] < arr[min_index]) {
                bars[min_index].style.backgroundColor = "black";
                min_index = j;
                bars[min_index].style.backgroundColor = "red";
            } else {
                bars[j].style.backgroundColor = "black";
            }
        }
        if (min_index !== i) {
            [arr[i], arr[min_index]] = [arr[min_index], arr[i]];
            
            // Swap bar heights
            [bars[i].style.height, bars[min_index].style.height] = [bars[min_index].style.height, bars[i].style.height];
            
            // Swap bar labels
            [bars[i].children[0].innerHTML, bars[min_index].children[0].innerHTML] = [bars[min_index].children[0].innerHTML, bars[i].children[0].innerHTML];
        }
        
        bars[min_index].style.backgroundColor = "black";
        bars[i].style.backgroundColor = "lightgreen";
        await new Promise(resolve => setTimeout(resolve, delay));
    }
  
    enable();

}

function bubbleSort(copy) {
    var moves = [];
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            moves.push({ indexes: [j, j + 1], type: "comp" });
            if (copy[j] > copy[j + 1]) {
                moves.push({ indexes: [j, j + 1], type: "swap" });
                [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
            }
        }
    }
    return moves;
}

function animateBubbleSort(moves) {
    let bars = document.querySelectorAll(".bar");
    if (moves.length == 0) {
        showBars();
        enable();
        return;
    }

    var move = moves.shift();
    var [i, j] = move.indexes;

    if (move.type == "swap") {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    
        // Swap bar heights
        // [bars[i].style.height, bars[j].style.height] = [bars[j].style.height, bars[i].style.height];
        
        // Swap bar labels
        // [bars[i].children[0].innerHTML, bars[j].children[0].innerHTML] = [bars[j].children[0].innerHTML, bars[i].children[0].innerHTML];
    }

    showBars(move);

    setTimeout(function () {
        animateBubbleSort(moves);
    }, 200);
}

function showBars(move) {
    document.getElementById("container").innerHTML = "";
    for(let i=0; i<arr.length; i++){
        var bar = document.createElement("div");
        let value = arr[i];
        bar.style.height = `${value * 3}px`; 
        bar.classList.add("bar");    
        // To create element "label" 
	    const barLabel = document.createElement("label"); 
        // To add class "bar_id" to "label" 
        barLabel.classList.add("bar_id"); 
        // Assign value to "label" 
        barLabel.style.color="";
        bar.style.textAlign="center";
        barLabel.innerHTML = value; 
        // Append "Label" to "div" 
        bar.appendChild(barLabel);
        if(move && move.indexes.includes(i)){
            bar.style.backgroundColor = move.type=="swap"?"red":"blue";
        }
        document.getElementById("container").appendChild(bar);
        
    }

}

var generatebtn = document.getElementById("generatebtn");
var selectionsortbtn =  document.getElementById("selectionSortbtn");
var bubblesortbtn = document.getElementById("bubblesortbtn");
var insertionsortbtn = document.getElementById("insertionsortbtn");

function disable(){
    
    generatebtn.disabled = true;
    generatebtn.style.backgroundColor = "grey";

    
    selectionsortbtn.disabled = true;
    selectionsortbtn.style.backgroundColor = "grey";

    
    bubblesortbtn.disabled = true;
    bubblesortbtn.style.backgroundColor = "grey";

    insertionsortbtn.disabled = true;
    insertionsortbtn.style.backgroundColor = "grey";
    

}

function enable(){
    generatebtn.disabled = false;
    generatebtn.style.backgroundColor = "green";

    
    selectionsortbtn.disabled = false;
    selectionsortbtn.style.backgroundColor = "green";

    
    bubblesortbtn.disabled = false;
    bubblesortbtn.style.backgroundColor = "green";

    insertionsortbtn.disabled = false;
    insertionsortbtn.style.backgroundColor = "green";
}