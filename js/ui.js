// Global variables ==============
// ===============================
const localStoragePgNum = JSON.parse(localStorage.getItem("pageNumber"));
let currentPage = document.querySelector(".letters");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

let xhttp = new XMLHttpRequest();
xhttp.onload = function() {
  if (this.status === 200) {
    let response = JSON.parse(xhttp.responseText);
    let pageArr = Object.values(response);

    let current = 0;
    let output;
    //let outputTwo;
    //let outputThree;

    //const sectionElement = document.createElement("tr");
    //sectionElement.className = "letters mt-3";
    // const sectionTwo = currentPage.parentElement.appendChild(sectionElement);

    //const sectionElementThree = document.createElement("tr");
    //sectionElementThree.className = "letters mt-3";
    // const sectionThree = currentPage.parentElement.appendChild(
    //   sectionElementThree
    // );

    /* Rest or clear the page when this function is called intended when new page loads
            just before the new content is loaded*/

    class Section {
      constructor(outputNum, sectionNum) {
        this.outputNum = outputNum;
        this.sectionNum = sectionNum;
      }

      sections(letterNum) {
        this.outputNum += `<td id="${letterNum.name}"><img src="
          ${letterNum.image}"></td>`;
        this.sectionNum.innerHTML = this.outputNum;
      }

      resets() {
        while (currentPage.firstChild) {
          currentPage.removeChild(currentPage.firstChild);
        }
        output = "";
        this.outputNum = "";
        this.sectionNum.innerHTML = "";
      }
    }

    // console.log(obj.length - 1);

    const sectionone = new Section(output, currentPage);
    //sectiontwo = new Section(outputTwo, sectionTwo),
    //sectionthree = new Section(outputThree, sectionThree);

    function reset() {
      sectionone.resets();
      // sectiontwo.resets();
      // sectionthree.resets();
    }

    class Letters {
      constructor(objects) {
        this.object = objects;
      }

      static pageTitle(img, titleHeight) {
        const newTd = document.createElement("td");
        newTd.style.padding = "4px";
        newTd.style.height = titleHeight;
        newTd.innerHTML = `<img  src="${img}">`;
        const td = document.getElementsByTagName("td");
        currentPage.insertBefore(newTd, td[0]);
      }

      sectionLetters() {
        // if (this.object.length == 2) {
        //   // If page has two sectins
        //   this.object[0].sectOne.forEach(one => {
        //     sectionone.sections(one);
        //   });
        //   this.object[1].sectTwo.forEach(two => {
        //     sectiontwo.sections(two);
        //   });
        // } else if (this.object.length == 3) {
        //   // If page has three sections
        //   this.object[0].sectOne.forEach(one => {
        //     sectionone.sections(one);
        //   });
        //   this.object[1].sectTwo.forEach(two => {
        //     sectiontwo.sections(two);
        //   });
        //   this.object[2].sectThree.forEach(three => {
        //     sectionthree.sections(three);
        //   });
        // } else {
        // if page has one section
        for (let i = 0; i < this.object.length; i++) {
          output += `<td id="${this.object[i].name}" ><img src="${this.object[i].image}"></td>`;
          currentPage.innerHTML = output;
        }
        //}
        let letterimg = document.getElementsByTagName("img");

        if (this.object == pageArr[0]) {
          Letters.pageTitle("img/firstpagetitle.png", "44.5px");
          for (let i = 0; i < letterimg.length; i++) {
            letterimg[0].style.width = "100%";
            letterimg[0].style.height = "44.5px";
            letterimg[i].style.width = "80px";
            letterimg[i].style.height = "70px";
          }
        } else if (this.object == pageArr[1]) {
          Letters.pageTitle("img/pg2/secondpagetitle.png", "44.5px");
          for (let i = 0; i < letterimg.length; i++) {
            letterimg[0].style.width = "100%";
            letterimg[i].style.width = "66.3px";
            letterimg[i].style.height = "44.5px";
          }
        } else if (this.object == pageArr[2]) {
          for (let i = 0; i < letterimg.length; i++) {
            letterimg[i].style.width = "66.3px";
            letterimg[i].style.height = "44.5px";
          }
        }
      }
    }

    function getAllLetters(indexNum) {
      const getallletters = new Letters(pageArr[indexNum]);
      getallletters.sectionLetters();
    }

    function initFirstPage() {
      reset();
      getAllLetters(current);
    }

    function previousPage() {
      reset();
      currentOptionPageNumber.selectedIndex = current - 1;
      getAllLetters(current - 1);
      checkBookMark(current - 1);
      current--;
    }

    function nextPage() {
      reset();
      currentOptionPageNumber.selectedIndex = current + 1;
      getAllLetters(current + 1);
      checkBookMark(current + 1);
      current++;
    }

    prev.addEventListener("click", function() {
      if (current === 0) {
        current = pageArr.length;
      }
      previousPage();
    });

    next.addEventListener("click", function() {
      if (current === pageArr.length - 1) {
        current = -1;
      }
      nextPage();
    });

    // =========================================
    // =========================================
    // LETTER SOUNDS ===========================
    // =========================================
    // =========================================

    // Set empty sound variable, Setting the Audio Object, concatenate file extensions
    const folder = "audio/";
    const extension = ".mp3";
    const sound = new Audio();
    let playIndex = 0;
    const playPaused = document.getElementById("playBtn");
    function sndSrc(source) {
      sound.src = folder + source + extension;
    }

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

    // Loop through the sound of each letter
    function loopThroughSound() {
      playPauseBtn(pageArr[current].length, currentPage.children);
      sndSrc(pageArr[current][playIndex].name);
      currentPage.children[playIndex].classList.add("bgBlue");
    }

    // Increment the playIndex
    sound.addEventListener("ended", switchSound);
    function switchSound() {
      loopThroughSound();
      sound.play();
      playIndex++;
    }

    // Onclick play button or init Loop
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

    // Play clicking individual sounds
    currentPage.parentElement.addEventListener("click", selectSound);
    function selectSound(e) {
      let onClickSound = new Audio();
      onClickSound.src = folder + e.path[1].id + extension;
      if (onClickSound.paused) {
        onClickSound.play();
      }
    }

    // ===========================================
    // ===========================================
    // SELECT OPTIONS ============================
    // ===========================================
    // ===========================================

    const currentOptionPageNumber = document.getElementById("pageNumber");
    let options;
    for (let i = 0; i <= pageArr.length; i++) {
      options += `<option>${i}</option>`;
    }
    currentOptionPageNumber.innerHTML += options;

    currentOptionPageNumber.addEventListener("change", selectOptions);
    function selectOptions(e) {
      reset();
      checkBookMark(Number(e.target.value));
      getAllLetters(Number(e.target.value));
    }

    // ===========================================
    // ===========================================
    // BOOK MARK =================================
    // ===========================================
    // ===========================================

    function checkBookMark(pagenumber) {
      if (localStoragePgNum === pagenumber) {
        bookMarkIcon.classList.remove("fa-bookmark-o");
        bookMarkIcon.classList.add("fa-bookmark");
      } else {
        bookMarkIcon.classList.remove("fa-bookmark");
        bookMarkIcon.classList.add("fa-bookmark-o");
      }
    }

    let bookMarkIcon = document.getElementById("bookmark");
    bookMarkIcon.addEventListener("mousedown", setBookMark);

    function setBookMark() {
      localStorage.setItem("pageNumber", JSON.stringify(current));
      checkBookMark(localStoragePgNum);
      //Get page to reload when trieving any new bookmark info
      window.location.reload();
    }

    // When page reloads to get or update current bookmark info
    if (performance.navigation.type === 1) {
      getBookMark();
    }

    let bookMarkLink = document.getElementById("bookMarkRef");
    bookMarkLink.addEventListener("mousedown", getBookMark);
    function getBookMark() {
      reset();
      currentOptionPageNumber.selectedIndex = localStoragePgNum;
      current = localStoragePgNum;
      checkBookMark(current);
      const bookMarkLetter = new Letters(pageArr[current]);
      bookMarkLetter.sectionLetters();
    }

    initFirstPage();
  } //--closing brace if readystate and status
}; //--Closing brace on xhttp onreadystate change object

// Use Ajax to get json data locally
xhttp.open("GET", "js/qaida.json", true);
//Send ajax request
xhttp.send();
