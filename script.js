/* =====================================================
   STATE
===================================================== */

let stage = 0;
let index = 0;
let canNext = false;


/* =====================================================
   FILES
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
   ENVELOPE
===================================================== */

envelope.onclick = (e) => {

  e.stopPropagation();


  /* -----------------------------------------
     CLICK 1
     Mở phong bì
  ----------------------------------------- */

  if (stage === 0) {

    envelope.classList.add("open");

    stage = 1;

    return;
  }


  /* -----------------------------------------
     CLICK 2
     Hoa + nhạc
  ----------------------------------------- */

  if (stage === 1) {

    stage = 2;

    envelope.style.pointerEvents = "none";


    /* Ẩn chữ */

    hint.style.opacity = "0";


    setTimeout(() => {

      hint.style.display = "none";

    }, 500);


    /* Nhạc bắt đầu */

    bgMusic.volume = 0.65;

    bgMusic.play().catch(() => {

      console.log(
        "Trình duyệt chặn autoplay."
      );

    });


    /* Hoa */

    startFlowerTransition();

  }

};


/* =====================================================
   FLOWER TRANSITION
===================================================== */

function startFlowerTransition() {

  flowerLayer.innerHTML = "";

  flowerLayer.style.display = "block";

  flowerLayer.style.opacity = "1";

  flowerLayer.classList.remove(
    "fade-out"
  );


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


  /* Tạo hoa */

  for (let i = 0; i < 75; i++) {

    const flower =
      document.createElement("div");


    flower.className =
      "flower";


    flower.innerText =
      flowers[
        Math.floor(
          Math.random()
          * flowers.length
        )
      ];


    const x =
      (Math.random() - .5)
      * window.innerWidth
      * 1.8;


    const y =
      (Math.random() - .5)
      * window.innerHeight
      * 1.8;


    const size =
      20 +
      Math.random() * 38;


    const delay =
      Math.random() * .45;


    const rotate =
      (Math.random() - .5)
      * 1000;


    flower.style.setProperty(
      "--x",
      `${x}px`
    );


    flower.style.setProperty(
      "--y",
      `${y}px`
    );


    flower.style.setProperty(
      "--size",
      `${size}px`
    );


    flower.style.setProperty(
      "--delay",
      `${delay}s`
    );


    flower.style.setProperty(
      "--rotate",
      `${rotate}deg`
    );


    flowerLayer.appendChild(
      flower
    );

  }


  /* Bắt đầu fade */

  setTimeout(() => {

    flowerLayer.classList.add(
      "fade-out"
    );

  }, 2100);


  /* Sau khi hoa biến mất */

  setTimeout(() => {

    flowerLayer.style.display =
      "none";

    flowerLayer.innerHTML = "";


    showFirstImage();

    stage = 3;

  }, 3100);

}


/* =====================================================
   SHOW IMAGE 1
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


  setTimeout(() => {

    viewer.classList.add(
      "show"
    );

    canNext = true;

  }, 120);

}


/* =====================================================
   IMAGE CLICK
===================================================== */

viewer.onclick = (e) => {

  e.stopPropagation();


  if (
    stage !== 3 ||
    !canNext
  ) {

    return;

  }


  canNext = false;


  /* Fade ảnh hiện tại */

  viewer.classList.remove(
    "show"
  );


  setTimeout(() => {

    index++;


    /* -----------------------------------------
       Còn ảnh
    ----------------------------------------- */

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


    /* -----------------------------------------
       HẾT 4 ẢNH
       → VIDEO
    ----------------------------------------- */

    viewer.style.display =
      "none";


    playVideo();

  }, 400);

};


/* =====================================================
   PLAY VIDEO
===================================================== */

function playVideo() {

  stage = 5;

  // Dừng nhạc nền
  bgMusic.pause();

  // Hiện video trước
  videoViewer.style.display = "block";

  videoViewer.classList.remove("video-show");

  // Đưa video về đầu
  videoViewer.currentTime = 0;

  // Load lại video
  videoViewer.load();

  // Khi video đã sẵn sàng
  videoViewer.oncanplay = () => {

    videoViewer.classList.add("video-show");

    videoViewer.play()
      .then(() => {

        console.log("Video đang chạy");

      })
      .catch((error) => {

        console.log(
          "Không thể tự phát video:",
          error
        );

        // Thử phát không tiếng
        videoViewer.muted = true;

        videoViewer.play();

      });

  };
}


/* =========================
   VIDEO KẾT THÚC
========================= */

videoViewer.onended = () => {

  videoViewer.classList.remove(
    "video-show"
  );

  setTimeout(() => {

    videoViewer.pause();

    videoViewer.style.display = "none";

    questionBox.style.display = "flex";

    stage = 4;

  }, 600);

};


    /* Hiện câu hỏi */

    questionBox.style.display =
      "flex";


    stage = 4;

  }, 600);

};


/* =====================================================
   YES
===================================================== */

yesBtn.onclick = (e) => {

  e.stopPropagation();


  questionBox.style.display =
    "none";


  finalBox.style.display =
    "flex";


  /*
    Nếu muốn nhạc quay lại
    ở ending thì bỏ comment
    đoạn dưới.
  */

  // bgMusic.currentTime = 0;
  // bgMusic.play();

};
