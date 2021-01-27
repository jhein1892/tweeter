/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function (data) {
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
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
    <p>${escape(data.content.text)}</p> 
  </div>
    <footer>
      <p>${Date(data.content.created_at)}</p>
      <p>some options shit</p>  
    </footer>
  </article>`;
  return markup;
}
  

$(document).ready(() => {

  const renderTweets = function (tweets) {
    let output = []
    for (let tweet in tweets) {

      output.push(createTweetElement(tweets[tweet]));
    };
    return output;
  }

  $(".submit-tweet").submit(function (event) {
    event.preventDefault();
    //creating the proper formatting for new tweet
    const renderRecentTweet = function (tweet) {
      $(".tweet-feed").prepend(createTweetElement(tweet))
    }
    // loading the most recent tweet
    const loadRecentTweet = function() {
      $.ajax({
        url: '/tweets',
        method: 'GET'
      })
      .done((data) => {
        renderRecentTweet(data[data.length -1]);
      })
      .fail(error => console.log(error));
    }
  
  const $queryString = $(this).serialize();
  const value = $(this.children[0]).val()
  $('#errorTooShort').hide()
  $('#errorTooLong').hide()
  if (value.length <= 0) {
    console.log('here')
    $('#errorTooShort').slideDown('fast')  
  } else if (value.length > 140) {
    $('#errorTooLong').slideDown('fast')
  } else {
    $.post("/tweets", $queryString, function (response) {
      console.log('Working')
    }).done(() => {
      $("#tweet-text").val("")
      $(".counter").val(140);
      loadRecentTweet() 
    }).fail(error => {
      console.log(error)
    })

  
  };
  
})
const loadtweets = function () {
  $.get("/tweets", 'string', function (response) {
    let myTweets = renderTweets(response);
    $.get('/tweets', myTweets, function () {
      $('.tweet-feed').append(myTweets)
    })
  })
}
loadtweets()    

})




// const $tweet = createTweetElement(tweetData) 