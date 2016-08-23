export default {
  app: {
    name: 'Danger Brewing',
    ipsum: 'Lorem Ipsum',
    navigation: {
      onTap: 'On Tap',
      status: 'Status',
      history: 'History',
      about: 'About',
      login: 'Log In',
      logout: 'Log Out'
    },
    units: {
      fahrenheit: '&deg;F',
      celsius: '&deg;C'
    },
    about: {
      comingSoon: 'Coming Soon...',
      medium: 'To find out more, read about it on medium.',
      developers: 'Developers, if you want to contribute:',
      github: 'Click Here'
    },
    history: {
      placeholder: 'Coming soon, usage statistics...'
    }
  },

  components: {
    login: {
      email: 'Email Address',
      password: 'Password',
      action: 'Log In'
    },
    onTap: {
      add: 'Add Beer',
      empty: 'there\'s nothing on tap at the moment.',
      nitro: 'Nitrogen',
      lastPour: 'Last Poured: {{date}}',
      tapped: 'Tapped {{date}}'
    },
    addBeer: {
      name: 'Beer Name',
      style: 'Beer Style',
      tap: 'Tap',
      abv: 'ABV',
      oz: 'Ounces (128 per gallon)',
      nitro: 'Nitro',
      cancel: 'Cancel',
      save: 'Add Beer',
      noHub: 'Set up a hub first'
    },
    hubStatus: {
      hub: {
        none: 'No hub found',
        add: 'Setup Hub',
        offline: 'Hub is offline',
        online: 'Hub is online',
        lastActive: 'Last Activity',
        noActivity: 'None'
      },
      taps: {
        none: 'No taps found',
        add: 'Add Tap',
        pouring: 'Pouring: {{beer}}',
        notPouring: 'Empty',
        nitro: 'Nitrogen',
        co2: 'CO2'
      },
      sensors: {
        none: 'No sensors found',
        add: 'Add Sensor',
        noTemp: '&mdash;',
        humidity: '&mdash; {{humidity}}%'
      }
    },
    addTap: {
      name: 'Tap Name',
      nitro: 'Nitro',
      cancel: 'Cancel',
      save: 'Add Tap',
      noHub: 'Set up a hub first'
    },
    addSensor: {
      name: 'Sensor Name',
      cancel: 'Cancel',
      save: 'Add Sensor',
      noHub: 'Set up a hub first'
    }
  },

  // validations
  errors: {
    description: 'this field',
    inclusion: '{{description}} is not included in the list',
    exclusion: '{{description}} is reserved',
    invalid: '{{description}} is invalid',
    confirmation: '{{description}} doesn\'t match {{on}}',
    accepted: '{{description}} must be accepted',
    empty: '{{description}} can\ be empty',
    blank: '{{description}} can\'t be blank',
    present: '{{description}} must be blank',
    collection: '{{description}} must be a collection',
    singular: '{{description}} can\'t be a collection',
    tooLong: '{{description}} is too long (maximum is {{max}} characters)',
    tooShort: '{{description}} is too short (minimum is {{min}} characters)',
    before: '{{description}} must be before {{before}}',
    after: '{{description}} must be after {{after}}',
    wrongDateFormat: '{{description}} must be in the format of {{format}}',
    wrongLength: '{{description}} is the wrong length (should be {{is}} characters)',
    notANumber: '{{description}} must be a number',
    notAnInteger: '{{description}} must be an integer',
    greaterThan: '{{description}} must be greater than {{gt}}',
    greaterThanOrEqualTo: '{{description}} must be greater than or equal to {{gte}}',
    equalTo: '{{description}} must be equal to {{is}}',
    lessThan: '{{description}} must be less than {{lt}}',
    lessThanOrEqualTo: '{{description}} must be less than or equal to {{lte}}',
    otherThan: '{{description}} must be other than {{value}}',
    odd: '{{description}} must be odd',
    even: '{{description}} must be even',
    positive: '{{description}} must be positive',
    date: '{{description}} must be a valid date',
    email: '{{description}} must be a valid email address',
    phone: '{{description}} must be a valid phone number',
    url: '{{description}} must be a valid url'
  }
};
