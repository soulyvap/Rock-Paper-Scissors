/**  
Orientation - JS assignment 2
Solution by: [Soulyvanh Phetsarath]
*/

const game = () => {
//counter initiation and variable access    
    
    //score counts
    let pScore = 0;
    let cScore = 0;

    //result history
    let matchHistory = [];

    //intro screen
    const introScreen = document.querySelector('.intro');
    const rules = document.querySelector('.rules-display');
    const playBtn = document.querySelector('.intro button');

    //top HUD
    const healthUI = document.querySelector('.top');
    const pHealth = document.querySelector('.pHealth');
    const cHealth = document.querySelector('.cHealth');
    const playerScore = document.querySelector('.player-score h1');
    const computerScore = document.querySelector('.computer-score h1');
    const pStreak = document.querySelector('.player-health p');
    const cStreak = document.querySelector('.computer-health p');
    
    //match screen
    const matchScreen = document.querySelector('.match');
    const winner = document.querySelector('.winner')
    const hands = document.querySelectorAll('.hands img');
    const playerHand =  document.querySelector('.player-hand');
    const computerHand =  document.querySelector('.computer-hand');
    const optionSelection = document.querySelector('.options');
    const optionButtons = document.querySelectorAll('.options button');

        
    //end screen
    const endMessage = document.querySelector('.end h2');
    const endScreen = document.querySelector('.end');
    const playAgainBtn = document.querySelector('.playAgain');

    //sfx
    const introSong = document.querySelector('.introSong');
    introSong.volume = 0.1;
    introSong.loop = true;
    introSong.play();
    const battleMusic = document.querySelector('.battleMusic');
    battleMusic.volume = 0.1;
    const superSound = document.querySelector('.superSound');
    superSound.volume = 0.1;
    const weakSound = document.querySelector('.weakSound');
    weakSound.volume = 0.1;
    victorySong = document.querySelector('.victorySong');
    victorySong.volume = 0.1;
    downSound = document.querySelector('.downSound');
    downSound.volume = 0.1;

//start the game (change screen and play battle music on button click)
    const startGame = () => {
        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            rules.classList.add('fadeOut');
            introSong.pause();
            battleMusic.play();
            playerHand.style.animation = 'playerIn 1s ease 0.5s';
            computerHand.style.animation = 'computerIn 1s ease 0.5s';
            matchScreen.classList.add('fadeIn');
            healthUI.classList.add('fadeIn');
        });
    };

//play a match (get user choice and randomly generated cpu choice and compare them)
    const playMatch = () => {
        for (hand of hands) {
            hand.addEventListener('animationend', function () {
                this.style.animation = '';
            });
        };
        //computer options
        const computerOptions = ['rock', 'paper', 'scissors'];
        //reset hands, get cpu choice, hide option buttons, timeout, compare hands, update hands, options and winner paragraph reappear
        for (option of optionButtons) {
            option.addEventListener('click', function () {
                //reset hands
                playerHand.src = "assets/rock.png";
                computerHand.src = "assets/rock.png";
                //reset buttons and winner paragraph (opacity = 1)
                optionSelection.classList.remove('fadeOut');
                optionSelection.classList.remove('respawn');
                winner.classList.remove('fadeOut');
                winner.classList.remove('fadeIn');
                //computer choice
                const computerNumber = Math.floor(Math.random()*3);
                const computerChoice = computerOptions[computerNumber];
                //hide options
                optionSelection.classList.add('fadeOut');
                winner.classList.add('fadeOut');
                //delay match result
                setTimeout(() => {
                    //call compareHands
                    compareHands(this.textContent, computerChoice);
                    //update images
                    playerHand.src = `assets/${this.textContent}.png`;
                    computerHand.src = `assets/${computerChoice}.png`;
                    //respawn options
                    optionSelection.classList.add('respawn');
                    winner.classList.add('fadeIn');
                }, 500);
                
                //animations
                playerHand.style.animation = 'shakePlayer 0.5s ease';
                computerHand.style.animation = 'shakeComputer 0.5s ease';
            });
        };
    };

//get streak number(compare three last elements in match history array)
    const getStreak = (user) => {
        let lastThree = matchHistory.slice(Math.max(matchHistory.length - 3, 0));
        let b = lastThree.length-1;
        let streak = 0;

            if (lastThree[b] == user) {
                streak = 1;
                if (lastThree[b-1] == user) {
                    streak = 2;
                    if (lastThree[b-2] == user) {
                        streak = 3;
                    }
                } 
            }
        return streak;
    };

//update streak display and make streak indicator blink if two-point streak
    const updateStreak = () => {
        pStreak.textContent = "Streak: " + getStreak('player');
        cStreak.textContent = "Streak: " + getStreak('computer');
        if (getStreak('player') == 2) {
            pStreak.style.animation = 'blink 1s infinite';
        } else {
            pStreak.style.animation = '';
        }
        if (getStreak('computer') == 2) {
            cStreak.style.animation = 'blink 1s infinite';
        } else {
            cStreak.style.animation = '';
        }
    }

//update pScore and cScore + update streak
    const updateScore = () => {
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
        updateStreak();
    };

