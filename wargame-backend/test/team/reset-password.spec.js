/**
 * @description      :
 * @author           : dev1
 * @group            :
 * @created          : 01/06/2021 - 12:22:50
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 01/06/2021
 * - Author          : dev1
 * - Modification    :
 **/
 const chai = require('chai')
 const { expect } = chai
 require('mocha')
 const request = require('supertest')
 
 describe('Reset Password', () => {
   let temToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI2MDZlYmQ1NzY0ZDU0NjQwNzQ0NDciLCJlbWFpbCI6ImFzZEBtYWlsc2FjLmNvbSIsImlhdCI6MTYyMjU0NDQ4MSwiZXhwIjoxNjIyNTQ4MDgxfQ.pCay30DauJUqvjpLMv7bwjoMjl8mKqnpt0nJgPf47ws';

   let expiredToken =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI0ZjkwNzAyNmNkMzM5OTRmZTdhNzYiLCJlbWFpbCI6InlhbGxhcGxhY2VzaW5mb0BnbWFpbC5jb20iLCJpYXQiOjE2MjI0NzI5NjcsImV4cCI6MTYyMjQ3NjU2N30.TauDEy2QDAdaCzBjmZsb0Zswj-qMh8H2gxlqNwMWbNk";
   describe('Reset Password Validation Schema', () => {
     it('password Required', () => {
       return request('localhost:5000/api')
         .post('/team/reset-password')
         .set({ authorization: temToken})
         .send()
         .then(response => {
           expect(response.status).to.equal(400)
           expect(response.body)
             .to.have.property('message')
             .to.equal('password is required')
         })
     })
 
     it('password is empty', () => {
       return request('localhost:5000/api')
         .post('/team/reset-password')
         .set({ authorization: temToken})
         .send({ password: '' })
         .then(response => {
           expect(response.status).to.equal(400)
           expect(response.body)
             .to.have.property('message')
             .to.equal('password cannot be an empty field')
         })
     })
 
     it('password Invalid', () => {
       return request('localhost:5000/api')
         .post('/team/reset-password')
         .set({ authorization: temToken})
         .send({ password: 'isec2020' })
         .then(response => {
           expect(response.status).to.equal(400)
           expect(response.body)
             .to.have.property('message')
             .to.equal('password must be at least a minimum of 8 characters long with 1 small letter, 1 capital letter, 1 number and 1 special character')
         })
     })
   })

   describe('Reset Password Without headers', () => {
    it('without headers', () => {
      return request('localhost:5000/api')
        .post('/team/reset-password')
        .set({})
        .send({ password: '@Isec2020' })
        .then(response => {
          expect(response.status).to.equal(401)
          expect(response.body)
            .to.have.property('message')
            .to.equal('OTP validation time expired')
        })
    })

    it('with expired headers', () => {
      return request('localhost:5000/api')
        .post('/team/reset-password')
        .set({ authorization: expiredToken})
        .send({ password: '@Isec2020' })
        .then(response => {
          console.log(response.body)
          expect(response.status).to.equal(401)
          expect(response.body)
            .to.have.property('message')
            .to.equal('OTP validation time expired')
        })
    })
  })

  describe('Reset Password successfully', () => {

    it('with expired headers', () => {
      return request('localhost:5000/api')
        .post('/team/reset-password')
        .set({ authorization: temToken})
        .send({ password: '@Isec2020' })
        .then(response => {
          console.log(response.body)
          expect(response.status).to.equal(200)
          expect(response.body)
            .to.have.property('message')
            .to.equal('Password reset successfully')
        })
    })
  })
 
 })
 