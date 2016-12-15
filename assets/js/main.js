/*==================   Basic    ======================*/
var screen_md = 992;
var classActive = '.is-active';
var classNotActive = 'is-notactive';
/*==================   Functions    ==================*/
var funcDisableLink = function (blockName) {
    var block =  document.querySelectorAll(blockName);
    for (var i = 0; i < block.length; i++) {
        if (block[i].classList.contains(classNotActive)){
            var blockLink = block[i].querySelector('a');
            blockLink.onclick=function(){return false};
        }
        
    }
};
var funcBackgroundImageBlocks = function (blockName,imgName,backPositionHoriz,backPositionVertical,blockNameBackground) {
    var block =  document.querySelectorAll(blockName);
    for (var i = 0; i < block.length; i++) {
        var blockThumbnail = block[i].querySelector(imgName);
        blockThumbnail.style.display = 'none';
        if(block[i].querySelector(blockNameBackground) != null){
            var blockNameBack = block[i].querySelector(blockNameBackground);
            blockNameBack.style.backgroundImage = 'url('+blockThumbnail.getAttribute('src')+')';
            blockNameBack.style.backgroundPosition = backPositionHoriz+' '+backPositionVertical;
            blockNameBack.style.backgroundRepeat = 'no-repeat';
            blockNameBack.style.backgroundSize = 'cover';               
        }else {
            block[i].style.backgroundImage = 'url('+blockThumbnail.getAttribute('src')+')';
            block[i].style.backgroundPosition = backPositionHoriz+' '+backPositionVertical;
            block[i].style.backgroundRepeat = 'no-repeat';
            block[i].style.backgroundSize = 'cover';              
        } 
    }   
};
var funcMaxHeightElement = function(blockName) {
    var blockItems =  document.querySelectorAll(blockName);
    var blockItemsHeight = [];
    for (var i = 0; i < blockItems.length; i++) {
        blockItemsHeight.push(blockItems[i].offsetHeight);
    }
    for (var i = 0; i < blockItems.length; i++) {
        blockItems[i].style.height = Math.max.apply(null, blockItemsHeight)+'px';
    }    
};
/*==================   Home page    ==================*/
/*-------------  Infoblock  -------------*/
funcBackgroundImageBlocks('.c-infoblock','.c-infoblock__thumbnail','right','center','.c-infoblock__image');
var blockInfoblocks =  document.querySelectorAll('.c-infoblock');
for (var i = 0; i < blockInfoblocks.length; i++) {
    var blockInfoblockBack = blockInfoblocks[i].querySelector('.c-infoblock__background');
    blockInfoblockBack.style.borderWidth = (blockInfoblocks[i].offsetHeight+5)+'px 0 0 '+(blockInfoblocks[i].offsetHeight-300)+'px';
}

/*-------------  Slider  ----------------*/
funcBackgroundImageBlocks('.c-slider__item','.c-slider__thumbnail','right','center');
funcBackgroundImageBlocks('.c-slider-nav__item','.c-slider-nav__thumbnail','right','center');

var elem = document.querySelector('.c-slider');
var flkty = new Flickity();
funcMaxHeightElement('.c-slider__item');
/*-------------  Features  --------------*/
funcBackgroundImageBlocks('.c-feature','.c-feature__thumbnail','center','top');
funcMaxHeightElement('.c-feature__content');
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
/*==================   Program    ====================*/   
funcDisableLink('.c-program__item');
/*==================   Animations   ==================*/




