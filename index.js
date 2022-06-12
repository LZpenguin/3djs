import { Engine } from './structs/engine.js'
import { Object } from './structs/object.js'

document.oncontextmenu = function () {
    return false
}

let canvas = document.getElementById('canvas')

canvas.setAttribute('width', 1000)
canvas.setAttribute('height', 500)

let engine = new Engine()
engine.bindCanvas(canvas)
engine.listen()

let object0 = new Object(0, 120, 0)

let object1 = new Object(100, 20, 0)
let object2 = new Object(80, 40, 0)
let object3 = new Object(60, 60, 0)
let object4 = new Object(40, 80, 0)
let object5 = new Object(20, 100, 0)

let object6 = new Object(-100, 20, 0)
let object7 = new Object(-80, 40, 0)
let object8 = new Object(-60, 60, 0)
let object9 = new Object(-40, 80, 0)
let object10 = new Object(-20, 100, 0)

engine.addObject(object0)

engine.addObject(object1)
engine.addObject(object2)
engine.addObject(object3)
engine.addObject(object4)
engine.addObject(object5)

engine.addObject(object6)
engine.addObject(object7)
engine.addObject(object8)
engine.addObject(object9)
engine.addObject(object10)

engine.draw()

console.log(engine)
