import React, { useState } from 'react';
import request from 'umi-request';
import { Redirect } from 'umi';
import Cookie from 'js-cookie';
import { setAuthority } from '@/utils/authority';
import styles from './style.less';

import LoginFrom from './components/Login';

const { UserName, Password, Submit } = LoginFrom;

// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => (
//   <Alert
//     style={{
//       marginBottom: 24,
//     }}
//     message={content}
//     type="error"
//     showIcon
//   />
// );

const initialState = {
  email: '',
  password: '',
};

const Login: React.FC = (props) => {
  const [{ email, password }, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isLogin, setLogin] = useState(false);

  const handleChangeState = (e: any) => {
    const { id, value } = e.target;
    setState((state) => ({ ...state, [id]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const postRequest = await request.post(`${REACT_APP_ENV}/login/admin`, {
        data: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      setAuthority(postRequest.data.role);
      localStorage.setItem('name', postRequest.data.name);
      Cookie.set('token', postRequest.access_token);
      setLogin(true);
    } catch (error) {
      console.log(error);
      setLogin(false);
      setLoading(false);
    }
  };

  if (isLogin) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.main}>
      <LoginFrom onSubmit={handleSubmit}>
        {/* {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content="账户或密码错误（admin/ant.design）" />
        )} */}

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
