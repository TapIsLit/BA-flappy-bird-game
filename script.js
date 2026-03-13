const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let birdY
let velocity

const gravity = 0.5
const jump = -9

let pipes
const pipeWidth = 60
const pipeGap = 170

let score
let gameRunning = false

let characterImg = new Image()

let animationId
let pipeSpawner

function startGame(name,img){

document.getElementById("menu").style.display="none"
document.getElementById("game").style.display="block"

document.getElementById("selected").innerText="Character: "+name

characterImg.src = img

resetGame()

document.getElementById("bgMusic").play()

gameRunning = true

spawnPipe()

update()

}


function resetGame(){

birdY = 250
velocity = 0

pipes = []

score = 0

document.getElementById("gameOverScreen").style.display="none"

}


function spawnPipe(){

if(!gameRunning) return

let topHeight = 80 + Math.random()*250

pipes.push({
x: canvas.width,
top: topHeight,
bottom: topHeight + pipeGap
})

pipeSpawner = setTimeout(spawnPipe,1800)

}


function update(){

if(!gameRunning) return

velocity += gravity
birdY += velocity

ctx.clearRect(0,0,canvas.width,canvas.height)

if(characterImg.complete){

ctx.drawImage(characterImg,80,birdY,40,40)

}else{

ctx.fillStyle="yellow"
ctx.fillRect(80,birdY,40,40)

}

ctx.fillStyle="green"

pipes.forEach((pipe,i)=>{

pipe.x -= 2

ctx.fillRect(pipe.x,0,pipeWidth,pipe.top)
ctx.fillRect(pipe.x,pipe.bottom,pipeWidth,canvas.height)

if(

80+40 > pipe.x &&
80 < pipe.x + pipeWidth &&
(birdY < pipe.top || birdY+40 > pipe.bottom)

){
gameOver()
}

if(pipe.x + pipeWidth < 0){

pipes.splice(i,1)
score++

}

})

ctx.fillStyle="white"
ctx.font="24px Arial"
ctx.fillText("Score: "+score,10,30)

if(birdY>canvas.height-40 || birdY<0){
gameOver()
}

animationId = requestAnimationFrame(update)

}


document.addEventListener("keydown",()=>{
velocity = jump
})

canvas.addEventListener("click",()=>{
velocity = jump
})


function gameOver(){

gameRunning = false

cancelAnimationFrame(animationId)

clearTimeout(pipeSpawner)

document.getElementById("bgMusic").pause()
document.getElementById("deathSound").play()

document.getElementById("finalScore").innerText="Score: "+score

document.getElementById("gameOverScreen").style.display="flex"

}


function restartGame(){

resetGame()

document.getElementById("bgMusic").play()

gameRunning = true

spawnPipe()

update()

}
