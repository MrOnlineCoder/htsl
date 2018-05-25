# htsl

Convert your JSON to HTML easily!


## Getting Started

```
npm install htsl
```

## Documentation

htsl exports just one function:

```js
function htsl(document);
```

where `document` is htsl-valid Javascript object, which is an HTML document.

## htsl format

Each htsl document must be an object with `document` property.

```json
{
  "document": {

  }
}
```

`document` can contain `head` property which will be HTML `head` tag:

```json
{
  "document": {
    "head": {
      "title": "Page title",
      "meta": {
        "charset": "utf-8",
      },
      "css": [
        "css link 1",
        "static/mycss.css",
        "http://somecsscdn.com/css/styles.css"
      ]
    }
  }
}
```

`title` - page title (string)

`meta` - meta of the page. Each property of this object will be converted to `<meta key=value>`.

`css` - array of strings, which are links (hrefs) to CSS stylesheets.

After the head there should be `body`:

```json
{
  "document": {
    "head": {
      "title": "Page title",
      "meta": {
        "charset": "utf-8",
      }
    },
    "body": {

    }
  }
}
```

`body` is the root **htsl-element** (node) of whole page.

Each **htsl-element** must follow this syntax:

```json
{
  "tag": "HTML tag of the element",
  "id": "HTML id of the element, optional",
  "classes": ["array", "of css classes", " which should be applied", "to the element"],
  "attributes": {
    "key": "value map of element attributes",
    "bool": "set to to true to have attribute with no value"
  },
  "children": {

  }
}
```

where `children` is element children (innerHTML). It can be:

* string
* object - then it should be another valid **htsl-element**
* array - array of valid **htsl-elements**

## Example

You can run test/server.js script to start Express server, which will serve htsl-rendered page (test/page.json is the input).

## Author: MrOnlineCoder
## License: MIT
