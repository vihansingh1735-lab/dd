
const API="http://2.56.246.81:30085";
const KEY="pbot_9F3kA2XvR7QmLw8Z";

fetch(API+"/api/guilds",{headers:{"x-api-key":KEY}})
.then(r=>r.json())
.then(gs=>{
 const s=document.getElementById("guilds");
 gs.forEach(g=>{
  const o=document.createElement("option");
  o.value=g.id;o.text=g.name;s.add(o);
 });
 s.onchange=()=>load(s.value);
 load(s.value);
});

function load(id){
 fetch(`${API}/api/premium?guildId=${id}`,{headers:{"x-api-key":KEY}})
 .then(r=>r.json())
 .then(d=>{
  document.getElementById("premium").innerText=d.premium?"⭐ Premium":"Free";
  if(d.premium) document.getElementById("automod").classList.remove("locked");
 });
}

function save(){
 const id=document.getElementById("guilds").value;
 const spam=document.getElementById("spam").value;
 fetch(API+"/api/automod",{
  method:"POST",
  headers:{
   "Content-Type":"application/json",
   "x-api-key":KEY
  },
  body:JSON.stringify({guildId:id,spamLimit:spam})
 });
}
