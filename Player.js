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
   }

   addCoin(amount)
   {
      this.numberCoins += amount;
   }

   show()
   {
      fill("grey");
      stroke("black");
      rect(this.x, this.y, this.w, this.h);
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
         if (this.y + this.yVelocity > 0)
         {
            this.y += this.yVelocity;
         }
         else
         {
            this.y = 1;
            this.yVelocity = 0;
         }
      }
   }

   moveDown()
   {
      if (this.isMovingDown())
      {
         // First check for floor
         if (this.y + this.h + this.yVelocity < height)
         {
            this.y += this.yVelocity;
         }
         else
         {
            this.y = height - this.h;
            this.yVelocity = 0;
         }
      }
   }

   moveRight()
   {
      if (this.isMovingRight())
      {
         // First check for the wall
         if (this.x + this.w + this.xVelocity < width)
         {
            this.x += this.xVelocity;
         }
         else
         {
            this.x = width - this.w - 1;
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
            this.x = 2;
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
}