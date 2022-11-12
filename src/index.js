
const url = "https://hacker-news.firebaseio.com/v0/newstories.json" 
const box = document.querySelector('.box')
const load = document.getElementById('btn')



async function showNews() {
    let newsItem = await axios.get(url)
    let newsId = 0
    createElement(newsItem.data, newsId)

    load.addEventListener('click', () => {
        newsId += 10;
        createElement(newsItem.data, newsId)
    })
}

function createElement(array, index) {
    Promise.all(array.slice(index, index + 10).map((item) =>
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)))
    .then(( res => { 
      res.forEach(news => {
        box.insertAdjacentHTML("beforeend",
                               `<div class ="news">
                                  <h3><a href = ${_.get(news, "data.url", location.href)} target =_blanck>
                                    ${_.get(news, "data.title", "title")} </h3>
                                    <p> ${timeDifference(Date.now(), news.data.time * 1000)} ago</p>
                                  </a> <div>
                                   
                                <div>`)
      })
    })) .catch ((error) => {
        console.log(error)
    })
    }

    
    
    function timeDifference(timeNow, timeNews) {
        let minute = 60 * 1000;
        let hour = minute * 60;
        let day = hour * 24;
      
        let timeAgo = timeNow - timeNews;
      
        if (timeAgo < minute) {
          return Math.round(timeAgo / 1000) + " seconds";
        } else if (timeAgo < hour) {
          return Math.round(timeAgo / minute) + " minutes";
        } else if (timeAgo < day) {
          return Math.round(timeAgo / hour) + " hours";
        }
      }

      showNews()
    


