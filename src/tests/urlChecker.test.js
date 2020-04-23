import {validURL} from '../client/js/urlChecker'
import "babel-polyfill"


describe('Check if the function "validURL()" exists' , () => {
    test('It should return true', async () => {
        expect(validURL).toBeDefined();
    });
});
describe('Check if the function "validURL()" is a function' , () => {
    test('It should be a function', async () => {
        expect(typeof validURL).toBe("function");
    });
});

describe('Check if the function "validURL()" is a valid url' , () => {
    var url = "https://www.bbc.com/news/world-us-canada-52289056";
    test('It should return true', async () => {
        const response = validURL(url);
        expect(response).toBeDefined();
        expect(response).toBe(true);
    });
});
describe('Check if "validURL()" is a invalid url' , () => {
    // I replaced 'https' with 'httssps' to make it invalid
    var url = "httssps://www.bbc.com/news/world-us-canada-52289056";
    test('It should return false', async () => {
        const response = validURL(url);
        expect(response).toBeDefined();
        expect(response).toBe(false);
    });
});
