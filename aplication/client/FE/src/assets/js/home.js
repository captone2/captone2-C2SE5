//eye password
jQuery('.toggle-password-new').click(function () {
    if (jQuery('.new-password').attr('type') === "password") {
      jQuery('.new-password').attr('type', 'text')
    } else {
      jQuery('.new-password').attr('type', 'password')
    }
  })
  
  jQuery('.fa.fa-eye').click(function () {
    if (jQuery('.password').attr('type') === "password") {
      jQuery('.password').attr('type', 'text')
    } else {
      jQuery('.password').attr('type', 'password')
    }
  })
  
  
  const newPassword = jQuery('.new-password')
  const confirmPassword = jQuery('.confirm-password')
  
  // validate change password
  newPassword.keyup(function () {
    var upperCase = new RegExp('[A-Z]');
    var lowerCase = new RegExp('[a-z]');
    var numbers = new RegExp('[0-9]');
    var regex = new RegExp('[#?!@$%^&*]');
    let password = false;
    let upercase = false;
    let lowercase = false;
    let number = false;
    let special = false;
  
  
    // validate special character password
    if (jQuery(this).val().match(regex)) {
      jQuery('.least-special').addClass('line-active')
      special = !special;
    } else {
      jQuery('.least-special').removeClass('line-active')
    }
  
    // validate length password
    if (jQuery(this).val().length >= 8 && jQuery(this).val().length <= 20) {
      jQuery('.least-six').addClass('line-active')
      password = !password;
    } else {
      jQuery('.least-six').removeClass('line-active')
    }
  
    // validate upeercase
    if (jQuery(this).val().match(upperCase)) {
      jQuery('.least-upper').addClass('line-active')
      upercase = !upercase;
    } else {
      jQuery('.least-upper').removeClass('line-active')
    }
  
    // validate lowercase
    if (jQuery(this).val().match(lowerCase)) {
      jQuery('.least-lower').addClass('line-active')
      lowercase = !lowercase;
    } else {
      jQuery('.least-lower').removeClass('line-active')
    }
  
    //validate only number
    if (jQuery(this).val().match(numbers)) {
      jQuery('.least-number').addClass('line-active')
      number = !number;
    } else {
      jQuery('.least-number').removeClass('line-active')
    }
  
    // validate clear all
    if (jQuery(this).val() === '') {
      jQuery('.least-six').removeClass('line-active')
      jQuery('.least-upper').removeClass('line-active')
      jQuery('.least-lower').removeClass('line-active')
      jQuery('.least-number').removeClass('line-active')
      jQuery('.least-special').removeClass('line-active')
    }
  
    // check success
    if (password && number && lowerCase && upercase && special) {
      jQuery('.icon-check-new').removeClass('check-active')
    } else {
      jQuery('.icon-check-new').addClass('check-active')
    }
  
    confirmPassword.val("");
  
  })
  
  // validate confirm password
  confirmPassword.keyup(function () {
    if (jQuery(this).val() === newPassword.val()) {
      jQuery('.icon-check-confirm').removeClass('check-active')
    } else {
      jQuery('.icon-check-confirm').addClass('check-active')
    }
  })