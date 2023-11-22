// ======================== GiftTop ====================================
const giftTop = document.querySelector(".gift_top");

window.addEventListener("load", () => {
  giftTop.innerHTML = `<h4>전 구매 무료상품 및 선물포장과 단독 기프트 메시지 카드 혜택을 즐겨보세요.</h4>`;
});

//=========================== left gnb ==================================
const headerUrl = "../json/header.json";
fetch(headerUrl)
  .then((response) => response.json())
  .then((json) => {
    let leftOutput = "";
    json.leftNav.forEach((list) => {
      leftOutput += `
      <li class=${list.class}><a href="#">${list.category}</a></li>`;
    });

    const ulGnb = document.createElement("ul");
    const divGnb = document.querySelector(".gnb");
    divGnb.appendChild(ulGnb);
    ulGnb.innerHTML = leftOutput;

    // ================gift top box =================
    const giftTopBox = document.querySelector(".gift_top_box");
    const giftTopList = document.querySelector(".gift_top_list");

    let giftTopBoxOutput = "";

    json.giftTopList.forEach((list) => {
      giftTopBoxOutput += `
      <section>
      <span>${list.title}</span>
      <p>${list.txt}</p>
      </section>
      `;
    });
    giftTopList.innerHTML = giftTopBoxOutput;

    const xBtn = document.querySelector(".fas");
    const giftTopH4 = document.querySelector(".gift_top h4");
    const container = document.querySelector(".container");
    const header = document.querySelector("header");

    giftTopH4.addEventListener("click", () => {
      giftTopBox.classList.add("show");
      container.classList.add("bgOpacity");
      container.classList.add("removeContainer");
      header.classList.add("bgOpacity");
    });
    xBtn.addEventListener("click", () => {
      giftTopBox.classList.remove("show");
      container.classList.remove("bgOpacity");
      container.classList.remove("removeContainer");
      header.classList.remove("bgOpacity");
    });

    // ====================== right Gnb =================================
    let rightOutput = "";

    json.rightNav.forEach((list) => {
      rightOutput += `<a href="#" class="${list.class}">${list.category}</a>`;
    });

    const gnbRight = document.querySelector(".gnb_right");
    gnbRight.innerHTML = rightOutput;
    const cart = document.querySelector(".cart");

    const cartShow = document.querySelector("#cart_alarm");

    cart.addEventListener("click", () => {
      const cartShow = document.querySelector("#cart_alarm");
      cartShow.classList.add("showCart");
      setTimeout(() => {
        cartShow.classList.remove("showCart");
      }, 2100);
    });

    // ==================== nav_detail_list =========================
    const gnbBtns = document.querySelectorAll(".gnb ul li");
    const gnbList = document.querySelector("#nav_detail_list");
    const iframe = document.querySelector("iframe");

    const navHtml = [
      "./nav-html/1-index.html",
      "./nav-html/2-index.html",
      "./nav-html/3-index.html",
      "./nav-html/4-index.html",
      "./nav-html/5-index.html",
      "./nav-html/6-index.html",
    ];

    const gnbDel = document.querySelector(".gnb ul");
    console.log(gnbDel);
    const delBtn = document.createElement("button");

    gnbBtns.forEach((btn, i) => {
      btn.addEventListener("click", (e) => {
        iframe.classList.add("contentiframe");

        const currentHtml = navHtml[i];
        iframe.src = currentHtml;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        delBtn.style.display = "block";
        gnbList.classList.add("pc_gnb_show");

        gnbDel.appendChild(delBtn);
        delBtn.innerText = "닫기";

        delBtn.addEventListener("click", () => {
          gnbList.classList.remove("pc_gnb_show");
          delBtn.style.display = "none";
        });
      });
    });

    // ==================== mobile Gnb =================================
    const modalGnb = document.querySelector("#mobile_gnb_list");
    const modalTopUl = document.createElement("ul");
    modalGnb.appendChild(modalTopUl);
    modalTopUl.classList.add("modal_top_gnb_list");
    modalTopUl.innerHTML = leftOutput;

    const mobileGnbListBottom = document.querySelector(".gnb_list_bottom");
    const modalBottomUl = document.createElement("ul");
    modalBottomUl.classList.add("modal_bottom_mini_list");
    mobileGnbListBottom.appendChild(modalBottomUl);

    let mobileGnbList = "";
    json.mobileGnb.forEach((mg) => {
      mobileGnbList += `
      <li><a href="#">${mg.catagory}</a></li>`;
    });

    modalBottomUl.innerHTML = mobileGnbList;

    // ========================== toggle ================================
    const newDiv = document.createElement("div");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");

    newDiv.classList.add("toggle");
    gnbRight.appendChild(newDiv);
    newDiv.appendChild(span1);
    newDiv.appendChild(span2);
    json.rightNav.push(newDiv);

    newDiv.addEventListener("click", () => {
      newDiv.classList.toggle("active");
      modalGnb.classList.toggle("showModalGnb");
      document.querySelector(".container").classList.toggle("removeContainer");
      document.querySelector(".gift_top").classList.toggle("removeGiftTop");
    });
  })
  .catch((err) => console.log(err));

// back to top + nav scroll
const btn = document.querySelector(".back_to_top");
const html = document.querySelector("html");
let offset;
let scrollPos;
let documentHeight;

// 문서 높이 계산
documentHeight = Math.max(html.offsetHeight, html.scrollHeight);
if (documentHeight != 0) {
  offset = documentHeight / 16;
}
scrollPos = html.scrollTop;

let previousScrollPos = 0;

// 스크롤 이벤트
window.addEventListener("scroll", () => {
  scrollPos = html.scrollTop;

  if (scrollPos > offset) {
    btn.classList.add("btt_show");
  } else {
    btn.classList.remove("btt_show");
  }

  const header = document.querySelector("header");
  const giftTop = document.querySelector(".gift_top");

  if (scrollPos <= previousScrollPos) {
    header.classList.add("scrollEffect");
    console.log("Scrolling Up");
  }
  if (scrollPos > previousScrollPos) {
    header.classList.remove("scrollEffect");
    console.log("Scrolling Down");
  }
  if (scrollPos < 45) {
    header.classList.remove("scrollEffect");
  }
  // 현재 스크롤 위치를 저장
  previousScrollPos = scrollPos;
});
//======================= 오른 쪽 작은 문의사항 창 =============================
const queryBtn = document.querySelector("#query");
const miniBox = document.querySelector(".mini_ask");
const container = document.querySelector(".container");

queryBtn.addEventListener("click", () => {
  miniBox.classList.toggle("show");
  container.classList.toggle("containerOpacity");
});

// ======================== footer =======================================
const contents = document.querySelector(".footer_contents");
const footerUrl = "../json/footer.json";

fetch(footerUrl)
  .then((response) => response.json())
  .then((json) => {
    let contentOutput = "";
    json.forEach((content) => {
      let subtitleOutput = "";

      contentOutput += `
        <div class="footer_content">
          <h3>${content.title}</h3>
          <p>`;

      const subtitles = content.subtitle;
      subtitles.forEach((subtitle) => {
        subtitleOutput += `<span>${subtitle}</span>`;
      });

      contentOutput += `${subtitleOutput}</p></div>`;
    });

    contents.innerHTML = contentOutput;

    const spanEl = document.createElement("span");
    const fInner = document.querySelector(".footer_inner");
    spanEl.innerText = "©Aesop";
    fInner.appendChild(spanEl);
    spanEl.style.color = "#b8b8b8";
    spanEl.style.fontSize = "20px";
    spanEl.style.display = "block";
    spanEl.style.margin = "10px 0";
  });
