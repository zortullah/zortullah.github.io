function shoppingCartPay(amount)
{
    var $amount = amount;
    var $ajaxUrl = "/main/includes/packages/layouts/shopping-cart/php/proccess.php";
    
    function proccessCheckOut(ajaxUrl)
    {
      swal.fire({
        title: $languages["warning"],
        html: $languages["shoppingCartJSPaymentLoading"] + '<br><br><div class="loader-bars"><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div></div><br>',
        icon: "warning",
        allowOutsideClick: false,
        showConfirmButton: false
      });
      $.ajax({
        type: "POST",
        url: ajaxUrl + "?action=checkout",
        data: {proccess: "checkOut"},
        success: function(result) {
          var ajaxData = JSON.parse(result);
          if (ajaxData.code == "successyfull") {
            swal.fire({
              title: $languages["success"],
              text: $languages["shoppingCartJSPaymentSuccess"],
              icon: "success",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["goChest"]
            }).then(function() {
              window.location = $links["chest"];
            });
          } else if (ajaxData.code == "emptyCart") {
            swal.fire({
              title: $languages["error"],
              text: $languages["shoppingCartJSPaymentNotProduct"],
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["okey"]
            });
          } else if (ajaxData.code == "stockNot") {
            swal.fire({
              title: $languages["error"],
              text: $languages["shoppingCartJSPaymentNotProductStock"],
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["okey"]
            });
          } else if (ajaxData.code == "insufficientCredit") {
            swal.fire({
              title: $languages["error"],
              html: $languages["shoppingCartJSPaymentNotCredit"].replaceAll("&credit", ajaxData.credit).replaceAll("&amount", ajaxData.total),
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["creditUpload"]
            }).then(function() {
              window.location = $links["credit_upload"];
            });
          } else if (ajaxData.code == "notLogin") {
            swal.fire({
              title: $languages["error"],
              text: $languages["shoppingCartJSPaymentLoginError"],
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["login"]
            }).then(function() {
              window.location = $links["login"];
            });
          } else if (ajaxData.code == "notData" || ajaxData.code == "") {
            swal.fire({
              title: $languages["error"],
              text: $languages["systemError"],
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["okey"]
            });
          }
        }
      });
    }
    
    swal.fire({
    title: $languages["warning"],
    text: $languages["shoppingCartJSPaymentInfoText"].replaceAll("&amount", $amount),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#02b875",
    cancelButtonColor: "#f5365c",
    cancelButtonText: $languages["giveUp"],
    confirmButtonText: $languages["approve"],
    reverseButtons: true
  }).then(function(isAccepted) {
    if (isAccepted.value) {
      proccessCheckOut($ajaxUrl);
    }
  });
}

function shoppingCartDelete(cartID)
{
  var $ajaxUrl = "/main/includes/packages/layouts/shopping-cart/php/proccess.php?action=remove";
  var $cartID = cartID;
  
  function proccessRemove(ajaxUrl, cartID) {
      swal.fire({
        title: $languages["warning"],
        html: $languages["shoppingCartJSRemoveProductLoading"] + '<br><br><div class="loader-bars"><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div></div><br>',
        icon: "warning",
        allowOutsideClick: false,
        showConfirmButton: false
      });
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        data: {cartID: cartID},
        success: function(result) {
          var ajaxData = JSON.parse(result);
		  var result = ajaxData.code;
          if (result == "successyfull") {
            swal.fire({
              title: $languages["success"],
              text: $languages["shoppingCartJSRemoveProductSuccess"],
              icon: "success",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["okey"]
            }).then(function() {
              location.reload();
            });
          } else if (result == "notData" || result == "notCart" || result == "") {
            swal.fire({
              title: $languages["error"],
              text: $languages["systemError"],
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["okey"]
            });
          } else if (result == "notLogin") {
            swal.fire({
              title: $languages["error"],
              text: $languages["shoppingCartJSRemoveProductLoginError"],
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["login"]
            }).then(function() {
              window.location = $links["login"];
            });
         }
        }
      });
  }
  
  // TRANSACTİON CONFİRMATİON
  swal.fire({
    title: $languages["warning"],
    text: $languages["shoppingCartJSRemoveProductAreYouSure"],
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#02b875",
    cancelButtonColor: "#f5365c",
    cancelButtonText: $languages["giveUp"],
    confirmButtonText: $languages["approve"],
    reverseButtons: true
  }).then(function(isAccepted) {
    if (isAccepted.value) {
      proccessRemove($ajaxUrl, $cartID);
    }
  });
}