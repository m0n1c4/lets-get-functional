#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");
const _ = require("lodown-m0n1c4");


/**
 * ! Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * ! Solve all problems as outlined in the README.
 */
 
 // 1) Find the number of males
 
//  _.filter(customers, function(value, index, array){
//      //need to look inside each object 
//       // & if the gender is male
//      if(value['gender'] === 'male') console.log(value);
     // return that value (filter returns an array)
     let maleList = [];
     _.each(customers, function(e, i, a){
         _.each(e, function(value, key, obj){
             if(key === 'gender' && value === "male"){
                 maleList.push(value);
             }
         });
     });
 console.log('The number of male customers is: ' + maleList.length);
 
 // 2) Find the number of females
 let femaleList = [];
 _.each(customers, function(e, i, a){
     _.each(e, function(value, key, obj){
         if(key === 'gender' && value === 'female'){
             femaleList.push(value);
         }
     });
 });
 console.log('The number of female customers is: ' + femaleList.length);
 
// 3) Find the name and age of the oldest customer
 let maxAge = customers[0].age;
 let oldestName = '';
 let oldestAge = '';
 
_.filter(customers, function(e, i, o){ // iterate through the array 'customers'
        if (e['age'] > maxAge){ // if the element.age property is greater than maxAge
            maxAge = e['age']; // set maxAge to the current element
            oldestName = e['name']; // set name
            oldestAge = e['age']; // set age
        }
    
});
 
 console.log('The oldest customer is ' + oldestName + ', and they are ' + oldestAge + '!');
 
 // 4) Find the name and age of the youngest customer
 let minAge = customers[0].age;
 let smolName = '';
 let smolAge = '';
 
 _.filter(customers, function(e, i, o){ // iterate through array 'customers'
         if(e['age'] <= minAge){ // if the element.age property is less than minAge
             minAge = e['age']; // set minAge to the current element
             smolName = e['name']; // set name
             smolAge = e['age']; // set age
         }
     
 });
 
 console.log('The youngest customer is ' + smolName + ', and they are just ' + smolAge + '!');
 // 5) Find the average balance of all customers
 
function average(arr){
 var avBalance = _.reduce(arr, function(origin, num){
        return Number(origin) + Number(num);
    }, 0) / arr.length;
    return Math.floor(avBalance);
} 

let allBalance = _.pluck(customers, 'balance'); 
//console.log(allBalance);// allBalance is now populated with all the balance values
//the balance values are strings containing  $ and , 
//I need to convert them into just an array of numbers
let numBalance = [];
_.each(allBalance, function(e, i, a){
    var noBling = e.slice(1).replace(',', ''); //slice out the first char ($)
                                                 //replace , with ''
   // console.log(noBling);
    numBalance.push(noBling);
});
//console.log(numBalance); //should be an array containing only strings of numbers

console.log('The average balance is: ' + average(numBalance));

 // 6) Find how many customer's names begin with <a random letter>. Write a 
 //    function to answer this question, then log an answer. 
 
 var namesArr = []; // container for customer's names only
 _.filter(customers, function(e, i, o){ // iterate through the array 'customers'
        if (e['name']){
            namesArr.push(e['name']); // if the customer has a name, it's in the new array
        }
    
});
 console.log('All Customer Names: ' + namesArr); // should log only customer names
 
 function findByLetter(randomLetter){
     var filteredNames = [];
     _.each(namesArr, function(element, index, array){
         if(randomLetter.toLowerCase() === element[0].toLowerCase()){
             filteredNames.push(element);
         }
     });
     console.log('Filtered Names: ' + filteredNames);
     return filteredNames.length;
     //returns only words who have their [0]index === letter
 }
  
  console.log('The customers whose names begin with s are: ' + findByLetter('s')); // 2
  console.log('The customers whose names begin with d are: ' + findByLetter('d')); // 2
 
//  // 7) Find how many customer's friends names begin with <a random letter>. Write
//  //    a function to answer this question, then log an answer.

var allFriends = _.pluck(customers, 'friends');

//console.log(allFriends);//logs each friends array of object

var allFriendsAllTogether = [];
var allFriendsOneArr = _.each(allFriends, function(e, i, c) {
                     _.each(e, function(v, i, a){
                        allFriendsAllTogether.push(v);
                     }); 
          return allFriendsAllTogether;
   });
// console.log(allFriendsAllTogether[0].name);
// console.log(allFriendsAllTogether);
var namesOnly = _.pluck(allFriendsAllTogether, 'name');
// console.log(namesOnly);

var noDupes = _.unique(namesOnly);
// console.log(noDupes);

function friendByLetter(randomLetter){
     var filteredFriends = [];
     _.each(noDupes, function(element, index, array){
         if(randomLetter.toLowerCase() === element[0].toLowerCase()){
             filteredFriends.push(element);
         }
     });
     console.log('Filtered Names: ' + filteredFriends);
     return filteredFriends.length;
     //returns only friends who have their [0]index === letter
 }
 console.log('Friends beginning with R: ' + friendByLetter('r'));
 console.log('Friends beginning with J: ' + friendByLetter('j'));
 console.log('Friends beginning with C: ' + friendByLetter('c'));
   
 
 // 8) Find the names of all customers who are friends with a given customer 
 //    (by name) - i.e. which customers have that name on their friends list?

function isFriend(collection, friendName){
 var friendsWith = [];
     _.each(collection, function(v, i, a){
      var friendsArr = v.friends;
      var friendsNamesOnly = _.pluck(friendsArr, 'name'); //we only select friends from the individual at v
     _.each(friendsNamesOnly, function(value, index, array){
      if(value.toLowerCase() === friendName.toLowerCase()) {
       friendsWith.push(v.name); //only push the name of the person who has that person as a friend
      }
     });
     });
     return friendsWith;
}

console.log('These customers are friends with Adele: ' + isFriend(customers, 'Adele Mullen'));
console.log('These customers are friends with Cooley: ' + isFriend(customers, 'Cooley Jimenez'));

 // // 9) Find the top 3 most common tags among all customers
    var allTags = [].concat.apply([], _.pluck(customers, 'tags'));
    var tagCounter = {};
    function countEachTag(array){
     _.each(array, function(element, index, array) {
      tagCounter[array[index]] = (tagCounter[array[index]] || 0) + 1;
     });
     return tagCounter;
    }
     var countedTags = countEachTag(allTags);
   console.log(tagCounter);
   
   
 
 
 // // 10) Create a summary of genders, the output should be:
 // // {
 // // male: 3,
 // // female: 4,
 // // transgender: 1
 // // }
 // // You should use reduce() to solve this.

  var gendersArr = _.pluck(customers, 'gender');
  console.log(gendersArr); //logs correct number of females
  
 function pickGenders(summary, gender){
  if(gender in summary) ++summary[gender];
  else summary[gender] = 1;
  return summary;
  }
 console.log(_.reduce(gendersArr, pickGenders, {}));
 //s
