const hasStringRaw = typeof String.raw !== "undefined";
const factory = require("./engine.js");
const renderer = hasStringRaw ? require("./renderer/native.js") : require("./renderer/non-native.js");
const transformer = String.raw || require("./tag/raw.js");
const parser = require("./parser/javascript.js");
const untick = require("./parser/untick.js");
// wrap in a function just so we have the same function API,
// we may as well make it injectable while we are here, although this changes the arguments
module.exports = function(_renderer, _transformer, _parser, _untick)
{
    _renderer = _renderer || renderer;
    _parser = _parser || parser;
    _untick = _untick || untick;
    _transformer = _transformer || transformer;

    return factory(_renderer(), transformer, parser(untick))
};
