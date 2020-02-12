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
      this.jumpHeight = this.h * 2;
      this.g = 1.5;
   }

   show()
   {
      fill(255);
      noStroke();
      rect(this.x, this.y, this.w, this.h);
   }

   move()
   {
      this.moveRight();
      this.moveLeft();

   }

   gravity()
   {
      this.checkYPlatform();
      if (this.noYObstacle())
      {
         this.y += this.g;
      }
   }

   isGrounded()
   {
      return (!this.isMovingDown() && !this.isMovingUp())
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

         for (let p of this.platforms)
         {
            // Check if players is within height of platform
            if (
               (this.y > p.y && this.y < p.y + p.h) ||
               (this.y + this.h > p.y && this.y + this.h < p.y + p.h)
               )
               {
                  if (this.x + this.w + this.xVelocity +1 < p.x)
                  {
                     this.x += this.xVelocity;
                  }
                  else
                  {
                     this.x = p.x - this.w - 1;
                  }
               }
         }
      }
   }

   moveLeft()
   {
      if (this.isMovingLeft())
      {
         // First check for the wall
         if (this.x - this.xVelocity - 5 > 0)
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
         this.y += -this.jumpHeight;
      }
   }
}