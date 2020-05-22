const morgan = require("morgan");

function _replace(_, name, arg) {
  let tokenArguments = "req, res";
  let tokenFunction = "tokens[" + String(JSON.stringify(name)) + "]";

  if (arg !== undefined) {
    tokenArguments += ", " + String(JSON.stringify(arg));
  }

  return '" +\n    (' + tokenFunction + "(" + tokenArguments + ') || "-") + "';
}

function compile(format) {
  if (typeof format !== "string") {
    throw new TypeError("argument format must be a string");
  }

  let fmt = String(JSON.stringify(format));
  let js =
    '  "use strict"\n  return ' +
    fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, _replace);

  return new Function("tokens, req, res", js);
}
morgan.format("customFormat", function developmentFormatLine(tokens, req, res) {
  // get the status code if response written
  let status = res.statusCode ? res.statusCode : undefined;

  // get status color
  let color =
    status >= 500
      ? 31 // red
      : status >= 400
      ? 33 // yellow
      : status >= 300
      ? 36 // cyan
      : status >= 200
      ? 32 // green
      : 0; // no color

  // get colored function
  let fn = developmentFormatLine[color];
  if (!fn) {
    // compile
    fn = developmentFormatLine[color] = compile(
      "\x1b[0m:method :url \x1b[" +
        color +
        "m:status\x1b[0m" +
        " :response-time ms".yellow +
        " - :user-agent\x1b[0m ".cyan +
        "Date: ".magenta +
        ":date[web]"
    );
  }
  return fn(tokens, req, res);
});
module.exports = (app) => {
  app.use(morgan("customFormat"));
};
