var cards;
const degRot = 8;
window.onload = function () {
    cards = Array.from(document.getElementsByClassName("hoverCard"));
    cards.forEach(element => {
        var card = {x: element.getBoundingClientRect().left, y: element.getBoundingClientRect().top, 
            width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height}
        let canvas = document.createElement("canvas");
        element.appendChild(canvas); 
        canvas.style = "position: absolute; top: " + element.style.top + "px; left: " + element.style.left + "px; width: " + card.width + "px; height: " + card.height + "px;";
        canvas.width = card.width;
        canvas.height = card.height;
        card.canvas = canvas;
        card.ctx = canvas.getContext("2d");
        element.addEventListener("mousemove", function(e) {
            let x = e.clientX;
            let y = e.clientY;
            if(x >= card.x && x <= card.x + card.width && y >= card.y && y <= card.y + card.height)
            {
                // Interval transformation
                let transformedX, transformedY;
                transformedX = intervalTransformation(card.x, card.x + card.width, 0, Math.PI, x); 
                transformedY = intervalTransformation(card.y, card.y + card.height, 0, Math.PI, y);
                // Apply rotation 
                element.style.transform = "perspective(1000px) rotateY(" + degRot * Math.cos(transformedX) + "deg) rotateX(" + -degRot * Math.cos(transformedY) + "deg)";
                card.ctx.clearRect(0, 0, card.canvas.width, card.canvas.height);
                createReflectionEffect(card, card.ctx, x, y);
            }     
        });
        element.addEventListener("mouseleave", function() {
            card.ctx.clearRect(0, 0, card.canvas.width, card.canvas.height);
        });
    });
}

function intervalTransformation(in1, in2, out1, out2, x) {
    return ((out1 - out2) / (in1 - in2) * (x - in1)) + out1;  
}

function createReflectionEffect(card, ctx, x, y) { 
    //Save context
    ctx.save();
    //Rotate context
    ctx.translate(x - card.x, y - card.y);
    card.ctx.rotate(-45*Math.PI/180);
    //First rectangle
    ctx.beginPath();
    ctx.rect(-500,-15,1000,30);
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.07;
    ctx.fill();
    //Light effect
    createLightEffect(ctx, 30, 0);

    //Second rectangle
    ctx.beginPath();
    ctx.rect(-500,-35,1000,10);
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.07;
    ctx.fill();
    //Light effect
    createLightEffect(ctx, 10, 30);
    ctx.restore();
}

function createLightEffect(ctx, height, offset) {
    ctx.beginPath();
    ctx.rect(-75,-height/2-offset,150,height);
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.02;
    ctx.fill();

    ctx.beginPath();
    ctx.rect(-100,-height/2-offset,200,height);
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.02;
    ctx.fill();

    ctx.beginPath();
    ctx.rect(-150,-height/2-offset,300,height);
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.01;
    ctx.fill();
}
/*
    //First implementation (simple and not smooth)
    card.addEventListener("mousemove", function(e) {
        let x = e.clientX;
        let y = e.clientY;
        if(x > cardX && x < cardX + cardWidht && y > cardY && y < cardY + cardHeight)
        {
            if(x < cardX + cardWidht/2 && y < cardY + cardHeight/2) 
            {
                //console.log("upper left");
                card.style.transform = "perspective(1000px) rotateX(-10deg) rotateY(10deg)";
            }
            else if(x >= cardX + cardWidht/2 && y < cardY + cardHeight/2)
            {
                //console.log("upper right");
                card.style.transform = "perspective(1000px) rotateX(-10deg) rotateY(-10deg)";
            }
            else if(x < cardX + cardWidht/2 && y >= cardY + cardHeight/2) 
            {
                //console.log("bottom left");
                card.style.transform = "perspective(1000px) rotateX(10deg) rotateY(10deg)";
            }
            else if(x >= cardX + cardWidht/2 && y >= cardY + cardHeight/2) 
            {
                //console.log("bottom right");
                card.style.transform = "perspective(1000px) rotateX(10deg) rotateY(-10deg)";
            }
        }     
    });
    */


