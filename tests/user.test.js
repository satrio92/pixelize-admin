import supertest from 'supertest';
import {server} from "../src/aplication/server.js";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
let mongod;
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri, );
});

afterAll(async () => {
  await mongoose.disconnect()
  await mongod.stop()
});

const mockUser = {
  username: 'johndoe99',
  name: 'Alexander John Doe',
  email: 'alex.john.doe@example.com',
  password: 'Password123'
}

describe('POST /api/users', () => {

  beforeEach(async () => {
    await supertest(server)
      .post('/api/users')
      .send(mockUser);
  });

  it('should create a new user successfully', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'andreard',
        name: 'andre ardiansyah',
        email: 'andre@gmail.com',
        password: 'Andre123'
      });

      expect(result.status).toBe(200)
      expect(result.body.data).toEqual({
        username: 'andreard',
        name: 'andre ardiansyah',
        email: 'andre@gmail.com'
      });
  })

  it('should fail when creating a user with existing email', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'alexjohndoe',
        name: 'Alexander John Doe',
        email: 'alex.john.doe@example.com',
        password: 'Password123'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBe("user already exist")
  });

  it('should fail when creating a user with existing username', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'johndoe99',
        name: 'Sebastian John Doe',
        email: 'seb.john.doe@example.com',
        password: 'Password123'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBe("username already taken")
  });

  it('should fail when creating a user with an empty username', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: '',
        name: 'andre ardiansyah',
        email: 'andre@gmail.com',
        password: 'Andre123'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  })

  it('should fail when creating a user with an empty name', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'andreard',
        name: '',
        email: 'andre@gmail.com',
        password: 'Andre123'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  })

  it('should fail when creating a user with an empty email', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'andreard',
        name: 'andre ardiansyah',
        email: '',
        password: 'Andre123'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  })

  it('should fail when creating a user with a too short username', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'andre',
        name: 'andre ardiansyah',
        email: 'andre@gmail.com',
        password: 'Andre123'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  })

  it('should fail when creating a user with a too long username', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'andreardianyahthegreatestmanalive',
        name: 'andre ardiansyah',
        email: 'andre@gmail.com',
        password: 'Andre123'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  })

  it('should fail when creating a user with a too short password', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'andreard',
        name: 'andre ardiansyah',
        email: 'andre@gmail.com',
        password: 'Andre1'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  })

  it('should fail when creating a user with a too long password', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'andreard',
        name: 'andre ardiansyah',
        email: 'andre@gmail.com',
        password: 'Andreardianyah12345678'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  })

  it('should fail when creating a user with a password with no number', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'andreard',
        name: 'andre ardiansyah',
        email: 'andre@gmail.com',
        password: 'Andreardy'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  })

  it('should fail when creating a user with a password with no upper case', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'andreard',
        name: 'andre ardiansyah',
        email: 'andre@gmail.com',
        password: 'andre123'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  })

  it('should fail when creating a user with a password with no lower case', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'andreard',
        name: 'andre ardiansyah',
        email: 'andre@gmail.com',
        password: 'ANDRE123'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  })

  it('should fail when creating a user with a password with invalid email', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'andreard',
        name: 'andre ardiansyah',
        email: 'andregmail.com',
        password: 'Andre123'
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  })
})

describe('POST /api/login', () => {

  beforeEach(async () => {
    await supertest(server)
      .post('/api/users')
      .send(mockUser);
  });

  it('should login successfully', async () => {
    const result = await supertest(server)
      .post('/api/login')
      .send({
        email: "alex.john.doe@example.com",
        password: "Password123"
      })
    console.info(result.body.data.token)
    expect(result.status).toBe(200)
    expect(result.body.data.token).toBeDefined()
  });

  it('should login fail with an empty email', async () => {
    const result = await supertest(server)
      .post('/api/login')
      .send({
        email: "",
        password: "Password123"
      })

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  });

  it('should login fail with an empty password', async () => {
    const result = await supertest(server)
      .post('/api/login')
      .send({
        email: "alex.john.doe@example.com",
        password: ""
      })

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  });

  it('should login fail with wrong email', async () => {
    const result = await supertest(server)
      .post('/api/login')
      .send({
        email: "alex.john@example.com",
        password: "Password123"
      })

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  });

  it('should login fail with wrong password', async () => {
    const result = await supertest(server)
      .post('/api/login')
      .send({
        email: "alex.john.doe@example.com",
        password: "Passwordd123"
      })

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  });
});

