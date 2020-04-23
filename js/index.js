// At the first the declaration of the elements (tank ,paling, etc..)
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d");
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

document.addEventListener("keydown", KeyDownFunc, false);
document.addEventListener("keyup", KeyUpFunc, false);

function KeyDownFunc(e) {
    if (tankX < 800 && e.keyCode == 39) {
        right_pressed = true;

    } else if (tankX > 80 && e.keyCode == 37) {
        left_pressed = true;
        console.log(e);
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
    if (tankX > 80 && left_pressed) {
        tankX -= 10
    }
    if (tankX < 800 && right_pressed) {
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
{
// let move = ''
// window.onkeydown = function (e) {
//     console.log(e);
//     if (e.which == 37 && tankX > 80) {
//         move = 'left'
//     } else if (e.which == 39 && tankX < 800) {
//         move = 'right'
//     } else if (e.which == 32) {
//         move = 'space'
//         generateShell(tankX + 55)
//         setTimeout(() => {
//             status = 'tankMoving'
//         }, 100);
//         status = 'tankFire'
//     }
// }
////////////////////////////////////////////////////////////////////////////////
// ahmad
// window.onkeydown = window.onkeyup = window.onkeypress = function (e) {
//     console.log(e);
//     if (e.keyCode == 37 && tankX > 80 && e.type == "keydown") {
//         tankX -= 10
//         console.log(tankX);
//     } else if (e.keyCode == 39 && tankX < 800 && e.type == "keydown") {
//         tankX += 10
//     } else if (e.keyCode == 32 && e.type == "keyup") {
//         generateShell(tankX + 55)
//         setTimeout(() => {
//             status = 'tankMoving'
//         }, 100);
//         status = 'tankFire'
//     }
// }
///////////////////////////////////////////////////////////////////////////////////
// canvas.onclick = function (e) {

//         generateShell(tankX + 55)
//         setTimeout(() => {
//             status = 'tankMoving'
//         }, 100);
//         status = 'tankFire'

// }
}


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
        ctx.clearRect(80, 550, 820, 190)
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
        // ctx.beginPath();
        ctx.fillRect(lastX, shellY, 3, 10);

        //ctx.fill();
        // ctx.closePath();

        shellY -= 70
        //lastX = tankX + 55
        if (shellY <= -70) {
            clearInterval(shellInterval)
            ctx.clearRect(lastX, 0, 10, 30)

        }
    }, 50);

}
// var balls = [];
// var ball_speed =   8.6; 
// var since_last_fire = performance.now();

// function drawNewBall(ball_X, ball_Y) {
//     ctx.beginPath();
//     ctx.arc(ball_X, ball_Y, 5, 0, Math.PI * 2);

//     var ball = new Map();
//     ball.set("X", ball_X);
//     ball.set("Y", ball_Y);
//     ball.set("width", 3);
//     ball.set("height", 3);
//     balls.push(ball);
//      since_last_fire = performance.now();   // it give me the current tick of the processor
//   }

//   //drawing all of the balls of the list
//   function drawBalls() {
//     for (var i = 0; i < balls.length; i++) {
//       ctx.beginPath();
//       ctx.arc(balls[i].get("X"), balls[i].get("Y"), 5, 0, Math.PI * 2);
//       ctx.fillStyle = "red";
//       ctx.fill();
//       ctx.closePath();
//     }
//   }
//   function moveBalls() {
//     //Moving the Balls
//     for (var i = 0; i < balls.length; i++) {
//       balls[i].set("Y", balls[i].get("Y") - ball_speed);
//       //Drops the ball from the balls array when they're out of view
//       if (balls[i].get("Y") < 0) {
//         balls.splice(i, 1);
//       }
//     }
//   }
//   function dr(){
//     moveBalls();
//     drawBalls();
//   if (status = 'tankFire' && balls.length < 10 && performance.now() - since_last_fire > 50) {
//       drawNewBall(tankX + 15, 545);
//   }  
//   } 

//   //requestAnimationFrame(dr)

