const env = require("./env");

module.exports = {
    plugins:
        env.NODE_ENV === 'production' ?
            [
                "postcss-flexbugs-fixes",
                ...(
                    [
                        [
                            '@fullhuman/postcss-purgecss',
                            {
                                content: [
                                    './pages/**/*.{js,jsx,ts,tsx}',
                                    './components/**/*.{js,jsx,ts,tsx}',
                                    './layout/**/*.{js,jsx,ts,tsx}',
                                ],
                                whitelist: ['democss'],
                                whitelistPatterns: [/^Toastify/],
                                keyframes: true,
                                defaultExtractor: content =>
                                    content.match(/[\w-/:]+(?<!:)/g) || [],
                            },
                        ],
                    ]
                ),
                [
                    "postcss-preset-env",
                    {
                        "autoprefixer": {
                            "flexbox": "no-2009"
                        },
                        "stage": 3,
                        "features": {
                            "custom-properties": false
                        }
                    }
                ]
            ]
            :
            [
                [
                    "postcss-preset-env",
                    {
                        "autoprefixer": {
                            "flexbox": "no-2009"
                        },
                        "stage": 3,
                        "features": {
                            "custom-properties": false
                        }
                    }
                ]
            ]
}
