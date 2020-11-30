import React from 'react';

import Header1 from '../Components/Header1';
import Main1 from '../Components/Main1';
import Footer from '../Components/Footer';
/*
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "\o/";
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;                            
  });
*/
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        return (
            <>
            <Header1 />
            <Main1 />
            <Footer />
            </>
          );
    }
}
 
export default Home;