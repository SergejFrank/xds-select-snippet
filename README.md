# custom-select
A lightweight JavaScript library for custom HTML `<select>` creation and managing.
No dependencies needed.


## Demos
[Example](https://sergejfrank.github.io/xds-select-snippet/)



## How it works
Start with a simple HTML `<select>`:

In HTML with the `script` tag:
```html
<script src="xds-select-snippet.js" type="text/javascript"></script>
```

In HTML with the `link` tag:
```html
<link rel="stylesheet" href="-xds-normalize.css" type="text/css" >
<link rel="stylesheet" href="xds-select-snippet.css" type="text/css" >
```

```html
<select id="mySelect">
  <option value>Select...</option>
  <option value="foo">Foo</option>
  <option value="buz">Buz</option>
</select>
```

```js
var selects = document.querySelectorAll(".select");

for (var j = 0; j < selects.length; j++) {
    generateXdsSelect(selects[j]);
}
```