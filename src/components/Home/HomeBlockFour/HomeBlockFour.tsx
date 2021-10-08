import React from 'react';
import Image from 'next/image';
import {HomeBlockFourWrapper, Newsletter} from './HomeBlockFourStyles';

const HomeBlockFour: React.FC = () => {
  return (
    <HomeBlockFourWrapper>
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
    </HomeBlockFourWrapper>
  );
};

export default HomeBlockFour;
