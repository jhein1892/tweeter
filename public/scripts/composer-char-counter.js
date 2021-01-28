$(document).ready(() => {
  let num = $(".counter").val();
  $(".submit-tweet").on('keyup',function() {
    let counter = $(this.children[1].children[1])
    let string = $(this.children[0]).val()
    let count = num - string.length; 
    counter.val(count) 
 
    if (count <= 0){
      counter.css("color", "red");
    } else if (count <= 50 && count > 0) {
      counter.css("color", "#fba607")
    } else {
      counter.css("color", "#000645")
    }
  })
  
}) 






