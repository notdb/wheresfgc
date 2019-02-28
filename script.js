let zipToCords = document.querySelector('.zipToCords');
let long = document.querySelector('.long');
let latt = document.querySelector('.latt');
let button = document.querySelector(".cordsButton");
let cords = document.querySelector('.cords');
let jsonButton = document.querySelector('.json');
let distanceMeasure = document.querySelector('.distanceMeasure');
let topThree = document.querySelector('.topThree');
let gmapsHeadlineText = document.querySelector('.gmapsHeadlineText');

//various arrays
let emptyArray = [];
let notAnotherArray = [];
let sortedArray = [];
let topThreeArray = [];

// selectors for user added arcade

let userName = document.querySelector('.userName');
let userAddress = document.querySelector('.userAddress');
let userTownState = document.querySelector('.userTownState');
let userZipCode = document.querySelector('.userZipCode1');
let buttonPresser = document.querySelector('.buttonPresser');


buttonPresser.addEventListener('click', userJsonArray);

function userJsonArray() {


  let testParse = [userName.value, userAddress.value, userTownState.value, userZipCode.value];

  notAnotherArray.push(testParse);
  emptyArray.push(testParse[3]);

  console.log(notAnotherArray);
  console.log(emptyArray);
}



const somethingSomething = async (zipToCords) => {
  let zipToCordsNumber = Number(zipToCords.value);
  //console.log(zipToCordsNumber);
  //console.log(zipToCords);
  let zipNumber = await fetch(`https://geocoder.ca/?locate= ${zipToCordsNumber} &geoit=xml&json=1`)

  let zipNumberJson = await zipNumber.json();
  //console.log(zipNumberJson);
  getActivity;
  return zipNumberJson;
}

somethingSomething;

const getActivity = async () => {
  let jsonData = await somethingSomething(zipToCords);
  console.log('AAAAAAAA    ' + jsonData);
  let stuff = jsonData;
  /*
  long.textContent = stuff['longt'];
  latt.textContent = stuff['latt'];
  */
  let latt1 = parseFloat(stuff['latt']);
  let longt1 = parseFloat(stuff['longt']);

  function initMap() {
    let latLing = { lat: latt1, lng: longt1 };
    var origin4 = { lat: latt1, lng: longt1 };
    console.log(latLing);
    var origin1 = new google.maps.LatLng(55.930385, -3.118425)
    var origin2 = 'Greenwich, England';
    var origin3 = { lat: 40.8046, lng: -77.899 };
    var destinationA = 'Columbus, Ohio';
    var destinationB = new google.maps.LatLng(50.087692, 14.421150);

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin4],
        destinations: emptyArray,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, callback);

    var myOptions = {
      zoom: 8,
      center: latLing,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      disableDefaultUI: true
    }
    var map = new google.maps.Map(document.getElementById("gmaps"), myOptions);
    var marker = new google.maps.Marker({ position: latLing, map: map });


    function callback(response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        topThree.textContent = '';
        gmapsHeadlineText.style.display = 'flex';
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;

        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          console.log(results);
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            //var distance = element.distance.text;
            let distance2 = element.distance.value;
            let distance3 = distance2 / 1609.344;
            let distanceToMi = (Math.round(distance3 * 100) / 100);

            //console.log((Math.round(distance3 * 100) / 100) + ' test disance');
            // console.log(distance + ` to ${destinations[j]}`);
            var duration = element.duration.text;
            var from = origins[i];
            var to = destinations[j];

            /*
            let distanceGroup = document.createElement('disanceGroup');
            distanceGroup.textContent = distance + ` to ${notAnotherArray[j]} `;
            distanceMeasure.appendChild(distanceGroup);
            */



            let keyValuePair = [distanceToMi, notAnotherArray[j]]
            sortedArray.push(keyValuePair);
            console.log(sortedArray);
            //console.log(typeof element);
            //console.log(element);



          }
        }
        testSort2(sortedArray);
        for (i = 0; i <= 2; i++) {
          topThreeArray.push(sortedArray.shift());
          let section = document.createElement('section');
          let div1 = document.createElement('div');
          let div2 = document.createElement('div');
          let div3 = document.createElement('div');
          let ttaDistance = document.createElement('ttaDistance');
          let ttaName = document.createElement('ttaName');
          let ttaAddress = document.createElement('ttaAddress');
          let ttaTownState = document.createElement('ttaTownState');
          let ttaZipCode = document.createElement('ttaZipCode');
          ttaDistance.textContent = `${topThreeArray[i][0]} miles to :`;
          ttaName.textContent = topThreeArray[i][1][0];
          ttaAddress.textContent = topThreeArray[i][1][1];
          ttaTownState.textContent = `${topThreeArray[i][1][2]} `;
          ttaZipCode.textContent = topThreeArray[i][1][3];

          section.appendChild(ttaDistance);
          section.appendChild(div1);
          section.appendChild(ttaName);
          section.appendChild(div2);
          section.appendChild(ttaAddress);
          section.appendChild(div3);
          section.appendChild(ttaTownState);
          section.appendChild(ttaZipCode);
          topThree.appendChild(section);


        };

        //console.log(topThreeArray);
        //console.log(topThreeArray[2][1][0]);

      }
    }
  }

  //console.log(typeof latt1);
  //console.log(longt1);
  //console.log(stuff);
  //console.log(stuff.standard);
  initMap(latt1, longt1);

}

