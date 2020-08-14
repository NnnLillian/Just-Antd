import React from 'react';
import './styles/index.scss';
import Button, { ButtonType, ButtonSize } from './component/Button/button';
import { Alert, AlertType } from './component/Alert/alert';
import { Menu } from './component/Menu/menu';
import { MenuItem } from './component/Menu/menuItem';
import { SubMenu } from './component/Menu/subMenu';

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
      <div>
        <h1>Menu</h1>
        <div>
          <h4>horizontal</h4>
          <Menu onSelect={(index) => { alert(index) }}>
            <MenuItem>
              Home
           </MenuItem>
            <SubMenu title="Maps">
              <MenuItem>
                Google Maps
             </MenuItem>
              <MenuItem>
                Leaflet Maps
             </MenuItem>
            </SubMenu>
            <MenuItem>
              Detail
           </MenuItem>
            <MenuItem disabled>
              Pages
           </MenuItem>
            <MenuItem>
              Settings
           </MenuItem>
          </Menu>
        </div>
        <div>
          <h4>vertical</h4>
          <Menu onSelect={(index) => { alert(index) }} mode="vertical" defaultOpenSubMenus={['1']}>
            <MenuItem>
              Home
           </MenuItem>
            <SubMenu title="Maps">
              <MenuItem>
                Google Maps
             </MenuItem>
              <MenuItem>
                Leaflet Maps
             </MenuItem>
            </SubMenu>
            <MenuItem>
              Detail
           </MenuItem>
            <MenuItem disabled>
              Pages
           </MenuItem>
            <MenuItem>
              Settings
           </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default App;
