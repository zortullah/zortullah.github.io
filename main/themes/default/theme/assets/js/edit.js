var DropImage = (function() {
  var $dropimage = $('[data-toggle="dropimage"]');
  function init($dropimage) {
    $dropimage.dropImage();
  }
  if ($dropimage.length) {
    $dropimage.each(function() {
      init($(this));
    });
  }
})();

function changeSwitch(dataID)
{
  if (document.getElementById(dataID).value == "0") {
    document.getElementById(dataID).value = "1";
  } else if (document.getElementById(dataID).value == "1") {
    document.getElementById(dataID).value = "0";
  }
}

function readNotifications() {
  $.ajax({
    type: "GET",
    url: "/main/includes/packages/ajax/notifications.php?action=read",
    success: function(result) {
      $('#account-notificationsread').removeClass('unread');
    }
  });
}

function broadcastHits(dataID) {
  $.ajax({
    type: "GET",
    url: "/main/includes/packages/ajax/broadcastHits.php?action=hits&broadcast=" + dataID,
    success: function(result) {
      if (result == "error") {
        swal.fire({
          title: $languages["error"],
          text: $languages["systemError"],
          type: 'error',
          confirmButtonColor: '#02b875',
          confirmButtonText: $languages["okey"]
        });
      }
    }
  });
}

var ServerOnlineStatus = (function() {
  var $onlineStatus = $('[server-command="serverOnlineStatus"]');

  if ($onlineStatus.length) {
    $onlineStatus.each(function() {
      var $onlineStatus = $(this);
      var $serverIP = $onlineStatus.attr("server-ip").split(':', 2);
      
      function createAjaxURL($type) {
        // AJAX URL
        var $mcAPIUs = "https://mcapi.us/server/status?ip=" + $serverIP[0] + (($serverIP[1]) ? "&port=" + $serverIP[1] : "");
        var $mcAPITc = "https://mcapi.tc/?" + $serverIP[0] + "/json";
        var $mcAPIEu = "https://eu.mc-api.net/v3/server/ping/" + $serverIP[0] + (($serverIP[1]) ? ":" + $serverIP[1] : "");
        var $mcAPISrvJava = "https://api.mcsrvstat.us/2/" + $serverIP[0] + (($serverIP[1]) ? ":" + $serverIP[1] : "");
        var $mcAPISrvPocket = "https://api.mcsrvstat.us/2/" + $serverIP[0] + ":" + (($serverIP[1]) ? $serverIP[1] : "19132");
        var $mcAPIKeyubu = "https://api.keyubu.net/mc/ping.php?ip=" + $serverIP[0] + ":" + (($serverIP[1]) ? $serverIP[1] : "25565");
        // AJAX URL END
        
          if ($type == "mcAPIUs") {
            return $mcAPIUs;
          } else if ($type == "mcAPITc") {
            return $mcAPITc;
          } else if ($type == "mcAPIEu") {
            return $mcAPIEu;
          } else if ($type == "mcAPISrvJava") {
            return $mcAPISrvJava;
          } else if ($type == "mcAPISrvPocket") {
            return $mcAPISrvPocket;
          } else if ($type == "mcAPIKeyubu") {
            return $mcAPIKeyubu;
          } else {
            return $mcAPIUs;
          }
      }
      
      // AJAX
      $.ajax({
        url: createAjaxURL($APIType),
        dataType: "json",
        success: function(data) {
          if ($APIType == "mcAPIEu" || $APIType == "mcAPISrvJava" || $APIType == "mcAPISrvPocket" || $APIType == "mcAPIKeyubu") {
            var onlineServerStatus = data["online"];
            var onlineRow = data["players"]["online"];
          } else if ($APIType == "mcAPITc") {
            var onlineServerStatus = data["status"];
            var onlineRow = data["players"];
          } else {
            var onlineServerStatus = data["online"];
            var onlineRow = data["players"]["now"];
          }
          
          if (onlineServerStatus == true || ($APIType == 3 && onlineServerStatus != "offline")) {
              $onlineStatus.text(onlineRow);
          } else {
              $onlineStatus.text("0");
          }
        }
      });
      // AJAX END
    });
  }
})();

var CopyServerIP = (function() {
  var $copyip = $('[server-command="serverIPCopy"]');

  if ($copyip.length) {
    $copyip.each(function() {
      var clipboard = new ClipboardJS('[server-command="serverIPCopy"]');
      clipboard.on("success", function(e) {
        swal.fire({
            title: $languages["success"],
            text: $languages["editJSServerIPCopy"],
            icon: "success",
            confirmButtonColor: "#02b875",
            confirmButtonText: $languages["okey"]
        });
      });
    });
  }
})();

