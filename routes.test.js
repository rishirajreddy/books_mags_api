const request = require('supertest');
const { response } = require('./index');
const app = require("./index");

describe('GET /all_books', () => { 
    describe('get book by isbn', () => { 
        test('should print book by isbn', async() => { 
            return await request(app).get('/get_books/5554-5545-4518')
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response.body).toBeDefined();
                })
         })
     })

     describe('get all books and mags', () => { 
        test('should get books and mags of null-walter@echocat.org', async() => { 
            return await request(app).get('/get_booksmags')
                .send({
                    email: "null-walter@echocat.org"
                })
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response.body.books).toBeDefined();
                    expect(response.body.mags).toBeDefined();
                })
         })

        test('should get all books and mags in database', async() => { 
            return await request(app).get('/get_all')
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response.body.books).toBeDefined();
                    expect(response.body.mags).toBeDefined();
                })
         })
      })
 })