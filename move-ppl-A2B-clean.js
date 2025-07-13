const ppl = [
  {name: "Anna", time: 20, house: 0},
  {name: "Oksana", time: 10, house: 0},
  {name: "Ivan", time: 4, house: 0},
  {name: "Petro", time: 2, house: 0},
  //{name: "Bobo", time: 1, house: 0},
];
let bestTime = 0;
let bestPath = '';
play(JSON.stringify(ppl), 0, '');
console.log("The best time = ", bestTime);
console.log("The best path is", bestPath);

function play(strPpl, curTime, curPath) {  
  let a = JSON.parse(strPpl);
  for(let i = 0; i < a.length - 1; i++){
    if (a[i].house !== 0) continue;
    for(let j = i + 1; j < a.length; j++){
      if (a[j].house !== 0) continue;
      let [time, path] = makeMove(a, i, j);
      if(getLength(a, 0) !== 0) {
        play(JSON.stringify(a), curTime + time, curPath + path);
        a = JSON.parse(strPpl);
      } else { 
        let finalTime = curTime + time;
        let finalPath = curPath + path;
        console.log("finalTime = ", finalTime);
        if (bestTime === 0) {
          bestTime = finalTime;
          bestPath = finalPath;
        }
        else if (curTime+time < bestTime) {
          bestTime = finalTime;
          bestPath = finalPath;
        }
      }
    }
  }
  return;
}

function makeMove(arr, i, j) {
  arr[i].house = 1;
  arr[j].house = 1;
  let timeA2B = Math.max(arr[i].time, arr[j].time);
  let pathA2B = "[" + arr[i].name + '(' + arr[i].time + '),' + arr[j].name + '(' + arr[j].time + ')' + "] go to B";
  if(getLength(arr, 0) !== 0) {
    let goBackIdx = findMinByHouse(arr, 1);
    arr[goBackIdx].house = 0;
    return [timeA2B + arr[goBackIdx].time, pathA2B + " and " + arr[goBackIdx].name + " returns to A "];
  } else {
    return [timeA2B, pathA2B];
  }
}

function findMinByHouse(arr, house) {
  let minIndex = -1;
  let minValue = 10000;

  for (let k = 0; k < arr.length; k++) {
    if (minIndex === -1 && arr[k].house === house) {
      minIndex = k;
      minValue = arr[k].time;
    } else if (arr[k].house === house && arr[k].time < minValue) {
      minIndex = k;
      minValue = arr[k].time;
    }
  }
  return minIndex;
}

function getLength(arr, house) {
  let counter = 0;
  for (let k = 0; k < arr.length; k++) {
    if (arr[k].house === house) counter++;
  }
  return counter;
}
