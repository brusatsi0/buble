import Node from '../Node.js';
import CompileError from '../../utils/CompileError.js';

export default class TaggedTemplateExpression extends Node {
	initialise () {
		throw new CompileError( this.tag, 'Tagged template expressions are not supported' );
	}
}
