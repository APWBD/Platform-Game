class Coin extends Item
{
   constructor(x, y, w, h)
   {
      super(x,y, w, h);
   }

   show()
   {
      noStroke();
      fill("gold");
      circle(this.x, this.y, this.w);
   }

   checkCollision(p)
   {
      let radius = this.w / 2;
      let left = p.x;
      let right = p.x + p.w;
      let top = p.y;
      let bottom = p.y + p.h;

      let closestX = (this.x < left ? left : (this.x > right ? right : this.x));
      let closestY = (this.y < top ? top : (this.y > bottom ? bottom : this.y));
      let dx = closestX - this.x;
      let dy = closestY - this.y;

      return Math.sqrt(dx*dx + dy*dy) <= radius;
   }
}