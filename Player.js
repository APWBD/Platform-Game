class Player
{
   constructor(x, y, w, h, platforms)
   {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.platforms = platforms;
      this.xVelocity = 0;
      this.yVelocity = 0;
      this.speed = 3;
      this.jumpVelocity = 4;
      this.gChange = 0.1;
      this.gMax = 5;
      this.onPlatform = false;
      this.numberCoins = 0;
      this.lives = 3;
      this.keys = [];

      this.showCostume = 1;
      this.customeTimer = 0;
   }

   addLive()
   {
      this.lives++;
   }

   removeLife()
   {
      this.lives--;
   }

   isAlive()
   {
      return (this.lives > 0);
   }

   addKey(key)
   {
      this.keys.push(key);
   }

   addCoin(amount)
   {
      this.numberCoins += amount;
   }

   show()
   {
      if (this.customeTimer % 15 == 0)
      {
         this.showCostume = (this.showCostume == 1) ? 2 : 1;
         this.customeTimer = 0;
      }
      this.customeTimer++;

      if (!this.isMovingLeft() && !this.isMovingRight())
      {
         if (this.showCostume == 1)
         {
            this.showIdleOne();
         }
         else
         {
            this.showIdleTwo();
         }
      }
      else if (this.isMovingRight())
      {
         if (this.showCostume == 1)
         {
            this.showRightOne();
         }
         else
         {
            this.showRightTwo();
         }
      }
      else if (this.isMovingLeft())
      {
         if (this.showCostume == 1)
         {
            this.showLeftOne();
         }
         else
         {
            this.showLeftTwo();
         }
      }
   }

   move()
   {
      if (!this.onPlatform)
      {
         if (this.yVelocity + this.gChange < this.gMax)
         {
            this.yVelocity += this.gChange;
         }
      }

      this.moveRight();
      this.moveLeft();
      this.moveDown();
      this.moveUp();
   }

   gravity()
   {
      if (!this.isGrounded())
      {
         this.y += this.g;
      }
   }

   isGrounded()
   {
      return (!this.isMovingDown() && !this.isMovingUp())
   }

   moveUp()
   {
      if (this.isMovingUp())
      {
         // Check for roof
         if (this.y + this.yVelocity > 0 + offset.y)
         {
            this.y += this.yVelocity;
         }
         else
         {
            this.y = 1 + offset.y;
            this.yVelocity = 0;
         }
      }
   }

   moveDown()
   {
      if (this.isMovingDown())
      {
         // First check for floor
         if (this.y + this.h + this.yVelocity < height/s)
         {
            this.y += this.yVelocity;
         }
         else
         {
            this.y = height/s - this.h;
            this.yVelocity = 0;
         }
      }
   }

   moveRight()
   {
      if (this.isMovingRight())
      {
         // First check for the wall
         if (this.x + this.w + this.xVelocity < width/s)
         {
            this.x += this.xVelocity;
         }
         else
         {
            this.x = width/s - this.w - 1*s;
         }
      }
   }

   moveLeft()
   {
      if (this.isMovingLeft())
      {
         // First check for the wall
         if (this.x + this.xVelocity - 1 > 0)
         {
            this.x += this.xVelocity;
         }
         else
         {
            this.x = 2*s;
         }
      }
   }

   right()
   {
      this.xVelocity = this.speed;
   }

   left()
   {
      this.xVelocity = -this.speed;
   }

   stopRight()
   {
      if (this.isMovingRight())
      {
         this.stopX();
      }
   }

   stopLeft()
   {
      if (this.isMovingLeft())
      {
         this.stopX();
      }
   }

   stopX()
   {
      this.xVelocity = 0;
   }

   stopY()
   {
      this.yVelocity = 0;
   }

   isMovingLeft()
   {
      return (this.xVelocity < 0);
   }

   isMovingRight()
   {
      return (this.xVelocity > 0);
   }

   isMovingUp()
   {
      return (this.yVelocity < 0);
   }

   isMovingDown()
   {
      return (this.yVelocity > 0);
   }

   jump()
   {
      if (this.isGrounded())
      {
         this.yVelocity = -this.jumpVelocity;
         this.onPlatform = false;
      }
   }

   showIdleOne()
   {
      const tileSize = 3;

      // Hat
      noStroke();
      let xPos = this.x + ((24-tileSize)/2);
      fill("green");
      square(xPos, this.y, tileSize);
      stroke("green");
      line(xPos, this.y + tileSize, xPos + tileSize, this.y + tileSize);

      // Head
      fill(255);
      strokeWeight(1);
      stroke(0);
      circle(xPos + tileSize/2, this.y + tileSize*2, tileSize*2);
      noStroke();
      // Eyes
      fill(0);
      circle(xPos - tileSize/2 + 4, this.y + tileSize + 2, 1);
      circle(xPos - tileSize/2 + 2, this.y + tileSize + 2, 1);
      // Nose
      fill("orange");
      circle(xPos - tileSize/2 + 3, this.y + tileSize + 3, 1);

      // Mouth
      strokeWeight(1);
      stroke(0);
      line(xPos - tileSize/2 + 2, this.y + 2*tileSize+1, xPos - tileSize/2 + 4, this.y + 2*tileSize+1);

      // Body
      fill(255);
      strokeWeight(1);
      ellipse(xPos + tileSize/2, this.y + 6*tileSize, 4*tileSize, 6*tileSize);

      // Right Arm
      line(xPos - tileSize - 1, this.y + 5*tileSize, xPos - tileSize - 4, this.y + 7*tileSize);
      line(xPos - tileSize - 2.6, this.y + 5*tileSize + 3, xPos - tileSize - 5, this.y + 7*tileSize);
      line(xPos - tileSize - 2.6, this.y + 5*tileSize + 3, xPos - tileSize - 2, this.y + 7*tileSize);

      // Left Arm
      line(xPos + 2*tileSize + 1, this.y + 5*tileSize, xPos + tileSize + 6, this.y + 7*tileSize);
      line(xPos + 2*tileSize + 2.1, this.y + 5*tileSize + 3, xPos + tileSize + 5, this.y + 7*tileSize);
      line(xPos + 2*tileSize + 2.1, this.y + 5*tileSize + 3, xPos + tileSize + 7, this.y + 7*tileSize);

      // Right Leg
      line(xPos, this.y + 9*tileSize, xPos - 1, this.y + 10*tileSize - 1);
      line(xPos - 1, this.y + 10*tileSize - 1, xPos - 2, this.y + 10*tileSize - 1);

      // Left Leg
      line(xPos + tileSize, this.y + 9*tileSize, xPos + tileSize + 1, this.y + 10*tileSize - 1);
      line(xPos + tileSize + 1, this.y + 10*tileSize - 1, xPos + tileSize + 2, this.y + 10*tileSize - 1);
   }

   showIdleTwo()
   {
      const tileSize = 3;

      // Hat
      noStroke();
      let xPos = this.x + ((24-tileSize)/2);
      fill("green");
      square(xPos, this.y, tileSize);
      stroke("green");
      line(xPos, this.y + tileSize, xPos + tileSize, this.y + tileSize);

      // Head
      fill(255);
      strokeWeight(1);
      stroke(0);
      circle(xPos + tileSize/2, this.y + tileSize*2, tileSize*2);
      noStroke();
      // Eyes
      fill(0);
      circle(xPos - tileSize/2 + 4, this.y + tileSize + 2, 1);
      circle(xPos - tileSize/2 + 2, this.y + tileSize + 2, 1);
      // Nose
      fill("orange");
      circle(xPos - tileSize/2 + 3, this.y + tileSize + 3, 1);

      // Mouth
      strokeWeight(1);
      stroke(0);
      line(xPos - tileSize/2 + 2, this.y + 2*tileSize+1, xPos - tileSize/2 + 4, this.y + 2*tileSize+1);

      // Body
      fill(255);
      strokeWeight(1);
      ellipse(xPos + tileSize/2, this.y + 6*tileSize, 4*tileSize, 6*tileSize);

      // Right Arm
      line(xPos - tileSize - 1, this.y + 5*tileSize, xPos - tileSize - 6, this.y + 5*tileSize);
      line(xPos - tileSize - 3, this.y + 5*tileSize, xPos - tileSize - 6, this.y + 4*tileSize);
      line(xPos - tileSize - 3, this.y + 5*tileSize, xPos - tileSize - 6, this.y + 6*tileSize);

      // Left Arm
      line(xPos + 2*tileSize + 1, this.y + 5*tileSize, xPos + tileSize + 9, this.y + 5*tileSize);
      line(xPos + 2*tileSize + 3, this.y + 5*tileSize, xPos + tileSize + 9, this.y + 4*tileSize);
      line(xPos + 2*tileSize + 3, this.y + 5*tileSize, xPos + tileSize + 9, this.y + 6*tileSize);

      // Right Leg
      line(xPos, this.y + 9*tileSize, xPos - 1, this.y + 10*tileSize - 1);
      line(xPos - 1, this.y + 10*tileSize - 1, xPos - 2, this.y + 10*tileSize - 1);

      // Left Leg
      line(xPos + tileSize, this.y + 9*tileSize, xPos + tileSize + 1, this.y + 10*tileSize - 1);
      line(xPos + tileSize + 1, this.y + 10*tileSize - 1, xPos + tileSize + 2, this.y + 10*tileSize - 1);
   }

   showRightOne()
   {
      // Nose
      stroke("orange");
      fill("orange");
      triangle(this.x + 17.5, this.y + 5, this.x + 17.5, this.y + 6, this.x + 19, this.y + 5.5);

      // Head
      stroke(0);
      fill(255);
      circle(this.x + 15, this.y + 5, 5);

      // Eye
      fill(0);
      noStroke();
      circle(this.x + 16, this.y + 4.7, 1);

      // Hat
      noStroke();
      fill("green");
      rect(this.x + 13.5, this.y, 2.5, 2.5);
      stroke("green");
      line(this.x + 12, this.y + 2.5, this.x + 17, this.y + 2.5);

      // Body
      stroke(0);
      fill(255);
      ellipse(this.x + 15, this.y + 17.5, 15, 18);

      // Pocket
      stroke(99);
      strokeWeight(0.5);
      line(this.x + 17.5, this.y + 18, this.x + 15, this.y + 21.5);

      // Right Arm
      strokeWeight(1);
      stroke(0);
      line(this.x + 15, this.y + 15, this.x + 13, this.y + 18);
      line(this.x + 13, this.y + 18, this.x + 16, this.y + 20);

      // Right Leg
      line(this.x + 15, this.y + 26.5, this.x + 15, this.y + 30);
      line(this.x + 16, this.y + 30, this.x + 18, this.y + 30);

      // Left Leg
      line(this.x + 15, this.y + 26.5, this.x + 11, this.y + 27);
      line(this.x + 11, this.y + 27, this.x + 13, this.y + 29);
   }

   showRightTwo()
   {
      // Nose
      stroke("orange");
      fill("orange");
      triangle(this.x + 17.5, this.y + 5, this.x + 17.5, this.y + 6, this.x + 19, this.y + 5.5);

      // Head
      stroke(0);
      fill(255);
      circle(this.x + 15, this.y + 5, 5);

      // Eye
      fill(0);
      noStroke();
      circle(this.x + 16, this.y + 4.7, 1);

      // Hat
      noStroke();
      fill("green");
      rect(this.x + 13.5, this.y, 2.5, 2.5);
      stroke("green");
      line(this.x + 12, this.y + 2.5, this.x + 17, this.y + 2.5);

      // Body
      stroke(0);
      fill(255);
      ellipse(this.x + 15, this.y + 17.5, 15, 18);

      // Pocket
      stroke(99);
      strokeWeight(0.5);
      line(this.x + 17.5, this.y + 18, this.x + 15, this.y + 21.5);

      // Right Arm
      strokeWeight(1);
      stroke(0);
      line(this.x + 15, this.y + 15, this.x + 13, this.y + 18);
      line(this.x + 13, this.y + 18, this.x + 16, this.y + 20);

      // Right Leg
      line(this.x + 15, this.y + 26.5, this.x + 18, this.y + 28);
      line(this.x + 18, this.y + 28, this.x + 20, this.y + 27);

      // Left Leg
      line(this.x + 15, this.y + 26.5, this.x + 15, this.y + 30);
      line(this.x + 15, this.y + 30, this.x + 18, this.y + 30);
   }

   showLeftOne()
   {
      // Nose
      stroke("orange");
      fill("orange");
      triangle(this.x + 5, this.y + 5, this.x + 5, this.y + 6, this.x + 3.5, this.y + 5.5);

      // Head
      stroke(0);
      fill(255);
      circle(this.x + 7.5, this.y + 5, 5);

      // Eye
      fill(0);
      noStroke();
      circle(this.x + 6.5, this.y + 4.7, 1);

      // Hat
      noStroke();
      fill("green");
      rect(this.x + 6, this.y, 2.5, 2.5);
      stroke("green");
      line(this.x + 4.5, this.y + 2.5, this.x + 9.5, this.y + 2.5);

      // Body
      stroke(0);
      fill(255);
      ellipse(this.x + 7.5, this.y + 17.5, 15, 18);

      // Pocket
      stroke(99);
      strokeWeight(0.5);
      line(this.x + 5, this.y + 18, this.x + 7, this.y + 21.5);

      // Left Arm
      strokeWeight(1);
      stroke(0);
      line(this.x + 7.5, this.y + 15, this.x + 9, this.y + 18);
      line(this.x + 9, this.y + 18, this.x + 7, this.y + 20);

      // Right Leg
      line(this.x + 7.5, this.y + 26.5, this.x + 7.5, this.y + 30);
      line(this.x + 7.5, this.y + 30, this.x + 5.5, this.y + 30);

      // Left Leg
      line(this.x + 7.5, this.y + 26.5, this.x + 11.5, this.y + 27);
      line(this.x + 11.5, this.y + 27, this.x + 12, this.y + 29);
   }

   showLeftTwo()
   {
      // Nose
      stroke("orange");
      fill("orange");
      triangle(this.x + 5, this.y + 5, this.x + 5, this.y + 6, this.x + 3.5, this.y + 5.5);

      // Head
      stroke(0);
      fill(255);
      circle(this.x + 7.5, this.y + 5, 5);

      // Eye
      fill(0);
      noStroke();
      circle(this.x + 6.5, this.y + 4.7, 1);

      // Hat
      noStroke();
      fill("green");
      rect(this.x + 6, this.y, 2.5, 2.5);
      stroke("green");
      line(this.x + 4.5, this.y + 2.5, this.x + 9.5, this.y + 2.5);

      // Body
      stroke(0);
      fill(255);
      ellipse(this.x + 7.5, this.y + 17.5, 15, 18);

      // Pocket
      stroke(99);
      strokeWeight(0.5);
      line(this.x + 5, this.y + 18, this.x + 7, this.y + 21.5);

      // Left Arm
      strokeWeight(1);
      stroke(0);
      line(this.x + 7.5, this.y + 15, this.x + 9, this.y + 18);
      line(this.x + 9, this.y + 18, this.x + 7, this.y + 20);

      // Right Leg
      line(this.x + 7.5, this.y + 26.5, this.x + 9.5, this.y + 30);
      line(this.x + 9.5, this.y + 30, this.x + 7.5, this.y + 30);

      // Left Leg
      line(this.x + 7.5, this.y + 26.5, this.x + 4.5, this.y + 29);
      line(this.x + 4.5, this.y + 29, this.x + 3, this.y + 27);
   }
}