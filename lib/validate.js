let noEndTags = ['img', 'input', 'hr', 'br', 'embed', 'area', 'col'];


function isString(a) {
  return typeof a === 'string' || a instanceof String;
}

function isNumber(a) {
  return typeof a === 'number' || a instanceof Number;
}

function isBoolean(a) {
  return typeof a === 'boolean' || a instanceof Boolean;
}

function isObject(a) {
  return typeof(root) === 'object' && root !== null;
}

function isArray(obj) {
  return Array.isArray(obj);
}

function validateHead(head) {
  if (!head.title || !isString(head.title)) {
    return 'head.title must be a string!';
  }

  if (head.meta) if (!isObject(head.meta)) {
    return 'head.meta must be an object!';
  }

  if (head.css) if (!isArray(head.css)) {
    return 'head.css must be an array of CSS HREFs!';
  }

  if (head.scripts) if (!isArray(head.scripts)) {
    return 'head.scripts must be an array of script HREFs!';
  }

  return null;
}

function noEndTag(tag) {
  return noEndTags.includes(tag);
}

module.exports = {
  validateHead,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  noEndTag
}
