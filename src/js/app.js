/*
 * Basic
 */
var screen_md = 900;
var classActive = 'is-active';
var classNotActive = 'is-notactive';
var classError= 'is-error';
var classValidate = 'is-validate';
var imgDirectory = 'assets/img/';

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
// Setting the auto height among the elements
var funcAutoHeightElement = function(blockName) {
    var blockItems =  document.querySelectorAll(blockName);
    var blockItemsHeight = [];
    for (var i = 0; i < blockItems.length; i++) {
        blockItems[i].style.height = 'auto';
    }    
};
// Maximum and automatic height among the elements to resize
var funcMaxHeightElementResize = function(blockName) {
    window.addEventListener('resize', function(event){ 
        if(event.target.innerWidth >= screen_md){ 
            funcAutoHeightElement(blockName);
            funcMaxHeightElement(blockName);
        }else {
            funcAutoHeightElement(blockName);
        }    
    });
};
// Changing the height of the elements only on desktops
var funcMaxHeightElementOnlyDesktop = function(blockName) {
    if(window.innerWidth >= screen_md){ 
        funcMaxHeightElement(blockName);
    }else {
        funcAutoHeightElement(blockName);
    }    
};
// Reset class error for elements form 
var funcValidateFormResetError = function (blockName) {
    if (blockName.classList.contains(classError)) {
        blockName.classList.remove(classError);
    }
};
// Add class error for elements form 
var funcValidateFormShowError = function(blockName){
    blockName.classList.add(classError);
};
// Validate elements form 
var funcValidateForm = function(form, formItemClass, checkType){
     var formElements = form.querySelectorAll(formItemClass);
     for (var i = 0; i < formElements.length; i++) {
         funcValidateFormResetError(formElements[i]);
         if (checkType == 'is-value'){         
             if (!formElements[i].value) {
                funcValidateFormShowError(formElements[i]);
             }                
         }        
     }  
};
/*
 *  Home page 
 */

/* Logo */
// Change image on hover for header
//var headerLogo = document.querySelector('.l-header__logo');
//var headerLogoLink = headerLogo.querySelector('.c-logo__link');
//headerLogoLink.onmouseover = function(){
//    this.querySelector('img').src = imgDirectory+'logo-dark-color.svg';
//};
//headerLogoLink.onmouseout = function(){
//    this.querySelector('img').src = imgDirectory+'logo-dark.svg';
//};

/* Infoblock */
// Set a background image
funcBackgroundImageBlocks('.c-infoblock','.c-infoblock__thumbnail','right','center','.c-infoblock__image');
// calculation of the background triangle height
var blockInfoblocks =  document.querySelectorAll('.c-infoblock');
if(window.innerWidth >= screen_md){ 
    for (var i = 0; i < blockInfoblocks.length; i++) {
        var blockInfoblockBack = blockInfoblocks[i].querySelector('.c-infoblock__background');
        blockInfoblockBack.style.borderWidth = (blockInfoblocks[i].offsetHeight+5)+'px 0 0 '+(blockInfoblocks[i].offsetHeight-300)+'px';
    }
}
window.addEventListener('resize', function(event){ 
    if(event.target.innerWidth >= screen_md){ 
        for (var i = 0; i < blockInfoblocks.length; i++) {
            var blockInfoblockBack = blockInfoblocks[i].querySelector('.c-infoblock__background');
            blockInfoblockBack.style.borderWidth = (blockInfoblocks[i].offsetHeight+5)+'px 0 0 '+(blockInfoblocks[i].offsetHeight-300)+'px';
        }
    }
 });

/* Slider */
// Set a background image for slides
funcBackgroundImageBlocks('.c-slider__item','.c-slider__thumbnail','right','center');


