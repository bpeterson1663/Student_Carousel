//create a global counter variable that will reference each student
var counter = 0;
var maxPeople = 0; //total length of the array
var kappaStudent = {}; //will store the entire kappaStudent information that is returned from the ajax call
var timer;//stores the interval timer to be able to reset it if the next button gets caled
$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        appendDom(data);
      }
  });//End Ajax call
  //Append the buttons to the DOM
  $('.navigation').append('<button type="button" class="previous btn btn-primary btn-large">Previous</button>');
  $('.navigation').append('<button type="button" class="next btn btn-primary btn-large">Next</button>');
  //Listeners for the buttons
  $('.navigation').on('click', '.next', nextPerson);
  $('.navigation').on('click', '.previous', prevPerson);

});
//Initial load to the dom and set the data from the ajax call to the global variable
function appendDom(person){
    //start the interval timer
    timer = setInterval(createTimer, 10000);
    //stores the kappa array into the kappaStudent
    kappaStudent = person.kappa;

      $('.peopleContainer').append('<div class="person"></div>');
      //load first Kappa Student
      var $el = $('.peopleContainer').children().last();
      $el.append('<p class="lead"><strong>Name:</strong> ' + kappaStudent[counter].name + '</p>');
      $el.append('<p class="lead"><strong>Location:</strong> ' + kappaStudent[counter].location + '</p>');
      $el.append('<p class="lead"><strong>Spirit Animal:</strong> ' + kappaStudent[counter].spirit_animal + '</p>');
      $el.append('<p class="lead"><strong>Shoutout:</strong> ' + kappaStudent[counter].shoutout + '</p>');
      //sets a reference to the number of people and minus one to account for zero index
    maxPeople = kappaStudent.length - 1;

}
//Next Person Button
function nextPerson(){
  //Check to see if we have reached the last person and if so start the counter back to zero
  if(counter >= maxPeople){
    $('.person').fadeOut("slow",function(){$(this).remove();});//remove current person from the DOM
    counter = 0;
  }else{//if we havent reached the last, remove current person and increase counter variable by one
    $('.person').fadeOut("slow",function(){$(this).remove();});
    counter++;
  }
  clearInterval(timer);//clear the timer and reset it
  changePerson();//call the changePerson function to move on to the next
}
//Previous Button
function prevPerson(){
  //check to see if we are at the first person
  if(counter == 0){
    $('.person').fadeOut("slow",function(){$(this).remove();}); //if we are remove current person and set the counter to the last person which is maxPeople
    counter = maxPeople;
  }
  else{
    $('.person').fadeOut("slow",function(){$(this).remove();});//otherwise remove current person and decrease counter by one
    counter--;
  }
  clearInterval(timer);//cleaer the timer
  changePerson();//call the changerPerson fuction to move to the previous person
}

//Function to change the DOM when the Previous and Next Button are called
function changePerson(){
  $('.peopleContainer').append('<div class="person"></div>');
  //Adds the next or previous person
  var $el = $('.peopleContainer').children().last();
  $el.append('<p class="lead"><strong>Name:</strong> ' + kappaStudent[counter].name + '</p>').hide().fadeIn("slow");
  $el.append('<p class="lead"><strong>Location:</strong> ' + kappaStudent[counter].location + '</p>').hide().fadeIn("slow");
  $el.append('<p class="lead"><strong>Spirit Animal:</strong> ' + kappaStudent[counter].spirit_animal + '</p>').hide().fadeIn("slow");
  $el.append('<p class="lead"><strong>Shoutout:</strong> ' + kappaStudent[counter].shoutout + '</p>').hide().fadeIn("slow");
  timer = setInterval(createTimer, 10000); //recalls the setInterval Timer once the new person is added
}
//Calls the nextPerson function after 10 seconds
function createTimer(){
  nextPerson();
}
