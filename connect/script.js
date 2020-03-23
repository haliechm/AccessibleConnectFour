(function(doc){
    
    
    var currentCol = 1;
    var playerYellow = true;
    var numFilled = 0;
    var human = true;
    var easy = true;
    
window.onload = function() {
    console.log("Window loaded");
    highlightFirstArrow();
}

function computerAIEasy() {
    console.log("In computer AI");
    var notFoundYet = true;
    currentCol = Math.ceil(Math.random() * 7);
    // choose random column for computer
    while(notFoundYet) {
        if(testClass(1, currentCol, '')) {
            notFoundYet=false;
        } else {
            currentCol = Math.ceil(Math.random() * 7);
        }
    }
    
    console.log("in ai - col: " + currentCol);
    chooseArrow();

    return;
}

    
function chooseArrow() {
    document.getElementById("left").removeAttribute("style");
    document.getElementById("right").setAttribute("style", "background: 	#FFC0CB;");
    numFilled++;
    var j = currentCol;
    var delayInMilliseconds = 300;
    if(!finished){
                    for (var t = 6;t>0;t--){
                        if(testClass(t,j,'')){
                            colorField(t,j,players[current]);
                            
                            if (filled()) {
                                if (human) {
                                    setTimeout(function() {
                                        newGameHuman("It's a tie! Play again to see who the real winner is");
                                    }, delayInMilliseconds);
                                } else {
                                    setTimeout(function() {
                                        newGameComputer("It's a tie! Play again to beat the computer");
                                    }, delayInMilliseconds);
                                }
                            }
                            if(horizontalWon(t,j) || verticalWon(t,j) || diagonalLtrWon(t,j) || diagonalRtlWon(t,j)){
                                finished = true;
                                if (human) {
                                    setTimeout(function() {
                                        newGameHuman(wonMessage.replace("%s",players[current]));
                                    }, delayInMilliseconds);
                                } else {
                                    setTimeout(function() {
                                        newGameComputer(wonMessage.replace("%s",players[current]));
                                    }, delayInMilliseconds);
                                }
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

    
    if (playerYellow){
        var nextArrow = document.getElementById("c-1-" + currentCol).setAttribute("style", "background: yellow;");
    } else {
        var nextArrow = document.getElementById("c-1-" + currentCol).setAttribute("style", "background: red;");
    }
}
    function resetGameHuman() {
        newGameHuman("Are you sure you want to start a new game playing against a human?")
    }
    
    function resetGameComputer() {
        newGameComputer("Are you sure you want to start a new game playing against the computer?")
    }
    
    
    
    document.getElementById("left").addEventListener("click", highlightNextArrow);
    document.getElementById("right").addEventListener("click", chooseArrow);
    document.getElementById("rH").addEventListener("click", resetGameHuman);
    document.getElementById("rC").addEventListener("click", resetGameComputer);
   
   
    document.addEventListener('keydown', logKey);

function logKey(e) {
    
    if (!finished) {
        
    // stops anything from happen when holding down a key
    if (e.repeat) {
        return;
    }
    
    // enter key
     if (e.keyCode == 13) {
        chooseArrow();
        
    }
     
    // space bar
    if (e.keyCode == 32) {
       highlightNextArrow();
    }
    
     // right arrow
    if (e.keyCode == 39) {
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

    }
    }
    
    
}
    
function nextTurn() {
    document.getElementById("c-1-" + currentCol).removeAttribute("style");
    playerYellow = !playerYellow;
    currentCol = 7;
    currentCol = findNextAvailable();
    highlightFirstArrow();
    
    if (!playerYellow && !human && easy && !finished) {
        console.log("yay here");
        var delayInMilliseconds = 300;
        setTimeout(function() {
            computerAIEasy();
        }, delayInMilliseconds);
    }
}



function highlightFirstArrow() {
    if(playerYellow) {
        var firstArrow = document.getElementById("c-1-" + currentCol).setAttribute("style", "background: yellow;");
    } else {
        var firstArrow = document.getElementById("c-1-" + currentCol).setAttribute("style", "background: red;");
    }
}
    
function filled() {
    if(numFilled >= 42) {
        return true;
    } 
    return false;
}
    
   
// Some of the following code is credited to John Slegers
    var                      
    start = function(){
        document.getElementById("left").addEventListener("click", highlightNextArrow);
    document.getElementById("right").addEventListener("click", chooseArrow);
        finished = false;
        currentCol = 1;
        current = 0;
        playerYellow = true;
        changePlayer();
        numFilled = 0;
    },  		
    newGameHuman = function(message){
        if (confirm(message)){
//            document.location.reload();
//            forAllCells(emptyField);
            document.getElementById("c-1-" + currentCol).removeAttribute("style", "background: yellow;");
            document.getElementById("c-1-" + currentCol).removeAttribute("style", "background: red;");
            human = true;
            start();
            forAllCells(emptyField);
            highlightFirstArrow();
        } else {
            if(finished) {
                
                 document.getElementById("c-1-" + currentCol).removeAttribute("style", "background: yellow;");
            document.getElementById("c-1-" + currentCol).removeAttribute("style", "background: red;");
                
                document.getElementById("left").removeEventListener("click", highlightNextArrow);
                document.getElementById("right").removeEventListener("click", chooseArrow);
            }
        }
    },   
      newGameComputer = function(message){
        if (confirm(message)){
//            document.location.reload();
//            forAllCells(emptyField);
            
            document.getElementById("c-1-" + currentCol).removeAttribute("style", "background: yellow;");
            document.getElementById("c-1-" + currentCol).removeAttribute("style", "background: red;");
            human = false;
            easy = true;
            start();
            forAllCells(emptyField);
            highlightFirstArrow();
        } else {
            console.log("finished: " + finished);
            if(finished) {
                console.log("here in finished");
                 document.getElementById("c-1-" + currentCol).removeAttribute("style", "background: yellow;");
                document.getElementById("c-1-" + currentCol).removeAttribute("style", "background: red;");
                
                document.getElementById("left").removeEventListener("click", highlightNextArrow);
                document.getElementById("right").removeEventListener("click", chooseArrow);
            }
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
    players = [value("a"),value("b")],         
    current = 0,
    newGameMessage = value("n"),
    wonMessage = value("w"),
    finished;
    start();
    forAllCells(addCellBehavior);
    element("rH").onclick = function(){
        newGameHuman(newGameMessage)
    };
})(document);


