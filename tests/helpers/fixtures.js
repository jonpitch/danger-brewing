// hub and taps exist
export function stubHubAndTapsFixture() {
  return {
    hubs: {
      '-KO1EJBmskdNLOc1S-4c': {
        humidity: 25,
        lastActivity: '07/31/2016',
        lowerTemp: 50,
        status: 'offline',
        taps: {
          '-KO1HcADp0WuqEUnQdAb': true,
          '-KO1HdKr4VxkSg5p0OEU': true,
          '-KO1Z5HatLNiqByIxLfj': true
        },
        upperTemp: 51
      }
    },
    taps: {
      '-KO1HcADp0WuqEUnQdAb': {
        hub: '-KO1EJBmskdNLOc1S-4c',
        name: 'tap-1',
        nitro: false
      },
      '-KO1HdKr4VxkSg5p0OEU': {
        hub: '-KO1EJBmskdNLOc1S-4c',
        name: 'tap-2',
        nitro: true
      },
      '-KO1Z5HatLNiqByIxLfj': {
        hub: '-KO1EJBmskdNLOc1S-4c',
        name: 'tap-nitro',
        nitro: false
      }
    }
  };
}

// only a hub exists
export function stubHubOnlyFixture() {
  return {
    hubs: {
      '-KO1EJBmskdNLOc1S-4c': {
        humidity: 25,
        lastActivity: '07/31/2016',
        lowerTemp: 50,
        status: 'offline',
        upperTemp: 51
      }
    }
  };
}

// data when everything is setup
export function stubApplicationFixture() {
  return {
    beers: {
      '-KO1N4Ofi1IwSetMe9ta': {
        abv: 6.5,
        active: true,
        name: 'Tart of Darkness',
        ounces: 150,
        style: 'Sour Stout',
        tap: '-KO1HdKr4VxkSg5p0OEU',
        tapped: '1469992425095',
        pours: {
          '-JPc6S2WqRmuhwWaJPva': true,
          '-JPc6S2WqRmuhwWaJPvb': true
        }
      },
      '-KO1_pCVEvHhpYKi-Lah': {
        abv: 8.5,
        active: true,
        name: 'Lord Hoppington',
        ounces: 128,
        style: 'Double IPA',
        tap: '-KO1Z5HatLNiqByIxLfj',
        tapped: '1469996028792',
        pours: {
          '-JPc6S2WqRmuhwWaJPvc': true
        }
      }
    },
    hubs: {
      '-KO1EJBmskdNLOc1S-4c': {
        lastActivity: '07/31/2016',
        status: 'offline',
        taps: {
          '-KO1HcADp0WuqEUnQdAb': true,
          '-KO1HdKr4VxkSg5p0OEU': true,
          '-KO1Z5HatLNiqByIxLfj': true
        },
        sensors: {
          '-KPc6S2WqRmuhwWaJPvf': true,
          '-JPc6S2WqRmuhwWaJPvf': true
        }
      }
    },
    taps: {
      '-KO1HcADp0WuqEUnQdAb': {
        hub: '-KO1EJBmskdNLOc1S-4c',
        name: 'tap-1',
        nitro: false
      },
      '-KO1HdKr4VxkSg5p0OEU': {
        beer: '-KO1N4Ofi1IwSetMe9ta',
        hub: '-KO1EJBmskdNLOc1S-4c',
        name: 'tap-2',
        nitro: true
      },
      '-KO1Z5HatLNiqByIxLfj': {
        beer: '-KO1_pCVEvHhpYKi-Lah',
        hub: '-KO1EJBmskdNLOc1S-4c',
        name: 'tap-nitro',
        nitro: false
      }
    },
    sensors: {
      '-KPc6S2WqRmuhwWaJPvf': {
        hub: '-KO1EJBmskdNLOc1S-4c',
        name: 'sensor-1',
        type: 'temperature'
      },
      '-JPc6S2WqRmuhwWaJPvf': {
        hub: '-KO1EJBmskdNLOc1S-4c',
        name: 'sensor-2',
        type: 'temperature'
      }
    },
    pours: {
      '-JPc6S2WqRmuhwWaJPva': {
        beer: '-KO1N4Ofi1IwSetMe9ta',
        ounces: 8
      },
      '-JPc6S2WqRmuhwWaJPvb': {
        beer: '-KO1N4Ofi1IwSetMe9ta',
        ounces: 12
      },
      '-JPc6S2WqRmuhwWaJPvc': {
        beer: '-KO1_pCVEvHhpYKi-Lah',
        ounces: 12.4
      }
    }
  };
}
