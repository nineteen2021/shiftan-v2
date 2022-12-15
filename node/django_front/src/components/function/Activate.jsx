import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Activate = () => {
  const search = useLocation().search;
  const query2 = new URLSearchParams(search);

  useEffect(() => {
    axios
    .post(process.env.REACT_APP_API_URL + '/api-auth/users/activation/',
        {
          uid: query2.get('uid'),
          token: query2.get('token'),
        } //変更したいキーと値
    ,{
        headers: {
            'Content-Type': 'application/json', 
        }
    })
    .then(res=>{console.log(res.data);})
    .catch(err=>{console.log(err);});
  }, []);

  return (
    <div>
      <h2>本登録が完了しました</h2>
      <div>uid: {query2.get('uid')}</div>
      <div>token: {query2.get('token')}</div>
    </div>
  );
};

export default Activate;