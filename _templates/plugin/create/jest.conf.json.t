---
to: packages/<%= h.changeCase.paramCase(name) %>/jest.conf.json
---
{
	"bail": true,
	"verbose": true,
	"coverageThreshold": {
		"global": {
			"functions": 10,
			"lines": 10,
			"statements": 10
		}
	},
	"testEnvironment": "node",
	"setupFiles": [],
	"modulePaths": [
		"<rootDir>/"
	],
	"transform": {
		"\\.jsx?": "<rootDir>/../../preprocess.js"
	},
	"testPathIgnorePatterns": ["__snapshots__", "/node_modules/"],
	"testRegex": "(/src(/?[^/]*){0,5}/__tests__/).*Spec\\.jsx?$"
}
