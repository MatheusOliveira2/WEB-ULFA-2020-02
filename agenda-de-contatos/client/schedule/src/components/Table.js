import React, { useState, useEffect } from 'react';
import scheduleService from '../services/scheduleService';

export default function Table() {
  const [accounts, setAccounts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);
  const [search, setSearch] = useState('');
  const [buttonType, setButtonType] = useState('cadastrar');

  const [updateIndex, setUpdateIndex] = useState(-1);

  const handleDeleteButton = async (index) => {
    try {
      await scheduleService.delete(index);
      setAccounts(accounts.filter((account) => account.id !== index));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getAll() {
      const data = await scheduleService.getAll();
      setAccounts(data);
    }
    getAll();
  }, []);

  const handleUpdateButton = async () => {
    try {
      await scheduleService.update(updateIndex, number);
      alert('Atualizado!');
      setName('');
      setNumber(0);
      setButtonType('cadastrar');
    } catch (err) {
      alert('Erro ao atualizar');
    }
  };

  const handleEditButton = (account) => {
    setButtonType('atualizar');
    setName(account.name);
    setNumber(account.number);
    setUpdateIndex(account.id);
  };

  const handleRegisterButton = async () => {
    const data = await scheduleService.add({ name, number });
    setAccounts([data, ...accounts]);
  };

  let button = (
    <div>
      <a
        className="waves-effect waves-light btn green"
        onClick={handleRegisterButton}
      >
        Cadastrar
      </a>
    </div>
  );

  if (buttonType === 'atualizar') {
    button = (
      <div>
        <a
          className="waves-effect waves-light btn blue"
          onClick={handleUpdateButton}
        >
          Atualizar
        </a>
      </div>
    );
  }
  return (
    <div>
      <div className="row">
        <div className="col s12 valign-wrapper">
          <div className="input-field col s3">
            <label htmlFor="name">Nome</label>
            <br></br>
            <input
              value={name}
              id="name"
              type="text"
              className="validate"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-field col s2">
            <label htmlFor="number">Número</label>
            <br></br>
            <input
              value={number}
              id="number"
              className="validate"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="col s2 valign-wrapper">{button}</div>
        </div>
        <div className="input-field col s3 offset-s4">
          <label htmlFor="name">Buscar Conta</label>
          <br></br>
          <input
            id="search"
            type="text"
            className="validate"
            onInput={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Número</th>
            <th className="center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((account, index) => {
            if (search === '' || account.name.toString().includes(search)) {
              return (
                <tr key={index}>
                  <td>{account.name}</td>
                  <td>{account.number}</td>
                  <td className="center">
                    <a
                      className="waves-effect waves-light btn red"
                      onClick={() => handleDeleteButton(account.id)}
                    >
                      Excluir
                    </a>
                    <a
                      className="waves-effect waves-light btn blue"
                      onClick={() => handleEditButton(account, index)}
                      style={{ marginLeft: 15 + 'px' }}
                    >
                      Editar
                    </a>
                  </td>
                </tr>
              );
            } else {
              return '';
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
