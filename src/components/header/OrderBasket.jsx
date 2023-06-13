import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as BasketIcon } from '../../assets/icons/Group.svg';
import { ReactComponent as BasketIconBlack } from '../../assets/icons/BasketIconBlack.svg';
import { basketActions, basketActionTypes } from '../store/user/basket/basket';
import { modalActions } from '../store/user/modal';
import classes from './OrderBasket.module.css';
const buttonStateReducer = (state, action) => {
  if (action.type === BUTTON_STATE_TRUE) {
    return {
      ...state,
      btnIsHighlighted: true,
    };
  }
  if (action.type === BUTTON_STATE_FALSE) {
    return {
      ...state,
      btnIsHighlighted: false,
    };
  }
};
const BUTTON_STATE_TRUE = 'BUTTON_STATE_TRUE';
const BUTTON_STATE_FALSE = 'BUTTON_STATE_FALSE';

const OrderBasket = ({ children }) => {
  const { lightMode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const [buttonState, dispatchButtonState] = useReducer(buttonStateReducer, {
    btnIsHighlighted: false,
  });
  const { items, totalAmount } = useSelector((state) => state.basket);
  const btnClasses = `${
    buttonState.btnIsHighlighted ? classes.bump : undefined
  }`;
  useEffect(() => {
    dispatch(basketActions.getTotalAmount());
    dispatchButtonState({ type: BUTTON_STATE_TRUE });
    const timer = setTimeout(() => {
      dispatchButtonState({ type: BUTTON_STATE_FALSE });
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  function openModal() {
    dispatch(modalActions.toggleModalHandler());
  }
  return (
    <Button lightMode={lightMode} className={btnClasses} onClick={openModal}>
      {lightMode ? <BasketIcon /> : <BasketIconBlack />}
      <OrderBasketTitle lightMode={lightMode}>{children}</OrderBasketTitle>
      <OrderBasketCount lightMode={lightMode}>{totalAmount}</OrderBasketCount>
    </Button>
  );
};
export default OrderBasket;
const Button = styled.button`
  width: 249px;
  height: 59px;
  background: ${(props) => (props.lightMode ? '#5a1f08' : '#a5e0f7')};
  border-radius: 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color:  ${(props) => (props.lightMode ? '#4d1601' : '#b2e9fe')} ;
  }
`;
const OrderBasketTitle = styled.span`
  color:${(props) => (props.lightMode ? 'white' : 'black')};
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-left: 13px;
`;
const OrderBasketCount = styled.span`
  width: 51px;
  height: 35px;
  background: ${(props) => (props.lightMode ? '#8a2b06' : '#75d4f9')} ;
  border-radius: 30px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  color: ${(props) => (props.lightMode ? '#ffffff' : 'black')} ;
  margin-left: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
