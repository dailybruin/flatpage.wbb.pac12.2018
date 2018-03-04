$(document).ready(function() {
	$('#fullpage').fullpage({
        slidesNavigation: true,
        dragAndMove: true,
        slidesNavPosition: 'top',
        scrollOverflow: true,

        onSlideLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex){
            console.log(anchorLink);
            console.log(index)
            if(anchorLink == 'gallery-human') {

            }
            else if (anchorLink == 'gallery-game') {

            }
            // var leavingSlide = $(this);
    
            // //leaving the first slide of the 2nd Section to the right
            // if(index == 2 && slideIndex == 0 && direction == 'right'){
            //     alert("Leaving the fist slide!!");
            // }
    
            // //leaving the 3rd slide of the 2nd Section to the left
            // if(index == 2 && slideIndex == 2 && direction == 'left'){
            //     alert("Going to slide 2! ");
            // }
        }
    });
});