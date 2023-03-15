const canvas=document.getElementById('canvas1')
const ctx=canvas.getContext("2d")
canvas.width=500
canvas.height=700
let canvasPosition=canvas.getBoundingClientRect()

var explositionArray=[]

class explosition{
    constructor(x,y){
        this.sw=200
        this.sh=179
        this.width=this.sw * 0.7
        this.height=this.sh * 0.7
        this.x= x 
        this.y= y 
        this.image=new Image()
        this.image.src="boom.png"
        this.frame=0
        this.timer=0
        this.angle=Math.random()*6.2
        this.sound=new Audio()
        this.sound.src='boom.wav'
    }
    update(){
        if(this.frame == 0) this.sound.play()
        this.timer++
        if(this.timer % 15 == 0){
            this.frame++
        }
    }
    draw(){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle)
        ctx.drawImage(this.image,this.frame*this.sw,0,this.sw,this.sh,0-this.width/2,0-this.height/2,this.width,this.height)
        ctx.restore()
    }
}

window.addEventListener('click',(e)=>{
    createAnimation(e)
})

// window.addEventListener('mousemove',(e)=>{
//     createAnimation(e)
// })

function createAnimation(e){
    let POSITION_X=e.x-canvasPosition.left
    let POSITION_Y=e.y-canvasPosition.top
    explositionArray.push(new explosition(POSITION_X,POSITION_Y))
    console.log(explositionArray)
}

function animation(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for(let i=0;i<explositionArray.length;i++){
        explositionArray[i].update()
        explositionArray[i].draw()
        if (explositionArray[i].frame>=5){
            explositionArray.splice(i,1)
            i--
        }
    }
    requestAnimationFrame(animation)
}
animation()