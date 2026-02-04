# Norse Search Widget

An embeddable search widget built with Preact, Vite, and Vanilla Extract. This widget can be integrated into any website to provide a customizable search interface.

## Features

- 🚀 Built with Preact for minimal bundle size
- 🎨 Styled with Vanilla Extract for type-safe, zero-runtime CSS
- 📦 Bundled with Vite for optimal performance
- 🔌 Framework-agnostic - works with any website
- 🎨 Customizable styles - no Shadow DOM, easy to override with CSS
- 🌐 Configurable per tenant (colors, border radius, text)
- 📱 Responsive design

## Usage

### Using UMD Build (Direct Script Tag)

The simplest way to use the widget is with automatic initialization:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Search Widget Demo</title>
    <!-- Import widget styles -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/norse-search-widget/dist/widget/search-widget.css"
    />
  </head>
  <body>
    <!-- Container for the widget with tenant ID -->
    <div id="search-widget" tid="your-tenant-id"></div>

    <!-- Load the widget script - it will auto-initialize -->
    <script src="https://unpkg.com/norse-search-widget/dist/widget/search-widget.umd.js"></script>
  </body>
</html>
```

The widget will automatically detect the `tid` attribute and initialize itself.

### Customizing Styles

The widget uses CSS variables for theming and does not use Shadow DOM, making it easy to customize with your own CSS:

```html
<style>
  /* Override primary color and border radius via CSS variables */
  #search-widget {
    --widget-primary: #764ba2;
    --widget-radius: 12px;
  }

  /* Or target specific widget elements by ID */
  #sw-container {
    background-color: #764ba2 !important;
    padding: 2rem !important;
  }
</style>
```

## Development

### Prerequisites

- Node.js (v24 or higher recommended)
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/211-Connect/Norse-Search-Widget.git
cd Norse-Search-Widget
```

2. Install dependencies:

```bash
yarn
```

3. Build widget in watch mode:

```bash
yarn dev
```

4. Serve demo page (`index.html`) to show search widget:

```bash
yarn serve
```

This will start a local server at `http://localhost:4173` with the demo page.

### Build

To build the widget for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory:

- `search-widget.umd.js` - UMD build for direct script inclusion
- `search-widget.es.js` - ES module build for modern bundlers
- `search-widget.css` - Widget styles (required)
- `index.html` - demonstration page
- `index.css` - styles for the demonstration page

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
