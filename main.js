const body = document.getElementsByTagName('body')[0]
const header = document.getElementById('header')
const navToggle = document.getElementById('nav-toggle')
const questions = document.getElementsByClassName('faq-question')
const news = document.getElementsByClassName('news-item')
const newsUrl = 'https://5edd6a78ae06ed0016ee3557.mockapi.io/news'
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

fetch(newsUrl)
  .then(response => response.json())
  .then(resNews => {
    for (let i = 0; i < news.length; i++) {
      let newsItem = news[i]
      let newsItemImage = newsItem.getElementsByTagName('img')[0]
      let newsItemDate = newsItem.getElementsByTagName('time')[0]
      let newsItemTitle = newsItem.getElementsByTagName('h4')[0]
      let newsItemDescription = newsItem.getElementsByTagName('p')[0]
      let newsItemLink = newsItem.getElementsByTagName('a')[0]

      let newsItemShortDate = resNews[i].createdAt.split('T')[0]
      let newsItemDay = newsItemShortDate.split('-')[2]
      let newsItemMonth = newsItemShortDate.split('-')[1]
      let newsItemYear = newsItemShortDate.split('-')[0]

      newsItemImage.src = resNews[i].image
      newsItemDate.innerHTML = `${newsItemDay} ${months[+newsItemMonth]} ${newsItemYear}`
      newsItemTitle.innerHTML = resNews[i].title
      newsItemDescription.innerHTML = resNews[i].description
      newsItemLink.href = resNews[i].url
    }
  });

navToggle.addEventListener('click', function () {
  if (!header.classList.contains('open')) {
    header.classList.add('open')
    body.classList.add('header-open')
  }
  else {
    header.classList.remove('open')
    body.classList.remove('header-open')
  }
})

window.addEventListener('hashchange', function () {
  header.classList.remove('open')
  body.classList.remove('header-open')
})

for (let i = 0; i < questions.length; i++) {
  let questionTitle = questions[i].getElementsByTagName('h4')[0]

  questionTitle.addEventListener('click', function () {
    let open = this.parentElement.classList.contains('open')

    if (!open) {
      this.parentElement.classList.add('open')
    }
    else {
      questions[i].classList.remove('open')
    }
  })
}

