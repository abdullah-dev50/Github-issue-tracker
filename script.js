const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

const container = document.getElementById("issuesContainer")
const spinner = document.getElementById("spinner")

let allIssues = []

async function loadIssues(type){

spinner.classList.remove("hidden")

const res = await fetch(API)
const data = await res.json()

allIssues = data.data

let issues = allIssues

if(type === "open"){
issues = allIssues.filter(i => i.status === "open")
}

if(type === "closed"){
issues = allIssues.filter(i => i.status === "closed")
}

displayIssues(issues)

document.getElementById("issueCount").innerText =
issues.length + " Issues"

setActiveTab(type)

spinner.classList.add("hidden")

}

function displayIssues(issues){

container.innerHTML = ""

issues.forEach(issue=>{

const card = document.createElement("div")

const borderColor =
issue.status === "open"
? "border-green-500"
: "border-purple-500"

card.className =
`bg-white shadow rounded-lg border-t-4 ${borderColor} p-4 cursor-pointer`

card.innerHTML = `

<h3 class="font-bold mb-2">${issue.title}</h3>

<p class="text-sm text-gray-500 mb-2">
${issue.description.slice(0,80)}...
</p>

<p>Status: ${issue.status}</p>
<p>Author: ${issue.author}</p>
<p>Priority: ${issue.priority}</p>
<p>Label: ${issue.label}</p>

`

card.onclick = ()=>showModal(issue)

container.appendChild(card)

})

}

function showModal(issue){

document.getElementById("modalTitle").innerText = issue.title

document.getElementById("modalDesc").innerText =
issue.description

document.getElementById("modalInfo").innerText =

`Author: ${issue.author}
Priority: ${issue.priority}
Label: ${issue.label}
Created: ${issue.createdAt}`

issueModal.showModal()

}

function setActiveTab(tab){

document.querySelectorAll(".tabBtn").forEach(btn=>{

btn.classList.remove("bg-blue-700","text-white")
btn.classList.add("bg-white","text-black")

})

const activeBtn = document.getElementById(`tab-${tab}`)

activeBtn.classList.remove("bg-white","text-black")
activeBtn.classList.add("bg-blue-700","text-white")

}

loadIssues("all")

// ENTER PRESS SEARCH

document
.getElementById("searchInput")
.addEventListener("keypress", function(e){

if(e.key === "Enter"){
searchIssue()
}

})

async function searchIssue(){

const text =
document.getElementById("searchInput").value

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
)

const data = await res.json()

displayIssues(data.data)

document.getElementById("issueCount").innerText =
data.data.length + " Issues"

}