var card;
window.onload = function () {
    card = document.getElementById("card1");
    var cardX = card.getBoundingClientRect().top;
    var cardY = card.getBoundingClientRect().left; 
    var cardWidht = card.getBoundingClientRect().width;
    var cardHeight = card.getBoundingClientRect().height;
    console.log(cardX + ", " + cardY);
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
}


