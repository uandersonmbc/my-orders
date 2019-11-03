const INITIAL_STATE = {
    active: 'mod',
    teste: 'agora vai'
}

export default function teste(state = INITIAL_STATE, action){

    if(action.type === 'TESTE'){
        return {
            ...state,
            active: action.active
        }
    }

    return state;
}