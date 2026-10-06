/* =====================================================
   STAGE

   0 = chưa mở
   1 = đã mở phong bì
   2 = hoa
   3 = ảnh
   4 = câu hỏi
   5 = video
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
   CAPTIONS
=====================================================

   Nếu không muốn chữ xuất hiện
   thì để chuỗi rỗng.

===================================================== */

const captions = [
  "",
  "",
  "",
  ""
];


/* =====================================================
   ELEMENTS
===================================================== */

const loadingScreen =
  document.getElementById(
    "loadingScreen"
  );

const envelope =
  document.getElementById(
    "envelope"
  );

const viewer =
  document.getElementById(
    "viewer"
  );

const imageCaption =
  document.getElementById(
    "imageCaption"
  );

const videoViewer =
  document.getElementById(
    "videoViewer"
  );

const videoFade =
  document.getElementById(
    "videoFade"
  );

const hint =
  document.querySelector(
    ".hint"
  );

const flowerLayer =
  document.getElementById(
    "flowerLayer"
  );

const bgMusic =
  document.getElementById(
    "bgMusic"
  );

const questionBox =
  document.getElementById(
    "questionBox"
  );

const finalBox =
  document.getElementById(
    "finalBox"
  );

const yesBtn =
  document.getElementById(
    "yesBtn"
  );


/* =====================================================
   PRELOAD
===================================================== */

function preloadEverything() {

  const imagePromises =
    images.map(function (src) {

      return new Promise(
        function (resolve) {

          const img =
            new Image();

          img.onload =
            resolve;

          img.onerror =
            resolve;

          img.src = src;

        }
      );

    });


  /*
    Preload video metadata.
    Không ép tải toàn bộ video ngay,
    tránh tốn data trên điện thoại.
  */

  videoViewer.load();


  Promise.all(imagePromises)
    .then(function () {

      setTimeout(
        hideLoading,
        500
      );

    });

}


function hideLoading() {

  loadingScreen.classList.add(
    "hide"
  );

}


/* =====================================================
   START
===================================================== */

window.addEventListener(
  "load",
  function () {

    preloadEverything();

  }
);


/* =====================================================
   PHONG BÌ
===================================================== */

