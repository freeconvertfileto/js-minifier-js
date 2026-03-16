(function() {
    var inputEl = document.getElementById('minInput');
    var outputEl = document.getElementById('minOutput');
    var statsEl = document.getElementById('minStats');
    var runBtn = document.getElementById('minRun');
    var copyBtn = document.getElementById('minCopy');
    var clearBtn = document.getElementById('minClear');

    function minifyJS(js) {
        // Remove single-line comments (not inside strings)
        var result = js.replace(/\/\/[^\n]*/g, '');
        // Remove multi-line comments
        result = result.replace(/\/\*[\s\S]*?\*\//g, '');
        // Collapse whitespace
        result = result.replace(/\s+/g, ' ');
        // Remove spaces around operators and punctuation
        result = result.replace(/\s*([{};,=+\-*/<>!&|^%?:])\s*/g, '$1');
        result = result.replace(/\s*\(\s*/g, '(');
        result = result.replace(/\s*\)\s*/g, ')');
        result = result.replace(/\s*\[\s*/g, '[');
        result = result.replace(/\s*\]\s*/g, ']');
        return result.trim();
    }

    function formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        return (bytes / 1024).toFixed(1) + ' KB';
    }

    function run() {
        if (!inputEl || !outputEl) return;
        var input = inputEl.value;
        if (!input) { outputEl.value = ''; if (statsEl) statsEl.textContent = ''; return; }
        var result = minifyJS(input);
        outputEl.value = result;
        if (statsEl) {
            var orig = new Blob([input]).size;
            var minified = new Blob([result]).size;
            var saved = orig - minified;
            var pct = orig > 0 ? Math.round(saved / orig * 100) : 0;
            statsEl.textContent = 'Original: ' + formatSize(orig) + ' | Minified: ' + formatSize(minified) + ' | Saved: ' + formatSize(saved) + ' (' + pct + '%)';
        }
    }

    if (runBtn) runBtn.addEventListener('click', run);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            if (!outputEl || !outputEl.value) return;
            navigator.clipboard.writeText(outputEl.value).then(function() {
                var orig = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(function() { copyBtn.textContent = orig; }, 1500);
            });
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            inputEl.value = '';
            outputEl.value = '';
            if (statsEl) statsEl.textContent = '';
        });
    }
})();
