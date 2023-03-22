$(document).ready(function() {
  var $helpCenter = $('[data-toggle="help-center"]');
  if ($helpCenter.length) {
    $helpCenter.each(function() {
      $(this).on("click", function() {
        var $type = $(this).attr("status");
        var $helpID = $(this).attr("helpID");
        $.ajax({
          type: "POST",
          url: "/main/includes/packages/layouts/help-center/php/proccess.php",
          data: {helpID: $helpID, type: $type},
          success: function(data) {
            var $returnData = jQuery.parseJSON(data);
            if ($returnData.status == true) {
              swal.fire({
                title: $languages["success"],
                text: $returnData.reason,
                icon: "success",
                confirmButtonColor: "#02b875",
                confirmButtonText: $languages["okey"],
                reverseButtons: true
              });
              $('[helpview="'+$helpID+'"]').css("display", "none");
            } else {
              swal.fire({
                title: $languages["error"],
                text: $returnData.reason,
                icon: "error",
                confirmButtonColor: "#02b875",
                confirmButtonText: $languages["okey"],
                reverseButtons: true
              });
              $('[helpview="'+$helpID+'"]').css("display", "none");
            }
          }
        });
      });
    });
  }
});