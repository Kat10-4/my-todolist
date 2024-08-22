import React from 'react';

type ButtonPropsType={
    title: string,
    onClick:()=>void
    className?:string
}

export const Button = (props:ButtonPropsType) => {
    return (
  <button onClick={props.onClick} className={props.className}>{props.title}</button>
    );
};

