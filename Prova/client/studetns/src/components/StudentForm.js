import React, { useState } from 'react';
import http from '../http';

export default function StudentForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [school, setSchool] = useState('');

  const handlerButtonClick = () => {
    http
      .post('students', { name, age, school })
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => alert('Erro ao cadastrar aluno!'));
  };

  return (
    <div>
      <div className="row">
        <div class="input-field col s4">
          <input
            placeholder="Nome Do aluno"
            id="name"
            type="text"
            className="validate"
            value={name}
            onInput={(e) => setName(e.target.value)}
          />
        </div>
        <div class="input-field col s4">
          <input
            placeholder="Idade"
            id="age"
            type="number"
            className="validate"
            value={age}
            onInput={(e) => setAge(e.target.value)}
          />
        </div>
        <div class="input-field col s4">
          <input
            placeholder="Nome da Escola"
            id="school"
            type="text"
            className="validate"
            value={school}
            onInput={(e) => setSchool(e.target.value)}
          />
        </div>
        <a class="waves-effect waves-light btn" onClick={handlerButtonClick}>
          Cadastrar
        </a>
      </div>
    </div>
  );
}
