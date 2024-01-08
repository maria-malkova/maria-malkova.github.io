
// if(window.matchMedia('(max-width: 768px)').matches){
//     $(document).ready(function (){
//         $('.portfolio__list').slick({
//             arrows: true,
//             vertical: true,
//             verticalSwiping: true,
//             slidesToShow: 3,
//             autoplay: false,
//             autoplaySpeed: 7000,
    
//             prevArrow: '.portfolio__top',
//             nextArrow: '.portfolio__bottom',
//         });
//     })
// }


$(document).ready(function (){
    $('.portfolio__list').slick({
        arrows: true,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 2,
        autoplay: true,
        autoplaySpeed: 7000,

        prevArrow: '.portfolio__top',
        nextArrow: '.portfolio__bottom',

        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
              }
            },
          ]
    });
})


