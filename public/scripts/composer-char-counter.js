

// const callback = function() {
//   alert('Jello');
// };

// el.addEventListener('dblclick', callback);

$(document).ready(() => {
  let num = $(".counter").val();
  $("#tweet-text").keyup(() => {
    let string = $("#tweet-text").val()
    $(".counter").val(num - string.length)
  })
})