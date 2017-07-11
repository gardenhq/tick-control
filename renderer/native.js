module.exports = function(compilerArgumentFactory, transformerProxy)
{
    compilerArgumentFactory = compilerArgumentFactory || function(str, parsed, filename)
    {
        return [
            "tag",
			"template",
            'with(this) {return tag`' + str + '`}' + (typeof filename === "string" ? "//# sourceURL=" + filename : "")
        ];
    }
    transformerProxy = transformerProxy || function(transformer)
    {
        return transformer;
    };
    return function(str, parsed, filename, unique)
    {
        return {
            renderable: Function.apply(
                null,
                compilerArgumentFactory(
                    str,
                    parsed,
                    filename,
                    unique
                )
            ),
            transformer: transformerProxy
        };
    }
}
