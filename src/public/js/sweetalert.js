// 회원가입 성공 메세지
function alertRegister() {
    Swal.fire({
        text: "회원가입이 성공되었습니다.",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#2E5543",
        confirmButtonText: "로그인"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = "/user";
        }
    });
}

// 로그아웃 상태에서 글쓰기 버튼 클릭시
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
        window.location = "/user";
      }
    });
}

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