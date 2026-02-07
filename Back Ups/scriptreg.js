let currentTab = 0;
showTab(currentTab);

document.getElementById("startBtn").onclick = () => {
  document.getElementById("formSection").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
};

function showTab(n) {
  let x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  document.getElementById("prevBtn").style.display = n == 0 ? "none" : "inline";
  document.getElementById("nextBtn").innerHTML = n == (x.length - 1) ? "Submit" : "Next";
}

function nextPrev(n) {
  let x = document.getElementsByClassName("tab");
  x[currentTab].style.display = "none";
  currentTab += n;
  if (currentTab >= x.length) {
    generatePDFAndSendWhatsApp();
    return false;
  }
  showTab(currentTab);
}

/* Preview Passport */
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

/* Generate PDF */
async function generatePDFAndSendWhatsApp() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const gender = document.getElementById("gender").value;
  const course = document.getElementById("course").value;
  const state = document.getElementById("state").value;
  const img = document.getElementById("previewImg").src;

  pdf.text("Admission Form", 20, 20);
  pdf.text(`Name: ${name}`, 20, 30);
  pdf.text(`Phone: ${phone}`, 20, 40);
  pdf.text(`Gender: ${gender}`, 20, 50);
  pdf.text(`Course: ${course}`, 20, 60);
  pdf.text(`State: ${state}`, 20, 70);

  if (img) {
    pdf.addImage(img, "JPEG", 20, 80, 40, 40);
  }

  const pdfBlob = pdf.output("blob");
  const pdfURL = URL.createObjectURL(pdfBlob);

  // WhatsApp message
  const businessNumber = "234XXXXXXXXXX";
  const encodedText = encodeURIComponent(`New Registration:\n${name}\n${phone}\nCourse: ${course}\nPDF Attached ➜`);
  window.open(`https://wa.me/${businessNumber}?text=${encodedText}%0A${pdfURL}`, "_blank");
}