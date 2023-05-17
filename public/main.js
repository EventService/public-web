// import Glide from '@glidejs/glide'
// import Focus from 'focus-visible'

const body = document.getElementsByTagName("body")[0];
const header = document.getElementById("header");
const navToggle = document.getElementById("nav-toggle");
const copyright = document.getElementById("copyright-year");
const questions = document.getElementsByClassName("faq-question");
const news = document.getElementsByClassName("news-item");

const PAGE_SIZE = 10;
const postsUrl = "https://api2.tymuj.cz/blog-posts";
const months = [
  "Led",
  "Úno",
  "Bře",
  "Dub",
  "Kvě",
  "Čvn",
  "Čvc",
  "Srp",
  "Zář",
  "Říj",
  "Lis",
  "Pro",
];

// ----- Copyright -----

const addCopyrightYear = function () {
  if (copyright) {
    copyright.append(new Date().getUTCFullYear());
  }
};

// ----- Blog posts -----

const getFirstPosts = function () {
  const blogsContainer = document.querySelector(".news .news-list");
  appendPostToPage(buildUrl(postsUrl, 0, 3), blogsContainer);
};

const getDate = function (dateString) {
  let itemShortDate = dateString.split("T")[0];
  let itemDay = itemShortDate.split("-")[2];
  let itemMonth = itemShortDate.split("-")[1];
  let itemYear = itemShortDate.split("-")[0];

  return [itemDay, itemMonth, itemYear, itemShortDate];
};

// ----- Mobile nav toggle -----

navToggle.addEventListener("click", function () {
  if (!header.classList.contains("open")) {
    header.classList.add("open");
    body.classList.add("header-open");
  } else {
    header.classList.remove("open");
    body.classList.remove("header-open");
  }
});

window.addEventListener("hashchange", function () {
  header.classList.remove("open");
  body.classList.remove("header-open");
});

// ----- FAQ accordion -----

for (let i = 0; i < questions.length; i++) {
  let questionTitle = questions[i].getElementsByTagName("h4")[0];

  questionTitle.addEventListener("click", function () {
    let open = this.parentElement.classList.contains("open");

    if (!open) {
      this.parentElement.classList.add("open");
    } else {
      questions[i].classList.remove("open");
    }
  });
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

const buildUrl = function (url, page, pageSize) {
  return `${url}?page=${page}&pageSize=${pageSize}`;
};

// ----- Blog detail

var loadBlogPost = function (url) {
  const blogTitle = document.getElementById("blog-title");
  const blogContent = document.getElementById("blog-content");
  // const blogImage = document.getElementById('blog-main-image')
  const blogTime = document.getElementById("blog-time");
  const blogImage = document.createElement("img");
  blogImage.id = "blog-main-image";

  const blogsContainer = document.querySelector(".blog .blog-header");

  const blogId = parseInt(url.split("/news/")[1], 10);

  if (blogId) {
    fetch(`${postsUrl}/${blogId}`)
      .then((response) => response.json())
      .then((post) => {
        const [newsItemDay, newsItemMonth, newsItemYear, shortDate] = getDate(
          post.createdAt
        );
        blogImage.src = post.imageUrl;
        blogsContainer.appendChild(blogImage);

        blogTitle.innerHTML = post.title;
        blogContent.innerHTML = post.content;
        blogTime.datetime = shortDate;
        blogTime.innerHTML = `${newsItemDay} ${
          months[+newsItemMonth - 1]
        } ${newsItemYear}`;
      });
  }
};

var globalPageNumber = 1;

const appendPostToPage = function (url, blogsContainer) {
  return fetch(url)
    .then((response) => response.json())
    .then((resNews) => {
      const posts = resNews.results;
      const total = resNews.total;

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const rootEl = document.createElement("div");
        rootEl.className = "news-item";
        const postImgEl = document.createElement("img");
        const postContentEl = document.createElement("div");
        postContentEl.className = "news-item-content";
        const postTimeEl = document.createElement("time");
        const postTitleEl = document.createElement("h4");
        const postTextEl = document.createElement("p");
        const postLinkEl = document.createElement("a");
        postLinkEl.className = "secondary";
        const imgLinkEl = document.createElement("a");
        imgLinkEl.className = "simple";

        // Apply content
        const [newsItemDay, newsItemMonth, newsItemYear] = getDate(
          post.createdAt
        );

        postImgEl.src = post.imageUrl;
        postTimeEl.innerHTML = `${newsItemDay} ${
          months[+newsItemMonth - 1]
        } ${newsItemYear}`;
        postTitleEl.innerHTML = post.title;
        postTextEl.innerHTML = `${
          post.content.replace(/(h3|h2)/gu, "!--").split(".")[0]
        }...`;
        imgLinkEl.href = `news/${post.id}`;
        postLinkEl.href = `news/${post.id}`;
        postLinkEl.innerHTML = "Celý článek";

        imgLinkEl.appendChild(postImgEl);
        // postContentEl.appendChild(imgLinkEl)
        postContentEl.appendChild(postTimeEl);
        postContentEl.appendChild(postTitleEl);
        postContentEl.appendChild(postTextEl);
        postContentEl.appendChild(postLinkEl);

        // Append to root
        rootEl.appendChild(imgLinkEl);
        rootEl.appendChild(postContentEl);

        blogsContainer.appendChild(rootEl);
      }

      if (
        posts.length < PAGE_SIZE ||
        total === document.getElementsByClassName("news-item").length
      ) {
        const btn = document.getElementsByClassName("load-more-btn")[0];

        if (btn) {
          btn.style.display = "none";
        }
      }

      return total;
    });
};

const getPostList = function () {
  const blogsContainer = document.querySelector(".blogs .blogs-list");

  appendPostToPage(buildUrl(postsUrl, 0, PAGE_SIZE), blogsContainer).then(
    (total) => {
      const btnLoadMoreContainer = document.createElement("div");
      btnLoadMoreContainer.className = "center";
      const btnLoadMore = document.createElement("button");
      btnLoadMore.className = "button round blue-button load-more-btn";
      btnLoadMore.innerHTML = "Načíst další";
      btnLoadMore.onclick = () =>
        appendPostToPage(
          buildUrl(postsUrl, globalPageNumber++, PAGE_SIZE),
          blogsContainer
        );

      btnLoadMoreContainer.appendChild(btnLoadMore);

      if (total !== document.getElementsByClassName("news-item").length) {
        document.querySelector(".blogs").appendChild(btnLoadMoreContainer);
      }
    }
  );
};

// Initial function calls
document.addEventListener("DOMContentLoaded", () => {
  getFirstPosts();
  addCopyrightYear();
  setPageContent();
});
