const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../services');
const controllers = require('../../../controllers');

const {
  HTTP_OK,
  HTTP_NOT_FOUND,
  HTTP_ACCEPTED,
  HTTP_CREATED,
  MSG_SALE_NOTFOUND,
  HTTP_NO_CONTENT,
} = require('../../../utils/consts');

describe('CONTROLLERS SALES - Tests the getAll function', () => {
  const result = {
    ...HTTP_OK,
    data: [{
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }]
  };
  const req = {};
  const res = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services.sales, 'getAll').resolves(result);
  });

  after(() => {
    services.sales.getAll.restore();
  });

  it('Must return a status code 200', async () => {
    await controllers.sales.getAll(req, res);

    expect(res.status.calledWith(result.status)).to.be.equal(true);
  });

  it('Must return a json with the found sales in an array', async () => {
    await controllers.sales.getAll(req, res);

    expect(res.json.calledWith(result.data)).to.be.equal(true);
  });
});

describe('CONTROLLERS SALES - Tests the getById function', () => {
  describe('If the id is found on the DB', () => {
    const result =
    {
      ...HTTP_OK,
      data: [
        {
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2
        }
      ]
    };
    const req = { params: { id: 1 } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.sales, 'getById').resolves(result);
    });

    after(() => {
      services.sales.getById.restore();
    });

    it('Must return a status code 200', async () => {
      await controllers.sales.getById(req, res);

      expect(res.status.calledWith(result.status)).to.be.equal(true);
    });

    it('Returns a json with the listed sale', async () => {
      await controllers.sales.getById(req, res);

      expect(res.json.calledWith(result.data)).to.be.equal(true);
    });
  });

  describe('If the id is not found', () => {
    const err = { ...HTTP_NOT_FOUND, ...MSG_SALE_NOTFOUND };
    const req = { params: { id: 1 } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.sales, 'getById').throws(err);
    });

    after(() => {
      services.sales.getById.restore();
    });

    it('Must return a status code 404', async () => {
      await controllers.sales.getById(req, res);

      expect(res.status.calledWith(err.status)).to.be.equal(true);
    });

    it('Returns a json with the error message', async () => {
      await controllers.sales.getById(req, res);

      expect(res.json.calledWith(MSG_SALE_NOTFOUND)).to.be.equal(true);
    });
  });
});

describe('CONTROLLERS SALES - Tests the create function', () => {
  const result = {
    ...HTTP_CREATED,
    data: {
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 3
        }
      ]
    }
  };
  const req = { body: [{ productId: 1, quantity: 3 }] };
  const res = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services.sales, 'create').resolves(result);
  });

  after(() => {
    services.sales.create.restore();
  });

  it('Must return a status code 201', async () => {
    await controllers.sales.create(req, res);

    expect(res.status.calledWith(result.status)).to.be.equal(true);
  });

  it('Returns a json with the the sale created', async () => {
    await controllers.sales.create(req, res);

    expect(res.json.calledWith(result.data)).to.be.equal(true);
  });
});

describe('CONTROLLERS SALES - Tests the update function', () => {
  describe('If the id is found on the DB', () => {
    const result =
    {
      ...HTTP_OK,
      data: {
        "saleId": 1,
        "itemUpdated": [
          {
            "productId": 1,
            "quantity": 6
          }
        ]
      }
    };
    const req = { params: { id: 1 }, body: [{ productId: 1, quantity: 6 }] };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.sales, 'update').resolves(result);
    });

    after(() => {
      services.sales.update.restore();
    });

    it('Must return a status code 200', async () => {
      await controllers.sales.update(req, res);

      expect(res.status.calledWith(result.status)).to.be.equal(true);
    });

    it('Returns a json with the updated sale', async () => {
      await controllers.sales.update(req, res);

      expect(res.json.calledWith(result.data)).to.be.equal(true);
    });
  });

  describe('If the id is not found', () => {
    const err = { ...HTTP_NOT_FOUND, ...MSG_SALE_NOTFOUND };
    const req = { params: { id: 1 }, body: [{ productId: 1, quantity: 6 }] };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.sales, 'update').throws(err);
    });

    after(() => {
      services.sales.update.restore();
    });

    it('Must return a status code 404', async () => {
      await controllers.sales.update(req, res);

      expect(res.status.calledWith(err.status)).to.be.equal(true);
    });

    it('Returns a json with the error message', async () => {
      await controllers.sales.update(req, res);

      expect(res.json.calledWith(MSG_SALE_NOTFOUND)).to.be.equal(true);
    });
  });
});

describe('CONTROLLERS SALES - Tests the delete function', () => {
  describe('If the id is found on the DB', () => {
    const result = { ...HTTP_NO_CONTENT };
    const req = { params: { id: 1 } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.sales, 'deleteSale').resolves(result);
    });

    after(() => {
      services.sales.deleteSale.restore();
    });

    it('Must return a status code 200', async () => {
      await controllers.sales.deleteSale(req, res);

      expect(res.status.calledWith(result.status)).to.be.equal(true);
    });

    it('Returns a json with the updated sale', async () => {
      await controllers.sales.deleteSale(req, res);

      expect(res.json.calledWith()).to.be.equal(true);
    });
  });

  describe('If the id is not found', () => {
    const err = { ...HTTP_NOT_FOUND, ...MSG_SALE_NOTFOUND };
    const req = { params: { id: 1 } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.sales, 'deleteSale').throws(err);
    });

    after(() => {
      services.sales.deleteSale.restore();
    });

    it('Must return a status code 404', async () => {
      await controllers.sales.deleteSale(req, res);

      expect(res.status.calledWith(err.status)).to.be.equal(true);
    });

    it('Returns a json with the error message', async () => {
      await controllers.sales.deleteSale(req, res);

      expect(res.json.calledWith(MSG_SALE_NOTFOUND)).to.be.equal(true);
    });
  });
});