var DiscordServerOnlineStatus = (function() {
  var $onlineStatus = $('[server-command="discordServerOnlineStatus"]');
  var $discordServerName = $('[server-command="discordServerName"]');
  var $discordInstantInvite = $('[server-command="discordInstantInvite"]');

  if ($onlineStatus.length) {
    $onlineStatus.each(function() {
      var $onlineStatus = $(this);
      var widgetID = $onlineStatus.attr("discord-widget");
      
      var $ajaxURL = "https://discordapp.com/api/guilds/" + widgetID + "/embed.json";
      
      // AJAX
      $.ajax({
        url: $ajaxURL,
        dataType: "json",
        success: function(data) {
          var discordServerID = data["id"];
          var onlineCount = data["presence_count"];
          var serverName = data["name"];
          var inviteCode = data["instant_invite"];
          if (discordServerID == widgetID) {
          	// ONLINE STATUS
              $onlineStatus.text(onlineCount);
              
              // SERVER NAME
              $discordServerName.text(serverName);
              
              // INSTANT INVITE
              $discordInstantInvite.on("click", function() {
                window.open(inviteCode, '_blank');
              });
          } else {
              $onlineStatus.text("0");
              $discordServerName.text("-/-");
          }
        }
      });
      // AJAX END
    });
  }
})();

$(document).ready(function() {
  var $input = $('[data-toggle="searchAccount"]');
  
  $input.on("keypress", function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      var $searchAccount = $input.val();
      window.location.href = $links["player"] + "/" + $searchAccount;
    }
    e.stopPropagation();
  });
  
  
  if ($tawkToStatus == "1") {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/" + $tawkToID + "/default";
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();
  }
	
  $(".filter-bar").find("input[type='search']").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".filter-item--name").each(function() {
          var text = $(this).text().toLowerCase();
          $(".filter-item").addClass("filtering")
              if (text.search(value) == -1) {
                  $(this).parents(".filter-item").addClass("hidden")
              }else {
                  $(this).parents(".filter-item").removeClass("hidden")
              }
          setTimeout(() => {
              $(".filter-item").removeClass("filtering")
          }, 300);
      });
      $(".filter-category").each(function() {
          if ( $(this).find(".filter-item").length == $(this).find(".filter-item.hidden").length ) {
              if ($(this).find(".no-product-wrapper").length == 0) {
                  
                  $(this).append("<div class='lg:col-span-12 py-1 no-product-wrapper'></div>")
                  $(this).find(".no-product-wrapper").append("<div class=\"rounded-xl py-3 px-6  bg-red-500/25 text-red-500 flex gap-3 items-center mx-4 my-4\"><div class=\"flex items-center justify-center w-12 h-12 rounded-xl bg-red-400/50\"><i class=\"fas fa-times\"></i></div>"+ $languages["functionJSNotSearch"] +"</div>")
                  
                  elementMirror();
              }
          }else {
              if ($(this).find(".no-product-wrapper").length != 0) {
                  $(this).find(".no-product-wrapper").remove()
              }
          }
      });
  });

  var priceArray = [],
      positionArray = [];
  $(".filter-item").each(function() {
      var price = parseInt($(this).find(".filter-item--price").text(), 10),
          position = $(this).index();
      $(this).attr("filter-price", price)
      $(this).attr("filter-position", position)

      if ( !(priceArray.includes(price)) ) {
          priceArray.push(price)
      }

      if ( !(positionArray.includes(position)) ) {
          positionArray.push(position)
      }
  })


  $(".filter-bar").find("select").on("change", function() {
      var value = $(this).find(":selected").val();
      $(".filter-category").each(function() {
          if (value == "cheapest" || value == "most-expensive") {
              if (value == "cheapest") {
                  priceArray.sort(function(a, b){return b - a})
              }else if (value == "most-expensive") {
                  priceArray.sort(function(a, b){return a - b})
              }
              var array = priceArray;
              for (var i = 0; i < array.length; i++) {
                  var el = $(this).find("[filter-price='" + array[i] + "']" );
                  el.prependTo( $(this) )
              }
          }else if (value == "newest") {
              positionArray.sort(function(a, b){return b - a})
              var array = positionArray;
              for (var i = 0; i < array.length; i++) {
                  var el = $(this).find("[filter-position='" + array[i] + "']" );
                  el.prependTo( $(this) )
              }
          }
      });
  });
});

console.log("%c"+$languages["warning"]+"%c"+$languages["editJSConsoleLog"]+`%cMineXON All rights reserved © ${new Date().getFullYear()}`,"color: #ff0000; font-size: 32px; font-weight: 600; text-align: center; align-items: center; justify-content: center; margin-left: 12rem; position: relative; margin-bottom: 8px;","background-color: #ff0000; color: #ffffff; padding: 20px; border-radius: 10px; font-size: 16px; font-weight: bold","margin: 16px 0; border-radius: 10px; float: right; margin-left: 16rem");