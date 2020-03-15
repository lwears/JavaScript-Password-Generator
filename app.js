let words = {};
let passwordArray = [];

async function getWords() {
  const response = await fetch(
    'https://gist.githubusercontent.com/jesseditson/1e6b2b524814320515ccfe7e2f856eda/raw/17d61fa1e80e14b13c4525b09f84148772586b59/words.json',
  );
  const dict = await response.json();
  return dict.words;
}

function genPassword(length) {
  passwordArray = [];
  for (let i = 0; i < 3; i++) {
    const newPassword = [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
    passwordArray.push(newPassword);
    document.getElementById(`pass${i}`).textContent = newPassword;
  }
}

function getPassword(length) {
  passwordArray = [];
  for (let j = 0; j < 3; j++) {
    const password = [];
    for (let i = 0; i < length; i++) {
      const item = words[Math.floor(Math.random() * words.length)];
      password.push(item);
    }
    const newPassword = password.join('-');

    document.getElementById(`pass${j}`).textContent = newPassword;
    passwordArray.push(newPassword);
  }

  return 1;
}

function changePassword(sliderValue) {
  // Should also be in external json
  const letters = {
    a: '4',
    e: '3',
    o: '0',
    s: '5',
    l: '1',
    t: '7',
    z: '2',
  };

  for (let i = 0; i < 3; i++) {
    let passwordToChange = passwordArray[i];
    const letterArray = Object.keys(letters);

    for (let i = 0; i < sliderValue; i++) {
      const letter = letterArray[i];
      const replacement = letters[letter];
      passwordToChange = passwordToChange.replace(new RegExp(letter, 'g'), replacement);
    }
    document.getElementById(`pass${i}`).textContent = passwordToChange;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  words = await getWords();

  const rangeSlider = document.getElementById('rangeSlider');
  const rangeValue = document.getElementById('rangeValue');

  function setRangeValueAndGenPassword() {
    rangeValue.textContent = this.value;
    genPassword(Number(this.value));
  }

  rangeSlider.oninput = () => {
    setRangeValueAndGenPassword.bind(this)();
    rangeValue.textContent = rangeSlider.value;
  };

  rangeSlider.onchange = setRangeValueAndGenPassword;

  // //////// End of Slider for amount of characters

  const sliderRange = document.getElementById('sliderRange');
  const sliderValue = document.getElementById('sliderValue');

  function setSliderValueAndChangePass() {
    sliderValue.textContent = sliderRange.value;
    if (document.getElementById('pass1').textContent) {
      changePassword(this.value);
    }
  }

  sliderRange.oninput = () => {
    setSliderValueAndChangePass.bind(this)();
  };

  sliderRange.onchange = setSliderValueAndChangePass;

  // //////// End of Slider for password length

  document.getElementById('genPwd').onclick = () => {
    const pwdLength = document.getElementById('pwdLength').value;
    const sliderValue = document.getElementById('sliderRange').value;
    getPassword(pwdLength);
    changePassword(sliderValue);
  };

  document.getElementById('genPass').onclick = () => {
    const passLength = document.getElementById('rangeSlider').value;
    genPassword(Number(passLength));
  };
});

// End of DomContentLoaded Function
