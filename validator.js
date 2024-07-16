
  // The multiplication table
  var d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ];
    // permutation table p
    var p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ];
    // inverse table inv
    var inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];
  
    // converts string or number to an array and inverts it
    function invArray(array) {
      if (Object.prototype.toString.call(array) == "[object Number]") {
        array = String(array);
        console.log(array,"!!!")
      }
      if (Object.prototype.toString.call(array) == "[object String]") {
        array = array.split("").map(Number);
        console.log(array,"!!!")
       
      }
      return array.reverse();
    }
    
    // generates checksum
    function generate_checksum(array) {
      let c = 0;
      let invertedArray = array.reverse();
    
      for (let i = 0; i < invertedArray.length; i++) {
          // console.log(d[c][p[((i + 1) % 8)][invertedArray[i]]])
        c = d[c][p[((i + 1) % 8)][invertedArray[i]]];
  
      }
      return inv[c];
    }
    
    // validates checksum
    function validate(array) {
    
      let c = 0;
      let invertedArray = invArray(array);
    
      for (let i = 0; i < invertedArray.length; i++) {
        c = d[c][p[(i % 8)][invertedArray[i]]];
      }
    
      return (c === 0);
    }
    
    function validateAadhaar(aadhaarString) {
      if (aadhaarString.length != 12) {
        return new Error('Aadhaar numbers should be 12 digit in length');
      }
      if (aadhaarString.match(/[^$,.\d]/)) {
        return new Error('Aadhaar numbers must contain only numbers');
      }
      let aadhaarArray = aadhaarString.split('');
    
      let toCheckChecksum = aadhaarArray.pop();
      
      if (generate_checksum(aadhaarArray) == toCheckChecksum) {
        return true;
      } else {
        return false;
      }
    };
  

  //generate random valid Aadhaar number
  function generateAadhaar(){
    //randomly generated 11 digit number array
    let rand_array = [];
    for(let i = 0; i < 11; i++){
      rand_array[i] = Math.trunc(Math.random() * 10);
    }
    let generated_checksum = generate_checksum(rand_array);
    rand_array = rand_array.reverse();
    rand_array[11] = generated_checksum;
    result_array = rand_array.join("");
    return result_array;
  }

  

  //command-line arguments
  if(process.argv[2] === '-v'){
    let given_aadhaar = process.argv[3];
    let validation_result = validateAadhaar(given_aadhaar);
    console.log(validation_result);
  }
  
  else if(process.argv[2] === '-g'){
    let generated_Aadhaar = generateAadhaar();
    console.log(generated_Aadhaar);
    console.log("validation result: ");
    let validation_result = validateAadhaar(generated_Aadhaar);
    console.log(validation_result);
  }
  
  