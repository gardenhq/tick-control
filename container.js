module.exports = function()
{
    return {
        "gardenhq.tick-control.parser": {
            "callable": __dirname + "/parser/javascript.js",
            "arguments": [
                "@gardenhq.tick-control.parser.untick"
            ]
        },
        "gardenhq.tick-control.parser.untick": {
            "object": __dirname + "/parser/untick.js"
        },
        "gardenhq.tick-control.engine": {
            "object": __dirname + "/engine.js"
        },
        "gardenhq.tick-control.raw": {
            // "resolve": typeof String.raw === "undefined" ? ["@gardenhq.tick-control.polyfill.raw"] : [],
            "resolve": ["@gardenhq.tick-control.polyfill.raw"],
            "service": function(raw)
            {
                if(typeof String.raw === "undefined") {
                    String.raw = raw;
                }
                return String.raw;
            }
        },
        "gardenhq.tick-control.polyfill.raw": {
            "object": __dirname + "/tag/raw.js"
        },
        "gardenhq.tick-control": {
            "callable": __dirname + "/factory.js",
            "arguments": [
                "@gardenhq.tick-control.engine",
                "@gardenhq.tick-control.parser",
                "@gardenhq.tick-control.raw"
            ]
        },
        "gardenhq.tick-control.template-literal": {
            "object": "@gardenhq.tick-control"
        },
        "gardenhq.tick-control.iterator": {
            "callable": __dirname + "/iterator.js",
            "arguments": [
                "@gardenhq.tick-control.engine",
                "@gardenhq.tick-control.parser",
                "@gardenhq.tick-control.raw"
            ]
        }
    };
}
