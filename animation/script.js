const canvas=document.getElementById('canvas1')
let playerState='run'
const dropDown=document.getElementById('animations')
dropDown.addEventListener('change',function(e){
    playerState=e.target.value
})
ctx=canvas.getContext("2d")
const canvas_width=canvas.width=600;
const canvas_height=canvas.height=600;

const img=new Image()
img.src="shadow_dog.png";
const sw=575
const sh=523
var framex=0
var framey=0
var gameFrames=0
const stagerFrames=5
const spriteAnAnimation=[]
const animationState=[
    {
        name:"idle",
        frames:7
    },
    {
        name:"jump",
        frames:7
    },
    {
        name:"fall",
        frames:7
    },
    {
        name:"run",
        frames:9
    },
    {
        name:"dizzy",
        frames:11
    },
    {
        name:"sit",
        frames:5
    },
    {
        name:"roll",
        frames:7
    },
    {
        name:"bite",
        frames:7
    },
    {
        name:"ko",
        frames:12
    },
    {
        name:"getHit",
        frames:4
    },
]
animationState.forEach((state,index)=>{
    let frames={
        loc:[]
    }
    for(let i=0;i<state.frames;i++){
        let positionX=i*sw
        let positionY=index*sh
        frames.loc.push({x:positionX,y:positionY})
    }
    spriteAnAnimation[state.name]=frames
})
console.log(spriteAnAnimation)

function animate(){
    ctx.clearRect(0,0,canvas_width,canvas_height)
    var position=Math.floor(gameFrames/stagerFrames)%spriteAnAnimation[playerState].loc.length
    framex=sw*position
    framey=spriteAnAnimation[playerState].loc[position].y
    ctx.drawImage(img,framex,framey,sw,sh,0,0,sw,sh)
    gameFrames++
    requestAnimationFrame(animate)
}
animate()
