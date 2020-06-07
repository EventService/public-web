const body = document.getElementsByTagName("body")[0]
const header = document.getElementById('header')
const navToggle = document.getElementById('nav-toggle')

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
