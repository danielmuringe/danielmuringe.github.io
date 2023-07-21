'use strict'

var printv = (...data) => console.log(...data)


// Get head and body element
const body = document.body
const head = document.head


// Set canvas elements
const canvas = document.getElementsByTagName("canvas")[0]
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.addEventListener("resize",
    (event) => {
        canvas.width = event.target.innerHeight
        canvas.height = event.target.innerHeight
    }
)


// Angle functions
var rad = x => x * (Math.PI / 180)
var wcom = (theta, L = 0) => L * Math.sin(rad(theta))
var hcom = (theta, L = 0) => L * Math.cos(rad(theta))


// Line object
class RotatingSquare {
    constructor(length = 20, speed = 1) {
        this.length = length
        this.theta = 0
        this.speed = speed
        this.start = [canvas.height / 2, canvas.width / 2]
        this.dimensions = [
            wcom(this.theta, this.length),
            hcom(this.theta, this.length)
        ]
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,255,255, .7)";
        ctx.fillRect(...this.start, ...this.dimensions);
    }

    update() {
        this.dimensions = [
            wcom(this.theta, this.length),
            hcom(this.theta, this.length)
        ]
        this.theta += this.speed
        this.theta %= 360
    }
}

const rotatingSquare = new RotatingSquare(400, 2)

// Create canvas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)
    rotatingSquare.draw()
    rotatingSquare.update()
}

animate()
