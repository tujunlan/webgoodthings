var _limit  = 10;
var _pagenum = 3;
var _pageparam = {};
$(function () {
	initPage();
	getDefaultTags();
});

function initPage() {
	//点击切换大类
	$("body").on("click","ul[role='tablist'] li", function () {
		if(!$(this).hasClass("active")) {
			$("ul[role='tablist'] li").removeClass("active");
			$(this).addClass("active");
			$("#tag_list > ul").hide();
			$("#tag_list > ul").show();
			var ptag = $(this).find("a").attr("attr_nid");
			$("#tag_list > ul").removeClass("active");
			$("#tag_list > ul").hide();
			$("#p_tag_id_"+ptag).show();
			$("#p_tag_id_"+ptag).addClass("active");
			$("#breadcrumb_tags .breadcrumb-list").hide();
			$("#breadcrumb_list_"+ptag).show();
			
			$(".d-inline-b > div").hide();
			$("#page_nav_"+ptag).show();
		}
	});
	
	//表单提交搜索
	$("body").on("click","#form_search button", function () {
		$.each($("ul[role='tablist'] li"), function(i,n){
			var ptag = $(n).find("a").attr("attr_nid");
			var is_show = $(n).hasClass("active") ? true : false;
			getVideoByPtag(ptag, 1, is_show);
		});
	});
	
	//按标签搜索图书
	$("body").on("click",".child_tag", function () {
		getVideoByTags(1);
	});
}

var generateVideoList=function(data,param){
	var sHtml = '';
	var active_class = param.is_show ? "active" : "";
	sHtml += '<div class="tab-pane '+active_class+'" id="tag_result_'+param.ptag+'">';
	sHtml += '	<div class="adds-wrapper row no-margin">';
	$.each(data.data.items, function(i, n){
		sHtml += '    <div class="item-list">';
		sHtml += '       <div class="row">';
		sHtml += '            <div class="col-md-2 no-padding photobox">';
		sHtml += '                <div class="add-image"><a href="'+n.out_link+'" target="_blank"><img class="thumbnail no-margin" src="'+n.pic_link+'" alt="img"></a></div>';
		sHtml += '            </div>';
		sHtml += '           <div class="col-md-7 add-desc-box">';
		sHtml += '                <div class="ads-details">';
		sHtml += '                	<h5 class="add-title"><a href="'+n.out_link+'" target="_blank">'+webApp.myhtmlencode(n.video_name)+'</a></h5>';
		sHtml += '					<span class="info-row">';
/*		sHtml += '						<span class="add-type business-ads tooltipHere" data-toggle="tooltip" data-placement="right" title="Business Ads">B</span>';*/
		sHtml += '						<span class="item-location"> '+webApp.myhtmlencode(n.author)+'</span>';
		sHtml += '                    </span>';
		sHtml += '					<span class="info-row">';
		sHtml += '						<span class="category"> '+webApp.myhtmlencode(n.press)+'</span>';
		sHtml += '                  </span>';
		sHtml += '                </div>';
		sHtml += '            </div>';
		sHtml += '            <div class="col-md-3 text-right  price-box">';
		sHtml += '                <h2 class="item-price"></h2>';
		sHtml += '                <a class="btn btn-danger  btn-sm make-favorite"> <i class="fa fa-certificate"></i><span>点赞</span></a>';
		sHtml += '                <a class="btn btn-secondary  btn-sm make-favorite"> <i class="fa fa-heart"></i>  <span>收藏</span></a>';
		sHtml += '            </div>';
		sHtml += '        </div>';
		sHtml += '	</div>';
		sHtml += '    <!--/.item-list-->';
	});
	sHtml += '    </div>';
	sHtml += '</div>';
	return sHtml;
}
var callBackGetVideoByPtag = function(data, param){
	var sHtml = generateVideoList(data,param);
	$("#tags_"+param.ptag+" span").text(data.data.total);
	if($("#tag_result_"+param.ptag).length){
		$("#tag_result_"+param.ptag).remove();
	}
	if($("#breadcrumb_list_"+param.ptag).length){
		$("#breadcrumb_list_"+param.ptag).html('<a href="javascript:void(0);" class="current"><span>所有标签</span></a>');
	} else {
		var tagHtml = '<div class="breadcrumb-list" id="breadcrumb_list_'+param.ptag+'" style="display:'+(param.is_show ? "" : "none")+'">标签：<a href="javascript:void(0);" class="current"><span>所有标签</span></a></div>';
		$("#breadcrumb_tags").append(tagHtml);
	}
	if($("#page_nav_"+param.ptag).length){
		$("#page_nav_"+param.ptag).empty();
	} else {
		$(".d-inline-b").append('<div id="page_nav_'+param.ptag+'"></div>');
	}
	if(param.is_show){
		$("#page_nav_"+param.ptag).show();
	} else {
		$("#page_nav_"+param.ptag).hide();
	}

	//分页
	var p = new ShowPage();
	p.CurrPage = parseInt(param.page);
	$("#page_nav_"+param.ptag).html(p.show(data.data.total, _limit, _pagenum));
	bindPage();

	$(".tab-content").append(sHtml);
};
var callBackGetVideoByTag = function(data, param){
	var ptag = $("ul[role='tablist'] li.active a").attr("attr_nid");
    param.ptag = ptag;
    param.is_show = true;
	var sHtml = generateVideoList(data,param);
	_pageparam["ptag"+ptag] = {"type":"tags"};
	$("#tags_"+param.ptag+" span").text(data.data.total);

	if($("#tag_result_"+param.ptag).length){
		$("#tag_result_"+param.ptag).remove();
	}
	$(".tab-content").append(sHtml);
    //分页
    var p = new ShowPage();
    p.CurrPage = parseInt(param.page);
    $("#page_nav_"+param.ptag).html(p.show(data.data.total, _limit, _pagenum));
    bindPage();
};

