(function(doc){
    
    
    var currentCol = 1;
    var playerYellow = true;
    
    
    window.onload = function() {
	console.log("Window loaded");
//	makeBoard(COLUMNS,ROWS);
//	updatePlayerOnScreen();
    highlightFirstArrow();
    }



function chooseArrow() {
    document.getElementById("left").removeAttribute("style");
    document.getElementById("right").setAttribute("style", "background: 	#FFC0CB;");
    var j = currentCol;
    if(!finished){
                    for (var t = 6;t>0;t--){
                        if(testClass(t,j,'')){
                            colorField(t,j,players[current]);
                            if(horizontalWon(t,j) || verticalWon(t,j) || diagonalLtrWon(t,j) || diagonalRtlWon(t,j)){
                                finished = true;
                                newGame(wonMessage.replace("%s",players[current]));
                            } else {
                                changePlayer();
                            }
                            break;
                        }
                    }
                }
    
    nextTurn();
}

function highlightNextArrow() {
    document.getElementById("right").removeAttribute("style");
        document.getElementById("left").setAttribute("style", "background: 	#FFC0CB;");
    
    
    var currentArrow = document.getElementById("c-1-" + currentCol);
    currentArrow.removeAttribute("style");
    var gotIt = false;
    
    if (currentCol < 7) {
        if (testClass(1, currentCol+1, '')) {
           
            currentCol++;
        } else {
            currentCol = findNextAvailable();
        }
    } else {
        if (testClass(1, 1, '')) {
            
            currentCol = 1;
        } else {
            currentCol = findNextAvailable();
        }
    }
    
//    currentCol < 7 ? currentCol++ : currentCol=1;
    
    if (playerYellow){
    var nextArrow = document.getElementById("c-1-" + currentCol).setAttribute("style", "background: yellow;");
    } else {
        var nextArrow = document.getElementById("c-1-" + currentCol).setAttribute("style", "background: red;");
    }

}
    
    function findNextAvailable() {
        var foundIt = false;
        var c = currentCol;
        while(foundIt == false) {
            if (c < 7) {
                if (testClass(1, c+1, '')) {
                    c = c+1;
                    console.log("c: " + c);
                    foundIt = true;
                } else {
                    c++;
                    console.log("got here: " + c);
                }
            } else {
                if(testClass(1, 1, '')) {
                    c = 1;
                    foundIt = true;
                } else {
                    c = 1;
                }
                
            }
            
            if(foundIt) {
                return c;
            }
        }
        return -1;
    }
    
function findPreviousAvailable() {
    var foundIt = false;
        var c = currentCol;
        while(foundIt == false) {
            if (c > 1) {
                if (testClass(1, c-1, '')) {
                    c = c-1;
                    console.log("c: " + c);
                    foundIt = true;
                } else {
                    c--;
                    console.log("got here: " + c);
                }
            } else {
                if(testClass(1, 7, '')) {
                    c = 7;
                    foundIt = true;
                } else {
                    c = 7;
                }
                
            }
            
            if(foundIt) {
                return c;
            }
        }
        return -1;
    
}
    
    
function highlightPreviousArrow() {
    var currentArrow = document.getElementById("c-1-" + currentCol);
    currentArrow.removeAttribute("style");
    
    var gotIt = false;
    
    if (currentCol > 1) {
        if (testClass(1, currentCol-1, '')) {
           
            currentCol--;
        } else {
            currentCol = findPreviousAvailable();
        }
    } else {
        if (testClass(1, 7, '')) {
            
            currentCol = 7;
        } else {
            currentCol = findPreviousAvailable();
        }
    }
//    currentCol > 1 ? currentCol-- : currentCol=7;
    
    if (playerYellow){
    var nextArrow = document.getElementById("c-1-" + currentCol).setAttribute("style", "background: yellow;");
    } else {
        var nextArrow = document.getElementById("c-1-" + currentCol).setAttribute("style", "background: red;");
    }
}
    function alli() {
        newGame(newGameMessage)
    }
    
    document.getElementById("left").addEventListener("click", highlightNextArrow);
    document.getElementById("right").addEventListener("click", chooseArrow);
    document.getElementById("r").addEventListener("click", alli);
   
    document.addEventListener('keydown', logKey);

function logKey(e) {
    
    if (!finished) {
    // stops anything from happen with holding down key
    if (e.repeat) {
        return;
    }
    
    // enter key
     if (e.keyCode == 13) {
         document.getElementById("left").removeAttribute("style");
         document.getElementById("right").setAttribute("style", "background: 	#FFC0CB;");
        chooseArrow();
        
    }
    
    // space bar
    if (e.keyCode == 32) {
        document.getElementById("right").removeAttribute("style");
        document.getElementById("left").setAttribute("style", "background: 	#FFC0CB;");
       highlightNextArrow();
    }
    
     // right arrow
    if (e.keyCode == 39) {
        document.getElementById("right").removeAttribute("style");
        document.getElementById("left").setAttribute("style", "background: 	#FFC0CB;");
       highlightNextArrow();
    }
    
    // left arrow
    if (e.keyCode == 37) {
       
        document.getElementById("right").removeAttribute("style");
        document.getElementById("left").setAttribute("style", "background: 	#FFC0CB;");
        highlightPreviousArrow();
        
    }
    
    // down arrow
    if (e.keyCode == 40) {
      
         document.getElementById("left").removeAttribute("style");
         document.getElementById("right").setAttribute("style", "background: 	#FFC0CB;");
        chooseArrow();
//         nextTurn();
    }
    }
    
    
}
    
function nextTurn() {
    document.getElementById("c-1-" + currentCol).removeAttribute("style");
    playerYellow = !playerYellow;
    currentCol = 7;
    currentCol = findNextAvailable();
    highlightFirstArrow();
}



function highlightFirstArrow() {
    if(playerYellow) {
        var firstArrow = document.getElementById("c-1-" + currentCol).setAttribute("style", "background: yellow;");
    } else {
        var firstArrow = document.getElementById("c-1-" + currentCol).setAttribute("style", "background: red;");
    }
}
    
    
    var                      
    start = function(){
        finished = false;
        changePlayer();
    },  		
    newGame = function(message){
        if (confirm(message)){
            start();
            forAllCells(emptyField);
        }
    },        
    element = function(id){
        return doc.getElementById(id);
    },
    value = function(el){
        return element(el).innerHTML;
    },                        
    cell = function(i,j){
        return element("c-"+i+"-"+j);
    },       
    forAllCells = function(action){
        for (var t = 1;t<7;t++){
            for (var counter2 = 1;counter2<8;counter2++){
                action(t,counter2);
            }
        }
    },                     
    sameColor = function(i,j){
        return testClass(i,j,players[current]);
    },                        
    changePlayer = function(){
        element("c").innerHTML = players[current = (current + 1) % 2];
    },                           
    horizontalWon = function(i,j){
        for(var min=j-1;min>0;min--)if(!sameColor(i,min))break;					
        for(var max=j+1;max<8;max++)if(!sameColor(i,max))break;
        return max-min>4;
    },
                                
    verticalWon = function(i,j){
        for(var max=i+1;max<7;max++)if(!sameColor(max,j))break;
        return max-i>3;
    },                        
    diagonalLtrWon = function(i,j){
        for(var min=i-1,t=j-1;min>0;min--,t--)if(t<1||!sameColor(min,t))break;
        for(var max=i+1,t=j+1;max<7;max++,t++)if(t>7||!sameColor(max,t))break;
        return max-min>4;
    },                      
    diagonalRtlWon = function(i,j){
        for(var min=i-1,t=j+1;min>0;min--,t++)if(t>7||!sameColor(min,t))break;
        for(var max=i+1,t=j-1;max<7;max++,t--)if(t<1||!sameColor(max,t))break;
        return max-min>4;
    },         
    colorField = function(i,j,color){
        cell(i,j).className = color;
    },                      
    emptyField = function(i,j){
        colorField(i,j,'');
    },
    testClass = function(i,j,value){
        return cell(i,j).className == value;
    },
//    addCellBehavior = function(i,j){
//        cell(i,j).onclick = function(j){
//            return function(){
//                if(!finished){
//                    for (var t = 6;t>0;t--){
//                        if(testClass(t,j,'')){
//                            colorField(t,j,players[current]);
//                            if(horizontalWon(t,j) || verticalWon(t,j) || diagonalLtrWon(t,j) || diagonalRtlWon(t,j)){
//                                finished = true;
//                                newGame(wonMessage.replace("%s",players[current]));
//                            } else {
//                                changePlayer();
//                            }
//                            break;
//                        }
//                    }
//                }
//            }
//        }(j);
//    },
    players = [value("a"),value("b")],         
    current = 0,
    newGameMessage = value("n"),
    wonMessage = value("w"),
    finished;
    start();
    forAllCells(addCellBehavior);
    element("r").onclick = function(){
        newGame(newGameMessage)
    };
})(document);