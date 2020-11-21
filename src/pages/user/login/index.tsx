import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from 'antd';
import { Redirect } from 'umi';
import { setAuthority } from '@/utils/authority';
import styles from './style.less';

import LoginFrom from './components/Login';

const { UserName, Password, Submit } = LoginFrom;

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const initialState = {
  email: '',
  password: '',
};

const Login: React.FC = (props) => {
  const [{ email, password }, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isLogin, setLogin] = useState(false);

  const [contentError, setContentError] = useState('');

  const [role, setRole] = useState('');

  const handleChangeState = (e: any) => {
    const { id, value } = e.target;
    setState((state) => ({ ...state, [id]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const postRequest = await axios({
        method: 'post',
        baseURL: `${REACT_APP_ENV}/login`,
        data: { email, password },
        withCredentials: true,
      });
      const result = await postRequest.data;
      setLoading(false);
      setAuthority(result.data.role);
      setRole(result.data.role);
      localStorage.setItem('name', result.data.name);
      setLogin(true);
      return result;
    } catch (error) {
      setContentError(error.response.data.message);
      setLogin(false);
      setLoading(false);
    }
  };

  if (isLogin) {
    if (role === 'admin' || role === 'master') {
      return <Redirect to="/" />;
    } else {
      return <Redirect to="/penjualan/merchant" />;
    }
  }

  return (
    <div className={styles.main}>
      <LoginFrom onSubmit={handleSubmit}>
        {/* {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content="账户或密码错误（admin/ant.design）" />
        )} */}
        {Boolean(contentError) ? <LoginMessage content={contentError} /> : null}

        <UserName
          name="email"
          placeholder="Email"
          id="email"
          onChange={handleChangeState}
          rules={[
            {
              required: true,
              message: 'email tidak boleh kosong!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="Password"
          id="password"
          onChange={handleChangeState}
          rules={[
            {
              required: true,
              message: 'password tidak boleh kosong!',
            },
          ]}
        />
        {/* <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            Remember me!
          </Checkbox>
        </div> */}
        <Submit loading={loading}>Login</Submit>
        {/* <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            Register
          </Link>
        </div> */}
      </LoginFrom>
    </div>
  );
};

export default Login;
