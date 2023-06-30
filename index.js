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
    if (1>bounds.length>3)
        throw Error('A maximum of 3 numbers can be passed as arguments, (stop only) or (start and stop)');
    
        
    let val = 0;
    if (bounds.length==1)
        val =  Math.floor(Math.random() * bounds[0]);
    else if (bounds.length==2)
        val = (Math.floor(Math.random() * (bounds[1]-bounds[0]))+bounds[0]);
    else if (bounds.length==3){
        while (bounds[2](val)){
            val = (Math.floor(Math.random() * (bounds[1]-bounds[0]))+bounds[0]);
        }
    }

    return val;
        
};


//  Generate list of random integers
let randList = (len, ...bounds)=> {
    let List = [];
    for (let index = 0; index < len; index++) List.push(randInt(...bounds));
    return List;
}


// Random x and y coordinates
let xRand = (n)=>randInt(n,window.innerWidth-n);
let yRand = (n)=>randInt(n,window.innerHeight-n);
let randCoord = (n)=>[xRand(n), yRand(n)];


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
                let xImpactWall = x+this.radius>=window.innerWidth||x-this.radius<=0;
                let yImpactWall = y+this.radius>=window.innerHeight||y-this.radius<=0;
                if (xImpactWall) dx *= -1;
                if (yImpactWall) dy *= -1;
                x+=dx; y+=dy;
                this.centre[0]=x; this.centre[1]=y;
                this.velocity[0]=dx; this.velocity[1]=dy;

                // console.log('velocity: ',this.velocity, 'centre', this.centre);

                return this.centre;
            } 
        }

        let balls = [];
        let ballCount = 10;
        for (let i=0; i<ballCount; i++) {
            balls.push(new bouncingCircle(
                                randInt(30,30),
                                randCoord(50),
                                randList(2,-5,5,(val=>val==0)),
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
        this.mouse = {x: NaN, y:NaN, capture:false}
        window.addEventListener('mousemove',
            (event)=>{
                if (this.mouse.capture){
                    this.mouse.x = event.x;
                    this.mouse.y = event.y;
                }
            }
        )
        
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

