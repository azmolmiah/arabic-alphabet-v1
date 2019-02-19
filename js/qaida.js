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
xhttp.onload = function() {
  // If server status was ok
  if (this.status === 200) {
    // parsing the json data from the json file as an object// Get property values of the keys in an array
    let response = JSON.parse(xhttp.responseText);
    let obj = Object.values(response);

    /*Set a variable with the value of 0 to use to iterate over pages, to display current
            page number, iterate current index of page divs or obj variable arrays*/
    let current = 0;
    let output;
    let outputTwo;
    let outputThree;

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
    // function reset() {
    //   while (currentPage.firstChild) {
    //     currentPage.removeChild(currentPage.firstChild);
    //   }
    //   output = "";
    //   sectionone.reset();
    //   sectiontwo.reset();
    //   sectionthree.reset();
    // }

    // function outputOneSection(one) {
    //   output +=
    //     '<li id="' +
    //     one.name +
    //     '"class="col-1"><img src="' +
    //     one.image +
    //     '"></li>';
    //   currentPage.innerHTML = output;
    // }

    // function outputTwoSection(two) {
    //   outputTwo +=
    //     '<li id="' +
    //     two.name +
    //     '"class="col-1"><img src="' +
    //     two.image +
    //     '"></li>';
    //   sectionTwo.innerHTML = outputTwo;
    // }

    // function outputThreeSection(three) {
    //   outputThree +=
    //     '<li id="' +
    //     three.name +
    //     '"class="col-1"><img src="' +
    //     three.image +
    //     '"></li>';
    //   sectionThree.innerHTML = outputThree;
    // }

    class Section {
      constructor(outputNum, sectionNum) {
        this.outputNum = outputNum;
        this.sectionNum = sectionNum;
      }

      sections(letterNum) {
        this.outputNum +=
          '<li id="' +
          letterNum.name +
          '"class="col-1"><img src="' +
          letterNum.image +
          '"></li>';
        this.sectionNum.innerHTML = this.outputNum;
      }

      static reset() {
        while (currentPage.firstChild) {
          currentPage.removeChild(currentPage.firstChild);
        }
        output = "";
      }

      resets() {
        this.outputNum = "";
        this.sectionNum.innerHTML = "";
      }
    }

    const sectionone = new Section(output, currentPage);
    const sectiontwo = new Section(outputTwo, sectionTwo);
    const sectionthree = new Section(outputThree, sectionThree);

    function reset() {
      sectionone.resets();
      sectiontwo.resets();
      sectionthree.resets();
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
        // If page has two sections
        if (obj[indexNum].length == 2) {
          obj[indexNum][0].sectOne.forEach(one => {
            sectionone.sections(one);
          });

          obj[indexNum][1].sectTwo.forEach(two => {
            sectiontwo.sections(two);
          });
        } else if (obj[indexNum].length == 3) {
          // If page has three sections
          obj[indexNum][0].sectOne.forEach(one => {
            sectionone.sections(one);
          });

          obj[indexNum][1].sectTwo.forEach(two => {
            sectiontwo.sections(two);
          });

          obj[indexNum][2].sectThree.forEach(three => {
            sectionthree.sections(three);
          });
        }
      }
    }

    // Set the first page to be displayed when windows loaded
    function startQaida() {
      // reset the page to clear first
      Section.reset();
      reset();
      getAllLetters(current);
    } //--closing brace startQaida()

    //display content each time going to previous page
    function previousPage() {
      Section.reset();
      reset();
      // Drop down option
      currentPageNumber.selectedIndex = current - 1;
      getAllLetters(current - 1);
      checkBookMark(current - 1);
      current--;
    } //--Closing brace previousPage()

    // display content each time going to next page*
    function nextPage() {
      Section.reset();
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
    // Set empty sound variable, Setting the Audio Object, concatenate file extensions
    const folder = "audio/";
    const extension = ".mp3";
    let sound;
    sound = new Audio();

    function sndSrc(source) {
      sound.src = folder + source + extension;
    }

    // If play loop has reached end of last letter
    function playPauseBtn(objLength, removeAllBgBlue) {
      if (playIndex == objLength) {
        playPaused.classList.remove("fa-pause");
        playPaused.classList.add("fa-play");
        setTimeout(function() {
          for (let i = 0; i < removeAllBgBlue.length; i++) {
            removeAllBgBlue[i].classList.remove("bgBlue");
          }
        }, 1000);
      } else {
        playPaused.classList.remove("fa-play");
        playPaused.classList.add("fa-pause");
      }
    }

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
    });

    let twoSectionConcat;
    let sectTwoArr;

    function sectionLoop() {
      // If two section
      if (obj[current].length == 2) {
        twoSectionConcat = obj[current][0].sectOne.concat(
          obj[current][1].sectTwo
        );
        playPauseBtn(twoSectionConcat.length, sectTwoArr);
        sndSrc(twoSectionConcat[playIndex].name);
        let sectOneArr = Array.from(
          currentPage.parentElement.firstChild.children
        );
        sectTwoArr = sectOneArr.concat(
          Array.from(currentPage.parentElement.children[1].children)
        );
        sectTwoArr[playIndex].classList.add("bgBlue");
        // If Three section
      } else if (obj[current].length == 3) {
        let threeSectionConcat = twoSectionConcat.concat(
          obj[current][2].sectThree
        );
        playPauseBtn(threeSectionConcat.length, sectThreeArr);
        sndSrc(threeSectionConcat[playIndex].name);
        let sectThreeArr = sectTwoArr.concat(
          Array.from(currentPage.parentElement.children[2].children)
        );
        sectThreeArr[playIndex].classList.add("bgBlue");
      } else {
        playPauseBtn(obj[current].length, currentPage.children);
        sndSrc(obj[current][playIndex].name);
        currentPage.children[playIndex].classList.add("bgBlue");
      }
    }

    sound.addEventListener("ended", switchSound);
    function switchSound() {
      sectionLoop();
      sound.play();
      playIndex++;
    }

    // Play clicking individual sounds
    currentPage.parentElement.addEventListener("click", selectSound);
    function selectSound(e) {
      let soundTwo = new Audio();
      // Get id name of each sound image thats outputed
      soundTwo.src = folder + e.path[1].id + extension;
      if (soundTwo.paused) {
        soundTwo.play();
      }
    }

    // =========================================== SELECT OPTIONS ======================================= //
    currentPageNumber.addEventListener("change", options);

    function options(e) {
      reset();
      // Set current to option target value
      current = Number(e.target.value);
      checkBookMark(current);
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
          sectionone.sections(one);
        });
        arabicletters[1].sectTwo.forEach(two => {
          sectiontwo.sections(two);
        });
      } else if (arabicletters.length == 3) {
        output = "";
        // If page has three sections
        arabicletters[0].sectOne.forEach(one => {
          sectionone.sections(one);
        });
        arabicletters[1].sectTwo.forEach(two => {
          sectiontwo.sections(two);
        });
        arabicletters[2].sectThree.forEach(three => {
          sectionthree.sections(three);
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
