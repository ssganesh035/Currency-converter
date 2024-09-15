const BASE_URL= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn= document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");

const dropDowns= document.querySelectorAll(".dropdown select");
for(let select of dropDowns) {
    for(currCode in countryList)
    {
        let newOption= document.createElement("option");
        newOption.innerText= currCode;
        newOption.value= currCode;
        select.append(newOption);
        if(select.name==="from" && currCode==="USD")
            newOption.selected="selected";
        if(select.name==="to" && currCode==="INR")
            newOption.selected="selected";
    }
    select.addEventListener("change", (event)=>{
        updateFlag(event.target);
    })
}

const updateFlag= (elem)=>{
    let currCode= elem.value;
    let countryCode= countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= elem.parentElement.querySelector("img");
    img.src= newSrc;
};

window.addEventListener("load",()=>{
    updateExchangeRate();
});

btn.addEventListener("click", (event)=>{
    event.preventDefault();
    updateExchangeRate();    
});

const updateExchangeRate = async () =>{
    let amount= document.querySelector(".amount input");
    let amountVal= amount.value;
    if(amountVal==="" || amountVal<1)
    {
        amountVal=1;
        amount.value=1;
    }

    console.log(fromCurr.value, "to",toCurr.value);
    const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    const response= await fetch(URL);
    const data= await response.json();
    const rate= data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount= amountVal* rate;
    console.log(finalAmount);
    msg.innerText= `${amountVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;
}