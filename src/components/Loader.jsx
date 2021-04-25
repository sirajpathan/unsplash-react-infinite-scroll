import React from 'react';
export default function Loader({loading}) {
    return loading ? <div className="loader-overlay"><div className="loader"></div></div> : null;
}