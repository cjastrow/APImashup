function searchIt(){
	var str = $('#typeBox').val();
	if( str == ""){
	
		alert("You must type something before searching.");
	
	} 

	else {
		$("#pat").css('display','inline');
		$("#pat").animate({left:'-7000px'},120000, 'linear');

		//unsplash api request <<<<<<
		var unsplash = 'https://api.unsplash.com/photos/?client_id=d8ba850a24e78fb254312b97c575e9dac5e07887bb961e906d0f5f681cf8df6a&query=' + str;

		$.getJSON(unsplash, function(pictureInfo){
	    	var created_at = pictureInfo[0].created_at;
	    	var dateY = created_at.substring(0, 4);
	    	var dateDM = created_at.substring(5, 10);
	    	var time = created_at.substring(11, 16);	
			$("#bigPicture").css('background-image','url(' + pictureInfo[0].urls.regular + ')')
			$("#image").css('background-image', 'url(' + pictureInfo[0].urls.regular + ')');
			$("#imageName").html('Created on <span style="color: white">' + dateDM + '-' + dateY + '</span>, at <span style="color: #555">' + time + '</span>');
		});
		//>>>>>>

		//itunes api request <<<<<<
		var itunes = 'https://itunes.apple.com/search?term=' + str;

		$.getJSON(itunes, function(songInfo){
			var name = songInfo.results[0].trackName.toUpperCase();
			$("#songName").html('<span style="color: blue">' + name + '</span> <br /> <span style="font-family: arial">By</span> ' + songInfo.results[0].artistName)
		});
		//>>>>>>

		$("#imageResult").animate({opacity:'1'},1000);
		$("#songResult").animate({opacity:'1'},1000);

	}
};


var music = "play";
var sub = document.getElementById('sub');
sub.volume = .2;

$("#songControl").click(function(){
	if(music === "play"){
		$("#songControl").css('background-image','url(Images/Pause.png)');
		$("#songControl").css('background-color','#FF0D0D');
		$("#playing").animate({left:'40px',opacity:'1'});
		sub.currentTime = 0;
		sub.play();
		music = "stop";
	}
	else if(music === "stop"){
		$("#songControl").css('background-image','url(Images/Play.png)');
		$("#songControl").css('background-color','#00DB04');
		$("#playing").animate({left:'20px',opacity:'0'});
		sub.pause();
		music = "play";
	}
});

$("#searchBtn").click(function (){
	searchIt();
})


$(document).keypress(function(e) {
	if(e.which == 13) {
	    searchIt();
	}
});


$("#image").click(function(){
	$("#cover").css('display','inline');
})

$("#cover").click(function(){
	$("#cover").css('display','none');
})
