function qaida(){
            
    var folder = "audio/";
    var ext = ".mp3";
    var sound;
    sound = new Audio();
    sound.play();
    
    function _id(){
        return document.getElementById(id);
    }
    
    let currentPageNumber = document.querySelector('#current');
    let itemsList = document.querySelectorAll('.letters');
    let next = document.querySelector('#next');
    let prev = document.querySelector('#prev');
    
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if(this.readyState == 4 && this.status == 200){

            var response = JSON.parse(xhttp.responseText);
            
            var obj = Object.values(response);
                
            var output = '';

            let current = 0;

            function reset(){
                for(let i = 0; i < itemsList.length; i++){
                    itemsList[i].style.display = 'none';
                    output = '';     
                }
            }

            function startQaida(){
                reset();
                itemsList[0].style.display = 'block';
                var currentNumber = current+'/40';
                currentPageNumber.innerHTML = currentNumber;
                for(var i = 0;i<obj[0].length;i++){
                    output += '<li id="'+obj[0][i].name+'"class="col-2">'+'<img src="'+obj[0][i].image+'">'+'</li>';
                    itemsList[0].innerHTML = output;
                } 
            }

            function previousPage(){
                reset();
                itemsList[current - 1].style.display = 'block';
                var currentNumber = current-1+'/40';
                currentPageNumber.innerHTML = currentNumber;
                for(var i = 0;i<obj[current - 1].length;i++){
                    output += '<li id="'+obj[current - 1][i].name+'"class="col-2">'+'<img src="'+obj[current - 1][i].image+'">'+'</li>';
                    itemsList[current - 1].innerHTML = output;
                } 
                current--;
            }

            function nextPage(){
                reset();
                itemsList[current + 1].style.display = 'block';
                var currentNumber = current+1+'/40';
                currentPageNumber.innerHTML = currentNumber;
                for(var i = 0;i<obj[current + 1].length;i++){
                    output += '<li id="'+obj[current + 1][i].name+'"class="col-2">'+'<img src="'+obj[current + 1][i].image+'">'+'</li>';
                    itemsList[current + 1].innerHTML = output;
                } 
                current++;
            }
                
            prev.addEventListener('click',function(){
                if(current === 0){
                    current = itemsList.length;
                }
                if(current === 0){
                    current = obj.length;
                }
                previousPage();
            });

            next.addEventListener('click',function(){
                if(current === itemsList.length - 1){
                    current = -1;
                }
                if (current === obj.length -1){
                    current = -1;
                }        
                nextPage();
            });

            startQaida();

           
            itemsList.forEach(li => li.addEventListener('click', playSound));

            function playSound(e){
                var pathId = e.path[1].id;
                sound.src = folder+pathId+ext;
                if (sound.paused){
                    sound.play();
                }
                        
            }
            
        }
    };
    xhttp.open("GET", "js/qaida.json", true);
    xhttp.send();
}
window.addEventListener("load", qaida);