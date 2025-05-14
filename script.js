const swiper = new Swiper(".poster-swiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// YouTube Shorts 連結
const posterLinks = [
  "https://youtube.com/shorts/Rz3XQu9qvZc", // slide 1
  "https://youtube.com/shorts/v1aRGWC3AGA", // slide 2
  "https://youtube.com/shorts/G1hj_-s8mkk", // slide 3
  "https://youtube.com/shorts/8BhRg1s9jGU", // slide 4
  "https://youtube.com/shorts/BisPmcU3i-I", // slide 5
  "https://youtube.com/shorts/y526o152fco", // slide 6
  "https://youtube.com/shorts/qi62-jA4tvQ", // slide 7
  "https://youtube.com/shorts/Y5gU8i_cfuk", // slide 8
];

// 動態綁定按鈕連結
const classicBtn = document.querySelector(".classic-btn");
function updateClassicBtnLink() {
  let realIndex = swiper.realIndex;
  classicBtn.href = posterLinks[realIndex];
}
swiper.on("slideChange", updateClassicBtnLink);
updateClassicBtnLink();

function submitPhone() {
  const phone = document.getElementById("phoneInput").value.trim();
  const SPara1 = "MRK00001";

  if (!/^09\d{8}$/.test(phone)) {
    Swal.fire({
      icon: "error",
      title: "手機號碼格式錯誤",
      text: "請輸入正確的 09 開頭共 10 碼手機號碼",
    });
    return;
  }

  // 後端API
  fetch("http://192.168.10.60/wsVIESERVs-Demo/wsVIESERVs/VieShowApi", {
    method: "POST",
    mode: "no-cors",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UId: "vsITUser",
      SPara0: "ITUser123",
      Command: "setActPhone",
      SPara1: SPara1,
      SPara2: phone,
    }),
  });

  // 顯示隱私條款彈窗
  Swal.fire({
    title: "請閱讀隱私條款",
    html: `
      <div id="terms-box" style="height:200px; overflow-y:auto; text-align:left; padding:10px; border:1px solid #ccc; background:white; color:#000;">
        <p>個人資料蒐集告知事項同意書:</p>
        <p>
        1. 威秀影城股份有限公司(下稱本公司)基於消費者、客戶管理與服務/行銷等契約、類似
        契約或其他法律關係/資料建檔、調查/存款與匯款/非公務機關依法定義務所進行個人資
        料之蒐集處理及利用/商業與技術資訊/帳務管理及債權交易業務/採購與供應管理/會計
        與相關服務/智慧財產權、光碟管理及其他相關行政/資(通)訊與資料庫管理/僱用與服
        務管理/網路購物及其他電子商務服務/輔助性與後勤支援管理/憑證業務管理/其他金融
        管理業務/其他經營合於營業登記項目或組織章程所定之業務等營運、經營上之相關目的,
        而為蒐集、處理、利用及國際傳輸個人資料。
        2. 前述個人資料之類別為當事人於申請書表單所填載及威秀影城依本辦法辦理各項業務
        及服務過程所取得之聯絡方式及其他得直接或間接辨識申請人個人之資料。
        3. 個人資料之利用期間、地區、對象及方式:(1) 個人資料之利用期間:個人資料蒐集之
        特定目的存續期間、依相關法令規定或個別契約就資料之保存所定之保存年限、本公司
        因執行業務所必須之保存期間。(以期限最長者為準);(2)個人資料利用地區為本公司
        執行業務及伺服器主機所在地即台灣地區;(3)利用之對象為本公司及本公司合作特約商
        暨委外之服務廠商及其他與本公司合作行銷推廣活動之第三人;(4)個人資料之利用方式
        包括但不限於會員管理、檢索查詢、業務推廣、活動聯繫、贈獎公告、宣傳行銷、發送
        簡訊、發送傳單、發送訊息、國際傳輸、文件物品寄送等蒐集目的範圍內必要之利用。
        4. 申請人就其提供之個人資料,有查詢或請求閱覽、請求製給複製本、請求補充或更正、
        請求停止蒐集、處理或利用、請求刪除之權利。申請人並得透過寄送電子郵件至
        【ishow@vscinemas.com.tw】(為避免電子郵件系統漏信或其他原因無法收悉,是否
        送達以本公司回覆為準)行使上開權利,本公司將於收受申請人之請求並確認申請人之
        身分後,依法儘速處理,但申請人拒絕配合本公司確認身分所需之必要協助,恕無法及
        時辦理。另申請人請求查詢、閱覽或製給複製本,得酌收必要之成本費用。
        5. 申請人得自由提供個人資料,但申請人不願意提供個人資料或提供資料有誤時,申請
        人可能無法享有蒐集目的之相關服務。
        *本人於充分、詳細審閱上述告知事項後,同意蒐集、處理、利用本人之個人資料。
        </p>
      </div>
      <button id="agree-btn" disabled style="margin-top:12px; padding:8px 16px; cursor:not-allowed; background:#888; color:white; border:none; border-radius:4px;">我同意並繼續</button>
    `,
    showConfirmButton: false,
    showCloseButton: true,
    width: "90%",
    backdrop: "rgba(0,0,0,0.5)",
    didOpen: () => {
      const termsBox = document.getElementById("terms-box");
      const agreeBtn = document.getElementById("agree-btn");

      termsBox.addEventListener("scroll", function () {
        if (termsBox.scrollTop + termsBox.clientHeight >= termsBox.scrollHeight - 1) {
          agreeBtn.disabled = false;
          agreeBtn.style.background = "#B30000";
          agreeBtn.style.cursor = "pointer";
        }
      });

      agreeBtn.addEventListener("click", function () {
        Swal.fire({
          html: `
            <div class="coupon-container">
              <img src="image/coupon.jpg" alt="優惠圖片" class="coupon-image" />
            </div>
          `,
          showConfirmButton: false,
          showCloseButton: true,
          width: "auto",
          padding: 0,
          background: "transparent",
          customClass: {
            popup: "coupon-popup",
          },
          backdrop: "rgba(0,0,0,0.4)",
          didOpen: () => {
            document.body.classList.add("swal2-shown");
          },
          willClose: () => {
            document.body.classList.remove("swal2-shown");
          },
        });
      });
    }
  });
}

window.addEventListener("load", function () {
  if (typeof YT === "undefined" || typeof YT.Player === "undefined") {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
});

let player;
let ytReady = false;
function onYouTubeIframeAPIReady() {
  ytReady = true;
  showVideoPopup();
}

function showVideoPopup() {
  if (!ytReady) return;

  Swal.fire({
    html: `
      <button type="button" class="swal2-close" aria-label="Close" style="z-index:10000;"></button>
      <div id="player-container" style="position:relative;width:100vw;height:70vh;">
        <div id="yt-player" style="position:absolute;top:0;left:0;width:100%;height:100%;"></div>
      </div>
    `,
    showConfirmButton: false,
    showCloseButton: true,
    width: "100%",
    heightAuto: false,
    padding: 0,
    background: "transparent",
    customClass: {
      popup: "video-popup",
    },
    backdrop: "rgba(0,0,0,0.4)",
    didOpen: () => {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";

      setTimeout(() => {
        player = new YT.Player("yt-player", {
          videoId: "4AjNSD42CCw", // 換彈出視窗影片在這換
          playerVars: {
            autoplay: 1,
            mute: 1,
          },
          events: {
            onStateChange: function (event) {
              if (event.data === YT.PlayerState.ENDED) {
                Swal.close();
              }
            },
          },
        });
      }, 100);
    },
    willClose: () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    },
  });
}
