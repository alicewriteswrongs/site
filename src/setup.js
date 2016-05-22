import entries from 'object.entries';

export default function setup () {
  if (!Object.entries) {
    entries.shim();
  }
}
