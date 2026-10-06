/* =====================================================
   STAGE
=====================================================

   0 = chưa mở phong bì
   1 = đã mở phong bì
   2 = đang hoa
   3 = đang xem ảnh
   4 = câu hỏi
   5 = đang xem video
===================================================== */

let stage = 0;

let index = 0;

let canNext = false;


/* =====================================================
   IMAGES
===================================================== */

const images = [
  "1.png",
  "2.png",
  "3.png",
  "4.png"
];


/* =====================================================
   ELEMENTS
===================================================== */

const envelope =
  document.getElementById("envelope");

const viewer =
  document.getElementById("viewer");

const videoViewer =
  document.getElementById("videoViewer");

const hint =
  document.querySelector(".hint");

const flowerLayer =
  document.getElementById("flowerLayer");

const bgMusic =
  document.getElementById("bgMusic");

const questionBox =
  document.getElementById("questionBox");

const finalBox =
  document.getElementById("finalBox");

const yesBtn =
  document.getElementById("yesBtn");


/* =====================================================
   PHONG BÌ
===================================================== */

envelope.onclick = function (e) {

  e.stopPropagation();


  /* ==========================================
     LẦN CLICK 1
     Mở phong bì
  ========================================== */

  if (stage === 0) {

    envelope.classList.add("open");

    stage = 1;

    return;
  }


  /* ==========================================
     LẦN CLICK 2
     Hoa + nhạc
  ========================================== */

  if (stage === 1) {

    stage = 2;

    envelope.style.pointerEvents = "none";


    /* Ẩn hint */

    hint.style.opacity = "0";

    setTimeout(function () {

      hint.style.display = "none";

    }, 500);


    /* Nhạc bắt đầu */

    bgMusic.volume = 0.65;

    bgMusic.play().catch(function (error) {

      console.log(
        "Không thể tự phát nhạc:",
        error
      );

    });


    /* Hoa */

    startFlowerTransition();

  }

};


/* =====================================================
   HOA
===================================================== */

function startFlowerTransition() {

  flowerLayer.innerHTML = "";

  flowerLayer.style.display = "block";

  flowerLayer.style.opacity = "1";

  flowerLayer.classList.remove("fade-out");


  const flowers = [
    "🌸",
    "🌷",
    "🌺",
    "🌼",
    "🌻",
    "💐",
    "🌸",
    "🌷"
  ];


  /* Tạo 75 bông */

  for (let i = 0; i < 75; i++) {

    const flower =
      document.createElement("div");


    flower.className = "flower";


    flower.innerText =
      flowers[
        Math.floor(
          Math.random() *
          flowers.length
        )
      ];


    const x =
      (Math.random() - 0.5)
      *
      window.innerWidth
      *
      1.8;


    const y =
      (Math.random() - 0.5)
      *
      window.innerHeight
      *
      1.8;


    const size =
      20 +
      Math.random() * 38;


    const delay =
      Math.random() * 0.45;


    const rotate =
      (Math.random() - 0.5)
      * 1000;


    flower.style.setProperty(
      "--x",
      x + "px"
    );


    flower.style.setProperty(
      "--y",
      y + "px"
    );


    flower.style.setProperty(
      "--size",
      size + "px"
    );


    flower.style.setProperty(
      "--delay",
      delay + "s"
    );


    flower.style.setProperty(
      "--rotate",
      rotate + "deg"
    );


    flowerLayer.appendChild(
      flower
    );

  }


  /* Hoa bắt đầu biến mất */

  setTimeout(function () {

    flowerLayer.classList.add(
      "fade-out"
    );

  }, 2100);


  /* Chuyển sang ảnh */

  setTimeout(function () {

    flowerLayer.style.display =
      "none";

    flowerLayer.innerHTML = "";

    showFirstImage();

    stage = 3;

  }, 3100);

}


/* =====================================================
   ẢNH 1
===================================================== */

function showFirstImage() {

  index = 0;

  viewer.src =
    images[index];

  viewer.style.display =
    "block";

  viewer.classList.remove(
    "show"
  );


  setTimeout(function () {

    viewer.classList.add(
      "show"
    );

    canNext = true;

  }, 120);

}


/* =====================================================
   CLICK ẢNH
===================================================== */

viewer.onclick = function (e) {

  e.stopPropagation();


  if (
    stage !== 3 ||
    canNext === false
  ) {

    return;
  }


  canNext = false;


  /* Fade ảnh hiện tại */

  viewer.classList.remove(
    "show"
  );


  setTimeout(function () {

    index++;


    /* ==========================================
       VẪN CÒN ẢNH
    ========================================== */

    if (
      index < images.length
    ) {

      viewer.src =
        images[index];

      viewer.classList.add(
        "show"
      );

      canNext = true;

      return;
    }


    /* ==========================================
       ĐÃ HẾT 4 ẢNH

       → VIDEO
    ========================================== */

    viewer.style.display =
      "none";


    playVideo();

  }, 400);

};


/* =====================================================
   VIDEO
===================================================== */

function playVideo() {

  stage = 5;


  /* Dừng nhạc */

  bgMusic.pause();


  /* Đảm bảo video về đầu */

  videoViewer.currentTime = 0;


  /* Hiện video */

  videoViewer.style.display =
    "block";


  /* Hiện animation */

  setTimeout(function () {

    videoViewer.classList.add(
      "video-show"
    );

  }, 50);


  /*
    Chạy video.

    Vì hàm này được gọi trực tiếp
    sau cú click ảnh 4 nên trình
    duyệt thường cho phép autoplay.
  */

  videoViewer.play()
    .then(function () {

      console.log(
        "Video đang chạy."
      );

    })
    .catch(function (error) {

      console.log(
        "Không autoplay được:",
        error
      );

      /*
        Không tự mute video ở đây.
        Vì nếu video có tiếng,
        người dùng có thể bấm PLAY
        bằng controls.
      */

    });

}


/* =====================================================
   VIDEO KẾT THÚC
===================================================== */

videoViewer.onended = function () {

  videoViewer.classList.remove(
    "video-show"
  );


  setTimeout(function () {

    videoViewer.pause();

    videoViewer.style.display =
      "none";


    /* Hiện câu hỏi */

    questionBox.style.display =
      "flex";


    stage = 4;

  }, 600);

};


/* =====================================================
   YES
===================================================== */

yesBtn.onclick = function (e) {

  e.stopPropagation();


  questionBox.style.display =
    "none";


  finalBox.style.display =
    "flex";

};
