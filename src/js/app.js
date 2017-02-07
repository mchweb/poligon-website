/*
 * Basic
 */
var screen_md = 900;
var classActive = 'is-active';
var classOpen = 'is-open';
var classNotActive = 'is-notactive';
var classDropdown = 'is-dropdown';
var classError= 'is-error';
var classNoError= 'is-no-error';
var classValidate = 'is-validate';
var classHidden = 'is--hidden';
var classBuiltIn = 'is-built-in';
var imgDirectory = 'assets/img/';

/*
 * Functions
 */
/* Deactivating the default behavior of links and adding "notactive" class for block */
var funcDisableLink = function (blockName) {
    var block =  document.querySelectorAll(blockName);
    for (var i = 0; i < block.length; i++) {
        if (block[i].classList.contains(classNotActive)){
            var blockLink = block[i].querySelector('a');
            blockLink.onclick=function(){return false};
        }
        
    }
};
/* Takes a picture and make it the background for the block */
var funcBackgroundImageBlocks = function (blockName, imgName, bagPositionHoriz, bagPositionVertical, blockNameBackground) {
    var block =  document.querySelectorAll(blockName);
    for (var i = 0; i < block.length; i++) {
        var blockThumbnail = block[i].querySelector(imgName);
        if(blockThumbnail){
            blockThumbnail.style.display = 'none';        
            if(block[i].querySelector(blockNameBackground) != null){
                var blockNameBack = block[i].querySelector(blockNameBackground);
                blockNameBack.style.backgroundImage = 'url('+blockThumbnail.getAttribute('src')+')';
                blockNameBack.style.backgroundPosition = bagPositionHoriz+' '+bagPositionVertical;
                blockNameBack.style.backgroundRepeat = 'no-repeat';
                blockNameBack.style.backgroundSize = 'cover';               
            }else {
                block[i].style.backgroundImage = 'url('+blockThumbnail.getAttribute('src')+')';
                block[i].style.backgroundPosition = bagPositionHoriz+' '+bagPositionVertical;
                block[i].style.backgroundRepeat = 'no-repeat';
                block[i].style.backgroundSize = 'cover';              
            }             
        }
    }   
};
/* Finding the maximum height among the elements */
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
/* Setting the auto height among the elements */
var funcAutoHeightElement = function(blockName) {
    var blockItems =  document.querySelectorAll(blockName);
    var blockItemsHeight = [];
    for (var i = 0; i < blockItems.length; i++) {
        blockItems[i].style.height = 'auto';
    }    
};
/* Maximum and automatic height among the elements to resize */
var funcMaxHeightElementResize = function(blockName) {
    window.addEventListener('resize', function(eventResize){ 
        if(eventResize.target.innerWidth >= screen_md){ 
            funcAutoHeightElement(blockName);
            funcMaxHeightElement(blockName);
        }else {
            funcAutoHeightElement(blockName);
        }    
    });
};
/* Changing the height of the elements only on desktops */
var funcMaxHeightElementOnlyDesktop = function(blockName) {
    if(window.innerWidth >= screen_md){ 
        funcMaxHeightElement(blockName);
    }else {
        funcAutoHeightElement(blockName);
    }    
};
/* Reset class error for elements form */ 
var funcValidateFormResetError = function (blockName) {
    if (blockName.classList.contains(classError)) {
        blockName.classList.remove(classError);
    }
};
/* Add class error for elements form */ 
var funcValidateFormShowError = function(blockName){
    if(!blockName.classList.contains(classError)){
        blockName.classList.remove(classNoError);
        blockName.classList.add(classError);
    }      
    var icon = blockName.parentNode.querySelector('.c-form__icon');
    if (icon){        
        icon.classList.remove(classNoError);
        if(!icon.classList.contains(classError)){
            icon.classList.add(classError);
        }
    }else {
        var divError = document.createElement('div');
        divError.className = 'c-form__icon '+classError;
        blockName.parentNode.appendChild(divError);          
    } 
    var messageError = blockName.parentNode.querySelector('.c-form__error-message');
    if (!messageError){
        var divErrorMessage = document.createElement('div');
        divErrorMessage.className = 'c-form__error-message';
        divErrorMessage.innerHTML = 'Пожалуйста, заполните поле';
        blockName.parentNode.appendChild(divErrorMessage);            
    }  
};
/* Add class no error for elements form */ 
var funcValidateFormShowNoError = function(blockName){  
    var messageError = blockName.parentNode.querySelector('.c-form__error-message');
    if (messageError){
        blockName.parentNode.removeChild(messageError);
    }
    if(!blockName.classList.contains(classNoError)){
        blockName.classList.remove(classError);
        blockName.classList.add(classNoError);
    }    
    var icon = blockName.parentNode.querySelector('.c-form__icon');
    if (icon){        
        icon.classList.remove(classError);
        if(!icon.classList.contains(classError)){
            icon.classList.add(classNoError);
        }        
    }else {
        var divNoError = document.createElement('div');
        divNoError.className = 'c-form__icon '+classNoError;
        blockName.parentNode.appendChild(divNoError);           
    }    
};
/* Validate elements form */ 
var funcValidateForm = function(form, formItemClass, checkType){
     var formElements = form.querySelectorAll(formItemClass);
     for (var i = 0; i < formElements.length; i++) {
         funcValidateFormResetError(formElements[i]);
         if (checkType == 'is-value'){         
             if (!formElements[i].value) {
                funcValidateFormShowError(formElements[i]);
             }else {
                 funcValidateFormShowNoError(formElements[i]);
             }                
         }        
     }  
};
/* Bind MouseOut and delete active class menu */
var submenuOutTimeoutID = '';
var funcDeleteActiveClassMouseOut = function (bloclObject){
    var list = funcTraverseChildren(bloclObject);
    return function onMouseOut(eventMouseOut) {
        var eventMouse = eventMouseOut.toElement || eventMouseOut.relatedTarget;
        if (!!~list.indexOf(eventMouse)) {
            return;
        }
        submenuOutTimeoutID = setTimeout(function (bloclObject) { bloclObject.parentNode.classList.remove(classActive); }, 2000, bloclObject); 
    };
};
/* Traverse children elemets */
var funcTraverseChildren = function (bloclObject){
    var children = [];
    var q = [];
    q.push(bloclObject);
    while (q.length > 0)
    {
        var bloclObject = q.pop();
        children.push(bloclObject);
        pushAll(bloclObject.children);
    }
    function pushAll(blocksArray){
        for(var i = 0; i < blocksArray.length; i++)
        {
            q.push(blocksArray[i]);
        }
    }
    return children;
};
/* Tabs */ 
/* Switching tabs */
var funcTabs = function (blockName, blockNameNavTabs, blockNameTextTabs){
    var blockParent = document.querySelector(blockName);
    if (blockParent){
        var navElements = blockParent.querySelectorAll(blockNameNavTabs);
        var textElements = blockParent.querySelectorAll(blockNameTextTabs);
        for (var i = 0; i < navElements.length; i++) {
            navElements[i].addEventListener('click', function(event) {
                var navIndex = '0';
                for (var n = 0; n < navElements.length; n++) {
                    if(navElements[n].classList.contains(classActive)){
                        navElements[n].classList.remove(classActive);   
                    }
                    if(event.target === navElements[n]){
                        navIndex = n;
                        navElements[n].classList.add(classActive);   
                    }                    
                }
                for (var k = 0; k < textElements.length; k++){
                    textElements[k].classList.remove(classActive); 
                    if(k === navIndex){
                        textElements[k].classList.add(classActive);   
                    }
                }
                
            });  
            if(window.innerWidth <= screen_md){
                     
                var navElemnt = navElements[i].cloneNode(true);          
                var temmpDiv = document.createElement('div');
                temmpDiv.className = navElemnt.className+' '+classBuiltIn;
                temmpDiv.innerHTML = navElemnt.textContent;              
                for (var k = 0; k < textElements.length; k++){
                    
                    if(k === i){
                        if(!textElements[k].querySelectorAll('.c-tabs-nav__item').length){
                            textElements[k].insertBefore(temmpDiv, textElements[k].children[0]);
                        }else {
                            textElements[k].querySelector('.c-tabs-nav__item').classList.remove(classHidden);
                        }
                        
                    }

                }
               
                if(!navElements[i].classList.contains(classBuiltIn)){
                    navElements[i].classList.add(classHidden);
                }
            }else {
                if(navElements[i].classList.contains(classHidden)){
                    navElements[i].classList.remove(classHidden);                              
                }
                if(navElements[i].classList.contains(classBuiltIn)){
                    navElements[i].classList.add(classHidden);
                }
            }
         
        }           
    }
};
funcTabs('.c-tabs','.c-tabs-nav__item','.c-tabs-text__item');
window.addEventListener('resize', function(eventResize){
    funcTabs('.c-tabs','.c-tabs-nav__item','.c-tabs-text__item');
});

