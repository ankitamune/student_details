document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("admissionForm");
  const formSteps = document.querySelectorAll(".form-step");
  const nextBtns = document.querySelectorAll(".next");
  const prevBtns = document.querySelectorAll(".prev");
  const steps = document.querySelectorAll(".step");

  let currentStep = 0;

  function showStep(index) {
    formSteps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
      steps[i].classList.toggle("active", i <= index);
    });
  }

  function validateStep(stepIndex) {
    const currentFields = formSteps[stepIndex].querySelectorAll("input, select, textarea");
    let isValid = true;

    currentFields.forEach((field) => {
      const fieldStyle = window.getComputedStyle(field.parentElement);
      const isHidden = field.offsetParent === null || fieldStyle.display === "none";
      if (isHidden) return; // Skip validation for hidden fields

      clearError(field);
      const value = field.value.trim();

      if (!value) {
        showError(field, "This field is required");
        isValid = false;
        return;
      }

      if (field.pattern) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(value)) {
          let message = "Invalid input";
          switch (field.name) {
            case "name":
              message = "Enter a valid name (letters and spaces only)";
              break;
            case "mobile":
            case "parent_mobile":
              message = "Enter a valid 10-digit mobile number";
              break;
            case "email":
              message = "Enter a valid email address";
              break;
            case "cgpa":
              message = "Enter a valid CGPA or percentage (e.g., 7.5 or 85)";
              break;
            case "passing_year":
              message = "Enter a valid year (e.g., 2024)";
              break;
          }
          showError(field, message);
          isValid = false;
        }
      }
    });

    // Custom validation: student and parent mobile should not be same
    if (stepIndex === 0) {
      const studentMobile = document.querySelector('input[name="mobile"]').value.trim();
      const parentMobile = document.querySelector('input[name="parent_mobile"]').value.trim();

      if (studentMobile && parentMobile && studentMobile === parentMobile) {
        const parentField = document.querySelector('input[name="parent_mobile"]');
        showError(parentField, "Parent's number should not be same as your mobile number");
        isValid = false;
      }
    }

    return isValid;
  }

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentStep--;
      showStep(currentStep);
    });
  });

  form.addEventListener("submit", (e) => {
    if (!validateStep(currentStep)) {
      e.preventDefault();
    }
  });
});

function showError(input, message) {
  input.classList.add("error");

  let error = input.nextElementSibling;
  if (!error || !error.classList.contains("error-message")) {
    error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "12px";
    input.parentNode.insertBefore(error, input.nextSibling);
  }

  error.textContent = message;
}

function clearError(input) {
  input.classList.remove("error");
  const error = input.nextElementSibling;
  if (error && error.classList.contains("error-message")) {
    error.remove();
  }
}

function toggleExperienceFields() {
  const status = document.getElementById("experience_status").value;
  const expFields = document.getElementById("experience_fields");
  expFields.style.display = status === "Working" ? "block" : "none";
}
document.getElementById("admissionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = document.getElementById("admissionForm");
  const formData = new FormData(form);

  fetch("submit_form.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      document.getElementById("formResponse").innerHTML = `<p style="color: green;">${data}</p>`;
      form.reset();
    })
    .catch(error => {
      document.getElementById("formResponse").innerHTML = `<p style="color: red;">Something went wrong!</p>`;
      console.error("Error:", error);
    });
});
