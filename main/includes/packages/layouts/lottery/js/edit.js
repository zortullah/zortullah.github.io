$('[lottery-ticket="minus"]').on("click", function() {
  var $currencyCount = $('[lottery-ticket="number"]').val();
  $currencyCount--;
  if ($currencyCount > -1) {
    $('[lottery-ticket="number"]').val($currencyCount);
  } else {
    $('[lottery-ticket="number"]').val(0);
  }
});
$('[lottery-ticket="plus"]').on("click", function() {
  var $currencyCount = $('[lottery-ticket="number"]').val();
  $currencyCount++;
  $('[lottery-ticket="number"]').val($currencyCount);
});
$('[lottery-ticket="purchase"]').on("click", function() {
  var $ticketCount = $('[lottery-ticket="number"]').val();
  if ($ticketCount > 0) {
    swal.fire({
      title: $languages["warning"],
      text: $languages["lotteryAreYouSure"].replaceAll("&count", $ticketCount).replaceAll("&amount", $ticketCount*$ticketPrice),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#02b875",
      cancelButtonColor: "#f5365c",
      cancelButtonText: $languages["giveUp"],
      confirmButtonText: $languages["approve"],
      reverseButtons: true
    }).then(function(isAccepted) {
      if (isAccepted.value) {
        swal.fire({
          title: $languages["warning"],
          html: $languages["lotteryLoadingText"] + '<br><br><div class="loader-bars"><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div></div><br>',
          icon: "warning",
          allowOutsideClick: false,
          showConfirmButton: false
        });
	      $.ajax({
          type: "POST",
          url: "/main/includes/packages/layouts/lottery/php/proccess.php?action=ticketPurchase",
          data: {count: $ticketCount},
          success: function(result) {
            var ajaxData = JSON.parse(result);
	  	      var result = ajaxData.code;
            if (result == "successyfull") {
              swal.fire({
                title: $languages["success"],
                text: $languages["lotteryPurchaseSuccess"],
                icon: "success",
                confirmButtonColor: "#02b875",
                confirmButtonText: $languages["okey"]
              }).then(function() {
                window.location.reload();
              });
            } else if (result == "notCredit") {
              swal.fire({
                title: $languages["error"],
                text: $languages["lotteryPurchaseNotCredit"],
                icon: "error",
                confirmButtonColor: "#02b875",
                confirmButtonText: $languages["creditUpload"]
              }).then(function() {
                window.location = $links["credit_upload"];
              });
            } else if (result == "notLogin") {
              swal.fire({
                title: $languages["error"],
                text: $languages["lotteryPurchaseNotLogin"],
                icon: "error",
                confirmButtonColor: "#02b875",
                confirmButtonText: $languages["login"]
              }).then(function() {
                window.location = $links["login"];
              });
           } else {
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
    });
  } else {
    swal.fire({
      title: $languages["error"],
      text: $languages["lotteryPurchaseNotTicketCount"],
      icon: "error",
      confirmButtonColor: "#02b875",
      confirmButtonText: $languages["okey"]
    });
  }
});
function starterCounter(count) {
    var languageDate = {DAY_PLURAL: $dateLang["day"],DAY_SINGULAR: $dateLang["day"],HOUR_PLURAL: $dateLang["hours"],HOUR_SINGULAR: $dateLang["hours"],MINUTE_PLURAL: $dateLang["minute"], MINUTE_SINGULAR: $dateLang["minute"],SECOND_PLURAL: $dateLang["second"],SECOND_SINGULAR: $dateLang["second"]};
    for (var key in languageDate) {
        if (!languageDate.hasOwnProperty(key)) {
          continue;
        }
        count.setConstant(key, languageDate[key]);
    }
    var timeCounter = Tick.count.down($lotteryEndTime+'+03:00');
    timeCounter.onupdate = function(value) {count.value = value;};
    timeCounter.onended = function() {window.location = $links["lottery"];};
}