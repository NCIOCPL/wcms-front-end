import { getNodeArray } from "../../../../Utilities/domManipulation";

const checkedItems = JSON.parse(sessionStorage.getItem('directorySearchList')) || [];

const trackCheckboxes = () => {
  const checkboxes = getNodeArray(".directory-search-terms ~ div .checkbox input");
  if (checkboxes.length > 1) {
    checkboxes.map(checkbox => {
      // if the checkbox value is in session storage then mark it as checked
      checkbox.checked = checkedItems.indexOf(checkbox.value) > -1?'checked':'';
      // add click event to checkbox
      checkbox.addEventListener('click', updateChecklist.bind(this, checkbox));
    })
  }
}

const updateChecklist = (checkbox) => {
  const item = checkbox.value;
  const isChecked = checkbox.checked;
  if (!isChecked) { // Uncheck it
    if (checkedItems.indexOf(item) > -1) {
      var index = checkedItems.indexOf(item);
      checkedItems.splice(index, 1);
    }
  } else if (!checkedItems.includes(item)) {
    checkedItems.push(item);
  }
  // update the session storage
  sessionStorage.setItem('directorySearchList', JSON.stringify(checkedItems));

  //console.log(JSON.parse(sessionStorage.getItem('directorySearchList')));

}


const bindFormSubmit = () => {
  // zero out old form submit method added by CDE
  if(typeof doSubmit === "function") {
    doSubmit = null;
  }

  const form = document.getElementById("resultForm");
  form.addEventListener('submit',handleFormSubmit.bind(this, form));

  // grab the submit button which is not a real submit button, causing form to not be submitable by keyboard
  const submitishButton = document.querySelector("button.submit");
  // remove old onclick handler
  submitishButton.removeAttribute('onclick');
  // turn submit button into a real submit button which will trigger the form submit event
  submitishButton.setAttribute('type','submit');
}

const handleFormSubmit = (form, e) => {
  e.preventDefault();

  // Note: pressing enter key when name text is focused will trigger a hyperlink to that individual, not a form submission. Why is this...because our form labels are also hyperlinks ¯\_(ツ)_/¯
  // Note: added removeLinks() function to improve form interactions and accessibility.

  if (checkedItems.length > 0) {
    // if there are items in our list then update the form.action and submit the form
    // do not submit form since it cannot submit checked items from another page. Must use window.location
    window.location = '/about-cancer/causes-prevention/genetics/directory/view?personid=' + checkedItems.join(",");
  } else {
    alert("Please check the professionals you would like to view.");
  }
}

const removeLinks = () => {
  const linkedLabels = getNodeArray("[for^=personid]");
  linkedLabels.map(link => {
    link.firstElementChild.replaceWith(link.firstElementChild.textContent.trim());
  })
}

// Clear session on new search
const clearSession = () => {
  const newSearchForm = document.querySelector("#searchForm.genetics-directory-form");
  if(newSearchForm.length > 0) {
    // Session data is only cleared once a new search has been submitted
    newSearchForm.addEventListener('submit', () => {
      sessionStorage.removeItem('directorySearchList')
    });
  }
}


let isInitialized = false;

// PUBLIC API
const initialize = () => {
  if(isInitialized) {
      return;
  }
  else {
    isInitialized = true;
    if (location.pathname.toLowerCase() === '/about-cancer/causes-prevention/genetics/directory/results') {
      bindFormSubmit();
      removeLinks();
      trackCheckboxes();
    } else if (location.pathname.toLowerCase() === '/about-cancer/causes-prevention/genetics/directory'){
      clearSession();
    }
  }
}

export default initialize;