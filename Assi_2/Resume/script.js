// script.js
const form = document.getElementById('resumeForm');
const preview = document.getElementById('resumePreview');

const updatePreview = () => {
    const fullName = document.getElementById('fullName').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const skills = document.getElementById('skills').value;

    let html = `\n<b>${fullName}</b>\n${address}\n${phone} | ${email}\n${linkedin}\n${github}\n\n<b>Education</b>\n${getSectionHTML('education')}`;
    html += `\n\n<b>Experience</b>\n${getSectionHTML('experience')}`;
    html += `\n\n<b>Projects</b>\n${getSectionHTML('project')}`;
    html += `\n\n<b>Technical Skills</b>\n${skills}`;
    html += `\n\n<b>Leadership / Extracurricular</b>\n${getSectionHTML('leadership')}`;

    preview.innerText = html;
    updateProgressBar();
};

const getSectionHTML = (section) => {
    const sectionDiv = document.getElementById(`${section}Section`);
    return Array.from(sectionDiv.children).map(div => div.querySelector('textarea').value).join('\n');
};

const addSection = (type) => {
    const container = document.getElementById(`${type}Section`);
    const wrapper = document.createElement('div');
    wrapper.classList.add('resume-entry');

    const textarea = document.createElement('textarea');
    textarea.placeholder = `Enter ${type} details...`;
    textarea.oninput = updatePreview;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => textarea.removeAttribute('readonly');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => { wrapper.remove(); updatePreview(); };

    wrapper.appendChild(textarea);
    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    container.appendChild(wrapper);

    textarea.focus();
};

const clearForm = () => {
    form.reset();
    ['education', 'experience', 'project', 'leadership'].forEach(type => {
        document.getElementById(`${type}Section`).innerHTML = '';
    });
    preview.innerHTML = '';
    updateProgressBar();
};

const updateProgressBar = () => {
    const fields = document.querySelectorAll('#resumeForm input, #resumeForm textarea');
    let filled = 0;
    fields.forEach(field => { if (field.value.trim()) filled++; });
    const percent = (filled / fields.length) * 100;
    document.getElementById("progressBar").style.width = `${percent}%`;
};

form.addEventListener('input', updatePreview);
window.onload = () => updatePreview();
