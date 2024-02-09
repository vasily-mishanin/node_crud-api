const path = require('path');
const fileURLToPath = require('url');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        target: 'node',
        mode: isProduction ? 'production' : 'development',
        devtool: 'inline-source-map',
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },

        resolve: {
            extensions: ['.ts', '.js'],
            extensionAlias: {
                '.js': ['.js', '.ts'],
                '.cjs': ['.cjs', '.cts'],
                '.mjs': ['.mjs', '.mts'],
            },
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(
                                __dirname,
                                'tsconfig.json',
                            ),
                        },
                    },
                    exclude: /node_modules/,
                },
            ],
        },
    };
};
