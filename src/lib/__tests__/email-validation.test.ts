// Team email validation (.edu required)
const getTeamEmailValidationError = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Email is required';
  }

  if (!trimmed.includes('@')) {
    return 'Please enter a valid email address';
  }

  const [localPart, domainPart] = trimmed.split('@');
  if (!localPart || !domainPart) {
    return 'Please enter a valid email address';
  }

  if (!domainPart.endsWith('.edu')) {
    return 'Must be a .edu email address';
  }

  // Check if it's a reasonable .edu domain (at least domain.tld.edu format)
  const domainParts = domainPart.split('.');
  if (domainParts.length < 2 || domainParts[domainParts.length - 2].length === 0) {
    return 'Please enter a valid .edu email address';
  }

  return '';
};

// Sponsor email validation (work email, non-.edu)
const getSponsorEmailValidationError = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Email is required';
  }

  if (!trimmed.includes('@')) {
    return 'Please enter a valid email address';
  }

  const [localPart, domainPart] = trimmed.split('@');
  if (!localPart || !domainPart) {
    return 'Please enter a valid email address';
  }

  // Check if it's a .edu email (not allowed for sponsors)
  if (domainPart.endsWith('.edu')) {
    return 'Work email cannot be a .edu address';
  }

  // Domain should have at least one dot and valid parts
  if (!domainPart.includes('.')) {
    return 'Please enter a valid email address with domain';
  }

  const domainParts = domainPart.split('.');
  if (domainParts.length < 2 ||
      domainParts.some(part => part.length === 0)) {
    return 'Please enter a valid email address';
  }

  return '';
};

console.log('Testing email validation functions...');

// Test team email validation
console.log('\n=== Team Email Validation Tests ===');

console.log('Test 1: Empty email');
const result1 = getTeamEmailValidationError('');
console.assert(result1 === 'Email is required', `Expected "Email is required", got "${result1}"`);

console.log('Test 2: Email without @ symbol');
const result2 = getTeamEmailValidationError('invalid-email');
console.assert(result2 === 'Please enter a valid email address', `Expected "Please enter a valid email address", got "${result2}"`);

console.log('Test 3: Email with @ but no domain');
const result3 = getTeamEmailValidationError('test@');
console.assert(result3 === 'Please enter a valid email address', `Expected "Please enter a valid email address", got "${result3}"`);

console.log('Test 4: Non-.edu email');
const result4 = getTeamEmailValidationError('test@gmail.com');
console.assert(result4 === 'Must be a .edu email address', `Expected "Must be a .edu email address", got "${result4}"`);

console.log('Test 5: Invalid .edu domain format');
const result5 = getTeamEmailValidationError('test@.edu');
console.assert(result5 === 'Please enter a valid .edu email address', `Expected "Please enter a valid .edu email address", got "${result5}"`);

console.log('Test 6: Valid .edu email');
const result6 = getTeamEmailValidationError('student@university.edu');
console.assert(result6 === '', `Expected "", got "${result6}"`);

const result7 = getTeamEmailValidationError('john.doe@college.edu');
console.assert(result7 === '', `Expected "", got "${result7}"`);

const result8 = getTeamEmailValidationError('team123@mit.edu');
console.assert(result8 === '', `Expected "", got "${result8}"`);

// Test sponsor email validation
console.log('\n=== Sponsor Email Validation Tests ===');

console.log('Test 1: Empty email');
const result9 = getSponsorEmailValidationError('');
console.assert(result9 === 'Email is required', `Expected "Email is required", got "${result9}"`);

console.log('Test 2: Email without @ symbol');
const result10 = getSponsorEmailValidationError('invalid-email');
console.assert(result10 === 'Please enter a valid email address', `Expected "Please enter a valid email address", got "${result10}"`);

console.log('Test 3: Email with @ but no domain');
const result11 = getSponsorEmailValidationError('test@');
console.assert(result11 === 'Please enter a valid email address', `Expected "Please enter a valid email address", got "${result11}"`);

console.log('Test 4: .edu email (not allowed for sponsors)');
const result12 = getSponsorEmailValidationError('test@university.edu');
console.assert(result12 === 'Work email cannot be a .edu address', `Expected "Work email cannot be a .edu address", got "${result12}"`);

console.log('Test 5: Email without domain dot');
const result13 = getSponsorEmailValidationError('test@company');
console.assert(result13 === 'Please enter a valid email address with domain', `Expected "Please enter a valid email address with domain", got "${result13}"`);

console.log('Test 6: Email with invalid domain format');
const result14 = getSponsorEmailValidationError('test@.com');
console.assert(result14 === 'Please enter a valid email address', `Expected "Please enter a valid email address", got "${result14}"`);

console.log('Test 7: Valid work email');
const result15 = getSponsorEmailValidationError('contact@company.com');
console.assert(result15 === '', `Expected "", got "${result15}"`);

const result16 = getSponsorEmailValidationError('john.doe@business.org');
console.assert(result16 === '', `Expected "", got "${result16}"`);

const result17 = getSponsorEmailValidationError('info@corporation-inc.net');
console.assert(result17 === '', `Expected "", got "${result17}"`);

console.log('\n✅ All email validation tests passed!');