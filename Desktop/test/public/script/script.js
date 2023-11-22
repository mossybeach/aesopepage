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
    question: "수분이 많지 않을 때 얼굴 피부가 팽팽하게 느껴질때가 있나요?",
    options: [
      "항상 그렇다",
      "때때로 그렇다",
      "거의 그렇지 않다",
      "전혀 그렇지 않다",
    ],
  },
  {
    question: "T존 (이마와 코)에 유분기가 있나요?",
    options: ["전혀 없다", "때때로 있다", "자주 있다", "항상 있다"],
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
        document.querySelector(".quiz_quest").innerText = ""
        showResult();
        optionsContainer.innerHTML= `<h2 class="resulth2">피부타입 진단이 완료되었습니다</h2>
        <a href="#skinResult">결과 확인하기</a>`
      }
    };
    button.addEventListener("click", activate);
    optionsContainer.appendChild(button);
  });
};


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

    "항상 그렇다": 0,
    "때때로 그렇다": 1,
    "거의 그렇지 않다": 2,
    "전혀 그렇지 않다": 3,

    "전혀 없다": 0,
    "때때로 있다": 1,
    "자주 있다": 2,
    "항상 있다": 3,
  };

  let totalScore = 0;

  userAnswers.forEach((answer) => {
    totalScore += scoring[answer];
    console.log(totalScore);
  });

  if (totalScore <= 2) {
    return "건성";
  } else if (totalScore <= 7) {
    return "중성";
  } else if (totalScore <= 11) {
    return "복합성";
  } else if (totalScore <= 15) {
    return "지성";
  }
}
const skinInfoURL = "../json/resultInfo.json";
const recPage = document.querySelector(".products");
console.log(recPage);
function showResult() {
  const result = evaluateResult(userAnswers);
  resultElement.innerHTML = `<h3> 당신의 피부타입은: ${result}입니다</h3>`;

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
        contentsP.innerHTML = output;

        let skinBtn = document.createElement("a");
        skinBtn.classList.add("on");
        skinBtn.href = "#skinRec";
        skinBtn.innerHTML = "추천제품 보러가기 <span></span>";
        const skinRecUrl = "../json/skinrec.json";
        resultElement.appendChild(skinBtn);

        skinBtn.addEventListener("click", () => {
          recPage.innerHTML = `
          <div class="product">
          <div class= "product_img">
          <img src="../img/dry/dry1.png" alt="" />
          </div>
          <div class="product_txt">
            <h3>카모마일 컨센트레이트 안티 <br> 블레미쉬 마스크</h3>
            <p>
            건조함 없이 모공까지 깨끗하게 세정해주며, 자극이 적고 효과적으로 피부를 진정시켜주어 문제성 피부 관리에도 적합한 딥 클렌징 마스크 사이즈.
            </p>
            <span>₩55,000</span>
            <div class="prod_btns">
              <button class="prod">카트 추가</button>
              <button class="buy">바로 구매</button>
            </div>
          </div>
        </div>
        <div class="product">
        <div class= "product_img">
        <img src="../img/dry/dry2.png" alt="" />
        </div>
          <div class="product_txt">
            <h3>
            파슬리 씨드 안티 옥시던트 <br> 인텐스 세럼
            </h3>
            <p>
            민감성 피부를 포함한 대부분의 피부 타입에 적합한 강력한 항산화 효과의 하이드레이팅 세럼으로, 피부가 숨을 쉴 수 있는 편안한 보호막을 형성해 외부 유해 요소로부터 효과적으로 지켜줍니다.
            </p>
            <span>₩107,000</span>
            <div class="prod_btns">
              <button class="prod">카트 추가</button>
              <button class="buy">바로 구매</button>
            </div>
          </div>
        </div>
        <div class="product">
        <div class= "product_img">
        <img src="../img/dry/dry3.png" alt="" />
        </div>
          <div class="product_txt">
            <h3>퓨리파잉 페이셜 엑스폴리언트 <br> 페이스트</h3>
            <p>
            각질을 관리해주면서 피부를 매끄럽게 클렌징 해주는 크림 베이스 클렌저.
            </p>
            <span>₩67,000</span>
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
              파슬리 씨드 안티 옥시던트
              하이드레이터
            </h3>
            <p>
              가볍고 빠르게 흡수되어
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
              눈 주위의 민감한 피부를 달래고 진정시켜주는
              마트리카리아가
              <br />
              포함된 부드러운 오일 제형의 
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
        skinBtn.addEventListener("click", (e) => {
          recPage.innerHTML = `
          <div class="product">
          <img src="../img/oily/oily1.png" alt="" />
          <div class="product_txt">
            <h3>컨트롤</h3>
            <p>
            문제성 피부를 효과적으로 진정시켜주는 순한 스팟 트리트먼트
            </p>
            <span>₩29,000</span>
            <div class="prod_btns">
              <button class="prod">카트 추가</button>
              <button class="buy">바로 구매</button>
            </div>
          </div>
        </div>
        <div class="product">
          <img src="../img/oily/oily2.png" alt="" />
          <div class="product_txt">
            <h3>
            어메이징 페이스 클렌저
            </h3>
            <p>
            부드러운 거품이 피부를 효과적으로 세정하고 피부의 균형을 잡아주는 데일리 클렌저
            </p>
            <span>₩37,000</span>
            <div class="prod_btns">
              <button class="prod">카트 추가</button>
              <button class="buy">바로 구매</button>
            </div>
          </div>
        </div>
        <div class="product">
          <img src="../img/oily/oily3.png" alt="" />
          <div class="product_txt">
            <h3>프로텍티브 립 밤 SPF30</h3>
            <p>
            보태니컬 오일로 부드러움, 보습, 영양을 공급하면서 UVA와 UVB를 차단하여 입술을 태양으로부터 보호해주는 립 밤. 실리콘, 파라핀, 비즈왁스 또는 기타 동물 유래 성분이 들어가지 않은 제품입니다. *(자외선 차단 기능성, SPF30, PA+)
            </p>
            <span>₩23,000</span>
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

        skinBtn.addEventListener("click", (e) => {
          recPage.innerHTML = `
          <div class="product">
          <img src="../img/normal/normal1.png" alt="" />
          <div class="product_txt">
            <h3>세이지 앤 징크 페이셜 하이드레이팅 로션 SPF15</h3>
            <p>
            물리적 장벽을 형성해 UVA와 UVB를 차단하는 징크 옥사이드를 함유한 SPF15 데일리 하이드레이터. 광범위한 스펙트럼의 자외선을 차단하는 미네랄 베이스의 제품으로 피부 톤에 따라 백탁현상이 있을 수 있습니다.
            </p>
            <span>₩60,000</span>
            <div class="prod_btns">
              <button class="prod">카트 추가</button>
              <button class="buy">바로 구매</button>
            </div>
          </div>
        </div>
        <div class="product">
          <img src="../img/normal/normal2.png" alt="" />
          <div class="product_txt">
            <h3>
            파슬리 씨드 안티 옥시던트 인텐스 세럼
            </h3>
            <p>
            민감성 피부를 포함한 대부분의 피부 타입에 적합한 강력한 항산화 효과의 하이드레이팅 세럼으로, 피부가 숨을 쉴 수 있는 편안한 보호막을 형성해 외부 유해 요소로부터 효과적으로 지켜줍니다.
            </p>
            <span>₩107,000</span>
            <div class="prod_btns">
              <button class="prod">카트 추가</button>
              <button class="buy">바로 구매</button>
            </div>
          </div>
        </div>
        <div class="product">
          <img src="../img/normal/normal3.png" alt="" />
          <div class="product_txt">
            <h3>다마스칸 로즈 페이셜 트리트먼트</h3>
            <p>
            열 가지 우수한 식물 추출물이 함유되어 있는 건성 또는 문제성 피부에 적합한 페이셜 오일.
            </p>
            <span>₩95,000</span>
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
}
loadQuestion();
