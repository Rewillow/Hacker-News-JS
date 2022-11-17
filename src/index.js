
const url = "https://hacker-news.firebaseio.com/v0/newstories.json" // Creo la variabile contenente l'URL dalla quale estrapolare i dati 

const allNews = document.querySelector('.news-avaible') // Creo la variabile che raccoglierà tutte le notizie
const loadNews = document.getElementById('load-button') // Creo la variabile che caricherà le altre 10 notizie




async function getData() { // Per prima cosa creo la funzione che carica i dati dall'URL
    let newsElement = await axios.get(url) // Attraverso il client HTTP Axios, e il suo metodo ".get" effettuo la chiamato all'API
    let newsStart = 0 // Imposto il valore iniziale delle news pari a 0
    createElement(newsElement.data, newsStart) // Creo, dinamicamente, gli elementi "newsElement" e "newsStart"

    loadNews.addEventListener('click', () => { // Creo la parte di codice che permette al bottone di caricare le altre 10 news
        newsStart += 10; // Imposto il valore esatto di news da caricare e rendere disponibili
        createElement(newsElement.data, newsStart) // Creo gli stessi elementi che si creano quando si avvia l'applicazione
    })
}

function createElement(arr, listNews) { // Creo la funzione che raccoglie i dati
    Promise.all(arr.slice(listNews, listNews + 10).map((item) => // Richiamo il metodo ""Promise.all" che restituisce un singola promise solo se tutte le promise
                                                                 // dell'input vengono soddisfatte
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json`))) // Attraverso il metodo "axios.get" effettuo la chiamata per le news
    .then(( res => {  // Uso il metodo ".then()" che ritorna una promise
      res.forEach(news => {
        allNews.insertAdjacentHTML("beforeend", // Qui invece creo dinamicamente la classe che conterrà le news
                                                // In particolare, da notare l'uso di "_.get()", metodo proveniente dalla libreria di Lodash, per mezzo
                                                // della quale si ricava l'url della news e il tempo passato dalla pubblicazione.
                               `<div class ="news"> 
                                  <h3><a href=${_.get(news, "data.url", location.href)} target =_blank>
                                    ${_.get(news, "data.title", "title")} </h3>
                                    <p> ${timeDifference(Date.now(), news.data.time * 1000)} ago</p>
                                  </a> 
                                 <div>`)
      })
    })) .catch ((error) => { // In questo caso "catch" è fondamentale per raccogliere gli eventuali errori, che verranno mostrati sottoforma di alert
        alert(error)
    })
    }

    
    
    function timeDifference(timeNow, timeNews) { // Creo la funzione che calcola il tempo esatto dalla pubblicazione della news
        let second = 60 * 1000; // Creo la variabile dei secondi
        let minute = second * 60; // Creo la variabile dei minuti
        
      
        let timeAgo = timeNow - timeNews; // Effettuo la sottrazione tra il tempo effettivo e quello della news per sapere quello esatto
      
        if (timeAgo < minute) {
          return Math.round(timeAgo / 1000) + " seconds"; // Il metodo "Math.round" permette di arrotondare il risultato ricevuto
        } 
      } 
      

      getData() // Mando a schermo la funzione asincrona principale, così da ottenere il risultato richiesto
    


