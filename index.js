/**
 * Applies stickymenu effect on HTMLElement and offers several options.
 * For detailed list of option params see constructor() function.
 *
 * @param {String} element element as string or already existing HTMLElement
 * @param {Object} options the options to pass. See constructor() fn for detailed list of options
 */
 export default class StickyMenu {
  constructor(options) {
    this.startStickyAtPos = options.startStickyAtPos || 0;
    this.breakpoint = options.breakpoint || 0; // if breakpoint is set, init only above breakpoint
    this.menuElement = options.menuElement;
    this.menuClass = 'stickymenu';
    this.menuActiveClass = 'stickymenu-active';
    this.bodyMenuActiveClass = 'stickymenu-is-active';
    this.contentElement = options.contentElement;
    this.contentElementOffset = options.contentElementOffset;
    this.setContentOffset = options.setContentOffset || false;
    this.zIndex = options.zIndex || null;
    this.isActive = false;
    this.scrollInterval = options.scrollInterval || 10;
    this.resizeInterval = options.resizeInterval || 10;
  }

  /**
   * Initializes event listeners and calls menuPosition() function.
   */
  init() {
    // call menuPosition() while scrolling
    let scrollTimer = null;
    let resizeTimer = null;
    window.addEventListener('scroll', () => {
      this.setIsActive();
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        this.menuPosition();
      }, this.scrollInterval);
    });

    // call menuPosition() if screen resizes (e.g. portrait->landscape)
    window.addEventListener('resize', () => {
      this.setIsActive();
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.menuPosition();
      }, this.resizeInterval);
    });
  }

  setIsActive() {
    this.isActive = (window.scrollY > this.startStickyAtPos);
  }

  /**
   * Toggles stickymenu mode depending on window.scrollY
   *
   * @returns {void}
   */
  menuPosition() {
    if (window.innerWidth > this.breakpoint) {
      this.elementInitialOffsetTop = this.menuElement.offsetTop;

      const contentElementOffset = (this.isActive) ? this.contentElementOffset : 0;

      // apply stickymenu mode:
      if (this.isActive) {
        this.activate();
      } else {
        this.deactivate();
      }

      // apply offset to content element
      if (this.contentElement !== null && this.setContentOffset) {
        this.contentElement.style.marginTop = `${contentElementOffset}px`;
      }
    } else {
      this.deactivate();
    }
  }

  activate() {
    if (this.zindex !== null) {
      this.menuElement.style.zIndex = this.zIndex;
    }

    this.menuElement.classList.add(this.menuClass, this.menuActiveClass);
    document.body.classList.add(this.bodyMenuActiveClass);
  }

  deactivate() {
    if (this.zIndex !== null) {
      this.menuElement.style.zIndex = 'inherit';
    }

    this.menuElement.classList.remove(this.menuClass, this.menuActiveClass);
    document.body.classList.remove(this.bodyMenuActiveClass);
  }
}
