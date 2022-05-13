const sinon = require('sinon');
const { expect } = require('chai');
const models = require('../../../models');
const connection = require('../../../models/connection');

// MODELS SALES getALL
describe('SALES MODELS - Testa a função getAll que deve retornar a listagem das vendas', () => {
  describe('Quando não existem vendas cadastradas no banco', () => {
    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await models.sales.getAll();

      expect(result).to.be.an('array');
    });

    it('O array deve estar vazio', async () => {
      const result = await models.sales.getAll();

      expect(result).to.be.empty;
    });
  });

  describe('Quando há vendas cadastrados no banco', () => {
    const resultExecute = [{
      "sale_Id": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "product_Id": 1,
      "quantity": 2
    }]

    before(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await models.sales.getAll();

      expect(result).to.be.an('array');
    });

    it('O array não deve estar vazio', async () => {
      const result = await models.sales.getAll();

      expect(result).to.be.not.empty;
    });

    it('O array deve possuir um objeto', async () => {
      const [result] = await models.sales.getAll();

      expect(result).to.be.an('object');
    });

    it('O objeto deve conter as chaves: "saleId", "date","productId", "quantity"', async () => {
      const [result] = await models.sales.getAll();

      expect(result).to.be.include.all.keys(
        'sale_Id',
        'date',
        'product_Id',
        'quantity'
      );
    });
  });
});

// MODELS SALES getById
describe('SALES MODELS - Testa a função getById, que deve retornar uma venda específica', () => {
  describe('Se a venda não existe', () => {
    const resultExecute = [];
    const id = 2;

    before(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um array vazio', async () => {
      const result = await models.sales.getById(id);

      expect(result).to.be.an('array');
      expect(result).to.be.empty
    });
  });

  describe('Se a venda existe', async () => {
    const id = 1;
    const resultExecute = [
      {
        "sale_Id": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "product_Id": 1,
        "quantity": 2
      }
    ]

    before(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um objeto', async () => {
      const [result] = await models.sales.getById(id);

      expect(result).to.be.an('object');
    });

    it('O objeto deve conter as chaves: "saleId", "date","productId "quantity"', async () => {
      const [result] = await models.sales.getById(id);

      expect(result).to.be.include.all.keys(
        "sale_Id",
        "date",
        "product_Id",
        "quantity"
      );
    });
  })
});

// MODELS SALES create
describe('SALES MODELS - Testa a função create que deve retornar a venda criada', () => {
  const resultExecute = [{
    insertId: 1
  }];

  before(() => {
    sinon.stub(connection, 'execute').resolves(resultExecute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Deve retornar um número', async () => {
    const result = await models.sales.create();

    expect(result).to.be.an('number');
  });

  it('O número deve ser maior que 0', async () => {
    const result = await models.sales.create();

    expect(result).to.be.greaterThanOrEqual(1);
  });
});

// MODELS SALES insertProducts
describe('SALES MODELS - Testa a função insertProducts que não deve retornar nada', () => {
  const resultExecute = [];

  before(() => {
    sinon.stub(connection, 'execute').resolves([resultExecute]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Deve retornar "undefined"', async () => {
    const result = await models.sales.insertProducts(1, 1, 10);

    expect(result).to.be.an('undefined');
  });
});

// MODELS SALES UPDATE
describe('SALES MODELS - Testa a função update que não deve retornar nada', () => {
  const resultExecute = [];

  before(() => {
    sinon.stub(connection, 'execute').resolves([resultExecute]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Deve retornar "undefined', async () => {
    const result = await models.sales.update(1, 1, 10);

    expect(result).to.be.an('undefined');
  });
});

