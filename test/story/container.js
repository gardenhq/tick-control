module.exports = function()
{
    var root = __dirname + "/../..";
    var service = "@gardenhq.tick-control."
    return {
        "imports": [
            "@gardenhq/js-test-harness/conf/index.js",
            root + "/container.js"
        ],
        "fixture.template": {
            "object": root + "/test/fixtures/template.html",
            "tags": [
                {
                    "name": "app.template",
                    "key": "template"
                }
            ]
        },
        "fixture.loop": {
            "object": root + "/test/fixtures/loop.html",
            "tags": [
                {
                    "name": "app.template",
                    "key": "loop"
                }
            ]
        },
        "fixture.tagless": {
            "object": root + "/test/fixtures/tagless.html",
            "tags": [
                {
                    "name": "app.template",
                    "key": "tagless"
                }
            ]
        },
        "fixture.returns": {
            "object": root + "/test/fixtures/returns.html",
            "tags": [
                {
                    "name": "app.template",
                    "key": "returns"
                }
            ]
        },
        "iterator": {
            "iterator": "@gardenhq.tick-control.iterator",
            "arguments": [
                "#app.template"
            ]
        },
        "main": {
            "arguments": [
                "@iterator",
                service + "parser.untick",
                service + "parser",
                service + "engine",
                service + "raw",
                "@package.index",
                // null,
                // null,
                // null,
                // null,
                // null,
                typeof document === "undefined" ? {} : "@hyperhtml",
                "@hyperx",
                "@test.expect"
            ]
        },
        "gardenhq.tick-control.renderer.non-native.object": {
            "object": root + "/renderer/non-native.js",
            "bundle": false
        },
        "package.index": {
            "callable": root + "/index.js",
            "arguments": [
                "@willow.system.import",
                "@gardenhq.tick-control.renderer.non-native.object"
            ]
        },
        "hyperhtml": {
            "object": "hyperhtml/hyperhtml"
        },
        "hyperscript": {
            "object": "hyperscript/index"
        },
        "hyperx": {
            "callable": "hyperx/index",
            "arguments": [
                "@hyperscript"
            ],
            "version": "2.3.0"
        },
        // overwrite this until we can look at td in a browser
        "test.expect": {
            "resolve": [
                "@chai"
            ],
            "service": function(chai)
            {
                return chai.expect;
            }
        }
    };
}
