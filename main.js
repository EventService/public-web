const body = document.getElementsByTagName('body')[0]
const header = document.getElementById('header')
const navToggle = document.getElementById('nav-toggle')
const questions = document.getElementsByClassName('faq-question')

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

