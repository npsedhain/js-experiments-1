function getRandom(min,max)
{
    minimum=Math.floor(min);
    maximum=Math.ceil(max);
    return Math.floor((Math.random()*(maximum-minimum))+minimum);
}

class Bird{
    constructor(){
        this.x;
        this.y;
        this.speed=0;
        this.birdWidth=25;
        this.birdHeight=25;
        this.position();
        this.index=0;
        setInterval(()=>{
            this.index+=1;
            this.index%=8;
        },100);
    }
    position(){
        this.x=20;
        this.y=BodyHeight/2-(this.birdHeight/2);
        this.birdDraw();
    }

    birdDraw(){
        for( var i=0;i<8;i++)
        {   
            context.drawImage(midflap,0,this.index*24,25,24,this.x,this.y,this.birdWidth,this.birdHeight);

        }
    }
    
    move(){
        var a=0.2;
        this.speed=this.speed+a; 
        this.y+=this.speed;
        

    }
}

var speed=5;
var Xabsolute=600;

class Pipe{
    constructor(){
        this.xposition=Xabsolute;
        this.yUp=0;
        this.heightup=getRandom(80,330);
        this.yDown=this.heightup+110;
        this.heightdown=BodyHeight-this.yDown;
        this.width=60;

        
    }

    pipeDraw(){
        
        context.drawImage(pipeup,this.xposition,this.yUp,this.width,this.heightup);
        context.drawImage(pipedown,this.xposition,this.yDown,this.width,this.heightdown);
        context.font = "60px Arial";
        context.fillStyle='white';
        if (score<10){
        context.fillText(score,160,200);
        }
        if(score>=10){
            context.fillText(score,145,200);
        }

    }

    move(){
        this.xposition-=1;
        
    }    
}

function points(pipe,bird){
    if(bird.x>(pipe.xposition+pipe.width)+20){
        score+=1;
        point.play();    
        pipeArray.splice(pipeArray.indexOf(pipe),1);
    }
    var xbirdposition=bird.x+bird.birdWidth;
    var xdiff=pipe.xposition+pipe.width;
    var ybirdposition=bird.y+bird.birdHeight;
    if(((xbirdposition>=pipe.xposition+5)&& (bird.y<=pipe.heightup) && (bird.x<=xdiff)) || ((ybirdposition>=pipe.yDown+5) && (xbirdposition>=pipe.xposition) &&(bird.x<=xdiff) ))
    {
        this.alive = false;
        console.log('collision');
        cancelAnimationFrame(animator);
        die.play();
        return true;
    }

    if(bird.y<5 || ybirdposition>=505){
        console.log('game over');
        this.alive = false;
        cancelAnimationFrame(animator);
        die.play();
        return true;       
    }
}
