import React, {  useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import PhotoGrid from './PhotoGrid';
const TabPhoto = ({items, setHeading, headingValue}) => {
   
    const [activeTab, setActiveTab] = useState('0');
   
   
    return (
        <div className='tabphoto'>
            {setHeading ? <div className='tabphoto-heading'>{headingValue}</div> : null}
            <Nav tabs className='d-flex justify-content-center border-0 mb-3'>
                {items.map((item, index)=>(
                    <NavItem key={index}>
                        <NavLink href="#!" className={activeTab === index.toString() ? 'active' : ''} onClick={(e)=> {
                            e.preventDefault();
                            setActiveTab(index.toString());
                        }}>
                            {item.display}
                        </NavLink>
                     </NavItem>)
                )}
            </Nav>
        
            <TabContent activeTab={activeTab}>
                {items.map((item, index)=>(
                    
                    <TabPane key={index} tabId={index.toString()}>
                        <PhotoGrid url={item.url}  sortParam={item.sortParam} isAuth={item.isAuth}/>
                    </TabPane> 
                    )    
                )}
            </TabContent>
        
        </div>
     )
}

export default TabPhoto