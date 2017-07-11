module.exports = function()
{
    var hasStringRaw = typeof String.raw !== "undefined";
    return {
        "gardenhq.tick-control.engine": {
            "object": __dirname + "/engine.js"
        },
        "gardenhq.tick-control.renderer.native": {
            "callable": __dirname + "/renderer/native.js"
        },
        "gardenhq.tick-control.renderer.non-native": {
            "callable": __dirname + "/renderer/non-native.js",
            "bundle": false
        },
        "gardenhq.tick-control.parser": {
            "callable": __dirname + "/parser/javascript.js",
            "arguments": [
                "@gardenhq.tick-control.parser.untick"
            ],
            "bundle": false
        },
        "gardenhq.tick-control.parser.untick": {
            "object": __dirname + "/parser/untick.js"
        },
        "gardenhq.tick-control.raw": {
            "resolve": !hasStringRaw ? ["@gardenhq.tick-control.polyfill.raw"] : [],
            // "resolve": ["@gardenhq.tick-control.polyfill.raw"],
            "service": function(raw)
            {
                if(!hasStringRaw) {
                    String.raw = raw;
                }
                return String.raw;
            }
        },
        "gardenhq.tick-control.polyfill.raw": {
            "object": __dirname + "/tag/raw.js",
            "bundle": false
        },
        "gardenhq.tick-control": {
            "callable": __dirname + "/factory.js",
            "arguments": [
                "@gardenhq.tick-control.engine",
                hasStringRaw ? "@gardenhq.tick-control.renderer.native" : "@gardenhq.tick-control.renderer.non-native",
                "@gardenhq.tick-control.raw",
                hasStringRaw ? null : "@gardenhq.tick-control.parser" // this should be optional
            ]
        },
        "gardenhq.tick-control.template-literal": {
            "object": "@gardenhq.tick-control"
        },
        "gardenhq.tick-control.iterator": {
            "callable": __dirname + "/iterator.js",
            "arguments": [
                "@gardenhq.tick-control.engine",
                hasStringRaw ? "@gardenhq.tick-control.renderer.native" : "@gardenhq.tick-control.renderer.non-native",
                "@gardenhq.tick-control.raw",
                hasStringRaw ? null : "@gardenhq.tick-control.parser" // this should be optional
            ]
        }
    };
}
