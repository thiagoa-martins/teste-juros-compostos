const form = document.getElementById("form");
const formResult = document.getElementById("formResult");
const buttonSimulate = document.getElementById("simulate");

const inputName = document.forms["form"]["name"];
const inputMonthlyPayment = document.forms["form"]["monthlyPayment"];
const inputInterestRate = document.forms["form"]["interestRate"];
const inputContributionTime = document.forms["form"]["contributionTime"];

let countMonthlyPayment = 0;
let countInterestRate = 0;
let countContributionTime = 0;

inputName.addEventListener("keypress", function (e) {
  const keyCode = e.keyCode ? e.keyCode : e.wich;

  const num = [
    113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 102, 103, 104, 106,
    107, 108, 231, 122, 120, 99, 118, 98, 110, 109, 115, 81, 100, 32, 87, 69,
    82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 199, 90, 88,
    67, 86, 66, 78, 77,
  ];

  let validade = false;

  for (let i = 0; i < num.length; i++) {
    if (keyCode == num[i]) {
      validade = true;
    }
  }

  if (!validade) {
    e.preventDefault();
  }
});

inputMonthlyPayment.addEventListener("keypress", function (e) {
  const keyCode = e.keyCode ? e.keyCode : e.wich;

  if (keyCode > 47 && keyCode < 58) {
    if (countMonthlyPayment < 4) {
      countMonthlyPayment += 1;
    } else {
      e.preventDefault();
    }
  } else {
    e.preventDefault();
  }

  inputMonthlyPayment.addEventListener("keydown", function (e) {
    const keyCode = e.keyCode ? e.keyCode : e.wich;

    if (keyCode == 8 && countMonthlyPayment > 0) {
      countMonthlyPayment -= 1;
    }
  });
});

inputInterestRate.addEventListener("keypress", function (e) {
  const keyCode = e.keyCode ? e.keyCode : e.wich;

  if (keyCode > 47 && keyCode < 58) {
    if (countInterestRate < 4) {
      countInterestRate += 1;
    } else {
      e.preventDefault();
    }
  } else {
    e.preventDefault();
  }

  inputInterestRate.addEventListener("keydown", function (e) {
    const keyCode = e.keyCode ? e.keyCode : e.wich;

    if (keyCode == 8 && countInterestRate > 0) {
      countInterestRate -= 1;
    }
  });
});

inputContributionTime.addEventListener("keypress", function (e) {
  const keyCode = e.keyCode ? e.keyCode : e.wich;

  if (keyCode > 47 && keyCode < 58) {
    if (countContributionTime < 2) {
      countContributionTime += 1;
    } else {
      e.preventDefault();
    }
  } else {
    e.preventDefault();
  }

  inputContributionTime.addEventListener("keydown", function (e) {
    const keyCode = e.keyCode ? e.keyCode : e.wich;

    if (keyCode == 8 && countContributionTime > 0) {
      countContributionTime -= 1;
    }
  });
});

buttonSimulate.addEventListener("click", function () {
  form.onsubmit = (e) => {
    inputName.addEventListener("keyup", function () {
      checkName();
    });

    inputMonthlyPayment.addEventListener("keyup", function () {
      checkInputMonthlyPayment();
    });

    inputInterestRate.addEventListener("keyup", function () {
      checkInputInterestRate();
    });

    inputContributionTime.addEventListener("keyup", function () {
      checkInputContributionTime();
    });

    e.preventDefault();

    let hasError = false;

    function checkName() {
      if (!inputName.value) {
        hasError = true;

        inputName.classList.add("error");

        const label = inputName.nextSibling.nextSibling;

        label.innerText = "Informe o seu nome completo";
      } else {
        inputName.classList.remove("error");

        const label = inputName.nextSibling.nextSibling;

        label.innerText = "";
      }
    }

    function checkInputMonthlyPayment() {
      if (!inputMonthlyPayment.value) {
        hasError = true;

        inputMonthlyPayment.classList.add("error");

        const label = inputMonthlyPayment.nextSibling.nextSibling;

        label.innerText = "Informe a mensalidade";
      } else {
        inputMonthlyPayment.classList.remove("error");

        const label = inputMonthlyPayment.nextSibling.nextSibling;

        label.innerText = "";
      }
    }

    function checkInputInterestRate() {
      if (!inputInterestRate.value) {
        hasError = true;

        inputInterestRate.classList.add("error");

        const label = inputInterestRate.nextSibling.nextSibling;

        label.innerText = "Informe a taxa de juros";
      } else {
        inputInterestRate.classList.remove("error");

        const label = inputInterestRate.nextSibling.nextSibling;

        label.innerText = "";
      }
    }

    function checkInputContributionTime() {
      if (!inputContributionTime.value || inputContributionTime.value < 1) {
        hasError = true;

        inputContributionTime.classList.add("error");

        const label = inputContributionTime.nextSibling.nextSibling;

        label.innerText = "Informe um tempo de contribuição válido";
      } else {
        inputContributionTime.classList.remove("error");

        const label = inputContributionTime.nextSibling.nextSibling;

        label.innerText = "";
      }
    }

    checkName();
    checkInputMonthlyPayment();
    checkInputInterestRate();
    checkInputContributionTime();

    if (!hasError) {
      const configs = {
        method: "POST",
        body: `{ "expr": "${inputMonthlyPayment.value} * (((1 + 0.0${
          inputInterestRate.value
        }) ^ ${inputContributionTime.value * 12} - 1) / 0.0${
          inputInterestRate.value
        })" }`,
      };

      let content = "";

      fetch("https://api.mathjs.org/v4/", configs)
        .then(returnFromAPI)
        .then(displayData);

      function returnFromAPI(response) {
        return response.json();
      }

      function displayData(response) {
        const result = parseFloat(response.result);

        const resultFormatFloat = result.toFixed(2);
        const resultFormatString = resultFormatFloat.replace(".", ",");

        content = `
                    <h1>Ciclic</h1>

                    <fieldset>
                        <label>Olá ${inputName.value},</label>
                        <label>investindo <strong>R$ ${inputMonthlyPayment.value}</strong> todo mês,</label>
                        <label>você terá <strong>R$ ${resultFormatString}</strong> em <strong>${inputContributionTime.value} anos</strong></label>
                        <label> sob uma taxa de juros de <strong>${inputInterestRate.value}%</strong> ao mês.</label>
                    </fieldset>

                    <fieldset>
                        <button id="buttonSimulateAgain">Simular Novamente</button>
                    </fieldset>
                `;

        form.style.display = "none";

        inputName.value = "";
        inputMonthlyPayment.value = "";
        inputInterestRate.value = "";
        inputContributionTime.value = "";

        formResult.classList.add("form");
        formResult.innerHTML = content;

        formResult.style.display = "block";

        const buttonSimulateAgain = document.getElementById(
          "buttonSimulateAgain"
        );

        buttonSimulateAgain.addEventListener("click", function () {
          formResult.style.display = "none";
          form.style.display = "block";
        });
      }
    }
  };
});
