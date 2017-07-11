module.exports = function(compilerArgumentFactory, transformerProxy)
{
    compilerArgumentFactory = compilerArgumentFactory || function(str, parsed, filename, unique)
    {
        unique = unique || 'function' + (Math.random() * 1e5 | 0);
        return [
            unique,
			"template",
            'with(this) {if(template._strings == null){template._strings = [' + parsed.shift().raw + ']};return ' + unique + '(template._strings' + (
                parsed.length ? (',' + parsed.join(',')) : ''
            ) + ')}' + (typeof filename === "string" ? "//# sourceURL=" + filename : "")
        ];
    }
     
    transformerProxy = transformerProxy || function(transformer)
    {
        return function(strings)
        {
            if(typeof strings.raw === "undefined") {
                strings.raw = strings;
            }
            return transformer.apply(
                null,
                [strings].concat([].slice.apply(arguments, [1]))
            )
        };
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
