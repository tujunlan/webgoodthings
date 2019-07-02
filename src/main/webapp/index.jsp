<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="commonviews/header.jsp" %>
    <!--themeControll-->
	
	<%@ include file="commonviews/page_header.jsp" %>

   <%-- <div class="intro" style="background-image: url(image/bg3.jpg);">
        <div class="dtable hw100">
            <div class="dtable-cell hw100">
                <div class="container text-center">
                    <h1 class="intro-title animated fadeInDown"> Find Classified Ads </h1>

                    <p class="sub animateme fittext3 animated fadeIn">
                        Find local classified ads on bootclassified in Minutes
                    </p>

                    <div class="row search-row animated fadeInUp">
                        <div class="col-xl-4 col-sm-4 search-col relative locationicon">
                            <i class="icon-location-2 icon-append"></i>
                            <input type="text" name="country" id="autocomplete-ajax"
                                   class="form-control locinput input-rel searchtag-input has-icon"
                                   placeholder="City/Zipcode..." value="">

                        </div>
                        <div class="col-xl-4 col-sm-4 search-col relative"><i class="icon-docs icon-append"></i>
                            <input type="text" name="ads" class="form-control has-icon"
                                   placeholder="I'm looking for a ..." value="">
                        </div>
                        <div class="col-xl-4 col-sm-4 search-col">
                            <button class="btn btn-primary btn-search btn-block btn-gradient"><i
                                    class="icon-search"></i><strong>Find</strong></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>--%>
    <!-- /.intro -->

    <div class="main-container">
        <div class="container">

            <div class="col-xl-12 content-box ">
                <div class="row row-featured row-featured-category">
                    <div class="col-xl-12  box-title no-border">
                        <div class="inner"><h2><span>浏览</span>
                            分类</h2>
                        </div>
                    </div>

                    <div class="col-xl-2 col-md-3 col-sm-3 col-xs-4 f-category">
                        <a href="book.jsp"><img src="image/category/car-2.jpg" class="img-responsive" alt="img">
                            <h6> 书单 </h6></a>
                    </div>

                    <div class="col-xl-2 col-md-3 col-sm-3 col-xs-4 f-category">
                        <a href="video.jsp"><img src="image/category/laptop-2.jpg" class="img-responsive"
                                                 alt="img"> <h6> 视频 </h6></a>
                    </div>

                    <div class="col-xl-2 col-md-3 col-sm-3 col-xs-4 f-category">
                        <a href="category.html"><img src="image/category/mobile.jpg" class="img-responsive" alt="img">
                            <h6> 音频 </h6></a>
                    </div>

                    <div class="col-xl-2 col-md-3 col-sm-3 col-xs-4 f-category">
                        <a href="category.html"><img src="image/category/tv.jpg" class="img-responsive" alt="img"> <h6>
                            学生用品 </h6></a>
                    </div>

                    <div class="col-xl-2 col-md-3 col-sm-3 col-xs-4 f-category">
                        <a href="category.html"><img src="image/category/hdd.jpg" class="img-responsive" alt="img">
                            <h6> 玩具 </h6></a>
                    </div>

                    <div class="col-xl-2 col-md-3 col-sm-3 col-xs-4 f-category">
                        <a href="property-list.html"><img src="image/category/house.jpg" class="img-responsive"
                                                          alt="img">
                            <h6> 周末好去处 </h6></a>
                    </div>
                </div>
            </div>

            <div style="clear: both"></div>

        </div>
    </div>
    <!-- /.page-info -->

    <div class="page-bottom-info">
        <div class="page-bottom-info-inner">

            <div class="page-bottom-info-content text-center">
                <h1>If you have any questions, comments or concerns, please call the Classified Advertising department
                    at (000) 555-5556</h1>
                <a class="btn  btn-lg btn-primary-dark" href="tel:+000000000">
                    <i class="icon-mobile"></i> <span class="hide-xs color50">Call Now:</span> (000) 555-5555 </a>
            </div>

        </div>
    </div>

    <?php include 'commonviews/footer.php';?>

</div>
<!-- /.wrapper -->

<!-- /.modal -->


<!-- Le javascript
================================================== -->
<%@ include file="commonviews/javascript.jsp" %>
<!-- include jquery autocomplete plugin  -->
<%--<script type="text/javascript" src="assets/scripts/index.js"></script>--%>
</body>
</html>
