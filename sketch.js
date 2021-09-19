//Create variables here
var dog,dogImg,happydogImg,foodS,foodStock,database
var happydogImg;
var foodObj;
var fedTime,lastFed,feed,addFood;
var gamestate;
var garden,bedroom,washroom;
var currentTime;

function preload(){
  dogImg=loadImage("Dog.png");
  happydogImg=loadImage("happydog.png");
  garden = loadImage("Garden.png");
  bedroom = loadImage("Bed Room.png");
  washroom = loadImage("Wash Room.png");
}

function setup() {

  database= firebase.database();

  createCanvas(800, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  console.log(foodStock);

  dog=createSprite(200,400,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState');
  readState.on = ("value", function(data){
    gameState = data.val()
  })

  
  
}


function draw() { 
  
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  

  if(gamestate != "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }

  currentTime = hour();
  if(currentTime == (lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime == (lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime > (lastFed+2) && currentTime <= (lastFed+4) ){
    update("Bathing");
    foodObj.washroom();
    
  }
  else{
   update("Hungry")
   foodObj.display();
  }


  drawSprites();

}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}



function readStock(data){
  foodS= data.val();
  foodObj.updateFoodStock(foodS);
  console.log(foodStock)
}

function feedDog(){
  dog.addImage(happydogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour(),
    gameState: "Hungry"
   })
}

function addFoods(){
  foodS=foodS+1;
  database.ref('/').update({
    Food: foodS
  })
}