/*
 *  Navigation menu 
 */
var navItems =  document.querySelectorAll('.c-nav__item');
if(window.innerWidth < screen_md){
    /* Set the active menu navigation on click */
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
                    this.classList.add(classActive);                      
                }
            };
        }
    }
}else {
    /* Set the active menu navigation on hover */
    for (var i = 0; i < navItems.length; i++) {        
        if (navItems[i].classList.contains(classDropdown)){ 
            var navDropdown = navItems[i].querySelector('.c-nav__dropdown');
            navItems[i].onmouseover = function(){
                if(!this.classList.contains(classActive)){
                    this.classList.add(classActive);                          
                }
            };
            navDropdown.onmouseover = function(){
                if(!this.parentNode.classList.contains(classActive)){
                    this.parentNode.classList.add(classActive);                    
                }    
                navDropdown.removeEventListener('mouseout', funcDeleteActiveClassMouseOut(navDropdown),true);
                if (submenuOutTimeoutID != ''){
                   clearTimeout(submenuOutTimeoutID); 
                }                
            };
            navDropdown.addEventListener('mouseout', funcDeleteActiveClassMouseOut(navDropdown),true);
        }else {
            navItems[i].onmouseover = function(){
                for (var k = 0; k < navItems.length; k++) {
                    if (navItems[k].classList.contains(classDropdown)){
                        if(navItems[k].classList.contains(classActive)){
                            navItems[k].classList.remove(classActive);                              
                        }
                    } 
                } 
            };                      
        }
    }    
}
/* Open mobile navigation */
var blockNav = document.querySelector('.l-header__nav');
var btnNav = document.querySelector('.c-nav-button');
if(btnNav){
    btnNav.onclick = function(event){
        if(!this.classList.contains(classActive)){
            blockNav.classList.add(classActive);
        }
    };    
}

