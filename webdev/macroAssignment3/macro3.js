

const g1 = document.getElementById('g1');            
const g2 = document.getElementById('g2');            
const g3 = document.getElementById('g3');

const progress = document.getElementById('progress');
const chances_left = document.getElementById('chances_left');
const caught = document.getElementById('caught');
const play_again = document.getElementById('play_again');
const his = document.getElementById('history');
const clean = document.getElementById('clean');
const Restart = document.getElementById('Restart');


const grass =['images/grass.png', 'images/grass.png', 'images/grass.png'];
const pokemon = ['images/pikachu.png', 'images/bulbasaur.png', 'images/charmander.png', 'images/eevee.png', 'images/squirtle.png'];
const names = ['Pikachu', 'Bulbasaur', 'Charmander', 'Eevee', 'Squirtle'];


/*
const pokemon1 = [
    {name:'Pikachu', image:'images/pikachu.png'}, 
    {name:'Bulbasaur', image:'images/bulbasaur.png'},
    {name:'Charmander', image:'images/charmander.png'},
    {name:'Eevee', image:'images/eevee.png'},
    {name:'Squirtle', image:'images/squirtle.png'}
]
*/

let chancesLeftCounter = 5;
let CaughtCounter = 0;

g1.addEventListener("click", win1);
g2.addEventListener("click", win2);
g3.addEventListener("click", win3);

function win1()
{
    if (play_again.style.display == 'block') {
        return;
    }
    
    var obj = g1;

    // call function shared with all images and pass the image name that was clicked so we can replace it
    gamewin(obj);
}

// when clicked on dice2 call win2
function win2()
{
    if (play_again.style.display == 'block') {
        return;
    }
    var obj = g2;
    gamewin(obj);
}

// when clicked on dice3 call win3
function win3()
{
    if (play_again.style.display == 'block') {
        return;
    }
    var obj = g3;
    gamewin(obj);
}

function gamewin(obj)
{
    // keep track of chances; after each click then subtract 1 from chances
    chancesLeftCounter -= 1;

    // generate a random number to match index of the array
    let randindex = parseInt(Math.random() * pokemon.length);

    // generate a random number for 3 different options for win
    let chance = parseInt(Math.random() * 3);

    // if randnum ==1 then win is 1000

    if (chance == 1 ) {
       
       obj.src = pokemon[randindex];
        //dices[parseInt(Math.random() * dices.length)].image;
      //die1.src =   dices[parseInt(Math.random() * dices.length)].image;
      progress.innerText = "You caught a(n) "+  names[randindex]+" !";

      his.innerHTML= "<p>" + names[randindex] +" found</p>" + his.innerHTML;

      CaughtCounter += 1;
       
    }

    else if (chance == 2 )
    {
         // found cash; cash = 2 * 1000
         //dices[parseInt(Math.random() * dices.length)].image;

         // this keyword registers the image that was clicks so it can replace its src; same as saying img1.src if img1 was clicked
         //die1.src =   dices[parseInt(Math.random() * dices.length)].image;
         
         obj.src = 'images/pokeballs.png';
         progress.innerText = "You found two Pokeballs !";
         his.innerHTML= "<p>Pokeballs found</p>" + his.innerHTML;
         chancesLeftCounter += 2;
         CaughtCounter += 0;
    }
   
    else {
      
         // nothing!
         obj.src = '';
         progress.innerText = 'Nothing here!' ;
        
         his.innerHTML= "<p>Nothing found</p>" + his.innerHTML;
         CaughtCounter += 0;
    }

    // update chances left
    chances_left.innerText = chancesLeftCounter;

    // update money won
    caught.innerText = CaughtCounter;

    // show the play again button
    play_again.style.display = 'block';
    //play_again.style.backgroundColor ="#f00";
    //play_again.innerText ="Play Again";

    // when no more chances; game is over
    if ( chancesLeftCounter == 0)
    {
        play_again.style.display = 'none';

        progress.innerHTML = 'Game over!';
  
        die1.src = grass[0];
        die2.src = grass[1];
        die3.src = grass[2];

        CaughtCounter = 0;
        chancesLeftCounter = 5;
    
        return;
    }


play_again.onclick = function() {
        g1.src = grass[0];
        g2.src = grass[1];
        g3.src = grass[2];
     
    play_again.style.display = 'none';
}

}

clean.onclick = function() {
   
    his.innerHTML= "<p></p>";

}

Restart.onclick = function() {

    his.innerHTML= "<p></p>";
    g1.src = grass[0];
    g2.src = grass[1];
    g3.src = grass[2];
    progress.innerText = 'Your Progress so far ...' ;

    CaughtCounter = 0;
    chancesLeftCounter = 5;

    chances_left.innerText = chancesLeftCounter;

    caught.innerText = CaughtCounter;
 
    play_again.style.display = 'none';

return;
}