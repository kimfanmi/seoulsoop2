let loop_delay = 3000;
class gungseo_carousel {
  items = [];
  now = 0;
  option = {
    duration: 1000,
    easing: "ease-in",
  };
  isAnimated = 0;

  constructor(element) {
    for (let i = 0; i < element.children.length; i++) {
      this.items.push(element.children[i]);
      if (i > 0)
        element.children[i].style.display = 'none';
      else
        element.children[i].style.display = 'block';
    }
  }

  move(number) {
    if (number == this.now) return;
    if (number > this.now) {
      return this.moveRight(number);
    } else {
      return this.moveLeft(number);
    }
  }

  moveRight(number) {
    this.isAnimated = 1;
    if (number == undefined) number = this.now + 1;
    let nowItem = this.items[this.now];
    let target;
    if (number >= this.items.length) {
      number = 0;
    }
    target = this.items[number];

    target.style.display = 'block';
    target.style.left = '100%';
    target.animate([{ transform: `translateX(-100%)` }], this.option).finished.finally(() => target.style.left = 0);
    nowItem.animate([{ transform: `translateX(-100%)` }], this.option).finished.finally(() => {
      nowItem.style.display = 'none'
      this.isAnimated = 0;
    });
    this.now = number;
    return number;
  }

  moveLeft(number) {
    this.isAnimated = 1;
    if (number == undefined) number = this.now - 1;
    let nowItem = this.items[this.now];
    let target;
    if (number < 0) {
      number = this.items.length - 1;
    }
    target = this.items[number];

    target.style.display = 'block';
    target.style.left = '-100%';
    target.animate([{ transform: `translateX(100%)` }], this.option).finished.finally(() => target.style.left = 0);
    nowItem.animate([{ transform: `translateX(100%)` }], this.option).finished.finally(() => {
      nowItem.style.display = 'none'
      this.isAnimated = 0;
    });
    this.now = number;
    return number;
  }


}

const gc = new gungseo_carousel(document.getElementsByClassName('carousel_container')[0]);

let icons = document.getElementsByClassName('carousel_icon');
for (let icon in icons) {
  if (icons.hasOwnProperty(icon)) {
    icons[icon].onclick = (e) => {
      if (gc.isAnimated) return;
      if (e.target.classList.contains('active')) return;
      let newActive = e.target.classList[1].split('item')[1] / 1;
      gc.move(newActive);
      document.getElementsByClassName('carousel_icon active')[0].classList.remove('active');
      e.target.classList.add('active');
    }
  }
}

let carousel_left_right = document.getElementsByClassName('js_a_gungseo index_carousel');
let ml = () => {
  if (gc.isAnimated) return;
  if (document.visibilityState == 'hidden') return;
  document.getElementsByClassName('carousel_icon active')[0].classList.remove('active');
  document.getElementsByClassName('carousel_icon item' + gc.moveLeft())[0].classList.add('active')
}
let mr = () => {
  if (gc.isAnimated) return;
  if (document.visibilityState == 'hidden') return;
  document.getElementsByClassName('carousel_icon active')[0].classList.remove('active');
  document.getElementsByClassName('carousel_icon item' + gc.moveRight())[0].classList.add('active')
}
for (let lr in carousel_left_right) {
  if (carousel_left_right.hasOwnProperty(lr)) {
    if (carousel_left_right[lr].classList.contains('left'))
      carousel_left_right[lr].onclick = ml;
    else
      carousel_left_right[lr].onclick = mr;
  }
}

let loop_carousel = setInterval(mr, loop_delay);
document.getElementsByClassName('carousel_icon_play')[0].onclick = (e) => {
  if (e.target.classList.contains('carousel_icon_play')) {
    e.target.classList.remove('carousel_icon_play');
    e.target.classList.add('carousel_icon_stop');
    clearInterval(loop_carousel);
    loop_carousel='';
  } else {
    e.target.classList.add('carousel_icon_play');
    e.target.classList.remove('carousel_icon_stop');
    loop_carousel = setInterval(mr, loop_delay);
  }
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === 'hidden') {
    if (loop_carousel!='') {
      clearInterval(loop_carousel);
      loop_carousel='';
    }
  } else {
    if (loop_carousel=='') return;
    loop_carousel = setInterval(mr, loop_delay);
  }
});
