# JavaScript - плагин Typedata

[![npm version](https://badge.fury.io/js/typedata-suggestions.svg)](https://badge.fury.io/js/typedata-suggestions)
[![NPM license](https://img.shields.io/npm/l/typedata-suggestions)](https://github.com/rave-technology/typedata-suggestions/blob/main/LICENSE)

JavaScript-плагин для сервиса подсказок [TypeData.net](https://typedata.net?utm_source=github&utm_medium=vue-component).

## Установка

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/typedata-suggestions@latest/dist/typedata-suggestions.css">
    ...
</head>

<body>
...
<div class="typedataSuggestions_wrapper">
    <input id="typedataSuggestions" type="search" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off">
</div>
...
<script src="https://cdn.jsdelivr.net/npm/typedata-suggestions@latest/dist/typedata-suggestions.min.js"></script>
<script>
    const typedataSuggestionsJS = new typedataSuggestions({
        token: 'TOKEN',
        events: {
            input: {
                selection: (event) => {
                    const selection = event.detail.selection.value;
                    typedataSuggestionsJS.input.value = selection.value;
                    alert(JSON.stringify(selection));
                }
            }
        }
    });
</script>
...
</body>
</html>
```

[npm package](https://www.npmjs.com/package/typedata-suggestions)

## [LICENSE](https://github.com/rave-technology/typedata-suggestions/blob/master/LICENSE)

Copyright (c) 2023 Rave Technology. Licensed under the [MIT license](https://github.com/rave-technology/typedata-suggestions/blob/master/LICENSE).