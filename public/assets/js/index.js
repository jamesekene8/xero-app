const loginForm = document.querySelector(".form--login");
const logoutBtn = document.querySelector(".logout--btn");
const registerForm = document.querySelector(".form--register");
const profileForm = document.getElementById("profile-settings");
const changePasswordBtn = document.querySelector("#change-pass");
const changePasswordForm = document.querySelector("#change_my_password");
const liBtns = document.querySelectorAll(".tab_profile");
const estateLiBtns = document.querySelectorAll(".pag_properties");
const profileBtn = document.querySelector("#profile-btn");
const changePassForm = document.querySelector(".form-user-password");
const propertiesTab = document.querySelector("#properties_tab");
const propertiesTabdetails = document.querySelector("#my_properties");
const propertyListing = document.querySelectorAll(".prop_listing");
const submitPropertyForm = document.querySelector("#submit_property_form");
const usersBtn = document.querySelector("#users-btn");
const blogBtn = document.querySelector("#blog-btn");
const estatesBtn = document.querySelector("#estates-btn");
const bookBtn = document.querySelector("#book-estate");
import { updateSettings } from "./updateSettings";
const updateUserForm = document.querySelector("#form-user-data");
const usersForm = document.querySelector("#my_users");
const estatesListing = document.querySelector("#all_estates");
const usersListing = document.querySelectorAll(".users_Listing");
const allEstates = document.querySelectorAll(".estates_Listing");
const blogListing = document.querySelectorAll(".blog_Listing");
const blogsForm = document.querySelector("#all_blogs");
const createPostForm = document.querySelector("#submit_post_form");
const authorBlogTab = document.querySelector("#blog_tab");
const myPropertyTab = document.querySelector("#myproperty_tab");
const searchContent = document.querySelector("#searchContent");
const searchForm = document.querySelector("#search_query_form");
const forgotPasswordForm = document.querySelector("#forgot_password_form");
const resetPasswordForm = document.querySelector(".form--reset--password");
const lesseeProperties = document.querySelector("#myLessee_properties");
const newsletterForm = document.querySelector("#newsletter-form");
const footerNewsletterForm = document.querySelector("#footer-newsletter-form");
const contactForm = document.querySelector("#contact-form");
const reviewBtn = document.querySelector("#review-button");
const reviewForm = document.getElementById("form-for-review");
import { login, logout } from "./login";
import { register } from "./register";
import { updatePassword } from "./updatePassword";
import { deleteProperty } from "./deleteProperty";
import { deleteUser } from "./deleteUser";
import { deleteEstate } from "./deleteEstate";
import { deleteBlog } from "./deleteBlog";
import { createPost } from "./createPost";
import { submitProperty } from "./submit_property";
import { searchQuery } from "./search";
import { bookEstate } from "./stripe";
import { newsletter } from "./newsletter";
import { contact } from "./contact";
import { review } from "./review";
import { forgotPassword, resetPassword } from "./forgotPassword";

if (reviewBtn) {
  reviewBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("div-for-comment").style.display = "block";
  });
}

if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = document.getElementById("review-description").value;
    const estate = document.getElementById("reviewedEstateId").value;
    review(description, estate);
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const phone = document.getElementById("contact-phone").value;
    const subject = document.getElementById("contact-subject").value;
    const message = document.getElementById("contact-message").value;
    contact(name, email, phone, subject, message);
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletter_email").value;
    newsletter(email);
  });
}

if (footerNewsletterForm) {
  footerNewsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("footer-newsletter-email").value;
    newsletter(email);
  });
}

if (resetPasswordForm) {
  resetPasswordForm.addEventListener("submit", (e) => {
    const password = document.getElementById("password_reset").value;
    const passwordConfirm = document.getElementById(
      "passwordConfirm_reset"
    ).value;
    const token = window.location.href.split("/").slice(-1).toString();
    resetPassword(password, passwordConfirm, token);
  });
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email_for_forgotPassword").value;
    forgotPassword(email);
  });
}

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    document.getElementById("SearchTitleElement").innerHTML = "";
    const city = document.getElementById("city--selection").value;
    const bedrooms = document.getElementById("bedrooms--selection").value;
    const bathrooms = document.getElementById("bathrooms--selection").value;
    searchQuery(city, bedrooms, bathrooms);
  });
}

var ignoreClickOnMeElement = document.getElementById("SearchTitleElement");

if (ignoreClickOnMeElement) {
  document.addEventListener("click", function (event) {
    var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
    if (!isClickInsideElement) {
      //Do something click is outside specified element
      ignoreClickOnMeElement.innerHTML = "";
    }
  });
}

