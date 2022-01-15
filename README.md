# stock-history
A visualization tool for simulation of historical stock portfolio performance. 

## Setup
```
git clone git@github.com:ethan-rambacher/stock-history.git
pip install -r requirements.txt
uvicorn server.main:app --reload
```

## Quick Start

```bash
git clone https://github.com/eerambach/stockistory
cd stockistory
pip install -r requirements.txt
uvicorn server.main:app --reload
npm install && npm run start:dev
```

## APIs
### Serve static tool file
Serves `/static` folder to `/static` endpoint
### Passthrough API to finance API
Portfolio holdings are represented as the following data structure:
```
{
    "investments": [
        {
            "ticker": "AAPL",
            "startDate": "1/31/2000",
            "endDate": "5/1/2001",
            "frequency": "weekly"
        },
        {
            "ticker": "VLCAX",
            "startDate": "3/20/2005",
            "endDate": "3/25/2005",
            "frequency": "daily"
        }
    ]
}
```
This data structure is returned, amended with price information:
```
{
    "investments": [
        {
            "ticker": "AAPL",
            "prices": [
                {
                    "date": "1/31/2000",
                    "price": 100
                },
                {
                    "date": "2/6/2000",
                    "price": 200
                },
                ...
            ],
            "dividends": [
                {
                    "date": "3/1/2000",
                    "amount": 0.3
                },
                ...
            ],
        },
        {
            "ticker": "VLCAX",
            "prices": [
                ...
            ]
        }
    ]
}
```

The API endpoint is accessed using `GET /holdings`.

## Development scripts
```sh
# Install development/build dependencies
npm install

# Start the development server
npm run start:dev

# Run a production build (outputs to "dist" dir)
npm run build

# Run the test suite
npm run test

# Run the test suite with coverage
npm run test:coverage

# Run the linter
npm run lint

# Run the code formatter
npm run format

# Launch a tool to inspect the bundle size
npm run bundle-profile:analyze

# Start the express server (run a production build first)
npm run start

# Start storybook component explorer
npm run storybook

# Build storybook component explorer as standalone app (outputs to "storybook-static" dir)
npm run build:storybook
```

## Configurations
* [TypeScript Config](./tsconfig.json)
* [Webpack Config](./webpack.common.js)
* [Jest Config](./jest.config.js)
* [Editor Config](./.editorconfig)

## Raster image support

To use an image asset that's shipped with PatternFly core, you'll prefix the paths with "@assets". `@assets` is an alias for the PatternFly assets directory in node_modules.

For example:
```js
import imgSrc from '@assets/images/g_sizing.png';
<img src={imgSrc} alt="Some image" />
```

You can use a similar technique to import assets from your local app, just prefix the paths with "@app". `@app` is an alias for the main src/app directory.

```js
import loader from '@app/assets/images/loader.gif';
<img src={loader} alt="Content loading />
```

## Vector image support
Inlining SVG in the app's markup is also possible.

```js
import logo from '@app/assets/images/logo.svg';
<span dangerouslySetInnerHTML={{__html: logo}} />
```

You can also use SVG when applying background images with CSS. To do this, your SVG's must live under a `bgimages` directory (this directory name is configurable in [webpack.common.js](./webpack.common.js#L5)). This is necessary because you may need to use SVG's in several other context (inline images, fonts, icons, etc.) and so we need to be able to differentiate between these usages so the appropriate loader is invoked.
```css
body {
  background: url(./assets/bgimages/img_avatar.svg);
}
```

## Adding custom CSS
When importing CSS from a third-party package for the first time, you may encounter the error `Module parse failed: Unexpected token... You may need an appropriate loader to handle this file typ...`. You need to register the path to the stylesheet directory in [stylePaths.js](./stylePaths.js). We specify these explicity for performance reasons to avoid webpack needing to crawl through the entire node_modules directory when parsing CSS modules.



## Multi environment configuration
This project uses [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack) for exposing environment variables to your code. Either export them at the system level like `export MY_ENV_VAR=http://dev.myendpoint.com && npm run start:dev` or simply drop a `.env` file in the root that contains your key-value pairs like below:

```sh
ENV_1=http://1.myendpoint.com
ENV_2=http://2.myendpoint.com
```

With that in place, you can use the values in your code like `console.log(process.env.ENV_1);`
