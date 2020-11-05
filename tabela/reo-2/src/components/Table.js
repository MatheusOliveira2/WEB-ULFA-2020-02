import React, { useState } from 'react';
import data from '../assets/accounts.json';

export default function Table() {
  const [accounts, setAccounts] = useState(data);
  const [name, setName] = useState('');
  const [agencia, setAgencia] = useState(0);
  const [conta, setConta] = useState(0);
  const [balance, setBalance] = useState(0);
  const [search, setSearch] = useState('');
  const [buttonType, setButtonType] = useState('cadastrar');

  const [updateIndex, setUpdateIndex] = useState(-1);

  const handleDeleteButton = (index) => {
    setAccounts(accounts.filter((_account, i) => i !== index));
  };

  const handleUpdateButton = () => {
    const user = {
      name,
      agencia,
      conta,
      balance,
    };
    const data = [...accounts];
    data[updateIndex] = user;
    setAccounts(data);
    setName('');
    setConta(0);
    setAgencia(0);
    setBalance(0);
    setButtonType('cadastrar');
  };

  const handleEditButton = (account, index) => {
    setButtonType('atualizar');
    setName(account.name);
    setConta(account.conta);
    setAgencia(account.agencia);
    setBalance(account.balance);
    setUpdateIndex(index);
  };

  const handleRegisterButton = () => {
    setAccounts([{ name, agencia, conta, balance }, ...accounts]);
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
            <label htmlFor="agencia">Agencia</label>
            <br></br>
            <input
              value={agencia}
              id="agencia"
              type="number"
              className="validate"
              onChange={(e) => setAgencia(e.target.value)}
            />
          </div>
          <div className="input-field col s3">
            <label htmlFor="conta">Conta</label>
            <br></br>
            <input
              value={conta}
              id="conta"
              type="number"
              className="validate"
              onChange={(e) => setConta(e.target.value)}
            />
          </div>
          <div className="input-field col s2">
            <label htmlFor="saldo">Saldo</label>
            <br></br>
            <input
              value={balance}
              id="saldo"
              type="number"
              className="validate"
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <div className="col s2 valign-wrapper">{button}</div>
        </div>
        <div className="input-field col s3 offset-s4">
          <label htmlFor="name">Buscar Conta</label>
          <br></br>
          <input
            id="search"
            type="number"
            className="validate"
            onInput={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Agencia</th>
            <th>Conta</th>
            <th>Saldo</th>
            <th className="center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((account, index) => {
            if (search === '' || account.conta.toString().includes(search)) {
              return (
                <tr key={index}>
                  <td>{account.name}</td>
                  <td>{account.agencia}</td>
                  <td>{account.conta}</td>
                  <td>R${account.balance}</td>
                  <td className="center">
                    <a
                      className="waves-effect waves-light btn red"
                      onClick={() => handleDeleteButton(index)}
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
              return;
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
