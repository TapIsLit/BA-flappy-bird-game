const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

let birdY = 250
let velocity = 0

const gravity = 0.5
const jump = -9

let pipes = []
const pipeWidth = 60
const pipeCap = 10
const pipeGap = 180

let score = 0

let character = new Image()

function startGame(name, img){

document.getElementById("menu").style.display="none"
canvas.style.display="block"

character.src = img

document.getElementById("music").play()

resetGame()

spawnPipe()

update()

}

function resetGame(){

birdY = 250
velocity = 0
pipes = []
score = 0

document.getElementById("score").innerText="Score: 0"

}

function spawnPipe(){

let top = 60 + Math.random()*250

pipes.push({
x: 400,
top: top,
bottom: top + pipeGap
})

setTimeout(spawnPipe, 2000)

}

function update(){

velocity += gravity
birdY += velocity

ctx.clearRect(0,0,400,600)

ctx.drawImage(character,80,birdY,40,40)

pipes.forEach((pipe,i)=>{

pipe.x -= 2

drawPipe(pipe)

if(
80+40 > pipe.x &&
80 < pipe.x+pipeWidth &&
(birdY < pipe.top || birdY+40 > pipe.bottom)
){
die()
}

if(pipe.x+pipeWidth < 0){
pipes.splice(i,1)
score++
document.getElementById("score").innerText="Score: "+score
}

})

if(birdY > 560 || birdY < 0){
die()
}

requestAnimationFrame(update)

}

function drawPipe(pipe){

ctx.fillStyle = "#22c55e"

/* top pipe body */
ctx.fillRect(pipe.x,0,pipeWidth,pipe.top)

/* top pipe cap */
ctx.fillRect(pipe.x-5,pipe.top-pipeCap,pipeWidth+10,pipeCap)

/* bottom pipe body */
ctx.fillRect(pipe.x,pipe.bottom,pipeWidth,600)

/* bottom pipe cap */
ctx.fillRect(pipe.x-5,pipe.bottom,pipeWidth+10,pipeCap)

}

document.addEventListener("keydown",()=>velocity=jump)
canvas.addEventListener("click",()=>velocity=jump)

function die(){

document.getElementById("death").play()

setTimeout(()=>{
resetGame()
},1200)

}
