var feedbackButton = document.querySelector(".feedback-form-btn");
var popup = document.querySelector(".modal-feedback");
var popupClose = popup.querySelector(".modal-close");
var feedbackUserName = popup.querySelector(".feedback-user-name");
var feedbackUserEmail = popup.querySelector(".feedback-user-email");
var comment = popup.querySelector(".feedback-user-comment");
var form = popup.querySelector(".feedback-form");
var storageFeedbackName = "";
var storageFeedbackEmail = "";
var isLocalStorage = true;

popup.classList.remove("modal-feedback-no-js");
popupClose.classList.remove("modal-close-no-js");
feedbackUserName.removeAttribute("required");
feedbackUserEmail.removeAttribute("required");

feedbackButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.add("modal-feedback-show");

  try {
    storageFeedbackName = localStorage.getItem("login");
    storageFeedbackEmail = localStorage.getItem("email");
  } catch (err) {
    isLocalStorage = false;
  }

  if (isLocalStorage) {
    if (storageFeedbackName && storageFeedbackEmail) {
      feedbackUserName.value = storageFeedbackName;
      feedbackUserEmail.value = storageFeedbackEmail;
      comment.focus();
    } else if (!storageFeedbackName) {
      if (storageFeedbackEmail) {
        feedbackUserEmail.value = storageFeedbackEmail;
      }
      feedbackUserName.focus();
    } else if (!storageFeedbackEmail) {
      if (storageFeedbackName) {
        feedbackUserName.value = storageFeedbackName;
      }
      feedbackUserEmail.focus();
    } else if (!storageFeedbackName && !storageFeedbackEmail) {
      feedbackUserName.focus();
    }
  }
});

popupClose.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.remove("modal-feedback-show");
  popup.classList.remove("modal-feedback-error");
});

form.addEventListener("submit", function(evt) {
  if (!feedbackUserName.value || !feedbackUserEmail.value) {
    evt.preventDefault();
    popup.classList.remove("modal-feedback-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-feedback-error");
  } else {
    if (isLocalStorage) {
      localStorage.setItem("login", feedbackUserName.value);
      localStorage.setItem("email", feedbackUserEmail.value);
    }
  }
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains("modal-feedback-show")) {
      evt.preventDefault();
      popup.classList.remove("modal-feedback-show");
      popup.classList.remove("modal-feedback-error");
    }
  }
});

