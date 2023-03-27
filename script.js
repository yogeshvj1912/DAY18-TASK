let row = document.getElementById("row");

let obj=[];
let data = [];
let weatherData=[]

fetch('https://restcountries.com/v2/all')
    .then((response) => response.json())
    .then((res) => {
     data = res;
     
console.log(data.length);

for(let i=0;i<data.length;i++) {
    let restData={} 
    restData['name']=data[i].name;
    restData['capital']=data[i].capital;
    restData['region']=data[i].region;
    restData['flags']=data[i].flag;
    restData['countryCode']=data[i].alpha3Code;
    restData['latlng']=data[i].latlng;
obj.push(restData);   }
   console.log(obj)
   updateData(obj);
})
  .catch((error) => {
console.error('Data Fetching Error:', error);
});
   
   
 function updateData(obj){
    
    for(let i=0;i<obj.length;i++){
        const country=obj[i];

  let cols=document.createElement("div");
        cols.setAttribute("class","col-lg-4 col-sm-12");
        
    let card  = document.createElement("div");
        card.setAttribute("class","card");
        cols.append(card)

                //heading-country name//

    let header = document.createElement("div");
        header.setAttribute("class","card-header");
    
    let h4 = document.createElement("h5")
        h4.setAttribute("class","heading")
        
        header.append(h4)

                  //image box//

    let imgDiv = document.createElement("div");
        imgDiv.setAttribute("class","imgDiv"); 
    
    let img =document.createElement("img");
        img.setAttribute("class","col-sm-12")
        imgDiv.append(img)

                 //content of the body//

    let cardBody = document.createElement("div");
        cardBody.setAttribute("class","card-body");
    let capital = document.createElement("p");
        
    let region = document.createElement("p");
        
    let countrycode = document.createElement("p");
               //click weather button//
    let buttonDiv= document.createElement("div")
        buttonDiv.setAttribute("class","buttonDiv")
        
    let button = document.createElement("button");
        button.setAttribute("type","submit");
        button.setAttribute("class","btn btn-primary btn-sm");
        button.onclick= function openPopup(){
        
            ftn(latlng,i);
            popup.classList.add("open-popup");
        
        } 

           // popup box//
        let popup=document.createElement("div");
        popup.setAttribute("class","popup");
               //weather data box//
    let blur=document.createElement("div");
        blur.setAttribute("class","blur")
        p1=document.createElement("p");
        p1.setAttribute("id",`p1${i}`)
        p1.setAttribute("class","p1")
        
    
    let close=document.createElement("button");
        close.setAttribute("type","button");
        close.onclick=function closePopup(){
            popup.classList.remove("open-popup");
        }
        close.innerText="X";
        
        blur.append(close,p1); 
        popup.append(blur)
        buttonDiv.append(button,popup);
        cardBody.append(capital,region,countrycode,buttonDiv);
        card.append(header,imgDiv,cardBody);
        cols.append(card);
        row.append(cols);

        h4.innerText=country.name   
        img.src=country.flags;
        console.log(country)
        capital.innerText=`capital:${country.capital}`
        region.innerText=`region:${country.region}`
        countrycode.innerText=`country code:${country.countryCode}`
        button.innerText = "Click for Weather" 
       let latlng=country.latlng;
    }
}

function ftn(input,i) {
    let latitude = input[0];
    let longitude = input[1];
    console.log(latitude,longitude);
    getWeather(latitude,longitude,i);
  }
      //weather api call//

  function getWeather(lat,long,i) {
      const latitude = lat;
      const longitude = long;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8058f39594374fc2f6966bcad02c65df`
  fetch(url)
        .then(response => response.json())
        .then(data => {
  console.log(data);
   if(data<length==0){
weatherData.push(data)
   }
  
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const p1 = document.getElementById(`p1${i}`);
      
  p1.innerHTML += `Temperature : ${temperature}&deg;C <br> Humidity : ${humidity}&percnt<br> Description : ${description}`;
  })
  .catch(error => console.log("Error", error));  
  }