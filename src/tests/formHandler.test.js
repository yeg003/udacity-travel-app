import { handleSubmit } from '../client/js/formHandler'
import "babel-polyfill"

describe('Check if the function "handleSubmit()" exists' , () => {
    test('It should return true', async () => {
        expect(handleSubmit).toBeDefined();
    });
});
describe('Check if the function "handleSubmit()" is a function' , () => {
    test('It should be a function', async () => {
        expect(typeof handleSubmit).toBe("function");
    });
});