const bodyTag = document.getElementsByTagName('body')[0]
const headTag = document.getElementsByTagName('head')[0]


//Create css link
const indexCss = document.createElement('link');
indexCss.href = 'index.css';
indexCss.rel = 'stylesheet';
indexCss.type = 'text/css';
headTag.appendChild(indexCss)


// xUACompatible meta
const xUACompatible = document.createElement('meta');
xUACompatible.httpEquiv = 'X-UA-Compatible';
xUACompatible.content = 'IE=edge';
headTag.appendChild(xUACompatible);


// Viewport meta
const viewport = document.createElement('meta');
viewport.name = 'viewport';
viewport.content = 'width=device-width, initial-scale=1';
headTag.appendChild(viewport);


// Convert degrees value to radians
let degreesToRadians = degrees => (2*Math.PI)*(degrees/360)


// Generate random integers between 0 and num
let randInt = (...bounds) => {
    if (1>bounds.length>2)
        throw Error('Only 2 numbers can be passed as arguments, (stop only) or (start and stop)');

    if (bounds.length==1)
        return Math.floor(Math.random() * bounds[0]);
    else
        return (Math.floor(Math.random() * (bounds[1]-bounds[0]))+bounds[0]);
};


//  Generate list of random integers
let randList = (len, ...bounds)=> {
    let List = [];
    for (let index = 0; index < len; index++) List.push(...bounds);
}


// Random x and y coordinates
let xRand = (n=1)=>randInt(n,window.innerWidth);
let yRand = (n=1)=>randInt(n,window.innerHeight);
let randCoord = (n=1)=>[xRand(n), yRand(n)];


class Canvas{
    
        render(obj=this){
    
            
            function bouncingCircle(radius,centre=randCoord(),velocity, colour='black'){
                this.radius = radius;
                this.centre = centre;
                let [x,y] = this.centre;
                let [dx,dy] = this.velocity = velocity; 
    
                this.draw = ()=>{
                    // Draw circle on canvas
                    obj.circle(this.radius, this.centre, colour);
    
                    // Create bounding effect of circle
                    let xImpact = x+this.radius>=window.innerWidth||x-this.radius<=0;
                    let yImpact = y+this.radius>=window.innerHeight||y-this.radius<=0;
                    if (xImpact) dx = -dx;
                    if (yImpact) dy = -dy;
                    x+=dx; y+=dy;
                    this.centre[0]=x;this.centre[1]=y;
                    this.velocity[0]=dx;this.velocity[1]=dy;
                } 
            }
    
            function bouncingSquare(radius,centre=randCoord(),velocity, colour='black'){
                this.radius = radius;
                this.centre = centre;
                let [x,y] = this.centre;
                let [dx,dy] = this.velocity = velocity; 
    
                this.draw = ()=>{
                    // Draw circle on canvas
                    obj.circle(this.radius, this.centre, colour);
    
                    // Create bounding effect of circle
                    let xImpact = x+this.radius>=window.innerWidth||x-this.radius<=0;
                    let yImpact = y+this.radius>=window.innerHeight||y-this.radius<=0;
                    if (xImpact) dx = -dx;
                    if (yImpact) dy = -dy;
                    x+=dx; y+=dy;
                    this.centre[0]=x;this.centre[1]=y;
                    this.velocity[0]=dx;this.velocity[1]=dy;
                } 
            }
    
            let balls = [];
            for (let i=0; i<randInt(15,20); i++) {
                balls.push(new bouncingCircle(
                                    randInt(5,30),
                                    randCoord(50),
                                    [randInt(-5,5),randInt(-5,5)],
                                    `rgb(${randInt(255)},${randInt(255)},${randInt(255)})`));
            }
            function animate(){
                requestAnimationFrame(animate);
                obj.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
                for (const ball of balls) ball.draw();
            }
            animate()
        }

    constructor(){
        // Create tag and assign attributes
        this.tag = document.createElement('canvas');
        this.tagSetter();
        bodyTag.appendChild(this.tag);
        
        // Draw using context
        this.ctx = this.tag.getContext('2d');
        this.defaultColor = '#000000';

        // Add object to locate position of mouse
        this.mouse = {x: NaN, y:NaN}
        window.addEventListener('mousemove',
            (event)=>{
                this.mouse.x = event.x;
                this.mouse.y = event.y;;})
        
        // Render stuff on canvas
        this.render();
    }

    tagSetter(tag=this.tag){

        // Add styling to canvas
        this.styling = {
            'background-color': 'rgb(0, 15, 46)'
        }
        for (const key in this.styling) 
            tag.style.setProperty(key,this.styling[key]);

        // Set canvas dimensions
        tag.width = window.innerWidth;
        tag.height = window.innerHeight;
        window.addEventListener(
            'resize',
            (event)=>{tag.width = event.currentTarget.innerWidth;
                      tag.height = event.currentTarget.innerHeight;}
        )
    }

    line(begin=[0,0], end=[1,1], color=this.defaultColor, func=(context)=>null){
        this.ctx.beginPath();
        this.ctx.moveTo(...begin);
        this.ctx.lineTo(...end);
        this.ctx.strokeStyle = color;
        // func(this.context);
        this.ctx.stroke();
    }
    
    square(dimensions=[100,100], position=[0,0], color=this.defaultColor, func=(context)=>null){
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        func(this.ctx);
        this.ctx.fillRect(...position,...dimensions);
    }
    
    circle(radius=1, centre=[0,0], color=this.defaultColor, fill=true, func=(context)=>null){
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.arc(...centre, radius, 0, degreesToRadians(360), 1);
        if (fill){
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
        func(this.ctx);
        this.ctx.stroke();
    }
}

CANVAS = new Canvas();


let newList = [1,2,3,4]


