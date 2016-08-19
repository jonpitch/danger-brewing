import {
  create,
  visitable
} from 'ember-cli-page-object';

const url = '/history';

export default create({
  visit: visitable(url),
  url: url
});
