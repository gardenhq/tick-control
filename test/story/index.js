describe(
    "@gardenhq/tick-control",
    function()
    {
        this.timeout(10000);
        var container = "./container.js";
        var expect, html, hyperhtml
        var templates;
        // TemplateLiteral reads nice, but it could be any type of 'Engine'
        var TemplateLiteral, Engine, engine, untick, parser, engineFactory, raw;
        var harness = function(_iterator, _untick, _parser, _engineFactory, _raw, _engine, _hyperhtml, _hyperx, _expect)
        {
            templates = _iterator;

            TemplateLiteral = Engine = engine = _engine;
            untick = _untick;
            parser = _parser;
            engineFactory = _engineFactory;
            raw = _raw;

            html = _hyperx;
            hyperhtml = _hyperhtml;

            expect = _expect;
        };
        before(
            function()
            {
                return (
                    function(load)
                    {
                        return load.then(
                            function(runner)
                            {
                                return runner(container, harness);
                            }
                        );
                    }
                )(
                    typeof o !== "undefined" ? o(function(o){ return o(document); }) : require("@gardenhq/o/runner.js")(function(o){ return o(require); })
                );
            }
        );
        context(
            "Synchronicity",
            function()
            {
                var title = "Can use TemplateLiteral via a synchronous require environment/api";
                if(typeof require !== "undefined") {
                    var TemplateLiteral = require("../../")();
                    it(
                        title,
                        function()
                        {
                            const template = new TemplateLiteral("Hello ${world}");
                            const result = template.render(
                                {
                                    world: "World!"
                                }
                            );
                            expect(result).to.equal("Hello World!");
                        }
                    );
                } else {
                   it.skip(title + " - This environment doesn't support a synchronous require"); 
                }
            }
        );
        context(
            "Given a template collection using an iterator from @gardenhq/willow",
            function()
            {
                it(
                    "collects and renders a simple template",
                    function()
                    {
                        var expected = "Hello World!";
                        var vars = {world: "World!"};
                        // HTTP adds a newline to responses, not my problem? trim
                        var actual = templates.template.render(vars).trim();
                        expect(actual).to.equal(expected);
                    }
                );
                it(
                    "collects and renders a template with a loop",
                    function()
                    {
                        // String.raw includes the commas
                        var expected = "<ul>\n    <li>1</li>,<li>2</li>,<li>3</li>\n</ul>";
                        var actual = templates.loop.render().trim();
                        expect(actual).to.equal(expected);
                    }
                );
                it(
                    "collects and renders a template containing ticks with returns",
                    function()
                    {
                        var expected = "<ul>\n    \n            <li>\n                1\n            </li>\n        \n    <li>2</li>,<li>3</li>\n</ul>";
                        var actual = templates.returns.render().trim();
                        expect(actual).to.equal(expected);
                    }
                );
                it.skip(
                    "collects and renders a template with tagless template-literal, with a space between the tag and the literal",
                    function()
                    {
                        var taggedExpected = 'return html ((function(arr){arr.raw = arr;return arr;})(["Hello",""]),(world))';
                        var taglessExpected = 'return String.raw ((function(arr){arr.raw = arr;return arr;})(["Hello",""]),(world))';
                        var parseStub = function(literal)
                        {
                            return [{raw: ['"Hello"', '""']}, "(world)"]
                        }
                        var actual = untick(
                            "return html `something ${hi} `",
                             parseStub
                        );
                        console.log(actual);
                        // expect(taggedExpected).to.equal(actual);
                        actual = untick(
                            "return `something ${hi} `",
                            parseStub
                        );
                        console.log(actual);
                        actual = untick(
                            "something = `something ${hi} `",
                            parseStub
                        );
                        console.log(actual);
                        actual = untick(
                            "something = (`something ${hi} `)",
                            parseStub
                        );
                        console.log(actual);
                        // expect(taglessExpected).to.equal(actual);
                    }
                );
                it(
                    "collects and renders a template with tagless template-literals, must take the form of tag`` not tag `` (note the space)",
                    function()
                    {
                        var taggedExpected = 'return html((function(arr){arr.raw = arr;return arr;})(["Hello",""]),(world))';
                        var taglessExpected = 'return String.raw((function(arr){arr.raw = arr;return arr;})(["Hello",""]),(world))';
                        var parseStub = function(literal)
                        {
                            return [{raw: ['"Hello"', '""']}, "(world)"]
                        }
                        var actual = untick(
                            "return html`something ${hi} `",
                             parseStub
                        );
                        expect(actual).to.equal(taggedExpected);
                        actual = untick(
                            "return `something ${hi} `",
                            parseStub
                        );
                        expect(actual).to.equal(taglessExpected);
                    }
                );
            }
        );
        context(
            "When using auto setup (using index.js)",
            function()
            {
                it(
                    "can compile and render in one fell swoop",
                    function()
                    {
                        var expected = "Hello World!";
                        var actual = engine("Hello ${world}", {world: "World!"});
                        expect(actual).to.equal(expected);
                    }
                );
                it(
                    "can compile and render in two steps",
                    function()
                    {
                        var expected = "Hello World!";
                        var actual = engine().compile("Hello ${world}").render({world: "World!"});
                        expect(expected).to.equal(actual);
                    }
                );
            }
        );
        context(
            "When using the class interface",
            function()
            {
                var vars = {world: "World!"};
                var expected = "Hello World!";
                it(
                    "can compile when constructing and returns a renderable",
                    function()
                    {
                        var template = new TemplateLiteral("Hello ${world}");
                        var actual = template.render({world: "World!"});
                        expect(actual).to.equal(expected);
                    }
                );
                it(
                    "can compile and store vars when constructing and returns a renderable, which is callable with no vars",
                    function()
                    {
                        var template = new TemplateLiteral("Hello ${world}", vars);
                        var actual = template.render();
                        expect(actual).to.equal(expected);
                    }
                );
                it(
                    "can compile and store vars and a tag function when constructing and returns a renderable, which is callable with no vars",
                    function()
                    {
                        var template = new TemplateLiteral("<p>Hello ${world}</p>", vars, html);
                        var actual = template.render();
                        expect(actual.innerHTML).to.equal(expected);
                    }
                );
                it(
                    "can be constructed with a tag function, and compiled/rendered in a chain which uses a plain function for rendering",
                    function()
                    {
                        var template = new TemplateLiteral(html);
                        var renderable = template.compile("<p>Hello ${world}</p>");
                        expect(renderable).to.not.be.an.instanceof(TemplateLiteral);
                        expect(renderable).to.be.an.instanceof(Function);
                        var actual = renderable.render({world: "World!"});
                        expect(actual.innerHTML).to.equal(expected);
                    }
                );
                it(
                    "can be constructed with a tag function",
                    function()
                    {
                        var template = new TemplateLiteral(html);
                        template.compile("<p>Hello ${world}</p>");
                        expect(template).to.be.an.instanceof(TemplateLiteral);
                        var actual = template.render({world: "World!"});
                        expect(actual.innerHTML).to.equal(expected);
                    }
                );
            }
        );
        context(
            "Smaller units",
            function()
            {
                it(
                    "unticks",
                    function()
                    {
                        var expected = "Hello World! Hello World!";
                        var vars = {
                            world: "World!",
                            raw: raw
                        };
                        var actual = engine().compile("Hello ${world} ${ raw`Hello ${world}`}").render(vars);
                        expect(actual).to.equal(expected);
                    }
                );
                it(
                    "parses",
                    function()
                    {
                        var unique = "unique";
                        var expected = [
                            {
                                raw: ['"Hello "', '""']
                            },
                            "(world)"
                        ]
                        var actual = engine().parse("Hello ${world}", unique);
                        expect(actual).to.deep.equal(expected);
                    }
                );
            }
        );
        // this shouldn't be here
        context(
            "raw",
            function()
            {
                it(
                    "doesn't 'overprint'",
                    function()
                    {
                        var expected = "Hello\n";
                        var world = "World!";
                        var rawlike = {
                            raw: ["Hello\n"]
                        };
                        var actual = raw(rawlike, world);
                        // console.log(String.raw(rawlike, world));
                        expect(actual).to.equal(expected);
                    }
                );
                it(
                    "prints Hello World",
                    function()
                    {
                        var expected = "Hello World!";
                        var world = "World!";
                        var rawlike = {
                            raw: ["Hello ", ""]
                        };
                        var actual = raw(rawlike, world);
                        expect(actual).to.equal(expected);
                    }
                );
            }
        );
    }
);