button.addEventListener('click', getActivity);




/*
function zipCords() {
let zipToCordsNumber = Number(zipToCords.value);
console.log(zipToCordsNumber);


fetch('https://geocoder.ca/?locate=' + zipToCordsNumber + '&geoit=xml&json=1')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    let stuff = JSON.stringify(myJson);
    let stuffTwo = myJson;
    console.log(stuff);
    console.log(stuffTwo['longt']);
  });
}
*/




fetch('places.json')
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject('something went wrong!')
    }
  })
  .then(function (data) {
    console.log('data is', data)

    /*
    let arenaName = document.createElement('p');
    let arenaAddress = document.createElement('p');
    let arenaTown = document.createElement('p');
    arenaName.textContent = 
      data['id'][0]['name'];
    arenaAddress.textContent = data['id'][0]['street'];
    arenaTown.textContent = data['id'][0]['town'] + ', ' + data['id'][0]['state'] + ' ' + data['id'][0]['zipcode'];
    jsonButton.appendChild(arenaName);
    jsonButton.appendChild(arenaAddress);
    jsonButton.appendChild(arenaTown);
    console.log(data['id'][0]['name']);
    console.log(data['id'].length);
    */
    // creating a list of arcades
    /* 
    this is a long for loop that iterates through the json list and creates a section for each item and then in each item with the corresponding json
    
    so the html will be
    Arcade
    Street Name
    Town, State Zipcode
    for each arcade in the json array
    */

    for (let i = 0; i < data['id'].length; i++) {
      // creating blank areas to store the esports in
      let arenaGroup = document.createElement('section');
      let arenaName1 = document.createElement('p');
      let arenaAddress1 = document.createElement('p');
      let arenaTown1 = document.createElement('p');
      arenaName1.textContent = data['id'][i]['name'];
      arenaAddress1.textContent = data['id'][i]['street'];
      arenaTown1.textContent = data['id'][i]['town'] + ', ' + data['id'][i]['state'] + ' ' + data['id'][0]['zipcode'];
      arenaGroup.appendChild(arenaName1);
      arenaGroup.appendChild(arenaAddress1);
      arenaGroup.appendChild(arenaTown1);
      jsonButton.appendChild(arenaGroup);

      //create array of destinations from places.json
      let arcadeTown = data['id'][i]['town'];
      let arcadeState = data['id'][i]['state'];
      let arcadeZipCode = data['id'][i]['zipcode'];
      let arcadeName = data['id'][i]['name'];
      let arcadeStreet = data['id'][i]['street'];
      let townState = arcadeTown + ', ' + arcadeState;
      let arcadeAddress = arcadeName + ' ' + arcadeStreet + ' ' + townState + ' ' + arcadeZipCode;
      emptyArray.push(arcadeZipCode);
      notAnotherArray.push([arcadeName, arcadeStreet, townState, arcadeZipCode]);
      //console.log(emptyArray);
      //console.log(notAnotherArray);

    }

  }).catch(error => console.log('error is', error));


let testArray = [6, 4, 8, 2, 3, 7, 9];
let testArray1 = [[6, 'b'], [4, 'c'], [8, 'd'], [2, 'e'], [3, 'f'], [6, 'g'], [7, 'n'], [9, 'a']];
let testArrayLength1 = testArray1.length;
function testSort(array) {
  var holdNum = 0;
  let switchh = 1;
  let y = 0;
  do {
    for (let i = 0; i < testArrayLength1 - 1; i++) {
      if (testArray1[0 + i] >= testArray1[1 + i]) {
        holdNum = testArray1[0 + i];
        testArray1[0 + i] = testArray1[1 + i];
        testArray1[1 + i] = holdNum;
        y++;
        //console.log(testArray1);
      } else {
        //console.log(testArray1 + 'a');

      }
    }

    console.log(y);
  } while (testArray1[0 + y] > testArray1[1 + y])
}

// poverty bubblesort

function testSort2(array) {
  var holdNum = 0;
  let y = 0;
  do {
    /* checks if the number on right is less than or equal to the number on the left */
    if (array[0 + y][0] <= array[1 + y][0]) {
      y++
    } else {

      /* swaps the number on the right with the number on the left (if it is smaller) */

      /* editors note, the part's with variable i are the numbers that are being compared to swap, if you want to swap more, modify the array to swap *everything* that you want swapped. for example:
      if array[0+i][0] = 13 and array[1+i][0] = 12, just 13 and 12 will be swapped. if in actuality, the arrays were [12,[x]] and [13,[y]], then you'd need to change the code to array[0+i] and array[1+i] to swap the entire array */

      for (let i = 0; i < array.length - 1; i++) {
        if (array[0 + i][0] >= array[1 + i][0]) {
          holdNum = array[0 + i];
          array[0 + i] = array[1 + i];
          array[1 + i] = holdNum;
          y++;
          //console.log(testArray1);
        } else {
          //console.log(testArray1 + 'a');

        }
      }
      y = 0;
    }

  } while (y !== (array.length - 1))
  console.log(array);
}


arrayToTest = [
  [2795.1,
    'Super Arcade', '123 E Foothill Blvd', 'Azusa, CA', '91702'],
  [300.95,
    'Esports Arena Las Vegas',
    '3900 S. Las Vegas Blvd',
    'Las Vegas, NV',
    '89119'],
  [2909.24,
    'Next Level Arcade', '874 4th Ave', 'Brooklyn, NY', '11232']]