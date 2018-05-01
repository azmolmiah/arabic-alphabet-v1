// Qaida Audio

function qaida(){
    var sound;
        sound = new Audio();
        sound.play();

    
        var soundList = document.getElementById('letters');
        function soundplay(){
            
            soundList.addEventListener('click', letterReplay);
            var sounds ;
            if (sound.paused){
                sound.play();
            }
        }

        // Alif 
        document.getElementById('alif').addEventListener('click', letterAlif);
        function letterAlif(e){
            sound.src = "audio/alif.mp3";
            soundplay();
            console.log(e);
        }
        
        // Baa
        document.getElementById('baa').addEventListener("click", letterBaa);
        function letterBaa(){
            sound.src = "audio/baa.mp3";
            soundplay();
        }

        // Thaa
        document.getElementById('tha').addEventListener("click", letterTha);
        function letterTha(){
            sound.src = "audio/thaa.mp3";
            soundplay();
        }
        
        // Thsaa
        document.getElementById('thsaa').addEventListener("click", letterThsaa);
        function letterThsaa(){
            sound.src = "audio/thsaa.mp3";
            soundplay();
        }
        
        // Jeem
        document.getElementById('jeem').addEventListener("click", letterJeem);
        function letterJeem(){
            sound.src = "audio/jeem.mp3";
            soundplay();
        }
        
        // Haa
        document.getElementById('haa').addEventListener("click", letterHaa);
        function letterHaa(){
            sound.src = "audio/haa.mp3";
            soundplay();
        }

        // Khaa
        document.getElementById('khaa').addEventListener("click", letterKhaa);
        function letterKhaa(){
            sound.src = "audio/khaa.mp3";
            soundplay();
        }
        
        // Daal
        document.getElementById('daal').addEventListener("click", letterDaal);
        function letterDaal(){
            sound.src = "audio/daal.mp3";
            soundplay();
        }

        // Zsaal
        document.getElementById('zsaal').addEventListener("click", letterZsaal);
        function letterZsaal(){
            sound.src = "audio/zsaal.mp3";
            soundplay();
        }

        // Raa
        document.getElementById('raa').addEventListener("click", letterRaa);
        function letterRaa(){
            sound.src = "audio/raa.mp3";
            soundplay();
        }

        // Zaa
        document.getElementById('zaa').addEventListener("click", letterZaa);
        function letterZaa(){
            sound.src = "audio/zaa.mp3";
            soundplay();
        }

        // Seen
        document.getElementById('seen').addEventListener("click", letterSeen);
        function letterSeen(){
            sound.src = "audio/seen.mp3";
            soundplay();
        }

        // Sheen
        document.getElementById('sheen').addEventListener("click", letterSheen);
        function letterSheen(){
            sound.src = "audio/sheen.mp3";
            soundplay();
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

}



window.addEventListener("load", qaida);