document.addEventListener('click', function(event) {
    var isClickInside = blockNav.contains(event.target);
    if (!isClickInside && !btnNav.contains(event.target)) {
        blockNav.classList.remove(classActive); 
    }
}); 
/* Close-button navigation */
var btnCloseNavigation =  document.querySelector('.c-nav__close');
if(btnCloseNavigation){
    btnCloseNavigation.onclick = function(event){
        this.parentNode.parentNode.parentNode.classList.remove(classActive);
    };   
}


/*
 *  Home page 
 */

/* Logo */
/* Change image on hover for header
var headerLogo = document.querySelector('.l-header__logo');
var headerLogoLink = headerLogo.querySelector('.c-logo__link');
headerLogoLink.onmouseover = function(){
    this.querySelector('img').src = imgDirectory+'logo-dark-color.svg';
};
headerLogoLink.onmouseout = function(){
    this.querySelector('img').src = imgDirectory+'logo-dark.svg';
}; */


/*
 *  Pages
 */ 
/* Map */
/* Generation map using 2GIS */
if(document.querySelector('#map-program')) {
    var mapProgram;
    DG.then(function () {
        if (mapProgram == null){
            mapProgram = DG.map('map-program', {
                center: [56.46377080170267, 84.95729684829713],
                zoom: 16,
                dragging : true,
                touchZoom: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                geoclicker: false,
                zoomControl: true,
                fullscreenControl: false        
            });
            DG.marker([56.463601, 84.957292]).addTo(mapProgram);            
        }

    });    
}
/* Generation map using 2GIS */
if(document.querySelector('#map-program-big')) {
    var mapProgramBig;
    DG.then(function () {
        if (mapProgramBig == null){
            mapProgramBig = DG.map('map-program-big', {
                center: [56.46377080170267, 84.95729684829713],
                zoom: 16,
                dragging : true,
                touchZoom: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                geoclicker: false,
                zoomControl: true,
                fullscreenControl: false        
            });
            DG.marker([56.463601, 84.957292]).addTo(mapProgramBig);
        }
    });    
}
/* Reviews */
/* Set height for block */
var blockHeightReviews = function () {
    var blockReviews =  document.querySelectorAll('.c-reviews__item');
    if(blockReviews.length){ 
        for (var i = 0; i < blockReviews.length; i++) {
            var blockThumbnail = blockReviews[i].querySelector('.c-human__thumbnail');
            blockThumbnail.style.height = blockThumbnail.offsetWidth+'px';
        }
    }    
};
blockHeightReviews();
window.addEventListener('resize', function(eventResize){
    blockHeightReviews();
});

