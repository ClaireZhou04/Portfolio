


const d = new Date();
 console.log(d);
  
 let day = d.getDay();
  
  const pics = ["./Images/0.jpg", "./Images/1.jpg", "./Images/2.jpg", "./Images/3.jpg", "./Images/4.jpg", "./Images/5.jpg", "./Images/6.jpg"];

  
 let day2;
  
 day2 = day; 
  
   console.log(day);
  

if(day == 1){
  document.getElementById('output').innerHTML = 'Today is Monday';
  document.getElementById('img_output').innerHTML= '<img src='+ pics[1]+'>';
  
 } else if (day == 0) {
   document.getElementById('output').innerHTML = 'Today is Sunday, have a rest!';
   document.getElementById('img_output').innerHTML= '<img src='+ pics[0]+'>';
} else if (day == 2) {
   document.getElementById('output').innerHTML = 'Today is Tuesday';
   document.getElementById('img_output').innerHTML= '<img src='+ pics[2]+'>';
} else if (day == 3) {
   document.getElementById('output').innerHTML = 'Today is Wednesday';
  document.getElementById('img_output').innerHTML= '<img src='+ pics[3]+'>';
} else if (day == 4) {
   document.getElementById('output').innerHTML = 'Today is Thursday';
  document.getElementById('img_output').innerHTML= '<img src='+ pics[4]+'>';
} else if (day == 5) {
   document.getElementById('output').innerHTML = 'Today is Friday';
  document.getElementById('img_output').innerHTML= '<img src='+ pics[5]+'>';
} else if (day == 6) {
   document.getElementById('output').innerHTML = 'Today is Saturday, have a rest!';
  document.getElementById('img_output').innerHTML= '<img src='+ pics[6]+'>';
} else {
  document.getElementById('output').innerHTML = null;
}
  
      
document.getElementById('button1').addEventListener('click', function(){
          
console.log('clicked');
document.getElementById('header1').innerHTML = 'Alternate title: How does the Media Affect Us';

});

document.getElementById('button2').addEventListener('click', function(){
          
console.log('clicked');

document.getElementById('header1').style.backgroundColor = 'white'
       
});

document.getElementById('button3').addEventListener('click', function(){
          
console.log('clicked');
document.getElementById('i3').src= "./Images/new_phone.png";
       
});