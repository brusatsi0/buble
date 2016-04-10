// TODO this function is slightly flawed – it works on the original string,
// not its current edited state.
// That's not a problem for the way that it's currently used, but it could
// be in future...
export default function deindent ( node, code ) {
	const start = node.start;
	const end = node.end;

	const indentStr = code.getIndentString();
	const pattern = new RegExp( indentStr + '\\S', 'g' );

	let isExcluded = {};
	node.findChildren( 'TemplateLiteral' ).forEach( node => {
		for ( let i = node.start; i < node.end; i += 1 ) {
			isExcluded[i] = true;
		}
	});

	if ( code.original.slice( start - indentStr.length, start ) === indentStr ) {
		code.remove( start - indentStr.length, start );
	}

	const slice = code.original.slice( start, end );
	let match;
	while ( match = pattern.exec( slice ) ) {
		if ( !isExcluded[ match.index ] ) code.remove( start + match.index, start + match.index + indentStr.length );
	}
}