/* Set a background image */
funcBackgroundImageBlocks('.c-reviews__item','img','center','center','.c-human__thumbnail');

/* Features */
/* Set a background image for features */
funcBackgroundImageBlocks('.c-feature','.c-feature__thumbnail','center','top');
/* Finding the maximum height among the elements features */
funcMaxHeightElementOnlyDesktop('.c-feature__content'); 
funcMaxHeightElementResize('.c-feature__content');

/* Program */
/* Deactivating the default behavior of links and adding "notactive" class for prgramms block */
funcDisableLink('.c-program__item');

/* Infoblock */
/* Set a background image */
funcBackgroundImageBlocks('.c-infoblock','.c-infoblock__thumbnail','right','center','.c-infoblock__image');
funcBackgroundImageBlocks('.c-infoblock.is-back-center','.c-infoblock__thumbnail','center','center','.c-infoblock__image');
/* calculation of the background triangle height */
var blockInfoblocksBackgrund = function () {
    var blockInfoblocks =  document.querySelectorAll('.c-infoblock');
    for (var i = 0; i < blockInfoblocks.length; i++) {
        var blockInfoblockBack = blockInfoblocks[i].querySelector('.c-infoblock__background');
        blockInfoblockBack.style.borderWidth = (blockInfoblocks[i].offsetHeight+100)+'px 0 0 '+(blockInfoblocks[i].offsetHeight-300)+'px';
        var blockInfoBlockMap = blockInfoblocks[i].querySelector('.l-infoblock_back-map');
        if(blockInfoBlockMap){
            blockInfoBlockMap.querySelector('.c-map__container').style.height = blockInfoblocks[i].offsetHeight+'px';
        }        
    }   
}
if(window.innerWidth >= screen_md){ 
    blockInfoblocksBackgrund();
}

