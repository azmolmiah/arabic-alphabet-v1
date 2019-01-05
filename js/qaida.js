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

// qaida function when window or page loads
function qaida() {
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
      let outputTwo;

      // Add second row
      const sectionElement = document.createElement("ul");
      sectionElement.className = "letters mt-3";
      const sectionTwo = currentPage.parentElement.appendChild(sectionElement);

      const sectionElementThree = document.createElement("ul");
      sectionElementThree.className = "letters mt-3";
      const sectionThree = currentPage.parentElement.appendChild(
        sectionElementThree
      );

      /* Rest or clear the page when this function is called intended when new page loads
            just before the new content is loaded*/
      function reset() {
        while (currentPage.firstChild) {
          currentPage.removeChild(currentPage.firstChild);
        }
        output = "";
        outputTwo = "";
        outputThree = "";
        sectionTwo.innerHTML = "";
        sectionThree.innerHTML = "";
      }

      function outputOneSection(one) {
        output +=
          '<li id="' +
          one.name +
          '"class="col-1"><img src="' +
          one.image +
          '"></li>';
        currentPage.innerHTML = output;
      }

      function outputTwoSection(two) {
        outputTwo +=
          '<li id="' +
          two.name +
          '"class="col-1"><img src="' +
          two.image +
          '"></li>';
        sectionTwo.innerHTML = outputTwo;
      }

      function outputThreeSection(three) {
        outputThree +=
          '<li id="' +
          three.name +
          '"class="col-1"><img src="' +
          three.image +
          '"></li>';
        sectionThree.innerHTML = outputThree;
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
            // sectionTwo.innerHTML = "";
            // sectionThree.innerHTML = "";
          }
        } else {
          // If page has two sections
          if (obj[indexNum].length == 2) {
            obj[indexNum][0].sectOne.forEach(one => {
              outputOneSection(one);
            });

            obj[indexNum][1].sectTwo.forEach(two => {
              outputTwoSection(two);
            });
            // sectionThree.innerHTML = "";
          } else if (obj[indexNum].length == 3) {
            // If page has three sections
            obj[indexNum][0].sectOne.forEach(one => {
              outputOneSection(one);
            });

            obj[indexNum][1].sectTwo.forEach(two => {
              outputTwoSection(two);
            });

            obj[indexNum][2].sectThree.forEach(three => {
              outputThreeSection(three);
            });
          }
        }
      }

      // Set the first page to be displayed when windows loaded
      function startQaida() {
        // reset the page to clear first
        reset();
        getAllLetters(current);
      } //--closing brace startQaida()

      //display content each time going to previous page
      function previousPage() {
        reset();

        // Drop down option
        currentPageNumber.selectedIndex = current - 1;
        getAllLetters(current - 1);
        checkBookMark(current - 1);
        current--;
      } //--Closing brace previousPage()

      // display content each time going to next page*
      function nextPage() {
        reset();

        // Drop down option
        currentPageNumber.selectedIndex = current + 1;
        getAllLetters(current + 1);
        checkBookMark(current + 1);
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

      // ========================================= Sound Function ======================================= //
      sound.loop = false;
      let playIndex = 0;
      let playPaused = document.getElementById("playBtn");

      playPaused.addEventListener("mousedown", () => {
        if (sound.paused) {
          playPaused.classList.remove("fa-play");
          playPaused.classList.add("fa-pause");

          switchSound();
        } else {
          sound.pause();
          playPaused.classList.remove("fa-pause");
          playPaused.classList.add("fa-play");
        }
        sound.addEventListener("ended", switchSound);
        function switchSound() {
          currentPage.children[playIndex].classList.add("bgBlue");

          sound.src = folder + obj[current][playIndex].name + extension;
          playIndex++;
          sound.play();
          if (playIndex == obj[current].length) {
            sound.addEventListener("ended", () => {
              playPaused.classList.remove("fa-pause");
              playPaused.classList.add("fa-play");
            });
          }
        }
      });

      // console.log(obj[current]);

      // Play clicking individual sounds
      currentPage.parentElement.addEventListener("mousedown", selectSound);
      function selectSound(e) {
        // Get id name of each sound image thats outputed
        const pathId = e.path[1].id;
        sound.src = folder + pathId + extension;
        if (sound.paused) {
          sound.play();
        }
      }

      // =========================================== SELECT OPTIONS ======================================= //
      currentPageNumber.addEventListener("change", options);

      function options(e) {
        reset();
        checkBookMark(pageNumber);
        // Set current to option target value
        current = Number(e.target.value);
        getAllLetters(current);
      }

      // =========================================== Book Mark ================================== //
      let pageNumber = JSON.parse(localStorage.getItem("pageNumber"));
      //Local storage set bookmark
      let bookMarkIcon = document.getElementById("bookmark");
      bookMarkIcon.addEventListener("mousedown", bookMark);

      //Check Bookmark and fill if current bookMark

      function checkBookMark(pagenumber) {
        if (pageNumber === pagenumber) {
          bookMarkIcon.classList.remove("fa-bookmark-o");
          bookMarkIcon.classList.add("fa-bookmark");
        } else {
          bookMarkIcon.classList.remove("fa-bookmark");
          bookMarkIcon.classList.add("fa-bookmark-o");
        }
      }

      function bookMark() {
        localStorage.setItem("letters", JSON.stringify(obj[current]));
        localStorage.setItem("pageNumber", JSON.stringify(current));
        checkBookMark(pageNumber);

        window.location.reload();
      }

      if (performance.navigation.type == 1) {
        getBookMark();
        console.log("World");
      }

      let bookMarkRef = document.getElementById("bookMarkRef");
      bookMarkRef.addEventListener("mousedown", getBookMark);

      // Local storage get bookmark

      function getBookMark() {
        currentPageNumber.selectedIndex = JSON.parse(
          localStorage.getItem("pageNumber")
        );
        current = pageNumber;

        reset();

        checkBookMark(current);

        let arabicletters = JSON.parse(localStorage.getItem("letters"));

        if (arabicletters.length == 2) {
          output = "";
          arabicletters[0].sectOne.forEach(one => {
            outputOneSection(one);
          });
          arabicletters[1].sectTwo.forEach(two => {
            outputTwoSection(two);
          });
        } else if (arabicletters.length == 3) {
          output = "";
          // If page has three sections
          arabicletters[0].sectOne.forEach(one => {
            outputOneSection(one);
          });
          arabicletters[1].sectTwo.forEach(two => {
            outputTwoSection(two);
          });
          arabicletters[2].sectThree.forEach(three => {
            outputThreeSection(three);
          });
        } else {
          for (let i = 0; i < arabicletters.length; i++) {
            output +=
              '<li id="' +
              arabicletters[i].name +
              '"class="col-2"><img src="' +
              arabicletters[i].image +
              '"></li>';
            currentPage.innerHTML = output;
          }
        }
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
window.addEventListener("DOMContentLoaded", qaida);
