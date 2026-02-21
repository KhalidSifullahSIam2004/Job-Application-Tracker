<<<<<<< HEAD
1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer:

id:Get one element by its unique ID.
=======
Answer to the Q.No-1
id:
Get one element by its unique ID.
>>>>>>> 1f496ce22ca8c0dc871b0412c14bdb01676775b0

example:
<div id="header">Hello</div>

const header = document.getElementById('header');


<<<<<<< HEAD
class:Get all elements that have a specific class.
=======
class:
Get all elements that have a specific class.
>>>>>>> 1f496ce22ca8c0dc871b0412c14bdb01676775b0

example:
<div class="item">A</div>
<div class="item">B</div>

const items = document.getElementsByClassName('item');


<<<<<<< HEAD
querySelector:Select elements using any CSS selector.
=======
querySelector:
Select elements using any CSS selector.
>>>>>>> 1f496ce22ca8c0dc871b0412c14bdb01676775b0

example:
<div class="item">A</div>
<div class="item">B</div>

const firstItem = document.querySelector('.item');


<<<<<<< HEAD
querySelectorAll:Select all matching elements.
=======
querySelectorAll:
Select all matching elements.
>>>>>>> 1f496ce22ca8c0dc871b0412c14bdb01676775b0

example:
<div class="item">A</div>
<div class="item">B</div>

const allItems = document.querySelectorAll('.item');


<<<<<<< HEAD

2. How do you create and insert a new element into the DOM?

Answer:

Create a new element, set its content, and attach it to a parent.

example:
<div id="container"></div>

<script>
  const h1 = document.createElement('h1'); 
  h1.textContent = "Hello World";           
  document.getElementById('container').appendChild(h1);
</script>



3. What is Event Bubbling? And how does it work?

Answer:

=======


Answer to the Q.No-2
Create a new element, set its content, and attach it to a parent.

example:
<div id="container"></div>

<script>
  const h1 = document.createElement('h1'); 
  h1.textContent = "Hello World";           
  document.getElementById('container').appendChild(h1);
</script>





Answer to the Q.No-3
>>>>>>> 1f496ce22ca8c0dc871b0412c14bdb01676775b0
Event Bubbling is a way events travel up the DOM tree.

example:
<div id="parent">
  <button id="child">Click Me</button>
</div>

<script>
  document.getElementById('child').addEventListener('click', function() {
    alert("Child clicked!");
  });

  document.getElementById('parent').addEventListener('click', function() {
    alert("Parent clicked!");
  });
</script>



<<<<<<< HEAD
4. What is Event Delegation in JavaScript? Why is it useful?

Answer:

Event Delegation in JavaScript is when we attach a single event listener to a parent element to handle events on its child elements.

It saves memory, works for new dynamically added elements, and keeps our code clean and easy to manage.



5. What is the difference between preventDefault() and stopPropagation() methods?

Answer:
=======


Answer to the Q.No-4
Event Delegation in JavaScript is when we attach a single event listener to a parent element to handle events on its child elements.

Why it’s useful: It saves memory, works for new dynamically added elements, and keeps our code clean and easy to manage.





Answer to the Q.No-5
>>>>>>> 1f496ce22ca8c0dc871b0412c14bdb01676775b0
preventDefault() Stops the default browser action for an event.


stopPropagation() Stops the event from bubbling up (or capturing down) the DOM.