if (submitPropertyForm) {
  submitPropertyForm.addEventListener("submit", (e) => {
    const form = new FormData();
    form.append("image", document.getElementById("photo_property").files[0]);
    form.append("title", document.getElementById("title_of_property").value);
    form.append("price", document.getElementById("price_of_property").value);
    form.append("bedrooms", document.getElementById("bedrooms_select").value);
    form.append("beds", document.getElementById("beds_select").value);
    form.append("bathrooms", document.getElementById("bathrooms_select").value);
    form.append("city", document.getElementById("city_select").value);
    form.append("country", document.getElementById("location_select").value);
    for (
      let x = 0;
      x < document.getElementById("coverImage_property").files.length;
      x++
    ) {
      form.append(
        "imageCover",
        document.getElementById("coverImage_property").files[x]
      );
    }
    form.append(
      "description",
      document.getElementById("property_details").value
    );
    form.append(
      "AirConditioning",
      document.getElementById("air-condition").checked
    );
    form.append("wifi", document.getElementById("wifi").checked);
    form.append("pool", document.getElementById("swimming-pool").checked);
    form.append("phone", document.getElementById("telephone").checked);
    form.append("parking", document.getElementById("free-parking").checked);
    form.append("tv", document.getElementById("television").checked);
    form.append("alarm", document.getElementById("alarm").checked);
    form.append("homeTheatre", document.getElementById("home-theatre").checked);
    form.append("security", document.getElementById("home-security").checked);
    form.append("gym", document.getElementById("gym").checked);
    form.append(
      "electricRange",
      document.getElementById("electric-range").checked
    );
    form.append(
      "privateSpace",
      document.getElementById("private-space").checked
    );

    submitProperty(form);
  });
}

if (propertyListing) {
  const propListing = Array.prototype.slice.call(propertyListing);
  propListing.forEach((listing) => {
    listing.childNodes[0].childNodes[3].childNodes[0].childNodes[1].addEventListener(
      "click",
      function () {
        listing.style.display = "none";
        const estate_id = this.getAttribute("estateId");

        deleteProperty(estate_id);
      }
    );
  });
}

if (usersListing) {
  const userListing = Array.prototype.slice.call(usersListing);
  userListing.forEach((listing) => {
    listing.childNodes[0].childNodes[3].childNodes[0].childNodes[1].addEventListener(
      "click",
      function () {
        listing.style.display = "none";
        const user_id = this.getAttribute("userId");
        deleteUser(user_id);
      }
    );
  });
}

if (allEstates) {
  const estateListing = Array.prototype.slice.call(allEstates);
  estateListing.forEach((listing) => {
    listing.childNodes[0].childNodes[3].childNodes[0].childNodes[1].addEventListener(
      "click",
      function () {
        listing.style.display = "none";
        const estate_id = this.getAttribute("estateId");

        deleteEstate(estate_id);
      }
    );
  });
}

if (blogListing) {
  const bloListing = Array.prototype.slice.call(blogListing);
  bloListing.forEach((listing) => {
    listing.childNodes[0].childNodes[3].childNodes[0].childNodes[1].addEventListener(
      "click",
      function () {
        listing.style.display = "none";
        const blog_id = this.getAttribute("blogId");
        deleteBlog(blog_id);
      }
    );
  });
}

if (propertyListing) {
  const propListing = Array.prototype.slice.call(propertyListing);
  propListing.forEach((listing) => {
    listing.childNodes[0].childNodes[3].childNodes[0].childNodes[0].addEventListener(
      "click",
      function () {
        listing.style.display = "none";
      }
    );
  });
}

if (blogListing) {
  const bloListing = Array.prototype.slice.call(blogListing);
  bloListing.forEach((listing) => {
    listing.childNodes[0].childNodes[3].childNodes[0].childNodes[0].addEventListener(
      "click",
      function () {
        listing.style.display = "none";
      }
    );
  });
}

if (usersListing) {
  const userListing = Array.prototype.slice.call(usersListing);
  userListing.forEach((listing) => {
    listing.childNodes[0].childNodes[3].childNodes[0].childNodes[0].addEventListener(
      "click",
      function () {
        listing.style.display = "none";
      }
    );
  });
}

if (allEstates) {
  const estateListing = Array.prototype.slice.call(allEstates);
  estateListing.forEach((listing) => {
    listing.childNodes[0].childNodes[3].childNodes[0].childNodes[0].addEventListener(
      "click",
      function () {
        listing.style.display = "none";
      }
    );
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login--email").value;
    const password = document.getElementById("login--password").value;
    login(email, password);
  });
}

