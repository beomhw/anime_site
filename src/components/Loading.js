import React from 'react';
import {ReactComponent as SVG} from '../asset/loading.svg';

const Loading = () => {
    return <SVG className="noTransition" />
}

export default React.memo(Loading);