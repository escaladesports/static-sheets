import meow from 'meow'

import staticSheets from './index'
import createConfig from './create-config'

const cli = meow(`
	Usage
	  $ static-sheets <command>

	Options
	  --config, -c   Path to your config file, default: static-sheets.config.js
`, {
	flags: {
		config: {
			type: 'string',
			alias: 'c',
			default: 'static-sheets.config.js',
		},
	}
})

staticSheets(null, cli.flags.config)