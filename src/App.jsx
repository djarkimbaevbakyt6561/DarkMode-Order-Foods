import { useDispatch, useSelector } from 'react-redux';
import MainRoutes from './routes/MainRoutes';
import { SnackBar } from "./components/UI/modal/SnackBar"
import { snackBarActions } from './components/store/snackBar';
import styled from 'styled-components';
function App() {
  const snackBar = useSelector((state) => state.snackBar);
  const { lightMode } = useSelector((state) => state.darkMode)
  const dispatch = useDispatch()
  function closeHandler() {
    dispatch(snackBarActions.closeHandler());
  }
  
  return (
    <StyledApp lightMode={lightMode}>
      <SnackBar
        open={snackBar.open}
        handleClose={closeHandler}
        severity={snackBar.saverity}
      >
        {snackBar.message}
      </SnackBar>
      <MainRoutes />
    </StyledApp>
  );
}
export default App;
const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`