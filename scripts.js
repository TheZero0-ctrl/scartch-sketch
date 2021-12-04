
const sketck = document.querySelector('.sketch')
const colorButton = document.querySelector('#color')
const eraseButton = document.querySelector('#erase')
const clearButton = document.querySelector('#clear')
const colorPicker = document.querySelector('#colorPicker')
const sizeValue = document.querySelector('#sizeValue')
const sizeSlider = document.querySelector('#sizeSlider')

let current_color = '#333333'
let current_size = 16

function changeCurrentColor(newColor){
    current_color = newColor
}

function changeCurrentSize(newSize) {
    current_size = newSize
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
  }  

function createGrid(current_size) {   // Create Grid of 16X16
    for (let i = 0; i<current_size; i++) {
        const grid_row = document.createElement('div');
        // grid_row.textContent = 'F';
        grid_row.classList.add('grid-row');
        sketck.appendChild(grid_row);
    };
    
    const gridRowList = document.querySelectorAll('.grid-row')
    gridRowList.forEach(row => {
        for (let j = 0; j<current_size; j++) {
            const grid_column = document.createElement('div')
            // grid_column.textContent = 'F';
            grid_column.classList.add('grid-column');
            row.appendChild(grid_column);
        }
    });
}
function changeSize(value) {
    changeCurrentSize(value)
    updateSizeValue(value)
    sketck.innerHTML = ''
    createGrid(value)
  }

createGrid(current_size)
colorButton.addEventListener('click', function(){
    colorButton.classList.toggle('active');
    eraseButton.classList.remove('active')
    clearButton.classList.remove('active');
})

eraseButton.addEventListener('click', function(){
    eraseButton.classList.toggle('active');
    colorButton.classList.remove('active');
    clearButton.classList.remove('active');
})

clearButton.addEventListener('click', function(){
    clearButton.classList.toggle('active')
    colorButton.classList.remove('active')
    eraseButton.classList.remove('active')
    sketck.innerHTML = ''
    createGrid(current_size)
})

colorPicker.onchange = (e) => changeCurrentColor(e.target.value);
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

function paintGrid(elem, color) {
    if (colorButton.classList[0] == 'active') {
        if (elem.buttons == 1) {
            if (elem.target.classList == 'grid-column') {
                let square = elem.target;
                square.style.backgroundColor = color;
            }
        } else {
            return
        }
    } else if(eraseButton.classList[0] == 'active') {
        if (elem.buttons == 1) {
            if (elem.target.classList == 'grid-column') {
                let square = elem.target;
                square.style.backgroundColor = 'white';
            }
        } else {
            return
        }
    }
}



const gridList = document.querySelectorAll('.grid-column')
gridList.forEach(row => {
    row.addEventListener('mousedown', event =>{ 
        if(event.buttons == 1){        
            window.addEventListener('mouseover', (e) => {
                paintGrid(e, current_color)       
            });
        }
    });
})
