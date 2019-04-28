


   var data = $.get('/test')
    .done(function(data){
      return data;
    })
    .fail(function(){
      console.log("ERROR!");
    });


    console.log(data)


<script>

var sound = new Howl({ src: ['../sounds/pinwheel.mp3'] });

sound.play();

</script>


<div class="container">
                <div class="alert alert-danger d-flex justify-content-between" role="alert">
                        Die Preise haben sich verändert!!
                        <a class="btn btn-primary" id="resetBtn"  href="/reset">OK</a>
                </div>
         </div>       
           

    








