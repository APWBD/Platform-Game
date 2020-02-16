class Platform
{
   constructor(x, y, w, h)
   {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
   }

   show()
   {
      fill(255, 255, 0);
      noStroke();
      rect(this.x, this.y, this.w, this.h);
   }

   onPlatform(p)
   {
      if (p.x < this.x + this.w && p.x + p.w > this.x && p.y == this.y - p.h - 1)
      {
         return true;
      }
   }

   checkCollision(p)
   {
      if (p.x + p.xVelocity < this.x + this.w &&
         p.x + p.w + p.xVelocity > this.x &&
         p.y + p.yVelocity < this.y + this.h &&
         p.y + p.h + p.yVelocity > this.y)
      {
         if (p.isMovingUp())
         {
            if (p.y + p.h > this.y + this.h)
            {
               p.y = this.y + this.h + 1;
            }
         }

         if (p.isMovingDown())
         {
            if (p.y < this.y)
            {
               p.y = this.y - p.h - 1;
               p.onPlatform = true;
            }
         }

         if (p.isMovingRight())
         {
            if (p.x < this.x)
            {
               p.x = this.x - p.w;
            }
         }

         if (p.isMovingLeft())
         {
            if (p.x + p.w > this.x + this.w)
            {
               p.x = this.x + this.w;
            }
         }

         p.xVelocity = 0;
         p.yVelocity = 0;
         return true; // Tell caller that a collision has happened
      }
   }
}