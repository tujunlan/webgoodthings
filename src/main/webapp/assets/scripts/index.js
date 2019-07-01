
$(function () {
	initHotBook();
	initHotVideo();
	initHotAudio();
});

var callBackHotBook = function(data){
	var sHtml = '';
	$.each(data.data.items, function(i, n){
		sHtml += '<div class="col-xl-2 col-md-3 col-sm-3 col-xs-4 f-category">';
		sHtml += '	<a href="'+n.out_link+'" target="_blank"><img src="'+n.pic_link+'" class="img-responsive" alt="img">';
		sHtml += '		<h6>'+webApp.myhtmlencode(n.book_name)+'</h6></a>';
		sHtml += '</div>';
	});
	$("#hot_book").append(sHtml);
};

var callBackHotVideo = function(data){
	var sHtml = '';
	$.each(data.data.items, function(i, n){
		sHtml += '<div class="col-xl-2 col-md-3 col-sm-3 col-xs-4 f-category">';
		sHtml += '	<a href="videoDetail.jsp?id='+n.id+'"><img src="'+n.pic_link+'" class="img-responsive" alt="img">';
		sHtml += '		<h6>'+webApp.myhtmlencode(n.video_name)+'</h6></a>';
		sHtml += '</div>';
	});
	$("#hot_video").append(sHtml);
};

var callBackHotAudio = function(data){
	var sHtml = '';
	$.each(data.data.items, function(i, n){
		sHtml += '<div class="col-xl-2 col-md-3 col-sm-3 col-xs-4 f-category">';
		sHtml += '	<a href="audioDetail.jsp?id='+n.id+'"><img src="'+n.pic_link+'" class="img-responsive" alt="img">';
		sHtml += '		<h6>'+webApp.myhtmlencode(n.book_name)+'</h6></a>';
		sHtml += '</div>';
	});
	$("#hot_audio").append(sHtml);
};

//热门图书
function initHotBook() {
	var urlStr = 'book/all_books?book_name=&page=1&limit=12';
	var dataJson = {};
	webApp.postRequest(urlStr, dataJson, callBackHotBook);
}

//热门视频
function initHotVideo() {
	var urlStr = 'video/all_videos?video_name=&page=1&limit=12';
	var dataJson = {};
	webApp.postRequest(urlStr, dataJson, callBackHotVideo);
}

//热门音频
function initHotAudio() {
	var urlStr = 'audio/all_audios?audio_name=&page=1&limit=12';
	var dataJson = {};
	webApp.postRequest(urlStr, dataJson, callBackHotAudio);
}




