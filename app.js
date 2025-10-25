// Wait for the page to finish load
document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("SearchForm");
    const results = document.getElementById("result");

    function fetch_Superheroes(seacrhData=""){

        // Sanitize user input
        const userInput = seacrhData.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();

        fetch("superheroes.php?query=" + encodeURIComponent(userInput))   // AJAX request
            .then(response => response.json())
            .then(data => {

                if(Array.isArray(data)){
                    let htmlContent = "<ul>";
                    data.forEach(superhero =>{
                        htmlContent += `<li>${superhero.alias}</li>`;
                    });
                    htmlContent +="</ul>";  
                    results.innerHTML= htmlContent;
                }

                // If a single superhero is searched
                else if(data && data.alias){
                    results.innerHTML = `
                        <h3>${data.alias}</h3>
                        <h4>A.K.A ${data.name}</h4>
                        <p>${data.biography}</p>
                    `;
                }     
                else{
                    results.innerHTML = `<p class="not-found">Superhero not found</p>`;  // If no superhero is found
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Error in fetching Superheroes.");   // Error alert message
            });
    }    

    // Fetch Superheroes
    fetch_Superheroes();

    // When the Search Button is clicked
    form.addEventListener("submit", function(event){
        event.preventDefault();  // prevent page from reloading
        const seacrhData = document.getElementById('search').value;
        fetch_Superheroes(seacrhData);
    });      

});