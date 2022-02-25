import Popup from "..";

interface IConfirmationPopupProps {
    title:string,
    text:string,
    cancelText?:string,
    confirmText?:string,
    trigger:boolean,
    setTrigger:any,
    setConfirmation:any,
}

const ConfirmationPopup = (props:IConfirmationPopupProps) => {
    return (
        <Popup trigger={props.trigger} setTrigger={props.setTrigger}>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
            <button onClick={() => {
                props.setConfirmation(false);
                console.log("confirmação FALSA");
                props.setTrigger(false);
            }}>{(
                typeof props.cancelText == "undefined")?
                    "Cancel":
                    props.cancelText
                }</button>
            <button onClick={() => {
                props.setConfirmation(true)
                console.log("confirmação TRUE");
                props.setTrigger(false);
            }}>{(
                typeof props.confirmText == "undefined")?
                    "Confirm":
                    props.confirmText
                }</button>
        </Popup>
    )
}



export default ConfirmationPopup;