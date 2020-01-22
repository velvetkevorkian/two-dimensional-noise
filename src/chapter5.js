import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'
import '@velvetkevorkian/sketch-ui/src/ui.css'

export default new p5(p => {
  let ui,
    cachedFrameCount = 0,
    noiseXPosition = p.random(),
    noiseYPosition = p.random()

  const vars = {
    backgroundColor: {
      value: '#000000'
    },
    steps: {
      value: 30,
      min: 10,
      max: 100
    },
    noiseFactor: {
      value: 100,
      max: 500,
      min: 1
    },
    strokeWeight: {
      value: 1,
      max: 10,
      min: 1
    },
    scaleFactor: {
      value: 4,
      min: 1,
      max: 5,
      step: 0.25
    },
    animateNoiseTime: {
      value: true
    },
    noisePositionIncrement: {
      value: 0.1,
      min: 0,
      max: 10,
      step: 0.1
    },
    drawLines: {
      value: true
    },
    drawRects: {
      value: true
    },
    drawArcs: {
      value: true
    },
    loop: {
      value: true,
      callback: (val, p) => val ? p.loop() : p.noLoop()
    },
    saveButton: {
      type: 'button',
      label: 'Save image',
      callback: p => {
        const data = p.canvas.toDataURL()
        window.open(data)
      }
    }
  }

  p.setup = () => {
    p.disableFriendlyErrors = true
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.colorMode(p.HSL)

    const options = {
      context: p,
      selector: '#chapter-5-ui',
      uid: 'chapter-5-ui',
      save: true
    }

    ui = new UI(vars, options).proxy

    p.background(ui.backgroundColor)
    if(!ui.loop) p.noLoop()
    p.rectMode(p.CENTER)
    p.strokeCap(p.SQUARE)
    p.blendMode(p.ADD)
  }

  p.draw = () => {
    clear()

    const {
      noiseFactor,
      strokeWeight,
      scaleFactor,
      steps,
      drawArcs,
      drawLines,
      drawRects,
    } = ui

    const { windowHeight, windowWidth, TWO_PI } = p
    p.strokeWeight(strokeWeight)

    const
      xStep = windowWidth / steps,
      yStep = windowHeight / steps

    for(let y = 0; y <= windowHeight; y = y + yStep) {
      for(let x = 0; x <= windowWidth; x = x + xStep) {
        const
          xpos = x + xStep/2,
          ypos = y + yStep/2,
          zpos = cachedFrameCount / noiseFactor,
          noise = p.noise((xpos + noiseXPosition) / noiseFactor, (ypos + noiseYPosition) / noiseFactor, zpos),
          xSize = noise * xStep,
          ySize = noise * yStep,
          xSizeScaled = xSize * scaleFactor,
          ySizeScaled = ySize * scaleFactor,
          col = p.color(noise * 360, 50, 50, noise)

        p.stroke(col)
        p.push()
        p.translate(xpos, ypos)
        p.rotate(noise * TWO_PI)

        if(drawLines) {
          p.line(xSizeScaled * -0.5, ySizeScaled * -0.5, xSizeScaled * 0.5, ySizeScaled * 0.5)
        }

        if(drawArcs) {
          p.noFill()
          p.arc(0, 0, xSizeScaled, ySizeScaled, 0, noise * TWO_PI)
        }

        if(drawRects) {
          p.noStroke()
          p.fill(col)
          p.rect(0, 0, xSize, ySize)
        }
        p.pop()
      }
    }

    if(ui.animateNoiseTime) cachedFrameCount = cachedFrameCount + 1
    noiseXPosition = noiseXPosition + ui.noisePositionIncrement
    noiseYPosition = noiseYPosition + ui.noisePositionIncrement
  }

  const clear = () => {
    p.clear()
    p.background(ui.backgroundColor)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    clear()
  }
}, document.querySelector('#chapter-5'))
