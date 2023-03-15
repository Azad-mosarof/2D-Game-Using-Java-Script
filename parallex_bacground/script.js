const canvas=document.getElementById('canvas1')
const ctx=canvas.getContext("2d")
const canvas_width=canvas.width=800
const canvas_height=canvas.height=700
let gameSpeed=5
const slider=document.getElementById('slider')
slider.value=gameSpeed
const speedValue=document.getElementById('speedValue')
speedValue.innerHTML=gameSpeed
slider.addEventListener('change',(e)=>{
    gameSpeed=e.target.value
    speedValue.innerHTML=gameSpeed
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
            this.x=0
            this.y=0
            this.width=2400
            this.height=canvas_height
            this.image=image
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
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
            ctx.drawImage(this.image,this.x+this.width,this.y,this.width,this.height)
        }
    }
    const layer1=new Layer(bgImg1,0.2)
    const layer2=new Layer(bgImg2,0.4)
    const layer3=new Layer(bgImg3,0.6)
    const layer4=new Layer(bgImg4,0.8)
    const layer5=new Layer(bgImg5,1)
    
    const layers=[layer1,layer2,layer3,layer4,layer5]
    
    function animate(){
        ctx.clearRect(0,0,canvas_width,canvas_height)
        layers.forEach(objects=>{
            objects.update()
            objects.draw()
        })
        requestAnimationFrame(animate)
    }
    animate()
})


