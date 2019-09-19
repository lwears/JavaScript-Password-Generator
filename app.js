
   let words = {};
   let passwordArray = [];

async function getWords() {
   let response = await fetch('https://gist.githubusercontent.com/jesseditson/1e6b2b524814320515ccfe7e2f856eda/raw/17d61fa1e80e14b13c4525b09f84148772586b59/words.json')
   let dict = await response.json();
   return dict.words;
 };

document.addEventListener("DOMContentLoaded", async function(){
   
   words = await getWords();

//    fetch('https://gist.githubusercontent.com/jesseditson/1e6b2b524814320515ccfe7e2f856eda/raw/17d61fa1e80e14b13c4525b09f84148772586b59/words.json')
//    .then(function(response) {
//     return response.json();
//    })
//    .then(function(myJson) {
// 	words = myJson.words; 
//   });
  
  let rangeslider = document.getElementById("sliderRange"); 

   rangeslider.oninput = function() { 
      rangeslider.innerHTML = this.value;
      changePassword(this.value);
   }
   
   rangeslider.onchange = function() { 
      rangeslider.innerHTML = this.value;
      changePassword(this.value);
      } 

   document.getElementById("genPwd").onclick = function() {
      let pwdLength = document.getElementById('pwdLength').value;
      let sliderValue = document.getElementById('sliderRange').value;
      getPassword(pwdLength);
      changePassword(sliderValue);
   };

});


function getPassword(length) {
   console.log(words);
    passwordArray = [];
    for (let j = 0; j < 3; j++) {
        let password = [];
        for (let i = 0; i < length; i++) {
            let item = words[Math.floor(Math.random()*words.length)];
            password.push(item);
        }
        let newPassword = password.join('-');

    document.getElementById( "demo" + j ).textContent = newPassword;
    passwordArray.push(newPassword);
    
    }
    
    return 1;
}

function changePassword (sliderValue) {

    // Should also be in external json
    let letters = {
        "a": "4",
        "e": "3",
        "o": "0",
        "s": "5",
        "l": "1",
        "t": "7",
        "z": "2"
    }

    for (let i = 0; i < 3; i++) {
        let passwordToChange = passwordArray[i];

        letterArray = Object.keys(letters);

        for(let i = 0; i < sliderValue; i++){
            let letter = letterArray[i];
            let replacement = letters[letter];
            passwordToChange = passwordToChange.replace(new RegExp(letter, "g"), replacement)
        }
        document.getElementById( "demo" + i ).textContent = passwordToChange
    }
}


// function changePassword(sliderValue) {
//     // let newPass1;
//     // let newPass2;
//     // let newPass3;
//     // let newPass4;
//     // let newPass5;
//     // let newPass6;
//     for (let i = 0; i < 3; i++) {
//         // need to change this!
//         let passwordToChange = passwordArray[i];
//         //let passToChange = document.getElementById( "demo" + i ).textContent;

//         if (sliderValue == 0) {
//             document.getElementById( "demo" + i ).textContent = passwordArray[i];
//         }
//         if (sliderValue == 1) {
//             newPass1 = passwordToChange.replace(/a/g, '4');
//             document.getElementById( "demo" + i ).textContent = newPass1;
//         }
//         if (sliderValue == 2) {
//             newPass2 = passwordToChange.replace(/e/g, '3')
//                                         .replace(/a/g, '4');
//             document.getElementById( "demo" + i ).textContent = newPass2;
//         }
//         if (sliderValue == 3) {
//             newPass3 = passwordToChange.replace(/l/g, '1')
//                                         .replace(/e/g, '3')
//                                         .replace(/a/g, '4');
//             document.getElementById( "demo" + i ).textContent = newPass3;
//         }
//         if (sliderValue == 4) {
//             newPass4 = passwordToChange.replace(/o/g, '0')
//                                         .replace(/l/g, '1')
//                                         .replace(/e/g, '3')
//                                         .replace(/a/g, '4');
//             document.getElementById( "demo" + i ).textContent = newPass4;
//         }
//         if (sliderValue == 5) {
//             newPass5 = passwordToChange.replace(/s/g, '5')
//                                         .replace(/o/g, '0')
//                                         .replace(/l/g, '1')
//                                         .replace(/e/g, '3')
//                                         .replace(/a/g, '4');
//             document.getElementById( "demo" + i ).textContent = newPass5;
//         }
//         if (sliderValue == 6) {
//             newPass6 = passwordToChange.replace(/t/g, '7')
//                                         .replace(/s/g, '5')
//                                         .replace(/o/g, '0')
//                                         .replace(/l/g, '1')
//                                         .replace(/e/g, '3')
//                                         .replace(/a/g, '4');
//             document.getElementById( "demo" + i ).textContent = newPass6;
//         }
//     }
// }
