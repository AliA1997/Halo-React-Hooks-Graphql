import * as utils from './utils';

export const container ={
        background: 'linear-gradient(#FF70A6, #FF9770, #FFD670, #E9FF70)',
        height: '100vh',
        width: '100v',
        display: 'flex'
};
export const flexColumn = {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
};
export const textAlign = {
    textAlign: 'center',  
};
export const navbar = {
    background: 'linear-gradient(#FF70A6, #FF9770, #FFD670, #E9FF70)',
    height: '100vh',
};

export const navbarColumn = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column'
}

export const image = {
    marginLeft: 'auto', 
    marginRight: 'auto'
};

export const loginPageContainer = () => {
    const browserWidth = utils.getBrowserWidth();
    return {
        background: 'linear-gradient(#FF70A6, #FF9770, #FFD670, #E9FF70)',
        height: '100%', 
        width: '80%',
        display: 'flex',
        ...flexColumn,
        width: browserWidth < 1024 && browserWidth > 760 ? '600px' : browserWidth < 760 ? '400px' : 'initial'
    };
};

export const loginPageSubContainer = {
    display: 'flex',
    width: '50%',
    ...flexColumn
};

export const fullWidth = {
    width: '80%',
};

export const icon = {
    marginLeft: '10px'
};


export const commentActionWidth = {
    width: '150px'
};

export const lastCommentAction = {
    ...commentActionWidth, 
    marginTop: '5px'
};

export const commentActionIcon = {
    marginLeft: '10px'
};
export const lastCommentActionIcon = {
    marginLeft: '20px'
};