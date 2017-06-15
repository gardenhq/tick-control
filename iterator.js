module.exports = function(factory, parser, transformer)
{
    var engine = factory(parser, transformer);
    return function(value, key)
    {
        var template = engine();
        template.compile(value, null, "template:" + key);
        return template;
    }
}
