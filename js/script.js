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

// // Sticky Nacigation

// const nav = document.querySelector( '.page-nav__items' );

// const stickyNav = function ( entries ) {
//     const [ entry ] = entries;
//     console.log(entry);
//   if ( !entry.isIntersecting ) {
//     nav.classList.add( 'sticky' )
//   }
//   else {
//     nav.classList.remove('sticky')
//   }
// }

// const navHeight = nav.getBoundingClientRect().height;

// const header = document.querySelector( '.header' );
// const headerObserver = new IntersectionObserver( stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`
// } );

