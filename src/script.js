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
    
		
		
    var chatLine = '<div class="frame"><div class="full"><div class="ans-text">' + msg + '</div></div><div class="ans-arrow"></div></div>'; 
    $("#input-textbox").val('');
    $("#chat-list").append(chatLine);
    
    getResponse(msg, gKeyword, function(data) { 
			if (data.response)
			{								
				chatLine = '<div class="frame"><div class="full"><div class="question-text">' + data.response + '</div></div><div class="question-arrow"></div></div>';	
			} else {
				chatLine = '<div class="frame"><div class="full"><div class="question-text">No Answer.</div></div><div class="question-arrow"></div></div>';	
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
		url: "http://d5b5e702.ngrok.io/query",	
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
