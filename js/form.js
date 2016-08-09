$(function() {
  $('#sub').on('click',function(e){
    e.preventDefault();
    var name = $('input[name="name"]').val();
    var email = $('input[name="email"]').val();
    var contents = $('textarea').val();
    if (name == '') {
      // var name_parentNode = document.querySelector('input[name="name"]').parentNode;
      // console.log(name_parentNode);
      // var name_id = name_parentNode.querySelector('.caution');
      // console.log(name_id);
      // 1つのclass名で対応できない
      if (!$('.caution-name span').length) {
        var name_cau = document.querySelector('.caution-name');
        alert(name_cau);
      }
    }
    else {
      var name_cau = document.querySelector('.caution-name');
      collect(name_cau);
    }

    if (email == '') {
      if (!$('.caution-email span').length) {
        var email_cau = document.querySelector('.caution-email');
        alert(email_cau);
      }
    }
    else if (!email.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
      if (!$('.caution-email span').length) {
        var email_cau = document.querySelector('.caution-email');
        alert(email_cau, "形式が正しくありません");
      }
    }
    else {
      var email_cau = document.querySelector('.caution-email');
      collect(email_cau);
    }

    if (contents == '') {
      if (!$('.caution-contents span').length) {
        var contents = document.querySelector('.caution-contents');
        alert(contents);
      }
    } else {
      var contents = document.querySelector('.caution-contents');
      collect(contents);
    }

    if (name != '' && (email != '' && email.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) && contents != '') {
      $('#form').submit();
    }
  });

  function alert(obj, text = "必須項目です") {
    var span = document.createElement("span");
    span.className = "attention";
    span.innerHTML = text;
    obj.appendChild(span);
  }

  function collect(obj) {
    $(obj).find("span").remove();
  }
});