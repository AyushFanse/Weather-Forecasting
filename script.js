let searchButton = document.getElementById('searchButton');
let searchInput = document.getElementById('search');
let displayData = document.querySelector('.cardContaint');


const FetchingDataFromUrl = async (object)=>{
    displayData.innerHTML="";
    let processingData ="";
    
    let fetchingWeatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=08d082b236fd458698d125650210612&q=${object}&aqi=no`)
                                    .catch(error => console.error(error));
    let gettingWeatherData = await fetchingWeatherData.json()
                                    .catch(error => console.error(error));
    console.log(gettingWeatherData);

    //Time And Date
    let DateNow = new Date(Date.now());
    let LiveDateAndTime ="";
    const AmPm= DateNow.getHours()>12 ? "PM" : "AM";
    LiveDateAndTime += DateNow.getDate()+ '/'+DateNow.getMonth()+ '/'+ DateNow.getFullYear() + ' '+DateNow.getHours()+':'+DateNow.getMinutes() + " " + AmPm;
    if(searchInput.value==""){
        let defaultData=
                        `
                            <div class="card-body">
                            <h5 class="card-title font ml-3">Welcome to Weather Foracasting</h5>
                            <hr>
                            <span>
                                <h4 class="selectedFont">It&#39s a beautiful Day...</h4>
                                <span class="d-flex justify-content-center"><img class="weatherImgError" src="Weather.png" alt="Weather.png"></span>
                            </span>                            
                            </div>
                        `;
        processingData=document.createElement('div');
        processingData.setAttribute('class','card wrong');
        processingData.setAttribute('id','wrong');
        processingData.innerHTML= defaultData;
        displayData.append(processingData);
    }else{
        if(gettingWeatherData.current==null){
        let wrongData=
                        `
                            <div class="card-body">
                            <h5 class="card-title font ml-3">Welcome to Weather Foracasting</h5>
                            <hr>
                            <span>
                                <h5 class="selectedFont">Please Enter Valide Data...</h5>
                                <span class="d-flex justify-content-center"><img class="weatherImgError" src="Weather.png" alt="Weather.png"></span>
                            </span>                            
                            </div>
                        `;
        processingData=document.createElement('div');

        processingData.setAttribute('class','card');
        processingData.setAttribute('id','wrong');
        processingData.innerHTML= wrongData;
        displayData.append(processingData);
        }
        else{
            let tempMood =gettingWeatherData.current.condition.text;
            let icon ="";
            let DayNight = "";
            if(gettingWeatherData.current.is_day==1){
                DayNight = "Day";
            }else{
                DayNight = "Night";
            }

            
            if(tempMood==="Clear"){
                icon= "<i class='fas fa-cloud-sun shadow' style='color: #eccc68;'></i>";
            }else if(tempMood==="Clouds"){
                icon= "<i class='fas fa-cloud shadow' style='color: #f1f2f6;'></i>";
            }else if(tempMood==="rain"){
                icon= "<i class='fas fa-cloud-showers-heavy shadow' style='color: #5c8492;'></i>";
            }else if(tempMood==="Light Rain"){
                icon= "<i class='fas fa-cloud-rain shadow' style='color: #86d1eb;'></i>";
            }else if(tempMood==="Partly cloudy"){
                icon= "<i class='fas fa-cloud shadow' style='color:#79888d;'></i>";
            }else if(tempMood==="Mist" || tempMood==="Haze"){
                icon= "<i class='fas fa-wind shadow' style='color: #d0d5d7;'></i>";
            }else if(tempMood==="Sunny"){
                icon= "<i class='fas fa-sun shadow' style='color:#eccc68;'></i>";
            }else{
                icon= "<i class='fas fa-cloud-sun shadow' style='color: #eccc68;'></i>";
            }
            
            let gettingData=
                            `
                            <div class="card-body">
                                <h4 class="card-title place font">${gettingWeatherData.location.name}<span class="country font">, ${gettingWeatherData.location.country}</span></h4>
                                    <hr>
                                    <div class="row tempData">
                                        <span class="col-7 degree mt-2 d-flex justify-content-center"><span class="mt-2 font">${gettingWeatherData.current.temp_c}°C &nbsp; </span></span> 
                                        <span class="col-5">
                                            <span>
                                                <span class="img">${icon}</span>
                                                <span><h5 class="dis p-1 font">${gettingWeatherData.current.condition.text}</h5></span>
                                            </span>
                                    </div>
                                    <hr>
                                <div class="row" id="time"><h6 class="col-4 ml-2 selectedFont"> Live Time :&nbsp;</h6><h6 class="col-7 selectedFont d-flex justify-content-end">${gettingWeatherData.current.last_updated} ${DayNight}</h6></div>
                            </div>
                        `;
            processingData=document.createElement('div');
            processingData.setAttribute('class','card');
            processingData.setAttribute('id','card');
            processingData.innerHTML= gettingData;
            displayData.append(processingData);
}   }   }

searchButton.addEventListener('click', () => {
    FetchingDataFromUrl(searchInput.value);
}   );


FetchingDataFromUrl();
