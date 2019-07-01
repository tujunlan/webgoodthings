/**
* @Author:Wyan
* @Date:2010/9/16
*/
var Class = {
	create: function() {
		return function() { this.initialize.apply(this, arguments); }
	}
}
var ShowPage = Class.create();
ShowPage.prototype = {
	//容器对象，滑块
	initialize: function() {
		this.url="";
		this.re="";
		this.CurrentPagere=1;
		this.FirstPageUrl="";
		this.PrevPageUrl="";
		this.NextPageUrl="";
		this.LastPageUrl="";
		this.CurrPage=1;
		this.PageCount=0;
		this.prevpage=0;
		this.nextpage=0;
		this.PageStart=0;
		this.PageEnd=0;
		this.ipage=0;
	},
	CheckNum:function(str,num){
		str=""+str;
		if (str.length>=1) {
			mynum=parseInt(str);
			if (isNaN(mynum)) {
				mynum=num;
			}
		}
		else {
			mynum=num;
		}
		return (mynum);
	},
	CheckPage:function(iPageCount){
		this.url = this.url+'/page_';
		this.url = this.url.replace("?&","?");
		this.url = this.url.replace("&&","&");
		this.ipage = document.iform.Page.value;
		this.ipage = this.CheckNum(this.ipage,1);
		if (this.ipage>iPageCount)	 {
			this.ipage=iPageCount;
		}
		else if (this.ipage<1)	 {
			this.ipage=1;
		}
		else {
			this.ipage=this.ipage;
		}
		document.iform.action = this.url+this.ipage;
		document.iform.submit();
	},
	show:function(RecCount,RecPerPage,PageNum){
		if (RecCount%RecPerPage==0) {
			this.PageCount=RecCount/RecPerPage;
		}
		else {
			this.PageCount=(parseInt(RecCount/RecPerPage)+1);
		}
		if (this.PageCount<=1) {
			this.PageCount=1;
		}
		if(this.CurrPage>this.PageCount)
		{
			window.location.href = this.url+"page_"+this.PageCount;
			return;
		}
		this.prevpage = parseInt(this.CurrPage-1);
		if (this.prevpage<1) {
			this.prevpage=1;
		}
		this.nextpage = parseInt(this.CurrPage+1);
		if (this.nextpage>this.PageCount) {
			this.nextpage = this.PageCount;
		}
		if (this.CurrPage<=1&&this.PageCount==1) {
			this.CurrPage=1;
			this.FirstPageUrl="<li class=\"page-item prev disabled\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"First\"><i class=\"fa fa-angle-double-left\"></i></a></li>";
			this.PrevPageUrl="<li class=\"page-item prev disabled\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"Prev\"><i class=\"fa fa-angle-left\"></i></a></li>";
			this.NextPageUrl="<li class=\"page-item next disabled\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"Next\"><i class=\"fa fa-angle-right\"></i></a></li>";
			this.LastPageUrl="<li class=\"page-item next disabled\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"Last\"><i class=\"fa fa-angle-double-right\"></i></a></li>";
		}
		else if (this.CurrPage<=1) {
			this.CurrPage=1;
			this.FirstPageUrl="<li class=\"page-item prev disabled\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"First\"><i class=\"fa fa-angle-double-left\"></i></a></li>";
			this.PrevPageUrl="<li class=\"page-item prev disabled\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"Prev\"><i class=\"fa fa-angle-left\"></i></a></li>";
			this.NextPageUrl="<li class=\"page-item next\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"Next\" page=\""+this.nextpage+"\"><i class=\"fa fa-angle-right\"></i></a></li>";
			this.LastPageUrl="<li class=\"page-item next\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"Last\" page=\""+this.PageCount+"\"><i class=\"fa fa-angle-double-right\"></i></a></li>";
		}
		else if (this.CurrPage>=this.PageCount) {
			this.CurrPage = this.PageCount;
			this.FirstPageUrl="<li class=\"page-item prev\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"First\" page=\"1\"><i class=\"fa fa-angle-double-left\"></i></a></li>";
			this.PrevPageUrl="<li class=\"page-item prev\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"Prev\" page=\""+this.prevpage+"\"><i class=\"fa fa-angle-left\"></i></a></li>";
			this.NextPageUrl="<li class=\"page-item next disabled\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"Next\"><i class=\"fa fa-angle-right\"></i></a></li>";
			this.LastPageUrl="<li class=\"page-item next disabled\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"Last\"><i class=\"fa fa-angle-double-right\"></i></a></li>";
		}
		else {
			this.CurrPage = this.CurrPage;
			this.FirstPageUrl="<li class=\"page-item prev\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"First\" page=\"1\"><i class=\"fa fa-angle-double-left\"></i></a></li>";
			this.PrevPageUrl="<li class=\"page-item prev\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"Prev\" page=\""+this.prevpage+"\"><i class=\"fa fa-angle-left\"></i></a></li>";
			this.NextPageUrl="<li class=\"page-item next\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"Next\" page=\""+this.nextpage+"\"><i class=\"fa fa-angle-right\"></i></a></li>";
			this.LastPageUrl="<li class=\"page-item next\"><a href=\"javascript:void(0);\" class=\"page-link\" title=\"Last\" page=\""+this.PageCount+"\"><i class=\"fa fa-angle-double-right\"></i></a></li>";
		}
		if (this.CurrPage-PageNum<=1) {
			this.PageStart=1;
		}
		else {
			this.PageStart = this.CurrPage-PageNum;
		}
		if (this.CurrPage+PageNum>=this.PageCount) {
			this.PageEnd = this.PageCount;
		}
		else {
			this.PageEnd = this.CurrPage+PageNum;
		}
		var returnStr = '';
		returnStr += "<ul class=\"pagination\" style=\"visibility: visible;\">";
		if(parseInt(RecCount)>0 && parseInt(RecCount) > parseInt(RecPerPage))
		{
			returnStr += this.FirstPageUrl+this.PrevPageUrl;
			for (i=this.PageStart;i<=this.PageEnd;i++) {
				if (i==this.CurrPage) {
					returnStr += "<li class=\"page-item active\"><a href=\"javascript:;\" class=\"page-link\">"+i+"</a></li>";
				}
				else {
					returnStr += "<li class=\"page-item\"><a href=\"javascript:;\" page=\""+i+"\" class=\"page-link\">"+i+"</a></li>";
				}
			}
			returnStr += this.NextPageUrl+this.LastPageUrl;
		}
		returnStr += "</ul>";
		if(typeof(returnType)!="undefined")
		{
			document.write(returnStr);
		}
		else
		{
			return returnStr;
		}
	},
	showInfo:function(RecCount,RecPerPage,PageNum){
		if (RecCount%RecPerPage==0) {
			this.PageCount=RecCount/RecPerPage;
		}
		else {
			this.PageCount=(parseInt(RecCount/RecPerPage)+1);
		}
		if (this.PageCount<=1) {
			this.PageCount=1;
		}
		if(this.CurrPage>this.PageCount)
		{
			window.location.href = this.url+"page_"+this.PageCount;
			return;
		}
		this.prevpage = parseInt(this.CurrPage-1);
		if (this.prevpage<1) {
			this.prevpage=1;
		}
		this.nextpage = parseInt(this.CurrPage+1);
		if (this.nextpage>this.PageCount) {
			this.nextpage = this.PageCount;
		}
		if (this.CurrPage<=1&&this.PageCount==1) {
			this.CurrPage=1;
		}
		else if (this.CurrPage<=1) {
			this.CurrPage=1;
		}
		else if (this.CurrPage>=this.PageCount) {
			this.CurrPage = this.PageCount;
		}
		else {
			this.CurrPage = this.CurrPage;
		}
		if (this.CurrPage-PageNum<=1) {
			this.PageStart=1;
		}
		else {
			this.PageStart = this.CurrPage-PageNum;
		}
		if (this.CurrPage+PageNum>=this.PageCount) {
			this.PageEnd = this.PageCount;
		}
		else {
			this.PageEnd = this.CurrPage+PageNum;
		}
		var returnStr = '';
		returnStr += "<span>页次:"+this.CurrPage+"/"+this.PageCount+"页</span>";
		returnStr += "<span style=\"padding:0 5px;\">每页"+RecPerPage+"条</span>";
		returnStr += "<span>共"+RecCount+"条记录</span>";
		return returnStr;
	}
};
