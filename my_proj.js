var isdebug = false;
console.log('Js connected!');

var turn = 1;
var turnH = $('#turn');
var gameOn = false;

function checkWin() {
  for (var i=5; i>0; i--) {
    var tds = $('#row' + i + ' td');
    if (isdebug) {
      console.log("****** Checking row " + i);
    }
    //for (var td of tds) {
    // Checking only first 4 cells in each row
    for (var j = 0; j<4; j++) {
      var current = $(tds[j]).attr('class').split(" ")[1];
      if (isdebug) {
        console.log("current cell class:" + current);
        console.log("j+1 cell class:" + $(tds[j+1]).attr('class').split(" ")[1]);
        console.log("j+2 cell class:" + $(tds[j+2]).attr('class').split(" ")[1]);
        console.log("j+3 cell class:" + $(tds[j+3]).attr('class').split(" ")[1]);
      }
      if (current !== 'make_grey' &&
          current === $(tds[j+1]).attr('class').split(" ")[1] &&
          current === $(tds[j+2]).attr('class').split(" ")[1] &&
          current === $(tds[j+3]).attr('class').split(" ")[1]
        ) {
          if (current === 'make_blue') {
            turnH.text('Player A is won!');
            gameOn = false;
            break;
          } else if (current === 'make_red') {
            turnH.text('Player B is won!');
            gameOn = false;
            break;
          }
        }

      // if (isdebug) {
      //   console.log('td('+i+') = ' + $(td).attr('class')[1]);
      // }
    }

    if (!gameOn) {
      break;
    }
  }

  return false;
}


//Set event on a start button
$('#btnstart').click(function functionName() {
  for (var td of $('td')) {
    turnH.text('A: it is your turn, please pick a column to drop your blue chip.');
    $(td).removeClass("make_blue");
    $(td).removeClass("make_red");
    $(td).removeClass("make_grey");
    $(td).toggleClass("make_grey");
    turn = 1;
    gameOn = true;
  }
})

// Set event to table cells
$('td').click(function() {

  if (gameOn) {
    //getting column class
    var colClass = $(this).attr("class").split(" ")[0];

    if (isdebug) {
      console.log("col_id="+colClass);
    }

    //getting last grey element in this column
    var allEl = $('.'+colClass+'.make_grey')

    if (isdebug) {
      console.log('Number of greys:' + allEl.length);
    }

    if (allEl.length > 0) {
      var last = allEl[allEl.length-1];
      if (isdebug) {
        console.log('Last grey:' + $(last).attr("id"));
      }

        //filling blue
        if (turn === 1) {
          $(last).toggleClass("make_grey");
          $(last).toggleClass("make_blue");
          turn = 2;
          turnH.text('B: it is your turn, please pick a column to drop your red chip.')
          checkWin();
        } else if (turn === 2) {
          $(last).toggleClass("make_grey");
          $(last).toggleClass("make_red");
          turn = 1;
          turnH.text('A: it is your turn, please pick a column to drop your blue chip.');
          checkWin();
        }

    } else {
      console.log("Nothing put here!");
    }
  }

})
