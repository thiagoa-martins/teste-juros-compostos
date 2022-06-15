const form = document.getElementById("form");
const buttonSimulate = document.getElementById("simulate");

const inputName = document.forms["form"]["name"];
const inputMonthlyPayment = document.forms["form"]["monthlyPayment"];
const inputInterestRate = document.forms["form"]["interestRate"];
const inputContributionTime = document.forms["form"]["contributionTime"];

let countCommaX = 0;
let countCommaY = 0;

inputMonthlyPayment.addEventListener("keypress", function(e) {

    const keyCode = (e.keyCode ? e.keyCode : e.wich);

    if((keyCode > 47 && keyCode < 58) || (keyCode == 44)) {

        if(keyCode == 44) {
    
            if(countCommaX == 0) {
                countCommaX += 1;
            } else {
                e.preventDefault();
            }    
        }
    } else {
        e.preventDefault();
    }

    inputMonthlyPayment.addEventListener("keydown", function(e) {

        const keyCode = (e.keyCode ? e.keyCode : e.wich);

        if(keyCode == 8 && countCommaX == 1) {
            countCommaX -= countCommaX;
        }
    });
});

inputInterestRate.addEventListener("keypress", function(e) {

    const keyCode = (e.keyCode ? e.keyCode : e.wich);

    if((keyCode > 47 && keyCode < 58) || (keyCode == 44)) {

        if(keyCode == 44) {
    
            if(countCommaY == 0) {
                countCommaY += 1;
            } else {
                e.preventDefault();
            }    
        }
    } else {
        e.preventDefault();
    }

    inputInterestRate.addEventListener("keydown", function(e) {

        const keyCode = (e.keyCode ? e.keyCode : e.wich);

        if(keyCode == 8 && countCommaY == 1) {
            countCommaY -= countCommaY;
        }
    });
});

buttonSimulate.addEventListener("click", function() {

    form.onsubmit = (e) => {

        inputName.addEventListener("keyup", function() {
            checkName();
        });


        inputMonthlyPayment.addEventListener("keyup", function() {
            checkInputMonthlyPayment();
        });


        inputInterestRate.addEventListener("keyup", function() {
            checkInputInterestRate();
        });

        inputContributionTime.addEventListener("keyup", function() {
            checkInputContributionTime();
        });

        e.preventDefault();

        let hasError = false;

        function checkName() {

            if(!inputName.value) {

                hasError = true;
    
                inputName.classList.add("error");
    
                const label = inputName.nextSibling.nextSibling;
        
                label.innerText = "Informe o seu Nome Completo";
        
            } else {
                inputName.classList.remove("error");
    
                const label = inputName.nextSibling.nextSibling;
        
                label.innerText = "";
            }
        }

        function checkInputMonthlyPayment() {

            if(!inputMonthlyPayment.value) {

                hasError = true;
    
                inputMonthlyPayment.classList.add("error");
    
                const label = inputMonthlyPayment.nextSibling.nextSibling;
        
                label.innerText = "Informe a Mensalidade";
        
            } else {
                inputMonthlyPayment.classList.remove("error");
    
                const label = inputMonthlyPayment.nextSibling.nextSibling;
        
                label.innerText = "";
            }
        }

        function checkInputInterestRate() {

            if(!inputInterestRate.value) {

                hasError = true;

                inputInterestRate.classList.add("error");

                const label = inputInterestRate.nextSibling.nextSibling;
        
                label.innerText = "Informe a Taxa de Juros";
        
            } else {
                inputInterestRate.classList.remove("error");

                const label = inputInterestRate.nextSibling.nextSibling;
        
                label.innerText = "";
            }
        }

        function checkInputContributionTime() {

            if(!inputContributionTime.value || inputContributionTime.value < 1) {

                hasError = true;
    
                inputContributionTime.classList.add("error");
    
                const label = inputContributionTime.nextSibling.nextSibling;
        
                label.innerText = "Informe um Tempo de Contribuição válido";
        
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

        

        if(!hasError) {

            const valueMonthlyPayment = inputMonthlyPayment.value;
            
            const valueMonthlyPaymentFormat = valueMonthlyPayment.replace(",", "");

            const valueInputInterestRate = inputInterestRate.value;

            const valueInputInterestRateFormat = valueInputInterestRate.replace(",", "");

            const configs = {
                method: "POST",
                body: `{ "expr": "${valueMonthlyPaymentFormat} * (((1 + 0.0${valueInputInterestRateFormat}) ^ ${inputContributionTime.value * 12} - 1) / 0.0${valueInputInterestRateFormat})" }`
            }

            fetch("http://api.mathjs.org/v4/", configs);
        }


        
    } 
});