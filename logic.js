var cards = document.getElementsByClassName('card');
var backCards = document.querySelectorAll('.card > .side:nth-child(2)');
var infoArriba = document.getElementsByTagName('h3');
var backgrounds = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "15.jpg", "12.jpg", "14.jpg", "13.jpg", "11.jpg", "1.jpg", "2.jpg", "6.jpg", "4.jpg", "5.jpg", "3.jpg", "7.jpg", "8.jpg", "9.jpg", "11.jpg", "10.jpg", "12.jpg", "15.jpg", "14.jpg", "13.jpg"]
var cartasArriba = 0;
var firstCard;
var secondCard;
var win=0;
var contadorJugadas= 0;
var contadorParejas = 0;
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  };
var cardFlipSound = new sound("cardFlipSound.mp3");
var cardFlipSound2 = new sound("cardFlipSound.mp3");
var winSound = new sound("winSound.mp3");
var pairSound = new sound("pairSound.mp3");
var dingDong = new sound("dingDong.mp3");
pairSound.sound.volume = 0.25;
dingDong.sound.volume = 0.25;
/*var banquet = new sound("banquetUltraLow.mp3");
backgrounds = shuffle(backgrounds);
banquet.sound.volume = 0.1;
banquet.sound.autoplay = true;
banquet.sound.loop = true;
banquet.play();*/
winSound.sound.volume = 0.5;
for (var i=0; i<cards.length; i++){
    cards[i].statusClick = 0;
    cards[i].addEventListener('click', function(){        
            if(this.statusClick == 0 && cartasArriba < 1){
                this.classList.add('flip');
                cardFlipSound.play();
                this.statusClick = 1;
                var style = this.childNodes[3].currentStyle || window.getComputedStyle(this.childNodes[3], false);
                        bi1 = style.backgroundImage.slice(27, -1).replace(/"/g, "");
                        firstCard = this;                        
                        cartasArriba++;    
            }else if(this.statusClick == 0 && cartasArriba < 2){
                cartasArriba++;
                contadorJugadas++;                
                this.classList.add('flip');
                cardFlipSound2.play();
                this.statusClick = 1;
                var style = this.childNodes[3].currentStyle || window.getComputedStyle(this.childNodes[3], false);
                        bi2 = style.backgroundImage.slice(27, -1).replace(/"/g, "");
                        secondCard = this;
                        if(bi1 == bi2){
                            dingDong.play();
                            console.log("SON IGUALES :)");
                            contadorParejas++;
                            delay(function(){
                            secondCard.classList.remove('flip');    
                            secondCard.statusClick = 0;
                            firstCard.classList.remove('flip');
                            firstCard.statusClick = 0;
                            secondCard.classList.add('goOut');
                            pairSound.play();
                            firstCard.classList.add('goOut');
                            /*delay(function(){
                            secondCard.remove();
                            firstCard.remove();
                            }, 1500 );*/
                            cartasArriba=0;
                            win++;
                            if(win == 15){
                                /*alert("YOU WON! it took you "+contadorJugadas+" plays to find the 15 pairs.");
                                location.reload();*/
                                const messageDiv = document.createElement('div');
                                const messageDivWrapper = document.createElement('div');
                                const messageDivH2 = document.createElement('h2');
                                const messageDivInfo = document.createElement('p');
                                const body = document.body;
                                const messageDivFragment = document.createDocumentFragment();
                                const btnWin = document.createElement('div');
                                messageDivWrapper.append(messageDivH2);
                                messageDivH2.innerText= 'YOU WON!';
                                messageDivWrapper.append(messageDivInfo);
                                messageDivInfo.innerText ="it took you "+contadorJugadas+" plays to find the 15 pairs." ;
                                btnWin.innerText = 'Play Again';
                                btnWin.addEventListener("click", function(){
                                    location.reload();
                                })
                                messageDivWrapper.append(btnWin);
                                btnWin.classList.add('btnWin');
                                messageDiv.append(messageDivWrapper);

                                messageDivFragment.append(messageDiv);
                                messageDiv.classList.add('messageDiv');
                                messageDivH2.classList.add('messageDivH2');
                                messageDivInfo.classList.add('messageDivInfo');
                                body.append(messageDivFragment);
                                winSound.play();
                                                             


                            }
                            }, 1000 );
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
                        infoArriba[0].innerText = "Number of plays: " + contadorJugadas+ " ";
                        infoArriba[1].innerText = "Pairs found: " + contadorParejas + " ";
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

