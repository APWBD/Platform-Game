class Key extends Item
{
   constructor(x, y, scale, c, name)
   {
      super(x,y);
      this.name = name;
      this.taken = false;
      this.scale = scale;
      this.color = c;
   }

   show()
   {
      noFill();
      stroke(this.color);
      strokeWeight(2 * this.scale);
      circle(this.x, this.y, 20 * this.scale);
      line(this.x + 10 * this.scale, this.y, this.x + 35 * this.scale, this.y);
      fill("silver");
      noStroke();
      rect(this.x + 25 * this.scale, this.y+1, 10 * this.scale, 8 * this.scale);
      stroke(this.color);
      line(this.x + 25 * this.scale, this.y, this.x + 25 * this.scale, this.y + 10 * this.scale);
      line(this.x + 35 * this.scale, this.y, this.x + 35 * this.scale, this.y + 10 * this.scale);
      line(this.x + 30 * this.scale, this.y, this.x + 30 * this.scale, this.y + 6 * this.scale);
      line(this.x + 25 * this.scale, this.y + 10 * this.scale, this.x + 35 * this.scale, this.y + 10 * this.scale);
   }

   checkCollision(p)
   {
      if (p.x + p.w > this.x - 10 * this.scale &&
         p.x < this.x + 35 * this.scale &&
         p.y + p.h > this.y - 10 * this.scale &&
         p.y < this.y + 10 * this.scale)
         {
            return true;
         }
   }
}