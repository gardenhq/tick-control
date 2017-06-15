module.exports = function(widget, wodget)
{
    var el = function(name)
    {
        var $el = document.createElement(name);
        document.body.appendChild($el);
        return $el;
    };
    var txt = function($el, txt)
    {
        $el.textContent = txt;
        console.log(txt);
    };
    ["h1", "pre"].forEach(
        function(item)
        {
            window[item] = function(str)
            {
                txt(el(item), str);
            }
        }
    );
    return function()
    {
        // use your favourite tag function to convert to DOM
        // you can specify this in possibly better places, depending on what you are doing
        // we're doing it here for examples sake

        // widget.transformer(html);
        var widgetString = widget.render(
            {
                name: "Hello",
                items: [
                    "one",
                    "two",
                    "three"
                ]
            }//,
            // html // also possible to do it here
        );
        // wodget.transformer(html);
        var wodgetString = wodget.render(
            {
                name: "Hola",
                items: [
                    "uno",
                    "dos",
                    "tres"
                ]
            }
        );
        h1("Here's my `widget` template string:");
        pre(widget.toString());
        h1("Here's my `widget` template string rendered:");
        pre(widgetString);
        h1("Here's my `wodget` template string rendered:");
        pre(wodgetString);

    }
}
