let gameSetupJSON;
let gameStatsJSON;
let gameLevelsJSON;

let offset;
let currentLevel;

let player;

let stats = {};
let level = {};
let s = 1; // Scale variable, used in player for collision detection and in draw for scaling

function createLevel(l)
{
   const levelJSON = gameLevelsJSON[l];

   level.Platforms = [];
   for (let p of levelJSON.Platforms)
   {
      level.Platforms.push(new Platform(p.x + offset.x, p.y + offset.y, p.w, p.h));
   }

   level.Keys = [];
   for (let k of levelJSON.Keys)
   {
      level.Keys.push(new Key(k.x + offset.x, k.y + offset.y, k.scale, k.color, k.name));
   }

   level.Coins = [];
   for (let c of levelJSON.Coins)
   {
      level.Coins.push(new Coin(c.x + offset.x, c.y + offset.y, c.r));
   }
}

function createStatsArea()
{
   const coin = gameStatsJSON.Coin;
   stats.Coin = new Coin(coin.x, coin.y, coin.r);

   stats.Hearts = [];
   for (let h of gameStatsJSON.Hearts)
   {
      stats.Hearts.push(new Heart(h.x, h.y, h.size, h.scale));
   }

   stats.Keys = [];
   for (let k of gameStatsJSON.Keys)
   {
      stats.Keys.push(new Key(k.x, k.y, k.scale, k.color, k.name));
   }
}

function preload()
{
   gameSetupJSON = loadJSON("/GameSetup.json");
   gameStatsJSON = loadJSON("/GameStats.json");
   gameLevelsJSON = loadJSON("/GameLevels.json");
}

function setup()
{
   offset = gameSetupJSON.offset;

   let scaleX = (windowWidth) / (400 + offset.x + 50);
   let scaleY = (windowHeight) / (300 + offset.y + 50);
   s = (scaleX < scaleY) ? scaleX : scaleY;

   createCanvas(400*s + offset.x*s, 300*s + offset.y * s);
   let canvas = document.getElementById("defaultCanvas0");
   canvas.style.border = "1px solid black";

   // Stats Begins
   createStatsArea();
   // Stats Ends

   currentLevel = 1;
   createLevel(currentLevel);

   player = new Player(100, 500, 24, 30, level.Platforms);
}

function showStatsArea()
{
   fill(255);
   stroke("black");
   rect(0 - 1, 0 - 1, width + 2, offset.y);

   stats.Coin.show();
   fill("black");
   textAlign(LEFT);
   textSize(20);
   noStroke();
   text(`${player.numberCoins}`, 40, 27);

   for (let key of stats.Keys)
   {
      key.show();
      for (let k of player.keys)
      {
         if (k.name == key.name)
         {
            key.color = k.color;
            break;
         }
      }
   }

   for (let i = 0; i < player.lives; i++)
   {
      stats.Hearts[i].show();
   }
}

function draw()
{
   scale(s);
   background("white");

   // Show stats area
   showStatsArea();

   player.show();

   let i = 0;
   for (let key of level.Keys)
   {
      if (key.checkCollision(player))
      {
         player.addKey(key);
         key.taken = true;
         level.Keys.splice(i, 1);
      }

      if (!key.taken)
      {
         key.show();
      }
      i++;
   }

   for (let coin of level.Coins)
   {
      coin.checkCollision(player);
      coin.show();
   }
   transferCoinsTakenToPlayer();

   for (let p of level.Platforms)
   {
      p.show();
   }

   let collision = false;
   for (let p of level.Platforms)
   {
      if (p.checkCollision(player))
      {
         collision = true;
         break;
      }
   }

   if (!collision)
   {
      for (let p of level.Platforms)
      {
         if (p.onPlatform(player))
         {
            player.onPlatform = true;
            break;
         }
         player.onPlatform = false;
      }

      player.move();
   }
}

function transferCoinsTakenToPlayer()
{
   for (let i = level.Coins.length -1; i >= 0; i--)
   {
      if (level.Coins[i].taken)
      {
         player.addCoin(1);
         level.Coins.splice(i, 1);
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