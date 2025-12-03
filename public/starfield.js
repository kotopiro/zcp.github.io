export function createStarfield(targetWindow){
  const html = `
<canvas id="starCanvas"></canvas>
<script>
const canvas = document.getElementById('starCanvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const ctx=canvas.getContext('2d');
const stars=[];
for(let i=0;i<200;i++){
  stars.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.5+0.5,speed:Math.random()*0.5+0.2});
}
function animate(){
  ctx.fillStyle="black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="white";
  stars.forEach(s=>{
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill();
    s.y+=s.speed;
    if(s.y>canvas.height) s.y=0;
  });
  requestAnimationFrame(animate);
}
animate();
</script>`;
  targetWindow.document.body.insertAdjacentHTML('afterbegin', html);
}
