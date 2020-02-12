let player;
let platforms = [];

function setup()
{
   createCanvas(400, 300);
   player = new Player(260, height-141, 20, 20, platforms);

   platforms.push(new Platform(100, 100, 50, 10));
   platforms.push(new Platform(100, height - 60, 50, 10));
   platforms.push(new Platform(150, height - 100, 50, 10));
   platforms.push(new Platform(200, height - 150, 50, 10));
}

function draw()
{
   background(55);
   player.show();
   player.move();

   for (let p of platforms)
   {
      p.show();
   }
}

function keyPressed()
{
   if (keyCode == 39)
   {
      player.right();
   }

   if (keyCode == 37)
   {
      player.left();
   }
}

function keyReleased()
{
   if (keyCode == 39)
   {
      player.stopRight();
   }

   if (keyCode == 37)
   {
      player.stopLeft();
   }

   if (keyCode == 38 || keyCode == 32)
   {
      player.jump();
   }
}