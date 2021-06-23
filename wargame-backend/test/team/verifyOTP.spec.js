const chai = require('chai');
const {expect} = chai;
require('mocha');
const request = require('supertest');

describe('Verify OTP', () => {
  beforeEach(() => {
    tempToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI0ZmY2NDM0ZWM3NzBhYzQ1YWJhZTkiLCJlbWFpbCI6InlhbGxhcGxhY2VzaW5mb0BnbWFpbC5jb20iLCJpYXQiOjE2MjI0NzQ1OTYsImV4cCI6MTYyMjQ3ODE5Nn0.ffRFly-KtBoNRUElUSE2ZqdAAHXhTOEbUU0cPwJoKbY';

    tempTokenVerifiedBefore =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI0ZjU0NmFkYjU2MTJiODQ4MTliMWIiLCJlbWFpbCI6InlhbGxhcGxhY2VzaW5mb0BnbWFpbC5jb20iLCJpYXQiOjE2MjI0NzIwMDYsImV4cCI6MTYyMjQ3MjA2Nn0.Ig9hxwo8YtQqbhIjrn_7hmG7wLnVl3bo1CrtF4GFzb0';
  });

  describe('Verify OTP', () => {
    describe('Without headers', () => {
      it('try to verify otp without headers', () => {
        return request('localhost:5000/api')
          .post('/team/verify.json')
          .send({otp: '818761'})
          .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body)
              .to.have.property('message')
              .to.equal('OTP validation time expired');
          });
      });
    });

    describe('Expired headers', () => {
      it('With expired temp token', () => {
        return request('localhost:5000/api')
          .post('/team/verify.json')
          .set({authorization: tempTokenVerifiedBefore})
          .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body)
              .to.have.property('message')
              .to.equal('OTP validation time expired');
          });
      });
    });

    describe('Without OTP', () => {
      it('try to verify otp without otp', () => {
        return request('localhost:5000/api')
          .post('/team/verify.json')
          .set({authorization: tempToken})
          .send({})
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property('message')
              .to.equal('code is required');
          });
      });
    });

    describe('With empty OTP', () => {
      it('try to verify otp with empty otp', () => {
        return request('localhost:5000/api')
          .post('/team/verify.json')
          .set({authorization: tempToken})
          .send({otp: ''})
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property('message')
              .to.equal('code cannot be an empty field');
          });
      });
    });

    describe('With invalid OTP', () => {
      it('try to verify otp with invalid otp', () => {
        return request('localhost:5000/api')
          .post('/team/verify.json')
          .set({authorization: tempToken})
          .send({otp: 'df5'})
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property('message')
              .to.equal('invalid code');
          });
      });
    });

    describe('With invalid OTP verification', () => {
      it('try to verify otp invalid otp', () => {
        return request('localhost:5000/api')
          .post('/team/verify.json')
          .set({authorization: tempToken})
          .send({otp: '123456'})
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property('message')
              .to.equal('Invalid code');
          });
      });
    });

    describe('With valid OTP', () => {
      it('try to verify otp invalid otp', () => {
        return request('localhost:5000/api')
          .post('/team/verify.json')
          .set({authorization: tempToken})
          .send({otp: '818761'})
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('verified').to.equal(true);
          });
      });
    });
  });
});
