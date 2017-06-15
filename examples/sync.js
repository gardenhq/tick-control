const tickControl = require("@gardenhq/tick-control");
const TemplateLiteral = tickControl();
const template = new TemplateLiteral("Hello ${world}");
const str = template.render(
    {
        world: "World!"
    }
);
console.log(str);
