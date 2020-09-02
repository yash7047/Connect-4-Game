document.addEventListener('DOMContentLoaded',()=> {
    const squares = document.querySelectorAll('.square');
    const result = document.querySelector('#result');
    const displayCurrentPlayer = document.querySelector('#current-player');
    const setBtn=document.getElementById('setbtn');
    const aboutGame=document.querySelector('.about-game');
    const aboutMe=document.querySelector('.about-me');
    const newBtn=document.querySelector('.new-game');
    const resetBtn=document.querySelector('.reset-game');
    const firstPlayer=document.getElementById('first-player')
    const secondPlayer=document.getElementById('second-player')
    var playerFirst,playerSecond,currentPlayer;

    setBtn.addEventListener('click',function(){
        playerFirst=firstPlayer.value;
        playerSecond=secondPlayer.value;
        currentPlayer = playerFirst;
        displayCurrentPlayer.innerHTML = currentPlayer+" turn";
    });

    function reset(){
        for(var i = 0; i < squares.length - 7 ; i++){
            if(squares[i].classList.contains('taken'))
                squares[i].classList.remove('taken');
            if(squares[i].classList.contains('player-one'))
                squares[i].classList.remove('player-one');
            if(squares[i].classList.contains('player-two'))
                squares[i].classList.remove('player-two');
        }
        displayCurrentPlayer.innerHTML = "Player One turn";
        result.innerHTML = firstPlayer.value = secondPlayer.value = "";
    }

    newBtn.addEventListener('click',reset);
    resetBtn.addEventListener('click',reset);

    aboutGame.addEventListener('click',()=>{
        swal({
            title: "How to play",
            text: "Connect Four is a two-player connection game in which the" +
                  "players first choose a color and then take turns dropping colored discs" +
                  "from the top into a seven-column, six-row vertically suspended grid. " +
                  "The pieces fall straight down, occupying the next available space within the column. " +
                  "The objective of the game is to be the first to form a horizontal, vertical, " +
                  "or diagonal line of four of one's own discs. Connect Four is a solved game. " +
                  "The first player can always win by playing the right moves.",
            button: false
        });
    });

    aboutMe.addEventListener('click',()=>{
        swal({
            title: "Yash Jaiswal",
            text: "I love to play around with code and create games. " +
                  "Connect4 is one of them. In free time I like to spend time by watching movies, " +
                  "series and playing mobile games with my friends.",
            button: false
        });
    });

    for (var i = 0, len = squares.length; i < len; i++)
        (function (index) {
                squares[i].onclick = function () {
                    if (squares[index + 7].classList.contains('taken') && !squares[index].classList.contains('player-one')
                        && !squares[index].classList.contains('player-two')) {
                        again: ;
                        if(firstPlayer.value=="" || secondPlayer.value==""){
                            swal("Error","Player's names are not set!!","error");
                            goto: again;
                        }
                        if (currentPlayer === playerFirst) {
                            squares[index].classList.add('taken','player-one');
                            currentPlayer = playerSecond;
                            displayCurrentPlayer.innerHTML = currentPlayer+" turn";
                        } else if (currentPlayer === playerSecond) {
                            squares[index].classList.add('taken','player-two');
                            currentPlayer = playerFirst;
                            displayCurrentPlayer.innerHTML = currentPlayer+" turn";
                        }
                    } else {
                        swal("Error","You can't go there!","error");
                    }
                }
            })(i);

    function checkBoard(){
        const winningArrays=[
            [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24],
            [21, 22, 23, 24],[20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3],
            [0, 7, 14, 21], [41, 34, 27, 20],[1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18],
            [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],[37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
            [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],[7, 15, 23, 31], [34, 26, 18, 10],
            [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],[13, 19, 25, 31],
            [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
            [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32],
            [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
            [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 2], [33, 32, 31, 30],
            [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31],
            [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
        ]

        for(var i=0;i<winningArrays.length;i++){
            const square1=squares[winningArrays[i][0]];
            const square2=squares[winningArrays[i][1]];
            const square3=squares[winningArrays[i][2]];
            const square4=squares[winningArrays[i][3]];
            if(square1.classList.contains('player-one')&&square2.classList.contains('player-one')&&
                square3.classList.contains('player-one')&&square4.classList.contains('player-one')){
                result.innerHTML=playerFirst+" Wins!";
                displayCurrentPlayer.innerHTML = "";
                swal({
                    text: "Congratulations, "+ playerFirst+"! You won the game.",
                    value: reset()
                });
            }
            else if(square1.classList.contains('player-two')&&square2.classList.contains('player-two')&&
                square3.classList.contains('player-two')&&square4.classList.contains('player-two')){
                result.innerHTML=playerSecond+" Wins!";
                displayCurrentPlayer.innerHTML="";
                swal({
                    text: "Congratulations, "+ playerSecond+"! You won the game.",
                    value: reset()
                });
            }
        }
    }

    squares.forEach(square=>square.addEventListener('click',checkBoard));

})