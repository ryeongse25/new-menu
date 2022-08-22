$(document).ready(function () {
  $("#tab1").css("background", "#EFEAE8");
  $("#tab1").css("color", "#c87962");
  $("#tab1_content").show();
  $("#tab2_content").hide();
  $("#tab3_content").hide();
  $("#tab4_content").hide();

  $(".tabs li").click(function (obj) {
    $(".tabs li").css("background", "");
    $(obj.currentTarget).css("background", "#EFEAE8");
    $(".tabs li").css("color", "");
    $(obj.currentTarget).css("color", "#c87962");
  });

  $("#tab1").click(function () {
    $("#tab1_content").show();
    $("#tab2_content").hide();
    $("#tab3_content").hide();
    $("#tab4_content").hide();
  });

  $("#tab2").click(function (obj) {
    // 내가 선택한 obj의 id 가져올 수 있는지 확인해보기.
    $("#tab2_content").show();
    $("#tab1_content").hide();
    $("#tab3_content").hide();
    $("#tab4_content").hide();
  });

  $("#tab3").click(function () {
    $("#tab3_content").show();
    $("#tab1_content").hide();
    $("#tab2_content").hide();
    $("#tab4_content").hide();
  });

  $("#tab4").click(function () {
    $("#tab4_content").show();
    $("#tab1_content").hide();
    $("#tab2_content").hide();
    $("#tab3_content").hide();
  });
});

$("#tab2").ready(function () {
  $("#tab2_content .giveFood").css("border-bottom", "2px solid #2E5543");
  $("#tab2_content .giveFood").css("color", "");
  $("#tab2_content .tab2_content1 .giveFood_content").show();
  $("#tab2_content .tab2_content1 .writeFood_content").hide();

  $("#tab2_content .food_box li").click(function (obj) {
    $("#tab2_content .food_box li").css("border-bottom", "");
    $(obj.currentTarget).css("border-bottom", "2px solid #2E5543");
  });
  $("#tab2_content .food_box .giveFood").click(function () {
    $("#tab2_content .tab2_content1 .giveFood_content").show();
    $("#tab2_content .tab2_content1 .writeFood_content").hide();
  });

  $("#tab2_content .food_box .writeFood").click(function () {
    $("#tab2_content .tab2_content1 .writeFood_content").show();
    $("#tab2_content .tab2_content1 .giveFood_content").hide();
  });
});

$("#tab3").ready(function () {
  $("#tab3_content .giveCommand").css("border-bottom", "2px solid #2E5543");
  $("#tab3_content .giveCommand").css("color", "");
  $("#tab3_content .tab3_content1 .giveCommand_content").show();
  $("#tab3_content .tab3_content1 .writeCommand_content").hide();

  $("#tab3_content .command_box li").click(function (obj) {
    $("#tab3_content .command_box li").css("border-bottom", "");
    $(obj.currentTarget).css("border-bottom", "2px solid #2E5543");
  });
  $("#tab3_content .command_box .giveCommand").click(function () {
    $("#tab3_content .tab3_content1 .giveCommand_content").show();
    $("#tab3_content .tab3_content1 .writeCommand_content").hide();
  });
  $("#tab3_content .command_box .writeCommand").click(function () {
    $("#tab3_content .tab3_content1 .writeCommand_content").show();
    $("#tab3_content .tab3_content1 .giveCommand_content").hide();
  });
});

$(document).ready(function () {
  var readURL = function (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(".profile-photo img").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  $(".file-upload").on("change", function () {
    readURL(this);
  });

  $(".upload-button").on("click", function () {
    $(".file-upload").click();
  });
});
