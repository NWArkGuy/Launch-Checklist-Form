// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

fetchPlanet = async() => {
   try{
      let res = await fetch('https://handlers.education.launchcode.org/static/planets.json'); 
      let data = await res.json();
      
      let missTar = document.getElementById("missionTarget");
      let index = Math.floor(Math.random()*data.length);
      
      missTar.innerHTML = `
         <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${data[index].name}</li>
               <li>Diameter: ${data[index].diameter}</li>
               <li>Star: ${data[index].star}</li>
               <li>Distance from Earth: ${data[index].distance}</li>
               <li>Number of Moons: ${data[index].moons}</li>
           </ol>
         <img src="${data[index].image}">`
   } catch(err){ 
         console.log(err); 
   }
};

window.addEventListener("load", () => {
   fetchPlanet();
   
   let form = document.getElementById("launchForm"); 

   form.addEventListener("submit", function(event){

      let pilName = document.querySelector("input[name=pilotName]").value; 
      let coPilName = document.querySelector("input[name=copilotName").value; 
      let fuelLvl = document.querySelector("input[name=fuelLevel").value; 
      let cargoMass = document.querySelector("input[name=cargoMass").value; 
      let launStat = document.getElementById("launchStatus"); 

      if (pilName === "" || coPilName === "" || fuelLvl === "" || cargoMass === "") {
         alert("All fields are required"); 
         event.preventDefault;
         return;
      };

      if (pilName != "Chris" || pilName != "Blake") {
         alert("Pilot name field has incorrect information."); 
         event.preventDefault;
         return;
      };

      if (coPilName != "Chris" || coPilName != "Blake") {
         alert("Co-Pilot name field has incorrect information."); 
         event.preventDefault;
         return;
      };

      if (isNaN(fuelLvl)) {
         alert("Fuel Level field has incorrect information."); 
         event.preventDefault;
         return;
      };

      if (isNaN(cargoMass)) {
         alert("Cargo Mass field has incorrect information."); 
         event.preventDefault;
         return;
      };

      let updatedHtml = `
            <ol>
               <li id="pilotStatus">Pilot ${pilName} Ready</li>
               <li id="copilotStatus">Co-pilot ${coPilName} Ready</li>
               <li id="fuelStatus">Fuel level high enough for launch</li>
               <li id="cargoStatus">Cargo mass low enough for launch</li>
            </ol>
      `

      let faulItem = document.getElementById("faultyItems"); 
      faulItem.innerHTML = updatedHtml;
      event.preventDefault();  
     
      if (fuelLvl < 10000){
         faulItem.style.visibility = "visible";
         let fuelStatus = document.querySelector("#fuelStatus"); 
         fuelStatus.innerText = "There's not enough fuel for the journey";
         launStat.innerText = "Shuttle not ready for launch";   
         launStat.style = "color: red";
      } 
   
      if(cargoMass > 10000){
         faulItem.style.visibility = "visible"; 
         let cargoStatus = document.querySelector('#cargoStatus'); 
         cargoStatus.innerText = "There's too much in the cargo hold.";
         launStat.innerText = "Shuttle not ready for launch";   
         launStat.style = "color: red";
      } 
   
      if(fuelLvl > 10000 && cargoMass < 10000) {
         faulItem.style.visibility = "visible"; 
         launStat.style = "color: green"; 
         launStat.innerText = "Shuttle is ready for launch"; 
      };

   });  
}); 