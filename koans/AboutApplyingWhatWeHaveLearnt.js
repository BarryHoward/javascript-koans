var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      var productsICanEat = [];
      productsICanEat = products.filter(function(element){
        return (!element.ingredients.includes("mushrooms") && !element.containsNuts);
      })

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = 0;    /* try chaining range() and reduce() */

    var sum = _.range(0, 1000).reduce(function(sum, element){
      if (element % 3 ===0 || element % 5 === 0){
        return (sum+element);
      } else {
        return sum;
      }
    }, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

  var sum = _(products.map(function(element){return element.ingredients})).chain()
                            .flatten()
                            .reduce(function(IC, element){if (IC[element] === undefined){IC[element]=1}else {IC[element]++};  return IC}, ingredientCount);
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    function isPrime(number){
      if (number<2){
        return false;
      } else {
        for (var i=2; i<=Math.sqrt(number); i++){
          if (number % i === 0){
            return false;
          }
        }
        return true;
      }
    }

    function largestPrime(number){
      var largestPrime = undefined;
        for (var i=2; i<=number; i++){
          if (number % i === 0 && isPrime(i)){
            largestPrime = i;
          }
        }
        return largestPrime;
    }
  });


  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    function isPalindrome(number){
      return (number.toString() === number.toString().split("").reverse().join(""));
    }

    var offset = 0;
    var largestPalindrome = 0;
    while (true){
      if(largestPalindrome>(999*(999-offset))){
        break;
      }
      for (var i=0; i<=offset; i++){
        var test = (999-i)*(999-offset);
        if (isPalindrome(test) && test>largestPalindrome){
          largestPalindrome=test;
          var outputString = (999-i) + " times " + (999-offset) + " equals "+ largestPalindrome;
        }
      }
      offset++;
    }

    console.log(outputString);


  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    // ---- SIMPLE, LONG WAY ---
    // console.log("Calculating...")
    // var found = false;
    // // var count = 1*2*3*2*5*7*2*3*11*13*2*17*19;
    // var count =1;
    // while (!found){
    //   count++;
    //   found=true;
    //   for (var i=1; i<=20; i++){
    //     if (count % i !== 0){
    //       found=false;
    //       break;
    //     }
    //   }
    // }

    // console.log("Smallest divisible number: " + count)


    //-- MUCH FASTER WAY with Prime Factorization
    //-- Prepare to have your mind blown
    function primeFactor(number){
      var primeArray = [[1]];
      var leftOver = number;
      for (var i=2; i<=number; i++){
        var factorArray = [];
        while (leftOver % i === 0){
          leftOver = leftOver/i;
          factorArray.push(i);
        }
        primeArray.push(factorArray);
      }
      return primeArray;
    }

    function lcm(start, end){
      var totalArray = Array(end-start+1).fill([]);
      for(var i=start; i<=end; i++){
        var tempPrimes = primeFactor(i);
        for(var j=0; j<tempPrimes.length; j++){
          if (totalArray[j].length<tempPrimes[j].length){
            totalArray[j]=tempPrimes[j];
          }
        }
      }
      var flatArray = _(totalArray).flatten();
      return flatArray.reduce(function (product, element){
        return(product * element);
      });
    }

    console.log("Smallest divisible nubmer: " + lcm(1, 20));
  });



  it("should find the difference between the sum of the squares and the square of the sums", function () {

    function sumSquareDiff(numArray){
      function reduceSum(sum, element){
        return(sum + element);
      }
      function mapSquare(element){
        return Math.pow(element, 2);
      }

      var sumSquare = numArray.map(mapSquare).reduce(reduceSum, 0);
      var squareSum = Math.pow(numArray.reduce(reduceSum, 0), 2);

      return (sumSquare-squareSum);

  };

});

  it("should find the 10001st prime", function () {

    function isPrime(number){
      if (number<2){
        return false;
      } else {
        for (var i=2; i<=Math.sqrt(number); i++){
          if (number % i === 0){
            return false;
          }
        }
        return true;
      }
    }

    var count = 1;
    var num = 1;
    while(count<=10001){
      num++;
      if (isPrime(num)){
        count++;
      }
    }

    console.log("10001 prime is " + num);
  });

});
