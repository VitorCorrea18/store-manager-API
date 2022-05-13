const sinon = require('sinon');
const { expect } = require('chai');
const models = require('../../../models');
const connection = require('../../../models/connection');

// MODELS PRODUCTS getALL
describe('Testa a função getAll que deve retornar a listagem dos produtos,', () => {
  describe('Quando não existem produtos cadastrados no banco', () => {
    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await models.products.getAll();

      expect(result).to.be.an('array');
    });

    it('O array deve estar vazio', async () => {
      const result = await models.products.getAll();

      expect(result).to.be.empty;
    });
  });

  describe('Quando há produtos cadastrados no banco', () => {
    const resultExecute = [{
      id: 1,
      name: "Bigorna Sagrada",
      quantity: 42
    }];

    before(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await models.products.getAll();

      expect(result).to.be.an('array');
    });

    it('O array não deve estar vazio', async () => {
      const result = await models.products.getAll();

      expect(result).to.be.not.empty;
    });

    it('O array deve possuir um objeto', async () => {
      const [result] = await models.products.getAll();

      expect(result).to.be.an('object');
    });

    it('O objeto deve conter as chaves: "id", "name", "quantity"', async () => {
      const [result] = await models.products.getAll();

      expect(result).to.be.include.all.keys(
        'id',
        'name',
        'quantity'
      );
    });
  });
});

// MODELS PRODUCTS getById
describe('Testa a função getById, que deve retornar um produto específico', () => {
  describe('Se o produto não existe', () => {
    const resultExecute = [];
    const id = 2;

    before(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um "undefined"', async () => {
      const result = await models.products.getById(id);

      expect(result).to.be.an('undefined');
    });
  });

  describe('Se o produto existe', async () => {
    const id = 1;
    const resultExecute = [
      {
        id: 1,
        name: "Bigorna Sagrada",
        quantity: 42
      }
    ];

    before(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um objeto', async () => {
      const result = await models.products.getById(id);

      expect(result).to.be.an('object');
    });

    it('O objeto deve conter as chaves: "id", "name", "quantity"', async () => {
      const result = await models.products.getById(id);

      expect(result).to.be.include.all.keys(
        "id",
        "name",
        "quantity"
      );
    });
  })
});

//MODELS PRODUCTS findByName
describe('Testa a função findByName, que deve buscar um produto pelo nome', () => {
  describe('Se existe um produto com o nome especificado', () => {
    const resultExecute = [{
      id: 1,
      name: 'Bigorna sagrada',
      quantity: 42
    }];
    const name = 'Bigorna sagrada';

    before(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um objeto', async () => {
      const [result] = await models.products.findByName(name);

      expect(result).to.be.an('object');
    });

    it('O objeto deve conter as chaves: "id", "name", "quantity"', async () => {
      const [result] = await models.products.findByName(name);

      expect(result).to.be.includes.all.keys(
        "id",
        "name",
        "quantity"
      );
    });
  });
});

// MODELS PRODUCTS create
describe('Testa a função create que deve retornar o produto criado', () => {
  const resultExecute = [{
    insertId: 1,
  }];

  const newProduct = {
    name: "Capacete Homem de Ferro",
    quantity: 10
  };

  before(() => {
    sinon.stub(connection, 'execute').resolves([resultExecute]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Deve retornar um objeto', async () => {
    const result = await models.products.create(newProduct);

    expect(result).to.be.an('object');
  });

  it('O objeto não deve estar vazio', async () => {
    const result = await models.products.create({ newProduct });

    expect(result).to.be.not.empty;
  });

  it('O objeto deve conter as chaves: "id", "name", "quantity"', async () => {
    const result = await models.products.create(newProduct);

    expect(result).to.be.includes.all.keys(
      "id",
      "name",
      "quantity"
    );
  });
});

// MODELS PRODUCT UPDATE
describe('Testa a função update que deve retornar o produto atualizado', () => {
  const resultExecute = [{
    id: 1,
    name: "Bigorna Sagrada",
    quantity: 42
  }];
  const id = 1;

  before(() => {
    sinon.stub(connection, 'execute').resolves([resultExecute]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Deve retornar um objeto', async () => {
    const result = await models.products.update(id);

    expect(result).to.be.an('object');
  });

  it('O objeto deve conter as chaves: "id", "name", "quantity"', async () => {
    const result = await models.products.update(id);

    expect(result).to.be.includes.all.keys(
      "id",
      "name",
      "quantity"
    );
  });
});

// MODELS PRODUCTS delete
describe('Testa a função delete', () => {
  const resultExecute = [[]];
  const id = 1;

  before(() => {
    sinon.stub(connection, 'execute').resolves([resultExecute]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Verifica se retorna um array vazio', async () => {
    const result = await models.products.deletePct(id);

    expect(result).to.be.an('undefined');
  });
});
