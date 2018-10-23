$("#uploadboxupload").change(function(){
  document.getElementById("uploadboxsubmit").style.display = "block";
  document.getElementById("blah").style.display = "block";
  readURL(this);
});

function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#blah').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#uploadboxsubmit").click(function(){
  document.getElementById("uploadboxsubmit").style.display = "none";
  document.getElementById("loader").style.display = "block";
});