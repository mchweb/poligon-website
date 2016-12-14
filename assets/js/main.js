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
/*==================   Breakpoints    ================*/
var screen_md = 992;
/*==================   Basic    ======================*/
var classActive = '.is-active';
var classNotActive = 'is-notactive';
var disableLink = function (blockName) {
    var block =  document.querySelectorAll(blockName);
    for (var i = 0; i < block.length; i++) {
        if (block[i].classList.contains(classNotActive)){
            var blockLink = block[i].querySelector('a');
            blockLink.onclick=function(){return false};
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
if(window.innerWidth < screen_md){
    var navItems =  document.querySelectorAll('.c-nav__item');
    for (var i = 0; i < navItems.length; i++) {
        
        if (navItems[i].classList.contains('is-dropdown')){ 
            var navDropdown = navItems[i].querySelector('.c-nav__dropdown');
            navDropdown.style.display = 'none';
            navItems[i].onclick=function(){
                console.log(this.classList.contains('is-active'));
                if(this.classList.contains('is-active')){
                    navDropdown.style.display = 'none';
                    this.classList.remove('is-active');    
                    console.log(1);
                }else {
                    navDropdown.style.display = 'block';
                    this.className += ' is-active';                      
                }
            };
        }
    }
}
/*==================   Animations   ==================*/




