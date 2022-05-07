/* global $, Stripe */
//Document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');

  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );

  //When user clicks form submit btn.
  submitBtn.click(function(event){
    //prevent default submission behavior.
    event.preventDefault();

    //Collect credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();

    //Use Stripe js library to check for card errors.
    
    //Send the card info to Stripe.
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);

    return false;
  });

  //Stripe will return a card token.
  function stripeResponseHandler(status, response) {
    //Get the token from the response.
    var token = response.id;

    //Inject the card token in a hidden field.
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );

    //Submit form to Rails app.
    theForm.get(0).submit();
  }
});
