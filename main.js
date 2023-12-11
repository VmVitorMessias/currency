const buttonConvert = document.getElementById('convert-button');
const selectToConvert = document.getElementById('select-to-convert');

const actionConvert = async () => {
    const inputCurrency = document.getElementById('input-currency');
    const toConvert = document.getElementById('to-convert');
    const converted = document.getElementById('converted');

    const data = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL').then(response => {
        return response.json();
    })
    const dolarToday = data.USDBRL.high;
    const euroToday = data.EURBRL.high;

    let convertedValue;

    toConvert.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(inputCurrency.value);

    if (selectToConvert.value === 'dolar') {
        convertedValue = inputCurrency.value / dolarToday;
        const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(convertedValue);
        converted.innerHTML = formattedValue;

    } else if (selectToConvert.value === 'euro') {
        convertedValue = inputCurrency.value / euroToday;
        const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
        }).format(convertedValue);
        converted.innerHTML = formattedValue;
    }
}

const changeAction = () => {
    const imageCurrency = document.getElementById('image-currency');
    const currencyName = document.getElementById('currency-name');

    if (selectToConvert.value === 'dolar') {
        currencyName.innerHTML = 'Dolar';
        imageCurrency.src = 'assets/dolar.png';
    }

    if (selectToConvert.value === 'euro') {
        currencyName.innerHTML = 'Euro';
        imageCurrency.src = 'assets/euro.png';
    }

    actionConvert();
}

selectToConvert.addEventListener('change', changeAction);
buttonConvert.addEventListener('click', actionConvert);