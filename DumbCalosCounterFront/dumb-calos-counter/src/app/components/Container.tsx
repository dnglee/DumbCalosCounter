import React from 'react';
import '../styles/styles.css';

interface ContainerProps {
  children: React.ReactNode;
  justifyContent?: 'start' | 'center' | 'right';
}


const Container: React.FC<ContainerProps> = ({ children, justifyContent = "center" }) => {
    return (
        <div className="flex-auto flex-col align-items:baseline">
            {/* <div className="container mx-xl"> */}
                {children}
            {/* </div> */}
        </div>
    );
};

export default Container;

