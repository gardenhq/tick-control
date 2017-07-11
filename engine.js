module.exports = function(renderer, transformer, parser)
{
    var TemplateLiteral = function(str, object, transformer, parser)
    {
        var self = this;
        var isInstance = (this instanceof TemplateLiteral);
        if(!isInstance) {
            self = new TemplateLiteral(str, object, transformer, parser);
        }
        self._string = "";
        self._shouldRefreshRenderer = true;
        if(parser) {
            self.parser(parser);
        }
        if(transformer) {
            self.transformer(transformer);
        }
        switch(typeof str) {
            case "function":
                self.transformer(str);
                return self;
            case "string":
                var template;
                if(typeof object !== "undefined") {
                    self.vars(object);
                }
                self._template = self.compile(str);
                if(!isInstance) {
                    return self._template.render(object, transformer);
                }
                break;
            case "object":
                return function($str)
                {
                    return this.compile($str).render(str);
                }.bind(self);
        }
        return self;
    };
    var engine = TemplateLiteral.prototype;
    engine.toString = function()
    {
        return this._string;
    }
    engine.render = function(obj, transformer)
    {
        return this._template.render(obj, transformer);
    }
    engine.parser = function(parser)
    {
        this._parser = parser;
        return this;
    }
    engine.parse = function(str)
    {
        var _parser = (this._parser || parser);
        if(_parser) {
            return _parser(str);
        }
    }
    engine.transformer = function(transformer)
    {
        this._transformer = transformer;
        this._shouldRefreshRenderer = true;
        return this;
    }
    engine.vars = function(vars)
    {
        this._vars = vars;
        return this;
    }
    engine.compile = function(str, _transformer, filename, unique)
    {
        this._string = str;
        if(_transformer != null) {
            this.transformer(_transformer);
        }
        var trans = this._transformer || transformer;
        var template = renderer(str, this.parse(str))
        // what is this?
        // CompiledTemplateLiteral?
        // TransformedTemplateLiteral?
        // RenderableTemplateLiteral?
        // Could just be another TemplateLiteral, probably best
        var renderable = this._template = template.renderable;
        // renderable.name = "name";
        // renderable.displayName = "name";
        var _renderer = template.transformer(trans);
        this._shouldRefreshRenderer = false;
        var o = this;
        // var vars = this._vars;
        // this is potentially a bottleneck
        // do as little as possible
        renderable.render = function(object, transformer)
        {
            return this.apply(
                object || o._vars,
                [
                    typeof transformer !== "undefined" || o._shouldRefreshRenderer ?
                        template.transformer(transformer || o._transformer) :
                        _renderer,
					o
                ]
            )
        }
        return renderable;
    };
    return TemplateLiteral;

}
