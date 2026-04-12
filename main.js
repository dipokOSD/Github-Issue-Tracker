const lodeAllIssue=async()=>{
    const res=await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data=await res.json()
    displayAllIssue(data.data);
}
lodeAllIssue()
const displayAllIssue=(issues)=>{
    const allIssuesContainar=document.getElementById("all-issues-containar")
    // allIssuesContainar.innerHTML=""

    issues.forEach(issue => {
        const card=document.createElement("div")
        card.innerHTML=`
        <div class="bg-white shadow-2xl rounded-2xl ">
                    <div class="flex justify-between px-4 pt-4">
                        <img src="./assets/Open-Status.png" alt="">
                        <p class="bg-amber-200 px-4 rounded-2xl">${issue.priority}</p>
                    </div>
                    <div class="space-y-3 p-4">
                        <h2 class="text-2xl font-bold text-justify">${issue.title}</h2>
                        <p class="text-[#64748B]">${issue.description}</p>
                    </div>
                    <div class="flex gap-3 p-4">
                        <button class="bg-[#faeded] px-3 py-1 text-[#EF4444] rounded-2xl"><i class="fa-solid fa-bug"></i> BUG</button>
                        <button class="bg-[#f5ecc7] px-3 py-1 text-[#D97706] rounded-2xl"><i class="fa-regular fa-life-ring"></i> HELP WANTED</button>
                    </div>
                    <hr class="text-gray-200 ">
                    <div class="text-[#64748B] p-4">
                        <p>#${issue.id} by john_doe</p>
                        <p>${issue.createdAt}</p>
                    </div>
                </div>
        `
        allIssuesContainar.appendChild(card)
        
    });
}