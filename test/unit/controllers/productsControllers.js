const sinon = require('sinon');
const { expect } = require('chai');
const controllers = require('../../../controllers');
const services = require('../../../services');
const {
  HTTP_OK,
  HTTP_NOT_FOUND,
  MSG_PRODUCT_NOTFOUND,
  HTTP_CREATED,
  HTTP_NO_CONTENT,
  HTTP_CONFLIT,
  MSG_PRODUCT_EXISTS,
} = require('../../../utils/consts');

describe('PRODUCTS CONTROLLERS - Tests the getAll function', () => {
  const result = {
    ...HTTP_OK,
    data: [{ id: 1, name: 'product1', quantity: 10 }]
  };
  const req = {};
  const res = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services.products, 'getAll').resolves(result);
  });

  afterEach(() => {
    services.products.getAll.restore();
  });

  it('Must return the status code 200', async () => {
    await controllers.products.getAll(req, res);

    expect(res.status.calledWith(result.status)).to.be.equal(true);
  });

  it('Must return a json containing an array', async () => {
    await controllers.products.getAll(req, res);

    expect(res.json.calledWith(result.data)).to.be.equal(true);
  });
})

describe('PRODUCTS CONTROLLERS - Tests the GetById function', () => {
  describe('If the id is not found on DB', () => {
    const result = { ...HTTP_NOT_FOUND, ...MSG_PRODUCT_NOTFOUND };
    const req = { params: { id: 1 } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.products, 'getById').throws(result);
    });

    after(() => {
      services.products.getById.restore();
    });

    it('Must return the status code 404', async () => {
      await controllers.products.getById(req, res);

      expect(res.status.calledWith(result.status)).to.be.equal(true);
    });

    it('Must return an error message', async () => {
      await controllers.products.getById(req, res);

      expect(res.json.calledWith(MSG_PRODUCT_NOTFOUND)).to.be.equal(true);
    });
  });

  describe('If the id is found on DB', () => {
    const result = { ...HTTP_OK, data: { id: 1, name: "productName", quantity: 10 } };
    const req = { params: { id: 1 } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.products, 'getById').resolves(result);
    });

    after(() => {
      services.products.getById.restore();
    });

    it('Must return a status code 200', async () => {
      await controllers.products.getById(req, res);

      expect(res.status.calledWith(result.status)).to.be.equal(true);
    });

    it('Must return the object with the matched product', async () => {
      await controllers.products.getById(req, res);

      expect(res.json.calledWith(result.data)).to.be.equal(true);
    });
  })
});

describe('CONTROLLER PRODUCTS - Tests the create function', () => {
  describe('If the products name does not exists on DB', () => {
    const newProduct = { id: 1, name: "productName", quantity: 10 };
    const result = { ...HTTP_CREATED, data: newProduct };
    const req = { body: { id: 1, name: "productName", quantity: 10 } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.products, 'create').resolves(result);
    });

    after(() => {
      services.products.create.restore();
    });

    it('Must return a status code 201', async () => {
      await controllers.products.create(req, res);

      expect(res.status.calledWith(result.status)).to.be.equal(true);
    });

    it('It must return an json with the product created', async () => {
      await controllers.products.create(req, res);

      expect(res.json.calledWith(result.data)).to.be.equal(true);
    });
  });

  describe('If the products name does exist on DB', () => {
    const newProduct = { id: 1, name: "productName", quantity: 10 };
    const err = { ...HTTP_CONFLIT, ...MSG_PRODUCT_EXISTS };
    const req = { body: { id: 1, name: "productName", quantity: 10 } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.products, 'create').throws(err);
    });

    after(() => {
      services.products.create.restore();
    });

    it('Must return a status code 204', async () => {
      await controllers.products.create(req, res);

      expect(res.status.calledWith(err.status)).to.be.equal(true);
    });

    it('It must return an json with message error', async () => {
      await controllers.products.create(req, res);

      expect(res.json.calledWith({ message: err.message })).to.be.equal(true);
    });
  })
});

describe('CONTROLLER PRODUCTS - Tests the update function', () => {
  describe('If the id is found on DB', () => {
    const updatedProduct = { id: 1, name: "productName", quantity: 10 };
    const result = { ...HTTP_OK, data: updatedProduct };
    const req = { params: { id: 1 }, body: { name: "productName", quantity: 10 } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.products, 'update').resolves(result);
    });

    after(() => {
      services.products.update.restore();
    });

    it('Must return a status code 200', async () => {
      await controllers.products.update(req, res);

      expect(res.status.calledWith(HTTP_OK.status)).to.be.equal(true);
    });

    it('Must return a json with the updated product', async () => {
      await controllers.products.update(req, res);

      expect(res.json.calledWith(result.data)).to.be.equal(true);
    });
  });

  describe('If the id is not found on DB', () => {
    const err = { ...HTTP_NOT_FOUND, ...MSG_PRODUCT_NOTFOUND };
    const req = { params: { id: 1 }, body: { name: "productName", quantity: 10 } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.products, 'update').throws(err);
    });

    after(() => {
      services.products.update.restore();
    });

    it('Must return status code 404', async () => {
      await controllers.products.update(req, res);

      expect(res.status.calledWith(err.status)).to.be.equal(true);
    });

    it('Must return a json with message error', async () => {
      await controllers.products.update(req, res);

      expect(res.json.calledWith({ message: err.message })).to.be.equal(true);
    });
  })
});

describe('CONTROLLERS PRODUCTS - Tests the deletePct function', () => {
  describe('If the id is not found on DB', () => {
    const err = { ...HTTP_NOT_FOUND, ...MSG_PRODUCT_NOTFOUND };
    const req = { params: { id: 1 } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.products, 'deletePct').throws(err);
    });

    after(() => {
      services.products.deletePct.restore();
    });

    it('Must return status code 404', async () => {
      await controllers.products.deletePct(req, res);

      expect(res.status.calledWith(err.status)).to.be.equal(true);
    });

    it('Must return a json with message error', async () => {
      await controllers.products.deletePct(req, res);

      expect(res.json.calledWith({ message: err.message })).to.be.equal(true);
    });
  });

  describe('If the id is found on DB', () => {
    const result = { ...HTTP_NO_CONTENT };
    const req = { params: { id: 1 } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.products, 'deletePct').resolves(result);
    });

    after(() => {
      services.products.deletePct.restore();
    });

    it('Must return status code 204', async () => {
      await controllers.products.deletePct(req, res);

      expect(res.status.calledWith(result.status)).to.be.equal(true);
    });

    it('Must return a json with message error', async () => {
      await controllers.products.deletePct(req, res);

      expect(res.json.calledWith()).to.be.equal(true);
    });
  })
})


