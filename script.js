let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let birdY = 200
let velocity = 0
let gravity = 0.5
let lift = -8

let pipes = []
let pipeWidth = 50
let pipeGap = 140
let pipeSpeed = 2

let score = 0
let gameRunning = false

let characterImg = new Image()

// Game Over overlay
const gameOverOverlay = document.createElement('div')
gameOverOverlay.style.position = 'absolute'
gameOverOverlay.style.top = '0'
gameOverOverlay.style.left = '0'
gameOverOverlay.style.width = '100%'
gameOverOverlay.style.height = '100%'
gameOverOverlay.style.background = 'rgba(0,0,0,0.7)'
gameOverOverlay.style.display = 'flex'
gameOverOverlay.style.alignItems = 'center'
gameOverOverlay.style.justifyContent = 'center'
gameOverOverlay.style.color = 'white'
gameOverOverlay.style.fontSize = '30px'
gameOverOverlay.style.zIndex = '10'
gameOverOverlay.style.display = 'none'
gameOverOverlay.innerHTML = '💀 Game Over! Click to Restart 💀'
document.body.appendChild(gameOverOverlay)

gameOverOverlay.addEventListener('click',()=>{
    location.reload()
})

function startGame(name,img){
    document.getElementById("menu").style.display="none"
    document.getElementById("game").style.display="block"
    document.getElementById("selected").innerText = "Character: "+name

    characterImg.src = img

    document.getElementById("bgMusic").play()

    gameRunning = true
    requestAnimationFrame(update)
}

function update(){
    if(!gameRunning) return

    // Move
    velocity += gravity
    birdY += velocity

    // Clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height)

    // Draw bird
    if(characterImg.complete){
        ctx.drawImage(characterImg,80,birdY,40,40)
    }else{
        ctx.fillStyle = "yellow"
        ctx.fillRect(80,birdY,30,30)
    }

    // Generate pipes
    if(Math.random() < 0.015){
        let topHeight = 50 + Math.random()*(canvas.height - pipeGap - 100)
        pipes.push({x: canvas.width, top: topHeight, bottom: topHeight + pipeGap})
    }

    // Draw and move pipes
    ctx.fillStyle = "green"
    for(let i=pipes.length-1;i>=0;i--){
        let p = pipes[i]
        p.x -= pipeSpeed

        // Top pipe
        ctx.fillRect(p.x,0,pipeWidth,p.top)
        // Bottom pipe
        ctx.fillRect(p.x,p.bottom,pipeWidth,canvas.height-p.bottom)

        // Collision
        if(80 + 40 > p.x && 80 < p.x + pipeWidth){
            if(birdY < p.top || birdY + 40 > p.bottom){
                gameOver()
            }
        }

        // Remove off-screen pipes
        if(p.x + pipeWidth < 0){
            pipes.splice(i,1)
            score++
        }
    }

    // Draw score
    ctx.fillStyle = "white"
    ctx.font = "24px Arial"
    ctx.fillText("Score: "+score, 10, 30)

    // Check ground/ceiling
    if(birdY > canvas.height - 40 || birdY < 0){
        gameOver()
    }

    requestAnimationFrame(update)
}

// Flap on key or touch
document.addEventListener("keydown",()=>{velocity = lift})
canvas.addEventListener("click",()=>{velocity = lift})

function gameOver(){
    gameRunning = false
    document.getElementById("bgMusic").pause()
    document.getElementById("deathSound").play()
    gameOverOverlay.style.display = 'flex'
}
