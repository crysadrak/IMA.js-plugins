import * as Main from '../main';

describe('Main', () => {
  it('should export FacebookPixelAnalytic', () => {
    expect(typeof Main.FacebookPixelAnalytic).toEqual('function');
  });

  it('should export defaultDependencies', () => {
    expect(Array.isArray(Main.defaultDependencies)).toEqual(true);
  });
});
