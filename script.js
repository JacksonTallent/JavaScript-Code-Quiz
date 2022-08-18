// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Assignment code here
function passwordOptions(){

//Prompts for the options
do {
//options
  var charCount = prompt("How many characters would you like your password to contain?", 16);
  var includeUpper = confirm("Would you like your password to include uppercase letters?");
  var includeLower = confirm("Would you like your password to include lowercase letters?");
  var includeNum = confirm("Would you like your password to contain numbers?");
  var includeSpecial = confirm("Would you like your password to include special characters?");
  var isValid = true;
  
//Verify inputs
  if(charCount < 8 || charCount > 128){isValid = false; alert("The password must be between 8 and 128 characters long.");}
  if(isNaN(charCount)){isValid = false; alert("Please only use numbers when choosing the password length.")}
}while(isValid === false);
 var options = {
  charCount: charCount,
  includeUpper: includeUpper,
  includeLower: includeLower,
  includeNum: includeNum,
  includeSpecial: includeSpecial
 }
return options;
}

function generatePassword() {
  // All possible characters
  var upperA = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  var lowerA = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  var numA = ["0","1","2","3","4","5","6","7","8","9"];
  var specialA = [" ","!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","]","^","_","|","~"];

  var workingA = [];
  var finalA = [];
  var charOptions = passwordOptions();
 //Fills workingA with used characters
  if (charOptions.includeUpper) {
    workingA = workingA.concat(upperA);
  }
  if (charOptions.includeLower) {
    workingA = workingA.concat(lowerA);
  }
  if (charOptions.includeNum) {
    workingA = workingA.concat(numA);
  }
  if (charOptions.includeSpecial) {
    workingA = workingA.concat(specialA);
  }
  //Logs all used characters
  console.log(workingA);
  //Creates the final password
  for (var i = 0; i < charOptions.charCount; i++) {
    finalA.push (workingA[Math.floor(Math.random() * workingA.length)]); 
  //^Adds random characters to finalA
    }
  console.log(finalA)
    return finalA.join("");
  //^Turns finalA into string.
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
