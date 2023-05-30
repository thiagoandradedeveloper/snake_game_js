window.onload = () =>{

    let canvas =  document.getElementById("desenho");
    let contador =  document.getElementById("contador");
    let img =  document.getElementById("gameOverImg");
    let msgGameOver =  document.getElementById("msgGameOver");
    let coracoes = document.getElementsByClassName('coracao');
    let x = 0;
    let y = 0;
    let tamanho = 30;
    let direcao = 'r';
    let min = 0;
    let tamanhoCanvas = 600;
    let max = Math.trunc((tamanhoCanvas/tamanho))-1;
    let ctx = canvas.getContext('2d');
    let primeiraFruta = true;
    let tempo = 150;
    let primeiroQuadrado;
    let cont = 0;
    let vidas = 2;
   

    canvas.width = tamanhoCanvas;
    canvas.height = tamanhoCanvas;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, tamanhoCanvas, tamanhoCanvas);
    
    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, tamanho, tamanho);
    ctx.fill();
    pontos = [[0,0]];
    novaPosicaoFruta();
    gerarFruta();

    let time = setInterval(mover,tempo);

    function mover(){
        
        ctx.clearRect(0, 0, tamanhoCanvas,tamanhoCanvas);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, tamanhoCanvas, tamanhoCanvas);

        gerarFruta();

        ctx.fillStyle = "#f00";
        ctx.fillRect(x, y, tamanho, tamanho);        

        if(direcao == 'r'){
            x += tamanho;
            y += 00;
        }
        if(direcao == 'l'){
            x -= tamanho;
            y += 00;
        }
        if(direcao == 'd'){
            x += 00;
            y += tamanho;
        }
        if(direcao == 'u'){
            x += 00;
            y -= tamanho;
        }
        
        if(vidas == 0){
            
            if(x < 0){
                removerCoracao();
                gameOver();
            }
            if(y < 0){ 
                removerCoracao();
                gameOver(); 
            }
            if(x > tamanhoCanvas-tamanho){
                removerCoracao();
                gameOver();
            }
            if(y > tamanhoCanvas-tamanho){ 
                removerCoracao();
                gameOver(); 
            }
        
        } else {

            if(x < 0){ 
                x = tamanhoCanvas-tamanho;
                diminuirVidas();
            }
            if(y < 0){ 
                y = tamanhoCanvas-tamanho;
                diminuirVidas(); 
            }
            if(x > tamanhoCanvas-tamanho){ 
                x = 0;
                diminuirVidas(); 
            }
            if(y > tamanhoCanvas-tamanho){ 
                y = 0;
                diminuirVidas(); 
            }        
        }
       
        if(pontos.length != 1){
            //apaga o rabo da cobra
            pontos.shift();  
        }
      
        
        for(let i = 0; i < pontos.length; i++){
            
            x1 = pontos[i][0];
            y1 = pontos[i][1];

            if(x == x1 && y == y1){
                if(vidas == 0){
                    removerCoracao();
                    gameOver();
                    msgGameOver.innerText = "Game Over! Bateu em si mesmo!";
                    break;
                } else {
                    diminuirVidas();
                }
            }
        }  

        //inserir nova cabeca
        pontos.push([x,y]);

        for(let i = 0; i < pontos.length; i++){
            x1 = pontos[i][0];
            y1 = pontos[i][1];
            desenharPonto(x1,y1);
        }

        primeiroQuadrado = pontos[0];

        if(x == randx*tamanho && y == randy*tamanho){            
            novaPosicaoFruta();
            gerarFruta();
            crescer();
        }      
    }
    function gameOver(){
        clearInterval(time);
        ctx.fillStyle = "#f00";
        ctx.fillRect(primeiroQuadrado[0], primeiroQuadrado[1], tamanho, tamanho);
        img.style.display = "block";
        gameOverCondition = true;
        if(msgGameOver.innerText == ""){
            msgGameOver.innerText = "Game Over! Bateu na parede!";
        }
    }
    function novaPosicaoFruta(){
        randx = Math.trunc(Math.random()*(max-min+1)+min);
        randy = Math.trunc(Math.random()*(max-min+1)+min);
        for(let i = 0; i < pontos.length; i++){
            x1 = pontos[i][0];
            y1 = pontos[i][1];
            if(x1 == randx && y1 == randy){
                novaPosicaoFruta();
            }
        }  
    }
    function desenharPonto(ex,ey){
        ctx.fillStyle = "#f00";
        ctx.fillRect(ex, ey, tamanho, tamanho);
        ctx.fill();
    }
    function removerCoracao(){
        coracoes.item(0).parentNode.removeChild(coracoes.item(0));
        return "Você perdeu uma vida! \nVocê possui mais " + vidas + " vida(s)! \nVocê não pode bater na parede! \nVocê não pode bater em si mesmo!"; 
    }
    function diminuirVidas(){
        alert(removerCoracao());
        vidas--;
    }
    document.onkeydown = (e) => {

        if(e.key.indexOf("Arrow") != -1){

            switch(e.key){
                case "ArrowDown":
                    if(direcao != 'u') direcao = 'd';
                    break;
                case "ArrowUp":
                    if(direcao != 'd') direcao = 'u';
                    break;
                case "ArrowLeft":
                    if(direcao != 'r') direcao = 'l';
                    break;
                case "ArrowRight":
                    if(direcao != 'l') direcao = 'r';
                    break;
            }
        }
    }
    function crescer(){

        if(direcao == 'r'){
            x += tamanho;
            y += 00;
        }
        if(direcao == 'l'){
            x -= tamanho;
            y += 00;
        }
        if(direcao == 'd'){
            x += 00;
            y += tamanho;
        }
        if(direcao == 'u'){
            x += 00;
            y -= tamanho;
        }

        pontos.push([x,y]);
        
        if(primeiraFruta){
            primeiraFruta = false;
            cont--;
            pontos.shift();
            crescer(); 
        }
        cont++;
        contador.innerText = cont;
    }
    function gerarFruta(){
        ctx.fillStyle = "#ff0";
        ctx.fillRect(randx*tamanho, randy*tamanho, tamanho, tamanho);
    }
}