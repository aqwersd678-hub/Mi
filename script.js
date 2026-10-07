/* =====================================================
   STAGE

   0 = phong bì chưa mở
   1 = đã click lần 1
   2 = đang chạy hoa
   3 = đang xem ảnh
   4 = câu hỏi
   5 = video
===================================================== */

let stage = 0;

let index = 0;

let canNext = false;



/* =====================================================
   DANH SÁCH ẢNH
===================================================== */

const images = [

  "1.png",
  "2.png",
  "3.png",
  "4.png"

];



/* =====================================================
   CAPTION

   Để trống nếu không muốn chữ.
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
   PRELOAD ẢNH
===================================================== */

function preloadEverything() {


  const imagePromises =
    images.map(
      function (src) {

        return new Promise(
          function (resolve) {

            const img =
              new Image();


            img.onload =
              resolve;


            img.onerror =
              resolve;


            img.src =
              src;

          }
        );

      }
    );


  videoViewer.load();


  Promise.all(
    imagePromises
  )
    .then(
      function () {

        setTimeout(
          hideLoading,
          400
        );

      }
    );

}



/* =====================================================
   ẨN LOADING
===================================================== */

function hideLoading() {

  loadingScreen.classList.add(
    "hide"
  );

}



/* =====================================================
   LOAD XONG
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


      hint.style.opacity =
        "0";


      setTimeout(
        function () {

          hint.style.display =
            "none";

        },
        500
      );


      /*
        Nhạc
      */

      bgMusic.volume =
        0.65;


      bgMusic
        .play()
        .catch(
          function (error) {

            console.log(
              "Music:",
              error
            );

          }
        );


      /*
        Hoa
      */

      startFlowerTransition();

    }

  };



/* =====================================================
   HIỆU ỨNG HOA
===================================================== */

function startFlowerTransition() {


  flowerLayer.innerHTML =
    "";


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
    "💐"

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
        Math.random() - .5
      )
      *
      window.innerWidth
      *
      1.8;


    const y =
      (
        Math.random() - .5
      )
      *
      window.innerHeight
      *
      1.8;


    const size =
      20 +
      Math.random() *
      38;


    const delay =
      Math.random() *
      .45;


    const rotate =
      (
        Math.random() - .5
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



  /*
     Hoa mờ đi
  */

  setTimeout(
    function () {

      flowerLayer.classList.add(
        "fade-out"
      );

    },
    2100
  );



  /*
     Sau đó ảnh 1
  */

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


  index =
    newIndex;


  canNext =
    false;



  /*
     Caption
  */

  imageCaption.classList.remove(
    "show"
  );



  /*
     ẨN ẢNH CŨ

     Không dùng blur.
  */

  viewer.classList.remove(
    "show"
  );


  viewer.style.visibility =
    "hidden";


  viewer.style.display =
    "block";



  /*
     Đợi ảnh load hoàn toàn
  */

  viewer.onload =
    function () {


      /*
         Căn giữa tuyệt đối.

         Đặc biệt quan trọng
         cho điện thoại.
      */

      viewer.style.left =
        "50%";


      viewer.style.top =
        "50%";



      /*
         Xóa mọi effect cũ.
      */

      viewer.style.filter =
        "none";



      /*
         Hiện ảnh.
      */

      viewer.style.visibility =
        "visible";



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
          300
        );

      }



      /*
         Cho phép click tiếp.
      */

      setTimeout(
        function () {

          canNext = true;

        },
        450
      );

    };



  /*
     Đổi source ảnh
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


    canNext =
      false;


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
           Vẫn còn ảnh
        */

        if (
          index < images.length
        ) {

          showImage(index);

          return;

        }



        /*
           Hết ảnh
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


  stage =
    5;


  /*
     Tắt nhạc nền
  */

  bgMusic.pause();



  /*
     Reset video
  */

  videoViewer.pause();

  videoViewer.currentTime =
    0;



  /*
     Hiện video
  */

  videoFade.classList.remove(
    "active"
  );


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

    playPromise.catch(
      function (error) {

        console.log(
          "Video:",
          error
        );

      }
    );

  }



  /*
     Fullscreen trên thiết bị
     hỗ trợ.
  */

  setTimeout(
    function () {


      try {


        if (
          !document.fullscreenElement &&
          videoViewer.requestFullscreen
        ) {

          videoViewer
            .requestFullscreen()
            .catch(
              function () {}
            );

        }


      }
      catch (error) {

        console.log(
          error
        );

      }


    },
    150
  );

}



/* =====================================================
   VIDEO HẾT
===================================================== */

videoViewer.onended =
  function () {


    /*
       Fade
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
       Chờ fade
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


        stage =
          4;



        /*
           Bỏ fade
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
