const form = document.getElementById("form");
const buttonSimulate = document.getElementById("simulate");

const inputName = document.forms["form"]["name"];
const inputMonthlyPayment = document.forms["form"]["monthlyPayment"];
const inputInterestRate = document.forms["form"]["interestRate"];
const inputContributionTime = document.forms["form"]["contributionTime"];

const structure = `{ "expr": "${inputMonthlyPayment.value} * (((1 + ${inputInterestRate.value}) ^ (${inputContributionTime.value * 12}) - 1) / 0.00517)" }`;

let countComma = 0;

inputInterestRate.addEventListener("keypress", function(e) {

    const keyCode = (e.keyCode ? e.keyCode : e.wich);

    console.log(keyCode)
    console.log(e)
    // 44 = "," 46 = "." Números = 48 ao 57
 

    if((keyCode > 47 && keyCode < 58) || (keyCode == 44)) {

        if(keyCode == 44) {
    
            if(countComma == 0) {
                countComma += 1;
            } else {
                e.preventDefault();
            }    
        }
    } else {
        e.preventDefault();
    }

    inputInterestRate.addEventListener("keydown", function(e) {
        const keyCode = (e.keyCode ? e.keyCode : e.wich);

        console.log(keyCode)
        console.log(e)

        if(keyCode == 8) {

            if(countComma == 1) {
                countComma -= 1;
            }
        }
    });
});



