const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", function () {
  this.classList.toggle("is-active");
});

function main_page() {
  location.href = "/";
}

// alert

function alertBoard() {
  Swal.fire({
    text: "해당 기능은 로그인이 필요합니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2E5543",
    cancelButtonColor: "#BC5539",
    confirmButtonText: "로그인",
    cancelButtonText: "닫기",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location = "localhost:8000/user";
    }
  });
}
