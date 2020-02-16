let player;
let platforms = [];
let coins = [];

function setup()
{
   createCanvas(400, 300);
   let canvas = document.getElementById("defaultCanvas0");
   canvas.style.border = "1px solid black";

   player = new Player(1, height-31, 20, 20, platforms);

   platforms.push(new Platform(100, 100, 50, 10));
   platforms.push(new Platform(100, height - 60, 50, 10));
   platforms.push(new Platform(150, height - 100, 50, 10));
   platforms.push(new Platform(200, height - 150, 50, 10));

   coins.push(new Coin(width - 30, height-10, 20, 10));
   coins.push(new Coin(width - 53, height-10, 20, 10));
   coins.push(new Coin(width - 41, height-60, 20, 10));
   coins.push(new Coin(125, height-71, 20, 10));
   coins.push(new Coin(125, height-211, 20, 10));
   coins.push(new Coin(175, height-111, 20, 10));
   coins.push(new Coin(225, height-161, 20, 10));
}

function draw()
{
   background("white");
   player.show();

   fill("black");
   textAlign(RIGHT);
   textSize(16);
   text(`Coins: ${player.numberCoins}`, width - 10, 20);

   for (let coin of coins)
   {
      coin.checkCollision(player);
      coin.show();
   }
   transferCoinsTakenToPlayer();

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

function transferCoinsTakenToPlayer()
{
   for (let i = coins.length -1; i >= 0; i--)
   {
      if (coins[i].taken)
      {
         player.addCoin(1);
         coins.splice(i, 1);
      }
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