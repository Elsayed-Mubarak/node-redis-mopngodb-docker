/**
 * @description      :
 * @author           : dev1
 * @group            :
 * @created          : 01/06/2021 - 10:01:02
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 01/06/2021
 * - Author          : dev1
 * - Modification    :
 **/
const chai = require('chai');
const { expect } = chai;
require('mocha');
const request = require('supertest');

describe('Update team name PATCH /api/team/team-name', () => {
	let token, tokenUserNotExists, teamName;

	beforeEach(() => {
		invalidToken =
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cm4iOjg0ODQ5OTAxNCwiZXhwIjoxNjU0MDcwNDUxMDAwMDAwLCJpYXQiOjE2MjI1MzQ0NTEwMDAwMDAsIl9pZCI6IjYwYjRmZjY0MzRlYzc3MGFjNDVhYmFlOSIsInJvbGUiOiJ1c2VyIiwidV9pZCI6IjMwN2NlNjIwLTJhZjQtNWJmYy04ZGM4LTk0ZWQ3MWZiY2VhMyJ9.MxoEHCheEDoLWQTArs-5XwCbgRb5KaNC2uQUNS4khaWorRGDTAi03hxOy0F-7nDsl0CPpZTVHsTRZ3r7bzf2P-9LRU7JVUp1BjMJUbbffEHpPTD3IWQ9D2GjinciOoCgRSOCPm776N8DKwGrk9I8U2Nu5QA6NQyxTpDWOQunWPJZ4UjHb6MnAHqwx8ZM-cmGgA4LqucaDSwHhsheqrflrrbE9UOBWU6_5VJgIm1edYCE8aXNFcoZJ-7q95mMEkdHNRnjhixF8iEl2JJs0os_VB3-61KaATSKu1jnQysQgqbRQoZxno2tNSoyFf0-fu2Rzp46q7WjmeKzZ-vfXkx-7A';

		token =
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cm4iOjIwMDI0NTM1MSwiZXhwIjoxNjU0MDk4NjM5MDAwMDAwLCJpYXQiOjE2MjI1NjI2MzkwMDAwMDAsIl9pZCI6IjYwYjYwNmViZDU3NjRkNTQ2NDA3NDQ0NyIsInJvbGUiOiJ1c2VyIiwidV9pZCI6IjMwZDA0MjNiLTAwYjgtNWMxNC04ZWMzLTI5MWZlZTA5Njc4YiJ9.N5f9Z1ckU_SYxokbZk0V-M4Zf4kP9Kq4HqVyBGIpeAMUQU9NPWWnxI-y15-2Ha5ZdAlgAGjiJbFmczZcPQs--0zx0MfGjyn-wpnnrfscT3yIRjQPdBKZRBxQcSSQSMqqOPupca4dTLXWClgy5T5881RPXHt8xCw6zJDPp43Tf05r_be95oRsv-34xOuF8l26-SsrDEw9SVgnAp1aN0jKIpMCO2fkPhDpGiq9rxsap_-eDInD486vzXHOx3eOxCscNoxhqQsuleYLORlLcUVm2waTG5V3HUx17qgys5fNz_pQJMAwjRhA5e7CSruq9BD3aXtKUahzZnhD9A3766bSjQ';

		tokenUserNotExists =
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cm4iOjgzOTMwMDI2MywiZXhwIjoxNjU0MDc1MDYyMDAwMDAwLCJpYXQiOjE2MjI1MzkwNjIwMDAwMDAsIl9pZCI6IjYwYjVmYjEwMmZiZTM1M2I5ODBjYjM0NiIsInJvbGUiOiJ1c2VyIiwidV9pZCI6ImFhYTA5ZWQxLWE0Y2YtNWViYy1iNDZlLTJmNzZlNjk4YWUyNCJ9.SgAcgUl0z7PZwROHoOLAC1o7vkv9YY909tEBuZ_XWSbtB1jPV3rxyAJFHfyAVNzujquKAUfBBnv8fSx9biMRiYAeoGrMwnuwl8Cgea4S_0tAoM4X-6ibdtnpB7d_2spSY_d2l1Sw6FkS-yyciRs7UwbYq8cu4u7Xf9KtEcqx5SWpjwl6Phr1E9I8IUCwhCtyHJdeLL9b0Y66nyN0S46jo4gGGCCZQSpjsMCqyMBkRJOu3EMcbS1IzYuVg81lsrqmtVdY4p0JZ9Z5exU9Meuwz1_HEwB2R97AYGeJNvHpryjG0QdDWhlyqtPqNp1Gy8xQx9JEU3ROUlwVJW_0MUh7cA';

		teamName = {
			name: 'asd',
		};
	});

	describe('Update name without headers (token)', () => {
		it('Without token', () => {
			return request('localhost:5000/api').patch('/team/team-name').send(teamName).then(response => {
				expect(response.status).to.equal(401);
				expect(response.body).to.have.property('message').to.equal('Not authorized user');
			});
		});
	});

	describe('Update name with invalid headers (token)', () => {
		it('With invalid headers (token)', () => {
			return request('localhost:5000/api')
				.patch('/team/team-name')
				.set({
					authorization: invalidToken,
				})
				.send(teamName)
				.then(response => {
					expect(response.status).to.equal(401);
					expect(response.body).to.have
						.property('message')
						.to.equal('login session expired session not exists');
				});
		});
	});

	describe('With token for user not exists', () => {
		it('Without token', () => {
			return request('localhost:5000/api')
				.patch('/team/team-name')
				.set({
					authorization: tokenUserNotExists,
				})
				.send(teamName)
				.then(response => {
					expect(response.status).to.equal(401);
					expect(response.body).to.have.property('message').to.equal('Unauthorized team not exists');
				});
		});
	});

	describe('Team name Validation', () => {
		it('Team name Required', () => {
			return request('localhost:5000/api')
				.patch('/team/team-name')
				.set({ authorization: token })
				.send()
				.then(response => {
					expect(response.status).to.equal(400);
					expect(response.body).be.a('object').to.have.property('message').to.equal('team name is required');
				});
		});

		it('Team name is empty filed', () => {
			return request('localhost:5000/api')
				.patch('/team/team-name')
				.set({ authorization: token })
				.send({
					name: '',
				})
				.then(response => {
					expect(response.status).to.equal(400);
					expect(response.body).to.have.property('message').to.equal('team name cannot be an empty field');
				});
		});

		it('team name min length 3', () => {
			return request('localhost:5000/api')
				.patch('/team/team-name')
				.set({ authorization: token })
				.send({
					name: 'as',
				})
				.then(response => {
					expect(response.status).to.equal(400);
					expect(response.body).to.have
						.property('message')
						.to.equal('team name should have a minimum length of 3 (letters & numbers)');
				});
		});

		it('Team name max length 30', () => {
			return request('localhost:5000/api')
				.patch('/team/team-name')
				.send({ name: 'aasssssssssssssssssssssssssssssssaddddddddddddddddddddddd' })
				.set({ authorization: token })
				.then(response => {
					expect(response.status).to.equal(400);
					expect(response.body).to.have
						.property('message')
						.to.equal('team name should have a maximum length of 30 (letters & numbers)');
				});
		});

		it('Team name Invalid', () => {
			return request('localhost:5000/api')
				.patch('/team/team-name')
				.set({ authorization: token })
				.send({ name: 'A$#a ' })
				.then(response => {
					expect(response.status).to.equal(400);
					expect(response.body).to.have
						.property('message')
						.to.equal('team name must be consists of letters & numbers only');
				});
		});
	});

	describe('Update name successfully', () => {
		it('Used team name', () => {
			return request('localhost:5000/api')
				.patch('/team/team-name')
				.set({ authorization: token })
				.send({ name: 'sayed' })
				.then(response => {
					expect(response.status).to.equal(409);
					expect(response.body).to.have.property('message').to.equal('This team name used before..');
				});
		});

		it('Update Successfully', () => {
			return request('localhost:5000/api')
				.patch('/team/team-name')
				.set({ authorization: token })
				.send(teamName)
				.then(response => {
					expect(response.status).to.equal(200);
					expect(response.body).to.have.property('message').to.equal('Team name updated successfully');
				});
		});
	});
});
