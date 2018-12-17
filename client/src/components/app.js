import React from 'react';
import Header from "./header";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/froala-design-blocks/dist/css/froala_blocks.css';
import './App.css';



export default ({ children }) => {
    return (
      <div>
          <Header/>
          {children}
      </div>
    );
}