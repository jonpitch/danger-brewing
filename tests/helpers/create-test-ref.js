import createOfflineRef from './create-offline-ref';

// no data is setup
export function emptyApplication() {
  return createOfflineRef({ });
}

// export default function createTestRef() {
//   let ref = createOfflineRef({
//     beers: {
//       beer123: {
//         name: 'Tart of your mom',
//         active: true
//       }
//     }
// "beers" : {
//   "-KO1N4Ofi1IwSetMe9ta" : {
//     "abv" : 6.5,
//     "active" : true,
//     "name" : "Tart of Darkness",
//     "ounces" : 150,
//     "style" : "Sour Stout",
//     "tap" : "-KO1HdKr4VxkSg5p0OEU",
//     "tapped" : 1469992425095
//   },
//   "-KO1_pCVEvHhpYKi-Lah" : {
//     "abv" : 8.5,
//     "active" : true,
//     "name" : "Lord Hoppington",
//     "ounces" : 128,
//     "style" : "Double IPA",
//     "tap" : "-KO1Z5HatLNiqByIxLfj",
//     "tapped" : 1469996028792
//   }
// },
// "hubs" : {
//   "-KO1EJBmskdNLOc1S-4c" : {
//     "humidity" : "25",
//     "lastActivity" : "07/31/2016",
//     "lowerTemp" : "50",
//     "status" : "offline",
//     "taps" : {
//       "-KO1HcADp0WuqEUnQdAb" : true,
//       "-KO1HdKr4VxkSg5p0OEU" : true,
//       "-KO1Z5HatLNiqByIxLfj" : true
//     },
//     "upperTemp" : "51"
//   }
// },
// "taps" : {
//   "-KO1HcADp0WuqEUnQdAb" : {
//     "hub" : "-KO1EJBmskdNLOc1S-4c",
//     "name" : "tap-1",
//     "nitro" : false
//   },
//   "-KO1HdKr4VxkSg5p0OEU" : {
//     "beer" : "-KO1N4Ofi1IwSetMe9ta",
//     "hub" : "-KO1EJBmskdNLOc1S-4c",
//     "name" : "tap-2",
//     "nitro" : true
//   },
//   "-KO1Z5HatLNiqByIxLfj" : {
//     "beer" : "-KO1_pCVEvHhpYKi-Lah",
//     "hub" : "-KO1EJBmskdNLOc1S-4c",
//     "name" : "tap-nitro",
//     "nitro" : false
//   }
// }
//   });
//
//   if (child) {
//     return ref.child(child);
//   }
//
//   return ref;
// }
