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
      // location and data information for the fetch
      let res = await fetch('https://handlers.education.launchcode.org/static/planets.json'); 
      let data = await res.json();

      // setting usage variables for use of the fetched data
      let missTar = document.getElementById("missionTarget");
      let index = Math.floor(Math.random()*data.length);

      // layout information for the fetched planetary data
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
   // fetching planetary information from the fetch command above
   fetchPlanet();

   // setting global variables for the form and following logic
   let form = document.getElementById("launchForm"); 
   let hasNum = /\d/;
   let hasLett = /\D/;

   form.addEventListener("submit", function(event){

      // setting variables from the form that will be filled out
      let pilName = document.querySelector("input[name=pilotName]").value; 
      let coPilName = document.querySelector("input[name=copilotName").value; 
      let fuelLvl = document.querySelector("input[name=fuelLevel").value; 
      let cargoMass = document.querySelector("input[name=cargoMass").value; 
      let launStat = document.getElementById("launchStatus"); 

      // validation that all fields have something within them
      if (pilName === "" || coPilName === "" || fuelLvl === "" || cargoMass === "") {
         alert("All fields are required correctly."); 
         event.preventDefault;
         return;
      }  else if (hasNum.test(pilName)) {
         // validation that the Pilot name field does not contain numbers
         alert("Pilot name field cannot contain numbers."); 
         event.preventDefault;
         return;
      } else if (hasNum.test(coPilName)) {
         // validation that the Co-Pilot name does not contain numbers
         alert("Co-Pilot name field cannot contain numbers."); 
         event.preventDefault;
         return;
      } else if (hasLett.test(fuelLvl)) {
         // validation that the Fuel quantity does not contain letters
         alert("Fuel Level field must be a numeric value only."); 
         event.preventDefault;
         return;
      } else if (hasLett.test(cargoMass)) {
         // validation that the cargo mass does not contain letters
         alert("Cargo Mass field must be a numeric value only."); 
         event.preventDefault;
         return;
      };
      
      // basic structure of launch information to be passed to webpage is successful
      let updatedHtml = `
            <ol>
               <li id="pilotStatus">Pilot ${pilName} Ready</li>
               <li id="copilotStatus">Co-pilot ${coPilName} Ready</li>
               <li id="fuelStatus">Fuel level high enough for launch</li>
               <li id="cargoStatus">Cargo mass low enough for launch</li>
            </ol>
      `
      // assigning variable for webapge information for the launch status
      let faulItem = document.getElementById("faultyItems"); 
      faulItem.innerHTML = updatedHtml;
      event.preventDefault();  

      // validation if sufficient fuel quantity for the "mission"
      if (fuelLvl < 10000){
         faulItem.style.visibility = "visible";
         let fuelStatus = document.querySelector("#fuelStatus"); 
         fuelStatus.innerText = "There's not enough fuel for the journey";
         launStat.innerText = "Shuttle not ready for launch";   
         launStat.style = "color: red";
      } 

      // validtion if too much cargo is loaded for the "mission"
      if(cargoMass > 10000){
         faulItem.style.visibility = "visible"; 
         let cargoStatus = document.querySelector('#cargoStatus'); 
         cargoStatus.innerText = "There's too much in the cargo hold.";
         launStat.innerText = "Shuttle not ready for launch";   
         launStat.style = "color: red";
      } 

      // adding informaiton to confirm "shuttle" is ready for "launch"
      if(fuelLvl >= 10000 && cargoMass <= 10000) {
         faulItem.style.visibility = "visible"; 
         launStat.style = "color: green"; 
         launStat.innerText = "Shuttle is ready for launch"; 
      };
   });  
});  