var jetImg,jetUp,jetDown,JETTopGroup,JETDownGroup;
var border1, border2,border3,border4,bordedrUp,borderDown;
var playerJet, playerJetImg;
var spaceShip, spaceShipImg,spaceBGImage;
var gate1,gate2;
var bullet, bulletUp,bulletDown,bulletAttackerDown,bulletAttackerUp,playerBulletGroup;
var diamond, diamondImg;
var explosion, bgMusic;
var v1,v1Img,v2,v2Img,v3,v3Img,v4,v4Img;
var PC,PCImg;

var gameState = "STAGE1";
var shield = 1000, shieldVisibility=255;;
var score = 0;

function  preload(){
  //loading all the images
  jetImg=loadImage("sprites/attacker jet.png");
  spaceShipImg = loadAnimation("sprites/spaceshuttle.png","sprites/output-onlinepngtools.png","sprites/output-onlinepngtools (1).png","sprites/output-onlinepngtools (2).png","sprites/output-onlinepngtools (3).png","sprites/output-onlinepngtools (4).png","sprites/output-onlinepngtools (5).png","sprites/output-onlinepngtools (6).png","sprites/output-onlinepngtools (7).png","sprites/output-onlinepngtools (8).png","sprites/output-onlinepngtools (9).png","sprites/output-onlinepngtools (10).png");
  playerJetImg = loadImage("sprites/jet7.png");
  diamondImg = loadImage("sprites/diamond.png");
  spaceBGImage = loadImage("sprites/spaceBG.png");
  explosion=loadSound("music/POL-digital-impact-01.wav");
  bgMusic=loadSound("music/POL-no-way-out-short.wav");
  v1Img=loadImage("sprites/villain1 (1).png");
  v2Img=loadImage("sprites/villain1 (5).png");
  v3Img=loadImage("sprites/villain1 (8).png");
  v4Img=loadImage("sprites/villain1 (9).png");
  PCImg=loadImage("sprites/villain1 (6).png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  bgMusic.loop();
  bgMusic.setVolume(0.25);
  //creating the spaceship
  spaceShip = createSprite(windowWidth/2,windowHeight/2);
  spaceShipImg.frameDelay=8;
  spaceShip.addAnimation("rotate",spaceShipImg);
  spaceShip.scale = 0.4;
  

  //creating the player ship
  playerJet = createSprite(500,310);
  playerJet.addImage(playerJetImg);
  playerJet.scale = 0.2;

  //creating the diamond that the enemies need to steal from the spaceShip
  diamond = createSprite(750,320);
  diamond.addImage(diamondImg);
  diamond.scale = 0.3

  //invisible gates of the spaceShip
  gate1 = createSprite(windowWidth/2,windowHeight/2-70,50,20);
  gate2 = createSprite(windowWidth/2,windowHeight/2+100,50,20);
  gate1.shapeColor = "white";
  gate2.shapeColor = "white";

   //invisible borders of the spaceShip
  border1 = createSprite(windowWidth/2-100,windowHeight/2-100,140,20);
  border2 = createSprite(windowWidth/2-100,windowHeight/2+100,140,20);
  border3 = createSprite(windowWidth/2+100,windowHeight/2-100,140,20);
  border4 = createSprite(windowWidth/2+100,windowHeight/2+100,120,20);
 
  border1.shapeColor = "red";
  border3.shapeColor = "green";
  border2.shapeColor = "blue";  
  border4.shapeColor = "purple";

  //making the borders and gates invisible 
  border1.visible=false;
  border2.visible=false;
  border3.visible=false;
  border4.visible=false;
  gate1.visible=false;
  gate2.visible=false;
 
   //creating a group for the groups of enemy jets and bullets
  JETTopGroup=new Group();
  JETDownGroup = new Group();
  bulletAttackerDown = new Group();
  bulletAttackerUp = new Group();
  playerBulletGroup = new Group();
  borderUp=new Group();
  borderDown = new Group();
  borderUp.add(border1);borderUp.add(border3);
  borderDown.add(border2);borderUp.add(border4);
}

function draw(){
  console.log(frameCount);

 //the outer part of the spaceShip with the player and the opponents visible
  if(gameState==="STAGE1"){
  background(spaceBGImage);
  fill("red");
  text(mouseX+","+mouseY,mouseX,mouseY);
  fill("white");
  textSize(20);
  text("Points for Booster: "+score,20,20);
  fill("orange");
  textSize(20);
  text("Defense Sheild: "+shield,windowWidth-250,20);
  if(score>200){
    if(shield<=800){
    shield=shield+200;
    }else{
      shield += (1000-shield)
    }
    score=0;
  }
  if(shield<150){
    text("Defense Sheild Critical!! "+shield,windowWidth-300,50);
  }
  //Spawning attacker ships from top and bottom respectively
  attackShipTop();
  attackShipDown();

  //moving the player according to a key
  if(keyIsDown(UP_ARROW)){
    playerJet.y-=5;
  }
  if(keyIsDown(DOWN_ARROW)){
    playerJet.y+=5;
  }
  if(keyIsDown(RIGHT_ARROW)){
    playerJet.x+=5;
  }
  if(keyIsDown(LEFT_ARROW)){
    playerJet.x-=5;
  }

  //used to fore the bullets of the player
  if(keyWentDown("space")){
    bullet = createSprite(playerJet.x,playerJet.y,5,5);
    bullet.shapeColor = "orange";
    bullet.velocityY = -4;
    playerBulletGroup.add(bullet);
    bullet.debug = true;
    //bullet.setCollider("circle",0,0,50);
  }
  
  
  diamond.visible = false;
 
  //fireBalls.visible = false;

  //reduce defense shield when attacker bullets hit the space station
  if(bulletAttackerDown.isTouching(border1)||bulletAttackerDown.isTouching(border2)
  ||bulletAttackerDown.isTouching(border3)||bulletAttackerDown.isTouching(border4)
  ||bulletAttackerUp.isTouching(border1)||bulletAttackerUp.isTouching(border2)
  ||bulletAttackerUp.isTouching(border3)||bulletAttackerUp.isTouching(border4))
  {
    shield = shield-3;
  }

    //the last phase of stage 1 and stage 2 appears
  /*if(JETTopGroup.isTouching(gate1)||JETTopGroup.isTouching(gate2)){
    JETTopGroup.destroyEach();
    JETDownGroup.destroyEach();
    spaceShip.destroy();
    playerJet.destroy();
    playerBulletGroup.destroyEach();
    bulletAttackerDown.destroyEach();
    bulletAttackerUp.destroyEach();
    
    gameState = "STAGE2";
 }*/
  if(shield<0){
    JETTopGroup.destroyEach();
    JETDownGroup.destroyEach();
    spaceShip.destroy();
    playerJet.destroy();
    playerBulletGroup.destroyEach();
    bulletAttackerDown.destroyEach();
    bulletAttackerUp.destroyEach();
    gameState = "STAGE2";
  }
  
  }
  //-----------------------------------------STAGE 2 the view of inside of the spaceShip
  else if(gameState==="STAGE2"){
    //destroy everything
    background("yellow");
    ;
    //call funtion of maze
    maze();
     // diamond.display();
    diamond.visible = true;

    //making
    
  }
  drawSprites();
  fill("yellow");
  textSize(15);
  text("Gate1",windowWidth/2,windowHeight/2-70,20);
  text("Gate2",windowWidth/2,windowHeight/2+100,20);

}

function attackShipTop(){ 
  
  if(frameCount%200 == 0){ 

  jetUp = createSprite(random(200,windowHeight-200),0); 
  jetUp.addImage(jetImg); 
  jetUp.velocityY = 2; 
  jetUp.scale = -0.08;
  //jetUp.debug=true;
  JETTopGroup.add(jetUp);
  jetUp.lifetime = 300;
  }
   if(frameCount%20===0 && frameCount>200){
    bulletUp = createSprite(jetUp.x,jetUp.y,5,5);
    bulletUp.shapeColor = "purple";
    bulletUp.velocityY = 6;
    bulletAttackerUp.add(bulletUp);
    bulletUp.lifetime = 90;
  } 
  if(frameCount>200 && playerBulletGroup.isTouching(jetUp)){
    explosion.play();
    jetUp.destroy();
    score = score+50;
  }
  for(var i=0;i<JETTopGroup.length;i++){
    if(JETTopGroup[i].isTouching(border1) || JETTopGroup[i].isTouching(border3))
    JETTopGroup[i].velocityY=0;
  }
  }

  
 

function attackShipDown(){
  
    if((frameCount+50)%200==0){
        jetDown = createSprite(random(200,windowWidth-200),windowHeight);
        jetDown.addImage(jetImg);
        jetDown.velocityY = -2;
        //jetDown.debug=true;
        jetDown.scale = 0.08;
        JETDownGroup.add(jetDown);
        jetDown.lifetime = 300;
      }
    
    if(frameCount%20===0 && frameCount>150){
      bulletDown = createSprite(jetDown.x,jetDown.y,5,5);
      bulletDown.shapeColor = "purple";
      bulletDown.velocityY = -6;
      bulletAttackerDown.add(bulletDown);
      bulletDown.lifetime = 90;
     //o console.log(frameCount);
    } 
    if(frameCount>150 && playerBulletGroup.isTouching(jetDown)){
      explosion.play();
      jetDown.destroy();
      score = score+40;
    }
    for(var i=0;i<JETDownGroup.length;i++){
      if(JETDownGroup[i].isTouching(border2) || JETDownGroup[i].isTouching(border4))
      JETDownGroup[i].velocityY=0;
      
    }
}

function maze(){
  text(mouseX+","+mouseY,mouseX,mouseY);
  var wall1 = createSprite(105,30,20,470);
  var wall2 = createSprite(130,270,70,20);
  var wall3 = createSprite(170,310,20,100);
  var wall4 = createSprite(170,360,150,20);
  var wall5 = createSprite(105,520,20,170);
  var wall6 = createSprite(754,274,130,20);
  var wall7 = createSprite(754,350,130,20);
  var wall8 = createSprite(155,523,120,20);
  var wall9 = createSprite(205,595,20,160);
  var wall10 = createSprite(1240,30,20,200);
  var wall11 = createSprite(1240,287,20,170);
  var wall12 = createSprite(1240,550,20,200);
  var wall13 = createSprite(1200,90,80,20);
  var wall14 = createSprite(1180,300,120,20);
  var wall15 = createSprite(1225,580,50,20);
  var wall17 = createSprite(1050,30,20,300);
  var wall18 = createSprite(1050,190,90,20);
  var wall19 = createSprite(650,200,120,20);
  var wall20 = createSprite(590,310,20,240);
  var wall21 = createSprite(645,440,130,20);
  var wall22 = createSprite(840,200,120,20);
  var wall23 = createSprite(890,325,20,243);
  var wall24 = createSprite(840,440,120,20);
  var wall25 = createSprite(220,80,250,20);
  var wall26 = createSprite(350,160,20,180);
  var wall27 = createSprite(230,170,50,20);
  var wall28 = createSprite(350,540,20,250);
  var wall29 = createSprite(405,250,130,20);
  var wall30 = createSprite(430,550,180,20);
  var wall31 = createSprite(590,30,20,200);
  var wall32 = createSprite(700,160,20,100);
  var wall33 = createSprite(750,100,120,20);
  var wall34 = createSprite(890,30,20,140);
  var wall35 = createSprite(890,190,20,50);
  var wall36 = createSprite(650,500,20,140);
  var wall37 = createSprite(835,500,20,140);
  var wall38 = createSprite(680,560,80,20);
  var wall39 = createSprite(960,400,150,20);
  var wall40 = createSprite(1100,650,20,350);
  var wall41 = createSprite(875,580,100,20);
  var wall42 = createSprite(510,350,150,20);
  var wall43 = createSprite(535,60,100,20);
  var wall44 = createSprite(240,450,50,20);
  var wall45 = createSprite(1000,300,50,20);
  wall1.shapeColor = "green";
  wall2.shapeColor = "green";
  wall3.shapeColor = "green";
  wall4.shapeColor = "green";
  wall5.shapeColor = "green";
  wall6.shapeColor = "blue";
  wall7.shapeColor = "blue";
  wall8.shapeColor = "green";
  wall9.shapeColor = "red";
  wall10.shapeColor = "green";
  wall11.shapeColor = "green";
  wall12.shapeColor = "green";
  wall13.shapeColor = "green";
  wall14.shapeColor = "green";
  wall15.shapeColor = "red";
 // wall16.shapeColor = "green";
  wall17.shapeColor = "green";
  wall18.shapeColor = "green";
  wall19.shapeColor = "green";
  wall20.shapeColor = "red";
  wall20.shapeColor = "green";
  wall21.shapeColor = "green";
  wall22.shapeColor = "green";
  wall23.shapeColor = "red";
  wall24.shapeColor = "green";
  wall25.shapeColor = "green";
  wall26.shapeColor = "red";
  wall27.shapeColor = "green";
  wall28.shapeColor = "green";
  wall29.shapeColor = "green";
  wall30.shapeColor = "red";
  wall31.shapeColor = "green";
  wall32.shapeColor = "green";
  wall33.shapeColor = "red";
  wall34.shapeColor = "green";
  wall35.shapeColor = "green";
  wall36.shapeColor = "red";
  wall37.shapeColor = "green";
  wall38.shapeColor = "green";
  wall39.shapeColor = "green";
  wall40.shapeColor = "red";
  wall41.shapeColor = "green";
  wall42.shapeColor = "green";
  wall43.shapeColor = "red";
  wall44.shapeColor = "red";
  wall45.shapeColor = "red";


}
