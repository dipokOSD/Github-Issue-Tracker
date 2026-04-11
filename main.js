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
        
        `
        allIssuesContainar.appendChild(card)
        
    });
}