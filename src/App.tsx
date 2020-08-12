import React from 'react';
import './styles/index.scss';
import Button, { ButtonType, ButtonSize } from './component/Button/button';
import { Alert, AlertType } from './component/Alert/alert';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <h1>Button</h1>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>Button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small} disabled>Disabled</Button>
        <Button btnType={ButtonType.Default} size={ButtonSize.Small}>Default</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Danger</Button>
        <Button btnType={ButtonType.Warning} size={ButtonSize.Small}>Warning</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" children="Baidu" />
      </div>
      <div>
        <h1>Alert</h1>
        <Alert alertType={AlertType.Success} closable={false} description='success without close' />
        <Alert alertType={AlertType.Info} title='this is Info alert' />
        <Alert alertType={AlertType.Warning} title='Waring Waring Waring!' />
        <Alert alertType={AlertType.Danger} title='Danger' description='something is wrong' />
      </div>
    </div>
  );
}

export default App;
