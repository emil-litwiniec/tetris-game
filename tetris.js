const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.addEventListener('keydown', e => {
    console.log(e.keyCode);
    switch(e.keyCode) {
        case 37: 
            e.preventDefault();
            moveLeft();
            break;     
        case 38:
        e.preventDefault();
            rotateShape();
            break;
        case 39:
        e.preventDefault();
            moveRight();
            break;
        case 40:
        e.preventDefault();
            moveDown();
            break;
        case 80:
        e.preventDefault();
            toggleOn();
            break;
        case 82: 
        e.preventDefault();
            resetGame();
            break;
    }
})


const tShape = [[[0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]],
                
                [[0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]],

                [[0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]],

                [[0, 1, 0],
                [1, 1, 0],
                [0, 1, 0]],
            
            ];
const lShape = [[[0, 1, 0],
                [0, 1, 0],
                [0, 1, 1]],
                
                [[0, 0, 0],
                [1, 1, 1],
                [1, 0, 0]],

                [[1, 1, 0],
                [0, 1, 0],
                [0, 1, 0]],

                [[0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]],
            
            ];
const jShape = [[[0, 1, 0],
                [0, 1, 0],
                [1, 1, 0]],
                
                [[1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]],

                [[0, 1, 1],
                [0, 1, 0],
                [0, 1, 0]],

                [[0, 0, 0],
                [1, 1, 1],
                [0, 0, 1]],
            
            ];
const zShape = [[[1, 1, 0],
                [, 1, 1],
                [0, 0, 0]],
                
                [[0, 0, 1],
                [0, 1, 1],
                [0, 1, 0]],

                [[0, 0, 0],
                [1, 1, 0],
                [0, 1, 1]],

                [[0, 1, 0],
                [1, 1, 0],
                [1, 0, 0]],
            
            ];
const sShape = [[[0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]],
                
                [[0, 1, 0],
                [0, 1, 1],
                [0, 0, 1]],

                [[0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]],

                [[1, 0, 0],
                [1, 1, 0],
                [0, 1, 0]],
            
            ];
const oShape = [[[0, 0, 0, 0],
                 [0, 1, 1, 0],
                 [0, 1, 1, 0],
                 [0, 0, 0, 0]],

                 [[0, 0, 0, 0],
                 [0, 1, 1, 0],
                 [0, 1, 1, 0],
                 [0, 0, 0, 0]]
                ];
const iShape = [[[0, 1, 0, 0],
                 [0, 1, 0, 0],
                 [0, 1, 0, 0],
                 [0, 1, 0, 0]],
                
                 [[0, 0, 0, 0],
                 [1, 1, 1, 1],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0]]
                ];
xp = yp = 0; // x position, y position
sl = step = 30 // SIDE LENGTH of a single square AND grid step

testMap = [];


const color1 = '#003511';
const color2 = '#00B962';
let shapePosition = [];
let rotatePosition = 0;
let actualShape;
let score = 0;
let highscore = 0;

ctx.beginPath();
ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
ctx.fillStyle = color1;
ctx.fill();


