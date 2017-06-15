module.exports = function()
{
    return arguments[0].apply(null, [].slice.apply(arguments, [1]));
}
