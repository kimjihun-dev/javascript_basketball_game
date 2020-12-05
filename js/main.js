// 각종 전역변수들을 담을 오브젝트 선언 
let computer = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

let user = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

let game = {
    isComputerTurn: true,
    shotsLeft: 15
};


// 컴퓨터 로직
function onComputerShoot(){
    
    // 컴퓨터의 차례가 아니라면 로직실행 안함. 
    if (!game.isComputerTurn)
        return;

    // AI 조정 함수
    updateAI();

    // 랜덤함수를 돌려 0.5 보다 크면 2점 슛, 아니라면 3점 슛
    let shootType = Math.random() < 0.5 ? 2 : 3;

    if (Math.random() < computer['percent' + shootType]) {
        showText('컴퓨터가 ' + shootType + '점 슛을 성공시켰습니다.');
        updateComputerScore(shootType);
    } else {
        showText('컴퓨터가 ' + shootType + '점 슛을 실패하였습니다.');
    }

    // 다음 차례는 유저
    game.isComputerTurn = false;

    // 컴퓨터 차례가 끝났으므로 버튼은 비활성화
    // 유저 버튼을 활성화 시킨다. 
    disabledComputerButtons(true);
    disabledUserButtons(false);

}

// 유저 로직
function onUserShoot(shootType){

    if (game.isComputerTurn)
        return;

    // 유저의 경우 2점 , 3점 샷을 골라서 클릭하므로 
    // 랜덤 함수 불필요 

    // 버튼을 눌렀을시 해당 점수를 shootType 인자값으로 받아 로직 실행 
    // percen + shootTpye(2) = 0.5 
    if (Math.random() < user['percent' + shootType]){
        showText('유저의 ' + shootType + ' 점 슛이 성공하였습니다!');
        updateUserScore(shootType);
    } else {
        showText('유저의 ' + shootType + ' 점 슛이 실패하였습니다.');
    }

    // 다음 컴퓨터 차레로 넘긴다.
    game.isComputerTurn = true;

    // 다음은 컴퓨터 순번이므로 유저 버튼 비활성화
    disabledComputerButtons(false);
    disabledUserButtons(true); 

    // 게임횟수 카운팅 처리
    game.shotsLeft--;

    // 게임횟수 기록 변경
    let $shotsLeftElem = $("#shotsCount");
    $shotsLeftElem.html(game.shotsLeft);

    // 게임횟수가 0 일 경우  
    if (game.shotsLeft === 0) {
        // 누적된 점수들을 비교 
        if (user.score > computer.score)
            showText("유저 승리!!");
        else if (user.score < computer.score)
            showText("패배했습니다ㅠㅠ");
        else 
            showText("무승부");

        // 게임이 다 끝났으므로 모든 버튼은 비활성화 시킨다. 
        disabledComputerButtons(true);
        disabledUserButtons(true);            
    }

}


//  리팩토링 함수모음

// AI 개선
function updateAI() {
    // 유저 점수와 컴퓨터 점수를 뺀 값으로 로직 실행
    let diff = user.score - computer.score;

    if (diff >= 10){
        computer.percent2 = 0.7;
        computer.percent3 = 0.43;
    } else if (diff >= 6) {
        computer.percent2 = 0.6;
        computer.percent3 = 0.38;
    } else if (diff <= -10){
        computer.percent2 = 0.3;
        computer.percent3 = 0.23;
    } else if (diff <= -6) {
        computer.percent2 = 0.4;
        computer.percent3 = 0.28;
    }
}

// 텍스트 처리 
function showText(s) {

    let $textElem = $("#text");

    $textElem.fadeOut(300, function(){
        $textElem.html(s);
        $textElem.fadeIn();
    });
    
}

// 컴퓨터 점수 함수
function updateComputerScore(score) {

    computer.score += score;

    let $comScoreElem = $("#computer-score");

    // jquery.animate.number 
    $comScoreElem.animateNumber({
        number: computer.score
    });

    
}

// 유저 점수 함수
function updateUserScore(score) {

    user.score += score;

    let $userScoreElem = $("#user-score");

    $userScoreElem.animateNumber({
        number: user.score
    });
    
}

// 컴퓨터 버튼 활성화 유무
function disabledComputerButtons(flag) {
    $(".btn-computer").prop("disabled", flag);
}

// 유저 버튼 활성화 유무
function disabledUserButtons(flag) {
    $(".btn-user").prop("disabled", flag);
}

// 카운트 다운
$(function(){
    showText(3);

    setTimeout(function(){
        
        showText(2);

        setTimeout(function(){

            showText(1);

            setTimeout(function(){
                showText("컴퓨터부터 시작합니다!");
                disabledComputerButtons(false);
            }, 1000);
        }, 1000);
    }, 1000);
});