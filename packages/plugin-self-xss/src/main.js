import SelfXSS from './SelfXSS';

const $registerImaPlugin = () => {
  // Nothing to do, this is required only for IMA to recognize this npm
  // module as an IMA plugin.
};

export default SelfXSS;

export { $registerImaPlugin, SelfXSS };
