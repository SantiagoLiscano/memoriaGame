var cards = document.getElementsByClassName('card');
var backCards = document.querySelectorAll('.card > .side:nth-child(2)');
var infoArriba = document.getElementsByTagName('h1');
var backgrounds = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "15.png", "12.png", "14.png", "13.png", "11.png", "1.png", "2.png", "6.png", "4.png", "5.png", "3.png", "7.png", "8.png", "9.png", "11.png", "10.png", "12.png", "15.png", "14.png", "13.png"]
var cartasArriba = 0;
var firstCard;
var secondCard;
var win=0;
var contadorJugadas= 0;
var contadorParejas = 0;
backgrounds = shuffle(backgrounds);
for (var i=0; i<cards.length; i++){
    cards[i].statusClick = 0;
    cards[i].addEventListener('click', function(){        
            if(this.statusClick == 0 && cartasArriba < 1){
                this.classList.add('flip');
                this.statusClick = 1;
                var style = this.childNodes[3].currentStyle || window.getComputedStyle(this.childNodes[3], false);
                        bi1 = style.backgroundImage.slice(27, -1).replace(/"/g, "");
                        firstCard = this;                        
                        cartasArriba++;    
            }else if(this.statusClick == 0 && cartasArriba < 2){
                cartasArriba++;
                contadorJugadas++;                
                this.classList.add('flip');
                this.statusClick = 1;
                var style = this.childNodes[3].currentStyle || window.getComputedStyle(this.childNodes[3], false);
                        bi2 = style.backgroundImage.slice(27, -1).replace(/"/g, "");
                        secondCard = this;
                        if(bi1 == bi2){
                            console.log("SON IGUALES :)");
                            contadorParejas++;
                            delay(function(){
                            secondCard.classList.remove('flip');    
                            secondCard.statusClick = 0;
                            firstCard.classList.remove('flip');
                            firstCard.statusClick = 0;
                            secondCard.classList.add('goOut');
                            firstCard.classList.add('goOut');
                            /*delay(function(){
                            secondCard.remove();
                            firstCard.remove();
                            }, 1500 );*/
                            cartasArriba=0;
                            win++;
                            }, 1000 );
                            if(win == 15){
                                alert("GANASTE!");
                            }
                        }else{                           
                            console.log("NO SON IGUALES :(");
                            delay(function(){
                            secondCard.classList.remove('flip');
                            secondCard.statusClick = 0;
                            firstCard.classList.remove('flip');
                            firstCard.statusClick = 0;                                                        
                            cartasArriba=0;                                
                            }, 1000 );
                        }
                        infoArriba[0].innerText = "simple memoria game - Numero de Jugadas:" + contadorJugadas + " Parejas encontradas:" + contadorParejas + ".";
            }
    });
    backCards[i].style.backgroundImage = "url('" + backgrounds[i] + "')";
    backCards[i].style.backgroundSize = "contain";
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();