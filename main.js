// import Glide from '@glidejs/glide'
// import Focus from 'focus-visible'

const body = document.getElementsByTagName('body')[0]
const header = document.getElementById('header')
const navToggle = document.getElementById('nav-toggle')
const questions = document.getElementsByClassName('faq-question')
const news = document.getElementsByClassName('news-item')
const blogTitle = document.getElementById('blog-title')
const blogContent = document.getElementById('blog-content')
const blogImage = document.getElementById('blog-image')

const newsUrl = 'https://gql.tymuj.byallmeans.cloud/blog-posts?page=0&pageSize=3'
// const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
const months = ["Led", "Úno", "Bře", "Dub", "Kvě", "Čvn", "Čvc", "Srp", "Zář", "Říj", "Lis", "Pro"];

// ----- Blog posts -----

fetch(newsUrl)
  .then(response => response.json())
  .then(resNews => {
    const posts = resNews.results
    for (let i = 0; i < news.length; i++) {

      let newsItem = news[i]
      let newsItemImage = newsItem.getElementsByTagName('img')[0]
      let newsItemDate = newsItem.getElementsByTagName('time')[0]
      let newsItemTitle = newsItem.getElementsByTagName('h4')[0]
      let newsItemDescription = newsItem.getElementsByTagName('p')[0]
      let newsItemLink = newsItem.getElementsByTagName('a')[0]

      let newsItemShortDate = posts[i].createdAt.split('T')[0]
      let newsItemDay = newsItemShortDate.split('-')[2]
      let newsItemMonth = newsItemShortDate.split('-')[1]
      let newsItemYear = newsItemShortDate.split('-')[0]

      newsItemImage.src = posts[i].imageUrl
      newsItemDate.innerHTML = `${newsItemDay} ${months[+newsItemMonth]} ${newsItemYear}`
      newsItemTitle.innerHTML = posts[i].title
      newsItemDescription.innerHTML = `${posts[i].content.split('.')[0]}...`
      newsItemLink.href = `blog.html?post=${posts[i].id}`
    }
  });

// ----- Mobile nav toggle -----

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

// ----- FAQ accordion -----

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

// ----- Carousel -----

// const carousel = new Glide('.slider', {
//   type: 'carousel',
//   perView: 1,
//   autoplay: 5000,
//   hoverpause: true
// }).mount()

// carousel.on('run.before', function(evt) {
//     const scrollSteps = carousel.settings.perView;
//     evt.steps = evt.direction === '>' ? -scrollSteps : scrollSteps
// })

// const carouselPrev = document.getElementById('slider-previous')

// carouselPrev.addEventListener('click', function () {
//   carousel.go('<')
// })

// const carouselNext = document.getElementById('slider-next')

// carouselNext.addEventListener('click', function () {
//   carousel.go('>')
// })


// ----- Blog detail

var loadBlogPost = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
  }

  if (params.post) {  
    fetch(newsUrl)
    .then(response => response.json())
    .then(resNews => {
      
      const post = resNews.results.filter(p => p.id === parseInt(params.post, 10))[0]

      blogTitle.innerHTML = post.title
      blogContent.innerHTML = post.content
      blogImage.src = post.imageUrl
    })	
  }
};


