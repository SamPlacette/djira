
function encode(val: string): string {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

function isURLSearchParams(val: any) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
export function buildURL(url: string, params: Record<string, any>, paramsSerializer: (parameters: Record<string, any>) => string) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts:string[] = [];
    for(let key in params) {
      let val = params[key];
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (Array.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      val.forEach((v:unknown) => {
        let value: string = v as string;
        if (v instanceof Date) {
          value = v.toISOString();
        } else if (v !== null && typeof v === "object") {
          value = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(value));
      })

    }

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};
