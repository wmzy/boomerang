import URLON from 'URLON';
document.addEventListener('DOMContentLoaded', function () {
  var editor = document.getElementById('editor');
  var output = document.getElementById('output');

  editor.addEventListener('change', () => {
    try {
      var str = URLON.stringify(JSON.parse(editor.value));
      var link = 'http://localhost:3000/raw/' + str;
      console.log(link);
      output.href = link;
      output.innerText = link;
    } catch (e) {
      output.href = '#';
      output.innerText = '#'
    }
  })
});
