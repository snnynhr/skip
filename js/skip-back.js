var inp = document.getElementsByClassName('ytp-prev-button ytp-button');
if (inp.length > 0 && inp[0].getAttribute('aria-disabled') == 'false') {
  inp[0].click();
} else {
  history.back();
}
