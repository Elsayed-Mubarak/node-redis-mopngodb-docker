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
const chai = require ('chai');
const {expect} = chai;
require ('mocha');
const request = require ('supertest');

describe ('Update password PATCH /api/team/update-password', () => {
  let token, tokenUserNotExists, userDataWithoutPassword = {}, passData;

  beforeEach (() => {
    invalidToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cm4iOjg0ODQ5OTAxNCwiZXhwIjoxNjU0MDcwNDUxMDAwMDAwLCJpYXQiOjE2MjI1MzQ0NTEwMDAwMDAsIl9pZCI6IjYwYjRmZjY0MzRlYzc3MGFjNDVhYmFlOSIsInJvbGUiOiJ1c2VyIiwidV9pZCI6IjMwN2NlNjIwLTJhZjQtNWJmYy04ZGM4LTk0ZWQ3MWZiY2VhMyJ9.MxoEHCheEDoLWQTArs-5XwCbgRb5KaNC2uQUNS4khaWorRGDTAi03hxOy0F-7nDsl0CPpZTVHsTRZ3r7bzf2P-9LRU7JVUp1BjMJUbbffEHpPTD3IWQ9D2GjinciOoCgRSOCPm776N8DKwGrk9I8U2Nu5QA6NQyxTpDWOQunWPJZ4UjHb6MnAHqwx8ZM-cmGgA4LqucaDSwHhsheqrflrrbE9UOBWU6_5VJgIm1edYCE8aXNFcoZJ-7q95mMEkdHNRnjhixF8iEl2JJs0os_VB3-61KaATSKu1jnQysQgqbRQoZxno2tNSoyFf0-fu2Rzp46q7WjmeKzZ-vfXkx-7A';

    token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cm4iOjM1NTM3MDgzMSwiZXhwIjoxNjU0MDcxNjMzMDAwMDAwLCJpYXQiOjE2MjI1MzU2MzMwMDAwMDAsIl9pZCI6IjYwYjRmZjY0MzRlYzc3MGFjNDVhYmFlOSIsInJvbGUiOiJ1c2VyIiwidV9pZCI6IjMwN2NlNjIwLTJhZjQtNWJmYy04ZGM4LTk0ZWQ3MWZiY2VhMyJ9.NIzVKgtToXRahf4MKV5PogyhrY-2Rk-Jo0OcgZVn5YnfSxAmbI_M3n8JKpA3Y7rQr3tipCW-_15VyQq-216TVqBslzzLrrtk5HPkMoSM9qDYwkzn731XjHnnr8hQvs_e_8CzbkKHekQ2SUSYJ7lW5TnZ3McNKyfMutESEq7gfG13xo8G3ViwTYgRaTE9VLzGc5aAFfCnouOY4cMHtqkP5Ej91jvT_K7LFRcGNd2MCiIrNQ1OEOv7epMJj9bkgtdSGA7OZm1OGGuCYdJtR8QTcK2y_t1RSfOraBExVUAYanJstP0g4J0PRzQVvk81S0b42D3ebZw-Tfnti1UvtaFQbQ';

    tokenUserNotExists =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cm4iOjgzOTMwMDI2MywiZXhwIjoxNjU0MDc1MDYyMDAwMDAwLCJpYXQiOjE2MjI1MzkwNjIwMDAwMDAsIl9pZCI6IjYwYjVmYjEwMmZiZTM1M2I5ODBjYjM0NiIsInJvbGUiOiJ1c2VyIiwidV9pZCI6ImFhYTA5ZWQxLWE0Y2YtNWViYy1iNDZlLTJmNzZlNjk4YWUyNCJ9.SgAcgUl0z7PZwROHoOLAC1o7vkv9YY909tEBuZ_XWSbtB1jPV3rxyAJFHfyAVNzujquKAUfBBnv8fSx9biMRiYAeoGrMwnuwl8Cgea4S_0tAoM4X-6ibdtnpB7d_2spSY_d2l1Sw6FkS-yyciRs7UwbYq8cu4u7Xf9KtEcqx5SWpjwl6Phr1E9I8IUCwhCtyHJdeLL9b0Y66nyN0S46jo4gGGCCZQSpjsMCqyMBkRJOu3EMcbS1IzYuVg81lsrqmtVdY4p0JZ9Z5exU9Meuwz1_HEwB2R97AYGeJNvHpryjG0QdDWhlyqtPqNp1Gy8xQx9JEU3ROUlwVJW_0MUh7cA';

    passData = {
      oldPassword: '@Isec2020',
      newPassword: '@Isec2021',
    };
  });

  describe ('Update without headers (token)', () => {
    it ('Without token', () => {
      return request ('localhost:5000/api')
        .patch ('/team/update-password')
        .send (passData)
        .then (response => {
          expect (response.status).to.equal (401);
          expect (response.body).to.have
            .property ('message')
            .to.equal ('Not authorized user');
        });
    });
  });

  describe ('Update with invalid headers (token)', () => {
    it ('With invalid headers (token)', () => {
      return request ('localhost:5000/api')
        .patch ('/team/update-password')
        .set ({authorization: invalidToken})
        .send (passData)
        .then (response => {
          expect (response.status).to.equal (401);
          expect (response.body).to.have
            .property ('message')
            .to.equal ('login session expired session not exists');
        });
    });
  });

  describe ('Update with old password validation schema', () => {
    let emptyOldPass = {
      oldPassword: '',
      newPassword: '@isec2021',
    };

    let emptyNewPass = {
      oldPassword: '@Isec2021',
      newPassword: '',
    };

    let withoutOldPass = {
      newPassword: '@isec2021',
    };

    let withoutNewPass = {
      oldPassword: '@Isec2020',
    };

    let invalidOldPass = {
      oldPassword: 'isec2020',
      newPassword: '@isec2021',
    };

    let invalidNewPass = {
      oldPassword: '@Isec2020',
      newPassword: 'isec2021',
    };

    it ('Without old password', () => {
      return request ('localhost:5000/api')
        .patch ('/team/update-password')
        .set ({authorization: token})
        .send (withoutOldPass)
        .then (response => {
          expect (response.status).to.equal (400);
          expect (response.body).to.have
            .property ('message')
            .to.equal ('old password is required');
        });
    });

    it ('With empty old password', () => {
      return request ('localhost:5000/api')
        .patch ('/team/update-password')
        .set ({authorization: token})
        .send (emptyOldPass)
        .then (response => {
          expect (response.status).to.equal (400);
          expect (response.body).to.have
            .property ('message')
            .to.equal ('old password cannot be an empty field');
        });
    });

    it ('With invalid old password', () => {
      return request ('localhost:5000/api')
        .patch ('/team/update-password')
        .set ({authorization: token})
        .send (invalidOldPass)
        .then (response => {
          expect (response.status).to.equal (400);
          expect (response.body).to.have
            .property ('message')
            .to.equal ('old password invalid');
        });
    });

    it ('Without new password', () => {
      return request ('localhost:5000/api')
        .patch ('/team/update-password')
        .set ({authorization: token})
        .send (withoutNewPass)
        .then (response => {
          expect (response.status).to.equal (400);
          expect (response.body).to.have
            .property ('message')
            .to.equal ('new password is required');
        });
    });

    it ('With empty new password', () => {
      return request ('localhost:5000/api')
        .patch ('/team/update-password')
        .set ({authorization: token})
        .send (emptyNewPass)
        .then (response => {
          expect (response.status).to.equal (400);
          expect (response.body).to.have
            .property ('message')
            .to.equal ('new password cannot be an empty field');
        });
    });

    it ('With invalid new password', () => {
      return request ('localhost:5000/api')
        .patch ('/team/update-password')
        .set ({authorization: token})
        .send (invalidNewPass)
        .then (response => {
          expect (response.status).to.equal (400);
          expect (response.body).to.have
            .property ('message')
            .to.equal (
              'new password must be at least a minimum of 8 characters long with 1 small letter, 1 capital letter, 1 number and 1 special character'
            );
        });
    });
  });

  describe ('With token for user not exists', () => {
    it ('Without token', () => {
      return request ('localhost:5000/api')
        .patch ('/team/update-password')
        .set ({authorization: tokenUserNotExists})
        .send (passData)
        .then (response => {
          expect (response.status).to.equal (401);
          expect (response.body).to.have
            .property ('message')
            .to.equal ('Unauthorized team not exists');
        });
    });
  });

  describe ('Old password not correct', () => {
    it ('old Password invalid', () => {
      return request ('localhost:5000/api')
        .patch ('/team/update-password')
        .set ({authorization: token})
        .send ({oldPassword: '@Isec2021', newPassword: '@Isec2022'})
        .then (response => {
          expect (response.status).to.equal (409);
          expect (response.body).to.have
            .property ('message')
            .to.equal ('Old password incorrect');
        });
    });
  });

  describe ('new password equal old password', () => {
    it ('new Password equal to old password', () => {
      return request ('localhost:5000/api')
        .patch ('/team/update-password')
        .set ({authorization: token})
        .send ({oldPassword: '@Isec2020', newPassword: '@Isec2020'})
        .then (response => {
          expect (response.status).to.equal (409);
          expect (response.body).to.have
            .property ('message')
            .to.equal ('New password must not be the same as old password');
        });
    });
  });

  describe ('Update password successfully', () => {
    it ('Update Successfully', () => {
      return request ('localhost:5000/api')
        .patch ('/team/update-password')
        .set ({authorization: token})
        .send (passData)
        .then (response => {
          expect (response.status).to.equal (200);
          expect (response.body).to.have
            .property ('message')
            .to.equal ('Password Updated Successfully');
        });
    });
  });
});
