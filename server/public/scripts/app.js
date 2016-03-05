//create a global counter variable that will reference each student
var counter = 0;
var maxPeople = 0;

$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        appendDom(data);
      }
  });//End Ajax call

  $('.container').append('<button class="previous">Previous</button>');
  $('.container').append('<button class="next">Next</button>');

  $('.container').on('click', '.next', nextPerson);
  $('.container').on('click', '.previous', prevPerson);
});
    //Append to the DOM the person class and the next and previous buttons
function appendDom(person){

    var kappaStudent = person.kappa;
      $('.container').append('<div class="person'+counter+'"></div>');
      //load first Kappa Student
      var $el = $('.container').children().last();
      $el.append('<p>Name: ' + kappaStudent[counter].name + '</p>');
      $el.append('<p>Location: ' + kappaStudent[counter].location + '</p>');
      $el.append('<p>Spirit Animal: ' + kappaStudent[counter].spirit_animal + '</p>');
      $el.append('<p>Shoutout: ' + kappaStudent[counter].shoutout + '</p>');

    for (var i = 1; i < kappaStudent.length; i++) {
      $('.container').append('<div class="person'+i+'"></div>');
      //load first Kappa Student
      var $el = $('.container').children().last();
      $el.append('<p>Name: ' + kappaStudent[i].name + '</p>').hide();
      $el.append('<p>Location: ' + kappaStudent[i].location + '</p>').hide();
      $el.append('<p>Spirit Animal: ' + kappaStudent[i].spirit_animal + '</p>').hide();
      $el.append('<p>Shoutout: ' + kappaStudent[i].shoutout + '</p>').hide();
    }

    maxPeople = kappaStudent.length - 1;
    console.log(maxPeople);
}

function nextPerson(){
  if(counter < maxPeople){
    $('.person'+counter).hide();
    counter++;
    $('.person'+counter).show();
  }
  if(counter >= maxPeople){
    $('.person'+counter).hide();
    counter = 0;
    $('.person'+counter).show();
  }
  console.log("Count: " + counter);
}

function prevPerson(){
  if(counter < maxPeople){
    $('.person'+counter).hide();
    counter--;
    $('.person'+counter).show();
  }
  if(counter == 0){
    $('.person'+counter).hide();
    counter = maxPeople;
    $('.person'+counter).show();
    counter--;
  }
  console.log("Count: " + counter);
}
