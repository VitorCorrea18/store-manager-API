const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const services = require('../../../services');
const models = require('../../../models');
const {
  MSG_PRODUCT_NOTFOUND,
  HTTP_NOT_FOUND,
  HTTP_OK,
  HTTP_CONFLIT,
  MSG_PRODUCT_EXISTS,
  HTTP_CREATED,
  HTTP_NO_CONTENT,
} = require('../../../utils/consts');
const { getById } = require('../../../models/productsModels');

// SERVICES PRODUCTS getALL
describe('PRODUCTS SERVICES - Tests the getAll function', () => {
  describe('If there are no products on database', () => {
    const resultGetAll = [];

    before(() => {
      sinon.stub(models.products, 'getAll').resolves(resultGetAll);
    });

    after(() => {
      models.products.getAll.restore();
    });

    it('Must return an object', async () => {
      const result = await services.products.getAll();

      expect(result).to.be.an('object');
    });

    it('The key status mus be a number', async () => {
      const { status } = await services.products.getAll();

      expect(status).to.be.an('number');
    });

    it('The key status must be equal to 200', async () => {
      const { status } = await services.products.getAll();

      expect(status).to.be.equal(HTTP_OK.status);
    });

    it('The kay data must be an empty array', async () => {
      const { data } = await services.products.getAll();

      expect(data).to.be.an('array');
      expect(data).to.be.empty;
    });
  });

  describe('If there are products on database', () => {
    const resultGetAll = [{
      id: 1,
      name: "Bigorna Sagrada",
      quantity: 42
    }];

    before(() => {
      sinon.stub(models.products, 'getAll').resolves(resultGetAll);
    });

    after(() => {
      models.products.getAll.restore();
    });

    it('Must be an object', async () => {
      const result = await services.products.getAll();

      expect(result).to.be.an('object');
    });

    it('A the object must not be empty', async () => {
      const result = await services.products.getAll();

      expect(result).to.be.not.empty;
    });

    it('The object must have the keys "status" and "data"', async () => {
      const result = await services.products.getAll();

      expect(result).to.be.includes.keys('status', 'data');
    });

    it('The key status must be a number', async () => {
      const { status } = await services.products.getAll();

      expect(status).to.be.an('number');
    });

    it('The key status must be a status code 200', async () => {
      const { status } = await services.products.getAll();

      expect(status).to.be.equal(HTTP_OK.status);
    });

    it('The key data must be an array', async () => {
      const { data } = await services.products.getAll();

      expect(data).to.be.an('array');
    });

    it('The array must contain an object', async () => {
      const { data } = await services.products.getAll();

      expect(data[0]).to.be.an('object');
    });

    it('The object must contain the keys "id", "name" and "quantity"', async () => {
      const { data } = await services.products.getAll();

      expect(data[0]).to.be.includes.keys('id', 'name', 'quantity');
    });
  });
});

// SERVICES PRODUCTS getById
describe('PRODUCTS SERVICES - Tests the getById function', () => {
  describe('If the product exists', () => {
    const resultGetById = false;
    const id = 1;

    before(() => {
      sinon.stub(models.products, 'getById').resolves(resultGetById);
    });

    after(() => {
      models.products.getById.restore();
    });

    it('Must return an object', async () => {
      try {
        await services.products.getById(id);
      } catch (err) {
        expect(err).to.be.an('object');
      };
    });

    it('The object must have the keys "status" and "message"', async () => {
      try {
        await services.products.getById(id);
      } catch (err) {
        expect(err).to.be.includes.keys('status', 'message');
      };
    });

    it('The key "status" must be a number and be qual to 204', async () => {
      try {
        await services.products.getById(id);
      } catch ({ status }) {
        expect(status).to.be.an('number');
        expect(status).to.be.equal(HTTP_NOT_FOUND.status);
      };
    });

    it('The key "message" must be a string with the error message', async () => {
      try {
        await services.products.getById(id);
      } catch ({ message }) {
        expect(message).to.be.an('string');
        expect(message).to.be.equal(MSG_PRODUCT_NOTFOUND.message);
      };
    });
  });

  describe('If the product exists', () => {
    const resultGetById = [{
      "id": 1,
      "name": "produto A",
      "quantity": 10
    }];
    const id = 1;

    before(() => {
      sinon.stub(models.products, 'getById').resolves(resultGetById);
    });

    after(() => {
      models.products.getById.restore();
    });

    it('Must be an object', async () => {
      const result = await services.products.getById(id);

      expect(result).to.be.an('object');
    });

    it('The object must have the keys "status" and "data"', async () => {
      const result = await services.products.getById(id);

      expect(result).to.be.not.empty;
      expect(result).to.be.includes.keys('status', 'data');
    });

    it('The key "status" must be a number and be equal to 200', async () => {
      const { status } = await services.products.getById(id);

      expect(status).to.be.an('number');
      expect(status).to.be.equal(HTTP_OK.status);
    });

    it(`The key "data" must be an array containing an object with keys 
        "id","name" and "quantity"`, async () => {
      const { data } = await services.products.getById(id);

      expect(data).to.be.an('array');
      expect(data[0]).to.be.includes.keys('id', 'name', 'quantity');
    });
  });
});

