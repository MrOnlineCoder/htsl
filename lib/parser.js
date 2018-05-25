const Validate = require('./validate.js');

let output = '';
let docRoot = {};
let ident = -2;

function ParseError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};

function append(data) {
  output += data + '\n';
}

function appendShortTag(tag, content) {
  append('<'+tag+'>'+content+'</'+tag+'>');
}

function appendNode(node) {
  ident += 2;
  output += ' '.repeat(ident) + '<' + node.tag;

  if (node.id) {
    output += ' id="'+node.id+'"';
  }

  if (node.classes) {
    output += ' class="'+node.classes.join(' ')+'"';
  }

  if (node.attributes) {
    for (var attr in node.attributes) {
        if (node.attributes.hasOwnProperty(attr)) {
            if (Validate.isBoolean(node.attributes[attr])) {
              output += ' ' + attr;
            } else {
              output += ' ' + attr + '="' + node.attributes[attr] + '"';
            }


        }
    }
  }

  if (Validate.noEndTag(node.tag)) {
    ident -= 2;
    output += '>\n';
    return;
  }

  output += '>';

  if (node.children) {
    append('');

    if (Validate.isString(node.children)) {
      output += ' '.repeat(ident+2) + node.children + '\n';
    } else if (Validate.isArray(node.children)) {
      if (node.children.length > 0 && Validate.isObject(node.children)) {
        for (var i = 0; i < node.children.length; i++) {
          appendNode(node.children[i]);
        }
      }
    } else if (Validate.isObject(node.children)) {
      appendNode(node.children);
    }
  }

  output += ' '.repeat(ident) + '</' + node.tag + '>\n';
  ident -= 2;
}

function processHead(isDefault) {
  append('<head>');

  if (isDefault) {
    append('<title> HTSL page </title>');
    append('</head>');
    return;
  }

  appendShortTag('title', docRoot.head.title);

  for (var key in docRoot.head.meta) {
      if (docRoot.head.meta.hasOwnProperty(key)) {
          append('<meta '+key+'="'+docRoot.head.meta[key]+'">');
      }
  }

  if (docRoot.head.css) {
    for (var i = 0; i < docRoot.head.css.length; i++) {
      append('<link rel="stylesheet" href="'+docRoot.head.css[i]+'">');
    }
  }

  append('</head>');
}

function processBody() {
  if (!docRoot.body) return;

  docRoot.body.tag = 'body';

  appendNode(docRoot.body);
}

function parse(arg) {
  if (!arg.document) {
    throw new ParseError('Missing document root.');
  }

  output = '';

  docRoot = arg.document;

  append('<!DOCTYPE html>');
  append('<html>');

  if (docRoot.head) {
    if (!Validate.isObject(docRoot.head)) throw new ParseError('document.head is not an object!');

    let headValidateMsg = Validate.validateHead(docRoot.head);

    if (headValidateMsg != null) {
      throw new ParseError('Invalid document.head: '+headValidateMsg);
    }

    processHead(false);
  } else {
    processHead(true);
  }

  processBody();

  append('</html>');

  return output;
}


module.exports = {
  parse
};
