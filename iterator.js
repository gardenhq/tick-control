module.exports = function(factory, renderer, transformer, parser)
{
    var engine = factory(renderer, transformer, parser);
    return function(value, key)
    {
        var template = engine();
        template.compile(value, null, "template:" + key);
        return template;
    }
}
