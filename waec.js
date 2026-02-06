let currentTab = 0;
showTab(currentTab);

// Show form when clicking start button
document.getElementById("startBtn").onclick = () => {
  document.getElementById("regFormSection").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
};

// Show the current tab
function showTab(n) {
  let x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  document.getElementById("prevBtn").style.display = n === 0 ? "none" : "inline";
  document.getElementById("nextBtn").innerHTML = n === (x.length - 1) ? "Submit" : "Next";
}

// Navigate tabs
function nextPrev(n) {
  let x = document.getElementsByClassName("tab");
  x[currentTab].style.display = "none";
  currentTab += n;

  if (currentTab >= x.length) {
    generatePDFAndWhatsApp();
    return false;
  }
  showTab(currentTab);
}

// Passport preview
document.getElementById("passport").addEventListener("change", function(){
  const file = this.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(){
      document.getElementById("previewImg").src = reader.result;
      document.getElementById("previewImg").style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// Generate PDF and send via WhatsApp
async function generatePDFAndWhatsApp() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  // Collect form data
  const data = {
    Name: document.getElementById("name").value,
    DOB: document.getElementById("dob").value,
    Gender: document.getElementById("gender").value,
    Phone: document.getElementById("phone").value,
    Email: document.getElementById("email").value,
    Address: document.getElementById("address").value,
    State: document.getElementById("state").value,
    LGA: document.getElementById("lga").value,
    Religion: document.getElementById("religion").value,
    Class: document.getElementById("class").value,
    Program: document.getElementById("course").value,
    ExamYear: document.getElementById("examYear").value,
    WAECNumber: document.getElementById("waecNumber").value
  };

  let y = 20;
  pdf.setFontSize(16);
  pdf.text("WAEC / School Registration Form", 20, y); y+=10;
  pdf.setFontSize(12);

  for(let key in data){
    pdf.text(`${key}: ${data[key]}`, 20, y); y+=10;
  }

  // Add passport photo if uploaded
  const img = document.getElementById("previewImg").src;
  if(img){
    pdf.addImage(img, "JPEG", 150, 20, 40, 40);
  }

  // Note: Optional results upload is not embedded in PDF (browser limitations)

  // Generate PDF blob URL
  const pdfBlob = pdf.output("blob");
  const pdfURL = URL.createObjectURL(pdfBlob);

  // WhatsApp
  const businessNumber = "234XXXXXXXXXX"; // Replace with your number
  const text = encodeURIComponent(`New WAEC / Registration Form for ${data.Name}\nDownload PDF here ➜\n${pdfURL}`);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const url = isMobile 
    ? `whatsapp://send?phone=${businessNumber}&text=${text}` 
    : `let currentTab = 0;
showTab(currentTab);

document.getElementById("startBtn").onclick = () => {
  document.getElementById("regFormSection").style.display = "block";
  document.getElementById("regFormSection").scrollIntoView({ behavior: "smooth" });
};

// Show current tab
function showTab(n) {
  let x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  document.getElementById("prevBtn").style.display = n === 0 ? "none" : "inline";
  document.getElementById("nextBtn").innerHTML = n === (x.length - 1) ? "Submit" : "Next";
}

// Validate inputs for current tab
function validateForm() {
  let valid = true;
  const inputs = document.getElementsByClassName("tab")[currentTab].querySelectorAll("input, select");
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      input.classList.add("invalid");
      valid = false;
    } else {
      input.classList.remove("invalid");
    }
  });
  return valid;
}

// Navigate tabs
function nextPrev(n) {
  if (n === 1 && !validateForm()) return false;
  let x = document.getElementsByClassName("tab");
  x[currentTab].style.display = "none";
  currentTab += n;
  if (currentTab >= x.length) {
    generatePDFAndWhatsApp();
    return false;
  }
  showTab(currentTab);
}

// Passport preview
document.getElementById("passport").addEventListener("change", function(){
  const file = this.files[0];
  const preview = document.getElementById("previewImg");
  if(file){
    const reader = new FileReader();
    reader.onload = function(){
      preview.src = reader.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    preview.style.display = "none";
  }
});

// Generate PDF and WhatsApp
function generatePDFAndWhatsApp() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  // Collect data
  const data = {
    Name: document.getElementById("name").value,
    DOB: document.getElementById("dob").value,
    Gender: document.getElementById("gender").value,
    Phone: document.getElementById("phone").value,
    Email: document.getElementById("email").value,
    Address: document.getElementById("address").value,
    State: document.getElementById("state").value,
    LGA: document.getElementById("lga").value,
    Religion: document.getElementById("religion").value,
    Class: document.getElementById("studentClass").value,
    Program: document.getElementById("course").value,
    ExamYear: document.getElementById("examYear").value,
    WAECNumber: document.getElementById("waecNumber").value
  };

  let y = 20;
  pdf.setFontSize(16);
  pdf.text("WAEC / School Registration Form", 20, y); y+=10;
  pdf.setFontSize(12);
  for(let key in data){
    pdf.text(`${key}: ${data[key]}`, 20, y); y+=10;
  }

  const img = document.getElementById("previewImg").src;
  if(img) pdf.addImage(img, "JPEG", 150, 20, 40, 40);

  // Trigger download
  pdf.save(`${data.Name}_Registration.pdf`);

  // WhatsApp message
  const businessNumber = "234XXXXXXXXXX"; // Replace
  const text = encodeURIComponent(`New WAEC / Registration Form for ${data.Name}. Please attach the downloaded PDF.`);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const url = isMobile 
    ? `whatsapp://send?phone=${businessNumber}&text=${text}` 
    : `https://wa.me/${businessNumber}?text=${text}`;

  window.open(url, "_blank");
}}`;

  window.open(url, "_blank");
}