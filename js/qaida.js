// qaida function when window or page loads
function qaida() {
  // Set empty sound variable, Setting the Audio Object, concatenate file extensions
  let folder = "audio/";
  let extension = ".mp3";
  let sound;
  sound = new Audio();

  // Get all the pages to be displayed
  let currentPage = document.querySelector(".letters");

  // Get current number element and add options
  const currentPageNumber = document.getElementById("pageNumber");
  let options;
  for (let i = 0; i <= 40; i++) {
    options += `<option>${i}</option>`;
  }
  currentPageNumber.innerHTML += options;

  // Get the next or next page element// Get the previous or previous page element
  let next = document.querySelector("#next");
  let prev = document.querySelector("#prev");

  // Create new XMLHttpRequest request
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    // If server status was ok
    if (this.readyState == 4 && this.status == 200) {
      // parsing the json data from the json file as an object// Get property values of the keys in an array
      let response = JSON.parse(xhttp.responseText);
      let obj = Object.values(response);

      /*Set a variable with the value of 0 to use to iterate over pages, to display current
            page number, iterate current index of page divs or obj variable arrays*/
      let current = 0;
      let output;
      /* Rest or clear the page when this function is called intended when new page loads
            just before the new content is loaded*/
      function reset() {
        while (currentPage.firstChild) {
          currentPage.removeChild(currentPage.firstChild);
        }
        output = "";
      }

      function getAllLetters(indexNum) {
        if (indexNum === 0 || indexNum === 1) {
          for (let i = 0; i < obj[indexNum].length; i++) {
            /* append current content of the letterspage1 first values first name of the Arabic
                      letter as an id and the first image or image path to be displayed*/
            output +=
              '<li id="' +
              obj[indexNum][i].name +
              '"class="col-2"><img src="' +
              obj[indexNum][i].image +
              '"></li>';
            // Output above in the first page div
            currentPage.innerHTML = output;
          }
        } else {
          for (let i = 0; i < obj[indexNum].length; i++) {
            /* append current content of the letterspage1 first values first name of the Arabic
                      letter as an id and the first image or image path to be displayed*/
            obj[indexNum][0].sectOne.forEach(one => {
              output +=
                '<li id="' +
                one.name +
                '"class="col-1"><img src="' +
                one.image +
                '"></li>';
              // Output above in the first page div
              currentPage.innerHTML = output;
            });
          }
        }
      }

      // Set the first page to be displayed when windows loaded
      function startQaida() {
        // reset the page to clear first
        reset();
        getAllLetters(0);
      } //--closing brace startQaida()

      //display content each time going to previous page
      function previousPage() {
        reset();
        // Drop down option
        currentPageNumber.selectedIndex = current - 1;
        getAllLetters(current - 1);
        current--;
      } //--Closing brace previousPage()

      // display content each time going to next page*
      function nextPage() {
        reset();
        // Drop down option
        currentPageNumber.selectedIndex = current + 1;
        getAllLetters(current + 1);
        current++;
      } //--Closing brace nextPage()

      //Get the previous button and add event
      prev.addEventListener("click", function() {
        if (current === 0) {
          current = obj.length;
        }
        previousPage();
      });

      //Get the next button and add event
      next.addEventListener("click", function() {
        if (current === obj.length - 1) {
          current = -1;
        }
        nextPage();
      });

      // For each letter add event listener and the sound function
      currentPage.addEventListener("click", playSound);
      function playSound(e) {
        // Get id name of each sound image thats outputed
        let pathId = e.path[1].id;
        sound.src = folder + pathId + extension;
        if (sound.paused) {
          sound.play();
        }
      }

      // =========================================== SELECT OPTIONS ======================================= //
      currentPageNumber.addEventListener("change", options);

      function options(e) {
        reset();
        // Set current to option target value
        current = Number(e.target.value);
        getAllLetters(e.target.value);
      }

      //Local storage set bookmark
      document.getElementById("bookmark").addEventListener("click", bookMark);

      function bookMark(e) {
        e.preventDefault();

        let arabicletters;

        if (localStorage.getItem("letters") == null) {
          arabicletters = [];
        } else {
          arabicletters = JSON.parse(localStorage.getItem("letters"));
        }
        for (let i = 0; i < obj.length; i++) {
          for (let l = 0; l < obj[i].length; l++) {
            arabicletters.push(obj[Number(currentPageNumber.value)][l]);
          }
        }

        localStorage.setItem("letters", JSON.stringify(arabicletters));
        localStorage.setItem("pageNumber", JSON.stringify(current));
      }

      // Local storage get bookmark
      document
        .getElementById("bookMarkRef")
        .addEventListener("click", getBookMark);

      function getBookMark(e) {
        e.preventDefault();
        reset();
        const letters = JSON.parse(localStorage.getItem("letters"));
        letters.forEach(letter => {
          output +=
            '<li id="' +
            letter.name +
            '"class="col-2"><img src="' +
            letter.image +
            '"></li>';
          // Output or display in page divs by minus one each time going to previous
          itemsList[current].innerHTML = output;
        });
        const bkmkpgnum = JSON.parse(localStorage.getItem("pageNumber"));
        currentPageNumber.value = bkmkpgnum;
        console.log(bkmkpgnum);
      }

      // Call the function to display the first page content
      startQaida();
    } //--closing brace if readystate and status
  }; //--Closing brace on xhttp onreadystate change object

  // Use Ajax to get json data locally
  xhttp.open("GET", "js/qaida.json", true);
  //Send ajax request
  xhttp.send();
}
// Add event listen to the window object to load above function and funtions within
window.addEventListener("load", qaida);
