import { AbstractAnalytic, defaultDependencies } from '@ima/plugin-analytic';

const GTAG_ROOT_VARIABLE = 'gtag';

/**
 * Google analytic 4 class
 */
export default class GoogleAnalytics4 extends AbstractAnalytic {
  /** @type {import('@ima/core').Dependencies} */
  static get $dependencies() {
    return [...defaultDependencies, '$Settings.plugin.analytic.google4'];
  }

  set _ga4Script(value) {
    const clientWindow = this._window.getWindow();

    clientWindow[GTAG_ROOT_VARIABLE] = value;
  }

  get _ga4Script() {
    const clientWindow = this._window.getWindow();

    return clientWindow[GTAG_ROOT_VARIABLE];
  }

  /**
   * Initializes the Google Analytics 4 plugin.
   *
   * @param {import('@ima/plugin-script-loader').ScriptLoaderPlugin} scriptLoader
   * @param {import('@ima/core').Window} window
   * @param {import('@ima/core').Dispatcher} dispatcher
   * @param {Object<string, *>} config
   */
  constructor(scriptLoader, window, dispatcher, config) {
    super(scriptLoader, window, dispatcher, config);

    this._analyticScriptName = 'google_analytics_4';

    this._analyticScriptUrl = `https://www.googletagmanager.com/gtag/js?id=${this._config.service}`;

    this._consentSettings = this._config.consentSettings;

    /**
     * Stores page location to serve as next page hit's referrer
     * to compensate for SPA browsing.
     */
    this._referrer = '';
  }
  /**
   * Hits custom event of given with given data
   *
   * @param {string} eventName custom event name
   * @param {Object<string, *>} eventData custom event data
   */
  hit(eventName, eventData) {
    if (!this.isEnabled()) {
      return;
    }

    this._ga4Script('event', eventName, eventData);
  }

  /**
   * Hit page view event to analytic with defined data.
   *
   * @override
   * @param {Object<string, *>} pageData
   */
  hitPageView(pageData) {
    if (!this.isEnabled()) {
      return;
    }
    const pageViewData = this._getPageViewData(pageData);
    this._ga4Script('event', 'page_view', pageViewData);
    this._referrer = pageViewData.page_location;
  }

  /**
   * Updates user consents in Google Analytics script
   *
   * @param {Object<string, *>} purposeConsents Purpose Consents of TCModel, see: https://www.npmjs.com/package/@iabtcf/core#tcmodel
   */
  updateConsent(purposeConsents) {
    this._applyPurposeConsents(purposeConsents);

    this._ga4Script('consent', 'update', {
      ...this._consentSettings,
    });
  }

  /**
   * @override
   * @inheritdoc
   */
  _applyPurposeConsents(purposeConsents) {
    if (purposeConsents && typeof purposeConsents === 'object') {
      if (purposeConsents['1']) {
        this._consentSettings.analytics_storage = 'granted';
      } else {
        this._consentSettings.analytics_storage = 'denied';
      }
    }
  }

  /**
   * @override
   * @inheritdoc
   */
  _configuration() {
    if (
      this.isEnabled() ||
      !this._ga4Script ||
      typeof this._ga4Script !== 'function'
    ) {
      return;
    }

    this._enable = true;

    this._ga4Script('consent', 'default', {
      ...this._consentSettings,
      wait_for_update: this._config.waitForUpdateTimeout,
    });

    this._ga4Script('js', new Date());

    this._ga4Script('config', this._config.service, {
      send_page_view: false,
    });
  }

  /**
   * Returns page view data derived from pageData param.
   *
   * @param {Object<string, *>} pageData
   * @returns {Object<string, *>} pageViewData
   */
  _getPageViewData(pageData) {
    const page_location = this._window.getUrl();
    const page_referrer =
      this._referrer || this._window?.getDocument()?.referrer;

    return {
      page_path: pageData.path,
      page_location,
      page_referrer,
      page_route: pageData?.route?.getName() || '',
      page_status: pageData?.response?.status,
      page_title: document.title || '',
    };
  }

  /**
   * @override
   * @inheritdoc
   */
  _createGlobalDefinition() {
    const window = this._window.getWindow();

    window.dataLayer = window.dataLayer || [];

    this._ga4Script = function () {
      window.dataLayer.push(arguments);
    };

    this._configuration();
  }
}
