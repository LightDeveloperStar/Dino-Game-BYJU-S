var Student1;
var Student2;
function setup() {
  createCanvas(400,400);
  Student1 = new Student("Lucas", 12, 7);
  Student1.display();
  Student2 = new Student("Light", 12, 7);
  Student2.display();
}

function draw() 
{
  background(30);
  
}