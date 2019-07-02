<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="commonviews/header.jsp" %>

	<%@ include file="commonviews/page_header.jsp" %>
    <div class="search-row-wrapper" style="background-image: url(image/bg.jpg)">
    	<div class="inner">
    	<div class="container ">
    		<form action="#" method="GET" id="form_search">
    			<div class="row">
    				<div class="col-md-8">
    					<input class="form-control keyword" type="text" placeholder="请填写搜索词">
    				</div>
    				<div class="col-md-4">
    					<button class="btn btn-block btn-primary btn-gradient"> Search <i class="fa fa-search"></i>
    					</button>
    				</div>
    			</div>
    		</form>
    	</div>
    	</div>
    </div>
    <!-- /.search-row -->
    <div class="main-container">
        <div class="container">
            <div class="row">
                <!-- this (.mobile-filter-sidebar) part will be position fixed in mobile version -->
                <div class="col-md-3 page-sidebar mobile-filter-sidebar">
                    <aside>
                        <div class="sidebar-modern-inner">
                            <div class="block-title has-arrow sidebar-header">
                                <h5><a href="#">所有标签</a></h5>
                            </div>
                            <div class="block-content categories-list list-filter" id="tag_list">
                            </div>  <!--/.categories-list-->
                            <div style="clear:both"></div>
                        </div>
                        <!--/.categories-list-->
                    </aside>
                </div>
                <!--/.page-side-bar-->
                <div class="col-md-9 page-content col-thin-left">
                    <div class="category-list ">
                        <div class="tab-box ">
                            <!-- Nav tabs -->
                            <ul class="nav nav-tabs add-tabs tablist" role="tablist"></ul>
<%--                            <div class="tab-filter">
                                <select title="sort by" class="selectpicker select-sort-by" data-style="btn-select"
                                        data-width="auto">
                                    <option>排序</option>
                                    <option>点赞数</option>
                                    <option>拥有数</option>
                                </select>
                            </div>--%>
                        </div>
                        <!--/.tab-box-->
                        <div class="listing-filter">
                            <div class="pull-left col-xs-6" id="breadcrumb_tags"></div>
                            <div class="pull-right col-xs-6 text-right listing-view-action"><span
                                    class="list-view active"><i class="  icon-th"></i></span> <span
                                    class="compact-view"><i class=" icon-th-list  "></i></span> <span
                                    class="grid-view "><i class=" icon-th-large "></i></span></div>
                            <div style="clear:both"></div>
                        </div>
                        <!--/.listing-filter-->

                        <!-- Mobile Filter bar-->
                        <div class="mobile-filter-bar col-xl-12  ">
                            <ul class="list-unstyled list-inline no-margin no-padding">
                                <li class="filter-toggle">
                                    <a class="">
                                        <i class="  icon-th-list"></i>
                                        Filters
                                    </a>
                                </li>
<%--                                <li>
                                    <div class="dropdown"> <a data-toggle="dropdown" class="dropdown-toggle"> Short

                                        by </a>
                                        <ul class="dropdown-menu">
                                            <li class="dropdown-item"><a href="" rel="nofollow">Relevance</a>
                                            </li>
                                            <li class="dropdown-item"><a href="" rel="nofollow">Date</a>
                                            </li>
                                            <li class="dropdown-item"><a href="" rel="nofollow">Company</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>--%>
                            </ul>
                        </div>
                        <div class="menu-overly-mask"></div>
                        <!-- Mobile Filter bar End-->
                        <div class="tab-content"></div>
                    </div>

                    <div class="pagination-bar text-center">
                    	<nav aria-label="Page navigation " class="d-inline-b"></nav>
                    </div>
                    <!--/.pagination-bar -->

<%--                    <div class="post-promo text-center">
                        <h2> Do you get anything for sell ? </h2>
                        <h5>Sell your products online FOR FREE. It's easier than you think !</h5>
                        <a href="post-ads.html" class="btn btn-lg btn-border btn-post btn-danger">Post a Free Ad </a>
                    </div>--%>
                    <!--/.post-promo-->
                </div>
                <!--/.page-content-->

            </div>
        </div>
    </div>
    <!-- /.main-container -->
	<%--<%@ include file="commonviews/footer.jsp" %>--%>
</div>
<!-- /.wrapper -->

<!-- Le javascript
================================================== -->
<%@ include file="commonviews/javascript.jsp" %>
<script type="text/javascript" src="assets/scripts/book.js"></script>
</body>
</html>
