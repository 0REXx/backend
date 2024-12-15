const request = require('supertest');
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('../server'); 
const ShoppingList = require('../models/ShoppingList');

const mockUserId = new mongoose.Types.ObjectId();

jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { id: mockUserId.toString() }; 
    next();
  },
}));


beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('ShoppingList API Tests', () => {
  let testListId;

  beforeEach(async () => {
    const testList = new ShoppingList({
      name: 'Test List',
      items: ['item1', 'item2'],
      isOwner: mockUserId, 
    });
    const savedList = await testList.save();
    testListId = savedList._id;
  });

  afterEach(async () => {
    await ShoppingList.deleteMany({});
  });

  test('GET /api/shopping-lists should return all shopping lists for the user', async () => {
    const res = await request(app).get('/api/shopping-lists');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Test List');
  });

  test('POST /api/shopping-lists should create a new shopping list', async () => {
    const newList = { name: 'New List', items: ['item3', 'item4'] };
    const res = await request(app).post('/api/shopping-lists').send(newList);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('New List');
  });

  test('PUT /api/shopping-lists/:id should update an existing shopping list', async () => {
    const updatedList = { name: 'Updated List', items: ['item5', 'item6'] };
    const res = await request(app).put(`/api/shopping-lists/${testListId}`).send(updatedList);

    expect(res.statusCode).toBe(200); 
    expect(res.body.name).toBe('Updated List');
  });

  test('DELETE /api/shopping-lists/:id should delete an existing shopping list', async () => {
    const res = await request(app).delete(`/api/shopping-lists/${testListId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('List removed');
  });

  test('PUT /api/shopping-lists/:id should fail if list does not exist', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const updatedList = { name: 'Non-existent', items: [] };
    const res = await request(app)
      .put(`/api/shopping-lists/${nonExistentId}`)
      .send(updatedList);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('List not found or unauthorized');
  });

  test('DELETE /api/shopping-lists/:id should fail if list does not exist', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/shopping-lists/${nonExistentId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('List not found or unauthorized');
  });
});
