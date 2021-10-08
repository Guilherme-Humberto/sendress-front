import React from 'react';
import {AiOutlineInstagram} from 'react-icons/ai';
import {HiOutlineMail} from 'react-icons/hi';
import {FooterWrapper, Newsletter} from './FooterStyles';

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <div className="intro">
        <h1>
          Have a project in mind? Get in touch and let s make something cool.{' '}
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero in
          dignissimos dolor ipsam harum obcaecati.
        </p>
      </div>
      <Newsletter>
        <div>
          <h1>Newsletter</h1>
          <p>
            Sign up to get our latest articles on design, data visualization,
            and code directly in your inbox.
          </p>
        </div>
        <form action="">
          <input type="text" placeholder="E-mail" />
          <button>Increver-se</button>
        </form>
      </Newsletter>
      <div className="by-title">
        <p>© 2021 z creative labs GmbH</p>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
