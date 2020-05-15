var validate = function (key, val) {
  var regex = '';
  if (key === 'email') {
    if (val === '') {
      return 'Email must not be empty.';
    }
    regex = /.+@.+\.[A-Za-z]+$/;
    if (!regex.test(val)) {
      return 'Email is not correctly formated';
    }
  }
  if (key === 'fname' || key === 'sname') {
    regex = /^[a-zA-Z ]{3,64}$/;
    if (!regex.test(val)) {
      return 'First or Last name is not correctly formated';
    }
  }
  if (key === 'name') {
    regex = regex = /^[a-z0-9_-]{3,32}$/;
    if (!regex.test(val)) {
      return 'Username is not correct';
    }
  }
  if (key === 'headline') {
    regex = /^[a-z0-9 A-Z_\-\+!.*\\\/:;]{5,50}$/;
    if (!regex.test(val)) {
      return 'Headline not in correct format. Only alphabets and numbers are allowed.';
    }
  }
  if (key === 'description') {
    console.log('description', val);
    regex = /^.{25,4000}$/;
    if (val.length < 25) {
      return 'Your requirements must at least be 25 characters long.';
    }
    if (val.length > 4000) {
      return 'Your requirements are not in the correct format.';
    }
  }
  return '';
};
export default validate;
