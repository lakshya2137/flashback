var backg, backg2;
var player, playerAnima;
var invis_ground;

var gun, gunImg, laser, laserImg;

var up, down, left, right;
var up_arr, down_arr, left_arr, right_arr;

var zombie, zomAnima, zombieGroup;

var time1, time2, time3, time4;
var t1Img, t2Img, t3Img, t4Img;

var form;

var light, lightImg;

var font;

var nameInput, button;

var life;
var lives = 3;

var gameState = 0;

var lasermusic, oof;

var energy_count = 0;
var part_count = 4;

function preload(){
  backg = loadImage("./images/bg2.png");
  backg2 = loadImage("./images/bg.jpg");

  zomAnima = loadAnimation("./anime/1f.png", "./anime/2f.png", "./anime/3f.png", "./anime/4f.png", "./anime/5f.png");

  gunImg = loadImage("./images/gun.png");
  laserImg = loadImage("./images/laser1.png");

  up_arr = loadImage("./images/up.png");
  down_arr = loadImage("./images/down.png");
  left_arr = loadImage("./images/left.png");
  right_arr = loadImage("./images/right.png");

  lifeImg = loadImage("./images/heart.png");

  lightImg = loadImage("./images/energy.png");

  font = loadFont("./russo.ttf");

  lasermusic = loadSound("./sounds/laser.mp3");
  oof = loadSound("./sounds/dead.mp3");
  gameover = loadSound("./sounds/gameover.mp3");

  t1Img = loadImage("./images/part1.png");
  t2Img = loadImage("./images/part2.png");
  t3Img = loadImage("./images/part3.png");
  t4Img = loadImage("./images/part4.png");

}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);

  player = createSprite(windowWidth/3-170, windowHeight/2-360, 40, 70);
  player.shapeColor = "white";

  invis_ground = createSprite(windowWidth/2, windowHeight/2+331, displayWidth, 10);
  invis_ground.visible = false;

  gun = createSprite(0, 0, 10, 10);
  laser = createSprite(gun.x+37, gun.y-4, 10, 10);

  up = createSprite(windowWidth/19-37, windowHeight/3-170, 10, 10);
  down = createSprite(windowWidth/19-37, windowHeight/3-135, 10, 10);
  left = createSprite(windowWidth/19-37, windowHeight/3-100, 10, 10);
  right = createSprite(windowWidth/19-37, windowHeight/3-65, 10, 10);

  zombieGroup = new Group();

  light = createSprite(windowWidth/5-20, windowHeight/3-200);
  light.addImage("energy", lightImg);

  life = createSprite(windowWidth/2-25, windowHeight/3-50);
  life.addImage("live", lifeImg);

  time1 = createSprite(windowWidth+200, windowHeight/2+320, 10, 10);
  time2 = createSprite(windowWidth+100, windowHeight/2+320, 10, 10);
  time3 = createSprite(windowWidth+300, windowHeight/2+320, 10, 10);
  time4 = createSprite(windowWidth+400, windowHeight/2+320, 10, 10);
 }

