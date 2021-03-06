function buildUpRestAPI( rest ){
	//rest.context( '/api' );

	rest.head('/peek', function( request ){
		console.log( 'Received:' + JSON.stringify( request ) );
		return 'ok';
	});
	rest.get('/empty', function( request ){
		console.log( 'Received:' + JSON.stringify( request ) );
		return '';
	});
	rest.get('/books/:title/:chapter', function( request ){
		console.log( 'Received:' + JSON.stringify( request ) );
		return request.parameters;
	});
	rest.post('/store/?id', function( request, content, callback ){
		console.log( 'Received:' + JSON.stringify( request ) + ' ' + JSON.stringify(content) );
		return callback(null, request.parameters);
	});
	rest.get('/inquire/*book', function( request, content, callback ){
		console.log( 'Received:' + JSON.stringify( request ) + ' ' + JSON.stringify(content) );
		return callback(null, 'ok');
	});
	rest.get( '/set/?rid/?facet', function( request, content, callback ){
		console.log( 'Received:' + JSON.stringify( request ) + ' ' + JSON.stringify(content) );
		return callback(null, '{ "key"     :    "value" }', { minify: true } );
	});
	rest.post( { path: '/make', version: '>=1.0.0' }, function( request, content, callback ){
		console.log( 'Received:' + JSON.stringify( request ) + ' ' + JSON.stringify(content) );
		return callback(null, 'ok');
	});
	rest.post( [ '/act', '/do' ], function( request, content, callback ){
		console.log( 'Received:' + JSON.stringify( request ) + ' ' + JSON.stringify(content) );
		return callback( null, 'ok' );
	});
	rest.post( [ { path: '/shake', version: '>=2.0.0' }, { path: '/twist', version: '>=2.1.1' } ], function( request, content, callback ){
		console.log( 'Received:' + JSON.stringify( request ) + ' ' + JSON.stringify(content) );
		return callback(null, 'ok');
	}, {'title': 'Alice in Wonderland'} );

	rest.get( '/data/items', function( request, content, callback ){
		console.log( 'Received::' + JSON.stringify( request ) + ' ' + JSON.stringify(content) );
		return callback(null, request.parameters, {statusCode:201} );
	}, { contentType:'application/json', validator: function(req, res){ return true; } } );

	rest.get( '/call/:system/?entity/?version/:subject', function( request, content, callback ){
		console.log( 'Received::' + JSON.stringify( request.parameters ) + ' ' + JSON.stringify(content) );
		return callback(null, request.parameters, {statusCode:201} );
	}, { contentType:'application/json' } );

	rest.get( { path: '/unprotected', unprotected: true }, function( request, content, callback ){
		console.log( 'Called unprotected zone...');
		return callback(null, 'Welcome guest...', {statusCode:200} );
	}, { contentType:'application/json' } );
}

exports.buildUpRestAPI = buildUpRestAPI;
