var toWho = document.getElementById("to"),
    fromWho = document.getElementById("from"),
    myMsg = document.getElementById("message"),
    preview = document.getElementById("preview"),
    postCard = document.getElementById("postcard"),

    toInput = document.getElementById("toInput"),
    fromInput = document.getElementById("fromInput"),
    msgInput = document.getElementById("msgInput"),
    bgInput = document.getElementById("bgInput"),

    add = document.getElementById("add"),
    save = document.getElementById("save"),
    load = document.getElementById("load");

var CardArray = [];

var aNum = 1;

toInput.addEventListener("keyup", function(){
    toWho.innerHTML = toInput.value;
});

fromInput.addEventListener("keyup", function(){
    fromWho.innerHTML = fromInput.value;
});

msgInput.addEventListener("keyup", function(){
    myMsg.innerHTML = msgInput.value;
});

bgInput.addEventListener("keyup", function(ev){
    if(ev.keyCode == 13){
        if(bgInput.value == ""){
            postCard.style.backgroundImage = "url(imgs/default.png)";
        } else if(bgInput.value == "auto"){
            postCard.style.backgroundImage = "url(imgs/auto"+aNum+".jpg)";
            aNum++;
            if(aNum >= 4){aNum = 1;}
        } else {
            postCard.style.backgroundImage = "url("+bgInput.value+")";
        }
    }
});

function createPostcard(to, bgImg, from, msg){
    var ndivImgs = document.createElement("div"),
        ndivCaps = document.createElement("div")
    
    ndivImgs.className = "ndivImgs";
    ndivImgs.style.backgroundImage = bgImg.style.backgroundImage;
    
    ndivCaps.className = "ndivCaps";
    ndivCaps.innerHTML = to.value;
    
    preview.appendChild(ndivImgs);
    ndivImgs.appendChild(ndivCaps);
    
    var obj = {
        bgimg:ndivImgs.style.backgroundImage,
        to:to.value,
        message:msgInput.value,
        from:fromInput.value
    }
    
    CardArray.push(obj);
    console.log(CardArray);
    
    ndivImgs.addEventListener("click", function(){
        toWho.innerHTML = obj.to;
        msg.innerHTML = obj.message;
        from.innerHTML = obj.from;
        bgImg.style.backgroundImage = obj.bgimg;
    });
}

add.addEventListener("click", function(){
    createPostcard(toInput, postCard, fromWho, myMsg);
});

save.addEventListener("click", function(){
    localStorage.setItem("cardStrg", JSON.stringify(CardArray));
});

load.addEventListener("click", function(){
    var cards = localStorage.getItem("cardStrg")
    
    preview.innerHTML = "";

    if(cards){
        cards = JSON.parse(cards);
        for(var i=0; i<cards.length; i++){
            createThumbs(cards[i]);
        }
    }
});

function createThumbs(nDescrip){
    var ndivImgs = document.createElement("div"),
        ndivCaps = document.createElement("div")
    
    ndivImgs.className = "ndivImgs";
    ndivImgs.style.backgroundImage = nDescrip.bgimg;
    
    ndivCaps.className = "ndivCaps";
    ndivCaps.innerHTML = nDescrip.to;
    
    preview.appendChild(ndivImgs);
    ndivImgs.appendChild(ndivCaps);
    
    ndivImgs.addEventListener("click", function(){
    
    toWho.innerHTML = nDescrip.to;
    myMsg.innerHTML = nDescrip.message;
    fromWho.innerHTML = nDescrip.from;
    postCard.style.backgroundImage = nDescrip.bgimg;
    });
}