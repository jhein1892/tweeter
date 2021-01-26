$(document).ready(() => {
  let num = $(".counter").val();
  $("#tweet-text").keyup(() => {
    let string = $("#tweet-text").val()
    $(".counter").val(num - string.length)
    let count = num - string.length;
    if (count <= 0){
      $('.counter').css("color", "red")
    } else if (count <= 50 && count > 0) {
      $('.counter').css("color", "#fba607")
    } else {
      $('.counter').css("color", "#000645")
    }
  })
}) 