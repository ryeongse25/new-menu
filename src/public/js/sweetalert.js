// 회원가입 성공 메세지
function alertRegister() {
    Swal.fire({
        text: "성공적으로 회원가입 되었습니다.<br>가입하신 정보로 다시 로그인해주세요.",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#2E5543",
        cancleButtonColor: '#BC5539',
        confirmButtonText: "로그인",
        cancleButtonText: "닫기",
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

// 로그아웃
function alertLogout() {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "로그아웃 성공",
      showConfirmButton: false,
      timer: 1500,
    });
}

// 정보 수정
function alertChange() {
    Swal.fire({
        position: "top-center",
        icon: "success",
        text: "회원정보가 수정되었습니다.",
        showConfirmButton: false,
        timer: 1500,
    });
}

// 아이디 찾기
function alertFindId() {
  Swal.fire({
    position: "top-center",
    icon: "warning",
    text: "입력하신 정보로 가입된 아이디를 찾을 수 없습니다.",
    showConfirmButton: false,
    timer: 1500,
  })
}

// 비밀번호 찾기
function alertFindPw() {
  Swal.fire({
    position: "top-center",
    icon: "warning",
    text: "존재하지 않는 정보입니다.",
    showConfirmButton: false,
    timer: 1500,
  })
}

