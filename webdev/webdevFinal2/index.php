<?php
session_start();
?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="description" content="">
        <meta name="author" content="">

        <title>Virtual Volumes Home</title>
        <!-- CSS FILES -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700;900&display=swap" rel="stylesheet">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/bootstrap-icons.css" rel="stylesheet">
        <link rel="stylesheet" href="css/slick.css"/>
        <link href="css/tooplate-little-fashion.css" rel="stylesheet">
    </head>
      
    <body>

        <section class="preloader">
            <div class="spinner">
                <span class="sk-inner-circle"></span>
            </div>
        </section>
    
        <main>

            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <a class="navbar-brand" href="index.php">
                        <strong><span>Virtual</span>Volumes</strong>
                    </a>

                    <div class="d-lg-none">
                        <?php if (isset($_SESSION['email'])): ?>
                            <span class="navbar-text">Welcome: <?php echo htmlspecialchars($_SESSION['email']); ?></span>
                            <a href="logout.php" class="btn btn-link ms-3">Logout</a>
                            <a href="cart.html" class="bi-bag custom-icon"></a>
                        <?php else: ?>
                            <a href="sign-in.html" class="bi-person custom-icon me-3"></a>
                            <a href="cart.html" class="bi-bag custom-icon"></a>
                        <?php endif; ?>
                    </div>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item">
                                <a class="nav-link active" href="index.php">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="about.html">Story</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="products.html">Products</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="game.html">Game</a>
                            </li>
                        </ul>

                        <form class="d-flex ms-3" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn custom-search-button" type="submit">
                                <i class="bi bi-search"></i>
                            </button>
                        </form>

                        <div class="d-none d-lg-block">
                            <?php if (isset($_SESSION['email'])): ?>
                                <span class="navbar-text">Welcome: <?php echo htmlspecialchars($_SESSION['email']); ?></span>
                                <a href="logout.php" class="btn btn-link ms-3">Logout</a>
                                <a href="cart.html" class="bi-bag custom-icon"></a>
                            <?php else: ?>
                                <a href="sign-in.html" class="bi-person custom-icon me-3"></a>
                                <a href="cart.html" class="bi-bag custom-icon"></a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </nav>
        
            <!-- Rest of your HTML content -->
            <section class="slick-slideshow">   
                <div class="slick-custom">
                    <img src="images/header/bookshelf.jpeg" class="img-fluid" alt="">

                    <div class="slick-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6 col-10">
                                    <h1 class="slick-title">Books</h1>

                                    <p class="lead text-white mt-lg-3 mb-lg-5">Books of all genres.</p>
                          
                                    <a href="products.html" class="btn custom-btn">Shop</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slick-custom">
                    <img src="images/header/bookspread2.jpg" class="img-fluid" alt="" style="min-height: 400px;">

                    <div class="slick-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6 col-10">
                                    <h1 class="slick-title">A Positive Mission</h1>

                                    <p class="lead text-white mt-lg-3 mb-lg-5">Our mission is to build a community centered around books. We sell books at low prices so all can access. </p>

                                    <a href="about.html" class="btn custom-btn">About us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slick-custom">
                    <img src="images/header/aigeneratedgame.png" class="img-fluid" alt="">

                    <div class="slick-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6 col-10">
                                    <h1 class="slick-title">Have Some Fun</h1>

                                    <p class="lead text-white mt-lg-3 mb-lg-5">Try out our new game and win some prizes!</p>

                                    <a href="#" class="btn custom-btn">Play</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>


            <section class="about section-padding">
                <div class="container">
                    <div class="row">

                        <div class="col-12 text-center">
                            <h2 class="mb-5">Welcome to <span>Virtual</span>Volumes</h2>
                        </div>

                        <div class="col-lg-2 col-12 mt-auto mb-auto">
                            <ul class="nav nav-pills mb-5 mx-auto justify-content-center align-items-center" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Introduction</button>
                                </li>

                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-youtube-tab" data-bs-toggle="pill" data-bs-target="#pills-youtube" type="button" role="tab" aria-controls="pills-youtube" aria-selected="true">History</button>
                                </li>

                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-skill-tab" data-bs-toggle="pill" data-bs-target="#pills-skill" type="button" role="tab" aria-controls="pills-skill" aria-selected="false">Why Read?</button>
                                </li>
                            </ul>
                        </div>

                        <div class="col-lg-10 col-12">
                            <div class="tab-content mt-2" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                    <div class="row">
                                        <div class="col-lg-7 col-12">
                                            <img src="images/studyingdesk.jpg" class="img-fluid" alt="">
                                        </div>

                                        <div class="col-lg-5 col-12">
                                            <div class="d-flex flex-column h-100 ms-lg-4 mt-lg-0 mt-5">
                                                <h4 class="mb-3">Helping <span>you </span> <br>Achieve <span>your</span> reading goals</h4>

                                                <p>We want to help you access the tools you need to reach your goals. Books are too expensive these days but we're working to find a solution.</p>

                                                <p>Play our new game for the chance to win discounts!</p>

                                                <div class="mt-2 mt-lg-auto">
                                                    <a href="game.html" class="custom-link mb-2">
                                                        Play our game
                                                        <i class="bi-arrow-right ms-2"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane fade" id="pills-youtube" role="tabpanel" aria-labelledby="pills-youtube-tab">

                                    <div class="row">
                                        <div class="col-lg-7 col-12">
                                            <div class="ratio ratio-16x9">
                                                <img src="images/librarystacks.jpg" class="img-fluid" alt="Library stacks image">
                                            </div>
                                        </div>

                                        <div class="col-lg-5 col-12">
                                            <div class="d-flex flex-column h-100 ms-lg-4 mt-lg-0 mt-5">
                                                <h4 class="mb-3">Our Story</h4>

                                                <p>Founded in 2024, our store is constantly growing to meet the needs of readers around the world.</p>

                                                <p>Like everything else, books are becoming more and more expensive, which means they are becoming less and less accessible. We are trying to solve this problem.</p>

                                                <div class="mt-2 mt-lg-auto">
                                                    <a href="about.html" class="custom-link mb-2">
                                                        Learn more about us
                                                        <i class="bi-arrow-right ms-2"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane fade" id="pills-skill" role="tabpanel" aria-labelledby="pills-skill-tab">
                                    <div class="row">
                                        <div class="col-lg-7 col-12">
                                            <img src="images/readingflower.jpg" class="img-fluid" alt="">
                                        </div>

                                        <div class="col-lg-5 col-12">
                                            <div class="d-flex flex-column h-100 ms-lg-4 mt-lg-0 mt-5">
                                                <h4 class="mb-3">Reading is Important!!</h4>

                                                <p>Read because...</p>

                                                <div class="skill-thumb mt-3">

                                                    <strong>Reading for six minutes reduces stress by </strong>
                                                        <span class="float-end">68%</span>
                                                            <div class="progress">
                                                                <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100" style="width: 90%;"></div>
                                                            </div>

                                                    <strong>US population that reads books for pleasure </strong>
                                                        <span class="float-end">32%</span>
                                                            <div class="progress">
                                                                <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100" style="width: 70%;"></div>
                                                            </div>

                                                    <strong>Reading increases vocabulary by </strong>
                                                        <span class="float-end">26%</span>
                                                            <div class="progress">
                                                                <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="26" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"></div>
                                                            </div>

                                                </div>
                                                
                                                <div class="mt-2 mt-lg-auto">
                                                    <a href="products.html" class="custom-link mb-2">
                                                        Explore our collection
                                                        <i class="bi-arrow-right ms-2"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section class="front-product">
                <div class="container-fluid p-0">
                    <div class="row align-items-center">

                        <div class="col-lg-6 col-12">
                            <img src="images/aigeneratedgame2.png" class="img-fluid" alt="">
                        </div>

                        <div class="col-lg-6 col-12">
                            <div class="px-5 py-5 py-lg-0">
                                
                                <h2 class="mb-4">Have some <span>fun</span></h2>

                                <p class="lead mb-4">Try out our new game. Have some fun and win prizes!</p>

                                <a href="game.html" class="custom-link">
                                    Play our game
                                    <i class="bi-arrow-right ms-2"></i>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        
            <section class="featured-product section-padding">
                <div class="container">
                    <div class="row">
                        
                        <div class="col-12 text-center">
                            <h2 class="mb-5">Our Books</h2>
                        </div>

                        <div class="col-lg-4 col-12 mb-3">
                            <div class="product-thumb">
                                <a href="products.html">
                                    <img src="https://m.media-amazon.com/images/I/81ANaZRiSpL._AC_UF1000,1000_QL80_.jpg" class="img-fluid product-image" alt="">
                                </a>

                                <div class="product-top d-flex">
                                    <span class="product-alert me-auto">Top Seller</span>

                                    <a href="#" class="bi-heart-fill product-icon"></a>
                                </div>

                                <div class="product-info d-flex">
                                    <div>
                                        <h5 class="product-title mb-0">
                                            <a href="products.html" class="product-title-link">The Wishing Game</a>
                                        </h5>

                                        <p class="product-p">In a childhood marked by neglect and loneliness, Lucy found her solace in books, namely the Clock Island series by Jack Masterson.</p>
                                    </div>

                                    <small class="product-price text-muted ms-auto mt-auto mb-5">$10</small>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-12 mb-3">
                            <div class="product-thumb">
                                <a href="products.html">
                                    <img src="https://m.media-amazon.com/images/I/91-6R0VxRiL.jpg" class="img-fluid product-image" alt="">
                                </a>

                                <div class="product-top d-flex">
                                    <span class="product-alert">Top Seller</span>

                                    <a href="#" class="bi-heart-fill product-icon ms-auto"></a>
                                </div>

                                <div class="product-info d-flex">
                                    <div>
                                        <h5 class="product-title mb-0">
                                            <a href="products.html" class="product-title-link">A Promised Land</a>
                                        </h5>

                                        <p class="product-p">In a fascinating first volume account of his presidential memoir, Barack Obama takes the reader on a historical journey of his first term.</p>
                                    </div>

                                    <small class="product-price text-muted ms-auto mt-auto mb-5">$14.50</small>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-12">
                            <div class="product-thumb">
                                <a href="products.html">
                                    <img src="https://m.media-amazon.com/images/I/71ls-I6A5KL.jpg" class="img-fluid product-image" alt="">
                                </a>

                                <div class="product-top d-flex">
                                    <a href="#" class="bi-heart-fill product-icon ms-auto"></a>
                                </div>

                                <div class="product-info d-flex">
                                    <div>
                                        <h5 class="product-title mb-0">
                                            <a href="products.html" class="product-title-link">The Midnight Library</a>
                                        </h5>

                                        <p class="product-p">Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right.</p>
                                    </div>

                                    <small class="product-price text-muted ms-auto mt-auto mb-5">$13.50</small>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 text-center">
                            <a href="products.html" class="view-all">Browse our Books</a>
                        </div>

                    </div>
                </div>
            </section>
        </main>

        <footer class="site-footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-10 me-auto mb-4">
                        <h4 class="text-white mb-3"><a href="index.php">Virtual</a>Volumes</h4>
                        <p class="copyright-text text-muted mt-lg-5 mb-4 mb-lg-0">Copyright © 2024 
                            <strong>Virtual Volumes</strong>
                        </p>
                        <br>
                        <p class="copyright-text">Template: 
                            <a href="https://www.tooplate.com/" target="_blank">Tooplate</a>
                        </p>
                    </div>

                    <div class="col-lg-5 col-8">
                        <h5 class="text-white mb-3">Sitemap</h5>
                        <ul class="footer-menu d-flex flex-wrap">
                            <li class="footer-menu-item"><a href="about.html" class="footer-menu-link">Story</a></li>
                            <li class="footer-menu-item"><a href="products.html" class="footer-menu-link">Products</a></li>
                            <li class="footer-menu-item"><a href="game.html" class="footer-menu-link">Game</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-4">
                        <h5 class="text-white mb-3">Social</h5>
                        <ul class="social-icon">
                            <li><a href="https://www.youtube.com/" class="social-icon-link bi-youtube"></a></li>
                            <li><a href="https://www.instagram.com/" class="social-icon-link bi-instagram"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

        <!-- JAVASCRIPT FILES -->
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.bundle.min.js"></script>
        <script src="js/Headroom.js"></script>
        <script src="js/jQuery.headroom.js"></script>
        <script src="js/slick.min.js"></script>
        <script src="js/custom.js"></script>

    </body>
</html>
