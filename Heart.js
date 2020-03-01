class Heart extends Item
{
   constructor(x, y, r, scale)
   {
      super(x, y);
      this.r = r;
      this.scale = scale;
   }

   show()
   {
      fill(150, 0, 100);
      stroke(55);

      beginShape();
      for (let a = 0; a < TWO_PI; a+=0.01)
      {
         let x = this.r * 16 * pow(sin(a), 3);
         let y = -1 * (13 * cos(a) - 5*cos(2*a) - 2*cos(3*a) - cos(4*a));
         vertex(x * this.scale + this.x, y * this.scale + this.y);
      }
      endShape();
   }
}