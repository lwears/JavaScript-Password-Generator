const state = {
  words: {},
  passwordArray: [],
};

const UPPERCASE_CHAR_CODES = generateArray(65, 90);
const LOWERCASE_CHAR_CODES = generateArray(97, 122);
const NUMBER_CHAR_CODES = generateArray(48, 57);
const SYMBOL_CHAR_CODES = generateArray(33, 47)
  .concat(generateArray(58, 64))
  .concat(generateArray(91, 96))
  .concat(generateArray(123, 126));

// Getting Elements

const includeUppercaseElement = document.getElementById('includeUppercase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');
const form = document.getElementById('passwordGeneratorForm');
const passphraseSettings = document.getElementById('passphraseSettings');
const passwordSettings = document.getElementById('passwordSettings');
const passPhraseRadio = document.getElementById('passPhrase');
const pwdCharAmount = document.getElementById('pwdCharAmount');
const pwdAlphaAmount = document.getElementById('pwdAlphaAmount');
const pwdCharAmountNumber = document.getElementById('pwdCharAmountNumber');
const pwdAlphaAmountNumber = document.getElementById('pwdAlphaAmountNumber');
const passTypeFieldSet = document.getElementById('pass-type-fieldset');

// Helper Functions

async function getWords() {
  const response = await fetch(
    'https://gist.githubusercontent.com/jesseditson/1e6b2b524814320515ccfe7e2f856eda/raw/17d61fa1e80e14b13c4525b09f84148772586b59/words.json'
  );
  const dict = await response.json();
  return dict.words;
}

function generatePassword(length, uppercase, numbers, symbols) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (numbers.checked) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  if (uppercase.checked) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (symbols.checked) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  const passwords = [];
  for (let i = 0; i < 3; i += 1) {
    const newPassword = [...Array(length)]
      .map(() =>
        String.fromCharCode(
          charCodes[Math.floor(Math.random() * charCodes.length)]
        )
      )
      .join('');
    passwords.push(newPassword);
  }
  return passwords;
}

function genPassPhrase(length) {
  const passPhrases = [];
  for (let j = 0; j < 3; j += 1) {
    const password = [];
    for (let i = 0; i < length; i += 1) {
      const item = state.words[Math.floor(Math.random() * state.words.length)];
      password.push(item);
    }
    passPhrases.push(password.join('-'));
  }
  return passPhrases;
}

function changePassword(sliderValue, currentPasswordArray) {
  const letters = {
    a: '4',
    e: '3',
    o: '0',
    s: '5',
    l: '1',
    t: '7',
    z: '2',
  };

  const letterArray = Object.keys(letters);

  return currentPasswordArray.map((pwd) => {
    let newPWD = pwd;
    for (let i = 0; i < sliderValue; i += 1) {
      const letter = letterArray[i];
      const replacement = letters[letter];
      newPWD = newPWD.replace(new RegExp(letter, 'g'), replacement);
    }
    return newPWD;
  });
}

function generateArray(low, high) {
  const array = [];
  for (let i = low; i < high; i += 1) {
    array.push(i);
  }
  return array;
}

function clearState() {
  state.passwordArray = [];
}

function syncCharAmount(e) {
  const { value } = e.target;
  pwdCharAmountNumber.value = value;
  pwdCharAmount.value = value;
}

function syncAlphaAmount(e) {
  const { value } = e.target;
  pwdAlphaAmountNumber.value = value;
  pwdAlphaAmount.value = value;
}

function copyText(pid) {
  const textToCopy = document.getElementById(pid).innerHTML;
  const temp = document.createElement('INPUT');
  temp.value = textToCopy;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  temp.remove();
  alert('Text Copied!');
}

function ShowCorrectSettings() {
  if (passPhraseRadio.checked) {
    passwordSettings.classList.add('is-hidden');
    passphraseSettings.classList.remove('is-hidden');
  } else {
    passwordSettings.classList.remove('is-hidden');
    passphraseSettings.classList.add('is-hidden');
  }
}

// Template & Rendering

const buildPwdList = (pwd, id) => `
  <div class="pwd-item">
    <p id="pass${id}" class="password">${pwd}</p>
    <button class="button copy-button" onclick="copyText('pass${id}')">Copy text</button>
  </div>
`;

const template = (currentState) =>
  currentState.passwordArray
    .map((pwd, index) => buildPwdList(pwd, index))
    .join('');

const render = (htmlString, element) => {
  const updateElement = element;
  updateElement.innerHTML = htmlString;
};

// Event Listeners

window.onload = async () => {
  state.words = await getWords();
};

passTypeFieldSet.addEventListener('change', ShowCorrectSettings);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (passPhraseRadio.checked) {
    const passPhraseLength = document.getElementById('ppWordAmount').value;
    const newPassPhrases = genPassPhrase(passPhraseLength);
    state.passwordArray = changePassword(pwdAlphaAmount.value, newPassPhrases);
  } else {
    state.passwordArray = generatePassword(
      Number(pwdCharAmount.value),
      includeUppercaseElement,
      includeNumbersElement,
      includeSymbolsElement
    );
  }
  window.dispatchEvent(new Event('statechange'));
});

pwdCharAmountNumber.addEventListener('input', syncCharAmount);
pwdAlphaAmountNumber.addEventListener('input', syncAlphaAmount);

pwdCharAmount.addEventListener('input', (e) => {
  syncCharAmount(e);
  if (document.getElementById('pass1').textContent) {
    state.passwordArray = generatePassword(
      Number(pwdCharAmount.value),
      includeUppercaseElement,
      includeNumbersElement,
      includeSymbolsElement
    );
  }
  window.dispatchEvent(new Event('statechange'));
});

pwdAlphaAmount.addEventListener('input', (e) => {
  syncAlphaAmount(e);
  if (document.getElementById('pass1').textContent) {
    state.passwordArray = changePassword(
      pwdAlphaAmount.value,
      state.passwordArray
    );
  }
  window.dispatchEvent(new Event('statechange'));
});

window.addEventListener('statechange', () => {
  render(template(state), document.querySelector('#password-options'));
});