envelope.onclick =
  function (e) {

    e.stopPropagation();


    /* ==========================================
       CLICK 1
    ========================================== */

    if (stage === 0) {

      envelope.classList.add(
        "open"
      );

      stage = 1;

      return;
    }


    /* ==========================================
       CLICK 2
    ========================================== */

    if (stage === 1) {

      stage = 2;

      envelope.style.pointerEvents =
        "none";


      /* Ẩn hint */

      hint.style.opacity =
        "0";


      setTimeout(
        function () {

          hint.style.display =
            "none";

        },
        500
      );


      /* Nhạc */

      bgMusic.volume = 0.65;

      bgMusic
        .play()
        .catch(
          function (error) {

            console.log(
              "Music autoplay:",
              error
            );

          }
        );


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


  for (
    let i = 0;
    i < 75;
    i++
  ) {

    const flower =
      document.createElement(
        "div"
      );

    flower.className =
      "flower";


    flower.innerText =
      flowers[
        Math.floor(
          Math.random() *
          flowers.length
        )
      ];


    const x =
      (
        Math.random() - 0.5
      )
      *
      window.innerWidth
      *
      1.8;


    const y =
      (
        Math.random() - 0.5
      )
      *
      window.innerHeight
      *
      1.8;


    const size =
      20 +
      Math.random() * 38;


    const delay =
      Math.random() * .45;


    const rotate =
      (
        Math.random() - 0.5
      )
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


  /* Hoa mờ */

  setTimeout(
    function () {

      flowerLayer.classList.add(
        "fade-out"
      );

    },
    2100
  );


  /* Sang ảnh */

  setTimeout(
    function () {

      flowerLayer.style.display =
        "none";

      flowerLayer.innerHTML =
        "";

      showImage(0);

      stage = 3;

    },
    3100
  );

}


/* =====================================================
   HIỆN ẢNH
===================================================== */

function showImage(
  newIndex
) {

  index = newIndex;

  canNext = false;


  /*
    Caption
  */

  imageCaption.classList.remove(
    "show"
  );


  /*
    Xóa effect cũ
  */

  viewer.classList.remove(
    "effect-1",
    "effect-2",
    "effect-3",
    "effect-4",
    "show"
  );


  viewer.style.visibility =
    "hidden";


  viewer.style.display =
    "block";


  /*
    onload trước src
  */

  viewer.onload =
    function () {

      viewer.style.visibility =
        "visible";


      /*
        Chọn hiệu ứng theo ảnh
      */

      const effectClass =
        "effect-" +
        (index + 1);

      viewer.classList.add(
        effectClass
      );


      /*
        Cho trình duyệt render
        rồi mới fade in.
      */

      requestAnimationFrame(
        function () {

          requestAnimationFrame(
            function () {

              viewer.classList.add(
                "show"
              );

            }
          );

        }
      );


      /*
        Caption
      */

      if (
        captions[index] &&
        captions[index].trim()
      ) {

        imageCaption.innerText =
          captions[index];

        setTimeout(
          function () {

            imageCaption.classList.add(
              "show"
            );

          },
          350
        );

      }


      canNext = true;

    };


  /*
    Đổi source
  */

  viewer.src =
    images[index];

}


/* =====================================================
   CLICK ẢNH
===================================================== */

viewer.onclick =
  function (e) {

    e.stopPropagation();


    if (
      stage !== 3 ||
      !canNext
    ) {

      return;
    }


    canNext = false;


    /*
      Caption biến mất
    */

    imageCaption.classList.remove(
      "show"
    );


    /*
      Fade ảnh hiện tại
    */

    viewer.classList.remove(
      "show"
    );


    viewer.style.visibility =
      "hidden";


    setTimeout(
      function () {

        index++;


        /*
          CÒN ẢNH
        */

        if (
          index < images.length
        ) {

          showImage(index);

          return;
        }


        /*
          HẾT ẢNH
          → VIDEO
        */

        viewer.style.display =
          "none";


        playVideo();

      },
      420
    );

  };


/* =====================================================
   VIDEO
===================================================== */

function playVideo() {

  stage = 5;


  /*
    Dừng nhạc nền
  */

  bgMusic.pause();


  /*
    Reset video
  */

  videoViewer.pause();

  videoViewer.currentTime =
    0;


  /*
    Ẩn fade trước
  */

  videoFade.classList.remove(
    "active"
  );


  /*
    Hiện video
  */

  videoViewer.style.display =
    "block";

  videoViewer.style.visibility =
    "visible";


  requestAnimationFrame(
    function () {

      videoViewer.classList.add(
        "video-show"
      );

    }
  );


  /*
    Play
  */

  const playPromise =
    videoViewer.play();


  if (
    playPromise !== undefined
  ) {

    playPromise
      .then(
        function () {

          console.log(
            "Video đang chạy."
          );

        }
      )
      .catch(
        function (error) {

          console.log(
            "Video autoplay:",
            error
          );

        }
      );

  }


  /*
    Fullscreen thật
  */

  setTimeout(
    function () {

      try {

        if (
          document.fullscreenElement ===
          null &&
          videoViewer.requestFullscreen
        ) {

          videoViewer
            .requestFullscreen()
            .catch(
              function () {

                console.log(
                  "Fullscreen không khả dụng."
                );

              }
            );

        }

      }
      catch (error) {

        console.log(
          "Fullscreen error:",
          error
        );

      }

    },
    150
  );

}


/* =====================================================
   VIDEO KẾT THÚC
===================================================== */

videoViewer.onended =
  function () {

    /*
      Fade trắng/hồng
    */

    videoFade.classList.add(
      "active"
    );


    /*
      Thoát fullscreen
    */

    if (
      document.fullscreenElement
    ) {

      document
        .exitFullscreen()
        .catch(
          function () {}
        );

    }


    /*
      Đợi fade xong
    */

    setTimeout(
      function () {

        videoViewer.classList.remove(
          "video-show"
        );


        videoViewer.pause();

        videoViewer.currentTime =
          0;


        videoViewer.style.display =
          "none";


        videoViewer.style.visibility =
          "hidden";


        /*
          Hiện question
        */

        questionBox.style.display =
          "flex";


        /*
          Force animation chạy lại
        */

        questionBox.classList.remove(
          "show"
        );


        requestAnimationFrame(
          function () {

            questionBox.classList.add(
              "show"
            );

          }
        );


        stage = 4;


        /*
          Bỏ màn fade
        */

        setTimeout(
          function () {

            videoFade.classList.remove(
              "active"
            );

          },
          500
        );

      },
      850
    );

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