window.addEventListener('resize', function(eventResize){ 
    if(eventResize.target.innerWidth >= screen_md){ 
        blockInfoblocksBackgrund();
    }
});
/* Generation map using 2GIS */
if(document.querySelector('#map-background')) {
    var mapBackground;
    DG.then(function () {
        if (mapBackground == null){
            mapBackground = DG.map('map-background', {
                center: [56.463712, 84.947255],
                zoom: 16,
                dragging : false,
                touchZoom: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                geoclicker: false,
                zoomControl: false,
                fullscreenControl: false        
            });
           // DG.marker([56.463601, 84.957292]).addTo(map);
            DG.popup([56.463601, 84.957292])
                        .setLatLng([56.463601, 84.957292])
                        .setContent('Контент здесь')
                        .openOn(mapBackground);
        }
    });    
}
/* Speakers */
/* Set height for block */
var blockHeightSpeakers = function() {
    var blockSpeakers =  document.querySelectorAll('.c-human__item');
    if(blockSpeakers.length){ 
        for (var i = 0; i < blockSpeakers.length; i++) {
            var blockThumbnail = blockSpeakers[i].querySelector('.c-human__thumbnail');
            blockThumbnail.style.height = blockThumbnail.offsetWidth+'px';
        }
    }   
};
blockHeightSpeakers();
window.addEventListener('resize', function(eventResize){
    blockHeightSpeakers();
});
/* Set a background image */
funcBackgroundImageBlocks('.c-human__item','img','top','center','.c-human__thumbnail');

/* Slider images */
/* Set height for block */
var sliderImagesHeightElements = function () {
    var blockSLider = document.querySelector('.c-slider.is-not-content');
    if(blockSLider){ 
        var blockSLidersItems =  document.querySelectorAll('.c-slider__image');
        if(blockSLidersItems.length){ 
            for (var i = 0; i < blockSLidersItems.length; i++) {
                blockSLidersItems[i].style.height = blockSLidersItems[i].offsetWidth/1.5+'px';
            }
        }
    }    
};
sliderImagesHeightElements();
window.addEventListener('resize', function(eventResize){
    sliderImagesHeightElements();
});


/*var formItems =  document.querySelectorAll('.c-form');
for (var i = 0; i < formItems.length; i++) { 
    if (formItems[i].classList.contains(classValidate)){
        var formItem = formItems[i];
        var formButon = formItem.querySelector('.c-form__btn');
        formButon.addEventListener('click', function(event) {
            funcValidateForm(formItem, '.c-form__input','is-value');
        });
    }
    
} */
/* Slider */
/* Set a background image for slides */
funcBackgroundImageBlocks('.c-slider__item','.c-slider__thumbnail','right','center');


/* Set a background image for navigation slides */
funcBackgroundImageBlocks('.c-slider-nav__item','.c-slider-nav__thumbnail','right','center','.c-slider-nav__background');
/* Connecting flickity.js for slider */
var elemSlider = document.querySelector('.c-slider');
var paramsSlider = { wrapAround: 'true', draggable: true, pageDots: false};

