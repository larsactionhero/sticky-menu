/**
 * Applies stickymenu effect on HTMLElement and offers several options.
 * For detailed list of option params see constructor() function.
 *
 * @param {String} element element as string or already existing HTMLElement
 * @param {Object} options the options to pass. See constructor() fn for detailed list of options
 */
export default class StickyMenu {
  constructor(options) {
    this.scrollPosY = options.scrollPosY || 0;
    this.breakpoint = options.breakpoint || 0; // if breakpoint is set, init only above breakpoint
    this.menuElement = options.menuElement;
    this.menuClass = 'stickymenu';
    this.menuActiveClass = `${this.menuClass}-active`;
    this.bodyMenuActiveClass = `${this.menuClass}-is-active`;
    this.contentElement = options.contentElement || null;
    this.contentElementOffset = options.contentElementOffset;
    this.isActive = false;
    this.scrollEventTimeout = options.scrollEventTimeout || 50;
    this.resizeEventTimeout = options.resizeEventTimeout || 50;
    this.onDoInitStickyMenu = null;
  }

  /**
   *
   * @param {*} event
   */
  onInitStickyMenu(event) {
    let timer = null;
    let timeout = null;
    const { type } = event;

    if (type === 'scroll') {
      timeout = this.scrollEventTimeout;
    } else if (type === 'resize') {
      timeout = this.resizeEventTimeout;
    }

    this.setActiveMode();

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      this.menuPosition();
    }, timeout);
  }

  /**
   * sets this.isActive to true if scrollY is above scrollPosY
   */
  setActiveMode() {
    this.isActive = window.scrollY > this.scrollPosY;
  }

  /**
   * Toggles stickymenu mode depending on window.scrollY
   *
   * @returns {void}
   */
  menuPosition() {
    if (window.innerWidth >= this.breakpoint) {
      this.elementInitialOffsetTop = this.menuElement.offsetTop;
      const contentElementOffset = this.isActive ? this.contentElementOffset : 0;

      // apply offset to content element
      if (this.contentElementOffset && this.contentElement !== null) {
        this.contentElement.style.marginTop = `${contentElementOffset}px`;
      }

      this.setMenuMode();
    }
  }

  /**
   * enables or disabled sticky menu
   */
  setMenuMode() {
    if (this.isActive) {
      this.menuElement.classList.add(this.menuClass, this.menuActiveClass);
      document.body.classList.add(this.bodyMenuActiveClass);
    } else {
      this.menuElement.classList.remove(this.menuClass, this.menuActiveClass);
      document.body.classList.remove(this.bodyMenuActiveClass);
    }
  }

  /**
   * removes both scroll & resize listeners
   */
  removeEvents() {
    window.removeEventListener('scroll', this.onDoInitStickyMenu);
    window.removeEventListener('resize', this.onDoInitStickyMenu);
  }

  /**
   * optional: removes only scroll event
   */
  removeScrollEvent() {
    window.removeEventListener('scroll', this.onDoInitStickyMenu);
  }

  /**
   * optional: removes only resize event
   */
  removeResizeEvent() {
    window.removeEventListener('resize', this.onDoInitStickyMenu);
  }

  /**
   * Initializes event listeners for scroll & resize and calls onInitStickyMenu()
   */
  init() {
    this.destroy(); // reset at first
    this.onDoInitStickyMenu = this.onInitStickyMenu.bind(this);
    window.addEventListener('scroll', this.onDoInitStickyMenu);
    window.addEventListener('resize', this.onDoInitStickyMenu);
  }

  /**
   * resets sticky menu and removes all related classes from elements
   */
  destroy() {
    this.isActive = false;
    this.removeEvents();
    this.setMenuMode();
  }
}
