/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function (data) {
  const markup =
    `<article>
    <header>
      <div class="identity">
      <img src=${data.user.avatars}>
      <p>${data.user.name}</p> 
    </div>
      <p id="handle">${data.user.handle}</p>
    </header>
    <div class="content">
    <p>${data.content.text}</p> 
  </div>
    <footer>
      <p>${Date(data.content.created_at)}</p>
      <p>some options shit</p>  
    </footer>
  </article>`;
    return markup; 
}


$(document).ready( () => {

  const renderTweets = function (tweets) {
    let output = []
    for (let tweet in tweets){
      output.push(createTweetElement(tweets[tweet]));
    };
  return output; 
  }

  $(".submit-tweet").submit(function(event) { 
    event.preventDefault();
    const $queryString = $(this).serialize();
    const value = $(this.children[0]).val()
    console.log('Am I here?')
    console.log(value.length)
    if (!value){
      alert('You need to fill this out')
    } else if (value.length > 140){
      alert('This is too long!')
    } else {
    $.post("/tweets", $queryString, function(response) {
      console.log('Working')
    })
  }
  });

  const loadtweets = function(){
    $.get("/tweets", 'string', function(response) {
      let myTweets = renderTweets(response); 
    $.get('/tweets', myTweets, function() {
      $('#container').append(myTweets)
    })
  })
}
loadtweets()
})


// const $tweet = createTweetElement(tweetData) 