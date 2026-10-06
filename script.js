/* =========================================
   TRẠNG THÁI
========================================= */

let stage = 0;
let index = 0;
let canNext = false;


/* =========================================
   ẢNH
========================================= */

const images = [
  "1.png",
  "2.png",
  "3.png",
  "4.png"
];


/* =========================================
   ELEMENT
========================================= */

const envelope =
  document.getElementById("envelope");

const viewer =
  document.getElementById("viewer");

const hint =
  document.querySelector(".hint");

const flowerLayer =
  document.getElementById("flowerLayer");

const questionBox =
  document.getElementById("questionBox");

const finalBox =
  document.getElementById("finalBox");

const yesBtn =
  document.getElementById("yesBtn");


/* =========================================
   BÌ THƯ
========================================= */

envelope.onclick = (e) => {

  e.stopPropagation();


  /* ================================
     CLICK 1
     MỞ BÌ THƯ
  ================================= */

  if (stage === 0) {

    envelope.classList.add("open");

    stage = 1;

    return;
  }


  /* ================================
     CLICK 2
     HOA BUNG RA
  ================================= */

  if (stage === 1) {

    stage = 2;

    envelope.style.pointerEvents =
      "none";


    /* Ẩn hint */

    hint.style.opacity = "0";

    setTimeout(() => {

      hint.style.display =
        "none";

    }, 500);


    /* Bắt đầu hoa */

    startFlowerTransition();

  }

};


/* =========================================
   HIỆU ỨNG HOA
========================================= */

function startFlowerTransition() {

  flowerLayer.innerHTML = "";

  flowerLayer.style.display =
    "block";

  flowerLayer.style.opacity =
    "1";

  flowerLayer.classList.remove(
    "fade-out"
  );


  /* Các loại hoa */

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
          Math.random() *
          flowers.length
        )
      ];


    /* --------------------------------
       Vị trí cuối
    -------------------------------- */

    const x =
      (Math.random() - .5)
      *
      window.innerWidth
      *
      1.8;


    const y =
      (Math.random() - .5)
      *
      window.innerHeight
      *
      1.8;


    /* Kích thước */

    const size =
      20 +
      Math.random() * 38;


    /* Độ trễ */

    const delay =
      Math.random() * .45;


    /* Góc xoay */

    const rotate =
      (Math.random() - .5)
      * 1000;


    /* CSS variables */

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


  /* =================================
     HOA TAN
  ================================= */

  setTimeout(() => {

    flowerLayer.classList.add(
      "fade-out"
    );

  }, 2100);


  /* =================================
     HIỆN ẢNH 1
  ================================= */

  setTimeout(() => {

    flowerLayer.style.display =
      "none";

    flowerLayer.innerHTML = "";


    showFirstImage();


    stage = 3;

  }, 3100);

}


/* =========================================
   ẢNH ĐẦU
========================================= */

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


/* =========================================
   CHẠM ẢNH
========================================= */

viewer.onclick = (e) => {

  e.stopPropagation();


  if (
    stage !== 3 ||
    !canNext
  ) {

    return;

  }


  canNext = false;


  /* Fade ảnh */

  viewer.classList.remove(
    "show"
  );


  setTimeout(() => {

    index++;


    /* ==============================
       CÒN ẢNH
    ============================== */

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


    /* ==============================
       HẾT ẢNH
    ============================== */

    viewer.style.display =
      "none";


    questionBox.style.display =
      "flex";


    stage = 4;

  }, 400);

};


/* =========================================
   YESN'T
========================================= */

yesBtn.onclick = (e) => {

  e.stopPropagation();


  questionBox.style.display =
    "none";


  finalBox.style.display =
    "flex";

};