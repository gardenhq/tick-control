module.exports = function(str, parse)
{
    return str.replace(
        /([^\s]?)`((.|\s)+?(?=`))`/g,
        function(string, p1, p2)
        {
            var parsed = parse(p2);
            var tag = "";
            if(p1 === "") {
                // string raw?
                p1 = "String.raw";
            }
            var value = p1 + "((function(arr){arr.raw = arr;return arr;})([" + parsed.shift().raw + "])"
                + (parsed.length ? "," + parsed.join(","):"")
                + ")"
            ;
            return value;
        }
    );
}

