jest.useFakeTimers();
jest.setSystemTime(new Date(1679494960529));

console.log = jest.fn();
console.info = jest.fn();
console.error = jest.fn();

process.env.STAGE = 'prod';
