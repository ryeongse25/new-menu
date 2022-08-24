const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", function () {
  this.classList.toggle("is-active");
});

function main_page() {
  location.href = "/";
}

// alert

function alertLogout() {
  Swal.fire({
    position: "top-center",
    icon: "success",
    title: "로그아웃 성공",
    showConfirmButton: false,
    timer: 1500,
  });
}

function alertChange() {
  Swal.fire({
    position: "top-center",
    icon: "success",
    text: "회원정보가 수정되었습니다.",
    showConfirmButton: false,
    timer: 1500,
  });
}
