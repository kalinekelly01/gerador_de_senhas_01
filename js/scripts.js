// Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");
const openCloseGeneratorButton = document.querySelector("#open-generate-password");
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

// Funções
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
    const symbols = "(){}=<>/,.!@#$&%*+-_";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatedPassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {

    let passaword = "";

    const passawordLegth = +lengthInput.value;

    const generators = [ ];

    if(lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase)
    }

    if(numbersInput.checked) {
        generators.push(getNumber);
    }

    if(symbolsInput.checked) {
        generators.push(getSymbol);
    }

    if(generators.length === 0) {
        return;
    }

    for(i = 0; i < passawordLegth; i = i + generators.length) {
       generators.forEach(() => {
        const randomValue = generators[Math.floor(Math.random() * generators.length)]();
        passaword += randomValue;
       });
    
    }
    passaword = passaword.slice(0, passawordLegth);

    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = passaword;
};


// Eventos
generatePasswordButton.addEventListener("click", (e) => {
    e.preventDefault();

   generatedPassword (getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
);
});

openCloseGeneratorButton.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});


copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();

    const passaword = generatedPasswordElement.querySelector("h4").innerText;
   
    navigator.clipboard.writeText(passaword).then(() => {
    copyPasswordButton.innerText = "Senha copiada com sucesso!";

    setTimeout(() => {
        copyPasswordButton.innerText = "Copiar";
    }, 1000);
    });
});