function setActualShape() {
switch (getRandomInt(6)) {
    case 0:
        actualShape = tShape;
        break;
    case 1:
        actualShape = sShape;
        break;
    case 2:
        actualShape = zShape;
        break;
    case 3:
        actualShape = iShape;
        break;
    case 4:
        actualShape = oShape;
        break;
    case 5:
        actualShape = lShape;
        break;
    case 6:
        actualShape = jShape;
        break;
}
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
function createShapeCoords(shape) {
    for (let i = 0; i < shape[rotatePosition].length; i++) {
        for(let j = 0; j < shape[rotatePosition][i].length; j++) {
            if(shape[rotatePosition][i][j]) {
                let arr = [j, i];
                shapePosition.push(arr);
            }
        }
    }
    
}


function centerNewShape() {
    shapePosition.forEach(coords => {
        if(shapePosition.some(coords => coords[1] <= 1)){
        coords[0] = coords[0] + 3;
        }
    });
}


function isGameOver() {
    if(testMap.some(coords => coords[1] === 0)) {
        resetGame();
    }
}

function clearShape() {
    shapePosition.forEach(coords => {
        let x = coords[0] * step;
        let y = coords[1] * step;
        ctx.fillStyle = color1;
        ctx.fillRect(x, y, sl + 1, sl +1);
        ctx.fillStyle = color2;
    })
}
function findDuplicate(arr) {
    const object = {};
    const result = [];

    arr.forEach(item => {
      if(!object[item])
          object[item] = 0;
        object[item] += 1;
    }
    )

    for(const prop in object) {
       if(object[prop] >= 2) {
           result.push(prop);
       }
    }

    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
}



let fakeRotatePosition = rotatePosition;

function simulateBut() {
    let fakeMap = [...testMap];

    let fakePreviousPosition = fakePosition = [...shapePosition];
    fakePosition = [];
    fakeRotatePosition++;
    if(fakeRotatePosition === actualShape.length) {
       fakeRotatePosition = 0;
    }
    function fakeCreateShapeCoords(shape) {
        for (let i = 0; i < shape[fakeRotatePosition].length; i++) {
            for(let j = 0; j < shape[fakeRotatePosition][i].length; j++) {
                if(shape[fakeRotatePosition][i][j]) {
                    let arr = [j, i];
                    fakePosition.push(arr);
                }
            }
        }
        
    }
    function fakeMoveToPreviousPosition(fakePreviousPosition) {
        let previousX = fakePreviousPosition[3][0];
        let previousY = fakePreviousPosition[3][1];
        fakePosition.forEach(coords => {
            coords[0] = coords[0] + previousX - 1;
            coords[1] = coords[1] + previousY - 1;
    
        })
    }
  
    let cont = true;

    fakeCreateShapeCoords(actualShape);
    fakeMoveToPreviousPosition(fakePreviousPosition);

    let ringa = () => {fakePosition.forEach(coords => {
        fakeMap.forEach(mapCoords => {
            
            if((mapCoords[0] == coords[0] && mapCoords[1] == coords[1]) || 
                coords[0] > 9 || coords[0] < 0 ) {
                cont =  false;
            }
        })
    })}
    ringa();
    return cont;
}

function rotateShape() {
    fakeRotatePosition = rotatePosition;
    if(simulateBut()){
    let previousPosition = shapePosition;
    clearShape();
    shapePosition = [];

    rotatePosition++;
    if(rotatePosition === actualShape.length) {
        rotatePosition = 0;
    }
    createShapeCoords(actualShape);
    moveToPreviousPosition(previousPosition);
    shapePosition.forEach(coords => {
        testMap.forEach(mapCoords => {
            if(mapCoords[0] == coords[0] && mapCoords[1] == coords[1]) {
                return false;
                
            }
        })
        return true;
    })
    check();
    
    render(shapePosition);
}
}

function moveToPreviousPosition(previousPosition) {
    let previousX = previousPosition[3][0];
    let previousY = previousPosition[3][1];
    shapePosition.forEach(coords => {
        coords[0] = coords[0] + previousX - 1;
        coords[1] = coords[1] + previousY - 1;

    })
}

let ringa = (direction) => {
    if(direction == 'right') {
        direction = 1;
    } else if (direction == 'left') {
        direction = -1;
    }
    // const left = -1;
    let cont = false;
    shapePosition.forEach(coords => {
    testMap.forEach(mapCoords => {

            if(mapCoords[0] === (coords[0] + direction) && mapCoords[1] === coords[1]) {
            cont = true;
            }
        })

    });

    return cont;
}

function moveRight() {
    clearShape();
    let direction = 'right';
    if(shapePosition.some(coords => coords[0] === 9)) {
        null;
    } else if (ringa(direction)) {
        null;
    } else {
    shapePosition.forEach(coords => {
        
            coords[0] = coords[0] + 1;
    });
    }
    render(shapePosition);
    check();
}

function moveLeft() {
    clearShape();
    let direction = 'left';

    if(shapePosition.some(coords => coords[0] === 0)) {
        null;
    } else if(ringa(direction)){
        null;
    } else {
    shapePosition.forEach(coords => {
        
            coords[0] = coords[0] + -1;
    });
    }

    render(shapePosition);
    check();
}

function moveDown() {
    clearShape();
    shapePosition.forEach(coords => {
         coords[1] = coords[1] + 1;
    });

    render(shapePosition);
    check();
}
function render(coordsArr, color) {
    coordsArr.forEach(coords => {
        let x = coords[0];
        let y = coords[1];
        drawSquare(x, y, color);
        drawDots(x, y);
    });
}
function check() {
    if(shapePosition.some(coords => coords[1] === 19) )
         {  

            saveAndReset();
    } else {
    testMap.forEach(mapCoords => {
        if(shapePosition.some(coords => coords[1] === (mapCoords[1] - 1) && coords[0] === mapCoords[0])){
            
            saveAndReset();

        };
    });
}

    

    function saveAndReset() {
        shapePosition.forEach(coords => testMap.push(coords));
        shapePosition = [];
        render(testMap);
        setActualShape();
        rotatePosition = 0;
        createShapeCoords(actualShape);
        centerNewShape();
        render(shapePosition);
        checkRow();
        isGameOver();
    }

}
let fullRows = [];
function checkRow() {
    fullRows = [];
    let counter = [];
    for(let i = 0; i < 20; i++) {
        testMap.forEach(coords => {
            if (coords[1] === i){
                counter.push(i);
            }
        })
    }
    
    let current = null;
    let cnt = 0;
    for (let i = 0; i < counter.length; i++) {
    if (counter[i] != current) {
        if (cnt > 9) {
            fullRows.push(current);
        }
        current = counter[i];
        cnt = 1;
    } else {
        cnt++;
    }
    }
    if (cnt > 9) {
        fullRows.push(current);
    };

    if (fullRows.length > 0) deleteFullRows();


};

function deleteFullRows() {
    let newMap;
    fullRows.forEach(row => {
        newMap = testMap.filter(coords => coords[1] !== row);
        testMap = newMap;
        testMap.forEach(coords => {
            if(coords[1] < row) {
                coords[1] = coords[1] + 1;
            }
        })
    });
    let scoreMultiplier = fullRows.length * fullRows.length;
    fullRows = [];
    clearCanvas();
    render(shapePosition);
    render(testMap);
    score = score + (250 * scoreMultiplier);
    console.log(`Your score is ${score}.`);
    updateScore();
}

function clearCanvas() {
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = color1;
    ctx.fill();
    ctx.fillStyle = color2;
}

function resetGame() {
    testMap = [];
    shapePosition = [];
    updateHighScore();
    score = 0;
    updateScore();
    clearCanvas();
    setActualShape();
    rotatePosition = 0;
    createShapeCoords(actualShape);
    centerNewShape();
    render(shapePosition);
    checkRow();
}

function drawDots(xp, yp) {
    let cXp = xp * step;
    let cYp = yp * step;
    
   
    // ctx.beginPath();
    ctx.fillStyle = color1;
    ctx.fillRect(cXp, cYp, 4, 4);
    // ctx.fillStyle = color;
    // ctx.closePath();
    
    ctx.beginPath();
    ctx.fillStyle = color1;
    ctx. fillRect(cXp + sl - 4, cYp, 4, 4);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = color1;
    ctx. fillRect(cXp + sl - 4,cYp + sl - 4, 4, 4);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = color1;
    ctx. fillRect(cXp, cYp + sl - 4, 4, 4);
    ctx.closePath();
    ctx.fillStyle = color2;
}

function drawSquare(xp, yp, color) {
    let cXp = xp * step;
    let cYp = yp * step;
    // ctx.beginPath();
    ctx.fillStyle = color;
    ctx. fillRect(cXp, cYp, sl, sl);
   
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = color1;
    ctx.rect(cXp  , cYp , sl  , sl ); 
    ctx.stroke();
    ctx.closePath();
}
check();
setActualShape();
createShapeCoords(actualShape);
render(shapePosition, color2);
render(testMap);

const updateScore = () => {
    let scorePoints = document.querySelector('.score');
    scorePoints.innerText = `score: ${score}`
}

const updateHighScore = () => {
    let highScorePoints = document.querySelector('.highscore');
    if(score > highscore) {
    highscore = score;
    highScorePoints.innerText = `high score: ${highscore}`
    }
}


let intervalId;
let isOn = false;

let toggleOn = () => {
    if(!isOn) {
        play()
    } else {
        stop();
    }
}

let play = () => {
    
    intervalId = setInterval(moveDown, 450);
    updateScore();
    isOn = !isOn;
}
let stop = () =>{ 
    clearInterval(intervalId);
    isOn = !isOn;
};

canvas.addEventListener('click', toggleOn);
