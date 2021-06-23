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

describe('Forget Password', () => {
  describe('Forget Password Validation Schema', () => {
    it('Email Required', () => {
      return request('localhost:5000/api')
        .post('/team/forget-password')
        .send({})
        .then(response => {
          expect(response.status).to.equal(400)
          expect(response.body)
            .to.have.property('message')
            .to.equal('email is required')
        })
    })

    it('Email is empty', () => {
      return request('localhost:5000/api')
        .post('/team/forget-password')
        .send({ email: '' })
        .then(response => {
          expect(response.status).to.equal(400)
          expect(response.body)
            .to.have.property('message')
            .to.equal('email cannot be an empty field')
        })
    })

    it('Email Invalid', () => {
      return request('localhost:5000/api')
        .post('/team/forget-password')
        .send({ email: 'fady@mailsac' })
        .then(response => {
          expect(response.status).to.equal(400)
          expect(response.body)
            .to.have.property('message')
            .to.equal('Invalid email')
        })
    })
  })

  describe('Email Valid Schema', () => {
    it('Email not registered', () => {
      return request('localhost:5000/api')
        .post('/team/forget-password')
        .send({ email: 'kkk@mailsac.com' })
        .then(response => {
          expect(response.status).to.equal(409)
          expect(response.body)
            .to.have.property('message')
            .to.equal('Team not found, enter a valid email')
        })
    })
    it('Email Already Exists', () => {
      return request('localhost:5000/api')
        .post('/team/forget-password')
        .send({ email: 'asd@mailsac.com' })
        .then(response => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('token')
        })
    })
  })
})
