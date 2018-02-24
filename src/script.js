var bgColor = "white";

$(document).ready( function() {
  "use strict";
	
	$("#input-textbox").focus();
  
  $("#send-button").click(function(){
    var userName = "You" + ":";
    var msg = $("#input-textbox").val();
         
    var lineColor = getListItemColor();

    var chatLine = '<li class="' + lineColor + '"><div class="userName red">' + userName +'</div><div class="msg">' + msg + '</div></li>'; 
    $("#input-textbox").val('');
    $("#chat-list").append(chatLine);
    
    userName = "Bot" + ":";
    lineColor = getListItemColor();
    var response = getResponse(msg, function(data) { 
			chatLine = '<li class="' + lineColor + '"><div class="userName blue">' + userName +'</div><div class="msg">' + data.response + '</div></li>';
			$("#chat-list").append(chatLine);		
		});
		

  });
  
  $("#input-textbox").keydown(
    function (e) {
      if (e.keyCode === 13) {
        $("#send-button").click();
        return false;
    	}	
		}
	);
});

function getListItemColor() {
	"use strict";
  var listItemColor;
  if (bgColor === "white") {
    listItemColor = "chat-list-item white";
    bgColor = "gray";
  } else {
    listItemColor = "chat-list-item gray";
    bgColor = "white";
  } 
  return listItemColor;
}

function getResponse(msg, cb) {
	"use strict";

	$.ajax({
		url: "http://d5b5e702.ngrok.io/query",	
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		processData: false,
		data: JSON.stringify( { query: msg, keywords: [] } ),
		success: function(data) {
			cb(data);
		}, 
		error: function() {
			cb("Cannot get data");
		}		
	});	
}
