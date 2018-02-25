$(document).ready( function() {
  "use strict";
	var gKeyword = "root";
	
	getLocation();
	
	//$("#input-textbox").focus();
  
  $("#send-button").click(function(){
    var msg = $("#input-textbox").val();

		
		if (msg === '')
		{ 
			return;
		}
         
    var chatLine = '<li class="chat-list-item"><div class="frame-right"><div class="user-msg">' + msg + '</div><div class="user-msg-arrow"></div></div></li>'; 
    $("#input-textbox").val('');
    $("#chat-list").append(chatLine);
    
    getResponse(msg, gKeyword, function(data) { 
			if (data.response)
			{
				chatLine = '<li class="chat-list-item"><div class="frame-left"><div class="msg-frame"><div class="bot-msg">' + data.response + '</div></div><div class="bot-msg-arrow"></div></div></li>';	
			} else {
				chatLine = '<li class="chat-list-item"><div class="frame-left"><div class="bot-msg">No Answer.</div><div class="bot-msg-arrow"></div></div></li>';	
			}
			$("#chat-list").append(chatLine);	

			gKeyword = data.keyword;
			scrollToBottom();
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

function getResponse(msg, keyword, cb) {
	"use strict";

	$.ajax({
		url: "/api/query",	
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		processData: false,
		data: JSON.stringify( { query: msg, keywords: [ keyword ] } ),
		success: function(data) {
			cb(data);
		}, 
		error: function() {
			cb("Cannot get data");
		}		
	});	
}

function scrollToBottom() {
	"use strict";
	var chatHeight = $("#chat-list").prop("scrollHeight");
	$("#chat-list").scrollTop(chatHeight);
}

function getLocation() {
	"use strict";
	if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
	} else {
			$("#location").html("Geolocation is not supported by this browser.");
	}
}
function showPosition(position) {
	"use strict";
	$("#location").html("Latitude: " + position.coords.latitude + 
	"<br>Longitude: " + position.coords.longitude); 
}
