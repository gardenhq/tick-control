const factory = require("./engine.js");
const parser = require("./parser/javascript.js");
const untick = require("./parser/untick.js");
const raw = String.raw || require("./tag/raw.js");
// wrap in a function just so we have the same function API,
// we may as well make it injectable while we are here, although this changes the arguments
module.exports = function(_parser, _untick, _raw)
{
    _parser = _parser || parser;
    _untick = _untick || untick;
    _raw = _raw || raw;

    return factory(parser(untick), raw)
};