// Set a background image for navigation slides
funcBackgroundImageBlocks('.c-slider-nav__item','.c-slider-nav__thumbnail','right','center','.c-slider-nav__background');
// Connecting flickity.js for slider
var elemSlider = document.querySelector('.c-slider');
var paramsSlider = { wrapAround: 'true', draggable: true};
// Disable flickity.js on mobile
var flkty = new Flickity( elemSlider, paramsSlider);
if(window.innerWidth >= screen_md){   
    var flkty = new Flickity( elemSlider, paramsSlider);
}else {
    flkty.destroy();
}
window.addEventListener('resize', function(event){ 
    var flkty = new Flickity( elemSlider, paramsSlider);
    if(event.target.innerWidth >= screen_md){   
        var flkty = new Flickity( elemSlider, paramsSlider);
    }else {
        flkty.destroy();
    }  
});
// Finding the maximum height among the elements slider
funcMaxHeightElementOnlyDesktop('.c-slider__item'); 
funcMaxHeightElementResize('.c-slider__item');
//funcMaxHeightElementResize('.c-feature__content');
// Set the active-first slide navigation
var navSliderItems = document.querySelectorAll('.c-slider-nav__background');
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
  event.srcElement.parentNode.querySelector('.c-slider-nav__title').style.position = 'static';
  event.srcElement.parentNode.classList.add('is-selected');
});
// Set the active slide navigation on click next/prev buttons
flkty.on( 'select', function() {
    var navItems =  document.querySelectorAll('.c-slider-nav__background');
    for (var i = 0; i < navItems.length; i++) {      
      navItems[i].querySelector('.c-slider-nav__title').style.position = 'relative';
      navItems[i].classList.remove('is-selected');
    } 
    navItems[flkty.selectedIndex].querySelector('.c-slider-nav__title').style.position = 'static';
    navItems[flkty.selectedIndex].classList.add('is-selected');
});
/* Features */
// Set a background image for features
funcBackgroundImageBlocks('.c-feature','.c-feature__thumbnail','center','top');
// Finding the maximum height among the elements features
funcMaxHeightElementOnlyDesktop('.c-feature__content'); 
funcMaxHeightElementResize('.c-feature__content');

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
            navItems[i].onclick = function(){
                if(this.classList.contains(classActive)){
                    navDropdown.style.display = 'none';
                    this.classList.remove(classActive);    
                }else {
                    navDropdown.style.display = 'block';
                    this.className += ' '+classActive;                      
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
                if(!this.classList.contains(classActive)){
                    this.className += ' '+classActive;                          
                }
            };
            navDropdown.onmouseover = function(){
                if(!this.parentNode.classList.contains(classActive)){
                    this.parentNode.className += ' '+classActive;                    
                }             
            };
            navItems[i].onmouseout = function(){
                var objectThis = this;
                function funcDeleteActiveClass(blockObject) {
                  blockObject.classList.remove(classActive); 
                }
                setTimeout(funcDeleteActiveClass, 3000,objectThis);                
                
            };
            navDropdown.onmouseout = function(){
                var objectThis = this;
                function funcDeleteActiveClass(blockObject) {
                    blockObject.parentNode.classList.remove(classActive); 
                }
                setTimeout(funcDeleteActiveClass, 3000, objectThis);                       
            };
        }
    }    
}
// Open mobile navigation
var blockNav = document.querySelector('.l-header__nav');
var btnNav = document.querySelector('.c-nav-button');
btnNav.onclick = function(event){
    if(!this.classList.contains(classActive)){
        blockNav.className += ' '+classActive;
    }
};
document.addEventListener('click', function(event) {
    var isClickInside = blockNav.contains(event.target);
    if (!isClickInside && !btnNav.contains(event.target)) {
        blockNav.classList.remove(classActive); 
    }
}); 

/*
 *  Program 
 */
// Deactivating the default behavior of links and adding "notactive" class for prgramms block
funcDisableLink('.c-program__item');


/*
 *  Forms
 */
var formButon = document.querySelectorAll('.c-form__btn');
for (var i = 0; i < formButon.length; i++) {
    formButon[i].addEventListener('click', function(event) {
        if (this.form.classList.contains(classValidate)){
            funcValidateForm(this.form, '.c-form__input','is-value');
        }
    });    
}
//
//var formItems =  document.querySelectorAll('.c-form');
//for (var i = 0; i < formItems.length; i++) { 
//    if (formItems[i].classList.contains(classValidate)){
//        var formItem = formItems[i];
//        var formButon = formItem.querySelector('.c-form__btn');
//        formButon.addEventListener('click', function(event) {
//            funcValidateForm(formItem, '.c-form__input','is-value');
//        });
//    }
//    
//}
                
/*
 *  Animations 
 */                