// PRODUCTS SERVICES findByName
describe('PRODUCTS SERVICES - Tests the findByName function', () => {
  describe('If the product exists on database', () => {
    const resultFindByName = [{
      id: 1,
      name: 'product1',
      quantity: 100
    }];
    const name = "product1";

    before(() => {
      sinon.stub(models.products, 'findByName').resolves(resultFindByName);
    });
    after(() => {
      models.products.findByName.restore();
    });

    it('Must return "true"', async () => {
      const result = await services.products.findByName(name);

      expect(result).to.be.equal(true);
    });
  });

  describe('If the product does not exist on database', () => {
    const resultFindByName = [];
    const name = "product1";

    before(() => {
      sinon.stub(models.products, 'findByName').resolves(resultFindByName);
    });
    after(() => {
      models.products.findByName.restore();
    });

    it('Must return false', async () => {
      const result = await services.products.findByName(name);

      expect(result).to.be.equal(false);
    });
  });
});

// PRODUCTS SERVICES create
describe('PRODUCTS SERVICES - Tests the function "create"', () => {
  describe('If there is already a product with the same name', () => {
    const resultFindByName = [{
      id: 1,
      name: 'product1',
      quantity: 100
    }];
    const newProduct = {
      name: 'propduct1',
      quantity: 100
    };

    before(() => {
      sinon.stub(models.products, 'findByName').resolves(resultFindByName);
    });

    after(() => {
      models.products.findByName.restore();
    });

    it('Must return an error object', async () => {
      try {
        await services.products.create(newProduct);
      } catch (err) {
        expect(err).to.be.an('object');
      };
    });

    it('The returned object must include the keys: "status", "message"', async () => {
      try {
        await services.products.create(newProduct);
      } catch (err) {
        expect(err).to.be.includes.keys('status', 'message');
      };
    });

    it('The key status must be a number and equal to 409', async () => {
      try {
        await services.products.create(newProduct);
      } catch ({ status }) {
        expect(status).to.be.an('number');
        expect(status).to.be.equal(HTTP_CONFLIT.status);
      };
    });

    it('The key "message" must be a string with the error message', async () => {
      try {
        await services.products.create(newProduct);
      } catch ({ message }) {
        expect(message).to.be.an('string');
        expect(message).to.be.equal(MSG_PRODUCT_EXISTS.message);
      };
    });
  });

  describe('If there is no product with the same name', () => {
    const resultExecute = [];
    const newProduct = {
      name: 'propduct1',
      quantity: 100
    };

    before(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Must return an object', async () => {
      const result = await services.products.create(newProduct);
      expect(result).to.be.an('object');
    });

    it('The returned object must include the keys: "status", "data"', async () => {
      const result = await services.products.create(newProduct);
      expect(result).to.be.includes.keys('status', 'data');
    });

    it('The key status must be a number and equal to 202', async () => {
      const { status } = await services.products.create(newProduct);
      expect(status).to.be.an('number');
      expect(status).to.be.equal(HTTP_CREATED.status);
    });

    it('The key "data" must be an array containing an an object with the product created', async () => {
      const { data } = await services.products.create(newProduct);
      expect(data).to.be.an('object');
      expect(data).to.be.includes.keys('id', 'name', 'quantity');
    });
  });
});

describe('PRODUCTS SERVICES - Tests the function "update"', () => {
  const product = {
    id: 1,
    name: "product",
    quantity: 100
  };
  const getById = [product];

  before(() => {
    sinon.stub(models.products, 'getById').resolves(getById);
    sinon.stub(models.products, 'update').resolves(product);
  })

  after(() => {
    models.products.update.restore();
  });

  it('Must return a an object with keys "status" and "data"', async () => {
    const result = await services.products.update(product);

    expect(result).to.be.an('object');
    expect(result).to.be.includes.keys('status', 'data');
  });

  it('The key status must be a number, status code 200', async () => {
    const { status } = await services.products.update(product);

    expect(status).to.be.an('number');
    expect(status).to.be.equal(HTTP_OK.status);
  });

  it('The key data must be an object with keys "id", "name" ans "quantity"', async () => {
    const { data } = await services.products.update(product);

    expect(data).to.be.an('object');
    expect(data).to.be.includes.keys('id', 'name', 'quantity');
  });
});

// PRODUCTS SERVICES
describe('PRODUCT SERVICES - Tests the deletePct function', () => {
  describe('If the informed id exists', () => {
    const resultDeletePct = [];
    const id = 1;

    before(() => {
      sinon.stub(models.products, 'deletePct').resolves(resultDeletePct);
    });

    after(() => {
      models.products.deletePct.restore();
    });

    it('Should return an object with status code 204', async () => {
      const result = await services.products.deletePct(id);

      expect(result).to.be.an('object');
      expect(result).to.be.includes.keys('status');
      expect(result.status).to.be.an('number');
      expect(result.status).to.be.equal(HTTP_NO_CONTENT.status);
    });
  });
});
