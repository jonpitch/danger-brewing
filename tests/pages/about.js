import {
  create,
  visitable
} from 'ember-cli-page-object';

const url = '/about';

export default create({
  visit: visitable(url),
  url: url
});
