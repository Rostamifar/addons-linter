import semver from 'semver';

/*
 * Template tag for removing whitespace and new lines
 * in order to be able to use multiline template strings
 * as a single string.
 *
 * Usage: singleLineString`foo bar baz
 *                    whatever`;
 *
 * Will output: 'foo bar baz whatever'
 *
 */
export function singleLineString(strings, ...vars) {
  // Interweave the strings with the
  // substitution vars first.
  let output = '';
  for (let i = 0; i < vars.length; i++) {
    output += strings[i] + vars[i];
  }
  output += strings[vars.length];

  // Split on newlines.
  let lines = output.split(/(?:\r\n|\n|\r)/);

  // Rip out the leading whitespace.
  return lines.map((line) => {
    return line.replace(/^\s+/gm, '');
  }).join(' ').trim();
}

/*
 * Gettext utils. No-op until we have proper
 * a proper l10n solution.
 *
 */
export function gettext(str) {
  return str;
}


/*
 * Check the minimum node version is met
 */
export function checkMinNodeVersion(minVersion, _process=process) {
  return new Promise((resolve, reject) => {
    minVersion = minVersion || '0.12.0';
    if (!semver.gte(_process.version, minVersion)) {
      reject(new Error(singleLineString`Node version must be ${minVersion} or
                       greater. You are using ${_process.version}.`));
    } else {
      resolve();
    }
  });
}