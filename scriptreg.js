let currentTab = 0;
showTab(currentTab);

document.getElementById("startBtn").onclick = () => {
  document.getElementById("formSection").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
};

function showTab(n) {
  let x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  document.getElementById("prevBtn").style.display = n === 0 ? "none" : "inline";
  document.getElementById("nextBtn").innerHTML = n === (x.length - 1) ? "Submit" : "Next";
}

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

/* Passport preview */
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

/* Generate PDF & WhatsApp */
async function generatePDFAndWhatsApp() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  // Collect all form values
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
    Program: document.getElementById("course").value
  };

  let y = 20;
  pdf.setFontSize(16);
  pdf.text("Secondary School Registration Form", 20, y); y+=10;
  pdf.setFontSize(12);

  for(let key in data){
    pdf.text(`${key}: ${data[key]}`, 20, y); y+=10;
  }

  // Add passport photo if uploaded
  const img = document.getElementById("previewImg").src;
  if(img){
    pdf.addImage(img, "JPEG", 150, 20, 40, 40);
  }

  const pdfBlob = pdf.output("blob");
  const pdfURL = URL.createObjectURL(pdfBlob);

  // WhatsApp
  const businessNumber = "234XXXXXXXXXX"; // replace with your number
  const text = encodeURIComponent(`New Registration Form for ${data.Name}\nDownload PDF here ➜\n${pdfURL}`);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const url = isMobile ? `whatsapp://send?phone=${businessNumber}&text=${text}` : `https://wa.me/${businessNumber}?text=${text}`;

  window.open(url, "_blank");
}