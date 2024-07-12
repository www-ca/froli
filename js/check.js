function login() {
  var correctPassword = "1122";
  var username = "froli";
  var name = document.getElementById("name").value;
  var pass = document.getElementById("password").value;

  if (name === username && pass === correctPassword) {
    localStorage.setItem("trusted", "true");
    alert("تم الدخول بنجاح");
    window.location.href = "main.html";
  } else {
    alert("اسم المستخدم أو كلمة المرور خاطئة");
  }
}
