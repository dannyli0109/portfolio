import p5 from 'p5'
import Symbol from './Symbol'
import Stream from './Stream'
import React from 'react'

var symbol
var symbolSize = 24
var x = 0;
var y = 0;
var streams = []
var lifeSpan = 500
var totalLifeSpan = 500
var canvas




var sketch = function(p5) {
  p5.setup = function() {
    p5.createCanvas(screen.width, p5.windowHeight)
    createStreams()
    p5.background(0)
  }

  p5.draw = function() {
    p5.background(0,200)
    streams.forEach(function(stream) {
      stream.display(lifeSpan, totalLifeSpan)
    })

  }

  function createStreams() {
    streams = []
    x = 0;
    p5.textSize(symbolSize)

    for (var i = 0; i < p5.round(screen.width/symbolSize); i++) {
      var stream = new Stream(p5)
      stream.generateSymbols(x,p5.random(0,-500))
      streams.push(stream)
      x += symbolSize
    }
  }
}

export default class Matrix extends React.Component {
  componentDidMount() {
    var wrapper = document.querySelector("#wrapper")
    wrapper.innerHTML = ""
    this.canvas = new p5(sketch, this.refs.wrapper)
  }



  render() {
    return (
      <div>
        <div id="wrapper" ref="wrapper"></div>
      </div>

    )
  }
}
