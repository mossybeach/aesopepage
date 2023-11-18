//GIFT TOP
window.addEventListener("load", () => {
  document.querySelector(
    ".gift_top"
  ).innerHTML = `<h4>전 구매 무료상품 및 선물포장과 단독 기프트 메시지 카드 혜택을 즐겨보세요.</h4>`;
});

// LEFT GNB
const headerUrl = "../json/header.json";
fetch(headerUrl)
  .then((response) => response.json())
  .then((json) => {
    let leftOutput = "";
    json.leftNav.forEach((list) => {
      leftOutput += `<a href="#">${list.category}</a>`;
      // console.log(leftOutput);
    });
    document.querySelector(".gnb").innerHTML = leftOutput;

    let rightOutput = "";

    json.rightNav.forEach((list) => {
      rightOutput += `<a href="#">${list.category}</a>`;
    });

    const gnbRight = document.querySelector(".gnb_right");
    gnbRight.innerHTML = rightOutput;

    const findIcon = document.createElement("a");
    findIcon.classList.add("finder");
    json.rightNav.unshift(findIcon);

    const newDiv = document.createElement("div");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");

    newDiv.classList.add("toggle");
    gnbRight.appendChild(newDiv);
    newDiv.appendChild(span1);
    newDiv.appendChild(span2);
    json.rightNav.push(newDiv);
  })
  .catch((err) => console.log(err));

//NAV TOGGLE
const newDiv = document.createElement("div");
newDiv.classList.add("toggle");

newDiv.addEventListener("click", () => {
  newDiv.classList.add("active");
});

//SKIN TYPE SECTION
const skinTypeUrl = "../json/skintype.json";
const skinIntro = document.querySelector(".define_skin");
const skinGridMid = document.querySelector(".mid");
const skinGridCom = document.querySelector(".com");
const skinGridOil = document.querySelector(".oil");
const skinGridDry = document.querySelector(".dry");

fetch(skinTypeUrl)
  .then((response) => response.json())
  .then((skinInfo) => {
    let skinHead = `
  <h2>${skinInfo.skinDesc.title}</h2>
  <p>${skinInfo.skinDesc.info}</p>
  `;
    skinIntro.innerHTML = skinHead;

    let skinMid = `
    <h3>${skinInfo.midSkin.name}</h3>
    <p>${skinInfo.midSkin.info}</p>
            <a
              href="https://www.aesop.com/kr/c/skin/normal-skin-type/"
              target="_blank"
              ><button class="mid_rec_btn">
                중성 피부 추천 제품 <span></span>
              </button>
            </a>
    `;
    skinGridMid.innerHTML = skinMid;

    let skinCom = `
    <h3>${skinInfo.combiSkin.name}</h3>
    <p>${skinInfo.combiSkin.info}</p>
            <a
              href="https://www.aesop.com/kr/c/skin/normal-skin-type/"
              target="_blank"
              ><button class="mid_rec_btn">
                복합성 피부 추천 제품 <span></span>
              </button>
            </a>
    `;
    skinGridCom.innerHTML = skinCom;

    let skinOil = `
    <h3>${skinInfo.oilSkin.name}</h3>
    <p>${skinInfo.oilSkin.info}</p>
            <a
              href="https://www.aesop.com/kr/c/skin/normal-skin-type/"
              target="_blank"
              ><button class="mid_rec_btn">
                지성 피부 추천 제품 <span></span>
              </button>
            </a>
    `;
    skinGridOil.innerHTML = skinOil;

    let skinDry = `
    <h3>${skinInfo.drySkin.name}</h3>
    <p>${skinInfo.drySkin.info}</p>
            <a
              href="https://www.aesop.com/kr/c/skin/normal-skin-type/"
              target="_blank"
              ><button class="mid_rec_btn">
                건성 피부 추천 제품 <span></span>
              </button>
            </a>
    `;
    skinGridDry.innerHTML = skinDry;
  });
//SKIN QUIZ
const questions = [
  {
    question: "세안 후 아무것도 바르지 않은 피부 상태를 알려주세요",
    options: [
      "당기고 건조하다",
      "산뜻하고 부드럽다",
      "이마와 코는 유분기가 있지만 볼과 목은 건조하다",
      "번들거리고 유분기가 많다",
    ],
  },
  {
    question: "평소 사진에선 피부가 어떻게 보여지나요",
    options: [
      "피부에서 빛이 나지 않는다",
      "때때로 빛이 난다",
      "자주 빛이 난다",
      "항상 빛이 난다",
    ],
  },
  {
    question: "메이크업 파운데이션 후 2~3시간 후 상태는 어떠한가요",
    options: [
      "각질이 있거나 주름이 진다",
      "매끄럽다",
      "광택이 난다",
      "줄무늬가 있고 반짝거린다",
    ],
  },
  {
    question: "블랙헤드 또는 화이트 헤드가 있나요",
    options: ["없다", "거의 없다", "때때로 있다", "항상 있다"],
  },
  {
    question: "확대 거울을 볼 때 핀 끝 크기 이상의 큰 모공이 있나요",
    options: ["없다", "T존(이마와 코)에만 몇개 있다", "많다", "엄청 많다"],
  },
];

