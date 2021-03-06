load('../../dist/shell/l10n.js');

var parser = new L20n.Parser();
var env = {
  __plural: L20n.getPluralRule('en-US')
};

var code = read('./example.properties');
var data = {
  "ssid": "SSID",
  "capabilities": "CAPABILITIES",
  "linkSpeed": "LINKSPEED",
  "pin": "PIN",
  "n": 3,
  "name": "NAME",
  "device": "DEVICE",
  "code": "CODE",
  "app": "APP",
  "size": "SIZE",
  "unit": "UNIT",
  "list": "LIST",
  "level": "LEVEL",
  "number": "NUMBER",
  "link1": "LINK1",
  "link2": "LINK2"
}

function micro(time) {
  // time is in milliseconds
  return Math.round(time * 1000);
}

var times = {};
times.start = Date.now();

var ast = parser.parse(code);
times.parseEnd = Date.now();

times.compile = Date.now();
L20n.compile(ast, env);
times.compileEnd = Date.now();

times.get = Date.now();
for (var id in env) {
   env[id].valueOf(data);
}
times.getEnd = Date.now();

var results = {
  parse: micro(times.parseEnd - times.start),
  compile: micro(times.compileEnd - times.compile),
  get: micro(times.getEnd - times.get),
};

print(JSON.stringify(results));
