$(function(){

  function buildHTML(message){
    var img = (message.image) ?
              ` <div class="main-message__image"> 
                  <img src="${message.image}" alt=''>
                </div>`:
                ``  ;
    var html = `<div class="main-messagebox" data-message_id=` + message.id +`>
                  <div class="main-userbox">
                    <div class="main-user">
                      ${message.user_name}
                    </div>
                    <div class="main-time">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="main-message">
                    <div class="main-message__content">
                      ${message.content}
                      ${img}
                    </div>
                  </div>
                </div>`
    return html
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault()
    var fd = new FormData(this);
    var url = $(this).attr('action');
    $.ajax ({
      url: url,
      type: 'POST',
      data: fd,  
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-body').append(html);
      $('.main-body').animate({ scrollTop: $('.main-body')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('#submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.main-messagebox:last').data("message_id"); 

      $.ajax({ 
        url: "api/messages", 
        type: 'get', 
        dataType: 'json', 
        data: {id: last_message_id} 
      })
      .done(function (messages) { 
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-body').append(insertHTML);
        $('.main-body').animate({scrollTop: $('.main-body')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    };
  };
  setInterval(reloadMessages, 7000);
})