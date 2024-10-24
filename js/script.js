'use strict'

// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // // Close mobile naviagtion
    // if (link.classList.contains("main-nav-link"))
    //   headerEl.classList.toggle("nav-open");
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

const animaCount = function ( targetId, targetValue ) {
  let currentValue = 0;
  const UpdateInterval = setInterval( () => {
    currentValue += 1;
    if ( currentValue >= targetValue ) {
      currentValue = targetValue;
      clearInterval( UpdateInterval );
    }
    targetId.textContent = currentValue;
  }, 50 )
}

const increasNums = function ( entries ) {
    const [ entry ] = entries;
  if ( entry.isIntersecting ) {
    animaCount(newMembers, 26)
    animaCount(totalMembers, 42)
    animaCount(depNum, 4)
    animaCount(projNum, 10)
  }
}

const overviewObserver = new IntersectionObserver( increasNums, {
  root: null,
  threshold: 0,
} );

overviewObserver.observe( overviewSection );
