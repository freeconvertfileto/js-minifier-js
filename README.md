# JavaScript Minifier

Remove comments and collapse whitespace from JavaScript source code to reduce file size, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/developer-tools/js-minifier

## How It Works

`minifyJS(js)` applies a six-step regex pipeline: `\/\/[^\n]*` removes single-line comments, `\/\*[\s\S]*?\*\/` removes multi-line block comments, `\s+` collapses all whitespace runs to a single space, `\s*([{};,=+\-*/<>!&|^%?:])\s*` removes spaces around operators and punctuation, and separate patterns remove spaces adjacent to `(`, `)`, `[`, and `]`. The result is trimmed. Size statistics are computed using `new Blob([text]).size` for byte-accurate UTF-8 measurement of both the original and minified output.

Note: this is a simple regex-based minifier that does not parse the AST. It may not handle all edge cases (e.g., regex literals that contain `//` or strings with operators).

## Features

- Removes single-line (`//`) and multi-line (`/* */`) comments
- Collapses all whitespace
- Removes spaces around operators and brackets
- Original / minified size and percentage saved display
- Copy output to clipboard

## Browser APIs Used

- Clipboard API (`navigator.clipboard.writeText`)
- Blob API (for byte-accurate size calculation)

## Code Structure

| File | Description |
|------|-------------|
| `js-minifier.js` | `minifyJS` 6-step regex pipeline (comment removal, whitespace collapse, operator/bracket spacing), `Blob.size` byte stats |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#minInput` | JavaScript input textarea |
| `#minOutput` | Minified JavaScript output |
| `#minRun` | Minify button |
| `#minCopy` | Copy minified JS to clipboard |
| `#minClear` | Clear both fields |
| `#minStats` | Original / minified size and savings |

## License

MIT
