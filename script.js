    const apiKEY = 'at_ew8uPXuxzHtfImgitIPoMm0Par76V';
    const apiURL ='https://geo.ipify.org/api/v1?apiKey=';
    const getIpUrl='https://api.ipify.org/?format=json';
    //informations
    const ipAddr = document.getElementById('ipAddr');
    const town = document.getElementById('town');
    const timezone = document.getElementById('timezone');
    const isp = document.getElementById('isp');

    let longitude =''
    let latitude =''
    //search
    const searchIp = document.getElementById('searchIp');
    const searchBtn = document.getElementById('searchBtn');

    let searchIpData ='';
    let mymap = null;

  // fetching ip adress and information
  async function getIp(ipUrl){

    // verify if the clients is just arrived or searching
    if(searchIp.value==''){
      let response = await fetch(ipUrl);

      if(!response.ok){
        console.log('erreur')
      }
      response = await response.json();
      searchIpData = response.ip;
    }

    searchBtn.addEventListener("click", function() {
      searchIpData=searchIp.value;
      getIp(searchIp.value);
    });

   
    //Update informations
    let request = await fetch(apiURL+apiKEY+'&ipAddress='+searchIpData);
    if(!request.ok){
      console.log("erreur lors de l'obtention de vos informations")
    }
    request = await request.json();
    ipAddr.textContent= request.ip;
    isp.textContent=request.isp;
    town.textContent= request.location.region +', '+request.location.country;
    timezone.textContent= request.location.timezone ;
    latitude=request.location.lat;
    longitude=request.location.lng;

    //erase and replace the map
    if (mymap !== undefined && mymap !== null) {
      mymap.remove();
    }
    refreshMap();

  }
  
  function refreshMap(){

    mymap = L.map('mapid').setView([latitude, longitude], 10);
  
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 10,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(mymap);
  }

 getIp(getIpUrl)

 server.listen(3000, () => {
   console.log('server listening');
 })