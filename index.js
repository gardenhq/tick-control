module.exports = function(promisedRequire)
{
    return Promise.all(
        [
            __dirname + "/engine.js",
            __dirname + "/parser/javascript.js",
            __dirname + "/parser/untick.js",
            typeof String.raw === "function" ? String.raw : __dirname + "/tag/raw.js"
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
                function(factory, parser, untick, raw)
                {
                    return factory(parser(untick), raw);
                    // return arguments[0].apply(null, [].slice.apply(arguments, [1]));
                }
            ).apply(null, modules);
        }
    );
};
