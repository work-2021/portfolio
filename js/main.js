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
  nav.classList.toggle('scroll', window.scrollY > 0);
};
let detailsBtns = document.querySelectorAll('.portfolio .content .options button:last-of-type');
let details = document.querySelectorAll('.portfolio .content ul');
detailsBtns.forEach((detailsBtn, index) => {
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
let loadMoreBtn = document.querySelector('#loadMore');
let cardsWorks = document.querySelectorAll('.portfolio .cards .card');
currentCard = 1;
loadMoreBtn.onclick = () => {
  for (let i = currentCard; i < currentCard + 1; i++) {
    cardsWorks[i].classList.add('active');
  }
  currentCard++;
  if (currentCard >= cardsWorks.length) {
    loadMoreBtn.classList.add('active');
  }
};
let blocksInfo = document.querySelectorAll('.contact .content form > div');
let contactBtn = document.getElementById('contactFormBtn');
let form = document.querySelector('.contact .content form');
let prevFormBtn = document.getElementById('prevForm');
let nextFormBtn = document.getElementById('nextForm');
let emailValid = /^[a-zA-Z]+([0-9]+)?@[a-zA-Z]+([0-9]+)?(.[a-z]+)$/;
let textValid = /^[a-zA-Z ]{2,30}$/;
let specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
let numbers = /[0-9]/;
let inputFeilds = document.querySelectorAll('.contact .content form input');
let messageBox = document.querySelector('.contact .content form textarea');
let currentBlock = 1;
contactBtn.onclick = () => {
  body.classList.add('stop-scroll');
  layer.classList.add('active');
  layer.style.zIndex = '150';
  layer.style.pointerEvents = 'none';
  nav.style.pointerEvents = 'none';
  form.classList.add('show');
  nextFormBtn.style.display = '';
  prevFormBtn.style.display = '';
  currentBlock = -1;
  nextFormBtn.click();
  inputFeilds[0].focus();
  contactBtn.className = 'disabled';
  nextFormBtn.className = 'disabled';
};
let specialContent = blocksInfo[4];
nextFormBtn.onclick = () => {
  
  if (!nextFormBtn.classList.contains('disabled')) {
    currentBlock++;
    nextPrevForm();
  }
};
prevFormBtn.onclick = () => {
  if (!prevFormBtn.classList.contains('disabled')) {
    currentBlock--;
    nextPrevForm();
  }
};
function nextPrevForm() {
  removeAllActiveForm();
  blocksInfo[currentBlock].classList.add('show');
  if (currentBlock == 3) {
    nextFormBtn.innerHTML = 'Send';
    messageBox.focus();
  } else {
    nextFormBtn.innerHTML = 'Next';
  }
  if (currentBlock == 2) {
    inputFeilds[2].focus();
  }
  if (currentBlock == 1) {
    inputFeilds[1].focus();
  }
  if (currentBlock == blocksInfo.length - 1) {
    nextFormBtn.className = 'disabled';
    nextFormBtn.style.display = 'none';
    prevFormBtn.style.display = 'none';
    setTimeout(() => {
      form.classList.remove('show');
      contactBtn.className = '';
      specialContent.className = '';
      nextFormBtn.className = '';
      prevFormBtn.className = 'disabled';
      inputFeilds.forEach((input) => {
        input.value = '';
      });
      messageBox.value = '';
      body.classList.remove('stop-scroll');
      layer.classList.remove('active');
      layer.style.zIndex = '100';
      layer.style.pointerEvents = '';
      nav.style.pointerEvents = '';
    }, 2000);
  } else {
    nextFormBtn.className = 'disabled';
  }
  if (currentBlock == 0) {
    prevFormBtn.className = 'disabled';
  } else {
    prevFormBtn.className = '';
  }
}
inputFeilds.forEach((input) => {
  if (input.type === 'text') {
    input.oninput = () => {
      if (input.value.match(textValid)) {
        input.nextElementSibling.innerHTML = '<span></span>';
        input.nextElementSibling.children[0].classList.remove('false');
        input.style.borderColor = '#ddd';
        nextFormBtn.className = '';
      } else {
        if (input.value.match(specialChar)) {
          input.nextElementSibling.innerHTML = '<span></span>it contains special characters.';
        } else if (input.value.match(numbers)) {
          input.nextElementSibling.innerHTML = '<span></span>it contains numbers.';
        } else if (input.value.length > 30) {
          input.nextElementSibling.innerHTML = '<span></span>it contains more than 30 characters';
        } else if (input.value.length < 2) {
          input.nextElementSibling.innerHTML = '<span></span>it contains less than 2 characters';
        }
        input.nextElementSibling.children[0].classList.add('false');
        input.style.borderColor = '#FF3E3E';
        nextFormBtn.className = 'disabled';
      }
    };
  } else {
    input.oninput = () => {
      if (input.value.match(emailValid)) {
        input.nextElementSibling.innerHTML = '<span></span>';
        input.nextElementSibling.children[0].classList.remove('false');
        input.style.borderColor = '#ddd';
        nextFormBtn.className = '';
      } else {
        input.nextElementSibling.innerHTML = '<span></span>please enter a valid email address.';
        input.nextElementSibling.children[0].classList.add('false');
        input.style.borderColor = '#FF3E3E';
        nextFormBtn.className = 'disabled';
      }
    };
  }
});

messageBox.oninput = () => {
  if (messageBox.value.match(textValid)) {
    messageBox.nextElementSibling.innerHTML = '<span></span>';
    messageBox.nextElementSibling.children[0].classList.remove('false');
    messageBox.style.borderColor = '#ddd';
    nextFormBtn.className = '';
  } else {
    if (messageBox.value.length < 2) {
      messageBox.nextElementSibling.innerHTML = '<span></span>it contains less than 2 characters';
    }
    messageBox.nextElementSibling.children[0].classList.add('false');
    messageBox.style.borderColor = '#FF3E3E';
    nextFormBtn.className = 'disabled';
  }
};
function removeAllActiveForm() {
  blocksInfo.forEach((block) => {
    block.classList.remove('show');
  });
}
let newsletterForm = document.querySelector('.newsletter form input');
newsletterForm.oninput = () => {
  if (newsletterForm.value.match(emailValid)) {
    newsletterForm.nextElementSibling.innerHTML = '<span></span>';
    newsletterForm.parentElement.classList.remove('false');
    newsletterForm.style.borderColor = '#ddd';
  } else {
    newsletterForm.nextElementSibling.innerHTML = '<span></span>please enter a valid email address.';
    newsletterForm.parentElement.classList.add('false');
    newsletterForm.style.borderColor = '#FF3E3E';
  }
};
let sendSubscribe = document.getElementById('subscribe');
sendSubscribe.onclick = () => {
  if (!newsletterForm.parentElement.classList.contains('false')) {
    newsletterForm.value = '';
  }
}