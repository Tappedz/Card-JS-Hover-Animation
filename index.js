var cards;
const degRot = 8;
window.onload = function () {
    cards = Array.from(document.getElementsByClassName("hoverCard"));
    cards.forEach(element => {
        var card = {x: element.getBoundingClientRect().left, y: element.getBoundingClientRect().top, 
            width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height}
        element.addEventListener("mousemove", function(e) {
            let x = e.clientX;
            let y = e.clientY;
            if(x >= card.x && x <= card.x + card.width && y >= card.y && y <= card.y + card.height)
            {
                // Interval transformation
                let transformedX, transformedY;
                transformedX = intervalTransformation(card.x, card.x + card.width, Math.PI/2, 3/2 * Math.PI, x); 
                transformedY = intervalTransformation(card.y, card.y + card.height, 0, Math.PI, y);
                // Apply rotation 
                element.style.transform = "perspective(1000px) rotateY(" + degRot * Math.sin(transformedX) + "deg) rotateX(" + -degRot * Math.cos(transformedY) + "deg)";
            }     
        });
    });
}

function intervalTransformation(in1, in2, out1, out2, x) {
    return ((out1 - out2) / (in1 - in2) * (x - in1)) + out1;  
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