var callBackDefaultTags = function(data){
	var sHtml = '';
	$.each(data.data.items, function(i, n){
		sHtml += '<li class="'+(i==0?'active':'')+' nav-item">';
		sHtml += '	<a href="#tag_result_'+n.id+'" id="tags_'+n.id+'" role="tab" data-toggle="tab" class="nav-link" attr_nid="'+n.id+'">'+webApp.myhtmlencode(n.name)+' <span class="badge badge-pill badge-secondary"></span></a>';
		sHtml += '</li>';
		getChildTags(n.id, n.name, i);
		if(i == 0) {
			getVideoByPtag(n.id, 1, true);
		} else {
			getVideoByPtag(n.id, 1, false);
		}
		_pageparam["ptag"+n.id] = {"type":"all"};
	});
	$("ul[role='tablist']").html(sHtml);
};

var callBackChildrenTag = function(data, param){
	var sHtml = '<ul class=" list-unstyled long-list">';
	$.each(data.data.items, function(i, n){
		sHtml += '<li><a href="javascript:void(0)" class="clearflex"><input type="checkbox" value="'+n.id+'" id="child_tag_id_'+n.id+'" class="child_tag"> <label for="child_tag_id_'+n.id+'">'+webApp.myhtmlencode(n.name)+'<label></a></li>';
	});
	sHtml += '</ul>';
	var p_tag_id = param.p_tag_id;
	$("#p_tag_id_"+p_tag_id+" li:eq(0)").append(sHtml);
};

//按大类搜索图书
function getVideoByPtag(ptag, page, is_show) {
	var keyword = $.trim($("#form_search input[type='text']").val());
	var urlStr = 'video/all_videos?video_name='+encodeURIComponent(keyword)+'&ptag='+ptag+'&page='+page+'&limit='+_limit;
	var dataJson = {};
	webApp.postRequest(urlStr, dataJson, callBackGetVideoByPtag, {"ptag":ptag, "is_show":is_show, "page":page});
}

//获取默认大分类
function getDefaultTags() {
	var urlStr = 'goods/default_tags?category_id=' + webApp.video_category_id;
	var dataJson = {};
	webApp.postRequest(urlStr, dataJson, callBackDefaultTags);
}

//获取默认子标签
function getChildTags(p_tag_id, p_tag_name, n) {
	var sHtml = '';
	sHtml += '<ul class=" list-unstyled '+(n==0?'active':'')+'" style="display:'+(n==0?'':'none')+';" id="p_tag_id_'+p_tag_id+'">';
	sHtml += '	<li><a href="javascript:void(0);"><span class="title"><strong>'+webApp.myhtmlencode(p_tag_name)+'</strong></span></a></li>';
	//sHtml += '	<li style="height:40px;"><button class="btn btn-default pull-right btn-block-md tag-search" type="button">搜一搜</button></li>';
	sHtml += '</ul>';
	$("#tag_list").append(sHtml);
	var urlStr = 'goods/children_tags?p_tag_id=' + p_tag_id;
	var dataJson = {};
	webApp.postRequest(urlStr, dataJson, callBackChildrenTag, {"p_tag_id":p_tag_id});
}

//按标签搜索图书
function getVideoByTags(page) {
	var obj = $("#tag_list ul.active");
	// if(obj.find("input[type='checkbox']:checked").length) {
		var arr_tag_id = [], arr_tag_name = [];
		$.each(obj.find("input[type='checkbox']:checked"), function(i,n){
			arr_tag_id.push(n.value);
			arr_tag_name.push($(n).next("label").text());
		});
		var tag_ids = '';
		if (arr_tag_id.length > 0) {
			tag_ids=arr_tag_id.join(",");
		}else{
			tag_ids = $("ul[role='tablist'] li.active a").attr("attr_nid");
		}
		var urlStr = 'video/tags_videos?tag_ids='+tag_ids+'&page='+page+'&limit=' + _limit;
		var dataJson = {};
        webApp.postRequest(urlStr, dataJson, callBackGetVideoByTag, {"page":page});
		
		var tagHtml = '标签：';
		$.each(arr_tag_name, function(i, n){
			tagHtml += '<a href="javascript:void(0);" class="current"><span>'+webApp.myhtmlencode(n)+'</span></a>';
		});
		$(".breadcrumb-list:visible").html(tagHtml);
	// }
}

function bindPage(){
	$(".pagination a").each(function() {
		$(this).bind("click", function(){
			if(typeof $(this).attr("page") != 'undefined') {
				doPage($(this).attr("page"));
			}
		})
	});
}

function doPage(page){
	var ptag = $("ul[role='tablist'] li.active a").attr("attr_nid");
	var param = _pageparam["ptag"+ptag];
	if(param.type == "all") {
		//按书名+大类查询
		getVideoByPtag(ptag, page, true);
	} else {
		//按标签查询
		getVideoByTags(page);
	}
}

