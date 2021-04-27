var pos = 0;
var direction = 0;
const pacImg = ['assets/img/PacMan1.png', 'assets/img/PacMan2.png',
                'assets/img/PacMan3.png', 'assets/img/PacMan4.png']
const pacMen = []; // This array holds all the pacmen
const game = document.getElementById('game-box');
var divPosition = game.getBoundingClientRect();
let padding = 100;
var left_pos = divPosition.x;
var top_pos = divPosition.top - padding;
var bottom = divPosition.bottom - padding;


function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(10); // {x:?, y:?}
    let position = setToRandom(200);
    let counter = 0;
    let delay_counter = 0;

    position.x = position.x + left_pos;
    position.y = position.y + top_pos;

    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = pacImg[0];
    newimg.width = 100;
    newimg.style.left = position.x;
    newimg.style.top = position.y;
    //
    // set position here 
    //

    // add new Child image to game
    game.appendChild(newimg);
    // return details in an object
    return {
        position,
        velocity,
        newimg,
        counter,
        delay_counter
    }
}

var isRunning = false;
let timeout = null;
 function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item);
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;            
        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
        //counters to alternate pictures every 6 passes.
        if((item.delay_counter % 6) == 0){
            if(item.velocity.x > 0){
                item.newimg.src = pacImg[item.counter % 2];
                item.counter++;
            } else {
                item.newimg.src = pacImg[(item.counter % 2) + 2];
                item.counter++;
            }
        }
        item.delay_counter++;
     });

    if(!isRunning) isRunning = true;        
    timeout = setTimeout(update, 20);      
 }

function checkCollisions(item) {
    //
    // detect collision with all walls and make pacman bounce
    //
    if (item.position.x + item.velocity.x + item.newimg.width > (game.clientWidth + left_pos) ||
        item.position.x + item.velocity.x < left_pos) {
            item.velocity.x = -item.velocity.x;
            if(item.velocity.x >= 0){
                item.newimg.src = pacImg[0];
                item.counter = 1;
                item.delay_counter = 0;
            } else {
                item.newimg.src = pacImg[2];
                item.counter = 1;
                item.delay_counter = 0;  
            }     
        }
    if (item.position.y + item.velocity.y + item.newimg.height > (bottom)||
        item.position.y + item.velocity.y < top_pos) {
            item.velocity.y = -item.velocity.y;               
        }
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}

function start(){
    if(!isRunning) update();
}

function stop() {
    isRunning = false;
    clearTimeout(timeout);        
}