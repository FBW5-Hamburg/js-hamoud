// At the first the declaration of the elements (tank ,paling, etc..) inside tow layer
// we have tow layer first one for tank and background
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d");
// second layer for another elements 
const layer1 = document.querySelector('#layer1')
const ctx1 = layer1.getContext("2d");
// third layer for another elements 
const layer2 = document.querySelector('#layer2')
const ctx2 = layer2.getContext("2d");

const tank = document.createElement('img')
const tankFire = document.createElement('img')
const tank_triggered = document.createElement('img')
const paling = document.createElement('img')

// those variables control the hol game 
let player_lives = 3;
let score = 0;
let status = 'tankMoving'

// those to give the game movement 
let tankX = 460
let tank_triggeredY = 0
let palingY = 1000

// the controllers keys (right ,left ,fire)
let right_pressed = false;
let left_pressed = false;
let space_pressed = false;

// writing the game score
ctx1.fillStyle = 'rgba(0,0,0,50)'
ctx1.fillRect(20, 50, 180, 50)
ctx2.font = "30px Verdana";
var gradient = ctx1.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop("0", " magenta");
gradient.addColorStop("0.4", "blue");
gradient.addColorStop("0.1", "red");
// Fill with gradient
ctx2.fillStyle = gradient;
ctx2.fillStyle = 'font-weight:bold';
setInterval(() => {
    ctx2.clearRect(0, 0, 500, 200)
    ctx2.fillText("SCORE: " + score, 20, 40);
}, 100);


let shells = []
document.addEventListener("keydown", KeyDownFunc, false);
document.addEventListener("keyup", KeyUpFunc, false);

function KeyDownFunc(e) {
    if (tankX < 800 && e.keyCode == 39) {
        right_pressed = true;

    } else if (tankX > 80 && e.keyCode == 37) {
        left_pressed = true;
    } else if (e.keyCode == 32) {
        space_pressed = true;
    }
}

function KeyUpFunc(e) {
    if (e.keyCode == 39) {
        right_pressed = false;
    } else if (e.keyCode == 37) {
        left_pressed = false;
    } else if (e.keyCode == 32) {
        space_pressed = false;
    }
}
setInterval(() => {
    if (tankX > 60 && left_pressed) {
        tankX -= 10
    }
    if (tankX < 820 && right_pressed) {
        tankX += 10
    }
    if (space_pressed) {
        generateShell(tankX + 57)
        setTimeout(() => {
            status = 'tankMoving'
        }, 100);
        status = 'tankFire'
    }
}, 50);


// links of created images
paling.src = './images/paling.png'
tank.src = './images/tankMoving.png'
tankFire.src = './images/tankFire.png'

// moving the tank and fire and moving the palings in this interval
tank.onload = () => {
    setInterval(() => {
        ctx.clearRect(10, 0, 80, 800)
        ctx.clearRect(920, 0, 80, 800)
        ctx.drawImage(paling, 0, palingY, 80, palingY + 2000, 25, 0, 50, 700)
        ctx.drawImage(paling, 0, palingY, 80, palingY + 2000, 920, 0, 50, 700)
        if (palingY <= 500) {
            palingY = 1000
        } else {
            palingY -= 30
        }
        ctx.clearRect(80, 550, 840, 190)
        if (status == 'tankMoving') {
            ctx.drawImage(tank, tankX, 550, 111, 140)
        } else if (status == 'tankFire') {
            ctx.drawImage(tankFire, tankX, 550, 111, 140)
        }
        tank_triggered.src = './images/tank_triggered.png'
        tank_triggered.onload = () => {
            ctx.drawImage(tank_triggered, 0, tank_triggeredY, 150, 200, tankX, 674, 111, 50)
            if (tank_triggeredY <= 0) {
                tank_triggeredY = 40
            } else {
                tank_triggeredY -= 10
            }
        }
    }, 100);
}

// generating a tank shell 
function generateShell(lastX) {
    let shellY = 530
    let shellInterval = setInterval(() => {
        ctx.fillStyle = "red";
        if (shellY < 530) {
            ctx.clearRect(lastX, shellY + 70, 3, 10)
        }
        ctx.fillRect(lastX, shellY, 3, 10);
        shellY -= 70
        if (shellY <= -70) {
            clearInterval(shellInterval)
            ctx.clearRect(lastX, 0, 10, 30)
        }
        shellCollisionChecker(lastX, shellY)
    }, 50);
}




// create the enemy
let collision = false
// randomCoords creator for the blocks 
let randomInterval = setInterval(() => {
    let randomX = Math.floor(Math.random() * 610) + 95
    let randomWidth = Math.floor(Math.random() * 100) + 60
    blockGenerator(randomX, randomWidth)
}, 1900);

