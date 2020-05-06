module.exports = (fname, lname, email, url) => {
  return `Hi ${fname} ${lname},\n\nThank you for signing up for Taskbarter account. We received your request to confirm ${email} as your email on Taskbarter.\n\nTo confirm please click on this link: ${url}\n\nThank you.`;
};
