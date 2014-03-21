
//cards have to be in ./cards folder
//example of the pack https://dl.dropboxusercontent.com/u/16878028/cards.zip 

var x = 0; // stores first selected card
var firstAction = true;
var prevId;  //stores id of previous card
var cardsLeft;  
var pattern = "cards/pattern.png";
var t; //waits before hiding cards
var t2;  //interval for calculating time
var startTime;
var sameCardsN = 2;
var deckSizeN = 16;
var diff;  //current time - start time
var current;
var mistakes;

var timeResult = new Array();    //all results
var mistakeResult = new Array();
var levelResult = new Array();
var scoreResult = new Array();
var resN = 0;    //number of game



function turn(imgId){
	var name = imgId.id;	
	
	if (firstAction){
		mistakes = 0;
		document.getElementById("infoBox").innerHTML="Let's go";
		firstAction=false;
		startTime = new Date().getTime() / 100;
		t2 = setInterval(function(){timer()},10);
		}
	if (x == name || t != null ){
		return false;
		}
	
	else if (x==0){
		x = name;
		prevId = imgId;
		var loc = "cards/"+name+".png";		
		imgId.src=loc;
		}
	else{
		
		var loc = "cards/"+name+".png";		
		imgId.src=loc;
		if (Math.ceil(name/sameCardsN) == Math.ceil(x/sameCardsN)){
			//document.getElementById("infoBox").innerHTML="Correct";
			t = setTimeout(function(){prevId.style.visibility="hidden";imgId.style.visibility="hidden";t=null;},300);
			
			cardsLeft -= 2;
			if (cardsLeft <= 0){
				clearInterval(t2);
				timeResult[resN] = diff;
				mistakeResult[resN] = mistakes;
				//scoreResult[resN] = Math.round( Math.pow((deckSizeN/16) ,3) * 1000/(  Math.log((3*mistakes+1)*(diff+10) ) ));
				resN = resN + 1;
				
				//alert(Math.round( Math.pow((deckSizeN/16) ,3) * 1000/(  Math.log((3*mistakes+1)*(diff+10) ) )));
				alert("Tulemus: \n Aeg: "+diff+" s \n Vead: "+mistakes);
				document.getElementById("infoBox").innerHTML="Vajuta New Game selleks, et veel kord mängida";				
				document.getElementById("infoBox2").style.display="none";	
				
				
				
				clearInterval(t2);
				}
			}
		else{
			mistakes++;
			document.getElementById("infoBox").innerHTML="Vead: " + mistakes;
			t = setTimeout(function(){imgId.src = pattern;prevId.src = pattern;t=null;},400);
			
			}
				
		x = 0;		
		
		}
	/*var loc = "cards/"+name+".png";		
	imgId.src=loc; */
}

function timer(){
	current = new Date().getTime() / 100;
	diff = Math.round(current - startTime)/10;
	document.getElementById("infoBox2").innerHTML="Aeg: " +diff;
	}
	


function shuffle(){
	var cardPairs = new Array(26);
	var i = 1;
	for (a = 0; a<26 ; a++){
		cardPairs[a] = new Array(2);
		for(b = 0; b<2; b++){
			cardPairs[a][b] = i;
			i++;
			}
	}
	
	
	var randomVar;
	
	var shArr = cardPairs;
	var left;
	var right;
	var tempor; //temporary
	for (i = 0; i<200; i++){
		randomVar = Math.floor(Math.random()*26);
		//alert(randomVar);
		//right = shArr.slice(0,randomVar);
		//left = shArr.slice(randomVar);
		//alert(right);
		//alert(left);
		//shArr = left.concat(right);
		tempor = shArr[0];
		shArr[0] = shArr[randomVar];
		shArr[randomVar] = tempor;
		}
	
	return shArr;
		
	
}



function addCard(num){
	
	var shuffled = shuffle();
	var myDeck = new Array();
	var count = 0;
	for (i=0;i<(num/2);i++){
		for (j=0;j<2;j++){
			myDeck[count] = shuffled[i][j];
			count++;
			}
		}
		
	var tempor; //temporary
	var randomVar;
	for (i = 0; i<100; i++){
		randomVar = Math.floor(Math.random()*num);
		tempor = myDeck[0];
		myDeck[0] = myDeck[randomVar];
		myDeck[randomVar] = tempor;
		}
	
	
	
	
	while (num > 0){
		
		var parent = document.getElementById('gameField');
		newCard = new Image();
		newCard.id=myDeck[num-1];
		newCard.src="cards/pattern.png";
		newCard.style.visibility="visible";
		newCard.setAttribute("onclick","turn(this)");
		parent.appendChild(newCard);
		num -=1;
		}
	}



	
function newGame(){
	while (gameField.hasChildNodes()) {
    gameField.removeChild(gameField.lastChild);
	}

	document.getElementById("infoBox").innerHTML="Vead: ";
	document.getElementById("infoBox2").innerHTML="Aeg: ";
	document.getElementById('gameField').style.display="none";
	document.getElementById('score').style.display="none";
	document.getElementById('infoBox').style.display="none";
	document.getElementById('infoBox2').style.display="none";
	document.getElementById('menuField2').style.display="none";
	document.getElementById('menuField3').style.display="none";
	document.getElementById('menuField').style.display="block";
	clearInterval(t2);
	firstAction = true;
	x=0;
	for (i=0;i<52;i++){
		document.getElementById(i+1).style.visibility="visible";
		document.getElementById(i+1).src=pattern;
		}
	
		
	
	}
	
function rules(){
	alert("Rules of the game: \n Select two cards at a time. \n Remember where each card is located. \n To win you should guess all card-pairs correctly.");
	}
	
function scores(){
	document.getElementById('menuField').style.display="none";
	document.getElementById('menuField2').style.display="none";
	document.getElementById('menuField3').style.display="none";
	document.getElementById('infoBox').style.display="none";
	//document.getElementById('infoBox').innerHTML=timeResult+"<br/>"+mistakeResult;
	document.getElementById('infoBox2').style.display="none";
	document.getElementById('gameField').style.display="none";
	document.getElementById('score').style.display="block";
	
	
	var graph = [];
	var graph2 = [];
    for (var i = 0; i < resN; i++){
        graph.push([i+1, timeResult[i]]);
		graph2.push([i+1, mistakeResult[i]]);
		}


    
    $.plot($("#score"), [ { label: "Aeg, s",  data: graph}, { label:"Vead", data:graph2}], 
	{ points: {show:true}, lines: {show:true}, xaxis:{ min:1 , minTickSize:1, tickOptions:{formatString:'%.0f'} } , yaxis:{min:0}  });
	
	
	}
			
	
function about(){
	alert("This is a memory game implementation made by Sergei Tsimbalist.");
	}
	
function sameCards(n){
	sameCardsN = n;
	document.getElementById('menuField').style.display="none";
	if (n==2){
		document.getElementById('menuField3').style.display="block";
		}
	else{
		document.getElementById('menuField2').style.display="block";
		}

}

function stackSize(n){
	deckSizeN = n;
	cardsLeft = n;
	document.getElementById('menuField2').style.display="none";
	document.getElementById('menuField3').style.display="none";
	document.getElementById('infoBox').style.display="block";
	document.getElementById('infoBox2').style.display="block";
	document.getElementById('gameField').style.display="block";
	if (n==16){
		document.getElementById('gameField').style.width="700px";
		}
		
	else{
		document.getElementById('gameField').style.width="1200px";
		}
	addCard(deckSizeN);
	
	
}
