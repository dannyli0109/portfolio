import p5 from 'p5'

export default function Symbol(x, y, speed, first, p5) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.first = first;
  this.switchInterval = p5.round(p5.random(2,20));

  this.setToRandomSymbol = function() {
    if (p5.frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(
        0x30A0 + p5.round(p5.random(0, 96))
      );
    }

  }

  this.rain = function() {
    this.y = this.y >= p5.height ? 0 : this.y + this.speed
  }
}
