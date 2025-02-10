'use strict'

// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    // Scroll back to top
    if (href === "#")
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if ( href !== "#" && href.startsWith( "#" ) ) {
      e.preventDefault();
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

  });
} );

// Sticky Nacigation

const nav = document.querySelector( '.page-nav__items' );
const mainNav = document.querySelector('.nav-container')

const stickyNav = function ( entries ) {
    const [ entry ] = entries;
  if ( !entry.isIntersecting ) {
    nav.classList.add( 'sticky' );
    mainNav.classList.add( 'sticky' );

  }
  else {
    nav.classList.remove( 'sticky' );
    mainNav.classList.add( 'sticky' );
  }
}

const navHeight = nav.getBoundingClientRect().height;

const header = document.querySelector( '.header' );
const headerObserver = new IntersectionObserver( stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
} );

headerObserver.observe( header );

// Increasing Overview Number


const overviewSection = document.querySelector( '.overview-section' )

const newMembers = document.querySelector('.new-members__num')
const totalMembers = document.querySelector('.total-members__num')
const depNum = document.querySelector('.dep-num')
const projNum = document.querySelector( '.proj-num' )

const animaCount = function ( targetId, targetValue, time ) {
  let currentValue = 0;
  const UpdateInterval = setInterval( () => {
    currentValue += 3;
    if ( currentValue >= targetValue ) {
      currentValue = targetValue;
      clearInterval( UpdateInterval );
    }
    targetId.textContent = currentValue;
  }, time )
}

const increasNums = function ( entries ) {
    const [ entry ] = entries;
  if ( entry.isIntersecting ) {
    animaCount(newMembers, 26, 100)
    animaCount(totalMembers, 42, 75)
    animaCount(depNum, 4, 500)
    animaCount(projNum, 10, 300)
  }
}

const overviewObserver = new IntersectionObserver( increasNums, {
  root: null,
  threshold: 0,
} );

overviewObserver.observe( overviewSection );


// Slider
const slides = document.querySelectorAll( '.slide' )
const slider = document.querySelector( '.slider' );
const btnLeft = document.querySelector( '.slider__btn--left' );
const btnRight = document.querySelector( '.slider__btn--right' );
const dotContainer = document.querySelector( '.dots' );

let curSlide = 0;
const maxSlide = slides.length;


const creatDots = function () {
  slides.forEach( ( _, i ) => {
    dotContainer.insertAdjacentHTML( 'beforeend',
      `<button class="dots__dot" data-slide="${ i }"></button>` );
  })
}

const activateDots = function (slide) {
  document.querySelectorAll( '.dots__dot' ).forEach( dot =>
    dot.classList.remove('dots__dot--active'));
  document.querySelector( `.dots__dot[data-slide="${ slide }"]` )
    .classList.add( 'dots__dot--active' );
}

const goToSlide = function (s) {
  slides.forEach( (slide, index) => {
    slide.style.transform = `translateX(${ ( ( index - s ) * 100 ) }%)`;
} )
}

const nextSlide = function () {
  if ( curSlide === maxSlide - 1){
    curSlide = 0;
  }
  else {
    curSlide++;
  }
  goToSlide( curSlide );
  activateDots( curSlide );
}

const prevSlide = function () {
  if ( curSlide === 0 ) {
    curSlide = maxSlide - 1;
  }
  else {
    curSlide--;
  }
  goToSlide( curSlide );
  activateDots( curSlide );
}

creatDots();
goToSlide( 0 );
activateDots( 0 );

// slider by left and right button
btnRight.addEventListener( 'click', nextSlide );
btnLeft.addEventListener( 'click', prevSlide );

// Slider by KeyBoard right and left Arrow keys
document.addEventListener( 'keydown', function ( e ) {
  if ( e.key === 'ArrowRight' ) {
    nextSlide();
  }
  else if ( e.key === 'ArrowLeft' ) {
    prevSlide();
  }
} );

// Slider by Dots;
dotContainer.addEventListener( 'click', function(e){
  if ( e.target.classList.contains( 'dots__dot' ) ) {
    const slide = e.target.dataset.slide;
    goToSlide( slide );
    activateDots( slide );
  }
})

