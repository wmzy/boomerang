document.onreadystatechange = function () {
  if(document.readyState == 'complete') {
    var editor = document.getElementById('editor');
    console.log(editor);
  }
};
