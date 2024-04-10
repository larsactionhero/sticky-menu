/**
 * Applies stickymenu effect on HTMLElement and offers several options.
 * For detailed list of option params see constructor() function.
 *
 * @param {String} element element as string or already existing HTMLElement
 * @param {Object} options the options to pass. See constructor() fn for detailed list of options
 */
export default class StickyMenu {
  constructor(options) {
    this.startPos = options.startPos || 0;
    this.breakpoint = options.breakpoint || 0; // if breakpoint is set, init only above breakpoint
    this.menuElement = options.menuElement;
    this.menuClass = 'stickymenu';
    this.menuActiveClass = 'stickymenu-active';
    this.bodyMenuActiveClass = 'stickymenu-is-active';
    this.contentElement = options.contentElement;
    this.contentElementOffset = options.contentElementOffset;
    this.setContentOffset = options.setContentOffset || false;
    this.isActive = false;
    this.scrollInterval = options.scrollInterval || 10;
    this.resizeInterval = options.resizeInterval || 10;
    this.onDoInitStickyMenu = null;
  }

  /**
   *
   * @param {*} event
   */
  onInitStickyMenu(event) {
    let timer = null;
    let interval = null;
    const { type } = event;

    if (type === 'scroll') {
      interval = this.scrollInterval;
    } else if (type === 'resize') {
      interval = this.resizeInterval;
    }

    this.setActiveMode();

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      this.menuPosition();
    }, interval);
  }

  /**
   * sets this.isActive to true if scrollY is above startPos
   */
  setActiveMode() {
    this.isActive = window.scrollY > this.startPos;
  }

  /**
   * Toggles stickymenu mode depending on window.scrollY
   *
   * @returns {void}
   */
  menuPosition() {
    if (window.innerWidth > this.breakpoint) {
      this.elementInitialOffsetTop = this.menuElement.offsetTop;
      const contentElementOffset = this.isActive ? this.contentElementOffset : 0;

      // apply offset to content element
      if (this.setContentOffset && this.contentElement !== null) {
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
