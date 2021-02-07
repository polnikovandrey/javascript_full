'use strict';       // jshint ignore: line

// FormData is an object, containing a data of the html form. Constructor:
// const formData = new FormData([form]);
// [form] is an optional argument: an html <form> element could be passed, than FormData properties are filled up automatically with <form> data.
// Networking methods (e.g. fetch()) could use a FormData object as a value of a request [body] property. In that case a request Content-Type header automatically
// becomes 'form/multipart' (as like as while sending a regular form POST request).

/*
<form id="formElem">
    <input type="text" name="name" value="John">
    <input type="text" name="surname" value="Smith">
    <input type="submit">
</form>

<script>
    formElem.onsubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/post/user', {
            method: 'POST',
            body: new FormData(formElem)
        };
        const json = await response.json();
        console.log(json.message);
    };
</script>
*/

// The FormData class has some methods to manipulate inner data:
// * formData.append(name, value) - appends a name-value pair to the FormData object. There can be any number of name-value pairs with the same name.
// * formData.set(name, value) - delete all name-value pairs with name provided and appends the name-value pair.
// * formData.append(name, blob, filename) - emulates a choice with an <input type="file"> element.
// * formData.set(name, blob, filename)
// * formData.delete(name)
// * formData.get(name)
// * formData.has(name)

// FormData fields could be iterated with the help of for..of cycle:
/* Commented out since JsNode doesn't support a FormData.
    const formData = new FormData();
    formData.append('key1', 'value1');
    formData.append('key2', 'value2');
    for (let [name, value] of formData) {
        console.log(`${name} = ${value}`);
    }
*/



// Sending a form, containing a File object:
/*
<form id="formElem">
  <input type="text" name="firstName" value="John">
  Картинка: <input type="file" name="picture" accept="image/*">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
      body: new FormData(formElem)
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
*/



// Sending a form, containing a Blob object:
/*
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Отправить" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }
  </script>
</body>
*/