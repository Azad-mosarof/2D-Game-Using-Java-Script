//collision detection between rectangels
var rect1={x:5,y:5,w:50,h:50}
var rect2={x:10,y:10,w:20,h:20}

if(rect1.x>rect2.x+rect2.w ||
    rect1.x+rect1.w<rect2.x ||
    rect1.y>rect2.y+rect2.h ||
    rect1.y+rect1.h<rect2.y){
        //no colision
    }
else{
    //collision detected
}

//collision detection between circles

var cir1={x:100,y:300,r:20}
var cir2={x:200,y:100,r:60}

var dx=cir1.x-cir2.x
var dy=cir1.y-cir2.y
var distance=Math.sqrt(dx*dx + dy*dy)
var sum_of_radious=cir1.r+cir2.r

if(dis<sum_of_radious){
    //collision detected
}
else if(dis==sum_of_radious){
    //they are touching
}
else{
    //no collision
}