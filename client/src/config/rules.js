var validate = function(key, val) {
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
    regex = /^[a-zA-Z]{3,32}$/;
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

  return '';
};
export default validate;
