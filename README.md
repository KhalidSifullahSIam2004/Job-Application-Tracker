Answer to the Q.No-1
id:
Get one element by its unique ID.

example:
<div id="header">Hello</div>

const header = document.getElementById('header');


class:
Get all elements that have a specific class.

example:
<div class="item">A</div>
<div class="item">B</div>

const items = document.getElementsByClassName('item');


querySelector:
Select elements using any CSS selector.

example:
<div class="item">A</div>
<div class="item">B</div>

const firstItem = document.querySelector('.item');


querySelectorAll:
Select all matching elements.

example:
<div class="item">A</div>
<div class="item">B</div>

const allItems = document.querySelectorAll('.item');




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





Answer to the Q.No-4
Event Delegation in JavaScript is when we attach a single event listener to a parent element to handle events on its child elements.

Why it’s useful: It saves memory, works for new dynamically added elements, and keeps our code clean and easy to manage.





Answer to the Q.No-5
preventDefault() Stops the default browser action for an event.


stopPropagation() Stops the event from bubbling up (or capturing down) the DOM.
