import ScriptLoaderPlugin from '../ScriptLoaderPlugin';
import Events from '../events';

describe('ScriptLoaderPlugin', () => {
	let scriptLoaderPlugin = null;
	let url = '//example.com/some.js';

	let ImaWindow = {
		isClient: () => {}
	};
	let ImaDispatcher = {
		fire: () => {}
	};

	beforeEach(() => {
		scriptLoaderPlugin = new ScriptLoaderPlugin(ImaWindow, ImaDispatcher, Events);
	});

	describe('load method', () => {

		it('should reject promise with error on server side', () => {
			spyOn(ImaWindow, 'isClient')
				.and
				.returnValue(false);

			scriptLoaderPlugin
				.load(url)
				.catch((value) => {
					expect(value.url).toEqual(url);
					expect(value.error instanceof Error).toEqual(true);
				});
		});

		it('should return value from cache', () => {
			spyOn(ImaWindow, 'isClient')
				.and
				.returnValue(true);

			scriptLoaderPlugin._loadedScripts[url] = Promise.resolve({ url });

			scriptLoaderPlugin
				.load(url)
				.then((value) => {
					expect(value.url).toEqual(url);
				});
		});

	});

});
