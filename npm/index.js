var out = typeof window == 'undefined'
    ? {obj: module, key: 'exports'}
    : {obj: window, key: 'taja'}
var taja = (function (taja) {
  taja.is = {}
  var keys = []
  for (var key in taja) keys.push(key)
  var i = j = 0, len = keys.length;
  for (; i < len; ++i) {
    var key = keys[i]
    if (typeof taja[key] !== 'function') continue
    taja[key] = taja[key].bind(taja)
  }
  for (; j < len; ++j) {
    var key = keys[j]
    var matches = key.match(/is([A-Z][a-zA-Z]*)/)
    if (!matches) continue
    var kind = matches[1][0].toLowerCase() + matches[1].substring(1)
    taja.is[kind] = taja[key]
  }
  return taja
})(require('./taja-fastopt').taja())
out.obj[out.key] = taja