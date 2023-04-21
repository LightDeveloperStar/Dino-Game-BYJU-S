//Variables
//Game State Variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
//T-rex Variables
var trex, trex_running, trex_collided;
//Groud Variables
var ground, invisibleGround, groundImage;
//Cloud Variables
var cloudImage;
var cloudsGroup;
//Obstacles Variables
var obstacle;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var obstaclesGroup;
//Score Variable
var score = 0;
//Game Over Images
var gameOverImg,restartImg,restart,gameOver;
//Sounds
var checkpoint;
var jump;
var die;
//Functions
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle6.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  
  checkpoint = loadSound("checkpoint.mp3");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
}
   //Setup
function setup() {
  createCanvas(1280, 500);

  //Create T-rex
  trex = createSprite(50,400,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
    
  //Create Ground Sprite
  ground = createSprite(1280,400,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  gameOver = createSprite(640,250);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5
  restart = createSprite(640,280);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  invisibleGround = createSprite(200, 415, 400, 20);
  invisibleGround.visible = false
  //Random Numbers
  //var rand = Math.round(random(1,100));
  //console.log(rand);
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  trex.setCollider("circle",0,0,40);
}
  //Draw
function draw() {
  background(255,255,255);
  //Score
  text("Pontuação: "+ score,1100,50);
  //Coordinates
  console.log(trex.y);
  //Game State
  if(gameState === PLAY){
    ground.velocityX = -(6 + score/100);
    score = score + Math.round(getFrameRate()/60);
    gameOver.visible = false;
    restart.visible = false;
    if(score>0 && score%100 === 0){
      checkpoint.play();
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && trex.y >= 379) {
      trex.velocityY = -13;
      //jump.play();
    }
    trex.velocityY = trex.velocityY + 0.8;
    spawnObstacles();
    spawnClouds();
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
  else if (gameState === END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided", trex_collided);
    trex.velocityY = 0;
    gameOver.visible = true;
    restart.visible = true;
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  function reset(){
    gameState = PLAY;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    score = 0;
    trex.changeAnimation("running", trex_running);

  }
  //Collide the Invisible Ground
  trex.collide(invisibleGround);
  //Generate Clouds
  drawSprites();
  trex.debug = false
}
  
//Function to Generate Clouds
  function spawnClouds(){
    if (frameCount % 60 === 0){
    var Cloud = createSprite(1280,100,40,10);
    Cloud.velocityX = -4;
    Cloud.addImage(cloudImage); 
    Cloud.scale = 0.3;
    Cloud.y = Math.round(random (50,200));
    Cloud.lifetime = 350;
    cloudsGroup.add(Cloud);
  }
  }
//Function to Generate Obstacles
  function spawnObstacles(){
    if (frameCount % 80 === 0){
      var Obstacles = createSprite(1280,385,10,40);
      Obstacles.velocityX = -(6 + score/100);
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: Obstacles.addImage(obstacle);
                          break;
        case 2: Obstacles.addImage(obstacle2);
                          break;
        case 3: Obstacles.addImage(obstacle3);
                          break;
        case 4: Obstacles.addImage(obstacle4);
                          break;
        default: break;                                                                        
      }
      Obstacles.scale = 0.15;
      Obstacles.lifetime = 350;
      obstaclesGroup.add(Obstacles);
      Obstacles.debug = false
    }
  }