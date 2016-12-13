/*==================   Basic    ======================*/
/*==================   Functions    ==================*/
var backgroundImageBlocks = function (blockName,imgName) {
    var block =  document.querySelectorAll(blockName);
    for (var i = 0; i < block.length; i++) {
        var blockThumbnail = block[i].querySelector(imgName);
        blockThumbnail.style.display = 'none';
        block[i].style.backgroundImage = 'url('+blockThumbnail.getAttribute('src')+')';
        block[i].style.backgroundPosition = 'right center';
        block[i].style.backgroundRepeat = 'no-repeat';
        block[i].style.backgroundSize = 'cover';   
    }   
};
/*==================   Home page    ==================*/
/*-------------  Infoblock  -------------*/
backgroundImageBlocks('.c-infoblock','.c-infoblock__thumbnail');

/*-------------  Slider  ----------------*/
backgroundImageBlocks('.c-slider__item','.c-slider__thumbnail');
backgroundImageBlocks('.c-slider-nav__item','.c-slider-nav__thumbnail');

var elem = document.querySelector('.c-slider');
var flkty = new Flickity();

/*==================   Images    =====================*/    
/*==================   Navigation menu    ============*/
/*==================   Animations   ==================*/




