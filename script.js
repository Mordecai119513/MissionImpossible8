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

Swal.fire({
  html: `
    <div class="coupon-container">
      <img src="image/coupon.png" alt="優惠圖片" class="coupon-image" />
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
          videoId: "4AjNSD42CCw",
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
