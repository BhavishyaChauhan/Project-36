class Food{
    constructor(){
        this.foodStock = 0;
        this.image = loadImage("milk.png");
        this.lastFed;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

   

    display(){
        background(466,139,87);
        fill(255,255,254);
    textSize(15);
     if(lastFed>=12){
       text("Last Feed: " + lastFed%12 +" PM", 350, 30);
     }
     else if(lastFed == 0){
      text("Last Feed: 12 AM",350,30);
    }
  else{
    text("Last Feed: " + lastFed + " AM", 350,30);
  }
        var x = 70, y = 100;
        imageMode(CENTER);
        //image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i = 0; i<this.foodStock; i++){
                if(i%10==0){
                    x = 80; 
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x= x+30;
            }
        }
    }

    bedroom(){
        background(bedroom,550,550);
    }

    washroom(){
        background(washroom,200,200);
    }

    garden(){
        background(garden,200,200);
    }


}