function draw() {
  background(backg);

  if(gameState === 0){
    form = new Form();
    form.display();

    fill("white");
    textSize(60);
    textFont(font);
    text("FLASHBACKS", windowWidth/2-180, windowHeight/4-130);
    textSize(15);
    textFont(font);
    text("Story:", windowWidth/3-550, windowHeight/2+70);
    text("You are a soldier who has been teleported to the future.", windowWidth/3-550, windowHeight/2+90);
    text("You have already collected some parts to build your time machine...", windowWidth/3-550, windowHeight/2+105);
    text("You have to collect 4 more parts to return to your home(i.e. Egypt)", windowWidth/3-550, windowHeight/2+120);
    text("Objective:", windowWidth/3-550, windowHeight/2+155);
    text("You need to collect 4 more parts of your time machine which apperar", windowWidth/3-550, windowHeight/2+170);
    text("The controls will be seen when you hit play", windowWidth/3-550, windowHeight/2+185);
    text("But beware! There are zombies to stop you!", windowWidth/3-550, windowHeight/2+200);
    text("Note: You have to keep pressing the up arrow key to shoot as it generates power", windowWidth/3-550, windowHeight/2+230);
    text("The parts appear only after evry 20 points...", windowWidth/3-550, windowHeight/2+245);
    text("You get 5 points each for killing a zombie", windowWidth/3-550, windowWidth/2+260);
    text("Some zombies are invincible so have to jump over them", windowWidth/3-550, windowHeight/2+275);
    textSize(30);
    text("Good Luck!", windowWidth/2-300, windowHeight/2+270);
  }

  if(gameState === 1){
  textFont(font);
  textSize(30);
  fill("white");
  text("Controls:", windowWidth/49, windowHeight/3-225);
  
  gun.addImage("duh", gunImg);

  up.addImage("lol", up_arr);
  fill("white");
  text("- Shoot", windowWidth/19-10, windowHeight/3-160);
  down.addImage("lmao", down_arr);
  fill("white");
  text("- Jump", windowWidth/19-10, windowHeight/3-125);
  left.addImage("coffin", left_arr);
  fill("white");
  text("- Move Right", windowWidth/19-10, windowHeight/3-90);
  right.addImage("wide_putin", right_arr);
  fill("white");
  text("- Move Left", windowWidth/19-10, windowHeight/3-55);

  player.collide(invis_ground);

  if(keyIsDown(LEFT_ARROW)){
    player.x = player.x + 5;
  } else if(keyIsDown(RIGHT_ARROW)){
    player.x = player.x - 5;
  } else if(keyIsDown(DOWN_ARROW) && player.y >= windowHeight/2+265){
    player.velocityY = -18;
  } 
  if(keyIsDown(UP_ARROW) && frameCount % 45 === 0){
    laser = createSprite(gun.x+37, gun.y-4, 10, 10);
    laser.addImage("bruh", laserImg);
    laser.velocityX = 8;
    lasermusic.play();
  }
  
  gun.x = player.x + 23;
  gun.y = player.y + 5;

  player.velocityY = player.velocityY + 0.8;

  laser.setCollider("rectangle", 19, 0, 125, 30);

  if(energy_count === 20){
    time1.x = windowWidth/3+230;
    time1.addImage("part1", t1Img);
  }
 if(player.collide(time1)){
   time1.lifetime = 0;
   part_count = part_count - 1;
 }

 if(energy_count === 40){
   time2.x = windowWidth/5-100;
   time2.addImage("part2", t2Img);
 }
 if(player.collide(time2)){
   time2.lifetime = 0;
   part_count = part_count - 1;
 }

 if(energy_count === 60){
   time3.x = windowWidth-100;
   time3.addImage("part3", t3Img);
 }
 if(player.collide(time3)){
   time3.lifetime = 0;
   part_count = part_count - 1;
 }

 if(energy_count === 80){
   time4.x = windowWidth-500;
   time4.addImage("part4", t4Img);
}
if(player.collide(time4)){
  time4.lifetime = 0;
  part_count = part_count - 1;
}
  createZombie();

  if(laser.isTouching(zombieGroup)){
    laser.visible = false;
    zombie.visible = false;
    zombie.lifetime = 0;
  }
  if(laser.collide(zombieGroup)){
    energy_count = energy_count + 5;
  }

  textSize(30);
  text(lives, windowWidth/2, windowHeight/3-40);

  textSize(50);
  text(energy_count, light.x+18, light.y+12);

  textSize(30);
  text("Parts Missing : " + part_count, windowWidth-370, windowHeight/3-196);

  drawSprites();
}

if(part_count === 0){
  gameState = 3;
}
  if(zombieGroup.collide(player)){
    zombieGroup.lifetime = 0;
    zombieGroup.destroyEach();
    lives = lives - 1;
  }

  if(lives === 0){
    gameState = 2;
    // oof.play();
    // oof.loop(false);
  }

  if(gameState === 2){
    player.visible = false;
    gun.visible = false;
    zombie.visible = false;
    zombieGroup.visible = false;
    zombie.lifetime = 0;
    fill("white");
    textFont(font);
    textSize(60);
    text("GAME OVER", windowWidth/2-180, windowHeight/2-100);
    textSize(45);
    text("Score: " + energy_count, windowWidth/2-90, windowHeight/2-40);
  }

  if(gameState === 3){
    background(backg2);
    fill("black");
    textSize(30);
    textFont(font);
    text("You Win!", windowWidth/2-100, windowHeight/2);
    text("You are back to your normal life...", windowWidth/2-150, windowHeight/2);
  }
}

function createZombie() {
  if(frameCount % 130 === 0){
    zombie = createSprite(windowWidth/2+100, windowHeight/2-360, 10, 100);
    zombie.addAnimation("anima", zomAnima);
    zombie.x = Math.round(random(windowWidth/2+370, windowWidth));
    zombie.y = Math.round(windowHeight/2+275);
    zombie.velocityX = -6;
    
    zombie.setCollider("rectangle", 0, 0, 75, 130);
    //zombie.debug = true;
    zombieGroup.add(zombie);
  }
}