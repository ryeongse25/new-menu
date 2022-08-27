// 회원가입 성공 메세지
function alertRegister() {
    Swal.fire({
        html: "성공적으로 회원가입 되었습니다.<br><br>가입하신 정보로 다시 로그인해주세요.",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#2E5543",
        confirmButtonText: "로그인",
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = "/user";
        }
    });
}

// 로그아웃 상태에서 글쓰기 버튼 클릭시
function alertBoard() {
    Swal.fire({
      html: "<b>해당 기능은 로그인이 필요합니다.</b>",
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
        timer: 1500
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

// 탈퇴
function alertDelete() {
    Swal.fire({
        position: "top-center",
        icon: "success",
        title: "탈퇴되었습니다.",
        showConfirmButton: false,
        timer: 1500
    }).then((result) => {
        location.href = "/";
    })
}

// 레시피 작성 중 취소
function alertCancel() {
    Swal.fire({
        text: "작성 중인 내용을 삭제하고 페이지를 떠나시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2E5543",
        cancelButtonColor: "#BC5539",
        confirmButtonText: "네",
        cancelButtonText: "아니요",
    }).then((result) => {
        if (result.isConfirmed) {
          window.location = "/recipe";
        }
    });
}
