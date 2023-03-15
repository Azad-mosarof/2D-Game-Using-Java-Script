/**@type{HTMLCanvasElement} */

const canvas1=document.getElementById('canvas1')
const ctx=canvas1.getContext("2d")
const CANVAS_WIDTH=canvas1.width=400
const CANVAS_HEIGHT=canvas1.height=800
const numberOfEnemys=50
let enemyArray=[]
let gameframe=0

class enemy{
    constructor(){
        this.image=new Image()
        // this.image.src="enemy1.png"
        // this.sw=293
        // this.sh=155
        // this.image.src="enemy2.png"
        // this.sw=266
        // this.sh=188
        // this.image.src="enemy3.png"
        // this.sw=218
        // this.sh=177
        this.image.src="enemy4.png"
        this.sw=213
        this.sh=213
        this.speed=Math.random()*4 +1
        this.width=this.sw/3
        this.height=this.sh/3
        this.x=Math.random()*(CANVAS_WIDTH-this.width)
        this.y=Math.random()*(CANVAS_HEIGHT-this.height)
        this.newX=Math.random()*(CANVAS_WIDTH-this.width)
        this.newY=Math.random()*(CANVAS_HEIGHT-this.height)
        this.flapSpeed=Math.floor(Math.random()*3 +1)
        this.frame=0
        this.interval=Math.floor(Math.random()*200 + 50)
        // this.angle=Math.random()*2
        // this.angleSpeed=Math.random()*3
        // this.curve=Math.random()*7
        // this.curve=Math.random()*200
    }
    update(){
        // this.x+=Math.random()*5 -2.5
        // this.y+=Math.random()*5 -2.5

        // this.x-=this.speed
        // this.y+=this.curve*Math.sin(this.angle)

        // this.x=CANVAS_WIDTH/2*Math.cos(this.angle*(Math.PI/90))+(CANVAS_WIDTH/2-this.width/2)
        // this.y=CANVAS_HEIGHT/2*Math.sin(this.angle*(Math.PI/270))+(CANVAS_HEIGHT/2-this.height/2)

        if(gameframe % this.interval==0){
            this.newX=Math.random()*(CANVAS_WIDTH-this.width)
            this.newY=Math.random()*(CANVAS_HEIGHT-this.height)
        }
        let dx=this.x-this.newX
        let dy=this.y-this.newY
        this.x-=dx/70
        this.y-=dy/70
        // this.angle+=this.angleSpeed
        if(this.x<-this.width){
            this.x=CANVAS_WIDTH
        }
        if(gameframe%this.flapSpeed==0){
            this.frame>=5 ? this.frame=0:this.frame++
        }
    }
    draw(){
        // ctx.strokeRect(this.x,this.y,this.width,this.height)
        ctx.drawImage(this.image,this.frame*this.sw,0,this.sw,this.sh,this.x,this.y,this.width,this.height)
    }
}
for(let i=0;i<numberOfEnemys;i++){
    enemyArray.push(new enemy())
}

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    enemyArray.forEach(enemy =>{
        enemy.update()
        enemy.draw()
    })
    gameframe++
    requestAnimationFrame(animate)
}
animate()
