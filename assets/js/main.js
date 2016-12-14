/*==================   Functions    ==================*/
function hasClass(el, cls) {
  return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}
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
/*==================   Basic    ======================*/
var classActive = '.is-active';
var classNotActive = 'is-notactive';
var disableLink = function (blockName) {
    var block =  document.querySelectorAll(blockName);
    for (var i = 0; i < block.length; i++) {
        if (block[i].classList.contains(classNotActive)){
            var blockLink = block[i].querySelector('a');
            blockLink.onclick=function(){return false}
        }
        
    }
};
disableLink('.c-program__item');
/*==================   Home page    ==================*/
/*-------------  Infoblock  -------------*/
backgroundImageBlocks('.c-infoblock','.c-infoblock__thumbnail');

/*-------------  Slider  ----------------*/
backgroundImageBlocks('.c-slider__item','.c-slider__thumbnail');
backgroundImageBlocks('.c-slider-nav__item','.c-slider-nav__thumbnail');

var elem = document.querySelector('.c-slider');
var flkty = new Flickity();

/*-------------  Features  --------------*/
backgroundImageBlocks('.c-feature','.c-feature__thumbnail');
/*==================   Images    =====================*/    
/*==================   Navigation menu    ============*/
/*==================   Animations   ==================*/




