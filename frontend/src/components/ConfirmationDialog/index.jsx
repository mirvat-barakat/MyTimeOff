import React from 'react';
import Button from '../Button';
import './styles.css';

const Confirmation = (props) => {

    const { message, onCancel, onConfirm } = props;

    return(
        <div className="confirmation-dialog">
            <div className="confirmation-dialog-message">{message}</div>
            <div className="confirmation-dialog-buttons">
                <Button type="submit" label="Cancel" className="confirmation-dialog-button  cancel" onClick={onCancel}/>
                <Button type="submit" label=" Confirm" className="confirmation-dialog-button  confirm" onClick={onConfirm}/>
            </div>
        </div>
    );
};
export default Confirmation;