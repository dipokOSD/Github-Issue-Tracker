const createElement = (labels) => {
  return labels
    .map((label) => {
      if (label.toLowerCase() === "bug") {
        return `<button class="bg-[#FECACA] text-[#EF4444] px-4 py-1 rounded-2xl">${label}</button>`;
      } else {
        return `<button class="bg-[#FFF8DB] text-[#D97706] px-4 py-1 rounded-2xl">${label}</button>`;
      }
    })
    .join(" ");
};

const showLoading = () => {
  const loading = document.getElementById("loading-spinner");
  loading.classList.remove("hidden");
};
const hideLoading = () => {
  const loading = document.getElementById("loading-spinner");
  loading.classList.add("hidden");
};

const getPriorityClass = (priority) => {
  if (priority.toUpperCase() === "high".toUpperCase()) {
    return "bg-red-100 text-red-500";
  } else if (priority.toUpperCase() === "medium".toUpperCase()) {
    return "bg-yellow-100 text-yellow-500";
  } else {
    return "bg-gray-100 text-gray-500";
  }
};

const updateTotalIssues=(count)=>{
    const total=document.getElementById("total-issues")
    total.innerText=`${count} Issues`
}

let allIssues = [];
const removeActive=()=>{
  const labelBnt=document.querySelectorAll(".label-btn")
  console.log(labelBnt);
  labelBnt.forEach((btn)=>btn.classList.remove("active"))
}
removeActive()

const lodeAllIssue = async () => {
  showLoading();
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  allIssues = data.data;
  hideLoading();
  updateTotalIssues(allIssues.length);
  displayAllIssue(allIssues);
  removeActive()

  const buttons = document.querySelectorAll(".label-btn");
  buttons.forEach(btn => {
    if (btn.innerText.toLowerCase() === "all") {
      btn.classList.add("active");
    }
  });
};
lodeAllIssue();

const displayAllIssue = (issues) => {
  const allIssuesContainar = document.getElementById("all-issues-containar");
  allIssuesContainar.innerHTML = "";

  issues.forEach((issue) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div onclick="loadModal(${issue.id})" class="bg-white shadow-2xl rounded-2xl overflow-hidden h-full flex flex-col ">

                <div class="${issue.status === "open" ? "bg-green-500" : "bg-purple-500"} h-2 w-full"></div>
                    <div class="flex justify-between px-4 pt-4">
                        <img src="./assets/Open-Status.png" alt="">
                       
                        <p class="${getPriorityClass(issue.priority)} px-4 rounded-2xl">
                            ${issue.priority.toUpperCase()}
                        </p>

                    </div>
                    <div class="space-y-3 p-4">
                        <h2 class="text-2xl font-bold text-justify">${issue.title}</h2>
                        <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
                    </div>
                    <div class="flex gap-3 p-4">
                        ${createElement(issue.labels)}
                    </div>
                    <hr class="text-gray-200 ">
                    <div class="text-[#64748B] p-4">
                        <p>#${issue.id} by ${issue.author}</p>
                        ${new Date(issue.createdAt).toLocaleDateString()}
                    </div>
                </div>
                
                </div>
        `;

    allIssuesContainar.appendChild(card);
  });
};

const loadModal = async (id) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  displayDetails(data.data);
};

const displayDetails = (modal) => {
  const modalContainar = document.getElementById("issue-containar");
  modalContainar.innerHTML = `
    <div class="space-y-4">
                        <h3 class="text-2xl font-bold">${modal.title}</h3>
                        <div class="flex gap-5">
                            <button class="${modal.status === "open" ? "bg-green-500" : "bg-purple-500"} text-white outline-none px-3 rounded-2xl">${modal.status}</button>
                            <p class="text-gray-400">${modal.author}</p>
                             <p class="text-gray-400">${new Date(modal.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div class="flex gap-3">
                               

                        <div class="flex gap-3 p-4">
                                            ${createElement(modal.labels)}
                        </div>

                        </div>
                        <p class="text-gray-400">${modal.description}</p>
                        <div class="bg-gray-100 p-5 flex gap-30 rounded-2xl ">
                            <div class="space-y-2">
                                <p class="text-gray-400">Assignee:</p>
                                <h3 class="text-2xl font-bold">${modal.assignee.toUpperCase()}</h3>
                            </div>

                            <div class="space-y-2">
                                <p class="text-gray-400">Priority:</p>
                                <p class="${getPriorityClass(modal.priority)} px-4 rounded-2xl">
                                     ${modal.priority.toUpperCase()}
                                 </p>
                            </div>
                        </div>
                    </div>
    `;
  document.getElementById("issue_modal").showModal();
};

const filterIssues = (type) => {
  showLoading();
  removeActive()

  const buttons = document.querySelectorAll(".label-btn");
  buttons.forEach(btn => {
    if (btn.innerText.toLowerCase() === type) {
      btn.classList.add("active");
    }
  });

  if (type === "all") {
    displayAllIssue(allIssues);

  } else {
    const filtered = allIssues.filter((i) => i.status === type);
    displayAllIssue(filtered);
  }
  hideLoading();
};

document.getElementById("btn-search").addEventListener("click",()=>{
  const input=document.getElementById("input-search")
  const searchValu=input.value.trim().toLowerCase() ;
  console.log(searchValu);

   const filterdata=allIssues.filter(issue=>
    issue.title.toLowerCase().includes(searchValu)||
    issue.description.toLowerCase().includes(searchValu)||
    issue.author.toLowerCase().includes(searchValu)
   
  )
   displayAllIssue(filterdata)
  })








