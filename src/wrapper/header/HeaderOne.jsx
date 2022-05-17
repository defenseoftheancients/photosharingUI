import React, { useEffect, useState } from 'react'

import Logo from '../../component/header/Logo'
import IconGroup from '../../component/header/IconGroup'
import { Container } from 'reactstrap'

const HeaderOne = props => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  return (
    <header className={scroll > headerTop ? "active" : ""}>
        <div className='header-area position-relative'>
            <Container fluid className='d-flex justify-content-between align-items-center'>
                <Logo/>
                <IconGroup/>
            </Container>
        </div>
    </header>
  )
}


export default HeaderOne