/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function (data) {
  $('abbr.timeago').timeago();
  const date = $.timeago(new Date(data.created_at));
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
    
  };
  const markup =
    `<article>
    <header>
      <div class='identity'>
      <img src=${data.user.avatars}>
      <p>${data.user.name}</p> 
    </div>
      <p id='handle'>${data.user.handle}</p>
    </header>
    <div class='content'>
    <p>${escape(data.content.text)}</p> 
  </div>
    <footer>
      <p>${date}</p>
      <div class='icons'>
      <i class='fas fa-flag'></i>
      <i class='fas fa-retweet'></i>
      <i class='fas fa-heart'></i>  
      </div>
    </footer>
  </article>`;
  return markup;
};


$(document).ready(() => {
  const renderTweets = function(tweets) {
    let output = [];
    for (let tweet in tweets) {
      output.unshift(createTweetElement(tweets[tweet]));
    }
    return output;
  };
  $('.submit-tweet').submit(function(event) {
    event.preventDefault();
    //creating the proper formatting for new tweet
    const renderRecentTweet = function(tweet) {
      $('.tweet-feed').prepend(createTweetElement(tweet));
    };
    // loading the most recent tweet
    const loadRecentTweet = function() {
      $.ajax({
        url: '/tweets',
        method: 'GET'
      })
        .done((data) => {
          renderRecentTweet(data[data.length - 1]);
        })
        .fail(error => console.log(error));
    };
  
    const $queryString = $(this).serialize();
    const value = $(this.children[0]).val().trim();
    $('#errorTooShort').hide();
    $('#errorTooLong').hide();
    if (value.length <= 0) {
      $('#errorTooShort').slideDown('fast');
    } else if (value.length > 140) {
      $('#errorTooLong').slideDown('fast');
    } else {
      $('.counter').css('color', '#000645');
      $.post('/tweets', $queryString, function(response) {
      }).done(() => {
        $('#tweet-text').val('');
        $('.counter').val(140);
        loadRecentTweet();
      }).fail(error => {
        console.log(error);
      });
    }
  });
  const loadtweets = function() {
    $.get('/tweets', 'string', function(response) {
      let myTweets = renderTweets(response);
      $.get('/tweets', myTweets, function() {
        $('.tweet-feed').append(myTweets);
      });
    });
  };
  loadtweets();

  $('#tweet-text').focus(function() {
    $('#errorTooShort').slideUp('fast');
    $('#errorTooLong').slideUp('fast');
  });

  $('.write').on('click', function() {
    $('.new-tweet').slideToggle('fast');
    $('#tweet-text').focus();
  });

  $('.write').hover(function() {
    $('.write-info').css('color', 'black');
  }, function() {
    $('.write-info').css('color', 'white');
  });

  $(function() {
    $('#scrollUp').hide();
    $(window).scroll(function() {
      let size  = $(window).scrollTop();
      if (size >= 100) {
        $('#scrollUp').show();
      } else {
        $('#scrollUp').hide();
      }
    });
  });
  $('#scrollUp').click(function() {
    $('html, body').animate({scrollTop: 0}, 'slow');
    $('.new-tweet').slideDown('fast');
    $('#tweet-text').focus();
  });
  
});




// const $tweet = createTweetElement(tweetData)