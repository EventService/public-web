// import Glide from '@glidejs/glide'
// import Focus from 'focus-visible'

const body = document.getElementsByTagName('body')[0]
const header = document.getElementById('header')
const navToggle = document.getElementById('nav-toggle')
const questions = document.getElementsByClassName('faq-question')
const news = document.getElementsByClassName('news-item')

const PAGE_SIZE = 10
const postsUrl = 'https://gql.tymuj.byallmeans.cloud/blog-posts'
const months = ["Led", "Úno", "Bře", "Dub", "Kvě", "Čvn", "Čvc", "Srp", "Zář", "Říj", "Lis", "Pro"];

// ----- Blog posts -----

const getFirstPosts = function () {
  fetch(buildUrl(postsUrl, 0, 3))
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

        const [newsItemDay, newsItemMonth, newsItemYear] = getDate(posts[i].createdAt)

        newsItemImage.src = posts[i].imageUrl
        newsItemDate.innerHTML = `${newsItemDay} ${months[+newsItemMonth]} ${newsItemYear}`
        newsItemTitle.innerHTML = posts[i].title
        newsItemDescription.innerHTML = `${posts[i].content.split('.')[0]}...`
        newsItemLink.href = `blog.html?post=${posts[i].id}`
      }
    });
}

  const getDate = function (dateString) {
    let itemShortDate = dateString.split('T')[0]
    let itemDay = itemShortDate.split('-')[2]
    let itemMonth = itemShortDate.split('-')[1]
    let itemYear = itemShortDate.split('-')[0]

    return [itemDay, itemMonth, itemYear, itemShortDate]
  }

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

const buildUrl = function(url, page, pageSize) {
  return `${url}?page=${page}&pageSize=${pageSize}`
}


// ----- Blog detail

var loadBlogPost = function (url) {
  const blogTitle = document.getElementById('blog-title')
  const blogContent = document.getElementById('blog-content')
  const blogImage = document.getElementById('blog-main-image')
  const blogTime = document.getElementById('blog-time')

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
    fetch(buildUrl(postsUrl, 0, PAGE_SIZE))
    .then(response => response.json())
    .then(resNews => {
      
      const post = resNews.results.filter(p => p.id === parseInt(params.post, 10))[0]
      const [newsItemDay, newsItemMonth, newsItemYear, shortDate] = getDate(post.createdAt)

      blogTitle.innerHTML = post.title
      blogContent.innerHTML = post.content
      blogImage.src = post.imageUrl
      blogTime.datetime = shortDate
      blogTime.innerHTML = `${newsItemDay} ${months[+newsItemMonth]} ${newsItemYear}`
    })	
  }
};

var globalPageNumber = 1

const appendPostToPage = function (url, blogsContainer) {
  return fetch(url)
    .then(response => response.json())
    .then(resNews => {    
      const posts = resNews.results
      const total = resNews.total

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i]

        const rootEl = document.createElement('div')
        rootEl.className = 'news-item'
        const postImgEl = document.createElement('img')
        const postContentEl = document.createElement('div')
        postContentEl.className = 'news-item-content'
        const postTimeEl = document.createElement('time')
        const postTitleEl = document.createElement('h4')
        const postTextEl = document.createElement('p')
        const postLinkEl = document.createElement('a')
        postLinkEl.className = "secondary"

        // Apply content
        const [newsItemDay, newsItemMonth, newsItemYear] = getDate(post.createdAt)
        
        postImgEl.src = post.imageUrl
        postTimeEl.innerHTML = `${newsItemDay} ${months[+newsItemMonth]} ${newsItemYear}`
        postTitleEl.innerHTML = post.title
        postTextEl.innerHTML = `${post.content.replace(/h3/gu, '!--').split('.')[0]}...`
        postLinkEl.href = `blog.html?post=${post.id}`
        postLinkEl.innerHTML = "Celý článek"

        postContentEl.appendChild(postImgEl)
        postContentEl.appendChild(postTimeEl)
        postContentEl.appendChild(postTitleEl)
        postContentEl.appendChild(postTextEl)
        postContentEl.appendChild(postLinkEl)

        // Append to root
        rootEl.appendChild(postImgEl)
        rootEl.appendChild(postContentEl)

        blogsContainer.appendChild(rootEl)
      }

      if (posts.length < PAGE_SIZE || total === document.getElementsByClassName('news-item').length) {
        const btn = document.getElementsByClassName('load-more-btn')[0]
        
        if (btn) {        
          btn.style.display = 'none';
        }
      }

      return total
  });
}

const getPostList = function () {
  const blogsContainer = document.querySelector('.blogs .blogs-list')

  appendPostToPage(buildUrl(postsUrl, 0, PAGE_SIZE), blogsContainer).then((total) => {    
    const btnLoadMoreContainer = document.createElement('div')
    btnLoadMoreContainer.className = 'center'
    const btnLoadMore = document.createElement('button')
    btnLoadMore.className = "button round blue-button load-more-btn"
    btnLoadMore.innerHTML = "Načíst další"
    btnLoadMore.onclick = () => appendPostToPage(buildUrl(postsUrl, globalPageNumber++, PAGE_SIZE), blogsContainer)

    btnLoadMoreContainer.appendChild(btnLoadMore)

    if (total !== document.getElementsByClassName('news-item').length) {
      document.querySelector('.blogs').appendChild(btnLoadMoreContainer)
    }
  
  })
}


