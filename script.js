function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getTomorrow(){
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

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
    let tomorow = getTomorrow();
    let valuesForTomorow = previews[tomorow];

    let manha = valuesForTomorow.manha;
    let tarde = valuesForTomorow.tarde;
    let noite = valuesForTomorow.noite;

    let local = `${manha.entidade}-${manha.uf}`;
    document.getElementById('local').innerHTML = `${tomorow} em ${local}`;

    let list = document.getElementById('lista');
    list.appendChild(createTemplate(manha, 'manhã'));
    list.appendChild(createTemplate(tarde, 'tarde'));
    list.appendChild(createTemplate(noite, 'noite'));
}

function createTemplate(values, period){

    let li = document.createElement('li');

    let h3 = document.createElement('h3');
    let img = document.createElement('img');
    let desc = document.createElement('small');
    let divTemp = document.createElement('div');
    let divTempInt1 = document.createElement('div');
    let p1Title = document.createElement('p');
    let p1Value = document.createElement('p');
    let divTempInt2 = document.createElement('div');
    let p2Title = document.createElement('p');
    let p2Value = document.createElement('p');
    let divUmidade = document.createElement('div');
    let pUmidadeTitle = document.createElement('p');
    let pUmidadeValue = document.createElement('p');
    
    h3.innerText = period;
    img.src = values.icone;
    desc.innerText = values.resumo;
    divTemp.classList.add('temperatura');
    p1Title.innerText = "Mínima";
    p2Title.innerText = "Máxima";
    p1Value.innerText = `${values.temp_min}°C`;
    p2Value.innerText = `${values.temp_max}°C`;
    pUmidadeTitle.innerText = "Umidade média";
    let umidade = ((values.umidade_max+values.umidade_min)/2).toFixed();    ;
    pUmidadeValue.innerText = `${umidade}%`;

    li.appendChild(h3);
    li.appendChild(img);
    li.appendChild(desc);
    li.appendChild(divTemp);
    li.appendChild(divUmidade);

    divTemp.appendChild(divTempInt1);
    divTemp.appendChild(divTempInt2);

    divTempInt1.appendChild(p1Title);
    divTempInt1.appendChild(p1Value);

    divTempInt2.appendChild(p2Title);
    divTempInt2.appendChild(p2Value);

    divUmidade.appendChild(pUmidadeTitle);
    divUmidade.appendChild(pUmidadeValue);

    return li;
}