describe('GET /api/me', () => {

  beforeEach(async () => {
    await supertest(server)
      .post('/api/users')
      .send(mockUser);
  });

  it('should get a current user data', async () => {
    const user = await supertest(server)
      .post('/api/login')
      .send({
        email: "alex.john.doe@example.com",
        password: "Password123"
      });

    const result = await supertest(server)
      .get('/api/me')
      .set('Authorization', `Bearer ${user.body.data.token}`);

    expect(result.status).toBe(200)
    expect(result.body.data).toEqual({
      username: 'johndoe99',
      name: 'Alexander John Doe',
      email: 'alex.john.doe@example.com'
    });
  });

  it('should fail when get a current user data because not have token', async () => {

    const result = await supertest(server)
      .get('/api/me')

    expect(result.status).toBe(401)
    expect(result.body.error).toBeDefined()
  });

  it('should fail when get a current user data because the token is invalid or expired', async () => {

    const result = await supertest(server)
      .get('/api/me')
      .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2MybmFtZSI6Imt1a3Voc2F0IiwibmFtZSI6Imt1a3VoIHNhdHJpbyIsImVtYWlsIjoia3VrdWhAZ21haWwuY29tIiwiaWF0IjoxNzAyMTEyMzc4LCJleHAiOjE3MDIxMTU5Nzh9.MbaLJk4KNjuLDxBWbavACq-7Iq7Az-mJIipz54_4jLA`);

    expect(result.status).toBe(401)
    expect(result.body.error).toBeDefined()
  });
});

describe('PATCH /api/user/update', () => {

  beforeEach(async () => {
    await supertest(server)
      .post('/api/users')
      .send(mockUser);
  });

  it('should update user data succesfully', async () => {
    const user = await supertest(server)
      .post('/api/login')
      .send({
        email: "alex.john.doe@example.com",
        password: "Password123"
      });

    const result = await supertest(server)
      .patch('/api/user/update')
      .set('Authorization', `Bearer ${user.body.data.token}`)
      .send({
        name: "Emanuel John Doe",
        username: "johndoe61"
      });

    expect(result.status).toBe(200)
    expect(result.body.data).toEqual({
      username: 'johndoe61',
      name: 'Emanuel John Doe',
      email: 'alex.john.doe@example.com'
    });
  });

  it('should fail when update user data because not have token', async () => {

    const result = await supertest(server)
      .patch('/api/user/update')
      .send({
        name: "Emanuel John Doe",
        username: "johndoe61"
      });

    expect(result.status).toBe(401)
    expect(result.body.error).toBeDefined()
  });

  it('should fail when update user data because the token is invalid or expired', async () => {

    const result = await supertest(server)
      .patch('/api/user/update')
      .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2MybmFtZSI6Imt1a3Voc2F0IiwibmFtZSI6Imt1a3VoIHNhdHJpbyIsImVtYWlsIjoia3VrdWhAZ21haWwuY29tIiwiaWF0IjoxNzAyMTEyMzc4LCJleHAiOjE3MDIxMTU5Nzh9.MbaLJk4KNjuLDxBWbavACq-7Iq7Az-mJIipz54_4jLA`)
      .send({
        name: "Emanuel John Doe",
        username: "johndoe61"
      });

    expect(result.status).toBe(401)
    expect(result.body.error).toBeDefined()
  });

  it('should fail when update user data with a too short username', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'john',
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  });

  it('should fail when update user data with a too long username', async () => {
    const result = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'alexanderjohndoe12345678',
      });

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  });
});

describe('POST /api/logout', () => {

  beforeEach(async () => {
    await supertest(server)
      .post('/api/users')
      .send(mockUser);
  });

  it('should logout user succesfully', async () => {
    const user = await supertest(server)
      .post('/api/login')
      .send({
        email: "alex.john.doe@example.com",
        password: "Password123"
      });

    const result = await supertest(server)
      .post('/api/logout')
      .set('Authorization', `Bearer ${user.body.data.token}`)

    expect(result.status).toBe(200)
    expect(result.body.data).toEqual('OK');
  });

  it('should fail when get logout user because not have token', async () => {

    const result = await supertest(server)
      .get('/api/me')

    expect(result.status).toBe(401)
    expect(result.body.error).toBeDefined()
  });

  it('should fail when logout user because the token is invalid or expired', async () => {

    const result = await supertest(server)
      .get('/api/me')
      .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2MybmFtZSI6Imt1a3Voc2F0IiwibmFtZSI6Imt1a3VoIHNhdHJpbyIsImVtYWlsIjoia3VrdWhAZ21haWwuY29tIiwiaWF0IjoxNzAyMTEyMzc4LCJleHAiOjE3MDIxMTU5Nzh9.MbaLJk4KNjuLDxBWbavACq-7Iq7Az-mJIipz54_4jLA`);

    expect(result.status).toBe(401)
    expect(result.body.error).toBeDefined()
  });

});