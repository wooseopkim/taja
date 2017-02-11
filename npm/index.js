var out = typeof window == 'undefined'
    ? {obj: module, key: 'exports'}
    : {obj: window, key: 'taja'}
var taja = (function (taja) {
  taja.is = {}
  var keys = []
  for (var key in taja) keys.push(key)
  var i = 0, len = keys.length;
  for (; i < len; ++i) {
    var key = keys[i]
    var matches = key.match(/is([A-Z][a-zA-Z]*)/)
    if (!matches) continue
    var fn = taja[key]
    var kind = matches[1][0].toLowerCase() + matches[1].substring(1)
    taja.is[kind] = fn.bind(taja)
  }
  return taja
})(require('./taja-fastopt').taja())
out.obj[out.key] = taja