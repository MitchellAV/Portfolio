function validate(form){
  let fail = validate_username(form.username.value);
  fail += validate_email(form.email.value);
  fail += validate_password(form.password.value);

  if (fail == "") return true;
  else {
    alert(fail);
    return false;
  }
}

function validate_username(field){
  if (field == "") return "No Username was entered.\n";
  else if (/[^a-zA-Z0-9_-]/.test(field)) {
    return "Only letters, numbers, - and _ in usernames.\n";
  }
  return "";
}

function validate_password(field){
  let limit = 8;
  if (field == "") return "No Password was entered.\n";
  else if (field.length < limit) {
    return "Passwords must be at least "+limit+" characters.\n";
  }
  else if (!/[a-z]/.test(field) ||
          !/[A-Z]/.test(field) ||
          !/[0-9]/.test(field)) {
    return "Passwords require 1 each of a-z, A-Z, and 0-9.\n";
  }
  return "";
}

function validate_email(field){
  let a = !((field.indexOf(".") > 0) && (field.indexOf("@") > 0)) ;
  let b = !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(field);
  if (field == "") return "No Email was entered.\n";
  else if (a || b) {
    return "The Email address is invalid.\n";
  }
  return "";
}
