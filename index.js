module.exports = function(promisedRequire, renderer)
{
    var hasStringRaw = typeof String.raw !== "undefined";
    return Promise.all(
        [
            __dirname + "/engine.js",
            typeof renderer === "undefined" ? __dirname + "/renderer/" + (hasStringRaw ? "native": "non-native") + ".js" : renderer,
            hasStringRaw ? String.raw : __dirname + "/tag/raw.js",
            __dirname + "/parser/javascript.js",
            __dirname + "/parser/untick.js"
        ].map(
            function(item)
            {
                return (typeof item === "string" ? promisedRequire(item) : item);
            }
        )
    ).then(
        function(modules)
        {
            return (
                function(factory, renderer, transformer, parser, untick)
                {
                    return factory(renderer(), transformer, parser(untick));
                    // return arguments[0].apply(null, [].slice.apply(arguments, [1]));
                }
            ).apply(null, modules);
        }
    );
};
