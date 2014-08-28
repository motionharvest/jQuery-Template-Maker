jQuery-Templating-Helper
========================

A small bit of logic for controlling a template by accessing element's node values and click events.


The function's name is **TemplateMaker()**. It takes 2 arguments.

*stringTemplate* - String - A precached, string version of HTML.

*contentObject* - Object - The model and controller grouped together. It holds the values that will overwrite `{{mustache}}` tags.

Click Events
---
This is helpful. Any element that you want to register a mouse click event on, give it a `on-click` data attribute and specify the property name of a function you add to *contentObject*. Here's an example.


HTML

    <script type="text/template" id="sectionTemplate">
       <section>
         <h3>{{title}}</h3>
         <p>{{copy}}</p>
         <a href="#" on-click="clickHandler">{{cta}}</a>
       </section>
    </script>

 
JavaScript

    var sectionTemplate = document.getElementById('sectionTemplate').innerHTML;	
    
    var section1 = TemlateMaker(sectionTemplate, {
	  title: "When Robots Take Over",
	  copy: "This book takes place in the near future. It is told from the perspective of a Facebook Oculus Rift developer working on a site project that ultimately leads to the misuse of virual spacial aware autonomous transportation units take over",
	  clickHandler: function(e){
	    alert("When Robots take Over was added to your cart.");
	  },
	  cta: "Buy Now"	          
	});
    
    $('body').append(section1);

[JSBin Example](http://jsbin.com/rokini/21/edit)

Update Your Template With New Content
---

When you make a template what you get is a jQuery Element. It's ordinary **except** It has 1 handy method added to it.

*update* - Function - Used to update the DOM with a new `contentObject`

**Example**

I'm going to build a simple content rotator. Lets start with the content


    var rotatorContent = [
	  {
	    title: "When Robots Take Over",
	    copy: "This book takes place in the near future. It is told from the perspective of a Facebook Oculus Rift developer working on a site project that ultimately leads to the misuse of virual spacial aware autonomous transportation units take over",
	    clickHandler: function(e){
	      console.log("When Robots take Over was added to your cart.");
	    },
	    cta: "Buy Now"
	  },
	  {
	    title: "Looking at the Stars",
	    copy: "A tough look at why it never pays to structure you life off of what you believe a famous person must live like",
	    clickHandler: function(e){
	      console.log("Looking at the stars was added to your cart.");
	    },
	    cta: "Buy Now"	          
	  }
	];

Now I am going to be alternating between the both of them so I need to know what number I'm on

	var currentSection = 0;
	
Next I'll specify my template. It is easiest if this is a string. You should be able to use `<script>` tags with `type="text/template` but I haven't been able to get it working. Something about [unrecognized expresions](http://stackoverflow.com/questions/14347611/jquery-client-side-template-syntax-error-unrecognized-expression).

	var sectionTemplate = [ '<section>',
	      '<h3>{{title}}</h3>',
	      '<p>{{copy}}</p>',
	      '<a href="#" on-click="clickHandler">{{cta}}</a>',
	   '</section>'].join('\n');

Next we make our template by combining the Template and the Content.
	
	var $rotatorTemplate = TemlateMaker(sectionTemplate, rotatorContent[0]);
	$('body').append($rotatorTemplate);
	
So Lets look at updating the content. I'll use `setInterval` to fire a function every 2000 ms that increments the current number, checks if it's bigger than how many sections there are, and sets it's value back to 0.
	
	setInterval(function(){	  
	  currentSection++;
	  if(currentSection >= rotatorContent.length){
	    currentSection = 0;
	  }
	  	  
	  $rotatorTemplate.update(rotatorContent[currentSection]);	
  
	}, 2000);

It's really that easy. Send it new data to update with, and It will.

[JSBin Example](http://jsbin.com/rokini/25/edit)

Limitations
---
This isn't a mustache replacement. It only works for the content between tags. And elements that implement the `on-click` data attribute. Expanding this library will be a side project.



Wishlist
--
hook up inview to call a "inview" property when the template shows up on the screen - https://github.com/protonet/jquery.inview