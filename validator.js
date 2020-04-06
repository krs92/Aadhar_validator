
  
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
  function generate(array) {
    
    var c = 0;
    var invertedArray = array.reverse();
  
    for (var i = 0; i < invertedArray.length; i++) {
        console.log(d[c][p[((i + 1) % 8)][invertedArray[i]]])
      c = d[c][p[((i + 1) % 8)][invertedArray[i]]];

    }
    return inv[c];
  }
  
  // validates checksum
  function validate(array) {
  
    var c = 0;
    var invertedArray = invArray(array);
  
    for (var i = 0; i < invertedArray.length; i++) {
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
    var aadhaarArray = aadhaarString.split('');
  
    var toCheckChecksum = aadhaarArray.pop();
    
    if (generate(aadhaarArray) == toCheckChecksum) {
      return true;
    } else {
      return false;
    }
  };


 console.log( validateAadhaar("840441719017"))
