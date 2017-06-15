(
    function(load)
    {
        var el = function(name)
        {
            var $el = document.createElement(name);
            document.body.appendChild($el);
            return $el;
        };
        var txt = function($el, txt)
        {
            $el.textContent = txt;
            console.log(txt);
        };
        ["h1", "pre"].forEach(
            function(item)
            {
                window[item] = function(str)
                {
                    txt(el(item), str);
                }
            }
        );
        load.then(
            function(System)
            {
                return System.import("@gardenhq/tick-control/index.js").then(
                    function(tickControl)
                    {
                        return tickControl(System.import.bind(System));
                    }
                );
            }
        ).then(
            function(TemplateLiteral)
            {
                // example of the class based api
                var template = new TemplateLiteral("Hello ${world}");
                var result = template.render(
                    {
                        world: "World!"
                    }
                );
                h1(result);

                // example of pulling a template from the DOM
                var str = document.getElementById("template").textContent;
                var templateFromDom = new TemplateLiteral(str);
                result = templateFromDom.render(
                    {
                        world: "world from HTML!"
                    }
                );

                h1("Here's my template pulled from my DOM/HTML page (view source #template):");
                pre(templateFromDom.toString());
                h1("Here's my rendered HTML template:");
                h1(result);


                // example of the functional api
                var template = TemplateLiteral;

                h1(
                    template(str, {world: "world using a functional api"})
                );

            }
        );
    }
)(
    typeof o !== "undefined" ? o(function(o){ return o(document); }) : require.call(null, "@gardenhq/o")(function(o){ return o(require); })
)
