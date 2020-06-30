let step = 5;

switch (step) {
  case 1: {
    return console.log('case 1');
  }
  case 2: {
    return console.log('case 2');
  }
  case 3:
  case 5:
  case 6:
  case 9: {
    return console.log('case 3');
  }
  case (4, 7): {
    return console.log('case 4');
  }
  default:
    console.log('default');
}
