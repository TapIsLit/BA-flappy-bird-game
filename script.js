let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let birdY = 200
let velocity = 0
let gravity = 0.5

let pipes = []

let characterImg = new Image()

function startGame(name,img){

document.getElementById("menu").style.display="none"
document.getElementById("game").style.display="block"

document.getElementById("selected").innerText="Character: "+name

characterImg.src = img

document.getElementById("bgMusic").play()

setInterval(update,20)

}

function update(){

ctx.clearRect(0,0,400,500)

velocity += gravity
birdY += velocity

ctx.drawImage(characterImg,80,birdY,40,40)

pipes.forEach(pipe=>{

pipe.x -= 2

ctx.fillStyle="green"

ctx.fillRect(pipe.x,0,50,pipe.top)

ctx.fillRect(pipe.x,pipe.bottom,50,500)

if(
80 < pipe.x + 50 &&
80 + 40 > pipe.x &&
(birdY < pipe.top || birdY + 40 > pipe.bottom)
){
gameOver()
}

})

if(Math.random()<0.02){

let gap = 130
let top = Math.random()*250

pipes.push({
x:400,
top:top,
bottom:top+gap
})

}

if(birdY > 470 || birdY < 0){
gameOver()
}

}

document.addEventListener("keydown",()=>{
velocity=-8
})

function gameOver(){

document.getElementById("bgMusic").pause()

document.getElementById("deathSound").play()

alert("Game Over!")

location.reload()

}
