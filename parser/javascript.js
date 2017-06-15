/*! (C) 2017 Andrea Giammarchi - MIT Style License - Massively taken from Andrea Giammarchi's backtick-template, see README */

module.exports = function(untick)
{
    return function parse(str)
    {
        var
        stringify = JSON.stringify,
            i = 0, length = str.length,
            strings = i < length ? [] : ['""'],
            values = [],
            open, close, counter
        ;
        while (i < length) {
            // look for ${
            open = str.indexOf('${', i);
            if (-1 < open) {
                // escape anything up to it
                strings.push(stringify(str.slice(i, open)));
                // go past the ${
                open += 2;
                close = open;
                counter = 1;
                while (close < length) {
                    // look for the matching }
                    switch (str.charAt(close++)) {
                        case '}': counter -= 1; break;
                        case '{': counter += 1; break;
                    }
                    // once it's found a match
                    // add it to the value
                    if (counter < 1) {
                        values.push('(' + untick(str.slice(open, close - 1), parse) + ')');
                        break;
                    }
                }
                // start again looking for the next ${
                i = close;
            } else {
                strings.push(stringify(str.slice(i)));
                i = length;
            }
        }
        if (strings.length === values.length) strings.push('""');
        return [{raw: strings}].concat(values);

    }

}
