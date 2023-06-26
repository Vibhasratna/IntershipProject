const logoInput = document.getElementById('logoInput');
const logoPreview = document.getElementById('logoPreview');

logoInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        logoPreview.src = e.target.result;
    }

    reader.readAsDataURL(file);
});


const addQuestionButton = document.getElementById('addQuestionButton');
const questionSection = document.getElementById('questionSection');

let questionCount = 1;

addQuestionButton.addEventListener('click', function () {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('section');
    questionDiv.innerHTML = `
        <h2>Question ${questionCount}</h2>
        <textarea class="questionInput" rows="4" placeholder="Enter question"></textarea>
        <input type="text" class="marksInput" placeholder="Enter marks">
    `;

    questionSection.appendChild(questionDiv);
    questionCount++;
});

const downloadButton = document.getElementById('downloadButton');
const questionForm = document.getElementById('questionForm');

downloadButton.addEventListener('click', function () {
    const pdf = new jsPDF();

    const logoDataUrl = logoPreview.src;
    if (logoDataUrl) {
        pdf.addImage(logoDataUrl, 'PNG', 10, 10, 40, 40);
    }

    const programName = document.getElementById('programNameInput').value;
    const school = document.getElementById('schoolInput').value;
    const courseCode = document.getElementById('courseCodeInput').value;
    const subject = document.getElementById('subjectInput').value;
    const marks = document.getElementById('marksInput').value;
    const timing = document.getElementById('timingInput').value;

    pdf.text(`Program Name: ${programName}`, 60, 20);
    pdf.text(`School: ${school}`, 60, 30);
    pdf.text(`Course Code: ${courseCode}`, 60, 40);
    pdf.text(`Subject: ${subject}`, 60, 50);
    pdf.text(`Marks: ${marks}`, 60, 60);
    pdf.text(`Timing: ${timing}`, 60, 70);

    const instructions = document.getElementById('instructionsInput').value;
    pdf.text('Instructions:', 10, 90);
    pdf.text(instructions, 10, 100);

    const questionInputs = document.getElementsByClassName('questionInput');
    const marksInputs = document.getElementsByClassName('marksInput');

    let yPosition = 130;

    pdf.text('Questions:', 10, yPosition);

    for (let i = 0; i < questionInputs.length; i++) {
        const question = questionInputs[i].value;
        const marks = marksInputs[i].value;

        pdf.text(`Q${i + 1}: ${question} (${marks} marks)`, 10, yPosition + 10);
        yPosition += 20;
    }

    pdf.save('question_paper.pdf');
});