if(elemSlider){
    /* Disable flickity.js on mobile */
    var flkty = new Flickity( elemSlider, paramsSlider);
    if(window.innerWidth >= screen_md){   
        var flkty = new Flickity( elemSlider, paramsSlider);
    }else {
        flkty.destroy();
    }
    window.addEventListener('resize', function(eventResize){ 
        var flkty = new Flickity( elemSlider, paramsSlider);
        if(eventResize.target.innerWidth >= screen_md){   
            var flkty = new Flickity( elemSlider, paramsSlider);
        }else {
            flkty.destroy();
        }  
    });    
}
/* Finding the maximum height among the elements slider */
funcMaxHeightElementOnlyDesktop('.c-slider__item'); 
funcMaxHeightElementResize('.c-slider__item');
/* funcMaxHeightElementResize('.c-feature__content'); */
/* Set the active-first slide navigation */
var navSliderItems = document.querySelectorAll('.c-slider-nav__background');
for (var i = 0; i < navSliderItems.length; i++) {
  if(i===0){
      navSliderItems[i].classList.add('is-selected');
  } 
} 
/* Set the active slide navigation on click */
var buttonGroupSlider = function (){
    var buttonGroup = document.querySelector('.c-slider-nav');
    if(elemSlider){
        var flkty = new Flickity( elemSlider, paramsSlider);
    }
    if(buttonGroup){
        var buttons = buttonGroup.querySelectorAll('.c-slider-nav__link');
        buttons = fizzyUIUtils.makeArray( buttons );
        if(window.innerWidth >= screen_md){   
            if(elemSlider){
                var flkty = new Flickity( elemSlider, paramsSlider);
            }
        }else {
            flkty.destroy();
        }
        buttonGroup.addEventListener( 'click', function( eventClick ) {
          if ( !matchesSelector( eventClick.target, '.c-slider-nav__link' ) ) {
            return;
          }
          
          var index = buttons.indexOf( eventClick.target );
          flkty.select( index ); 
          var navItems =  document.querySelectorAll('.c-slider-nav__background');
          for (var i = 0; i < navItems.length; i++) {
              navItems[i].querySelector('.c-slider-nav__title').style.position = 'relative';
              navItems[i].classList.remove('is-selected');
          }  
          eventClick.srcElement.parentNode.querySelector('.c-slider-nav__title').style.position = 'static';
          eventClick.srcElement.parentNode.classList.add('is-selected');
        });    
        /* Set the active slide navigation on click next/prev buttons */
        flkty.on( 'select', function() {
            var navItems =  document.querySelectorAll('.c-slider-nav__background');
            for (var i = 0; i < navItems.length; i++) {      
              navItems[i].querySelector('.c-slider-nav__title').style.position = 'relative';
              navItems[i].classList.remove('is-selected');
            } 
            navItems[flkty.selectedIndex].querySelector('.c-slider-nav__title').style.position = 'static';
            navItems[flkty.selectedIndex].classList.add('is-selected');
        });
    }    
};
buttonGroupSlider();
window.addEventListener('resize', function(eventResize){
    buttonGroupSlider();
});

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
/* Modal */
/* Set a background image for modals */
var modalFuncInit = function (eventResize) {
    var windowWidth = 0;
    if (eventResize) {
        windowWidth = eventResize.target.innerWidth;
    }else {
        windowWidth = window.innerWidth;
    }
    var btnClose = document.querySelector('.c-modal__close');
    if(windowWidth >= screen_md){ 
        funcBackgroundImageBlocks('.c-modal','.c-modal__thumbnail','left','center','.c-modal__block');       
        if (btnClose){
            btnClose.innerHTML = 'Закрыть';
        }
    }else {
        var modalBlock = document.querySelector('.c-modal__block');
        if (modalBlock){
          modalBlock.style.backgroundImage = '';  
        }        
        if (btnClose){
            btnClose.innerHTML = '&times';
        }        
    }    
    var modalBtnElements = document.querySelectorAll('.modal--open');
    for (var i = 0; i < modalBtnElements.length; i++) {
        if(modalBtnElements[i]){
            modalBtnElements[i].onclick = function(event){
                var dataBtn = this.dataset;
                var modalBlock = document.querySelector('.c-modal');
                var dataModal = modalBlock.dataset;
                if (dataBtn.modalName == dataModal.modalName){
                    modalBlock.classList.add(classOpen);
                }
                
            }; 
        }
    }  
};
modalFuncInit();
window.addEventListener('resize', function(eventResize){
    modalFuncInit(eventResize);
});
document.addEventListener('click', function(event) {
    var modaBlockElement = document.querySelector('.c-modal__block');
    if(modaBlockElement){
        var isClickInside = modaBlockElement.contains(event.target);
        if (!isClickInside) {
            modaBlockElement.parentNode.parentNode.parentNode.classList.remove(classOpen); 
        }        
    }
}); 
var modalBtnClose = document.querySelector('.c-modal__close');
if(modalBtnClose){
    modalBtnClose.onclick = function(event){
        var parentBlock = this.parentNode.parentNode.parentNode.parentNode;
        if (parentBlock.classList.contains(classOpen)) {
            parentBlock.classList.remove(classOpen);  
        }
    };    
}
/*
 *  Animations 
 */                