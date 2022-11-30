import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { GrLinkedinOption } from 'react-icons/gr';
import { FiGithub } from 'react-icons/fi';
import styled from 'styled-components';

const Footer = () => {
  return (
    <div className='container-ftr'>
      <div className='md-txt'>
        <p className='ftr-txt'>
          Made with{' '}
          <span className='heart' style={{ color: 'black' }}>
            <FaHeart />{' '}
          </span>
          by Camila
        </p>
      </div>
      <div>
        <a href='https://www.linkedin.com/in/%C3%A1gar-camila-saraiva/'>
          <span className='lnd-icn' style={{ color: 'black' }}>
            <GrLinkedinOption />
          </span>
        </a>
      </div>
      <div>
        <a href='https://github.com/camiSaraiva'>
          <span className='icn-ghb' style={{ color: 'black' }}>
            <FiGithub className='icn-ghb' />
          </span>
        </a>
      </div>
    </div>
  );
};

export const StyleDiv = styled.div``;
export default Footer;
