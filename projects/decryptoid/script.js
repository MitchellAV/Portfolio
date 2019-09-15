$(document).ready(function() {
  $('.key1').hide();
  $('.key2').hide();

  $('#ciphers').change(function() {
    toggles();
  });

  $('#method').change(function() {
    toggles();
  });

});

function keycheck (form) {
  if ($('#ciphers').val() == 'double') {
    let key1 = uniqueChar(form.key1.value);
    let key2 = uniqueChar(form.key2.value);
    if (key1 && key2) {
      return true;
    }
    else {
      alert("Keys must have unique characters.")
      return false;
    }
  }
  return true;
}


function uniqueChar(str) {
  for(let i = 0; i < str.length; i++) {
    for(let j = i + 1; j < str.length; j++) {
      if(str[i] == str[j]) {
        return false;
      }
    }
  }
  return true;
}

function toggles(){
  if ($('#ciphers').val() == 'simplesub') {
      if ($('#method').val() == 'decrypt') {
        $('.key1').show();
        $('.key2').hide();
      } else {
        $('.key1').hide();
        $('.key2').hide();
      }
  } else if ($('#ciphers').val() == 'double') {
    $('.key1').show();
    $('.key2').show();
  } else if ($('#ciphers').val() == 'rc4') {
    $('.key1').show();
    $('.key2').hide();
  }
}
