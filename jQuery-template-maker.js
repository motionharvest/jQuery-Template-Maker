/*

The MIT License (MIT)

Copyright (c) 2014 Aaron Sherrill

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

function TemlateMaker(stringTemplate, contentObject){
  var $template = $(stringTemplate);
  var areas = stringTemplate.match(/{{\s*[\w\.]+\s*}}/g);
  var $elements = [];
  var $tmpElem;
  var props = contentObject;
  for(var i = 0; i < areas.length; i++){
    $tmpElem = $($template.find("*:contains('"+areas[i]+"')"));
    $tmpElem.tag = areas[i];
    $tmpElem.shortName = areas[i].substr(2, areas[i].length - 4);
    $tmpElem.defaultValue = $tmpElem.html();
    $tmpElem.html($tmpElem.defaultValue.replace($tmpElem.tag, props[$tmpElem.shortName]));
    $elements.push($tmpElem);
  }
  $template.find("[on-click]").each(function(e){
    var self = $(this);  
    self.click(function(e){
        e.preventDefault();
        props[self.attr('on-click')](e);
      });
    });
  $template.update = function(data){
    props = $.extend({}, props, data);
    for(var d in props){
      for(var i = 0; i < $elements.length; i++){
        $tmpElem = $elements[i];
        if($tmpElem.shortName === d){
          $tmpElem.html($tmpElem.defaultValue.replace($tmpElem.tag, props[d]));
        }
      }
    }        
  };
  return $template;
  
}