if (liBtns) {
  liBtns.forEach((li) => {
    li.addEventListener("click", function () {
      liBtns.forEach((links) =>
        links.firstElementChild.classList.remove("active")
      );
      this.firstElementChild.classList.add("active");
    });
  });
}

if (estateLiBtns) {
  estateLiBtns.forEach((li) => {
    li.addEventListener("click", function () {
      estateLiBtns.forEach((links) =>
        links.firstElementChild.classList.remove("active")
      );
      this.firstElementChild.classList.add("active");
    });
  });
}

if (changePasswordBtn) {
  changePasswordBtn.addEventListener("click", (e) => {
    e.preventDefault();
    profileForm.style.display = "none";
    propertiesTabdetails.style.display = "none";
    usersForm.style.display = "none";
    estatesListing.style.display = "none";
    blogsForm.style.display = "none";
    lesseeProperties.style.display = "none";
    changePasswordForm.style.display = "block";
  });
}

if (usersBtn) {
  usersBtn.addEventListener("click", (e) => {
    e.preventDefault();
    profileForm.style.display = "none";
    propertiesTabdetails.style.display = "none";
    changePasswordForm.style.display = "none";
    estatesListing.style.display = "none";
    blogsForm.style.display = "none";
    lesseeProperties.style.display = "none";
    usersForm.style.display = "block";
  });
}

if (blogBtn) {
  blogBtn.addEventListener("click", (e) => {
    profileForm.style.display = "none";
    propertiesTabdetails.style.display = "none";
    changePasswordForm.style.display = "none";
    estatesListing.style.display = "none";
    usersForm.style.display = "none";
    lesseeProperties.style.display = "none";
    blogsForm.style.display = "block";
  });
}

if (estatesBtn) {
  estatesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    profileForm.style.display = "none";
    propertiesTabdetails.style.display = "none";
    changePasswordForm.style.display = "none";
    usersForm.style.display = "none";
    blogsForm.style.display = "none";
    lesseeProperties.style.display = "none";
    estatesListing.style.display = "block";
  });
}

if (propertiesTab) {
  propertiesTab.addEventListener("click", (e) => {
    profileForm.style.display = "none";
    changePasswordForm.style.display = "none";
    usersForm.style.display = "none";
    estatesListing.style.display = "none";
    blogsForm.style.display = "none";
    lesseeProperties.style.display = "none";
    propertiesTabdetails.style.display = "block";
  });
}

if (myPropertyTab) {
  myPropertyTab.addEventListener("click", (e) => {
    profileForm.style.display = "none";
    changePasswordForm.style.display = "none";
    usersForm.style.display = "none";
    estatesListing.style.display = "none";
    blogsForm.style.display = "none";
    propertiesTabdetails.style.display = "none";
    lesseeProperties.style.display = "block";
  });
}

if (profileBtn) {
  profileBtn.addEventListener("click", (e) => {
    e.preventDefault();
    estatesListing.style.display = "none";
    profileForm.style.display = "block";
    usersForm.style.display = "none";
    blogsForm.style.display = "none";
    changePasswordForm.style.display = "none";
    lesseeProperties.style.display = "none";
  });
}

if (authorBlogTab) {
  authorBlogTab.addEventListener("click", (e) => {
    e.preventDefault();
    profileForm.style.display = "none";
    propertiesTabdetails.style.display = "none";
    changePasswordForm.style.display = "none";
    estatesListing.style.display = "none";
    usersForm.style.display = "none";
    lesseeProperties.style.display = "none";
    blogsForm.style.display = "block";
  });
}

if (updateUserForm) {
  updateUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("title", document.getElementById("title").value);
    form.append("phone", document.getElementById("phone").value);
    form.append("email", document.getElementById("email").value);
    form.append("role", document.getElementById("role--selection").value);
    form.append("about", document.getElementById("about").value);
    form.append("photo", document.getElementById("photo").files[0]);
    updateSettings(form, "data");
  });
}

if (changePassForm) {
  changePassForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById("password-current").value;
    const password = document.getElementById("newPassword").value;
    const passwordConfirm = document.getElementById(
      "newPassword-confirm"
    ).value;

    updatePassword(currentPassword, password, passwordConfirm);
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    register(name, email, password, passwordConfirm);
  });
}

if (createPostForm) {
  createPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", document.getElementById("title_of_post").value);
    form.append("coverImage", document.getElementById("photo_blog").files[0]);
    form.append(
      "description",
      document.getElementById("blog_description").value
    );
    createPost(form);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

if (bookBtn) {
  bookBtn.addEventListener("click", (e) => {
    e.target.textContent = "Checking for avalability...";
    const { estateId } = e.target.dataset;
    bookEstate(estateId);
  });
}
