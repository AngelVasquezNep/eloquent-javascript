/**
  ================== ROAD GRAPH ==================

  "Alice's House": [ "Bob's House", 'Cabin', 'Post Office' ],
  "Bob's House": [ "Alice's House", 'Town Hall' ],
  Cabin: [ "Alice's House" ],
  'Post Office': [ "Alice's House", 'Marketplace' ],
  'Town Hall': [ "Bob's House", "Daria's House", 'Marketplace', 'Shop' ],
  "Daria's House": [ "Ernie's House", 'Town Hall' ],
  "Ernie's House": [ "Daria's House", "Grete's House" ],
  "Grete's House": [ "Ernie's House", 'Farm', 'Shop' ],
  Farm: [ "Grete's House", 'Marketplace' ],
  Shop: [ "Grete's House", 'Marketplace', 'Town Hall' ],
  Marketplace: [ 'Farm', 'Post Office', 'Shop', 'Town Hall' ]
 */

const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  'Marketplace-Farm',
  'Marketplace-Post Office',
  'Marketplace-Shop',
  'Marketplace-Town Hall',
  'Shop-Town Hall',
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split('-'))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

// const roadGraph = buildGraph(roads);

const roadGraph = {
  "Alice's House": ["Bob's House", 'Cabin', 'Post Office'],
  "Bob's House": ["Alice's House", 'Town Hall'],
  Cabin: ["Alice's House"],
  'Post Office': ["Alice's House", 'Marketplace'],
  'Town Hall': ["Bob's House", "Daria's House", 'Marketplace', 'Shop'],
  "Daria's House": ["Ernie's House", 'Town Hall'],
  "Ernie's House": ["Daria's House", "Grete's House"],
  "Grete's House": ["Ernie's House", 'Farm', 'Shop'],
  Farm: ["Grete's House", 'Marketplace'],
  Shop: ["Grete's House", 'Marketplace', 'Town Hall'],
  Marketplace: ['Farm', 'Post Office', 'Shop', 'Town Hall'],
};

const mailRoute = [
  "Alice's House",
  'Cabin',
  "Alice's House",
  "Bob's House",
  'Town Hall',
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  'Shop',
  "Grete's House",
  'Farm',
  'Marketplace',
  'Post Office',
];

class VillageState {
  constructor(place, parcels) {
    this.place = place; // Current location
    this.parcels = parcels; // Undelivered parcels (parcels -> packages)
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((parcel) => {
          if (parcel.place === this.place) {
            return { place: destination, address: parcel.address }; // place: FROM, address: TO
          }

          return parcel;
        })
        .filter((parcel) => parcel.place !== parcel.address);

      return new VillageState(destination, parcels);
    }
  }

  static random(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;

      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);

      parcels.push({ place, address });
    }

    console.log('RANDOM PARCELS: ', { parcels });

    return new VillageState('Post Office', parcels);
  }
}

/**
 * @param {VillageState} state
 * @param {*} robot
 * @param {String[]} memory - Route of the robot ['Place A', 'Place B', ...]
 */
function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(
      `Moved to ${action.direction} | Robot has ${state.parcels.length} parcels`
    );
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state, memory) {
  return { direction: randomPick(roadGraph[state.place]) };
}

function routeRobot(state, memory) {
  if (memory.length === 0) {
    memory = mailRoute;
  }

  return {
    direction: memory[0],
    memory: memory.slice(1),
  };
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];

    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

function goalOrientedRobotEfficient({ place, parcels }, route) {
  if (route.length == 0) {
    let shorterRoute = null;

    for (const parcel of parcels) {
      let route;
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }

      if (!shorterRoute || route.length < shorterRoute.length) {
        shorterRoute = route
      }
    }

    route = shorterRoute;
  }
  return { direction: route[0], memory: route.slice(1) };
}

/**
 * Find shorter route
 */
function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];

  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];

    for (let place of graph[at]) {
      if (place === to) {
        return route.concat(place);
      }

      if (!work.some((w) => w.at === place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

// runRobot(VillageState.random(), routeRobot, mailRoute);
// runRobot(VillageState.random(), goalOrientedRobot, []);

function compareRobots(robot1, memory1 = [], robot2, memory2 = []) {
  let stepsA = 0;
  let stepsB = 0;

  for (let i = 0; i < 100; i++) {
    const villageState = VillageState.random();

    stepsA += runRobot(villageState, robot1, memory1);
    stepsB += runRobot(villageState, robot2, memory2);
  }

  return {
    stepsA: stepsA / 100,
    stepsB: stepsB / 100,
  };
}

// console.log(
//   'randomRobot vs routeRobot',
//   compareRobots(randomRobot, [], routeRobot, [])
// );

// console.log(
//   'routeRobot vs goalOrientedRobot',
//   compareRobots(routeRobot, [], goalOrientedRobot, [])
// );

// runRobot(
//   new VillageState('Post Office', [
//     { place: 'Farm', address: "Bob's House" },
//     { place: "Bob's House", address: 'Town Hall' },
//     { place: "Daria's House", address: 'Cabin' },
//     { place: "Grete's House", address: "Daria's House" },
//     { place: "Grete's House", address: "Bob's House" },
//   ]),
//   routeRobot,
//   mailRoute
// );
// console.log('-'.repeat(20));
// runRobot(
//   new VillageState('Post Office', [
//     { place: 'Farm', address: "Bob's House" },
//     { place: "Bob's House", address: 'Town Hall' },
//     { place: "Daria's House", address: 'Cabin' },
//     { place: "Grete's House", address: "Daria's House" },
//     { place: "Grete's House", address: "Bob's House" },
//   ]),
//   goalOrientedRobot,
//   mailRoute
// );
// console.log('-'.repeat(20));
// runRobot(
//   new VillageState('Post Office', [
//     { place: 'Farm', address: "Bob's House" },
//     { place: "Bob's House", address: 'Town Hall' },
//     { place: "Daria's House", address: 'Cabin' },
//     { place: "Grete's House", address: "Daria's House" },
//     { place: "Grete's House", address: "Bob's House" },
//   ]),
//   goalOrientedRobotEfficient,
//   mailRoute
// );


console.log(
  'goalOrientedRobot vs goalOrientedRobotEfficient',
  compareRobots(goalOrientedRobot, [], goalOrientedRobotEfficient, [])
);