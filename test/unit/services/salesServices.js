const sinon = require('sinon');
const { expect } = require('chai');
const models = require('../../../models');
const services = require('../../../services');
const {
  HTTP_OK,
  HTTP_NOT_FOUND,
  MSG_SALE_NOTFOUND,
  HTTP_CREATED,
} = require('../../../utils/consts');

describe('SALES SERVICES - Tests the getAll function', () => {
  describe('If there are no sales registred on DB', () => {
    const resultGetAll = [];

    before(() => {
      sinon.stub(models.sales, 'getAll').resolves(resultGetAll);
    });

    after(() => {
      models.sales.getAll.restore();
    });

    it('Must return an object with keys: "status" and "data"', async () => {
      const result = await services.sales.getAll();

      expect(result).to.be.an('object');
      expect(result).to.be.includes.keys('status', 'data');
    });

    it('The key "status" must be a number and be equal to 200', async () => {
      const { status } = await services.sales.getAll();

      expect(status).to.be.an('number');
      expect(status).to.be.equal(200);
    });

    it('The key "data" must be an empty array', async () => {
      const { data } = await services.sales.getAll();

      expect(data).to.be.an('array');
      expect(data).to.be.empty;
    });
  });

  describe('If there are sales registred on DB', () => {
    const resultGetAll = [{
      sale_id: 1,
      date: "2021-09-09T04:54:29.000Z",
      product_id: 1,
      quantity: 2
    }];

    before(() => {
      sinon.stub(models.sales, 'getAll').resolves(resultGetAll);
    });

    after(() => {
      models.sales.getAll.restore();
    });

    it('Must return an object with keys "status" and "data"', async () => {
      const result = await services.sales.getAll();

      expect(result).to.be.an('object');
      expect(result).to.be.includes.keys('status', 'data');
    });

    it('The key status must be a number and equal to 200', async () => {
      const { status } = await services.sales.getAll();

      expect(status).to.be.an('number');
      expect(status).to.be.equal(HTTP_OK.status);
    });

    it('The key data must be an array with an object', async () => {
      const { data } = await services.sales.getAll();

      expect(data).to.be.an('array');
      expect(data[0]).to.be.an('object');
    });

    it('The object must have the keys "saleId", "date", "productId", and "quantity"', async () => {
      const { data } = await services.sales.getAll();

      expect(data[0]).to.be.includes.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});

describe('SALES SERVICES - Tests the getById function', () => {
  describe('If the id does not exist on DB', () => {
    const resultGetById = [];
    const id = 1;

    before(() => {
      sinon.stub(models.sales, 'getById').resolves(resultGetById);
    });

    after(() => {
      models.sales.getById.restore();
    });

    it('Must return an object with keys "status" and "message"', async () => {
      try {
        await services.sales.getById(id);
      } catch (err) {
        expect(err).to.be.an('object');
        expect(err).to.be.includes.keys('status', 'message');
      };
    });

    it('The key status must be a number and equal to 404', async () => {
      try {
        await services.sales.getById(id);
      } catch ({ status }) {
        expect(status).to.be.an('number');
        expect(status).to.be.equal(HTTP_NOT_FOUND.status);
      };
    });

    it('The key "message" must be a string with not found message', async () => {
      try {
        await services.sales.getById(id);
      } catch ({ message }) {
        expect(message).to.be.an('string');
        expect(message).to.be.equal(MSG_SALE_NOTFOUND.message);
      };
    });
  });

  describe('If there are sales registred on DB', () => {
    const resultGetById = [{
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    }];
    const id = 1;

    before(() => {
      sinon.stub(models.sales, 'getById').resolves(resultGetById);
    });

    after(() => {
      models.sales.getById.restore();
    });

    it('Must return an object with keys "status" and "data"', async () => {
      const result = await services.sales.getById(id);

      expect(result).to.be.an('object');
      expect(result).to.be.includes.keys('status', 'data');
    });

    it('The key "status" must be a number and equal to 200', async () => {
      const { status } = await services.sales.getById(id);

      expect(status).to.be.an('number');
      expect(status).to.be.equal(HTTP_OK.status);
    });

    it('The key data must be an array with an object', async () => {
      const { data } = await services.sales.getById(id);

      expect(data).to.be.an('array');
      expect(data[0]).to.be.an('object');
    });

    it('The object must have the keys "date", "productId" and "quantity"', async () => {
      const { data } = await services.sales.getById(id);

      expect(data[0]).to.be.includes.keys('date', 'productId', 'quantity');
    });
  });
});

describe('SALES SERVICES - Tests the create function', () => {
  const resultCreate = 1;
  const newSale = [{
    productId: 1,
    quantity: 3
  }];

  before(() => {
    sinon.stub(models.sales, 'create');
  });

  after(() => {
    models.sales.create.restore();
  });

  it('Must return an object with keys "status" and "data"', async () => {
    const result = await services.sales.create(newSale);

    expect(result).to.be.an('object');
    expect(result).to.be.includes.keys('status', 'data');
  });

  it('The key "status" must be a number and be equal to 201', async () => {
    const { status } = await services.sales.create(newSale);

    expect(status).to.be.an('number');
    expect(status).to.be.equal(HTTP_CREATED.status);
  });

  it('The key data must be an object with keys "saleID", "itemsSold"', async () => {
    const { data } = await services.sales.create(newSale);

    expect(data).to.be.an('object');
    expect(data).to.be.includes.keys('id', 'itemsSold');
  });

  it('The key itemsSold must be an array with an object', async () => {
    const { data } = await services.sales.create(newSale);

    expect(data.itemsSold).to.be.an('array');
    expect(data.itemsSold[0]).to.be.an('object');
  });

  it('The object must have the keys "productId" and "quantity"', async () => {
    const { data } = await services.sales.create(newSale);

    expect(data.itemsSold[0]).to.be.includes.keys('productId', 'quantity');
  });
});

describe('SALES SERVICE - Tests the update function', () => {
  const products = [{
    productId: 1,
    quantity: 3
  }];
  const saleId = 1;
  const resultGetById = [{ id: 2, name: "product1", quantity: 10 }];

  before(() => {
    sinon.stub(models.sales, 'getById').resolves(resultGetById);
    sinon.stub(models.sales, 'update').resolves([]);
  });

  after(() => {
    models.sales.getById.restore();
    models.sales.update.restore();
  });

  it('Must return an object with keys "status" and "data"', async () => {
    const result = await services.sales.update(saleId, products);

    expect(result).to.be.an('object');
    expect(result).to.be.includes.keys('status', 'data');
  });

  it('The key "status" must be a number and equal to 200', async () => {
    const { status } = await services.sales.update(saleId, products);

    expect(status).to.be.an('number');
    expect(status).to.be.equal(HTTP_OK.status);
  });

  it('The key "data" must be an object with keys "saleId", "itemUpdated"', async () => {
    const { data } = await services.sales.update(saleId, products);

    expect(data).to.be.an('object');
    expect(data).to.be.includes.keys('saleId', 'itemUpdated');
  });

  it(`The itemUpdated must be an array
      containing an object with keys "productId", "quantity"`, async () => {
    const { data } = await services.sales.update(saleId, products);

    expect(data.itemUpdated).to.be.an('array');
    expect(data.itemUpdated[0]).to.be.an('object');
    expect(data.itemUpdated[0]).to.be.includes.keys('productId', 'quantity');
  });
});
