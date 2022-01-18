import { useComponentUtils } from './componentUtils';

/**
 * IMA $Settings access provider with optional selector.
 *
 * @example
 * const settings = useSettings();
 * console.log(settings.$Cache.enabled);
 *
 * // Using settings selector
 * const { scripts, documentView } = useSettings('$Page.$Render');
 * const esScripts = useSettings('$Page.$Render.esScripts');
 *
 * @param {string?} selector Optional path selector.
 * @return {object} Settings object or
 *  specific sub-settings if selector is provided.
 */
function useSettings(selector) {
  const { $Settings } = useComponentUtils();

  if (selector) {
    let segment;
    let curSettings = $Settings;
    const segments = selector.split('.');

    while ((segment = segments.shift())) {
      if (!(segment in curSettings)) {
        return {};
      }

      curSettings = curSettings[segment];
    }

    return curSettings;
  }

  return $Settings;
}

export { useSettings };