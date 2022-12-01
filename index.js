/**
 * Applies stickymenu effect on HTMLElement and offers several options.
 * For detailed list of option params see constructor() function.
 *
 * @param {String} element element as string or already existing HTMLElement
 * @param {Object} options the options to pass. See constructor() fn for detailed list of options
 */
export default class StickyMenu {
  constructor(element, options) {
    this.startStickyAtPos = options.startStickyAtPos || 0;
    this.breakpoint = options.breakpoint || 0; // if breakpoint is set, init only above breakpoint
    this.navElement = element;
    this.navClass = 'stickymenu';
    this.navPos = options.navPos || null;
    this.navActiveClass = 'stickymenu-active';
    this.contentElement = options.contentElement;
    this.contentElementOffset = options.contentElementOffset;
    this.setContentOffset = options.setContentOffset || false;
    this.zIndex = options.zIndex || null;
    this.slideIn = options.slideIn || false;
    this.slideInStartPos = options.slideInStartPos || null;
    this.slideInStartPos = options.slideInStartPos || null;
    this.hide = options.hide || false;
  }

  /**
   * Initializes event listeners and calls navPosition() function.
   *
   * @param {HTMLElement} element The element to apply to stickymenu effect onto
   * @param {object} options The options to pass while initializing
   * @returns {void}
   */
  init() {
    // call navPosition() while scrolling
    let scrollTimer = null;
    let resizeTimer = null;
    window.addEventListener('scroll', () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        this.navPosition();
      }, 10);
    });

    // call navPosition() if screen resizes (e.g. portrait->landscape)
    window.addEventListener('resize', () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.navPosition();
      }, 10);
    });
  }

  /**
   * Toggles stickymenu mode depending on window.scrollY
   *
   * @returns {void}
   */
  navPosition() {
    let contentElementOffset = 0; // set offset in sticky mode to prevent content jumping
    if (window.innerWidth > this.breakpoint) {
      this.elementInitialOffsetTop = this.navElement.offsetTop;

      // use value from options or nav height
      if (!this.contentElementOffset) {
        contentElementOffset = this.navElement.offsetHeight;
      } else {
        contentElementOffset = this.contentElementOffset;
      }

      // apply stickymenu mode:
      if (window.scrollY > this.startStickyAtPos) {
        contentElementOffset = this.contentElementOffset;
        this.activate();
      } else {
        // remove stickymenu mode
        contentElementOffset = 0;
        this.deactivate();
      }

      // apply offset to content element
      if (this.contentElement !== null && this.setContentOffset === true) {
        this.contentElement.style.marginTop = `${contentElementOffset}px`;
      }
    }
  }

  activate() {
    // left optional offset left
    if (this.navPos !== null) {
      this.navElement.style.left = `${this.navPos.left}px`;
    }

    if (this.zindex !== null) {
      this.navElement.style.zIndex = this.zIndex;
    }

    if (this.hide && this.navElement.hidden) {
      this.navElement.hidden = false;
    }
    this.navElement.classList.add(this.navClass, this.navActiveClass);
    document.body.classList.add(this.navActiveClass);
  }

  deactivate() {
    if (this.zIndex !== null) {
      this.navElement.style.zIndex = 'inherit';
    }

    if (this.hide && !this.navElement.hidden) {
      this.navElement.hidden = true;
    }

    this.navElement.classList.remove(this.navClass, this.navActiveClass);
    document.body.classList.remove(this.navActiveClass);
  }
}
