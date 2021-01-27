/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1611523884350
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1611610284350
  }
]

const renderTweets = function (tweets) {
  let output = []
  for (let tweet in tweets){
    output.push(createTweetElement(tweets[tweet]));
  };
return output; 
}

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

const $tweet = renderTweets(tweetData)
$(document).ready( () => {
  $('#container').append($tweet);

  $(".submit-tweet").submit(function(event) { 
    event.preventDefault();
    const $queryString = $(this).serialize();
    console.log($queryString);
    $.post("/tweets", $queryString, function(response) {
      console.log('Working')
    })
    // $.ajax('/tweets', queryString,{method: 'POST'})
    // })
  });
})


// const $tweet = createTweetElement(tweetData) 