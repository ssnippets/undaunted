var gURL = "http://a6bf8350.ngrok.io";

$(document).ready( function() {
  "use strict";
	var gKeyword = "root";
	
	getLocation();
	
	$("#input-textbox").focus();
  
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
		url: gURL + "/query",	
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

	var locationName = "";
	var locationAddr = "";
	getGeo(position.coords.latitude, position.coords.longitude, function(data) {
		if (data[0].name)
		{								
			locationName = data[0].name;	
		} else {
			locationName = 'Unknown Location';	
		}
		if (data[0].addr) 
		{								
			locationAddr = data[0].addr;	
		} else {
			locationAddr = 'Unknown Location';	
		}		
		$("#location").html(locationName + "<br>" + locationAddr);	
	});

}

function getGeo(lat, long, cb) {
	"use strict";

	$.ajax({
		url: gURL + "/contacts",	
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		processData: false,
		data: JSON.stringify( { lat: lat, lng: long } ),
		success: function(data) {
			cb(data);
		}, 
		error: function() {
			cb("Cannot get location");
		}		
	});	
}