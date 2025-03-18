import { useState } from "react"
import DOMPurify from 'dompurify';

export default function Player({initialName, symbol, isActive, onNameChange}){
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        if (!isEditing || (isEditing && playerName.trim() !== '')) {
            setIsEditing((editing) => !editing);
        }
        if (isEditing && playerName.trim() !== '') {
            onNameChange(symbol, playerName);
        }
    }

    function handleChange(evt){
        const newValue = evt.target.value.replace(/[<>]/g, '');
        if (newValue.length <= 15) {
            setPlayerName(newValue);
        }
    }

    let editablePlayerName = <span className='player-name'>{playerName.replace(/[<>]/g, '')}</span>;

    if(isEditing){
        editablePlayerName = <input 
            type='text' 
            required 
            value={playerName} 
            onChange={handleChange} 
            maxLength={15}
        />
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