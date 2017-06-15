module.exports = function(rawlike)
{
    var args = [].slice.apply(arguments, [1]);
    var len = args.length + 1;
    return rawlike.raw.reduce(
        function(prev, item, i, arr)
        {
            return prev + (len > i ? new String(args[i - 1]) : "") + item;
        }
    );
};
