import React from 'react';
import './styles/index.scss';
import { Button} from './component/Button/button';
import { Alert, AlertType } from './component/Alert/alert';
import { Menu } from './component/Menu/menu';
import { MenuItem } from './component/Menu/menuItem';
import { SubMenu } from './component/Menu/subMenu';
import { Tabs } from './component/Tabs/tabs';
import { TabsItem } from './component/Tabs/tabsItem';
import { Icon } from './component/Icon/icon';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <Icon icon="coffee" theme="danger" size="lg" />
        <h1>Button</h1>
        <Button btnType={"primary"} size={"lg"}>Large</Button>
        <Button btnType={"primary"} size={"sm"}>Button</Button>
        <Button btnType={"primary"} size={"sm"} disabled>Disabled</Button>
        <Button btnType={"default"} size={"sm"}>Default</Button>
        <Button btnType={"danger"} size={"sm"}>Danger</Button>
        <Button btnType={"warning"} size={"sm"}>Warning</Button>
        <Button btnType={"link"} href="http://www.baidu.com" children="Baidu" />
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
      {/* Tabs */}
      <div>
        <h1>Tabs</h1>
        <div>
          <h4>line</h4>
          <Tabs type="line">
            <TabsItem label="1 card">this 1</TabsItem>
            <TabsItem label="2 card">this 2</TabsItem>
            <TabsItem label="3 card">this 3</TabsItem>
            <TabsItem label="4 card" disabled>this 4</TabsItem>
          </Tabs>
        </div>
        <div>
          <h4>card</h4>
          <Tabs type="card">
            <TabsItem label="1 card">this 1</TabsItem>
            <TabsItem label="2 card">this 2</TabsItem>
            <TabsItem label="3 card">this 3</TabsItem>
            <TabsItem label="4 card" disabled>this 4</TabsItem>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
