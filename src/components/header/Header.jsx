import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { USERS_ROLE } from '../../constants';
import { authActions, resetUser } from '../store/auth/authSlice';
import { getBasket } from '../store/user/basket/basket';
import { Loading } from '../UI/loading/Loading';
import Toggle from '../UI/toggle/Toggle';
import OrderBasket from './OrderBasket';
const Header = () => {
  const { lightMode } = useSelector((state) => state.darkMode);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.user.role === USERS_ROLE.USER) {
      dispatch(getBasket());
    }
  }, []);
  function navigateToSignIn() {
    navigate('/signin');
  }
  function navigateToMain() {
    if (auth.user.role === USERS_ROLE.ADMIN) {
      navigate('/admin');
    }
    if (auth.user.role === USERS_ROLE.USER) {
      navigate('/user');
    }
    if (auth.user.role === USERS_ROLE.GUEST) {
      navigate('/');
    }
  }
  function logOutHandler() {
    dispatch(authActions.logOutHandler());
    navigate('/signin');
    localStorage.setItem('AuthLogin', JSON.stringify(resetUser()));
  }
  return (
    <header style={{ width: '100%' }}>
      <Container darkMode={lightMode}>
        <ReactMeals darkMode={lightMode} onClick={navigateToMain}>
          ReactMeals
        </ReactMeals>
        {auth.user.role === USERS_ROLE.USER && (
          <OrderBasket>Your Cart</OrderBasket>
        )}
        {auth.user.role === USERS_ROLE.ADMIN && (
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive
                  ? lightMode
                    ? 'black'
                    : 'white'
                  : lightMode
                  ? 'black'
                  : 'white',
                borderBottom: isActive
                  ? lightMode
                    ? '3px solid #444343'
                    : '3px solid #BBBCBC'
                  : 'none',
                marginTop: '5px',
                textDecoration: 'none',
                fontSize: '32px',
                fontWeight: '600',
              };
            }}
            to="/admin/meals"
          >
            Meals
          </NavLink>
        )}

        {auth.isLoading ? null : <Loading />}
        <Toggle />
        {auth.isAuthorization ? (
          <Button
            variant="contained"
            sx={{
              borderRadius: '30px',
              width: '160px',
              height: '59px',
              background: lightMode ? 'rgb(90, 31, 8)' : '#a5e0f7',
              color: lightMode ? 'white' : 'black',
              fontSize: '20px',
              textTransform: 'none',
              '&:active': {
                background: "white",
                color: 'black',
                border: 'none',
              },
              '&:hover': {
                background: lightMode ?  'rgb(138, 43, 6)' : "rgb(165, 224, 247)",
                color: 'white',
                border: 'none',
              },
            }}
            onClick={logOutHandler}
          >
            LogOut{' '}
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              borderRadius: '30px',
              width: '160px',
              height: '59px',
              background: lightMode ? 'rgb(138, 43, 6)' : 'rgb(165, 224, 247)',
              color: lightMode ? 'white' : 'black',
              fontSize: '20px',
              textTransform: 'none',
              '&:active': {
                background: 'rgb(90, 31, 8)',
                color: 'white',
                border: 'none',
              },
              '&:hover': {
                background: 'rgb(90, 31, 8)',
                color: 'white',
                border: 'none',
              },
            }}
            onClick={navigateToSignIn}
          >
            Sign In{' '}
          </Button>
        )}
      </Container>
    </header>
  );
};
export default Header;
const Container = styled.div`
  height: 101px;
  background: ${(props) => (props.darkMode ? '#75d4f9' : '#8a2b06')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 120px;
  font-family: 'Poppins';
`;
const ReactMeals = styled.h1`
  color: ${(props) => (props.darkMode ? 'black ' : 'white')};
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  line-height: 57px;
  margin: 0;
`;
