/*
 * Basic
 */
var screen_md = 992;
var classActive = '.is-active';
var classNotActive = 'is-notactive';


/*
 * Functions
 */
// Deactivating the default behavior of links and adding "notactive" class for block
var funcDisableLink = function (blockName) {
    var block =  document.querySelectorAll(blockName);
    for (var i = 0; i < block.length; i++) {
        if (block[i].classList.contains(classNotActive)){
            var blockLink = block[i].querySelector('a');
            blockLink.onclick=function(){return false};
        }
        
    }
};
// Takes a picture and make it the background for the block
var funcBackgroundImageBlocks = function (blockName, imgName, backPositionHoriz, backPositionVertical, blockNameBackground) {
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
// Finding the maximum height among the elements
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


/*
 *  Home page 
 */

/* Infoblock */
// Set a background image
funcBackgroundImageBlocks('.c-infoblock','.c-infoblock__thumbnail','right','center','.c-infoblock__image');
// calculation of the background triangle height
var blockInfoblocks =  document.querySelectorAll('.c-infoblock');
for (var i = 0; i < blockInfoblocks.length; i++) {
    var blockInfoblockBack = blockInfoblocks[i].querySelector('.c-infoblock__background');
    blockInfoblockBack.style.borderWidth = (blockInfoblocks[i].offsetHeight+5)+'px 0 0 '+(blockInfoblocks[i].offsetHeight-300)+'px';
}

/* Slider */
// Set a background image for slides
funcBackgroundImageBlocks('.c-slider__item','.c-slider__thumbnail','right','center');
// Set a background image for navigation slides
funcBackgroundImageBlocks('.c-slider-nav__item','.c-slider-nav__thumbnail','right','center','.c-slider-nav__background');
// Connecting flickity.js for slider
var elem = document.querySelector('.c-slider');
var flkty = new Flickity( elem, {
  wrapAround: 'true'
});
// Finding the maximum height among the elements slider
funcMaxHeightElement('.c-slider__item'); 
// Set the active-first slide navigation
var navSliderItems =  document.querySelectorAll('.c-slider-nav__background');
for (var i = 0; i < navSliderItems.length; i++) {
  if(i===0){
      navSliderItems[i].classList.add('is-selected');
  } 
} 
// Set the active slide navigation on click
var buttonGroup = document.querySelector('.c-slider-nav');
var buttons = buttonGroup.querySelectorAll('.c-slider-nav__link');
buttons = fizzyUIUtils.makeArray( buttons );
buttonGroup.addEventListener( 'click', function( event ) {
  if ( !matchesSelector( event.target, '.c-slider-nav__link' ) ) {
    return;
  }
  var index = buttons.indexOf( event.target );
  flkty.select( index ); 
  var navItems =  document.querySelectorAll('.c-slider-nav__background');
  for (var i = 0; i < navItems.length; i++) {
      navItems[i].classList.remove('is-selected');
  } 
  event.srcElement.parentNode.classList.add('is-selected');
});
/* Features */
// Set a background image for features
funcBackgroundImageBlocks('.c-feature','.c-feature__thumbnail','center','top');
// Finding the maximum height among the elements features
funcMaxHeightElement('.c-feature__content');


/*
 *  Images
 */ 


/*
 *  Navigation menu 
 */
var navItems =  document.querySelectorAll('.c-nav__item');
if(window.innerWidth < screen_md){
    // Set the active menu navigation on click
    for (var i = 0; i < navItems.length; i++) {        
        if (navItems[i].classList.contains('is-dropdown')){ 
            var navDropdown = navItems[i].querySelector('.c-nav__dropdown');
            navDropdown.style.display = 'none';
            navItems[i].onclick=function(){
                console.log(this.classList.contains('is-active'));
                if(this.classList.contains('is-active')){
                    navDropdown.style.display = 'none';
                    this.classList.remove('is-active');    
                }else {
                    navDropdown.style.display = 'block';
                    this.className += ' is-active';                      
                }
            };
        }
    }
}else {
    // Set the active menu navigation on hover
    for (var i = 0; i < navItems.length; i++) {        
        if (navItems[i].classList.contains('is-dropdown')){ 
            var navDropdown = navItems[i].querySelector('.c-nav__dropdown');
            navItems[i].onmouseover = function(){
                if(!this.classList.contains('is-active')){
                    this.className += ' is-active';                          
                }
            };
            navDropdown.onmouseover = function(){
                if(!this.parentNode.classList.contains('is-active')){
                    this.parentNode.className += ' is-active';                   
                }             
            };
            navItems[i].onmouseout = function(){
                this.classList.remove('is-active'); 
            };
            navDropdown.onmouseout = function(){
                this.parentNode.classList.remove('is-active'); 
            };
        }
    }    
}


/*
 *  Program 
 */
// Deactivating the default behavior of links and adding "notactive" class for prgramms block
funcDisableLink('.c-program__item');
/*
 *  Animations 
 */