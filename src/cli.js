import meow from 'meow'

import staticSheets from './index'
import createConfig from './create-config'

const cli = meow(`
	Usage
	  $ static-sheets <command>

	Commands
	  $ build           Creates a distribution build
	  $ create-config   Creates a new config file

	Options
	  --config, -c   Path to your config file, default: static-sheets.config.js
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

switch (cli.flags.input[0]){
	case 'build':
		staticSheets(null, cli.flags.config)
		break
	case 'create-config':
		createConfig(cli.flags.config)
		break
}