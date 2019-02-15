function deepCopy(obj) {
  console.log(obj);
  var _toString = Object.prototype.toString;

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime());
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    var flags = [];
    if (obj.global) { flags.push('g'); }
    if (obj.multiline) { flags.push('m'); }
    if (obj.ignoreCase) { flags.push('i'); }

    return new RegExp(obj.source, flags.join(''));
  }

  var result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {};

  console.log(result);

  for (var key in obj) {
    if(obj.hasOwnProperty(key)){
      result[key] = deepCopy(obj[key]);
    }
  }

  return result;
}

console.log(typeof deepCopy());