//play again button (reset counters, animations, health bars, match history array and sounds; fadeout endscreen and fadein match screen; reactivating option buttons)
    const playAgain = () => {
        playAgainBtn.addEventListener('click', () => {
            pScore = 0;
            cScore = 0;
            playerScore.style.animation = '';
            computerScore.style.animation = '';
            updateScore();
            pHealth.value = 100;
            cHealth.value = 100;
            pStreak.textContent = '';
            cStreak.textContent = '';
            pStreak.style.animation = '';
            cStreak.style.animation = '';
            matchHistory = [];
            endScreen.classList.remove('fadeIn');
            victorySong.pause();
            victorySong.load();
            battleMusic.play();
            for (option of optionButtons) {
                option.disabled = false;
            }
            playerHand.style.animation = 'playerIn 1s ease 0.5s';
            computerHand.style.animation = 'computerIn 1s ease 0.5s';
            matchScreen.classList.add('fadeIn');
            healthUI.classList.add('fadeIn');
            playerHand.src = "assets/rock.png";
            computerHand.src = "assets/rock.png";
        });
    };
    
//trigger end of the game when 10W in total or 3W in a row (transitition to end screen and end music)
    const endGame = () => {
        //the winning criteria blinks
        if (pScore == 10) {
            playerScore.style.animation = 'blink 1s infinite';
        }
        if (cScore == 10) {
            computerScore.style.animation = 'blink 1s infinite';
        }
        if (getStreak('player') == 3) {
            pStreak.style.animation = 'blink 1s infinite';
            if (pScore == 10) {
                pStreak.style.animation = '';
            }
        }
        if (getStreak('computer') == 3) {
            cStreak.style.animation = 'blink 1s infinite';
            if (cScore == 10) {
                cStreak.style.animation = '';
            }
        }
        //check 10W/L in total or 3-point streak (empty healthbar, play victory/down sound, disable option buttons, enabling play again button)
        
        if (pScore == 10 || getStreak('player') == 3) {
            for (option of optionButtons) {
                option.disabled = true;
            }
            setTimeout(() => {
                cHealth.value = 0;
                matchScreen.classList.remove('fadeIn');
                endScreen.classList.add('fadeIn');
                endMessage.textContent = 'Victory!';
                battleMusic.pause();
                battleMusic.load();
                victorySong.play();
                playAgain();
                return "over"; 
            }, 1500);
        };
        if (cScore == 10 || getStreak('computer') == 3) {
            for (option of optionButtons) {
                option.disabled = true;
            }
            setTimeout(() => {
                pHealth.value = 0;
                matchScreen.classList.remove('fadeIn');
                endScreen.classList.add('fadeIn');
                endMessage.textContent = 'Game Over';
                battleMusic.pause();
                battleMusic.load();
                downSound.play();
                playAgain();
                return "over";
            }, 1500);
        };
    };

//comparing hands, updating scores, history array and health bars
    const compareHands = (playerChoice, computerChoice) => {
               
        //check for a tie
        if (playerChoice === computerChoice) {
            winner.textContent = "Tie!";
            matchHistory.push('tie');
            updateScore();
            endGame();
            return;
        }
        //check for rock
        if (playerChoice === 'rock') {
            if (computerChoice === 'scissors') {
                superSound.play();
                cHealth.value -= 10;
                winner.textContent = 'Player point!';
                pScore ++;
                matchHistory.push('player');
                updateScore();
                endGame();
                return;
            } else {
                weakSound.play();
                pHealth.value -= 10;
                winner.textContent = 'Computer point!';
                cScore ++;
                matchHistory.push('computer');
                updateScore();
                endGame();
                return;
            }
        }
        //check for paper
        if (playerChoice === 'paper') {
            if (computerChoice === 'scissors') {
                weakSound.play();
                pHealth.value -= 10;
                winner.textContent = 'Computer point!';
                cScore ++;
                matchHistory.push('computer');
                updateScore();
                endGame();
                return;
            } else {
                superSound.play();
                cHealth.value -= 10;
                winner.textContent = 'Player point!';
                pScore ++;
                matchHistory.push('player');
                updateScore();
                endGame();
                return;
            }
        }
        //check for scissors
        if (playerChoice === 'scissors') {
            if (computerChoice === 'paper') {
                superSound.play();
                cHealth.value -= 10;
                winner.textContent = 'Player point!';
                pScore ++;
                matchHistory.push('player');
                updateScore();
                endGame();
                return;
            } else {
                weakSound.play();
                pHealth.value -= 10;
                winner.textContent = 'Computer point!';
                cScore ++;
                matchHistory.push('computer');
                updateScore();
                endGame();
                return;
            }
        }
    }
//mute and unmute buttons
    const muteAll = () => {
        muteBtn = document.querySelector('.mute');
        allSounds = document.querySelectorAll('audio');

        muteBtn.addEventListener('click', () => {
            for (sound of allSounds){
                sound.muted = true;
            };
        });
    };    
    const unmuteAll = () => {
        muteBtn = document.querySelector('.unmute');
        allSounds = document.querySelectorAll('audio');

        muteBtn.addEventListener('click', () => {
            for (sound of allSounds){
                sound.muted = false;
            };
        });
    }   
    
//call all inner functions
    startGame();
    playMatch();
    muteAll();
    unmuteAll();
};

//call the game function
game();

// DISCLAIMER: I hereby declare that I do not own the rights to the music/sounds used in this app. All rights belong to the owner. No Copyright Infringement Intended.



