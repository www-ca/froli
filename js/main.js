document.addEventListener("DOMContentLoaded", function () {
  var trusted = localStorage.getItem("trusted");
  if (trusted === "true") {
    
    var element = document.querySelector(".btn-create");
    
    if (element) {
      document.querySelector('.cbtn').style.opacity = 1
      element.disabled = false
    }
  }
  var date = new Date();
  year = date.getFullYear();
  document.querySelectorAll("year").innerText = year;
  var showed = sessionStorage.getItem("showed");
  if (showed === null) {
    sessionStorage.setItem("showed", "false");
    showed = "false";
  }

  if (window.location.href.includes("pages/main.html") && showed === "false") {
    document.querySelector(".all").style.display = "none";
    var splash = document.querySelector(".splash");
    splash.style.display = "block";
    splash.classList.add("active");
    document.body.style.backgroundColor = "#222831";
    setTimeout(fadeOutSplash, 5000);
  } else {
    splashGo();
  }
});

function fadeOutSplash() {
  var splash = document.querySelector(".splash");
  splash.classList.remove("active");
  setTimeout(splashGo, 1500); // مدة التلاشي مطابقة للمدة في CSS
}

function splashGo() {
  var splash = document.querySelector(".splash");
  splash.style.display = "none";

  var allContent = document.querySelector(".all");
  allContent.style.display = "block";
  var showed = sessionStorage.getItem("showed");
  if (showed === "false") {
    setTimeout(function () {
      allContent.classList.add("active");
    }, 40); // تأخير بسيط للسماح بتطبيق الـ display: block قبل الانتقال
  } else {
    allContent.style.transition = "none";
    allContent.style.opacity = "1";
  }

  document.body.style.backgroundColor = "#eeeeee";
  sessionStorage.setItem("showed", "true");
}
if (window.location.href.includes("pages/main.html")) {
  // احصل على كافة العناصر التي تحمل الفئة 'hhhh'
  var elements = document.getElementsByClassName("hhhh");

  // قم بتعيين الهوامش اليسرى لكل عنصر
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.marginLeft = "100px";
  }
}


$("select.dropdown").dropdown();
