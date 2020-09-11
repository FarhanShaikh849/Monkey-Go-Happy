var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var gameOver,gameOverImage,restart,restartImage;

var background0;

var score = 0;
var survivalTime;

function preload(){
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
gameOverImage = loadImage("gameOver.png");
restartImage = loadImage("restart.png");

bananaSound = loadSound("sound.wav");

gameOverSound = loadSound("dead.wav");

background0Image = loadImage("bground.jpg");  
  
}

function setup() {
createCanvas(400,400);

background0 = createSprite(200,240);  
background0.addImage(background0Image);  
  
// monkey
monkey = createSprite(100,314,20,50);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1;

//ground
ground = createSprite(200,350,800,10);
ground.velocityX = -4;

gameOver = createSprite(155,225);
gameOver.addImage(gameOverImage);  
gameOver.scale = 0.6;

restart = createSprite(325,225);
restart.addImage(restartImage);
restart.scale = 0.6;
  
//groups
bananaGroup = new Group();
obstacleGroup = new Group();

survivalTime = 0;  

monkey.setCollider("circle",0,0,240);

score = 0;     

}

function draw() {
background("white");

stroke("black");
textSize(20);
fill("black"); 
text("Bananas/Score: "+ score, 210,30);

if (gameState === PLAY){

obstacles();  
food();  
  
//jump
if(keyDown("space") && monkey.y >= 314 ) {
monkey.velocityY = -12;
} 

//gravity
monkey.velocityY = monkey.velocityY + 0.8

//moving ground
if (ground.x < 0){
ground.x = ground.width/2;
}  

stroke("black");
textSize(20);
fill("black");
survivalTime = Math.round(frameCount/5);
text("Survival Time: " + survivalTime,30,30);

gameOver.visible = false;
restart.visible = false;  

//collision of monkey and ground
monkey.collide(ground);  

}
else if(gameState === END){

gameOver.visible = true;
restart.visible = true;  

ground.velocityX = 0;
monkey.velocityY = 0;
obstacleGroup.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);  

obstacleGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);  

if(mousePressedOver(restart)) {
reset();
gameOverSound.play();
}  

stroke("black");
textSize(20);
fill("black");
survivalTime = survivalTime;
text("Survival Time: " + survivalTime,30,30);
  
//collision of monkey and ground
monkey.collide(ground);  
}

  
if (bananaGroup.isTouching(monkey)){
bananaGroup.destroyEach();
bananaSound.play();
score = score+1;
}   
  
if (obstacleGroup.isTouching(monkey)){
gameState = END;
} 

drawSprites(); 
}

function food(){
if (gameState === PLAY){
if (frameCount % 80 === 0){  
banana = createSprite(400,0,20,20);
banana.velocityX = -6;
banana.y = Math.round(random(190,250));
banana.addImage(bananaImage);
banana.scale = 0.1;
banana.lifetime = 120;
  
bananaGroup.add(banana);
}
}
}

function obstacles() {
if (gameState === PLAY){
if (frameCount % 200 === 0){
obstacle = createSprite(400,330,20,20);
obstacle.velocityX = -6;
obstacle.addImage(obstacleImage);
obstacle.scale = 0.1;
  
obstacleGroup.add(obstacle);
}
}
}

function reset(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
  
obstacleGroup.destroyEach();
bananaGroup.destroyEach();
 
score = 0;  

survivalTime = (frameCount = 0)  
  
}