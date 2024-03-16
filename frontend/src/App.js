import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import Transactions from './Components/Transactions/Transactions';

function App() {
  const [active, setActive] = useState(1);
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const global = useGlobalContext();
  console.log(global);

  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };

  const handlePasscodeSubmit = () => {
    // Check if passcode is correct (e.g., compare with a hardcoded value)
    const correctPasscode = '0000'; // Change this to your desired passcode
    if (passcode === correctPasscode) {
      setAuthenticated(true);
    } else {
      alert('Incorrect passcode. Please try again.');
      setPasscode('');
    }
  };

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Transactions />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  // Render passcode screen if not authenticated
  if (!authenticated) {
    return (
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          <PasscodeContainer>
            <h2>Enter Passcode</h2>
            <input
              type="password"
              value={passcode}
              onChange={handlePasscodeChange}
              placeholder="Enter passcode"
            />
            <button onClick={handlePasscodeSubmit}>Submit</button>
          </PasscodeContainer>
        </MainLayout>
      </AppStyled>
    );
  }

  // Render dashboard if authenticated
  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

const PasscodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999; /* Ensures it appears on top of other content */
  
  h2 {
    margin-bottom: 1rem;
  }
  input {
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.3s;
    width: 250px;
    font-size: 16px;
    &:focus {
      border-color: #007bff;
    }
  }
  button {
    padding: 0.75rem 1.5rem;
    background-color: #c4588d;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    &:hover {
      background-color: #29141e;
    }
  }
`;


export default App;
