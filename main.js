const createElement=(labels)=>{
    return labels
      .map((label)=>{
        if (label.toLowerCase() === "bug") {
        return `<button class="bg-[#FECACA] text-[#EF4444] px-4 py-1 rounded-2xl">${label}</button>`;
      } else {
        return `<button class="bg-[#FFF8DB] text-[#D97706] px-4 py-1 rounded-2xl">${label}</button>`;
      }
    }).join(" ");
}

const showLoading=()=>{
    const loading=document.getElementById("loading-spinner")
    loading.classList.remove("hidden")
}
const hideLoading=()=>{
    const loading=document.getElementById("loading-spinner")
    loading.classList.add("hidden")
}

let allIssues = [];
const lodeAllIssue = async () => {
    showLoading()
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  allIssues = data.data;
  hideLoading()
  displayAllIssue(allIssues);
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
                        <p class="bg-amber-200 px-4 rounded-2xl">${issue.priority}</p>
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
                                <button class="bg-[#EF4444] px-4 py-1 text-white outline-none  rounded-2xl">${modal.priority}</button>
                            </div>
                        </div>
                    </div>
    `;
  document.getElementById("issue_modal").showModal();
};

const filterIssues = (type) => {
    showLoading();
  if (type === "all") {
    displayAllIssue(allIssues);
    
  } else {
    const filtered = allIssues.filter((i) => i.status === type);
    displayAllIssue(filtered);
  }
  hideLoading();
};
