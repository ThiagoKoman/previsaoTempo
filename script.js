function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getWeekDay(){
    let weekDayArr = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira", "Sábado"];
    let currentDate = new Date();

    let weekDayNum = currentDate.getDay();

    return weekDayArr[weekDayNum];
}
function getToday(){
    let currentDate = new Date();
    //currentDate.setDate(currentDate.getDate() + 1);

    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    return `${formatDayOrMonth(day)}/${formatDayOrMonth(month)}/${year}`;
}

function formatDayOrMonth(n){
    if(n<10){
        return '0'+n;
    }else{
        return n;
    }
}

let code = getParameterByName('geocode') || 4106902;
fetch(`https://apiprevmet3.inmet.gov.br/previsao/${code}`)
.then(T => T.json())
.then(function(result){
    createView(result);
})

function createView(obj){
    let previews = obj[code];  
  
    let today = getToday();
    let weekDay = getWeekDay();

    let valuesForToday = previews[today];
    let manha = valuesForToday.manha;
    console.log(manha)

    let city = manha.entidade;
    
    let humity = parseInt((manha.umidade_max+manha.umidade_min)/2);

    let tempMax = manha.temp_max;
    let tempMin = manha.temp_min;

    let condition = manha.resumo;

    let temp = parseInt(tempMax-((tempMax - tempMin)/2));

    document.getElementById('data-city').innerHTML = city;
    document.getElementById('data-weekday').innerHTML = weekDay;
    document.getElementById('data-date').innerHTML = today;
    document.getElementById('data-humidity').innerHTML = humity+"%";
    document.getElementById('data-temperature').innerHTML = temp + "°C";
    document.getElementById('data-condition').innerHTML = condition;
    document.getElementById('data-minimum').innerHTML = tempMin;
    document.getElementById('data-maximum').innerHTML = tempMax;
    
}

