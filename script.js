document.addEventListener("DOMContentLoaded", function() { // HTMLがよみこまれてから動く
    const diceImages = [
        ["img/d1.png", "img/d2.png", "img/d3.png", "img/d4.png", "img/d5.png", "img/d6.png"],
        ["img/b1.png", "img/b2.png", "img/b3.png", "img/b4.png", "img/b5.png", "img/b6.png"],
        ["img/r1.png", "img/r2.png", "img/r3.png", "img/r4.png", "img/r5.png", "img/r6.png"]
    ];
    const ticketImages = [
        "img/ticket_yahtzee.png", "img/ticket_4dice.png", "img/ticket_fullhouse.png", "img/ticket_3dice.png",
        "img/ticket_lstraight.png", "img/ticket_sstraight.png", "img/ticket_choice.png"
    ]
    const buffImages = [
        "img/buff_b.png", "img/buff_r.png"
    ]

    
    const Explaincreen = document.getElementById("explainscreen");
    const StageName = document.getElementById("stagename");
    const Playcreen = document.getElementById("playscreen");

    const StartButton = document.getElementById("start-button");

    const TableLvs = document.querySelectorAll(".handlevel");
    const Tablescores = document.querySelectorAll(".handscore");
    const Tablemults = document.querySelectorAll(".handmult");

    const RollArea = document.querySelector(".diceroll-area");
    const diceElements = document.querySelectorAll(".dice"); // サイコロ全取得
    const rollButton = document.getElementById("rollButton");
    const scoreButton = document.getElementById("scoreButton");
    const resultText = document.getElementById("result");
    const scoreText = document.getElementById("score-");
    const multText = document.getElementById("mult-");
    const calculatedText = document.getElementById("total-");
    const diceScores = document.querySelectorAll(".score--");
    const diceMults = document.querySelectorAll(".mult--");
    const OKButton = document.getElementById("OK");
    const RetryButton = document.getElementById("retry");
    const QuitButton = document.getElementById("quit");

    const targetText = document.querySelector(".Target");
    const totalText = document.querySelector(".Total");
    const rerollTimes = document.querySelector(".rerolltimes");
    const scoreTimes = document.querySelector(".scoretimes");

    const UpgradeArea = document.querySelector(".upgrade-area");
    const SkipButton = document.getElementById("skipbutton");
    const ShopContainer = document.querySelector(".upgradecontainer");
    const Sidechange = document.querySelector(".sidepack");
    const Ticket = document.querySelector(".ticketpack");
    const Packs = document.querySelectorAll(".pack");
    const BuyButtons = document.querySelectorAll(".buy");

    const PackOpenContainer = document.querySelector(".openpackcontainer");
    const packText = document.querySelector(".textinpack");
    const dicesPack = document.querySelector(".dicepackbox");
    const diceinPack = document.querySelectorAll(".diceinpack");
    const BuffImg1 = document.getElementById("buffimg1");
    const BuffImg2 = document.getElementById("buffimg2");
    const BuffImg3 = document.getElementById("buffimg3");
    const ticketsPack = document.querySelector(".ticketpackbox");
    const ticketinPack3 = document.querySelectorAll(".ticketinpack3");
    const ticketinPack5 = document.querySelectorAll(".ticketinpack5");
    const BuffText = document.querySelector(".bufftextset");
    const BuffscoreText = document.querySelector(".buffscore");
    const BuffmultText = document.querySelector(".buffmult");
    const packSkipButton = document.querySelector(".skippackbutton");
    const decideBuffButton = document.querySelector(".decidebutton");

    const CoinText = document.querySelector(".coinnum");
    const diceSides = document.querySelectorAll(".diceside");

    let playflug = false; 
    let choicedDice = [true, true, true, true, true]; //ロック状態
    let intervals = [];
    let rollcheck = false;
    let rollEnable = false;
    let before_results = [];
    let Category;
    let stage = 1;
    let Gameoverflug = false;
    let dicenum = [[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]];
    let dicecolor = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    let diceindex = [];
    let handLv = [1, 1, 1, 1, 1, 1, 1]; // ヨット、４、FH、３、L、S、C
    let plusscore = [25, 20, 15, 10, 20, 15, 5];
    let plusmult = [3, 2, 1, 1, 2, 1, 1];
    let scoreLv = [50, 30, 25, 15, 40, 25, 5];
    let multLv = [5, 4, 3, 2, 4, 3, 1];
    let sidenum;
    let sidecolor;
    let ticketnum;
    let buffcolor;
    let buffnumber;
    let packnumber;
    let soldpacks = [false, false, false, false, false, false]; // パックの売り切れ状況
    let choicedDiceinPack = [false, false, false, false, false];
    let choicedTicket = [false, false, false, false, false];
    let numbers = [];
    let dicechoiceenable = false;
    let coin = 5;

    OpenWindow();

    StartButton.addEventListener("click", function() {
        if (playflug) return;
        Gamestart();
        stagestart();
    });


    diceElements.forEach((dice, index) => {
        dice.addEventListener("click", function() {
            dicechoice(index);
        })
    })

    // キー対応
    document.addEventListener("keydown", function(event) {
        if (!playflug) return;
        if (event.key === "r") {
            if (rollcheck) return;
            resetchoicedDice();
        }
        if (event.key === "t") {
            if (rollcheck) return;
            allchoicedDice();
        }

        if (event.key === "1") {
            if (dicechoiceenable){
                Packdicechoice(0);
            }
            else if (!rollcheck) {
                dicechoice(0);
            }
        }
        if (event.key === "2") {
            if (dicechoiceenable){
                Packdicechoice(1);
            }
            else if (!rollcheck) {
                dicechoice(1);
            }
        }
        if (event.key === "3") {
            if (dicechoiceenable){
                Packdicechoice(2);
            }
            else if (!rollcheck) {
                dicechoice(2);
            }
        }
        if (event.key === "4") {
            if (dicechoiceenable){
                Packdicechoice(3);
            }
            else if (!rollcheck) {
                dicechoice(3);
            }
        }
        if (event.key === "5") {
            if (dicechoiceenable){
                Packdicechoice(4);
            }
            else if (!rollcheck) {
                dicechoice(4);
            }
        }

        if (event.key === "a") {
            if (rollEnable && !rollcheck && rerolllimit > 0) {
                Diceroll();
                rerolllimit -= 1;
                rerollTimes.textContent = rerolllimit;
            }
        }
        if (event.key === "s") {
            if (rollEnable && !rollcheck && scorelimit > 0) {
                Score();
                scoreTimes.textContent = scorelimit;
            }
        }
        if (event.key === "Enter") {
            if (!OKButton.disabled) {
                stageclear();
            }
        }
        if (event.key === "e") {
            if (Gameoverflug) {
                resetGame();
            }
        }
        if (event.key === "q") {
            if (Gameoverflug) {
                quitGame();
            }
        }
    });

    rollButton.addEventListener("click", function() {
        Diceroll();
        rerolllimit -= 1;
        rerollTimes.textContent = rerolllimit;
    });

    scoreButton.addEventListener("click", function() {
        Score();
    });

    OKButton.addEventListener("click", function() {
        stageclear();
    });

    RetryButton.addEventListener("click", function() {
        if (Gameoverflug) {
            resetGame();
        }
    });

    QuitButton.addEventListener("click", function() {
        if (Gameoverflug) {
            quitGame();
        }
    });

    SkipButton.addEventListener("click", function() {
        resetchoicedDice();
        RollArea.style.display = "";
        UpgradeArea.style.display = "none";
        stagestart();
    });

    BuyButtons.forEach((button, index) => {
        button.addEventListener("click", function() {
            if (index == 0) {
                if (coin >= 3) {
                    coin -= 3;
                    BuffImg1.style.display = "";
                    openpack(index);
                    dicerollinpack();
                    console.log(numbers);
                } else return;
            }
            if (index == 1) {
                if (coin >= 3) {
                    coin -= 3;
                    BuffImg2.style.display = "";
                    openpack(index);
                    dicerollinpack();
                    console.log(numbers);
                } else return;
            }
            if (index == 2) {
                if (coin >= 5) {
                    coin -= 5;
                    BuffImg3.style.display = "";
                    openpack(index);
                    dicerollinpack();
                    console.log(numbers);
                } else return;
            }
            if (index == 3) {
                if (coin >= 3) {
                    coin -= 3;
                    ticketinPack3.forEach(ticket => {
                        ticket.style.display = "";
                    });
                    openpack(index);
                    ticketroll();
                    console.log(numbers);
                } else return;
            }
            if (index == 4) {
                if (coin >= 5) {
                    coin -= 5;
                    ticketinPack5.forEach(ticket => {
                        ticket.style.display = "";
                    });
                    openpack(index);
                    ticketroll();
                    console.log(numbers);
                } else return;
            }
            if (index == 5) {
                if (coin >= 3) {
                    coin -= 3;
                    LvUphands(ticketnum);
                    coinchek();
                } else return;
            }
            button.disabled = true;
            button.textContent = "売切";
            Packs[index].style.opacity = "0.3";
            soldpacks[index] = true;
            
            CoinText.textContent = coin;
        });
    });

    diceinPack.forEach((dice, index) => {
        dice.addEventListener("click", function() {
            Packdicechoice(index);
        });
    });

    ticketinPack3.forEach((ticket, index) => {
        ticket.addEventListener("click", function() {
            if (choicedTicket[index]) return;
            ticketinPack3.forEach((ticket,index) => {
                choicedTicket[index] = false;
                ticket.style.transform = "translateY(0px)";
            });
            choicedTicket[index] = true;
            ticket.style.transform = "translateY(-40px)";
            decideBuffButton.disabled = false;
            decideBuffButton.style.opacity = "1.0";
            BuffscoreText.textContent = "+" + plusscore[numbers[index]];
            BuffmultText.textContent = "+" + plusmult[numbers[index]];
        });
    });

    ticketinPack5.forEach((ticket, index) => {
        ticket.addEventListener("click", function() {
            if (choicedTicket[index]) return;
            ticketinPack5.forEach((ticket,index) => {
                choicedTicket[index] = false;
                ticket.style.transform = "translateY(0px)";
            });
            choicedTicket[index] = true;
            ticket.style.transform = "translateY(-40px)";
            decideBuffButton.disabled = false;
            decideBuffButton.style.opacity = "1.0";
            BuffscoreText.textContent = "+" + plusscore[numbers[index]];
            BuffmultText.textContent = "+" + plusmult[numbers[index]];
        });
    });

    decideBuffButton.addEventListener("click", function() {
        if (choicedDiceinPack == [false, false, false, false, false] || choicedTicket == [false, false, false, false, false]) return;
        if (packnumber < 3) {
            console.log("Packnumber:" + packnumber);
            selectDice();
        }
        else if (packnumber >= 3) {
            selectTicket();
        } 
        closepack();
    });

    packSkipButton.addEventListener("click", function() {
        closepack();
    });


// =====================================================================================================================
// 以下　function　一覧 
// =====================================================================================================================
    
    function OpenWindow() {
        Explaincreen.style.display = "";
        Playcreen.style.display = "none";
        playflug = false;
        StartButton.disabled = false;
    }

    function Gamestart() {
        Explaincreen.style.display = "none";
        Playcreen.style.display = "";
        playflug = true;
        StartButton.disabled = true;
    }

    function dicechoice(index) {
        if (!rollcheck) {
            choicedDice[index] = !choicedDice[index]; //選択状態の反転
        
            if (choicedDice[index]) {
                diceElements[index].style.transform = "translateY(-20px)"; // 上にちょっと浮く
            } else {
                diceElements[index].style.transform = "translateY(0)";
            }
        }
        rollEnable = false; //　１つ以上ダイスが選択されているか
        for (i=0; i<5; i++) {
            if (choicedDice[i]) {
                rollEnable = true;
            }
        }
        if (rollEnable && !rollcheck) {
            button_enable();
            handcheck();
            Levelcheck();
        } else {
            button_disenable();
            resultText.textContent = "リロール or スコア するダイスを選択してください";
        }
    }

    function button_disenable() {
        rollButton.disabled = true;
        rollButton.style.opacity = "0.7";
        scoreButton.disabled = true;
        scoreButton.style.opacity = "0.7";
        rollEnable = false;
    }
    
    function button_enable() {
        if (rerolllimit != 0) {
            rollButton.disabled = false;
            rollButton.style.opacity = "1.0";
        }
        if (scorelimit != 0) {
            scoreButton.disabled = false;
            scoreButton.style.opacity = "1.0";
        }
        rollEnable = true;
    }

    // 選択状態を初期化する関数
    function resetchoicedDice() {
        diceElements.forEach((dice, index) => {
            choicedDice[index] = false;
            dice.style.transform = "translateY(0)";
        })
        button_disenable();
        resultText.textContent = "リロール or スコア するダイスを選択してください";
        console.log("全選択解除");
    }

    function allchoicedDice() {
        diceElements.forEach((dice, index) => {
            choicedDice[index] = true;
            dice.style.transform = "translateY(-20px)";
        })
        button_enable();
        handcheck();
        console.log("全選択");
    }

    function Diceroll() {
        if (rollcheck) return;
        if (rerolllimit == 0 && scorelimit == 0) return;
        rollcheck = true;
        button_disenable();
        resultText.textContent = "Now rolling...";

        let results = [];
        let c_results = [];

        // 5つのサイコロを回転させる
        diceElements.forEach((dice, index) => {
            if (!choicedDice[index]) { // 選択されていないのはスキップ
                results[index] = before_results[index];
                return;
            }

            let speed = 100;
            let interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * 6);
                const DN = dicenum[index][randomIndex];
                const DC = dicecolor[index][randomIndex];
                dice.src = diceImages[DC][DN-1];
            }, speed);
            intervals.push(interval);
            
            // 0.7秒後にストップ
            setTimeout(() => {
                intervals.forEach(interval => clearInterval(interval));

                diceElements.forEach((dice, index) => {
                    if (!choicedDice[index]) return;
                    diceindex[index] = Math.floor(Math.random() * 6);
                    const finalIndex = diceindex[index];
                    const DN = dicenum[index][finalIndex];
                    const DC = dicecolor[index][finalIndex];
                    dice.src = diceImages[DC][DN-1];
                    results[index] = DN;
                    c_results[index] = DC;
                });

                before_results = results

                resetchoicedDice();

                resultText.textContent = "リロール or スコア するダイスを選択してください";
                rollcheck = false;

            }, 700);
        });
    }

    function handcheck() { // 選択中のダイスの役
        if (rollcheck) return;
        let hand = [0, 0, 0, 0, 0, 0];
        handnum = 0;
        
        diceElements.forEach((dice, index) => { // ダイスの出目の数
            if (choicedDice[index]) { // 選択されたもの
                hand[before_results[index] - 1] += 1;
                handnum += 1;
            }
        });

        let max = 0; // 手役確認
        let FHfulg = false;
        for (i=0; i<6; i++) {
            if (max<hand[i]) {
                max = hand[i];
            }
            if (hand[i] == 2) {
                FHfulg = true;
            }
        }
        
        if (max == 5) {
            resultText.textContent = "ヨット";
            Category = 0
            return;
        }
        if (max == 1 && handnum == 5) {
            if (hand[0] == 0 || hand[5] == 0) {
                resultText.textContent = "Lストレート";
                Category = 4
                return;
            }
        }
        if (max == 4) {
            resultText.textContent = "４ダイス";
            Category = 1
            return;
        }
        for (i=0; i<3; i++) {
            if (hand[i] != 0 && hand[i+1] != 0 && hand[i+2] != 0 && hand[i+3] != 0) {
                resultText.textContent = "Sストレート"
                Category = 5
                return;
            }
        }
        if (max == 3 && FHfulg) {
            resultText.textContent = "フルハウス";
            Category = 2
            return;
        }
        if (max == 3 && !FHfulg) {
            resultText.textContent = "３ダイス";
            Category = 3
            return;
        }
        if (handnum > 0) {
            resultText.textContent = "チョイス";
            Category = 6
            return;
        }
    }

    function Levelcheck() {
        scoreText.style.display = "inline-block";
        scoreText.textContent = scoreLv[Category] + plusscore[Category] * (handLv[Category] - 1);
        multText.style.display = "inline-block";
        multText.textContent = multLv[Category] + plusmult[Category] * (handLv[Category] - 1);
        calculatedText.style.opacity = "1.0";
        calculatedText.textContent = "X";
    }

    function Score() {
        if  (rollcheck) return;
        rollcheck = true;
        scorelimit -= 1;
        scoreTimes.textContent = scorelimit;
        button_disenable();

        let score = scoreLv[Category] + plusscore[Category] * (handLv[Category] - 1);
        let mult = multLv[Category] + plusmult[Category] * (handLv[Category] - 1);
        let handscore = 0;
        diceElements.forEach((dice, index) => {
            if (choicedDice[index]) { // 選択されたもの
                dice.style.transform = "translateY(-120px)"; // 上にだいぶ浮く
            }
        });
        
        let scoredDice = choicedDice
            .map((ischoiced, index) => ischoiced ? index : -1)
            .filter(index => index !== -1);
        
        scoredDice.forEach((index, i) => {
            setTimeout(() => {
                if (dicecolor[index][diceindex[index]] == 0) {
                    score += before_results[index];
                    diceScores[index].style.opacity = "1.0";
                    diceScores[index].textContent =  " + " + before_results[index];
                }
                if (dicecolor[index][diceindex[index]] == 1) {
                    score += before_results[index] + 15;
                    diceScores[index].style.opacity = "1.0";
                    diceScores[index].textContent =  " + " + (before_results[index] + 15);
                }
                if (dicecolor[index][diceindex[index]] == 2) {
                    score += before_results[index];
                    diceScores[index].style.opacity = "1.0";
                    diceScores[index].textContent =  " + " + before_results[index];
                    mult += 2;
                    diceMults[index].style.display = "inline-block";
                    diceMults[index].textContent = " + 2";
                }
                scoreText.style.display = "inline-block";
                scoreText.textContent = score;
                multText.style.display = "inline-block";
                multText.textContent = mult;
            }, i * 600);
        });

        setTimeout(() => {
            handscore = score * mult;
            calculatedText.textContent = score * mult;
            scoreText.style.display = "none";
            multText.style.display = "none";
            scoredDice.forEach(index => {
                diceScores[index].style.opacity = "0.0";
                diceMults[index].style.display = "none";
            });
        }, scoredDice.length * 600);
        setTimeout(() => {
            totalscore += handscore;
            calculatedText.textContent = "X";
            calculatedText.style.opacity = "0.0";
            totalText.textContent = totalscore;
        }, scoredDice.length * 600 + 600);
        
//========================================================================================================
        setTimeout(() => { 
            if (totalscore < targetscore) {// クリアしていない場合
                if (scorelimit == 0) {
                    Gameoverflug = true;
                    RetryButton.style.display = "";
                    QuitButton.style.display = "";
                    calculatedText.textContent = "Game Over";
                    calculatedText.style.opacity = "1.0";
                    resultText.textContent = "もう一度遊ぶ場合は[リトライ] or [e]キー";
                    return;
                }
                diceElements.forEach((dice, index) => {
                    if (choicedDice[index]) {
                        dice.style.transform = "translateY(-20px)";
                    }
                })
                rollcheck = false;
                Diceroll();
                return;
            }
            
            resultText.textContent = "強化画面へ";
            calculatedText.textContent = "コイン [ " + (5+scorelimit*2) + " (" + 5 + " + " + scorelimit + " x 2) ] 枚獲得";
            calculatedText.style.color = "gold";
            calculatedText.style.opacity = "1.0";
            OKButton.style.display = "";
            OKButton.disabled = false;
            shopdeside();
        }, scoredDice.length * 600 + 1000);
//========================================================================================================
    }

    function stageclear() {
        stage += 1;
        targetscore = definetargetscore(stage);
        OKButton.disabled = true;
        RollArea.style.display = "none";
        UpgradeArea.style.display = "";
        totalText.textContent = "0";
        StageName.textContent = "Shop";
        coin += (5 + scorelimit * 2);
        CoinText.textContent = coin;
        openshop();
    }

    function stagestart() {
        rollcheck  = false;
        rollEnable = false;
        choicedDice = [true, true, true, true, true];
        totalscore = 0;
        rerolllimit = 3;
        scorelimit = 3;
        targetscore = definetargetscore(stage);
        totalText.textContent = totalscore;
        rerollTimes.textContent = rerolllimit;
        scoreTimes.textContent = scorelimit;
        StageName.textContent = "Stage " + stage;
        calculatedText.style.color = "white";
        RetryButton.style.display = "none";
        QuitButton.style.display = "none";
        
        UpgradeArea.style.display = "none";
        PackOpenContainer.style.display = "none";

        calculatedText.style.opacity = "0.0";
        OKButton.style.display = "none";
        OKButton.disabled = true;
        
        button_disenable();
        Diceroll();
    }

    function definetargetscore(stage) {
        targetscore = (50 + 50*Math.floor(stage/5))* stage;
        targetText.textContent = targetscore;

        return targetscore;
    }

    function resetGame() {
        stage = 1;
        resetchoicedDice();
        resetsideview();
        Gameoverflug = false;
        dicenum = [[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]];
        dicecolor = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
        handLv = [1, 1, 1, 1, 1, 1, 1]; // ヨット、４、FH、３、L、S、C
        plusscore = [25, 20, 15, 10, 20, 15, 5];
        plusmult = [3, 2, 1, 1, 2, 1, 1];
        scoreLv = [50, 30, 25, 15, 40, 25, 5];
        multLv = [5, 4, 3, 2, 4, 3, 1];
        coin = 5

        stagestart();
    }

    function resetsideview() {
        diceSides.forEach((dice,index) => {
            dice.src = diceImages[0][index%6];
        });
    }

    function quitGame() {
        stage = 1;
        resetchoicedDice();
        resetsideview();
        Gameoverflug = false;
        dicenum = [[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]];
        dicecolor = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
        handLv = [1, 1, 1, 1, 1, 1, 1]; // ヨット、４、FH、３、L、S、C
        plusscore = [25, 20, 15, 10, 20, 15, 5];
        plusmult = [3, 2, 1, 1, 2, 1, 1];
        scoreLv = [50, 30, 25, 15, 40, 25, 5];
        multLv = [5, 4, 3, 2, 4, 3, 1];
        coin = 5

        OpenWindow();
    }

    // ショップ周り=========================================================================================

    function shopdeside() {
        buffcolor = Math.floor(Math.random()*2);
        BuffImg1.src = buffImages[buffcolor];
        buffnumber = Math.floor(Math.random()*6);
        BuffImg2.src = diceImages[0][buffnumber];
        sidenum = Math.floor(Math.random()*6);
        sidecolor = Math.floor(Math.random()*3);
        Sidechange.src = diceImages[sidecolor][sidenum];
        BuffImg3.src = diceImages[sidecolor][sidenum];

        numbers = [0, 1, 2, 3, 4, 5, 6];
        for (i = 6; i > 0; i--) {
            let j = Math.floor(Math.random()*7);
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        for (i = 0; i < 3; i++) {
            ticketinPack3[i].src = ticketImages[numbers[i]];
        }
        numbers = [0, 1, 2, 3, 4, 5, 6];
        for (i = 6; i > 0; i--) {
            let j = Math.floor(Math.random()*7);
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        for (i = 0; i < 5; i++) {
            ticketinPack5[i].src = ticketImages[numbers[i]];
        }
        ticketnum = Math.floor(Math.random()*7);
        Ticket.src = ticketImages[ticketnum];
    }

    function openshop() {
        ShopContainer.style.display = "";
        PackOpenContainer.style.display = "none";
        SkipButton.style.opacity = "1.0";
        SkipButton.disabled = false;
        BuffImg1.style.display = "none";
        BuffImg2.style.display = "none";
        BuffImg3.style.display = "none";
        ticketinPack3.forEach(ticket => {
            ticket.style.display = "none";
        });
        ticketinPack5.forEach(ticket => {
            ticket.style.display = "none";
        });
        Packs.forEach((pack, index) => {
            BuyButtons[index].disabled = false;
            BuyButtons[index].textContent = "購入";
            pack.style.opacity = "1.0";
            soldpacks[index] = false;
        });
        coinchek();
    }

    function openpack(n) {
        ShopContainer.style.display = "none";
        PackOpenContainer.style.display = "";
        SkipButton.style.opacity = "0.0";
        SkipButton.disabled = true;
        packnumber = n;
    }

    function closepack() {
        ShopContainer.style.display = "";
        PackOpenContainer.style.display = "none";
        SkipButton.style.opacity = "1.0";
        SkipButton.disabled = false;
        diceinPack.forEach((dice,index) => {
            choicedDiceinPack[index] = false;
            dice.style.transform = "translateY(0px)"
        });
        BuffImg1.style.display = "none";
        BuffImg2.style.display = "none";
        BuffImg3.style.display = "none";
        ticketinPack3.forEach(ticket => {
            ticket.style.display = "none";
            ticket.style.transform = "translateY(0px)"
        });
        ticketinPack5.forEach(ticket => {
            ticket.style.display = "none";
            ticket.style.transform = "translateY(0px)"
        });
        coinchek();
    }

    function coinchek() {
        if (coin < 3) {
            for (i=0; i<6; i++) {
                if (!soldpacks[i]) {
                    BuyButtons[i].disabled = true;
                    BuyButtons[i].textContent = "不足"
                    Packs[i].style.opacity = "0.6";
                }
            }
        } else if (coin < 5) {
            for (i=2; i < 5; i += 2) {
                if (!soldpacks[i]) {
                    BuyButtons[i].disabled = true;
                    BuyButtons[i].textContent = "不足"
                    Packs[i].style.opacity = "0.6";
                }
            }
        }
    }

    function dicerollinpack() {
        dicechoiceenable = false;
        decideBuffButton.disabled = true;
        decideBuffButton.style.opacity = "0.7";
        dicesPack.style.display = "";
        ticketsPack.style.display = "none";
        packText.textContent = "Please Wait...";
        BuffText.style.display = "none";

        diceinPack.forEach((dice, index) => {
            let speed = 100;
            let interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * 6);
                const DN = dicenum[index][randomIndex];
                const DC = dicecolor[index][randomIndex];
                dice.src = diceImages[DC][DN-1];
            }, speed);
            intervals.push(interval);
            
            // 0.7秒後にストップ
            setTimeout(() => {
                intervals.forEach(interval => clearInterval(interval));
                if (index == 4) {
                    diceinPack.forEach((dice, index) => {
                        diceindex[index] = Math.floor(Math.random() * 6);
                        const finalIndex = diceindex[index];
                        const DN = dicenum[index][finalIndex];
                        const DC = dicecolor[index][finalIndex];
                        dice.src = diceImages[DC][DN-1];
                        console.log(diceindex[index])
                        dicechoiceenable = true;
                    });

                }

                packText.textContent = "強化するダイスを選んでください";

            }, 700);
        });
    }

    function Packdicechoice(index){
        if (!dicechoiceenable) return;
        if (choicedDiceinPack[index]) return;
        diceinPack.forEach((dice,index) => {
            choicedDiceinPack[index] = false;
            dice.style.transform = "translateY(0px)";
        });
        choicedDiceinPack[index] = true;
        diceinPack[index].style.transform = "translateY(-50px)";
        decideBuffButton.disabled = false;
        decideBuffButton.style.opacity = "1.0";

    }

    function ticketroll() {
        resetchoicedTicket();
        decideBuffButton.disabled = true;
        decideBuffButton.style.opacity = "0.7";
        dicesPack.style.display = "none";
        ticketsPack.style.display = "";
        packText.textContent = "レベルを上げる役を選んでください";
        BuffText.style.display = "";
        BuffscoreText.textContent = "";
        BuffmultText.textContent = "";
    }

    function selectDice() {
        choicedDiceinPack.forEach((dice, index) => {
            if (dice) {
                if (packnumber == 0) {
                    dicecolor[index][diceindex[index]] = buffcolor + 1;
                }
                if (packnumber == 1) {
                    dicenum[index][diceindex[index]] = buffnumber + 1;
                }
                if (packnumber == 2) {
                    dicecolor[index][diceindex[index]] = sidecolor;
                    dicenum[index][diceindex[index]] = sidenum + 1;
                }
                diceSides[(index*6 + diceindex[index])].src = diceImages[dicecolor[index][diceindex[index]]][dicenum[index][diceindex[index]]-1];
                console.log(index + "_" + diceindex[index]);
            }
        })
    }

    function selectTicket() {
        let f
        choicedTicket.forEach((ticket, index) => {
            if (ticket) {
                f = numbers[index];
                console.log(f);
            }
        });
        LvUphands(f);
    }

    function resetchoicedTicket() {
        ticketinPack3.forEach((ticket, index) => {
            if (!choicedTicket[index]) return;
                choicedTicket[index] = false;
                ticket.style.transform = "translateY(0px)";
        });
        ticketinPack5.forEach((ticket, index) => {
            if (!choicedTicket[index]) return;
                choicedTicket[index] = false;
                ticket.style.transform = "translateY(0px)";
        });
    }

    function LvUphands(n) {
        handLv[n] += 1;
        TableLvs[n].textContent = handLv[n];
        Tablescores[n].textContent = (scoreLv[n] + plusscore[n] * (handLv[n] - 1));
        Tablemults[n].textContent = (multLv[n] + plusmult[n] * (handLv[n] - 1));
    }
});
