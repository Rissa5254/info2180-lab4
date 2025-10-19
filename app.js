// Wait for the page to finish load
document.addEventListener("DOMContentLoaded", function(){
    const Searchbtn = document.getElementById("btn");

    // When the Search Button is clicked
    Searchbtn.addEventListener("click", function(){
        fetch("superheroes.php")   // AJAX request
        .then(response => response.text())
        .then(data => {
            alert(data);   // Show result as an alert
        })
        .catch(error => {
           console.error("Error:", error);
            alert("Error in fetching Superheroes.");   // Error alert message
        });
    });
});
        


