let player;
let coin;
let platforms = [];

function setup()
{
   createCanvas(400, 300);
   player = new Player(85, height-31, 20, 20, platforms);

   platforms.push(new Platform(100, 100, 50, 10));
   platforms.push(new Platform(100, height - 60, 50, 10));
   platforms.push(new Platform(150, height - 100, 50, 10));
   platforms.push(new Platform(200, height - 150, 50, 10));

   frameRate(30);

   coin = new Coin(80, height-10, 20, 10);
}

function draw()
{
   background(55);
   player.show();
   coin.show();

   console.log(coin.checkCollision(player));

   for (let p of platforms)
   {
      p.show();
   }

   let collision = false;
   for (let p of platforms)
   {
      if (p.checkCollision(player))
      {
         collision = true;
         break;
      }
   }

   if (!collision)
   {
      for (let p of platforms)
      {
         if (p.onPlatform(player))
         {
            player.onPlatform = true;
            break;
         }
         player.onPlatform = false;
      }
   }

   player.move();
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