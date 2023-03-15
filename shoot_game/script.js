const canvas=document.getElementById('canvas1')
const ctx=canvas.getContext('2d')
canvas.width=window.innerWidth
canvas.height=window.innerHeight

const canvas2=document.getElementById('collisionCanvas')
const ctx2=canvas2.getContext('2d')
canvas2.width=window.innerWidth
canvas2.height=window.innerHeight
const ratio=0.181
const lowerH=70
const audio=new Audio()
audio.src='crow.wav'
const over=new Audio()
over.src='over.wav'

let defaultSpeed=5
let gameSpeed=defaultSpeed
const slider=document.getElementById('slide')
const speed=document.getElementById('gameSpeed')
speed.innerHTML=gameSpeed
slider.value=gameSpeed

slider.addEventListener('change',(e) => {
    gameSpeed=e.target.value
    speed.innerHTML=gameSpeed
})

const bgImg1=new Image()
bgImg1.src='layer-1.png'
const bgImg2=new Image()
bgImg2.src='layer-2.png'
const bgImg3=new Image()
bgImg3.src='layer-3.png'
const bgImg4=new Image()
bgImg4.src='layer-4.png'
const bgImg5=new Image()
bgImg5.src='layer-5.png'

window.addEventListener('load',()=>{
    class Layer{
        constructor(image,speedModifier){
            this.image=image
            this.x=0
            this.y=0
            this.width=2400
            this.height=700
            this.speedModifier=speedModifier
            this.speed=gameSpeed*this.speedModifier
        }
        update(){
            this.speed=gameSpeed*this.speedModifier
            if(this.x<=-this.width){
                this.x=0
            }
            this.x=Math.floor(this.x-this.speed)
        }
        draw(){
            ctx.drawImage(this.image,-this.x,this.y,-this.width,canvas.height)
            ctx.drawImage(this.image,-this.x+this.width,this.y,-this.width,canvas.height)
        }
    }

    const layer1=new Layer(bgImg1,0.1*(gameSpeed/defaultSpeed))
    const layer2=new Layer(bgImg2,0.2)
    const layer3=new Layer(bgImg3,0.3)
    const layer4=new Layer(bgImg4,0.4)
    const layer5=new Layer(bgImg5,0.5)

    const layers=[layer1,layer2,layer3,layer4,layer5]

    let timetoNextReven=0
    let timeInterval=500
    let lastTime=0

    let revens=[]
    let score=0
    let gameOver=false
    ctx.font='40px Impact'

    let particles=[]
    class Particles{
        constructor(x,y,size,color){
            this.x=x + Math.random()*50 -25
            this.y=y+ Math.random()*50 -25
            this.size=size
            this.color=color
            this.radious=Math.random()*this.size/50
            this.maxRadious=Math.random()*10 + 15
            this.speedX=Math.random()*1 + 0.5
            this.markForDeletion=false
        }
        update(){
            this.x+=this.speedX
            this.radious+=0.3
            if(this.radious>this.maxRadious-5) this.markForDeletion=true
        }
        draw(){
            ctx.save()
            ctx.globalAlpha= 1 - (this.radious/this.maxRadious)
            ctx.beginPath()
            ctx.fillStyle=this.color
            ctx.arc(this.x,this.y,this.radious,0,Math.PI*2)
            ctx.fill()
            ctx.restore()
        }
    }

    class Revens{
        constructor(){
            this.rw=271
            this.rh=194
            this.sizeModifier=Math.random()*0.3 +0.4
            this.width=this.rw * this.sizeModifier
            this.height=this.rh * this.sizeModifier
            this.x=canvas.width
            this.y=Math.random()*(canvas.height-this.height-(canvas.height*ratio)-lowerH) + lowerH
            this.positionX=(Math.random()*5 +3)
            this.positionY=Math.random()*5 -2.5
            this.markForDeletion=false
            this.image=new Image()
            this.image.src="raven.png"
            this.frame=0
            this.maxFrame=4
            this.flapTime=0
            this.flapInterval=Math.random()*90 +60
            this.randomColors=[Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)]
            this.color='rgb('+this.randomColors[0]+','+this.randomColors[1]+','+this.randomColors[2]+')'
        }
        update(deltaTime){
            if(this.y<0+lowerH || this.y>canvas.height-this.height-(canvas.height*ratio)){
                this.positionY=this.positionY * (-1)
            }
            this.x-=this.positionX*(gameSpeed/10)
            this.y+=this.positionY*(gameSpeed/10)
            if(this.x + this.width<0) this.markForDeletion=true
            this.flapTime+=deltaTime
            if(this.flapTime>this.flapInterval){
                if(this.frame>this.maxFrame) this.frame=0
                else{
                this.flapTime=0
                this.frame++
                }
            }
            if(this.x+this.width<0) gameOver=true
            particles.push(new Particles(this.x+this.width/1.3,this.y+(this.height/2),this.width,this.color))
        }
        draw(){
            ctx2.fillStyle=this.color
            ctx2.fillRect(this.x,this.y,this.width,this.height)
            ctx.drawImage(this.image,this.frame*this.rw,0,this.rw,this.rh,this.x,this.y,this.width,this.height)
        }
    }

    var explosion=[]
    class Explosion{
        constructor(x,y,size){
            this.image=new Image()
            this.image.src='boom.png'
            this.bw=200
            this.bh=179
            this.x=x
            this.y=y
            this.size=size
            this.frame=0
            this.audio=new Audio()
            this.audio.src='boom.wav'
            this.timeSinceLastFrame=0
            this.frameInterval=200
            this.markForDeletion=false
        }
        update(deltaTime){
            if(this.frame==0) this.audio.play()
            this.timeSinceLastFrame+=deltaTime
            if(this.timeSinceLastFrame>this.frameInterval){
                this.frame+=1
                this.timeSinceLastFrame=0
                if(this.frame>5) this.markForDeletion=true
            }
        }
        draw(){
            ctx.drawImage(this.image,this.frame*this.bw,0,this.bw,this.bh,this.x,this.y,this.size,this.size)
        }
    }

    function drawScore(){
        ctx.fillStyle='black'
        ctx.fillText("Score:"+score,50,lowerH)
        ctx.fillStyle='white'
        ctx.fillText("Score:"+score,50,lowerH-3)
    }

    function drawGameOver(){
        ctx.textAlign='center'
        ctx.fillStyle='yellow'
        ctx.fillText("Oops!Game is Over.",canvas.width/2,canvas.height/20)
        ctx.fillText("Your Score is:"+score,canvas.width/2,canvas.height/20+40)
        ctx.textAlign='center'
        ctx.fillStyle='green'
        ctx.fillText("Oops!Game is Over!",canvas.width/2,canvas.height/20+3)
        ctx.fillText("Your Score is:"+score,canvas.width/2,canvas.height/20+43)
    }
    window.addEventListener('click',(e) => {
        console.log(canvas.height-e.y)
        console.log(canvas.height)
        const detectPixel=ctx2.getImageData(e.x,e.y,1,1)
        let pc=detectPixel.data
        revens.forEach(object => {
            if(object.randomColors[0] == pc[0] &&
                object.randomColors[1] == pc[1] &&
                object.randomColors[2] == pc[2]){
                    //explosion detected
                    object.markForDeletion=true
                    score++
                    explosion.push(new Explosion(object.x,object.y,object.width))
                }
        })
    })
    
    function animation(timestamp){
        ctx2.clearRect(0,0,canvas.width,canvas.height)
        let deltaTime=timestamp-lastTime
        lastTime=timestamp
        timetoNextReven+=deltaTime
        if(timetoNextReven>timeInterval){
            revens.push(new Revens())
            timetoNextReven=0
            revens.sort((a,b) => {
                return a.width - b.width
            })
        }
        [...layers,...particles,...revens,...explosion].forEach(object => object.update(deltaTime));
        [...layers,...particles,...revens,...explosion].forEach(object => object.draw());
        revens=revens.filter(object => !object.markForDeletion)
        explosion=explosion.filter(object => !object.markForDeletion)
        particles=particles.filter(object => !object.markForDeletion)
        drawScore();
        audio.play()
        if(!gameOver) requestAnimationFrame(animation)
        else {
            drawGameOver()
            over.play()
        }
    }
    animation(0)
})
