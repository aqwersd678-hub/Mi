/* =====================================================
   STAGE

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
     CLICK 1
     Mở phong bì
  ========================================== */

  if (stage === 0) {

    envelope.classList.add("open");

    stage = 1;

    return;
  }


  /* ==========================================
     CLICK 2
     Hoa + nhạc
  ========================================== */

  if (stage === 1) {

    stage = 2;

    envelope.style.pointerEvents =
      "none";


    /* Ẩn hint */

    hint.style.opacity = "0";

    setTimeout(function () {

      hint.style.display = "none";

    }, 500);


    /* Nhạc */

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

  flowerLayer.style.display =
    "block";

  flowerLayer.style.opacity =
    "1";

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


  /* Hoa mờ đi */

  setTimeout(function () {

    flowerLayer.classList.add(
      "fade-out"
    );

  }, 2100);


  /* Sang ảnh 1 */

  setTimeout(function () {

    flowerLayer.style.display =
      "none";

    flowerLayer.innerHTML = "";

    showFirstImage();

    stage = 3;

  }, 3100);

}


/* =====================================================
   HIỆN ẢNH ĐẦU TIÊN
===================================================== */

function showFirstImage() {

  index = 0;

  viewer.style.display =
    "block";

  viewer.style.visibility =
    "hidden";

  viewer.classList.remove(
    "show"
  );


  viewer.onload = function () {

    viewer.style.visibility =
      "visible";


    requestAnimationFrame(function () {

      viewer.classList.add(
        "show"
      );

    });


    canNext = true;

  };


  viewer.src =
    images[index];

}


/* =====================================================
   CLICK CHUYỂN ẢNH
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


  /*
    Ẩn ảnh hiện tại trước.
    visibility hidden giúp trình duyệt
    không kịp render lại ảnh cũ.
  */

  viewer.classList.remove(
    "show"
  );

  viewer.style.visibility =
    "hidden";


  setTimeout(function () {

    index++;


    /* ==========================================
       VẪN CÒN ẢNH
    ========================================== */

    if (
      index < images.length
    ) {

      /*
        Gán onload TRƯỚC khi đổi src
        để chờ đúng ảnh mới.
      */

      viewer.onload = function () {

        viewer.style.visibility =
          "visible";


        requestAnimationFrame(function () {

          viewer.classList.add(
            "show"
          );

        });


        canNext = true;

      };


      /*
        Đổi ảnh
      */

      viewer.src =
        images[index];


      return;
    }


    /* ==========================================
       HẾT 4 ẢNH
       → VIDEO
    ========================================== */

    viewer.style.display =
      "none";

    viewer.style.visibility =
      "hidden";


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


  /*
    Reset video
  */

  videoViewer.pause();

  videoViewer.currentTime = 0;


  /*
    Hiện video
  */

  videoViewer.style.display =
    "block";

  videoViewer.style.visibility =
    "visible";

  videoViewer.classList.add(
    "video-show"
  );


  /*
    Chạy video
  */

  const playPromise =
    videoViewer.play();


  if (playPromise !== undefined) {

    playPromise
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

      });

  }


  /*
    Thử fullscreen thật.

    Android Chrome thường hỗ trợ.

    iPhone Safari có thể không cho
    fullscreen bằng cách này, nhưng
    CSS phía trên vẫn làm video
    phủ toàn bộ màn hình.
  */

  setTimeout(function () {

    try {

      if (
        document.fullscreenElement === null &&
        videoViewer.requestFullscreen
      ) {

        videoViewer
          .requestFullscreen()
          .catch(function () {

            console.log(
              "Không vào fullscreen thật."
            );

          });

      }

    } catch (error) {

      console.log(
        "Fullscreen không khả dụng."
      );

    }

  }, 100);

}


/* =====================================================
   VIDEO KẾT THÚC
===================================================== */

videoViewer.onended =
  function () {

    /*
      Thoát fullscreen nếu đang fullscreen
    */

    if (
      document.fullscreenElement
    ) {

      document
        .exitFullscreen()
        .catch(function () {});

    }


    videoViewer.classList.remove(
      "video-show"
    );


    setTimeout(function () {

      videoViewer.pause();

      videoViewer.currentTime = 0;

      videoViewer.style.display =
        "none";

      videoViewer.style.visibility =
        "hidden";


      /*
        Sang câu hỏi ngay
      */

      questionBox.style.display =
        "flex";

      stage = 4;

    }, 500);

  };


/* =====================================================
   YES
===================================================== */

yesBtn.onclick =
  function (e) {

    e.stopPropagation();


    questionBox.style.display =
      "none";


    finalBox.style.display =
      "flex";

  };
