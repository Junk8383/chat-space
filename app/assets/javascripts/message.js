$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="main-messagebox">
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
                      </div>
                      <div class="main-message__image">
                        <img src="${message.image.url}" alt=''>
                      </div>
                    </div>
                  </div>`
    } else {
      var html = `<div class="main-messagebox">
                    <div class="main-userbox">
                      <div class="main-user">
                        ${message.user_name}
                      </div>
                      <div class="main-time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main-message">
                      ${message.content}
                    </div>
                  </div>`
    }
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
})