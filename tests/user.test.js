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