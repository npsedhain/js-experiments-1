function GetRandom(min,max){
    minimum=Math.floor(min);
    maximum=Math.ceil(max);
    return Math.floor((Math.random()*(maximum-minimum))+minimum);
}

class Cars{
    constructor(status){
    this.height=70;
    this.width=50;
    this.lanwidth;
    this.y=(status =='isplayer') ? (BodyHeight-this.height) : -this.height;
    this.laneposition=(status=='isplayer')?2:GetRandom(1,4);
    this.isplayer=status;
    this.speed=0;

    
    if(status=='isplayer')
    {

        this.position();
    }
    
    }

    draw(){
         this.lanewidth=BodyWidth/3;
        if(this.isplayer=='isplayer'){
            context.fillStyle='green';
            context.fillRect(this.laneposition*this.lanewidth-(this.lanewidth/2)-(this.width/2),this.y,this.width,this.height);
           
        }
        if(this.isplayer=='isenemy'){
            context.fillStyle='red';
            context.fillRect(this.laneposition*this.lanewidth-(this.lanewidth/2)-(this.width/2),this.y,this.width,this.height);
            
        }
    }

    move(){
        if(this.isplayer=='isenemy'){
            
            if (score>10){
            
                this.speed=5;
                this.y+=this.speed;
                
            }
            else{
                this.speed=3;
                this.y+=this.speed;
                
            }    
          
            }
           
    }

    position(){
        
        document.addEventListener('keydown',(event)=>{
        
            if(event.keyCode==65 && this.laneposition!=1){
                this.laneposition=this.laneposition-1;
             
                
                
            }


            if(event.keyCode==68 && this.laneposition!=3){
                this.laneposition=this.laneposition+1;
            }

        

        });
    }

    collision(posi){
        if((this.y+this.height>=BodyHeight-posi.height)&&(this.laneposition == posi.laneposition))
        {
            
            cancelAnimationFrame(animator);
            return true;
        }

    }

    delcheck(b){
        if((this.y)>=BodyHeight){
            score+=1;
            let index=b;
            updateCar.splice(index,1);
            

        }
    }

} 




