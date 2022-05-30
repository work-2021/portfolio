let buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    button.classList.remove("focus");
    void button.offsetWidth;
    button.classList.add("focus");
  }, false);
});
let mode = document.querySelector('.mode');
mode.onclick = () => {
  mode.classList.toggle('active');
};
let toggle = document.querySelector('.toggle');
let linksBar = document.querySelector('.links');
let body = document.body;
let layer = document.querySelector('.layer');
toggle.onclick = () => {
  toggle.classList.toggle('active');
  linksBar.classList.toggle('active');
  body.classList.toggle('stop-scroll');
  layer.classList.toggle('active');
};
layer.onclick = () => {
  toggle.click();
};
let links = document.querySelectorAll('.links ul li');
links.forEach((link) => {
  link.onclick = (e) => {
    removeActiveLinks();
    link.classList.add('active');
    toggle.click();
  };
});

function removeActiveLinks() {
  links.forEach((link) => {
    link.classList.remove('active');
  });
}
let nav = document.querySelector('header nav');
window.onscroll = () => {
  nav.classList.toggle('scroll',window.scrollY > 0);
};
let detailsBtns = document.querySelectorAll('.portfolio .content .options button:last-of-type');
let details = document.querySelectorAll('.portfolio .content ul');
detailsBtns.forEach((detailsBtn,index) => {
  detailsBtn.onclick = () => {
    details[index].classList.toggle('active');
  };
});
let testimonialsCards = document.querySelectorAll('.testimonials .cards .card');
let sn = 0;
let indicators = document.querySelectorAll('.indicators li');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
prevBtn.onclick = () => {
  if (!prevBtn.classList.contains('disable')) {
    sn--;
    check();
  }
};
nextBtn.onclick = () => {
  if (!nextBtn.classList.contains('disable')) {
    sn++;
    check();
  }
};
function check() {
  removeAllActive();
  removeAllActiveInd();
  testimonialsCards[sn].classList.add('active');
  indicators[sn].classList.add('active');
  if (sn == testimonialsCards.length - 1) {
    nextBtn.classList.add('disable');
  } else {
    nextBtn.classList.remove('disable');
  }
  if (sn == 0) {
    prevBtn.classList.add('disable');
  } else {
    prevBtn.classList.remove('disable');
  }
}
indicators.forEach((indicator, ind) => {
  indicator.onclick = () => {
    removeAllActiveInd();
    indicator.classList.add('active');
    sn = ind;
    check();
  };
});
function removeAllActive() {
  testimonialsCards.forEach((card) => {
    card.classList.remove('active');
  });
}
function removeAllActiveInd() {
  indicators.forEach((indicator) => {
    indicator.classList.remove('active');
  });
}
let inputs = document.querySelectorAll('.contact form input');
let textarea = document.getElementById('message');
let rgx1 = /^[a-zA-Z]+([0-9]+)?@[a-zA-Z]+([0-9]+)?(.[a-z]+)$/i;
let rgx2 = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/i;
let rgx3 = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{10,200}$/i;
inputs.forEach((el) => {
  if (el.getAttribute('type') === 'email') {
    el.onblur = () => { 
      checkForm(el, rgx1, 'please enter a valid email address');
    };
  } else {
    el.onblur = () => { checkForm(el, rgx2, 'please enter a correct name'); };
  }
});
textarea.onblur = () => { checkForm(textarea, rgx3, 'please enter a message');
};

function checkForm(input, regx, msg) {
  if (regx.test(input.value)) {
    input.classList.remove('active');
    input.nextElementSibling.classList.remove('active');
    input.nextElementSibling.lastElementChild.textContent = '';
  } else {
    input.classList.add('active');
    input.nextElementSibling.classList.add('active');
    input.nextElementSibling.lastElementChild.textContent = msg;
  }
}
let form = document.getElementById('form');
let errorMsg = document.querySelectorAll('.contact .content form div p');
form.onsubmit = (event) => {
  console.log('ok');
  inputs.forEach((item) => {
    item.blur();
  });
  textarea.blur();
  errorMsg.forEach((item) => {
    if (item.classList.contains('active')) {
      event.preventDefault();
    }
    if (item.previousElementSibling.value === '') {
      textarea.nextElementSibling.classList.add('active');
      textarea.nextElementSibling.lastElementChild.textContent = 'please add some information';
      event.preventDefault();
    }
  });
};
let newsletterEmail = document.querySelector('.newsletter form input');
newsletterEmail.onblur = () => {
  checkForm(newsletterEmail, rgx1, 'please enter a valid email address');
};