// block generator
let blockInterval
var blocks = []
function blockGenerator(x, width) {
    let enemyY = -40
    let blockObj = {
        x: x,
        y: enemyY,
        bWidth: width
    }
    blockInterval = setInterval(() => {
        ctx1.fillStyle = '#b9914a'
        ctx1.clearRect(blockObj.x - 5, blockObj.y - 10, blockObj.bWidth + 10, 40);
        ctx1.fillRect(blockObj.x, blockObj.y, blockObj.bWidth, 40);
        if (blockObj.y < 700 && !collision) {
            blockObj.y += 10
        }
        blocks.forEach(blockObj => {
            collisionChecker(blockObj.x, blockObj.bWidth, blockObj.y)
        });
    }, 100);
    blockObj.interval = blockInterval
    blocks.push(blockObj)
}

// create the stars 
// randomCoords creator for the stars 
let randomInterval1 = setInterval(() => {
    let randomX = Math.floor(Math.random() * 720) + 170
    if (!blocksChecker(randomX, -40)) {
        drawStar(randomX - 20, 15, 12, 3)
    }

}, 5000);
// check if there is blocks in this point
function blocksChecker(randomX, y) {
    blocks.forEach(block => {
        let firstCornerCheck = checkInside(block.x, block.y, block.bWidth, 40, randomX - 15, y)
        let secondCornerCheck = checkInside(block.x, block.y, block.bWidth, 40, randomX + 35, y)
        let thirdCornerCheck = checkInside(block.x, block.y, block.bWidth, 40, randomX - 15, y)
        let fourthCornerCheck = checkInside(block.x, block.y, block.bWidth, 40, randomX + 35, y)
        if (firstCornerCheck || secondCornerCheck || thirdCornerCheck || fourthCornerCheck) {
            return true
        }
    })
}



// check if there is a collision
function collisionChecker(x, xWidth, y) {
    if (y > 555 && y < 620 && tankX > x && tankX < x + xWidth - 35
        || y > 555 && y < 620 && tankX + 90 > x && tankX + 90 < x + xWidth
        || y > 555 && y < 620 && tankX < x && tankX + 90 > x) {
        clearInterval(blockInterval)
        clearInterval(randomInterval)
        collision = true
    }

}




var stars = []
function drawStar(cx, spikes, outerRadius, innerRadius) {

    let cy = -40
    let starObj = {
        x: cx,
        y: cy,
        done: false
    }
    let starInterval = setInterval(() => {
        if (cy < 900 && !collision) {
            starObj.y += 10
        } else{
           clearInterval( starInterval)
           starObj.done = true
        }
        let rot = Math.PI / 2 * 3;
        let x = starObj.x;
        let y = starObj.y;
        let step = Math.PI / spikes;

        ctx1.strokeSyle = "#000";
        ctx1.beginPath();
        ctx1.moveTo(starObj.x, starObj.y - outerRadius)
        for (i = 0; i < spikes; i++) {
            x = starObj.x + Math.cos(rot) * outerRadius;
            y = starObj.y + Math.sin(rot) * outerRadius;
            ctx1.lineTo(x, y)
            rot += step

            x = starObj.x + Math.cos(rot) * innerRadius;
            y = starObj.y + Math.sin(rot) * innerRadius;
            ctx1.lineTo(x, y)
            rot += step
        }
        ctx1.lineTo(starObj.x, starObj.y - outerRadius)
        ctx1.closePath();
        ctx1.lineWidth = 5;
        ctx1.strokeStyle = 'yellow';
        ctx1.stroke();
        ctx1.fillStyle = 'red';
        ctx1.fill();
        ctx1.clearRect(starObj.x - 15, starObj.y - 30, 30, 21)

    }, 100);
    starObj.interval = starInterval
    stars.push(starObj)
}
function shellCollisionChecker(shellX, shellY) {
    stars.forEach(star => {
        if (!star.done) {
            let firstCornerCheck = checkInside(star.x - 21, star.y, 50, 20, shellX, shellY)
            let secondCornerCheck = checkInside(star.x - 21, star.y, 50, 20, shellX + 10, shellY)
            let thirdCornerCheck = checkInside(star.x - 21, star.y, 50, 20, shellX + 10, shellY + 30)
            let fourthCornerCheck = checkInside(star.x - 21, star.y, 50, 20, shellX, shellY + 30)
            if (firstCornerCheck || secondCornerCheck || thirdCornerCheck || fourthCornerCheck) {
                clearInterval(star.interval)
                ctx1.clearRect(star.x - 15, star.y - 15, 35, 35)
                score++
                star.done = true
            }
        }
    })
}
function checkInside(enX, enY, enWidth, enHeight, pointX, pointY) {
    return (pointX >= enX && pointX <= enX + enWidth) && (pointY >= enY && pointY <= enY + enHeight)
}

