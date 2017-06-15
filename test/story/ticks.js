
describe(
    "@gardenhq/tick-control/ticks",
    function()
    {
        this.timeout(10000);
        var container = "./container.js";
        var expect, html, hyperhtml;
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
        // context(
        //     "hyperhtml",
        //     function()
        //     {
        //         it(
        //             "native",
        //             function()
        //             {
        //                 var html = hyperhtml.bind(document.getElementById("root"));
        //                 var value = "";
        //                 html`<div><label>${value || ""}</label><input id="input" type="text" value="${value || ""}" /></div>`;
        //                 var $input = document.getElementById("input");
        //                 $input.addEventListener(
        //                     "input",
        //                     function(e)
        //                     {
        //                         var value = e.target.value;
        //                         html`<div><label>${value || ""}</label><input id="input" type="text" value="${value || ""}" /></div>`;
        //                     }
        //                 );

        //             }
        //         );
        //         it.only(
        //             "nonnative",
        //             function()
        //             {
        //                 var html = hyperhtml.bind(document.getElementById("root"));
						// var vars = {
							// value: ""
						// };
        //                 var template = new TemplateLiteral('<div><label>${value || ""}</label><input id="input" type="text" value="${value || ""}" /></div>');
        //                 template.transformer(html);
        //                 var result = template.render(
        //                     vars
        //                 );

        //                 var $input = document.getElementById("input");
        //                 $input.addEventListener(
        //                     "input",
        //                     function(e)
        //                     {
        //                         vars.value = e.target.value;
								// var _template2 = template._template;
        //                         var res = template.render(
									// vars
        //                         );
        //                     }
        //                 );

        //             }
        //         );
        //     }
        // );
        context(
            "Using a third party template literal tag (in this case hyperx/hyperscript)",
            function()
            {
                it(
                    "renders with a transformer passed at render time",
                    function()
                    {
                        var expected = html`<div />`;
                        var template = new TemplateLiteral("<div />");
                        actual = template.render({}, html);
                        expect(actual.outerHTML).to.deep.equal(expected.outerHTML);
                    }
                );
                it(
                    "renders with a transformer specifically set before render time",
                    function()
                    {
                        var expected = html`<div />`;
                        var template = new TemplateLiteral("<div />");
                        template.transformer(html);
                        actual = template.render({});
                        expect(actual.outerHTML).to.deep.equal(expected.outerHTML);
                    }
                );
            }
        );
        context(
            "raw",
            function()
            {
                it.skip(
                    "deals with raw returns properly",
                    function()
                    {

                        console.log(raw`hi\n`);
                        console.log(String.raw`Hello\n`);

                        console.log("Hello\n");
                        console.log(JSON.stringify("hello\n"));
                    }
                );
            }
        );
    }
);
