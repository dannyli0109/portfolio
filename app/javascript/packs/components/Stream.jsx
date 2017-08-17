import Symbol from './Symbol'
var symbolSize = 30


export default function Stream(p5) {
  this.symbols = []
  this.totalSymbols = p5.round(p5.random(5, 30))
  this.speed = p5.random(5, 20)

  this.generateSymbols = function(x, y=0) {
    var first = p5.round(p5.random(0,4)) == 1
    for (var i = 0; i < this.totalSymbols; i++) {
      var symbol = new Symbol(x, y, this.speed, first, p5)
      symbol.setToRandomSymbol()
      this.symbols.push(symbol)
      y -= symbolSize
      first = false
    }
  }

  this.display = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        p5.fill(180, 255, 180)
      } else {
        p5.fill(0, 255, 70)
      }
      p5.text(symbol.value, symbol.x, symbol.y)
      symbol.rain();
      symbol.setToRandomSymbol();
    })
  }

}
