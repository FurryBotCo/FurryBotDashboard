const dropdown = document.getElementById('__dropdown');

const getViewportSize = () => {
  let w, h;

  if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
    w = window.innerWidth;
    h = window.innerHeight;
  } else {
    w = document.documentElement.clientWidth;
    h = document.documentElement.clientHeight;
  }

  return { w, h };
};

dropdown.onclick = () => {
  // noop owo
};
