// qaida function when window or page loads
function qaida(){

    // folder path as string to be able to concatonate the individual mp3 file names
    let folder = "audio/";
    // Extension as string to be able to concatonate the individual mp3 file names
    let ext = ".mp3";
    // Set empty sound variable to use throughout the code
    let sound;
    // Setting the Audio Object
    sound = new Audio();
    // Get current number element
    let currentPageNumber = document.querySelector('#current');
    // Get all the pages to be displayed
    let itemsList = document.querySelectorAll('.letters');
    let itemsListInner = document.querySelectorAll('.sect');
    // Get the next or next page element
    let next = document.querySelector('#next');
    // Get the previous or previous page element
    let prev = document.querySelector('#prev');
    // Create new XMLHttpRequest request
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        // If server status was ok
        if(this.readyState == 4 && this.status == 200){

            // parsing the json data from the json file as an object
            let response = JSON.parse(xhttp.responseText);

            // Get property values of the keys in an array
            let obj = Object.values(response);
            
            /*Set a variable with the value of 0 to use to iterate over pages, to display current
            page number, iterate current index of page divs or obj variable arrays*/
            let current = 0;

            // set empty variable for use multiple times for current page number content
            let currentNumber;
            let output;
            let outputTwo;
            let outputThree;

            /* Rest or clear the page when this function is called intended when new page loads
            just before the new content is loaded*/
            function reset(){
                // Loop through all the page divs
                for(let i = 0; i < itemsList.length; i++){
                    // Set each page div to not display
                    itemsList[i].style.display = 'none';    
                }
                // Set output to empty string to clear content
                output = '';
                outputTwo = '';
                outputThree = '';
            }

            // Set the first page to be displayed when windows loaded
            function startQaida(){
                // reset the page to clear first
                reset();
                // Set the first page div to display
                itemsList[0].style.display = 'block';
                // Set current variable to first page or pages out of 40 which is the total divs
                currentNumber = current+'/40';
                // Set inner html of the current number vriable to display for first page
                currentPageNumber.innerHTML = currentNumber;
                // Loop through json object reponse with the first index values length or letterspage1
                for(let i = 0;i<obj[0].length;i++){
                    /* append current content of the letterspage1 first values first name of the Arabic
                    letter as an id and the first image or image path to be displayed*/
                    output += '<li id="'+obj[0][i].name+'"class="col-2">'+'<img src="'+obj[0][i].image+'">'+'</li>';
                    // Output above in the first page div
                    itemsList[0].innerHTML = output;
                } 
            }//--closing brace startQaida()

            /* Set previous page function to be used when its called and display content each time
            going to previous page*/
            function previousPage(){
                // Reset or clear the page of any content everytime the previous page is called or loaded
                reset();
                // Iterate of previous page or page divs indexes to be displayed by minus 1
                itemsList[current - 1].style.display = 'block';
                // Iterate to current page number by minus 1
                currentNumber = current-1+'/40';
                // Set the current page number to be displayed
                currentPageNumber.innerHTML = currentNumber;
                // Loop the current object index minus one to get the previous index 
                for(let i = 0;i<obj[current - 1].length;i++){
                    // display the current object index minus one properties of name and image everytime going to previous each time
                    output += '<li id="'+obj[current - 1][i].name+'"class="col-2">'+'<img src="'+obj[current - 1][i].image+'">'+'</li>';
                    // Output or display in page divs by minus one each time going to previous
                    itemsList[current - 1].innerHTML = output;
                } 
                // 
                current--;
            }//--Closing brace previousPage()

            /* Set next page function to be used when its called and display content each time
            going to next page*/
            function nextPage(){
                // Reset or clear the page of any content everytime the next page is called or loaded
                reset();
                // Iterate of next page or page divs indexes to be displayed by adding 1 each time
                itemsList[current + 1].style.display = 'block';
                // Iterate to current page number by adding 1
                currentNumber = current+1+'/40';
                // Set the current page number to be displayed
                currentPageNumber.innerHTML = currentNumber;
                // Loop the current object index adding one to get the next index each time
                for(let i = 0;i<obj[current + 1].length;i++){
            
                    if(obj[current + 1] === obj[2]){//Page 3
                        
                        obj[2][0].sectOne.forEach((one) =>{
                            output += '<li id="'+one.name+'"class="col-1">'+'<img src="'+one.image+'">'+'</li>';
                            itemsListInner[0].innerHTML = output;
                        });
                        
                        obj[2][0].sectTwo.forEach((two) =>{
                            outputTwo += '<li id="'+two.name+'"class="col-1">'+'<img src="'+two.image+'">'+'</li>';
                            itemsListInner[1].innerHTML = outputTwo;
                        });

                        obj[2][0].sectThree.forEach((three) =>{
                            outputThree += '<li id="'+three.name+'"class="col-1">'+'<img src="'+three.image+'">'+'</li>';
                            itemsListInner[2].innerHTML = outputThree;
                        });
    
                    }else{//Default output below
                        
                        // display the current object index add one properties of name and image everytime going to next each time
                        output += '<li id="'+obj[current + 1][i].name+'"class="col-2">'+'<img src="'+obj[current + 1][i].image+'">'+'</li>';
                        // Output or display in page divs by minus one each time going to previous
                        itemsList[current + 1].innerHTML = output;
                        
                    }
                }
                current++;
            }//--Closing brace nextPage()

            //Get the previous button and add event 
            prev.addEventListener('click',function(){
                if(current === 0){
                    current = itemsList.length;
                }
                previousPage();
            });

            //Get the next button and add event
            next.addEventListener('click',function(){
                if(current === itemsList.length - 1){
                    current = -1;
                }       
                nextPage();
            });

            // Call the function to display the first page content
            startQaida();

            // For each letter add event listener and the sound function
            itemsList.forEach(li => li.addEventListener('click', playSound));

            // set sound function with the event capture
            function playSound(e){
                // Get id name of each li thats outputed with the evenet capture
                let pathId = e.path[1].id;
                // Set the sound object source of each clicked item
                sound.src = folder+pathId+ext;
                /* If sound stops enable the plac method on the sound object 
                to let any sound play over again when even triggered*/
                if (sound.paused){
                    sound.play();
                }         
            }

        }//--closing brace if readystate and status

    };//--Closing brace on xhttp onreadystate change object

    // Use Ajax to get json data locally
    xhttp.open("GET", "js/qaida.json", true);
    //Send ajax request
    xhttp.send();
}
// Add event listen to the window object to load above function and funtions within
window.addEventListener("load", qaida);