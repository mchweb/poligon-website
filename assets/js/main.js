/*==================   Basic    ======================*/
/*==================   Home page    ======================*/
/*-------------  Infoblock  -------------*/
var cInfoblocks =  document.getElementsByClassName('c-infoblock');
for (var i = 0; i < cInfoblocks.length; i++) {
    var cInfoblocksThumbnail = cInfoblocks[i].querySelector('.c-infoblock__thumbnail');
    cInfoblocksThumbnail.style.display = 'none';
    cInfoblocks[i].style.backgroundImage = 'url('+cInfoblocksThumbnail.getAttribute('src')+')';
    cInfoblocks[i].style.backgroundPosition = 'right center';
    cInfoblocks[i].style.backgroundRepeat = 'no-repeat';
    cInfoblocks[i].style.backgroundSize = 'cover';
    
}
//$(element).find('.c-topnews__thumbnail').find('img').css("display", "none");
//            $(element).find('.c-topnews__background').css('background-image', 'url(' + $(element).find('.c-topnews__thumbnail').find('img').attr('src') + ')'); 
//            $(element).find('.c-topnews__background').css({'background-position':'center center'});
//            $(element).find('.c-topnews__background').css({'background-repeat':'no-repeat'});
//            $(element).find('.c-topnews__background').css({'background-size': 'cover'}); 
/*==================   Images    ======================*/    
/*==================   Navigation menu    ======================*/
/*==================   Animations   ======================*/