let currentQuestion = 0;
let userAnswers = [];
const resultElement = document.querySelector(".skin_quiz_result");

/* Load question */

const loadQuestion = () => {
  const userQuestion = questions[currentQuestion];
  document.querySelector(".quiz_quest").innerText = userQuestion.question;

  const optionsContainer = document.querySelector("#options");
  optionsContainer.innerHTML = "";

  userQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.classList.add("active");
    button.innerText = option;

    const activate = () => {
      userAnswers.push(option);

      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
      } else {
        showResult();
      }
    };
    button.addEventListener("click", activate);
    optionsContainer.appendChild(button);
  });
};

function showResult() {
  const result = evaluateResult(userAnswers);
  resultElement.innerHTML = `<br> 당신의 피부타입은: ${result}입니다`;
}

function evaluateResult(userAnswers) {
  const scoring = {
    "당기고 건조하다": 0,
    "산뜻하고 부드럽다": 1,
    "이마와 코는 유분기가 있지만 볼과 목은 건조하다": 2,
    "번들거리고 유분기가 많다": 3,

    "피부에서 빛이 나지 않는다": 0,
    "때때로 빛이 난다": 1,
    "자주 빛이 난다": 2,
    "항상 빛이 난다": 3,

    "각질이 있거나 주름이 진다": 0,
    " 매끄럽다": 1,
    "광택이 난다": 2,
    "줄무늬가 있고 반짝거린다": 3,

    없다: 0,
    "거의 없다": 1,
    "때때로 있다": 2,
    "항상 있다": 3,

    없다: 0,
    "T존(이마와 코)에만 몇개 있다": 1,
    " 많다": 2,
    "엄청 많다": 3,
  };

  let totalScore = 0;

  userAnswers.forEach((answer) => {
    totalScore += scoring[answer];
    console.log(totalScore);
  });

  if (totalScore <= 2) {
    return "건성";
  } else if (totalScore <= 5) {
    return "중성";
  } else if (totalScore <= 11) {
    return "복합성";
  } else if (totalScore <= 15) {
    return "지성";
  }
}
const skinInfoURL = "../json/resultinfo.json";
// console.log(skinInfoURL);
const recPage = document.querySelector(".products");
console.log(recPage)
function showResult() {
  const result = evaluateResult(userAnswers);
  resultElement.innerHTML = `<h3> 당신의 피부타입은: ${result}입니다</h3>`;
  // console.log(result);

  if (result == "건성") {
    fetch(skinInfoURL)
      .then((response) => response.json())
      .then((json) => {
        let output = "";
        json.forEach((content) => {
          output += `${[content.skintype[3]]}`;
        });
        let contentsP = document.createElement("p");
        resultElement.appendChild(contentsP);
        contentsP.innerText = output;

        let skinBtn = document.createElement("a");
        skinBtn.classList.add("on");
        skinBtn.href = "#skinRec";
        skinBtn.innerHTML = "추천제품 보러가기 <span></span>";
        const skinRecUrl = "../json/skinrec.json";
        resultElement.appendChild(skinBtn);
        skinBtn.addEventListener("click", () => {
          fetch(skinRecUrl)
            .then((response) => response.json())
            .then((json) => {
              let output = "";
              json.forEach((content) => {
                output += `
                <div class="product">
                <img src= ${[content.dryOne[0]]}/>
                <div class="product_txt">
                <h3>${[content.dryOne[1]]}</h3>
                <p>${[content.dryOne[2]]}</p>
                <span${[content.dryOne[3]]}</span>
                <div class="prod_btns">
                  <button class="prod">카트 추가</button>
                  <button class="buy">바로 구매</button>
                </div>
                </div>
                </div>
                <div class="product">
                <img src= ${[content.dryTwo[0]]} />
                <div class="product_txt">
                <h3>${[content.dryTwo[1]]}</h3>
                <p>${[content.dryTwo[2]]}</p>
                <span${[content.dryTwo[3]]}</span>
                <div class="prod_btns">
                  <button class="prod">카트 추가</button>
                  <button class="buy">바로 구매</button>
                </div>
                </div>
                </div>
                <div class="product">
                <img src= ${[content.dryThr[0]]} />
                <div class="product_txt">
                <h3>${[content.dryThr[1]]}</h3>
                <p>${[content.dryThr[2]]}</p>
                <span${[content.dryThr[3]]}</span>
                <div class="prod_btns">
                  <button class="prod">카트 추가</button>
                  <button class="buy">바로 구매</button>
                </div>
                </div>
                </div>
                `;
                console.log(output);
                recPage.innerHTML = output;
              });
              
            });
        })
      });
  }
  if (result == "복합성") {
    fetch(skinInfoURL)
      .then((response) => response.json())
      .then((json) => {
        let output = "";
        json.forEach((content) => {
          output += `${[content.skintype[1]]}`;
        });
        let contentsP = document.createElement("p");
        resultElement.appendChild(contentsP);
        contentsP.innerText = output;

        let skinBtn = document.createElement("a");
        skinBtn.classList.add("on");
        skinBtn.href = "#skinRec";
        skinBtn.innerHTML = "추천제품 보러가기 <span></span>";
        resultElement.appendChild(skinBtn);
        skinBtn.addEventListener("click", (e) => {
          const recPage = document.querySelector(".products");
          recPage.innerHTML = `
          <div class="product">
          <img src="../img/complexities/complexities1.png" alt="" />
          <div class="product_txt">
            <h3>페뷸러스 페이스 오일</h3>
            <p>
              정화 작용의 식물 추출물이 들어있어 혼잡한 피부를 정리하고
              밸런스를 <br />
              잡아주는 페이셜 오일
            </p>
            <span>₩67,000</span>
            <div class="prod_btns">
              <button class="prod">카트 추가</button>
              <button class="buy">바로 구매</button>
            </div>
          </div>
        </div>
        <div class="product">
          <img src="../img/complexities/complexities2.png" alt="" />
          <div class="product_txt">
            <h3>
              파슬리 씨드 안티 옥시던트 <br />
              하이드레이터
            </h3>
            <p>
              가볍고 빠르게 흡수되어 <br />
              항산화 작용과 수분공급을 주는 <br />
              로션 타입의 하이드레이터
            </p>
            <span>₩80,000</span>
            <div class="prod_btns">
              <button class="prod">카트 추가</button>
              <button class="buy">바로 구매</button>
            </div>
          </div>
        </div>
        <div class="product">
          <img src="../img/complexities/complexities3.png" alt="" />
          <div class="product_txt">
            <h3>리무브</h3>
            <p>
              눈 주위의 민감한 피부를 달래고 <br />진정시켜주는
              마트리카리아가
              <br />
              포함된 부드러운 오일 제형의 <br />
              아이 메이크업 리무브
            </p>
            <span>₩29,000</span>
            <div class="prod_btns">
              <button class="prod">카트 추가</button>
              <button class="buy">바로 구매</button>
            </div>
          </div>
        </div>
            `;
        });
      });
  }
  if (result == "지성") {
    fetch(skinInfoURL)
      .then((response) => response.json())
      .then((json) => {
        let output = "";
        json.forEach((content) => {
          output += `${[content.skintype[2]]}`;
        });
        let contentsP = document.createElement("p");
        resultElement.appendChild(contentsP);
        contentsP.innerText = output;

        let skinBtn = document.createElement("a");
        skinBtn.classList.add("on");
        skinBtn.href = "#skinRec";
        skinBtn.innerHTML = "추천제품 보러가기 <span></span>";
        resultElement.appendChild(skinBtn);
      });
  }
  if (result == "중성") {
    fetch(skinInfoURL)
      .then((response) => response.json())
      .then((json) => {
        let output = "";
        json.forEach((content) => {
          output += `${[content.skintype[0]]}`;
        });
        let contentsP = document.createElement("p");
        resultElement.appendChild(contentsP);
        contentsP.innerText = output;

        let skinBtn = document.createElement("a");
        skinBtn.classList.add("on");
        skinBtn.href = "#skinRec";
        skinBtn.innerHTML = "추천제품 보러가기 <span></span>";
        resultElement.appendChild(skinBtn);
      });
  }
}
loadQuestion();

//FOOTER
const footerUrl = "../json/footer.json";

fetch(footerUrl)
  .then((response) => response.json())
  .then((json) => {
    let output = "";
    json.forEach((content) => {
      // output += `
      // <div class="content">
      //   <h3>${titles.title}</h3>
      //   </div>`;
      output += `
      <div class="content">
        <h3>${content.title}</h3>
        <p>
          <span>${[content.subtitle[0]]}</span>
          <span>${[content.subtitle[1]]}</span>
          <span>${[content.subtitle[2]]}</span>
          <span>${[content.subtitle[3]]}</span>
        </p>
      </div>"`;
      // console.log(output);
    });
    const contents = document.querySelector(".contents");
    contents.innerHTML = output;
  });
