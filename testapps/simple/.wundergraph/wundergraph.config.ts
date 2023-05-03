import { configureWunderGraphApplication, cors, EnvironmentVariable, introspect, templates } from '@wundergraph/sdk';
import server from './wundergraph.server';
import operations from './wundergraph.operations';
import generate from './wundergraph.generate';

const weather = introspect.graphql({
	apiNamespace: 'weather',
	url: 'https://weather-api.wundergraph.com/',
});

const occ = introspect.openApi({
	apiNamespace: 'occ',
	source: {
		kind: 'file',
		filePath: '../specs/occ.json',
	},
	baseURL: 'https://spartacus-demo.eastus.cloudapp.azure.com:8443/occ/v2/',
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
	// apis: [weather],
	apis: [weather, occ],
	server,
	operations,
	// codeGenerators: [
	// 	{
	// 		templates: [
	// 			// use all the typescript react templates to generate a client
	// 			...templates.typescript.all,
	// 		],
	// 		// create-react-app expects all code to be inside /src
	// 		// path: "../frontend/src/generated",
	// 	},
	// ],
	generate,
	cors: {
		...cors.allowAll,
		allowedOrigins: ['http://localhost:9991', 'http://127.0.0.1:9991'],
	},
	dotGraphQLConfig: {
		hasDotWunderGraphDirectory: false,
	},
	security: {
		enableGraphQLEndpoint: true,
	},
});
