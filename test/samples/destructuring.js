module.exports = [
	{
		description: 'destructures an identifier with an object pattern',
		input: `var { x, y } = point;`,
		output: `var x = point.x, y = point.y;`
	},

	{
		description: 'destructures a non-identifier with an object pattern',
		input: `var { x, y } = getPoint();`,
		output: `var ref = getPoint(), x = ref.x, y = ref.y;`
	},

	{
		description: 'destructures a parameter with an object pattern',

		input: `
			function pythag ( { x, y: z = 1 } ) {
				return Math.sqrt( x * x + z * z );
			}`,

		output: `
			function pythag ( ref ) {
				var x = ref.x;
				var ref_y = ref.y, z = ref_y === void 0 ? 1 : ref_y;

				return Math.sqrt( x * x + z * z );
			}`
	},

	{
		description: 'destructures an identifier with an array pattern',
		input: `var [ x, y ] = point;`,
		output: `var x = point[0], y = point[1];`
	},

	{
		description: 'destructures an identifier with a sparse array pattern',
		input: `var [ x, , z ] = point;`,
		output: `var x = point[0], z = point[2];`
	},

	{
		description: 'destructures a non-identifier with an array pattern',
		input: `var [ x, y ] = getPoint();`,
		output: `var ref = getPoint(), x = ref[0], y = ref[1];`
	},

	{
		description: 'destructures a parameter with an array pattern',

		input: `
			function pythag ( [ x, z = 1 ] ) {
				return Math.sqrt( x * x + z * z );
			}`,

		output: `
			function pythag ( ref ) {
				var x = ref[0];
				var ref_1 = ref[1], z = ref_1 === void 0 ? 1 : ref_1;

				return Math.sqrt( x * x + z * z );
			}`
	},

	{
		description: 'disallows compound destructuring in declarations',
		input: `var { a: { b: c } } = d;`,
		error: /Compound destructuring is not supported/
	},

	{
		description: 'disallows compound destructuring in parameters',
		input: `function foo ( { a: { b: c } } ) {}`,
		error: /Compound destructuring is not supported/
	},

	{
		description: 'disallows array pattern in assignment (temporary)',
		input: `[ a, b ] = [ b, a ]`,
		error: /Assigning to an array pattern is not currently supported/
	},

	{
		description: 'can be disabled in declarations with `transforms.destructuring === false`',
		options: { transforms: { destructuring: false } },
		input: `var { x, y } = point;`,
		output: `var { x, y } = point;`
	},

	{
		description: 'can be disabled in function parameters with `transforms.parameterDestructuring === false`',
		options: { transforms: { parameterDestructuring: false } },
		input: `function foo ({ x, y }) {}`,
		output: `function foo ({ x, y }) {}`
	}
];
