$(document).ready(function () {
  $("#write-recipe-content").show();
  $("#write-food-content").hide();
  $("#give-food-content").hide();
  $("#write-comment-content").hide();
  $("#give-comment-content").hide();
  $("#write-like-content").hide();
  $("#give-like-content").hide();

  $("#write-recipe").click(function () {
    $("#write-recipe-content").show();
    $("#write-food-content").hide();
    $("#give-food-content").hide();
    $("#write-comment-content").hide();
    $("#give-comment-content").hide();
    $("#write-like-content").hide();
    $("#give-like-content").hide();
  });

  $("#write-food").click(function () {
    $("#write-food-content").show();
    $("#write-recipe-content").hide();
    $("#give-food-content").hide();
    $("#write-comment-content").hide();
    $("#give-comment-content").hide();
    $("#write-like-content").hide();
    $("#give-like-content").hide();
  });

  $("#give-food").click(function () {
    $("#give-food-content").show();
    $("#write-recipe-content").hide();
    $("#write-food-content").hide();
    $("#write-comment-content").hide();
    $("#give-comment-content").hide();
    $("#write-like-content").hide();
    $("#give-like-content").hide();
  });

  $("#write-comment").click(function () {
    $("#write-comment-content").show();
    $("#write-recipe-content").hide();
    $("#write-food-content").hide();
    $("#give-food-content").hide();
    $("#give-comment-content").hide();
    $("#write-like-content").hide();
    $("#give-like-content").hide();
  });

  $("#give-comment").click(function () {
    $("#give-comment-content").show();
    $("#write-recipe-content").hide();
    $("#write-food-content").hide();
    $("#give-food-content").hide();
    $("#write-comment-content").hide();
    $("#write-like-content").hide();
    $("#give-like-content").hide();
  });

  $("#write-like").click(function () {
    $("#write-like-content").show();
    $("#write-recipe-content").hide();
    $("#write-food-content").hide();
    $("#give-food-content").hide();
    $("#write-comment-content").hide();
    $("#give-comment-content").hide();
    $("#give-like-content").hide();
  });

  $("#give-like").click(function () {
    $("#give-like-content").show();
    $("#write-recipe-content").hide();
    $("#write-food-content").hide();
    $("#give-food-content").hide();
    $("#write-comment-content").hide();
    $("#give-comment-content").hide();
    $("#write-like-content").hide();
  });
});
