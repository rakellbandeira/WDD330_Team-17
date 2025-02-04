// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  let cart = localStorage.getItem(key);
  cart = cart ? JSON.parse(cart) : [];
  cart.push(data);
 
  localStorage.setItem(key, JSON.stringify(cart));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.insertAdjacentHTML("afterbegin", template);

  if(callback)
    callback(data);
}

export async function loadTemplate(path){
  const response = await fetch(path);
  const contents = await response.text();
  
  return contents;
}

export async function loadHeaderFooter(){
  const header = document.getElementById("page-header");
  const footer = document.getElementById("page-footer");

  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  renderWithTemplate(headerTemplate,header);
  renderWithTemplate(footerTemplate, footer);
}

export async function alertMessage(message, scroll=true) {

  const alert = document.createElement("div");
  alert.classList.add('alert');

  alert.innerHTML = `<p>${message}<span class = "close">X</span></p>`;

  const main = document.querySelector('main');
  main.prepend(alert);
  

  if (scroll) {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    });
  }




  alert.addEventListener("click", function(e) {
    if (e.target.tagName === 'SPAN' || e.target.textContent === 'X') {
      
      main.removeChild(this);
    }
  })

}


export function renderBreadcrumbs (pageContent, category=null, productName = null, count = null) {
  const breadElement = document.getElementById('breadcrumb');
  let breadcrumbHTML = '';

  if (!breadElement){
    console.error('Breadcrumb element not found');
    return;
}

  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    breadElement.style.display = 'none';
    return;
  }

/*   const categ = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
 */
  if (pageContent === 'product-list') {
    const categ = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    breadcrumbHTML = `<a href='../index.html'>Home</a> | <a>${categ}</a>`;
  } else if (pageContent === 'checkout') {
    breadcrumbHTML = `<a href='../index.html'>Home</a> | <a href = '../cart/index.html' >Cart</a> | <a>Checkout</a>`;
  } else if (pageContent ==='cart') {
    breadcrumbHTML = `<a href='../index.html'>Home</a> | Cart`;
  } else if (pageContent === 'product-page') {  
    const categ = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    breadcrumbHTML = `<a href='../index.html'>Home</a> | <a href='../product-listing/index.html?category=${category}' >${categ}</a> | <a>${productName}</a>`;
  }
  
  breadElement.innerHTML = breadcrumbHTML;

}

