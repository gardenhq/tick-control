# @gardenhq/tick-control

In javascript **every value** is an object.

```javascript
// Booleans
true;
var object = new Boolean(true);
```
```
// even null - kinda
null;
var object = null; // typeof object === "object"
```
```javascript
// numbers
12;
var object = new Number(12);
```
```javascript
// strings
"Hello!"
var object = new String("Hello!");
```

```javascript
// template literals
`Hello ${world}`;
var object = new ... oh hold on..er....ummm

typeof `Hello ${world}` // string
typeof 'Hello ${world}' // string
'Hello ${world}' == `Hello ${world}` // false

```

\*sows seeds\*

Let's try again

In javascript **every value** is an object.

```javascript
// Booleans
true;
var object = new Boolean(true);
```
```
// even null - kinda
null;
var object = null; // typeof object === "object"
```
```javascript
// numbers
12;
var object = new Number(12);
```
```javascript
// strings
"Hello!"
var object = new String("Hello!");
```

```javascript
// template literals
`Hello ${world}`;
var literal = new TemplateLiteral("Hello ${world}")

typeof literal // object
'Hello ${world}' == literal.toString() // true
literal.render(
    {
        world: "World!"
    }
)

```

## Why?

> Why shouldn't I just use the primitive value?

No reason... unless you want to do one of the following:

1) Support the few browsers that don't support literals.

> Yeah yeah, I'm all over ES6 nowadays, all my users are in Chrome and if not, I transpile like a trooper.

2) You might want to pass template literals around as template literals, not the strings that they are magically converted to.

```
function greatUI(template)
{
    var world = "World!";
    return template.render(
        {
            world: world
        }
    );
}

// var native = `Hello ${world}`; // doh, where's world?

var template = new TemplateLiteral("Hello ${world}");
greatUI(template);


```

3) Keep your templates separate, unless you want to 'reason' about them of course, (ehem \*split's editor window\*)

```html
<!-- templates/index.html -->
<p>
    Hello ${world}
</p>
<ul>
    ${ 
        items.map(
            function(item)
            {
                return html'<li>' + item + '</li>';
            }
        )
    }
</ul>
```
--- split ---

```javascript
fetch("template/index.html").then(
    function(response)
    {
        return response.text()
    }
).then(
    function(content)
    {
        var template = new TemplateLiteral(content);
        template.transformer(html);
        var tree = template.render(
            {
                world: "World!",
                html: html,
                items: [
                    "one",
                    "two",
                    "three"
                ]
            }
        );
    }
)

```

> But I don't want to have to fetch all my templates in a spaghetti of promises and callbacks

Have a look at [`@gardenhq/o`](https://greenhouse.gardenhq.io/o/). This example is using `o` along with our dependency injection builder `@gardenhq/willow`

```yaml
# container.yaml
imports: 
  - "@gardenhq/tick-control/container"

# my actual app
main:
  callable: "./index"
  arguments:
    - "@app.templates:widget"
    - "@app.templates:wodget"

# all the bumpf I need for my app,
# you know, all that stuff I don't care about once its done, as long as it ends up in 'main'
app.templates:
  iterator: "@gardenhq.tick-control.iterator"
  arguments:
    - "#app.template".     # get everything tagged as a template and turn it into a renderable
app.templates.widget:
  object: "./components/widget/templates/index.html"
  tags:
    - name: "app.template" # this is the name of the tag, meaning this will get picked up by the iterator
      key: "widget"        # this is the 'name' of your template
app.templates.wodget:
  object: "./components/wodget/templates/index.html"
  tags:
    - name: "app.template"
      key: "wodget"
     
```
``` javascript
// index.js
module.exports = function(widget, wodget)
{
    widget.render();
    wodget.render();
}
```

[See this in action here](https://greenhouse.gardenhq.io/tick-control/examples/index.html)

> Gah yaml! Seriously!?

Well you can use javascript instead of yaml also ([read more](https://greenhouse.gardenhq.io/o/)).

You could even do some nice progressive enhancement (\*ehem\* react \* ehem\*), with your favourite template literal tag/transformer function to make your DOM tree, or something like:

```javascript
new TemplateLiteral(document.querySelectorAll("#template").textContent).transformer(html).render(vars);
```

or for the more functional inclined:

```
var render = TemplateLiteral;
console.log(
    render(document.querySelectorAll("#template").textContent, vars, html)
)

```



[See an example here](https://greenhouse.gardenhq.io/tick-control/examples/o.html)


Have a look in the /examples/ folder of the repo, and as always /test/ is a good place to look.

## Why not?

It uses `Function()` under-the-hood. As always, be aware of loading things in you don't control, whether that's via `<script>` tags, `Function`, `eval` or `$ node`.


## Installation and usage


### On your system

```
npm install --save[-dev] @gardenhq/tick-control

```

#### Traditional synchronous loading (if you are using a static bundler)

```javascript
const tickControl = require("@gardenhq/tick-control");
const TemplateLiteral = tickControl();
const template = new TemplateLiteral("Hello ${world}");
const str = template.render(
    {
        world: "World!"
    }
);
console.log(str);
```

### On your system or via the interwebs

#### Asynchronous loading

```javascript
// use any 'import-like', or 'promised require' such as @gardenhq/o
importlike("@gardenhq/tick-control/index.js").then(
    function(tickControl)
    {
        return tickControl(importlike);
    }
).then(
    function(TemplateLiteral)
    {
        var template = new TemplateLiteral("Hello ${world}");
        var str = template.render(
            {
                world: "World!"
            }
        );
        console.log(str);
    }
);
```


#### Using dependency injection

See [`@gardenhq/o`](https://greenhouse.gardenhq.io/o/) using `@gardenhq/willow` 

```yaml
# container.yaml
imports:
    - "@gardenhq/tick-control/container"
main:
  callable: "./index"
  arguments:
    - "@app.template"
app.template:
  class: "@gardenhq.tick-control"
  arguments:
    - "Hello ${world}"
```
--- split ---

```javascript
// index.js
module.exports = function(template)
{
    return function()
    {
        var str = template.render(
            {
                world: "World!"
            }
        );
        console.log(str);
    } 
}
```


## License

ISC License

Copyright (c) 2017-present, GardenHQ <gardener@gardenhq.io>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.


### parser/javascript.js massively taken from the excellent Andrea Giammarchi's [backtick-template](https://github.com/WebReflection/backtick-template)

(you can always inject your own replacement by overwriting `@gardenhq.tick-control.parser`)

Copyright (C) 2017 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

