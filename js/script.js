const DEPARTMENTS=[
{id:"cs",name:"Computer Science",block:"Block A",color:"#1f4fd8",head:"Dr. Ayesha Malik",email:"cs@campusconnect.edu",blurb:"Software, data and security, taught with a lab in every semester.",programmes:"BS Computer Science, BS Data Science, MS Computer Science"},
{id:"bus",name:"Business Administration",block:"Block B",color:"#b4530a",head:"Prof. Imran Qureshi",email:"business@campusconnect.edu",blurb:"Management, marketing and finance with real case work and internships.",programmes:"BBA, MBA, MS Accounting & Finance"},
{id:"ee",name:"Electrical Engineering",block:"Block C",color:"#c62839",head:"Dr. Farhan Siddiqui",email:"ee@campusconnect.edu",blurb:"Power, electronics and communications, from circuits to systems.",programmes:"BS Electrical Engineering, MS Electronics"},
{id:"ls",name:"Life Sciences",block:"Block D",color:"#1e8e5a",head:"Dr. Sana Rafiq",email:"lifesciences@campusconnect.edu",blurb:"Biology, biotechnology and environmental science in modern research labs.",programmes:"BS Biotechnology, BS Environmental Science"},
{id:"ssh",name:"Social Sciences & Humanities",block:"Block E",color:"#7a3fb5",head:"Prof. Nadia Hussain",email:"ssh@campusconnect.edu",blurb:"Psychology, English and media studies focused on people and society.",programmes:"BS Psychology, BA English, BS Media Studies"}];

const COURSES=[
["CS101","Programming Fundamentals","cs",3,"Year 1","Fall"],
["CS210","Data Structures & Algorithms","cs",4,"Year 2","Spring"],
["CS340","Database Systems","cs",3,"Year 3","Fall"],
["BUS110","Principles of Management","bus",3,"Year 1","Fall"],
["BUS230","Marketing Essentials","bus",3,"Year 2","Spring"],
["BUS320","Corporate Finance","bus",3,"Year 3","Fall"],
["EE120","Circuit Analysis","ee",4,"Year 1","Spring"],
["EE305","Digital Signal Processing","ee",3,"Year 3","Fall"],
["LS150","Cell Biology","ls",4,"Year 1","Fall"],
["LS260","Environmental Science","ls",3,"Year 2","Spring"],
["SSH101","Introduction to Psychology","ssh",3,"Year 1","Fall"],
["SSH240","Media & Society","ssh",3,"Year 2","Spring"]];

const deptByIdR=id=>DEPARTMENTS.find(d=>d.id===id);

// Departments page
const grid=document.getElementById("dept-grid");
if(grid){
  grid.innerHTML=DEPARTMENTS.map(d=>`
  <article class="card" style="--c:${d.color}">
    <span class="tag">${d.block}</span>
    <h3>${d.name}</h3>
    <p>${d.blurb}</p>
    <p><strong>Programmes:</strong> ${d.programmes}</p>
    <p><strong>Head:</strong> ${d.head}<br><a href="mailto:${d.email}">${d.email}</a></p>
    <p><a href="courses.html?dept=${d.id}">See ${d.name} courses</a></p>
  </article>`).join("");
}

// Courses page
const body=document.getElementById("course-body");
if(body){
  const q=document.getElementById("q"),sel=document.getElementById("dept"),count=document.getElementById("count");
  sel.innerHTML='<option value="">All departments</option>'+DEPARTMENTS.map(d=>`<option value="${d.id}">${d.name}</option>`).join("");
  const params=new URLSearchParams(location.search);
  q.value=params.get("q")||"";sel.value=params.get("dept")||"";
  function render(){
    const term=q.value.trim().toLowerCase();
    const rows=COURSES.filter(c=>(!sel.value||c[2]===sel.value)&&(c[0]+" "+c[1]).toLowerCase().includes(term));
    body.innerHTML=rows.length?rows.map(c=>{const d=deptById(c[2]);
      return `<tr><td>${c[0]}</td><td>${c[1]}</td><td><span class="dot" style="--c:${d.color}"></span>${d.name}</td><td>${c[3]}</td><td>${c[4]}</td><td>${c[5]}</td></tr>`}).join("")
      :'<tr><td colspan="6" class="empty">No courses match. Clear the search or choose "All departments".</td></tr>';
    count.textContent=`${rows.length} of ${COURSES.length} courses shown`;
  }
  q.addEventListener("input",render);sel.addEventListener("change",render);render();
}

// Enquiry form validation
const form=document.getElementById("enquiry");
if(form){
  const rules={
    name:v=>v.trim().length<2?"Enter your full name (at least 2 characters).":"",
    email:v=>!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?"Enter a valid email address, like name@example.com.":"",
    topic:v=>!v?"Choose what your enquiry is about.":"",
    message:v=>v.trim().length<15?"Write at least 15 characters so we can help you properly.":""};
  const msg=document.getElementById("form-msg");
  const check=f=>{const e=rules[f.name](f.value);
    f.classList.toggle("invalid",!!e);
    document.getElementById(f.name+"-err").textContent=e;return !e};
  const fields=[...form.querySelectorAll("[name]")];
  fields.forEach(f=>f.addEventListener("blur",()=>check(f)));
  form.addEventListener("submit",ev=>{
    ev.preventDefault();
    const ok=fields.map(check).every(Boolean);
    if(!ok){msg.className="msg bad";msg.textContent="Please fix the highlighted fields and send again.";
      form.querySelector(".invalid").focus();return}
    msg.className="msg ok";
    msg.textContent=`Thanks, ${form.name.value.trim()}. Your enquiry was sent. We will reply to ${form.email.value.trim()} within 2 working days.`;
    form.reset();
  });
}
