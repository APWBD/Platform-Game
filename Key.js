class Key extends Item
{
   constructor(x, y)
   {
      super(x,y);
      this.taken = false;
   }

   show()
   {
      noFill();
      stroke("black");
      strokeWeight(2);
      circle(this.x, this.y, 20);
      line(this.x + 10, this.y, this.x + 35, this.y);
      fill("silver");
      noStroke();
      rect(this.x + 25, this.y+1, 10, 8);
      stroke("black");
      line(this.x + 25, this.y, this.x + 25, this.y + 10);
      line(this.x + 35, this.y, this.x + 35, this.y + 10);
      line(this.x + 30, this.y, this.x + 30, this.y + 6);
      line(this.x + 25, this.y + 10, this.x + 35, this.y + 10);
   }

   checkCollision(p)
   {
      if (p.x + p.w > this.x - 10 &&
         p.x < this.x + 35 &&
         p.y + p.h > this.y - 10 &&
         p.y < this.y + 10)
         {
            return true;
         }
   }
}