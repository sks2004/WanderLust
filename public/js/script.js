(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })();
  
let toggleBtn = document.querySelector(".navbar-toggler");
let navborder = document.querySelector(".nav-index");
let head = document.querySelector(".listing-heading");

toggleBtn.addEventListener("click",()=>{
    navborder.classList.toggle("nav-index");
    head.classList.toggle("all-listing-heading");
});