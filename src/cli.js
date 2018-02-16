import meow from 'meow'

const cli = meow(`
	Usage
	  $ static-sheets

	Options
	  --config, -c   Path to your config file, default: static-sheets.config.js
	  --output, -o   Directory to output API, default: dist
`, {
	flags: {
		config: {
			type: 'string',
			alias: 'c',
			default: 'static-sheets.config.js',
		},
		output: {
			type: 'string',
			alias: 'o',
			default: 'dist',
		},
	}
})

