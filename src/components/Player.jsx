import { useState } from "react"

export default function Player({initialName, symbol, isActive, onNameChange}){
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        /* setIsEditing((editing) => !editing); */
        if (!isEditing || (isEditing && playerName.trim() !== '')) {
            setIsEditing((editing) => !editing);
        }
        if (isEditing && playerName.trim() !== '') {
                onNameChange(symbol, playerName);
        }
    }

    function handleChange(evt){
        setPlayerName(evt.target.value);
    }

    let editablePlayerName = <span className='player-name'>{playerName}</span>;

    if(isEditing){
        editablePlayerName = <input type='text' required value={playerName} onChange={handleChange}/>
    }

    const isSaveDisabled = isEditing && playerName.trim() === '';

    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick} disabled={isSaveDisabled}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}