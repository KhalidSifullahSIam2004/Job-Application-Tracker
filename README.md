1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer:

id:Get one element by its unique ID.

example:
<div id="header">Hello</div>

const header = document.getElementById('header');


class:Get all elements that have a specific class.

example:
<div class="item">A</div>
<div class="item">B</div>

const items = document.getElementsByClassName('item');


querySelector:Select elements using any CSS selector.

example:
<div class="item">A</div>
<div class="item">B</div>

const firstItem = document.querySelector('.item');


querySelectorAll:Select all matching elements.

example:
<div class="item">A</div>
<div class="item">B</div>

const allItems = document.querySelectorAll('.item');



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



4. What is Event Delegation in JavaScript? Why is it useful?

Answer:

Event Delegation in JavaScript is when we attach a single event listener to a parent element to handle events on its child elements.

It saves memory, works for new dynamically added elements, and keeps our code clean and easy to manage.



5. What is the difference between preventDefault() and stopPropagation() methods?

Answer:
preventDefault() Stops the default browser action for an event.


stopPropagation() Stops the event from bubbling up (or capturing down) the DOM.
